const requestURL = '/index_data'
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

function getParametrs(){
sendRequest('GET', requestURL)
  .then(data => {
    p1 = 50//data.temperature
    p2 = 50//data.air_humidity
    p3 = 50//data.soil_humidity
    
    var li_1 = document.getElementById("p1")
    li_1.innerHTML = 'Температура воздуха: ' + p1 + '°C'
    
    var li_2 = document.getElementById("p2")
    li_2.innerHTML = 'Влажность воздуха: ' + p2 + '%'
    
    var li_3 = document.getElementById("p3")
    li_3.innerHTML = 'Влажность почвы: ' + p3 + '%'
    
    console.log(p1, p2, p3)})
  .catch(err => console.log(err))
}

//getParametrs()
getParametrs()
setInterval(getParametrs, 5000)

function menu(){
    let windowtoggle = document.querySelector('.window_nav_main')
    windowtoggle.classList.toggle('active')
    let windowTexttoggle = document.querySelector('.window_nav_box')
    windowTexttoggle.classList.toggle('active_text')
    let menu = document.querySelector('.menu')
    menu.classList.toggle('activemenu')
    
}
function myFunction() {
  let text;
  let person = prompt("Введите удобное название для вашего горшочка^_^", document.getElementById("name").innerHTML);
  if (person == null || person == "") {
      text="Smartpot Plus";
  } else {
    text = person;
    document.getElementById("name").innerHTML = text;
  }
  
}

function push_water()
{
    if (confirm('Вы действительно хотите включить полив?')) 
        {
            console.log('+')
            sendRequest('GET', 'push_water')
        }
}

function push_fog()
{
    if (confirm('Вы действительно хотите включить туман?')) 
        {
            sendRequest('GET', 'fog_water')
        }
}