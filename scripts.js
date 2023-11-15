
     

document.addEventListener("DOMContentLoaded", function () {
    var citySpan = document.getElementById("city");
    var temperatureDiv = document.getElementById("temperature");
    var conditionDiv = document.getElementById("condition");
    var humidityDiv = document.getElementById("humidity");
    var weatherIcon = document.getElementById("weather-icon");
    var locationInfo = document.getElementById("location-info");
    var latitudeSpan = document.getElementById("latitude");
    var longitudeSpan = document.getElementById("longitude");
    var locationButton = document.getElementById("location-button");

    function playSound() {
        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.play();
    }

    function fetchWeatherByCoordinates(latitude, longitude) {
        var apiKey = "291835a9ded15b956022cdaa99b41628"; // Replace with your OpenWeatherMap API key
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                citySpan.textContent = data.name;
                temperatureDiv.textContent = ` ${data.main.temp}°C`;
                conditionDiv.textContent = ` ${data.weather[0].description}`;
                humidityDiv.textContent = ` ${data.main.humidity}%`;
                weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                citySpan.textContent = "City not found";
                temperatureDiv.textContent = "";
                conditionDiv.textContent = "";
                humidityDiv.textContent = "";
                weatherIcon.src = "";
            }
        };
        xhr.send();
    }

    function getLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                latitudeSpan.textContent = latitude.toFixed(2);
                longitudeSpan.textContent = longitude.toFixed(2);
                fetchWeatherByCoordinates(latitude, longitude);
            }, function (error) {
                locationInfo.textContent = "Location not available";
            });
        } else {
            locationInfo.textContent = "Geolocation is not supported by your browser";
        }
    }

    locationButton.addEventListener("click", function () {
        getLocationWeather();
    });
});

