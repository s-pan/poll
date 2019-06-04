import axios from 'axios'
(function(){
    var addOption = document.getElementById('add-option')
    var removeOption = document.getElementById('remove-option')
    
    addOption.addEventListener('click', function(ev){
        ev.preventDefault()
        var optionsList = document.getElementById('options-list')

        var element = document.createElement('input')
        element.setAttribute('name', 'option')
        element.setAttribute('type', 'text')
        element.setAttribute('class', 'form-control, mt-5')
        element.setAttribute('data-option', 'option')
        element.setAttribute('class', 'mt-5')
        optionsList.appendChild(element)
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