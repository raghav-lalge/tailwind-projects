document.addEventListener('DOMContentLoaded',()=>{
    const cityInput =document.getElementById("city-input");
    const getWeatherBtn =document.getElementById("get-weather-btn");
    const weatherinfo =document.getElementById("weather-info");
    const cityNameDisplay =document.getElementById("city-name");
    const temperatureDisplay =document.getElementById("temperature");
    const descriptionDisplay =document.getElementById("description");
    const errorMessage =document.getElementById("error-message");

    const API_KEY =""// this wont work because i am learning how to put api key in gitignore so just store it in bracket if you want to use it 
                      

    getWeatherBtn.addEventListener('click', async function  () {
        const city =cityInput.value.trim()
        if(!city) return ;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
            
        } catch (error) {
            showError();
            
        }
        
    })

    async function fetchWeatherData(city) {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        
        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City Not Found")
        }

        const data= await response.json()

        return data
        
    }

     function displayWeatherData(data) {
        const {name, main,weather}=data;
        cityNameDisplay.textContent=name;
        temperatureDisplay.textContent=`Temperature : ${main.temp}`;
        descriptionDisplay.textContent=`Weather : ${weather[0].description}`;

        weatherinfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        
        
        
    }

    function showError(){
        weatherinfo.classList.add("hidden");
        errorMessage.classList.remove("hidden")
        
    }

    

    
})
