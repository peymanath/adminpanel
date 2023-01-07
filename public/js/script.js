const d = document;
const $ = (q) => (d.querySelectorAll(q).length > 1) 
? d.querySelectorAll(q) : d.querySelector(q);

$('.btnMenu').addEventListener('click', (e) => $('.sidebarMenu').classList.toggle('active'));