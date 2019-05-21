import axios from 'axios'
(function(){
    var fragment = document.createDocumentFragment()
    var addOption = document.getElementById('add-option')
    var removeOption = document.getElementById('remove-option')
    
    addOption.addEventListener('click', function(ev){
        ev.preventDefault()
        var optionsList = document.getElementById('options-list')

        var element = document.createElement('input')
        element.setAttribute('name', 'option')
        element.setAttribute('type', 'text')
        element.setAttribute('class', 'form-control')
        element.setAttribute('data-option', 'option')
        optionsList.appendChild(element)


        // var btn = document.createElement('span')
        // btn.setAttribute('class', 'btn btn-sm btn-dark')
        // btn.setAttribute('id', 'remove-option')
        // var content = document.createTextNode('Remove option')
        // btn.appendChild(content)


        // var fragment = document.createDocumentFragment();

        // fragment.appendChild(element)
        // fragment.appendChild(btn)
        // optionsList.appendChild(fragment)
    })

    removeOption.addEventListener('click', function(ev){
        ev.preventDefault()
        var listItems =  document.querySelectorAll("[data-option]")
        var last = listItems[listItems.length - 1];
        last.parentNode.removeChild(last);

        // var optionsList = [].slice.call(document.querySelectorAll("[data-option]"));
        // optionsList.pop(optionsList[optionsList.length - 1])
        // optionsList.appendChild()
    })
}())