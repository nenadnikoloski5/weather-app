const app = (function() {

    'use strict';

    
    const inputSearch = document.querySelector("input");
    const windValue = document.getElementsByClassName("val swap")[0];
    const humidityValue = document.getElementsByClassName("val swap")[1];
    const visibillityValue = document.getElementsByClassName("val swap")[2];
    const pressureValue = document.getElementsByClassName("val swap")[3];
    const storeForecastsIn = document.getElementsByClassName("center")[0];

    let input = document.querySelector(".myInput");

    input.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.querySelector(".searchButton").click();
      }
    });

    function average(a, b) {
        // force the input as numbers *1
    return ((a*1 + b*1) /2);
    }


    function searchNow(){
        fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${inputSearch.value}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          //console.log(myJson);

            if(myJson.query.results != null){

                inputSearch.style = ""
            
            document.getElementById("currentDetails").attributes[1].value = "";


            // document.getElementsByClassName("center")[0].children.forEach(function(ele){
            //     ele.destroy()
            // })

            // debugger;
            for(let i = 0; i < document.getElementsByClassName("center")[0].children.length; i++){
                // console.log(i)
                // console.log("LENGTH "+document.getElementsByClassName("center")[0].children.length)
                // console.log(document.getElementsByClassName("center")[0].children[i])
                document.getElementsByClassName("center")[0].children[i].remove()
                i--
            }

       


          windValue.textContent = myJson.query.results.channel.wind.speed + " mph";
          humidityValue.textContent = myJson.query.results.channel.atmosphere.humidity + "%";
          visibillityValue.textContent = myJson.query.results.channel.atmosphere.visibility+ "+ mi";
          pressureValue.textContent = myJson.query.results.channel.atmosphere.pressure + " mb";
        //   console.log(windValue.textContent)
        //   console.log(humidityValue.textContent)
        //   console.log(visibillityValue.textContent)
        //   console.log(pressureValue.value)

            myJson.query.results.channel.item.forecast.forEach(function(ele){

           

            
          let newForecast = document.createElement("div");

          let whichIcon = "";

          if(ele.text === "Cloudy"){
              whichIcon = "wi-day-cloudy"
          } else if(ele.text === "Scattered Showers"){
              whichIcon = "wi-day-showers"
          }else if(ele.text === "Thunderstorms"){
              whichIcon = "wi-day-thunderstorm"
          }else if(ele.text === "Scattered Thunderstorms"){
            whichIcon = "wi-night-snow-thunderstorm"
        }else if(ele.text === "Mostly Cloudy"){
            whichIcon = "wi-day-cloudy-high"
        }
        else if(ele.text === "Partly Cloudy"){
            whichIcon = "wi-day-cloudy-windy"
        }
        else if(ele.text === "Mostly Sunny"){
            whichIcon = "wi-day-sunny-overcast"
        }else if(ele.text === "Mostly Sunny"){
            whichIcon = "wi-day-sunny-overcast"
        }else if(ele.text === "Rain"){
            whichIcon = "wi-day-rain"
        }else if(ele.text === "Rain"){
            whichIcon = "wi-day-rain"
        }else if(ele.text === "Sunny"){
            whichIcon = "wi-day-sunny"
        } else {
            whichIcon = "wi-day-fog"
        }


        
        
        

          newForecast.innerHTML = `
          <div id="title">
          <span class="next swap">
        
        For: ${ele.date}.
      </span>
          <span class="currently">
        
          <span class="desc swap">
          <span class="summary swap">${average(ele.high, ele.low)}˚ ${ele.text}</span>
          <span class="summary-high-low">
            <span><span class="high-low-label">Feels Like:&nbsp;</span>${average(ele.high, ele.low)}˚,</span>
          <span><span class="high-low-label">Low:&nbsp;</span>${ele.low}˚,</span>
          <span><span class="high-low-label">High:&nbsp;</span>${ele.high}˚,</span>
          </span>
          </span>
          </span>

               
          
          <i class="wi ${whichIcon}" style="margin-bottom:12px"></i>
      <hr >
      </div>`;
         



          storeForecastsIn.appendChild(newForecast);
            //    document.querySelector("i").style= "margin-buttom:5px"

        })

    } else {
        inputSearch.style = "background:red"
        inputSearch.value = "Error, not found"
    }

        });  
    
    
    }

   


    return{
        searchNow:searchNow
    }


})();









