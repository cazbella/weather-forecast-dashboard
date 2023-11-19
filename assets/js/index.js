var rightNow = dayjs().format('D/MM/YY');
var apiKey = "c44f9b2e93a173784fe4ba28b66d5418";

console.log("API Key: " + apiKey);


// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "London" + "&appid=" + apiKey;


// // var defaultCity = 'London'???
// upon page load???
// var iconCode = data.weather[0].icon;???
//coordinates????

4. //Fetch Weather Data
   //Use the obtained coordinates to make a request to the 5 Day Weather Forecast API.
   //parse and display relevant information like city name, date, weather conditions, temperature, humidity, and wind speed.

   //code similar to last challenge to local storage
   function saveCityInput(city) {
      
      //if no data - empty object
      var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      
      //push data to searchHistory array
      cityHistory.push(city);

      localStorage.setItem("searchHistory", JSON.stringify(cityHistory));
   }

   //load history to keep buttons on the page
   $(document).ready(function () {
      // var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
      // // Loop through the search history and create buttons for each city
      // for (var i = 0; i < cityHistory.length; i++) {
      //     var historyButton = $("<button>")
      //         .addClass("btn btn-secondary history-button")
      //         .text(cityHistory[i])
      //         .on("click", function (event) {
      //          //stops page refreshing here
      //          event.preventDefault();
      //          // button click event for history buttons
      //          var cityName = $(this).text();
      //          //runs function based on 
      //          getCurrentWeather(cityName);
      //       });
  
      //     // Append the button to the search history container
      //     $("#history").prepend(historyButton);
      // }
      // Load history to keep buttons on the page
var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Loop through the search history and create buttons for each city
for (var i = 0; i < cityHistory.length; i++) {
    var historyButton = $("<button>")
        .addClass("btn btn-secondary history-button")
        .text(cityHistory[i]);

    // Append the button to the search history container
    $("#history").prepend(historyButton);
}
$("#history").on("click", ".history-button", function (event) {
   event.preventDefault();
   var cityName = $(this).text();
   getCurrentWeather(cityName);
   getWeatherForecast(cityName);
});
  });
  
   
// Event listener for the search button
$("#search-button").on("click", function(event) {
   event.preventDefault();
   console.log("search button clicked")
   var city = $("#search-input").val();

   // Perform the search 
   console.log("Search for: " + city);

   // Call function to save the city to local storage
   saveCityInput(city);

   //clear search box after searching 
   $("#search-input").val("");

   //make a button with each search
   var historyButton = $("<button>")
        .addClass("btn btn-secondary history-button")
        .text(city);
 console.log(historyButton);
    // Append the button to the search history container
    $("#history").prepend(historyButton);
   getCurrentWeather(city);
   getWeatherForecast(city);
   
});
// Event listener for the clear history button
$("#clear-history-button").on("click", function () {
   // Clear the search history in localStorage
   localStorage.removeItem("searchHistory");

   console.log("Attempting to remove history buttons");

   // Removes the search history buttons
   $("#history").find(".history-button").remove();
});


function getCurrentWeather(cityName) {
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric" 

   console.log(queryURL);
   console.log("getCurrentWeather clicked");
   
   fetch (queryURL)
   .then(function(response){
      return response.json();
   }).then(function(data){ //waiting for response to be returned to json. can give any name. data is what comes back from the fetch url
     var sectionToday = $("#today");
  
   sectionToday.empty();

      // make Bootstrap card
      var card = $("<div>").addClass("card");
      // make card body
      var cardBody = $("<div>").addClass("card-body");
      // card title with the city name
      var cardTitle = $("<h1>").addClass("card-title").text( cityName + " " + rightNow);

      // variables for info
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;
      var iconCode = data.weather[0].icon;

      console.log("wind speed" + windSpeed);

      // Creates paragraphs for the weather info
      var temperatureParagraph = $("<p>").text("Temperature: " + temperature + " °C");
      var humidityParagraph = $("<p>").text("Humidity: " + humidity + "%");
      var windSpeedParagraph = $("<p>").text("Wind Speed: " + windSpeed + " m/s");
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
      var iconImage = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");


      // Appends elements to the card body
      cardBody.append(cardTitle, iconImage, temperatureParagraph, humidityParagraph, windSpeedParagraph);

      // Append card body to the card
      card.append(cardBody);

      // Appends the card to the "today" html
      sectionToday.append(card);


      console.log(data);
    
   })
   .catch(function(error) {
      console.log("Error fetching weather data: " + error);
   });
}

function getWeatherForecast(cityName) {
   var sectionForecast = $("#forecast");
   var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=metric";
   console.log(queryURLForecast);
   console.log("getWeatherForecast clicked");

   fetch(queryURLForecast)
       .then(function (response) {
           return response.json();
       }).then(function (data) {
           sectionForecast.empty();

           // Create a Bootstrap row
           var forecastRow = $("<div>").addClass("row");

           // Loop through the forecast data to get every 8th entry
           for (var i = 0; i < data.list.length; i += 8) {
               var forecastData = data.list[i];
               var forecastDate = dayjs(forecastData.dt_txt).format('D/MM/YY');
               var forecastIconCode = forecastData.weather[0].icon;
               var forecastMinTemp = forecastData.main.temp_min;
               var forecastMaxTemp = forecastData.main.temp_max;
               var forecastHumidity = forecastData.main.humidity;

               console.log("new forecast data" + forecastData);

               // Create Bootstrap column
               var cardColumn = $("<div>").addClass("col-md-2");

               // Create Bootstrap card
               var card = $("<div>").addClass("card mb-2 forecastcard");
               // Create card body
               var cardBody = $("<div>").addClass("card-body");
               // Card title with the date
               var cardTitle = $("<h5>").addClass("card-title").text(forecastDate);
               // Create an image element for the weather icon
               var iconUrl = "https://openweathermap.org/img/w/" + forecastIconCode + ".png";
               var iconImage = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");
               // Create paragraphs for the weather info
               var minTempParagraph = $("<p>").text("Min Temp: " + forecastMinTemp + " °C");
               var maxTempParagraph = $("<p>").text("Max Temp: " + forecastMaxTemp + " °C");
               var humidityParagraph = $("<p>").text("Humidity: " + forecastHumidity + "%");

               // Appends elements to the card body
               cardBody.append(cardTitle, iconImage, minTempParagraph, maxTempParagraph, humidityParagraph);
               // Append card body to the card
               card.append(cardBody);

               // Append the card to the column
               cardColumn.append(card);

               // Append the column to the row
               forecastRow.append(cardColumn);
           }

           // Appends the row to the "forecast" section
           sectionForecast.append(forecastRow);

           console.log(data);
       })
       .catch(function (error) {
           console.log("Error fetching forecast data: " + error);
       });
}




8. //autofill for city names? is there a way to get a list of names to correspond with weather api? 

9. //responsiveness?? Struggling here! - use percentages and media queries and flexbox or dynamically create bootstrap elements.  

