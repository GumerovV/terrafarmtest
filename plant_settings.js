function save_data(){
    var min_humidity_soil = Number(document.getElementById('min_humidity_soil').value);
    var max_humidity_soil = Number(document.getElementById('max_humidity_soil').value);
    
    
    var err = document.getElementById('err');
    
    
    if (min_humidity_soil >= max_humidity_soil){
        err.style.display = 'block';
    }
    
    else if(max_humidity_soil <= 100 && max_humidity_soil >=0){
        err.style.display = 'none';
       
        const requestURL = '/watering_save_data/set?max_humidity_soil=' + max_humidity_soil + '&min_humidity_soil=' + min_humidity_soil;
        sendRequest('GET', requestURL)
            .then(data => console.log(data));
        console.log(requestURL)
    }
}

function save_data_by_time(){
    var on = document.getElementById('on').value;
    var off = document.getElementById('off').value;
    
    const requestURL = '/watering_save_data/set?on=' + on + '&off=' + off;
    sendRequest('GET', requestURL)
        .then(data => console.log(data));
        console.log(requestURL)
}

function set_slider_value(flag){
    if (flag == 1){
        var max_slider = document.getElementById('max_slider').value;
         document.getElementById('max_humidity_soil').value = max_slider;
    }
    else{
        var min_slider = document.getElementById('min_slider').value;
        document.getElementById('min_humidity_soil').value = min_slider;
    }
}

function set_input_value(flag){
    if (flag == 1){
        var input_value = document.getElementById('max_humidity_soil').value;
        document.getElementById('max_slider').value = input_value;
    }
    else{
        var input_value = document.getElementById('min_humidity_soil').value;
        document.getElementById('min_slider').value = input_value;
    }
}

function mode_selection(flag){
    if (flag == 1){
        document.getElementById('thresholds').style.display = 'block';
        document.getElementById('time').style.display = 'none';
    }
    else{
        document.getElementById('thresholds').style.display = 'none';
        document.getElementById('time').style.display = 'block';
    }
}

//                      Отправка запросов


function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    headers: headers
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}


var ctx = document.querySelector("#myChart").getContext('2d');
ctx.canvas.parentNode.style.height = '400px';
ctx.canvas.parentNode.style.width = '500px';
const tags = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const dataSales2020 = {
    label: "Настройки влажности почвы",
    data: [13, 15, 80, 34, 43, 28,63], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
    //backgroundColor: 'rgba(54, 162, 235, 0.2)', // Цвет фона
    borderColor: 'black', // Цвет границы
    borderWidth: 3,// Толщина границ
};
const dataSales2021 = {
    label: "Настройки влажности воздуха",
    data: [23, 45, 30, 78, 13, 65, 23], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
    //backgroundColor: 'rgba(255, 159, 64, 0.2)',// Цвет фона
    borderColor: 'green',// Цвет границы
    borderWidth: 3,// Толщина границ
};
new Chart(ctx, {
    type: 'line',// Тип графики
    data: {
        labels: tags,
        datasets: [
            dataSales2020,
            dataSales2021,
            // Больше данных ...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
          maintainAspectRatio: false,
                }
            }],
        },
    }
})

Chart.defaults.global.defaultFontColor = "#fff";

function menu()
{
    let windowtoggle = document.querySelector('.window_nav_main')
    windowtoggle.classList.toggle('active')
    let windowTexttoggle = document.querySelector('.window_nav_box')
    windowTexttoggle.classList.toggle('active_text')
    let menu = document.querySelector('.menu')
    menu.classList.toggle('activemenu')
}

function def_values_plant(){
    document.getElementById('min_humidity_soil').value = "10";
    document.getElementById('min_slider').value = "10";
    document.getElementById('max_humidity_soil').value = "18";
    document.getElementById('max_slider').value = "18";
    
    sendRequest('GET', 'watering_def_values');
}

function def_values_humidifier_thresholds(){
    document.getElementById('min_humidity_soil').value = "10";
    document.getElementById('min_slider').value = "10";
    document.getElementById('max_humidity_soil').value = "18";
    document.getElementById('max_slider').value = "18";
    
    sendRequest('GET', 'humididifier_def_values_thresholds');
}

function def_values_humidifier_time(){
    document.getElementById('on').value = "10";
    document.getElementById('off').value = "60";
    
    sendRequest('GET', 'humididifier_def_values_time');
}

