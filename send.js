const requestURL = '/index_data?getName=0'
var check = 0;

function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
   // body: JSON.stringify(body),
    headers: headers
  }).then(response => {
    if (response.ok) {
        return response.json()
    }
      
  })
}

function getParametrs(getName){
    if(getName == 1){
        sendRequest('GET', '/index_data?getName=1')
  .then(data => {
    p1 = data.temperature
    p2 = data.air_humidity
    p3 = data.soil_humidity
    name = data.name
    
    var li_1 = document.getElementById("p1")
    li_1.innerHTML = 'Температура воздуха: ' + p1 + '°C'
    
    var li_2 = document.getElementById("p2")
    li_2.innerHTML = 'Влажность воздуха: ' + p2 + '%'
    
    var li_3 = document.getElementById("p3")
    li_3.innerHTML = 'Влажность почвы: ' + p3 + '%'
  			
    var setName = document.getElementById("name")
	setName.innerHTML = name
			console.log(name)
			console.log(setName)
            
    
    console.log(p1, p2, p3)})
  .catch(err => console.log(err))
    }
    
    else{
        sendRequest('GET', requestURL)
  .then(data => {
    p1 = data.temperature
    p2 = data.air_humidity
    p3 = data.soil_humidity
			
    var li_1 = document.getElementById("p1")
    li_1.innerHTML = 'Температура воздуха: ' + p1 + '°C'
    
    var li_2 = document.getElementById("p2")
    li_2.innerHTML = 'Влажность воздуха: ' + p2 + '%'
    
    var li_3 = document.getElementById("p3")
    li_3.innerHTML = 'Влажность почвы: ' + p3 + '%'
    
    console.log(p1, p2, p3)})
  .catch(err => console.log(err))
    }

}

//getParametrs()
getParametrs(1)
setInterval(getParametrs, 5000, 0)


function myFunction() {
  let text;
  let person = prompt("Введите удобное название для вашей станции ^_^ (не более 20 символов)", document.getElementById("name").innerHTML);
  if (person == null || person == "") {
      text="Smartpot Plus";
  } else {
	  if (person.length <= 20){
		text = person;
		document.getElementById("name").innerHTML = text;
		sendRequest('GET', '/index/set?name=' + text)
	  }
	  else alert("Введено больше 20 символов")
  }
  
}

async function push_water()
{
    if (confirm('Вы действительно хотите полить растение?\n* Чрезмерное полив растений может навредить вашему растению!')) 
        {
			let response = await fetch('/push_water');
			let text = await 	response.text();
			alert(text)
        }
}

async function push_fog()
{
    if (confirm('Вы действительно хотите включить туман на 2 мин?\n* Чрезмерная влажность может навредить вашему растению!')) 
        {
			let response = await fetch('/push_fog');
			let text = await response.text();
			alert(text)
        }
}