
const addNewTag = (event) => {

    event.preventDefault();

    const inputTag = $('.inputTagJS');
    let value = []
    
    if (!inputTag.value.trim().length) return
    else {
        const addTagJsParent = $('.addTagJs').parentElement;
        addTagJsParent.remove();

        const newTag = d.createElement('Tag')

        newTag.classList.add('TagClass');
        newTag.setAttribute('value', inputTag.value);

        newTag.innerHTML =
            `<svg class="w-5 h-5">
             <use xlink:href="#times" class="removeTagJs cursor-pointer"></use>
             </svg>
             <div class="">
             <span>${inputTag.value}</span>
             </div>`;

        $('.listTagsJs').append(newTag, addTagJsParent)

        inputTag.value = "";
        inputTag.focus();

    }


    if ($('.listTagsJs tag').length > 1) {
        
        let items = [...$('.listTagsJs tag')];
        items.forEach(e => {
            value.push(e.attributes[1].textContent);
        });
    } 
    else value = $('.listTagsJs tag').attributes[1].textContent;

    $('#TagList').value = value;

}

const reamoveTag = item => {

    const classList = [...item.target.classList];
    
    if (classList.find(e => e == "removeTagJs")) {
        
        const ValueHidden = $('#TagList').value.split(',');
        const removaItemValue = item.target.parentElement.parentElement.attributes[1].textContent;

        const selectTag =  ValueHidden.filter(item => item !== removaItemValue);

        $('#TagList').value = selectTag;
        
        item.target.parentElement.parentElement.remove();

    }
}

// Event List
$('.addTagJs').addEventListener('submit', addNewTag)
$('.listTagsJs').addEventListener('click', reamoveTag)