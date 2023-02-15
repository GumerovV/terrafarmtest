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