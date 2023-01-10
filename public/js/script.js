/**
 * Author: Peyman Nader
 * Author ULR: https://github.com/peymanath
 * Description: TagInput For TailwindCss
 */

// Select doucument
const d = document

// select element
const $ = q => (d.querySelectorAll(q).length > 1) ? d.querySelectorAll(q) : d.querySelector(q)

// Class Group Toggle classlist
const classToggle = (el, ...args) => args.map(e => el.classList.toggle(e));

// Toggle click Menu Btn
$('.btn-menu').addEventListener('click', () => $('.sidebar-menu').classList.toggle('active'))
$('.btn-menu-mobile').forEach(item => {
    item.addEventListener('click', () => $('.ShowMenuMobile').classList.toggle('hidden'))
});

// Show backDrop
const backDrop = () => $('.backdrop').classList.toggle('hidden');

const fade = (ID) => {

    if (ID.classList.contains('hidden')) {

        ID.style.opacity = 0;

        ID.classList.remove('hidden')

        let opacity = 0

        const stop = setInterval(opc = () => {
            (opacity == 100) ? clearInterval(stop) : opacity += 2;

            ID.style.opacity = opacity / 100
        }, 1);
    } 
    else {

        let opacity = 100

        const stop = setInterval(opc = () => {
            if (opacity == 0) {
                clearInterval(stop)
                ID.classList.add('hidden')
            } else opacity -= 2;

            ID.style.opacity = opacity / 100
        }, 1);

    }
}
const fadeOut = (ID) => {
    let opacity = 100

    const stop = setInterval(opc = () => {
        if (opacity == 0) {
            clearInterval(stop)
            ID.classList.add('hidden')
        } else opacity -= 2;

        ID.style.opacity = opacity / 100
    }, 1);
}

// Toggle click Menu Btn
$('.messages-icon').addEventListener('click', () => {
    fade($('.show-messages-icon'))
    fadeOut($('.show-bell-icon'))
})
$('.bell-icon').addEventListener('click', () => {
    fade($('.show-bell-icon'))
    fadeOut($('.show-messages-icon'))
})


// product Transportation Fee toggle btn
$('#product-fixed-fare').addEventListener('click', () => $('.productTransportationFee').classList.toggle('hidden'))

document.addEventListener('DOMContentLoaded', () => {

    // Call Persian Date
    const perDate = new PersianDate().newDate();

    // Call Editor
    tinymce.init({
        selector: 'textarea#editor',
        language: 'fa'
    });

})