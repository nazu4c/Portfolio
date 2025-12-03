
async function getCoords(city) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
  const data = await res.json();
  if (data.length === 0) throw new Error("Ville introuvable");
  return { lat: data[0].lat, lon: data[0].lon };
}


async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m,precipitation&current_weather=true`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}


function displayCurrentWeather(data) {
  document.getElementById("weatherDesc").textContent = "Conditions : Actuelles";
  document.getElementById("temp").textContent = `Température : ${data.current_weather.temperature}°C`;
  document.getElementById("wind").textContent = `Vent : ${data.current_weather.windspeed} km/h`;
}


function displayCharts(hourly) {
  const labels = hourly.time.map(t => t.slice(11,16)); // heures
  const tempData = hourly.temperature_2m;
  const windData = hourly.windspeed_10m;
  const precipData = hourly.precipitation;

  new Chart(document.getElementById("tempChart"), {
    type: 'line',
    data: { labels, datasets: [{ label: "Température (°C)", data: tempData, borderColor: "#FF4500", tension: 0.4 }] }
  });

  new Chart(document.getElementById("windChart"), {
    type: 'line',
    data: { labels, datasets: [{ label: "Vitesse du vent (km/h)", data: windData, borderColor: "#1E90FF", tension: 0.4 }] }
  });

  new Chart(document.getElementById("precipChart"), {
    type: 'line',
    data: { labels, datasets: [{ label: "Précipitations (mm)", data: precipData, borderColor: "#32CD32", tension: 0.4 }] }
  });
}


document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  try {
    const coords = await getCoords(city);
    const weather = await getWeather(coords.lat, coords.lon);
    displayCurrentWeather(weather);
    displayCharts(weather.hourly);
  } catch(e) {
    alert(e.message);
  }
});

window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingContent = document.querySelector('.loading-content');
  const mainContent = document.getElementById('main-content');

  const minDuration = 750; // ms
  const startTime = Date.now();

  const allImages = Array.from(document.images);
  const imagePromises = allImages.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });

  Promise.all(imagePromises).then(() => {
    const timeElapsed = Date.now() - startTime;
    const remainingTime = Math.max(minDuration - timeElapsed, 0);

    setTimeout(() => {

      loadingContent.style.transform = 'scale(0.8)';
      loadingContent.style.opacity = '0';

      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';

        setTimeout(() => {
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
        }, 600);
      }, 500);
    }, remainingTime);
  });
});