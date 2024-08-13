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

let cityName = document.getElementById('cityName');
let cityDetails = document.getElementById('cityDetails');
let temperature = document.getElementById('temperature');
let date = document.getElementById('date');

// Function to fetch weather details
let fetchDetails = async (city = cityName.value) => {
    if (city.trim().length == 0) {
        alert("Please enter a city name before searching");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1cb6532aea3c298a830a71380eace21e`;
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            let data = await response.json();
            cityDetails.innerText = `${data.name}, ${data.sys.country}`;
            
            let x = new Date();
            date.innerText = `📅 ${x.toDateString()}`;
            
            let temp = data.main.temp;
            if (temp > 30) {
                temperature.innerHTML = `${temp}<sup>o</sup>C 🔥`;
            } else if (temp >= 20) {
                temperature.innerHTML = `${temp}<sup>o</sup>C 🌞`;
            } else if (temp > 0) {
                temperature.innerHTML = `${temp}<sup>o</sup>C ❄️`;
            } else {
                temperature.innerHTML = `${temp}<sup>o</sup>C ⛄`;
            }
        } catch (error) {
            alert(error.message);
        }
    }
}
window.onload = () => {
    fetchDetails("Bangalore");
};
