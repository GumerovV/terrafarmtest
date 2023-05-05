function watering_save_data(){
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

function humididifier_save_data(){
    var min_humidity_soil = Number(document.getElementById('min_humidity_soil').value);
    var max_humidity_soil = Number(document.getElementById('max_humidity_soil').value);
    
    
    var err = document.getElementById('err');
    
    
    if (min_humidity_soil >= max_humidity_soil){
        err.style.display = 'block';
    }
    
    else if(max_humidity_soil <= 100 && max_humidity_soil >=0){
        err.style.display = 'none';
       
        const requestURL = '/humididifier_save_data/set?mode=0&' + 'max_humidity_air=' + max_humidity_soil + '&min_humidity_air=' + min_humidity_soil;
        sendRequest('GET', requestURL)
            .then(data => console.log(data));
        console.log(requestURL)
    }
}

function save_data_by_time(){
    var on = document.getElementById('on').value;
    var off = document.getElementById('off').value;
    
    const requestURL = '/humididifier_save_data/set?mode=1&' +'on=' + on + '&off=' + off;
    sendRequest('GET', requestURL)
        .then(data => console.log(data));
        console.log(requestURL)
}

function save_data_by_off(){
    const requestURL = '/humididifier_save_data/set?mode=2'
    sendRequest('GET', requestURL)
        .then(data => console.log(data));
        console.log(requestURL)
}


function mode_selection(flag){
    if (flag == 1){
		document.getElementById('mode1').checked = true;
        document.getElementById('thresholds').style.display = 'block';
        document.getElementById('time').style.display = 'none';
		document.getElementById('mode_off').style.display = 'none';
         chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
             min_value,
             max_value,
            // Больше данных ...
        ]
	}
         chart.update();
    }
    if (flag == 2){
		document.getElementById('mode2').checked = true;
        document.getElementById('thresholds').style.display = 'none';
		document.getElementById('mode_off').style.display = 'none';
        document.getElementById('time').style.display = 'block';
        chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
            
            
            // Больше данных ...
        ]
	}
         chart.update();
    }
	
	if (flag == 3){
		document.getElementById('mode3').checked = true;
		 document.getElementById('thresholds').style.display = 'none';
        document.getElementById('time').style.display = 'none';
        document.getElementById('mode_off').style.display = 'block';
		
		 chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
            
            
            // Больше данных ...
        ]
	}
         chart.update();
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




function menu(){
    let windowtoggle = document.querySelector('.window_nav_main')
    windowtoggle.classList.toggle('active')
    let windowTexttoggle = document.querySelector('.window_nav_box')
    windowTexttoggle.classList.toggle('active_text')
    let menu = document.querySelector('.menu')
    menu.classList.toggle('activemenu')
	let exittoggle = document.querySelector('.exit')
    exittoggle.classList.toggle('activeexit')
    
}


function def_values_plant(){
	sendRequest('GET', '/get_def_settings').then(data => {
		var min_humidity_soil = data.min_soil_molsture
		var max_humidity_soil = data.max_soil_molsture
		
	document.getElementById('min_humidity_soil').value = min_humidity_soil;
    document.getElementById('min_slider').value = min_humidity_soil;
    document.getElementById('max_humidity_soil').value = max_humidity_soil;
    document.getElementById('max_slider').value = max_humidity_soil;
    
    chart_set(1)
    chart_set(2)
	})
}

function def_values_humidifier_thresholds(){
	sendRequest('GET', '/get_def_settings').then(data => {
		var min_humidity_air = data.min_air_humidity
		var max_humidity_air = data.max_air_humidity
		
	document.getElementById('min_humidity_soil').value = min_humidity_air;
    document.getElementById('min_slider').value = min_humidity_air;
    document.getElementById('max_humidity_soil').value = max_humidity_air;
    document.getElementById('max_slider').value = max_humidity_air;
    
    chart_set(1)
    chart_set(2)
	})
}

function def_values_humidifier_time(){
	sendRequest('GET', '/get_def_settings').then(data => {
		var on = data.humidificator_work_time
		var off = data.humidificator_wait_time
		
		document.getElementById('on').value = on/60000;
    	document.getElementById('off').value = off/60000;
	})
}

function load_data_watering(){
	sendRequest('GET', '/watering_load_data')
  .then(data => {
		var min_humidity_soil = data.min_humidity_soil 
		var max_humidity_soil = data.max_humidity_soil
		var data_chart = data.soil	
		console.log(max_humidity_soil, min_humidity_soil, data_chart)
		
    document.getElementById('min_humidity_soil').value = min_humidity_soil;
    document.getElementById('min_slider').value = min_humidity_soil;
    document.getElementById('max_humidity_soil').value = max_humidity_soil
    document.getElementById('max_slider').value = max_humidity_soil;
		
	dataSales2021 = {
    label: "Настройки влажности почвы",
    data: data_chart, // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'green',// Цвет фона
    borderColor: 'green',// Цвет границы
    borderWidth: 3,// Толщина границ
    tension: 0.4
	};
    
		 max_value = {
    label: "Верхний порог влажности",
    data: [max_humidity_soil,max_humidity_soil,max_humidity_soil,max_humidity_soil,max_humidity_soil,max_humidity_soil,max_humidity_soil], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'rgb(167, 168, 126)',// Цвет фона
    borderColor: 'rgb(167, 168, 126)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
     };
    
   
	
    min_value = {
    label: "Нижний порог влажности",
    data: [min_humidity_soil,min_humidity_soil,min_humidity_soil,min_humidity_soil,min_humidity_soil,min_humidity_soil,min_humidity_soil], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'rgb(126, 168, 142)',// Цвет фона
    borderColor: 'rgb(126, 168, 142)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
      }
    
	chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
             min_value,
             max_value,
            // Больше данных ...
        ]
	}
	chart.update();
	
	})
    
}

