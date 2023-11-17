var rightNow = dayjs().format('D/MM/YY');
var apiKey = "a9d0a4b993a8b96a9f1390ab52f8f26a";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "London" + "&appid=" + apiKey;
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey
//is it city name or user input??
// // var defaultCity = 'London'???
// 
// var iconCode = data.weather[0].icon;???
// var temperature = data.main.temp;???
// var humidity = data.main.humidity;????
// var windSpeed = data.wind.speed;????



3. //JavaScript 
   //handle user input and make API requests.
   //Retrieve city coordinates by making a Geocoding API call using the city name.

4. //Fetch Weather Data
   //Use the obtained coordinates to make a request to the 5 Day Weather Forecast API.
   //Extract and display relevant information like city name, date, weather conditions, temperature, humidity, and wind speed.

5. //LocalStorage for Search History
   //Store the searched cities in the localStorage
   //Display the search history on the dashboard?
   //setItem and getItem 

   //code similar to last challenge to local storage
   function saveCityInput(city) {
      
      //if no data - empty object
      var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      
      //push data to searchHistory array
      cityHistory.push(city);

      localStorage.setItem("searchHistory", JSON.stringify(cityHistory));
   }
   
// Event listener for the search button
$("#search-button").on("click", function(event) {
   event.preventDefault();
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
   
});

function getCurrentWeather(cityName) {
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

   console.log(queryURL);
   
   fetch (queryURL)
   .then(function(response){
      return response.json();
   }).then(function(data){ //waiting for response to be returned to json. can give any name. data is what comes back from the fetch url
      document.getElementById("today").textContent = JSON.stringify(data)
      console.log(data);
    
   })
}

6. //Display 5-Day Forecast
   //Parse the API response to show the 5-day forecast with date, weather conditions, temperature, and humidity

7. //Handle Search History Click
   //Implement functionality to handle clicks on the search history
   //dynamically create buttons 'in the other div' '.list-group #history' that can also be clicked with event listener to fetch api and append/display 5 day forecast
   //Display the weather information for the selected city

8. //autofill for city names? is there a way to get a list of names to correspond with weather api? 
//make cards for each day dynamically createded using jquery. 

9. //responsiveness - use percentages and media queries and flexbox or dynamically create bootstrap elements.  

//fetch from open weather API
//need to adapt this for today
//find path from open weather API

