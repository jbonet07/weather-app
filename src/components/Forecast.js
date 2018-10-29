import React, { Component } from 'react';
import '../css/weather-icons.min.css'
const WEATHER =  {
    "Clear": "wi wi-day-sunny",
    "Clouds": "wi wi-cloudy",
    "Thunderstorm": "wi wi-thunderstorm",
    "Drizzle": "wi wi-showers",
    "Rain": "wi wi-rain",
    "Snow": "wi wi-snow"
};

class Forecast extends Component {
    constructor(props){
        super(props);
        this.state = {
            forecast: props.weather
        }

    }
    componentDidMount(){
        console.log(this.props.weather);

    }
    render() {
        return(
            <div className="forecast">
                <div className="weather-card">
                    {/*<i className="material-icons" style={{fontSize: "10rem", lineHeight: "none"}}>wb_sunny</i>*/}
                    <div className="city-name">{this.state.forecast.name}</div>
                    <div className="weather-info">

                        <i style={{fontSize: "8rem", lineHeight: "none"}} className={WEATHER[this.state.forecast.weather[0].main]}/>
                        <div>
                            <div>{Math.round((this.state.forecast.main.temp - 272.15)*100)/100}ºC</div>
                            <div>{this.state.forecast.weather[0].main}</div>
                            <div>{this.state.forecast.main.humidity}%</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forecast;