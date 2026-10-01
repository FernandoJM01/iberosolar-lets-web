(function() {
let lastModifiedTime = 0;

let weather = {
  irradiance: null,
  feels: null,
  pressure: null,
  humidity: null,
  wind_speed: null,
  precipitation: null
};

let weather_main = {
  airQuality: null,
  temp : null,
  pollutant: null,
  index: null,
  day: null,
  month: null,
  time: null
};

let file_name = 'data-floating2.txt';
let graph_path = './../images/graphs/contingencia2.png';
let index_Graph, quality_Color;
let myChart, myChart_Back, myChart_Mid;
let count = 0;

function setHeightGraph() {
  const height = document.querySelector('.chartBox').offsetHeight;
  document.querySelector('.irradiance').style.height = `${height/(368/195)}px`;
}

async function updateWeatherData2(file_name, weather, weather_main) {
  try {
    const text = await fetchText(file_name);
    parseWeatherData(text, weather, weather_main);
    if(count < 1){
      drawCharts(weather_main);
      count++;
    }else{
      updatesCharts(weather_main);
    }
    if(weather){
      updateDynamicValues(weather);
    }
  } catch (error) {
    console.error('Error updating weather data:', error);
  }
}

function updateDynamicValues(weather, weather_main) {
  let timestamp = new Date().getTime();
  let updated_graph_path = graph_path + '?=' + timestamp;
  let updateGraph = document.querySelectorAll('#IrradianceGraph');

  updateGraph.forEach(element => {
    element.src = updated_graph_path;
  });

  document.getElementById('Irradiance').textContent = weather.irradiance;
  document.getElementById('Temp').textContent = weather_main.temp;
  document.getElementById('Feels').textContent = weather.feels;
  document.getElementById('Pressure').textContent = weather.pressure;
  document.getElementById('Humidity').textContent = weather.humidity;
  document.getElementById('Wind_Speed').textContent = weather.wind_speed;
  document.getElementById('Precipitation').textContent = weather.precipitation;
}


// Fetch text from a file
async function fetchText(file_name) {
  const response = await fetch(file_name, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.text();
}

// Parse text data to update weather and weather_main objects
function parseWeatherData(text, weather, weather_main) {
  const lines = text.split(";");
  if (weather) {
    //weather.irradiance = lines[3];
    weather.feels = parseInt(lines[8]);
    weather.pressure = parseInt(lines[6]);
    weather.humidity = parseInt(lines[5]);
    weather.wind_speed = parseInt(lines[9]);
    weather.precipitation = parseInt(lines[7]);
  }
  if (weather_main) {
    weather_main.airQuality = lines[0];
    weather_main.pollutant = lines[1];
    weather_main.index = parseInt(lines[2]);
    weather_main.temp = parseInt(lines[4]);
    weather_main.day = lines[10];
    weather_main.month = lines[11];
    weather_main.time = lines[12];
  }
}

// Check for updates and update weather data if modified
async function checkForUpdate(file_name, weather, weather_main) {
  const response = await fetch(file_name, { method: 'HEAD' });
  const modifiedTime = response.headers.get('last-modified');
  if (!modifiedTime) return;
  
  const modifiedTimestamp = new Date(modifiedTime).getTime();
  if (modifiedTimestamp !== lastModifiedTime) {
    lastModifiedTime = modifiedTimestamp;
    await updateWeatherData2(file_name, weather, weather_main);
  }
}

// Check for updates and schedule periodic checks
async function checkAndScheduleUpdates(file_name, weather, weather_main) {
  try {
    while (true) {
      await checkForUpdate(file_name, weather, weather_main);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
  } catch (error) {
    console.error('Error during periodic check:', error);
  }
}

const colorCategories = {
  good: 'rgba(18, 211, 18, 1)',
  moderate: 'rgba(255, 255, 0, 1)',
  usg: 'rgba(255, 153, 0, 1)',
  unhealthy: 'rgba(255, 0, 0, 1)',
  very_unhealthy: 'rgba(162, 0, 255, 1)',
  hazardous: 'rgba(90, 59, 4, 0.86)'
}; 

function getQualityColor(needleValue){
  // Define the color ranges
  const colorRanges = [
    {min: 0, max: 50, color: 'good'},
    {min: 51, max: 100, color: 'moderate'},
    {min: 101, max: 150, color: 'usg'},
    {min: 151, max: 200, color: 'unhealthy'},
    {min: 201, max: 300, color: 'very_unhealthy'},
    {min: 301, max: Infinity, color: 'hazardous'}
  ]

  // Find the color range that matches the needle value
  for(const range of colorRanges){
    if(needleValue >= range.min && needleValue <= range.max){
      return colorCategories[range.color];
    }
  }
  return 'white';
}

function index_Display(index){
  if(index > 200 && index < 301){
    index = ((index - 200) / 2) + 200;
    return index;
  }else if(index > 300 && index < 501){
    index = ((index - 300) / 4) + 250;
    return index; 
  }
  return index;
}


function redrawCanva(weather_main){
  let index = weather_main.index, pollutant = weather_main.pollutant;
  let date_day = weather_main.day, date_month = weather_main.month, date_time = weather_main.time;
  let temp = weather_main.temp;
  const myCanvas = document.getElementById('circleBottom');
  const ctx = myCanvas.getContext('2d');
  let measureIndex;

  //Clear Canvas
  ctx.clearRect(97, 35, 33, 20);
  ctx.clearRect(244, 35, 40, 20);
  ctx.clearRect(78, 115, 120, 20);
  ctx.clearRect(78, 130, 120, 20);
  ctx.clearRect(235, 110, 80, 20);

  // ctx.fillStyle = "white";
  // ctx.fillRect(97, 35, 33, 20);
  // ctx.fillRect(244, 35, 40, 20);
  // ctx.fillRect(78, 115, 120, 20);
  // ctx.fillRect(235, 110, 80, 20);
  //ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  //Update Data
  measureIndex = ctx.measureText(index);
  ctx.font = 'bold 16px "Roboto", sans-serif';
  if(measureIndex.width > 25){
    ctx.fillText(index, 97, 51);
  }else{
    ctx.fillText(index, 104, 51);
  }
  ctx.fillText(pollutant, 244, 51);
  ctx.font = 'italic bold 14px "Roboto", sans-serif'; //83,128
  ctx.fillText(date_day + "  " + date_month + "  CST", 90, 127);
  ctx.font = 'italic bold 14px "Roboto", sans-serif';
  ctx.fillText(date_time, 119, 150);
  ctx.fillText(temp + "  °C", 248, 127);
}

function updateMidCanva(weather_main){
  let airQualitys = weather_main.airQuality;
  let xMid;

  // console.log(myChart_Mid._plugins._cache[7].plugin.afterDatasetsDraw);
  myChart_Mid._plugins._cache[7].plugin.afterDatasetsDraw = function(chart, args, plugins){
  const {ctx, data} = chart;
  ctx.save();
  const xCenterMid = chart.getDatasetMeta(0).data[0].x;
  const yCenterMid = chart.getDatasetMeta(0).data[0].y;
  let canvasWidth = chart.width;
  let textWidth;
  const fontSize = xCenterMid * .2666666;
  // AirQuality Letters
  ctx.fillStyle = 'white';
  if(airQualitys != 'Extremadamente Mala'){
    ctx.font = 'italic 700 ' + fontSize + 'px "Roboto", sans-serif';
    textWidth = ctx.measureText(airQualitys).width;
    ctx.fillText(airQualitys, (chart.width - textWidth) / 2, yCenterMid * 0.684210);
  }else{
    ctx.font = 'italic 700 ' + (fontSize - 7) + 'px "Roboto", sans-serif';
    textWidth = ctx.measureText('Extremadamente').width;
    ctx.fillText('Extremadamente', (chart.width - textWidth) / 2, yCenterMid * 0.5684);
    textWidth = ctx.measureText('Mala').width;
    ctx.fillText('Mala', (chart.width - textWidth) / 2, yCenterMid * 0.8);
  }
  ctx.restore();       
  }
}


function updatesCharts(weather_main){
  index_Graph = index_Display(weather_main.index);
  myChart.data.datasets[0].needleValue = index_Graph;
  myChart_Mid.data.datasets[0].needleValue = weather_main.index;
  // Updates Color
  quality_Color = getQualityColor(weather_main.index);
  myChart_Mid.data.datasets[0].backgroundColor = quality_Color;
  updateMidCanva(weather_main);
  myChart.update();
  myChart_Mid.update();
  redrawCanva(weather_main);
}

function calcXposition_MidCircle(text){
  if(text === 'Buena') 
    return 54;
  else if(text === 'Mala')
    return 65 ;
  else if(text === 'Muy Mala' || text === 'Aceptable' || text === 'Peligrosa')
    return 40;
}

function drawCharts(weather_main){
  let animationSet = true;
  let measureIndex;
  let index = weather_main.index, pollutant = weather_main.pollutant;
  let date_day = weather_main.day, date_month = weather_main.month, date_time = weather_main.time;
  let airQualitys = weather_main.airQuality;
  let temp = weather_main.temp;
  index_Graph = index_Display(index);
  quality_Color = getQualityColor(index);

  // ===== Gauge Graph =====
  //function gaugeGraphChart(){
    // setup
    const data = {
    labels: ['Buena', 'Aceptable', 'Mala', 'Muy Mala', 'Extremadamente Mala', 'Peligrosa'],
    datasets: [{
      label: 'Índice de Calidad de Aire',
      data: [50, 50, 50, 50, 50, 50],
      backgroundColor: [
        colorCategories['good'],
        colorCategories['moderate'],
        colorCategories['usg'],
        colorCategories['unhealthy'],
        colorCategories['very_unhealthy'],
        colorCategories['hazardous'],
        'rgba(90, 59, 4, 0.86)',
      ],
      borderColor: [
        colorCategories['good'],
        colorCategories['moderate'],
        colorCategories['usg'],
        colorCategories['unhealthy'],
        colorCategories['very_unhealthy'],
        colorCategories['hazardous'],
      ],
      borderWidth: 1.5,
      circumference: 180,
      rotation: 270,
      cutout: '70%',
      borderRadius: 1,
      borderColor: 'white',
      needleValue: index_Graph
      }]
    };

    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart, args, plugins){
        const { ctx, data } = chart;

        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const angle = Math.PI;

        const dataTotal = data.datasets[0].data.reduce((a, b) =>
        a + b, 0);

        const cx = chart._metasets[0].data[0].x;
        const cy = chart._metasets[0].data[0].y;
        const angles2 = angle + (1 / dataTotal * needleValue * angle);

        let circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;
        const needleValueAngle = circumference + 1.5; 

        ctx.translate(xCenter, yCenter);
        ctx.rotate(angle * needleValueAngle);

        // Needle
        ctx.beginPath();
        ctx.strokeStyle = 'darkgray';
        ctx.fillStyle =  'darkgray';
        ctx.moveTo(-outerRadius * .020, 0);
        ctx.lineTo(0, -outerRadius + 6);
        ctx.lineTo(+outerRadius * .030, 0);
        ctx.stroke();
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius * .03, angle * 0, angle * 2, false);
        ctx.fill();
        ctx.restore();       
      }
    }

    // Tooltip
    const labelTooltip = (tooltipItems) => {
      return '';
    };

    // config
    const config = {
      type: 'doughnut',
      data,
      options: {
        aspectRatio: 1.8,
        mantainAspectRatio: false,
        animation: {
          animateRotate: animationSet,
          animateScale: false,
        },
        plugins:{
          legend: {
            display: false
          },
          tooltip: {
            yAlign: 'bottom',
            titleMarginBottom: 0,
            callbacks: {
              label: labelTooltip,
            }
          }
        }
      },
      plugins: [gaugeNeedle]
    };

    // render init block
    if(count < 2){
      myChart = new Chart(
      document.getElementById('myChart'),
      config
      );
    }else{
      myChart.update('none');
    }
  //}

  // ==== Background Circle ====
  function backgroundCircleChart(){
    // setup
    const data_Back = {
      labels: ['Buena'],
      datasets: [{
        label: 'Índice de Calidad de Aire',
        data: [100],
        backgroundColor: [
          'rgba(0, 18, 42, 255)',
        ],
        borderColor: [
          'rgba(0, 18, 42, 255)',
        ],
        borderWidth: 1.5,
        circumference: 360,
        rotation: 270,
        borderRadius: 1,
        // borderColor: 'white',
        needleValue: 120
      }]
    };
    const backcircle = {
      id: 'backcircle',
      afterDatasetsDraw(chart, args, plugins){
        const { ctx, data } = chart;
        const xCenterBack = chart.getDatasetMeta(0).data[0].x;
        const yCenterBack = chart.getDatasetMeta(0).data[0].y;
        ctx.save();
        const circuleBottom = new Image();
        circuleBottom.src = "CircleBottom.png";
        circuleBottom.onload = function() {
        // ctx.drawImage(circuleBottom, 17, 281, 365.65, 119.82);
        ctx.drawImage(circuleBottom, xCenterBack * 0.085, yCenterBack * 1.405, xCenterBack * 1.82825, yCenterBack * .5991);
        }
        ctx.restore();
      }
    }

    // config
    const config_Back = {
      type: 'pie',
      data: data_Back,
      options: {
        aspectRatio: 1,
        animation: false,
        plugins:{
          legend: {
            display: false
          },
          tooltip: {
            yAlign: 'bottom',
            titleMarginBottom: 0,
            enabled: false,
            callbacks: {
              label: labelTooltip,
            }
          }
          
        }
      },
      plugins: [backcircle]
    };

    // render init block
    myChart_Back = new Chart(
      document.getElementById('myChart_Back'),
      config_Back
    );
  }


  // ==== Mid-Circle ==== 
  function midCircleChart(){
    const data_Mid = {
      labels: ['Buena'],
      datasets: [{
        label: 'Índice de Calidad de Aire',
        data: [50],
        backgroundColor: [
          quality_Color,
        ],
        borderColor: [
          quality_Color,
        ],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: '0%',
        borderRadius: 1,
        borderColor: 'white',
        needleValue: 50
      }]
    };

    const gaugeNeedle_Mid = {
      id: 'gaugeNeedle_Mid',
      afterDatasetsDraw(chart, args, plugins){
        const { ctx, data } = chart;
        ctx.save();
        const xCenterMid = chart.getDatasetMeta(0).data[0].x;
        const yCenterMid = chart.getDatasetMeta(0).data[0].y;
        let canvasWidth = chart.width;
        let textWidth;
        // let percentaje = xCenterMid / 90;
        // let xMid = calcXposition_MidCircle(airQualitys) * percentaje;
        const fontSize = xCenterMid * .2666666;
        // AirQuality Letters
        ctx.fillStyle = 'white';
        if(airQualitys != 'Extremadamente Mala'){
          ctx.font = 'italic 700 ' + fontSize + 'px "Roboto", sans-serif';
          textWidth = ctx.measureText(airQualitys).width;
          // ctx.font = 'italic 700 24px "Roboto", sans-serif';
          //ctx.fillText(airQualitys, xMid, yCenterMid * 0.684210);
          ctx.fillText(airQualitys, (chart.width - textWidth) / 2, yCenterMid * 0.684210);
        }else{
          ctx.font = 'italic 700 ' + (fontSize - 7) + 'px "Roboto", sans-serif';
          textWidth = ctx.measureText('Extremadamente').width;
          ctx.fillText('Extremadamente', (chart.width - textWidth) / 2, yCenterMid * 0.5684);
          textWidth = ctx.measureText('Mala').width;
          ctx.fillText('Mala', (chart.width - textWidth) / 2, yCenterMid * 0.8);
        }
        ctx.restore();       
      },
    }

    // config
    const config_Mid = {
      type: 'doughnut',
      data: data_Mid,
      options: {
        aspectRatio: 1.8,
        animation:{
          // animateRotate: animationSet,
          animateRotate: false,
          animateScale: false,
        },
        // mantainAspectRatio: true,
        plugins:{
          legend: {
            display: false
          },
          tooltip: {
            yAlign: 'bottom',
            titleMarginBottom: 0,
            enabled: false,
            callbacks: {
              label: labelTooltip,
            }
          }
        }
      },
      plugins: [gaugeNeedle_Mid],
    };

    // render init block
    myChart_Mid = new Chart(
      document.getElementById('myChart_Mid'),
      config_Mid
    );
  }

  // ==== Letters Bottom ====
  function bottomInfo(){
    // Set the width and height before accessing canvas properties
    const myCanvas = document.getElementById('circleBottom');
    myCanvas.width = 400;
    myCanvas.height = 150;

    const ctx = myCanvas.getContext('2d');

    const circle_Bottom = () => {
      const xcenter = myCanvas.width / 2;
      const ycenter = myCanvas.height / 2;
      let measureWord;
      const header = 'Calidad de Aire Actual';

      ctx.save();
      ctx.font = '500 16px "Roboto", sans-serif';
      ctx.fillStyle = 'white';
      measureWord = ctx.measureText(header).width;
      // console.log(((2 * xcenter) - (measureWord) )/ 2);
      ctx.fillText(header, ((2 * xcenter) - (measureWord) )/ 2, 20);
      // ctx.fillText("Calidad de Aire Actual", 120, 20);
      ctx.fillText(" NowCast AQI", 130, 51);

      // Dynamic Variables
      measureIndex = ctx.measureText(index);
      ctx.font = 'bold 16px "Roboto", sans-serif';
      if(measureIndex.width > 25){
        ctx.fillText(index, 97, 51);
      }else{
        ctx.fillText(index, 104, 51);
      }
      ctx.fillText(pollutant, 244, 51);
      ctx.restore();

      // Line Decoration
      ctx.beginPath();
      ctx.lineWidth = .8;
      ctx.strokeStyle = 'white';
      ctx.moveTo(236, 30);
      ctx.lineTo(236, 57);
      ctx.stroke();
      
      // Date info
      ctx.font = 'italic 15px "Roboto", sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText("Actualizado", 92, 99);
      ctx.font = 'italic bold 14px "Roboto", sans-serif'; //83,128
      ctx.fillText(date_day + "  " + date_month + "  CST", 90, 127);
      ctx.fillText(date_time, 119, 150);

      // Dooted Line 
      ctx.beginPath();
      ctx.lineWidth = .8;
      ctx.strokeStyle = 'white';
      ctx.setLineDash([5,7]); // Pattern: [dash length, gap length]
      ctx.moveTo(200, 80);
      ctx.lineTo(200, 165);
      ctx.stroke();    

      // Temperature Info
      ctx.font = 'italic 15px "Roboto", sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText("Temperature", 229, 99);
      ctx.font = 'italic bold 14px "Roboto", sans-serif';
      ctx.fillText(temp + "  °C", 248, 127);
    }

    // Call the function to draw
    circle_Bottom();
  }

  //Call functions
  // gaugeGraphChart();
  backgroundCircleChart();
  midCircleChart();
  bottomInfo();
}


// updateWeatherData(file_name, weather, weather_main);

function startWhenReady() {
  if (document.getElementById('myChart_Back')) {
    updateWeatherData2(file_name, null, weather_main);
    checkAndScheduleUpdates(file_name, null, weather_main);
  } else {
    setTimeout(startWhenReady, 100);
  }
}
startWhenReady();

})();