const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value.trim();
  if (cityVal === "") {
    city_name.innerText = "Please write city name before search";
    datahide.classList.add('data_hide');
  } else {
    try {
      let url = `/weather-data-secure?city=${cityVal}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.cod === '404') {
        throw new Error('City not found');
      }

      city_name.innerText = `${data.name}, ${data.sys.country}`;
      temp_real_val.innerText = data.main.temp;
      const tempMood = data.weather[0].main;
      console.log(tempMood);

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
      }

      datahide.classList.remove('data_hide');
      cityVal = "";
    } catch (error) {
      city_name.innerText = `Please write a correct city name. Error: ${error.message}`;
      datahide.classList.add('data_hide');
    }
  }
};

submitBtn.addEventListener('click', getInfo);
