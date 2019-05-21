const test = require('tape')
const supertest = require('supertest')
const app = require('../api/index.js')

let before = test;
let after = test;

test('GET /poll/:pollSlug', (assert) => {
    before('Create poll before GET /poll/:slug', (assert) => {
        supertest(app)
           .post('/poll/create')
           .send({pollName: 'Test poll', 
                  options: ['option1', 'option2'],
                  type: 'One',
                  active: 'Active'
            })
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    test('Get poll', (assert) => {
        supertest(app)
           .get('/poll/test-poll')
           .expect(200)
           .end((err, res) => {
               (err ? console.log(err) : true)
               let expected =  [ [ { poll_name: 'Test poll', poll_active: 'Active', poll_type: 'One', poll_slug: 'test-poll' } ], [ { option_name: 'option1', option_votes: 0 }, { option_name: 'option2', option_votes: 0 } ] ]
               let actual = res.body
               assert.deepEqual(actual, expected, 'Retrieve poll')
               assert.end()
        })
    })
    after('Delete poll after GET /poll/:slug', (assert) => {
        supertest(app)
            .post('/poll/delete')
            .send({pollName: 'Test poll'})
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    
    assert.end()
})

test('POST /poll/delete', (assert) => {
    before('Before delete poll', (assert) => {
        supertest(app)
           .post('/poll/create')
           .send({pollName: 'Test poll', 
                  options: ['option1', 'option2'],
                  type: 'One',
                  active: 'Active'
                })
            .end((err, res) => {
                assert.end()
            })
    })
    test('Delete poll', (assert) => {
        supertest(app)
        .post('/poll/delete')
        .send({pollName: 'Test poll'})
        .end((err, res) => {
            (err ? console.log(err) : true)
            let expected = 'deleted'
            let actual = res.text
            assert.equal(actual, expected, 'Delete poll')
            assert.end()
        })
    })
    assert.end()
})

test('POST /poll/create', (assert) => {
    test('Create poll', (assert) => {
        supertest(app)
            .post('/poll/create')
            .send({pollName: 'Test poll', 
                 options: ['option1', 'option3'],
                 type: 'Many',
                 active: 'Active'
            })
            .end((er, res) => {
                let expected =  '{"type":"success","message":"created"}'
                let actual = res.text
                assert.equal(actual, expected, 'The poll is created')
                assert.end()

            })
    })
    after('DELETE poll after Create poll', (assert) => {
        supertest(app)
            .post('/poll/delete')
            .send({pollName: 'Test poll'})
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    assert.end()
})

test('POST poll/update/:pollSlug', (assert) => {
    before('Create poll before test poll/update/:pollName', (assert) => {
        supertest(app)
           .post('/poll/create')
           .send({pollName: 'Test poll', 
                  options: ['option1', 'option2'],
                  type: 'One',
                  active: 'Active'
            })
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    test('poll/update/:pollName', (assert) => {
        supertest(app)
           .post('/poll/update/test-poll')
           .send({newPollName: 'New test poll',
                  options: ['option1', 'option2']
            })
            .end((err, res) => {
                let expected = 'updated'
                let actual = res.text
                assert.equal(actual, expected, 'The poll is updated')
                assert.end()
            })

    })
    after('Delete poll after test poll/update/:pollName', (assert) => {
        supertest(app)
            .post('/poll/delete')
            .send({pollName: 'New test poll'})
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    assert.end()
})


test('POST poll/vote/:pollSlug', (assert) => {
    before('CREATE poll before test poll/vote/:pollSlug', (assert) => {
        supertest(app)
           .post('/poll/create')
           .send({pollName: 'Test poll', 
                  options: ['option1', 'option2'],
                  type: 'One',
                  active: 'Active'
            })
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    test('POST poll/vote/:pollSlug', (assert) => {
        supertest(app)
           .post('/poll/vote/test-poll')
           .send({option: ['option1', 'option2']})
            .end((err, res) => {
                let expected = 'success'
                let actual = res.text
                assert.equal(actual, expected, 'Should return success')
                assert.end()
            })

    })
    test('POST poll/vote/:pollSlug', (assert) => {
        supertest(app)
           .get('/poll/test-poll')
            .end((err, res) => {
                let expected = 1
                let actual = res.body[1][0].option_votes
                assert.equal(actual, expected, 'Should return 1')
                assert.end()
            })

    })
    after('DELETE poll after test poll/vote/:pollName', (assert) => {
        supertest(app)
            .post('/poll/delete')
            .send({pollName: 'Test poll'})
            .end((err, res) => {
                (err ? console.log(err) : true)
                assert.end()
            })
    })
    assert.end()
})