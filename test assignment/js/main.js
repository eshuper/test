// data 
const weather = [
  {   
      // 12jan local date time gmt+4
      date: 1547251200000, 
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 13jan
      date: 1547337600000,
      temperature: {
        night: -20,
        day: -10,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 14jan
      date: 1547424000000,
      temperature: {
        night: -23,
        day: -5,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 15jan
      date: 1547496000000,
      temperature: {
        night: -5,
        day: 0,
      },
      cloudiness: "Облачно",
      snow: false,
      rain: true,
    },
    {
      // 16jan
      date: 1547582400000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: false,
    },
    {
      // 17jan
      date: 1547668800000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 18jan
      date: 1547755200000,
      temperature: {
        night: -20,
        day: -10,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: false,
    },
    {
      // 19jan
      date: 1547841600000,
      temperature: {
        night: -19,
        day: -14,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: true,
    },
    {
      // 20jan
      date: 1547928000000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 21jan
      date: 1548014400000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 22jan
      date: 1548100800000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Облачно",
      snow: false,
      rain: true,
    },
    {
      // 23jan
      date: 1548187200000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 24jan
      date: 1548273600000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Ясно",
      snow: false,
      rain: false,
    },
    {
      // 25jan
      date: 1548360000000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: false,
    },
    {
      // 26jan
      date: 1548446400000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: false,
    },
    {
      // 27jan
      date: 1548532800000,
      temperature: {
        night: -13,
        day: -7,
      },
      cloudiness: "Облачно",
      snow: true,
      rain: false,
    }
  ]

  // stuff for app

  function checkDate(date) {
    let m = new Date (date);
    let mon = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    return `${m.getDate()} ${mon[m.getMonth()]}`
  };

  function iconCheck(weather) {
    if (weather.cloudiness === "Облачно" && weather.snow === false && weather.rain === false) {
      return 'wi-cloud'
    } else if (weather.cloudiness === "Облачно" && weather.snow === true && weather.rain === false) {
      return 'wi-snow'
    } else if (weather.cloudiness === "Облачно" && weather.snow === false && weather.rain === true) {
      return 'wi-rain'
    } else if (weather.cloudiness === "Облачно" && weather.snow === true && weather.rain === true) {
      return 'wi-sleet'
    } else {
      return 'wi-day-sunny';
    }
  };

  function rainfallCheck(weather) {
    if (weather.rain === true && weather.snow === false) {
      return 'дождь'
    } else if (weather.rain === true && weather.snow === true) {
      return 'дождь со снегом'
    } else if (weather.rain === false && weather.snow === true) {
      return 'снег'
    } else {
      return 'без осадков'
    }
  }

  function checkDay(date) {
    let dayJson = new Date (date);
    let dayJsonCheck = dayJson.getDay();
    let dayToday = new Date().getDay();
    if (dayJsonCheck === dayToday) {
      return 'cегодня'
    } else {
      return dayJson.toLocaleString("ru", {weekday: 'long'});
    }
  }

  function weatherTemplate(weather) {
    let today = new Date().valueOf();
    let todayJson = new Date(weather.date).valueOf();
    if (todayJson>(today-86400000)&&todayJson<(today+86400000*6)){
      return `
        <div class="weather-block">
          <p class="weather-block__daynumber">${checkDay(weather.date)}</p>
          <h3 class="weather-block__date">${checkDate(weather.date)}</h3>
          <i class="wi ${iconCheck(weather)}"></i>
          <p class="weather-block__tem_day">днем ${weather.temperature.day}</p>
          <p class="weather-block__tem_night">ночью ${weather.temperature.night}</p>
          <p class="weather-block__rainfall">${rainfallCheck(weather)}</p>
        </div>
    `
    }
  };

  // app

  document.getElementById("app").innerHTML = `
  <h1 class="title">Прогноз погоды</h1>
  <div class="weather-blocks">
  ${weather.map(weatherTemplate).join('')}
  </div>
  `;

  // slider

  document.querySelector(".prev").onclick = sliderLeft;
  document.querySelector(".next").onclick = sliderRight;

  let appBlockPosition = 0;
  let slider = document.querySelector(".weather-blocks");

  function sliderLeft() {
    if(appBlockPosition < 0) {
      appBlockPosition = appBlockPosition + 201;
      slider.style.left = appBlockPosition + 'px';
    }  
  }

  function sliderRight() {
    if(appBlockPosition > -603) {
      appBlockPosition = appBlockPosition - 201;
      slider.style.left = appBlockPosition + 'px';
    }
  }


  

