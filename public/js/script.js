const d = document;
const $ = (q) => (d.querySelectorAll(q).length > 1)
    ? d.querySelectorAll(q) : d.querySelector(q);

$('.btn-menu').addEventListener('click', (e) => $('.sidebar-menu').classList.toggle('active'));

$('#product-fixed-fare').addEventListener('click', (e) => {
    $('.productTransportationFee').classList.toggle('hidden');
});