function load_data_humidifier(){
	sendRequest('GET', '/humidifier_load_data')
  .then(data => {
		var mode = data.humidificator_state
		var min_humidity_air = data.min_air_humidity 
		var max_humidity_air = data.max_air_humidity
		var on = data.humidificator_work_time
		var off = data.humidificator_wait_time
		var data_chart = data.humidity
		console.log(max_humidity_air, min_humidity_air, data_chart)
		
		if (mode == '0'){
			mode_selection(1)
			document.getElementById('mode1').checked = true;	
		 	document.getElementById('min_humidity_soil').value = min_humidity_air;
			document.getElementById('min_slider').value = min_humidity_air;
			document.getElementById('max_humidity_soil').value = max_humidity_air
			document.getElementById('max_slider').value = max_humidity_air;
			
			document.getElementById('on').value = on;
    		document.getElementById('off').value = off;
				
	dataSales2021 = {
    label: "Настройки влажности воздуха",
    data: data_chart, // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'green',// Цвет фона
    borderColor: 'green',// Цвет границы
    borderWidth: 3,// Толщина границ
    tension: 0.4
	};
    
		 max_value = {
    label: "Верхний порог влажности",
    data: [max_humidity_air,max_humidity_air,max_humidity_air,max_humidity_air,max_humidity_air,max_humidity_air,max_humidity_air], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'rgb(167, 168, 126)',// Цвет фона
    borderColor: 'rgb(167, 168, 126)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
     };
    
   
	
    min_value = {
    label: "Нижний порог влажности",
    data: [min_humidity_air,min_humidity_air,min_humidity_air,min_humidity_air,min_humidity_air,min_humidity_air,min_humidity_air], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'rgb(126, 168, 142)',// Цвет фона
    borderColor: 'rgb(126, 168, 142)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
      }
    
	chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
             min_value,
             max_value,
            // Больше данных ...
        ]
	}
	chart.update();
		}
		
		if (mode == '1'){
			mode_selection(2)
			document.getElementById('mode2').checked = true;
			document.getElementById('on').value = on;
    		document.getElementById('off').value = off;
			
		 	document.getElementById('min_humidity_soil').value = min_humidity_air;
			document.getElementById('min_slider').value = min_humidity_air;
			document.getElementById('max_humidity_soil').value = max_humidity_air
			document.getElementById('max_slider').value = max_humidity_air;
				
	dataSales2021 = {
    label: "Настройки влажности воздуха",
    data: data_chart, // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'green',// Цвет фона
    borderColor: 'green',// Цвет границы
    borderWidth: 3,// Толщина границ
    tension: 0.4
	};
			
	chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
            // Больше данных ...
        ]
	}
	chart.update();
		}
		
		if (mode == '2'){
			mode_selection(3)
		}
	})
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
function chart_set(flag){
     if(flag == 1){
        var max_slider = document.getElementById('max_slider').value;
     max_value = {
    label: "Верхний порог влажности",
    data: [max_slider,max_slider,max_slider,max_slider,max_slider,max_slider,max_slider], // Данные представляют собой массив, который должен иметь такое же количество значений, как и количество тегов.
	fill: false,
    backgroundColor: 'rgb(167, 168, 126)',// Цвет фона
    borderColor: 'rgb(167, 168, 126)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
     };
    
    
	chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
             min_value,
             max_value,
            // Больше данных ...
        ]
	}
	
	
	chart.update();  
     }
     else{
          var min_slider = document.getElementById('min_slider').value;
      min_value = {
    label: "Нижний порог влажности",
    data: [min_slider,min_slider,min_slider,min_slider,min_slider,min_slider,min_slider],
	fill: false,
    backgroundColor: 'rgb(126, 168, 142)',// Цвет фона
    borderColor: 'rgb(126, 168, 142)',// Цвет границы
    borderWidth: 3,// Толщина границ
    pointRadius: 0,
    tension: 0.4
      };
    
	chart.data = {
		labels: tags,
		datasets: [
            dataSales2021,
             min_value,
             max_value,
            // Больше данных ...
        ]
	}
	
	
	chart.update();  
     }
     
     
}
function set_input_value(flag){
    if (flag == 1){
        var input_value = document.getElementById('max_humidity_soil').value;
        document.getElementById('max_slider').value = input_value;
        chart_set(1)
    }
    else{
        var input_value = document.getElementById('min_humidity_soil').value;
        document.getElementById('min_slider').value = input_value;
        chart_set(2)
    }
}





