/**
 * Author: Peyman Nader
 * Author ULR: https://github.com/peymanath
 * Description: TagInput For TailwindCss
 */


const addNewTag = (event) => {

    // Disabled Page Refresh
    event.preventDefault()

    // Select Input[class="inputTagJS"]
    const inputTag = $('.inputTagJS')

    // make Array Var for Output Tag List
    let outputValueTagInput = []


    // Add new tag to product-Tag
    if (!inputTag.value.trim().length)

        // It warns if the input is empty
        alert("لطفا در فیلد برچسب ها مقداری را وارد کنید.")

    else {

        // Select data Form
        const addTagJsParent = $('.addTagJs').parentElement

        // Remove form after add the new tag
        addTagJsParent.remove()

        // make element <Tag></Tag>
        const newTag = d.createElement('Tag')

        // Add class Element <Tag></Tag>
        newTag.classList.add('TagClass')

        // Add Attribute Element <Tag></Tag>
        newTag.setAttribute('value', inputTag.value)

        // Add item to Element <Tag></Tag>
        newTag.innerHTML =
            `<svg class="w-5 h-5">
             <use xlink:href="#times" class="removeTagJs cursor-pointer"></use>
             </svg>
             <div class="">
             <span>${inputTag.value}</span>
             </div>`

        // Add Element & Form to "<Tags></Tags>"
        $('.listTagsJs').append(newTag, addTagJsParent)

        // Reset Input
        inputTag.value = ""

        // Focus input
        inputTag.focus();

    }


    // add tags to input[id="TagList"]
    if ($('.listTagsJs tag').length > 1) {

        let items = [...$('.listTagsJs tag')];
        items.forEach(e => {
            outputValueTagInput.push(e.attributes[1].textContent);
        });
    }
    else outputValueTagInput = $('.listTagsJs tag').attributes[1].textContent;

    // Change Value input[id="TagList"]
    $('#TagList').value = outputValueTagInput;

}

// Remove <Tags></Tags>
const reamoveTag = item => {

    // Make array for tag list
    const classList = [...item.target.classList]

    // Checks the button after it is clicked
    if (classList.find(e => e == "removeTagJs")) {

        // select parent item
        const parentItem = item.target.parentElement.parentElement;

        // Remove item to <tag></tag>
        parentItem.remove()

        // Receive item on input[id="TagList"]
        const tagListOnInputHidden = $('#TagList').value.split(',')

        // Receive item List "<Tags></Tags>"
        const removaItemValue = parentItem.attributes[1].textContent

        // Remove After Filter
        $('#TagList').value = tagListOnInputHidden.filter(item => item !== removaItemValue)
    }
}

// Perform event after form submission
$('.addTagJs').addEventListener('submit', addNewTag)

// Perform event after icon[remove] clicked
$('.listTagsJs').addEventListener('click', reamoveTag)