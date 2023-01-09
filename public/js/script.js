/**
 * Author: Peyman Nader
 * Author ULR: https://github.com/peymanath
 * Description: TagInput For TailwindCss
 */

// Select doucument
const d = document

// select element
const $ = q => (d.querySelectorAll(q).length > 1) ? d.querySelectorAll(q) : d.querySelector(q)

// Toggle click Menu Btn
$('.btn-menu').addEventListener('click', () => $('.sidebar-menu').classList.toggle('active'))

// product Transportation Fee toggle btn
$('#product-fixed-fare').addEventListener('click', () => $('.productTransportationFee').classList.toggle('hidden'))

document.addEventListener('DOMContentLoaded', () => {
    const perDate = new PersianDate().newDate()
})