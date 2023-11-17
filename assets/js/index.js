var rightNow = dayjs().format('D/MM/YY');
1. //Get API Key

2. //stye css as demo.png in class module

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
$("#search-button").on("click", function() {
   var city = $("#search-input").val();

   // Perform the search 
   console.log("Search for: " + city);

   // Call function to save the city to local storage
   saveCityInput(city);

   //clear search box after searching 
   $("#search-input").val("");

});


6. //Display 5-Day Forecast
   //Parse the API response to show the 5-day forecast with date, weather conditions, temperature, and humidity

7. //Handle Search History Click
   //Implement functionality to handle clicks on the search history
   //dynamically create buttons 'in the other div' '.list-group #history' that can also be clicked with event listener to fetch api and append/display 5 day forecast
   //Display the weather information for the selected city

8. //autofill for city names? is there a way to get a list of names to correspond with weather api? 
//make cards for each day dynamically createded using jquery. 

9. //responsiveness - use percentages and media queries and flexbox or dynamically create bootstrap elements.  
