const waterLevel ="68%"; 
let WaterLevelNumbers = waterLevel.replace(/\D/g, '');
document.getElementById("water-level-number").innerHTML = waterLevel;
document.getElementById("threshold-level-number").innerHTML = waterLevel;
document.getElementById("progress-bar-fill").style.width = waterLevel;
document.getElementById("threshold-label-number").innerHTML = WaterLevelNumbers+"0";

const thresholdLabel = document.getElementById("threshold-label");
const thresholdCssObj = window.getComputedStyle(thresholdLabel, null);
let currentLabel = thresholdCssObj.getPropertyValue("left").replace(/\D/g, '');
let toMove = 0;
if(currentLabel !== 0){
    toMove = Math.floor((WaterLevelNumbers-3.5) * 6);
}
let strToMove= toMove+"px";
document.getElementById("threshold-label").style.left = strToMove;

const apiKey= "912993f55f0076857d91ebf469813669";
const apiURL= "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");

let city= "dindigul";

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
        
        if (response.status === 404) {
            document.querySelector(".weather-display").style.display = "none";
        } else {
            const data = await response.json();
            document.getElementById("weather-city").textContent = data.name;
            document.getElementById("weather-temp").textContent = `${Math.round(data.main.temp)}°C`;

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "./images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "./images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "./images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "./images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "./images/mist.png";
                    break;
                default:
                    weatherIcon.src = "./images/default.png"; // Default icon if no match
                    break;
            }

            document.querySelector(".weather-display").classList.add("show");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-display").style.display = "none";
    }
}
checkWeather(city);


const ctx = document.getElementById('waterLevelChart').getContext('2d');

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
    datasets: [
        {
            type: 'line', // Line chart dataset for average water usage
            label: 'Average Water Usage',
            data: [30, 28, 35, 25, 30, 27, 29], // Example data for average water usage
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
        },
        {
            type: 'bar', // Bar chart dataset for daily water usage
            label: 'Daily Water Usage',
            data: [32, 25, 37, 23, 31, 29, 28], // Example data for daily water usage
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }
    ]
};

const options = {
    scales: {
        x: {
            title: {
                display: true,
                text: 'Days'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Water Level in Litres'
            },
            beginAtZero: true,
            max: 40
        }
    },
    maintainAspectRatio: false // Ensure the chart uses the specified height and width
};

const waterLevelChart = new Chart(ctx, {
    data: data,
    options: options
});

function notifyLeak(){
    let toastBox = document.getElementById("toastBox");
    let toast = document.createElement("div");
    toast.classList.add("toast");

    toast.innerHTML = "<span class='material-symbols-outlined'>warning</span>High leak Possiblity!"
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function updateLeakPossiblity(leak){
    let leakPossiblity = document.querySelector(".leakage-button");
    leakPossiblity.innerHTML = leak;

    if(leak === 'Low'){
        leakPossiblity.style.backgroundColor = 'green'
    }else{
        leakPossiblity.style.backgroundColor = 'red'
        notifyLeak();
    }

}

function waterThreshold(threshold){
    let thresholdLabel = document.querySelector(".capacity-label");
    thresholdLabel.textContent = threshold + 'L';
}

document.addEventListener('DOMContentLoaded', function() {
    var url = "http://127.0.0.1:5000/";

    $.get(url, function(data, status){
        console.log(data.leak, data.threshold);
        updateLeakPossiblity(data.leak)
        waterThreshold(data.threshold);
    })
})
