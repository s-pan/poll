const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('core/db/database');
const slug = require('slug')

db.run(`PRAGMA foreign_keys = 1`, function(error)  {
    if (error){
        console.error("Pragma statement didn't work.")
    } else {
        console.log("Foreign Key Enforcement is on.")
    }
});

function data (){
    //create tables if they don't exists

    function init(){
            db.serialize(()=> {
                db.run(`CREATE TABLE IF NOT EXISTS polls
                         (poll_id INTEGER PRIMARY KEY AUTOINCREMENT,
                          poll_slug TEXT UNIQUE NOT NULL,
                          poll_name TEXT UNIQUE NOT NULL CHECK(length(poll_name) > 0),
                          poll_type TEXT NOT NULL,
                          poll_active INTEGER NOT NULL
                        )         
                       `,
                       (err) => err ? console.log(err) : false
                )
                db.run(`CREATE TABLE IF NOT EXISTS poll_options
                        (option_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        option_name TEXT NOT NULL,
                        option_votes INTEGER,
                        poll_id INTEGER,
                        FOREIGN KEY (poll_id)
                        REFERENCES polls (poll_id)
                        ON DELETE CASCADE
                    )`
                  ,
                  (err) => err ? console.log(err) : false
                )


            }, (err) => err ? console.log(err) : false)

 

    }
    
    function getPolls(){
        return new Promise((resolve, reject) => {
            db.all(`SELECT poll_name, poll_slug
                    FROM polls`, 
                    (err, result) => result ? resolve(result) : reject(err))
        })
    }

    function createPoll(obj){
        return new Promise((resolve, reject) => {
            db.serialize( async ()=> {
                db.run(`INSERT into polls (poll_name, poll_slug, poll_type, poll_active) 
                        VALUES (?, ?, ?, ?)`,
                        [obj.pollName, obj.slug, obj.type, obj.active],
                        (err) => {
                           err ? err.code === 'SQLITE_CONSTRAINT' ? reject(`${obj.pollName} already exists`) : ''
                           : false
                        }
                )            
                function getForeignKey(){ 
                    return new Promise((resolve, reject) => {
                        db.each(`SELECT poll_id
                                 FROM polls
                                 WHERE poll_name = ?`,
                                 obj.pollName,
                                 (err, result) => result ? resolve(result) : reject(err)
                        )
                    })
               }

               let a = await getForeignKey().catch((err) => console.log(err))
               let insert = db.prepare(`INSERT into poll_options (option_name, option_votes, poll_id) 
                                        VALUES (?, ?, ?)`, (err) => (err ? reject(err) : resolve('created')) )
                obj.options.forEach((option) => {
                        insert.run(option, 0, a.poll_id)
                })
                insert.finalize()
            })
        })
    }

    function getPoll(obj){
        return new Promise ((resolve, reject) => {
            let poll = new Promise((resolve, reject) => {
                db.all(`SELECT poll_name, poll_active, poll_type, poll_slug
                         FROM polls
                         WHERE poll_slug = ?`, obj.pollName,
                        (err, result) => (err ? reject(err) : resolve(result))
                )
            })
            
    
            let options = new Promise((resolve, reject) => {
                db.all(`SELECT option_name, option_votes
                         FROM poll_options
                         WHERE poll_id = (SELECT poll_id FROM polls WHERE poll_slug = ?)`, obj.pollName,
                        (err, result) => (err ? reject(err) : resolve(result))
                )
            })
    
            Promise.all([poll, options])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => reject(err))
        })
    }


    function deletePoll(obj){
        return new Promise((resolve, reject) => {
            db.serialize( async ()=> {
                db.run(`DELETE FROM poll_options
                        WHERE poll_id = (SELECT poll_id FROM polls WHERE poll_name = ?)`, 
                        obj.pollName, 
                        (err) => (err ? reject(err) : resolve('deleted'))        
                )
                db.run(`DELETE FROM polls 
                         WHERE poll_name = ?`, obj.pollName,
                    (err) => (err ? reject(err) : console.log('deleted'))
               )
            })
        })
    }

    function updatePoll(obj){
        return new Promise((resolve, reject) => {
            db.serialize( async ()=> {
                db.run(`UPDATE polls
                        SET poll_name = ?
                        WHERE poll_slug = ?`,
                        [obj.newPollName, obj.pollSlug], 
                        (err) => {(err ? reject(err) : '')}
                )
                db.run(`DELETE 
                        FROM poll_options
                        WHERE poll_id = (SELECT poll_id
                                        FROM polls
                                        WHERE poll_slug = ?)`,
                                        obj.pollSlug,
                        (err) => (err ? reject(err) : '')
                )
                    function getForeignKey(){ 
                        return new Promise((resolve, reject) => {
                            db.each(`SELECT poll_id
                                 FROM polls
                                 WHERE poll_slug = ?`,
                                 obj.pollSlug,
                                 (err, result) => result ? resolve(result) : reject(err)
                           )
                        })
                    }

               let a = await getForeignKey().catch((err) => console.log(err))
               let insert = db.prepare(`INSERT into poll_options (option_name, option_votes, poll_id) 
                                        VALUES (?, ?, ?)`, (err) => (err ? reject(err) : resolve('updated')) )
                obj.options.forEach((option) => {
                    insert.run(option, 0, a.poll_id)
                })
                insert.finalize()
            
            })
        })

            // let deletePoll = this.deletePoll({pollName: obj.pollName})
            // let createPoll = this.addPoll({pollName: obj.newPollName, options: obj.options})
            // Promise.all([deletePoll, createPoll])
            // .then((result) => {
            //     console.log(result)
            //     return('updated')
            // })
            // .catch(err => console.log(err))
    }

    function deletePollOption(obj){
        return new Promise((resolve, reject) => {
            db.run(`DELETE 
                    FROM poll_options
                    WHERE option_name = ? and poll_id = (SELECT poll_id
                                                           FROM polls
                                                           WHERE poll_name = ?)`, 
                    [obj.optionName, obj.pollName],
                (err) => (err ? reject(err) : resolve('deleted'))
            )
            db.run(``)
        })
    }

    function votePoll (obj){
        return new Promise(async(resolve, reject) => {
            function getForeignKey(){ 
                return new Promise((resolve, reject) => {
                    db.each(`SELECT poll_id
                             FROM polls
                             WHERE poll_slug = ?`,
                             obj.pollName,
                             (err, result) => {
                                 result ? resolve(result) : reject(err)
                             }
                    )
                })
           }
           let a = await getForeignKey().catch((err) => console.log(err))
             obj.vote.forEach((option) => {
                    db.run(`UPDATE poll_options
                            SET option_votes = option_votes + 1
                            WHERE  poll_id = ? and option_name = ?`,
                            [a.poll_id, option],
                            (err) => (err ? reject(err) : resolve('success'))
                            )
            })


        //    let insert = db.prepare(`UPDATE poll_options
        //                             SET option_votes = option_votes + 1
        //                             WHERE  poll_id = ? and option_name = ?`,
        //                             a.poll_id,
        //                             (err) => (err ? console.log(err) : console.log('done')) )
        //     obj.vote.forEach((option) => {
        //         console.log(option)
        //             insert.run(option)
        //     })
            // insert.finalize()
        })

    }

    function getResults(obj){
        return new Promise((resolve, reject) => {
            db.all(`SELECT polls.poll_name, polls.poll_slug, poll_options.option_name, poll_options.option_votes
                    FROM polls
                    LEFT JOIN poll_options ON poll_options.poll_id = polls.poll_id
                    WHERE polls.poll_slug = ?`,
                    obj.poll,
                    ((err, result) => {
                        err ? reject(err) : resolve(result) 
                    })
                )
        })
    }


    return Object.freeze(Object.assign({},
        {
            createPoll,
            getPoll,
            deletePoll,
            updatePoll,
            deletePollOption,
            getPolls,
            init,
            votePoll,
            getResults
        }  
    ))

    
}

module.exports = data()
