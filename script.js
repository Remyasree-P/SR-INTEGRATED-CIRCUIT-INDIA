function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    icon.classList.toggle("open");
    menu.classList.toggle("open");
}
const items = document.querySelectorAll('.carousel-item');
const radios = document.querySelectorAll('.radio-buttons input[type="radio"]');

let currentIndex = 0;
const intervalTime = 3000;

function showItem(index) {
    items.forEach((item, i) => {
        item.classList.remove('active');
        radios[i].checked = false;
    });
    items[index].classList.add('active');
    radios[index].checked = true;
}

function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
}

let interval = setInterval(nextItem, intervalTime);

radios.forEach((radio, i) => {
    radio.addEventListener('change', () => {
        clearInterval(interval);
        showItem(i);
        currentIndex = i;
        interval = setInterval(nextItem, intervalTime);
    });
});

showItem(currentIndex);
