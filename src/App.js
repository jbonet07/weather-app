import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Forecast from './components/Forecast';
class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            error: null,
            isLoaded: false,
            city: 'Paris',
            forecast: {}
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    onEnter(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            this.onSearch()
        }
    }
    onSearch(){
        if(this.state.city !== ""){
            this.setState({
                isLoaded: false,
                error: null
            });
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=887a595fbf647ca30d0991d80683cb36`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            forecast: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );
        } else {
            window.alert("Empty field")
        }
    }
    onChangeText(e){
        this.setState({
            city: e.target.value
        })
    }
    componentDidUpdate(){
        if(this.state.forecast.weather[0].main === "Rain" || this.state.forecast.weather[0].main === "Drizzle"){
            $("#background-holder").removeClass().addClass("rain");
        } else if (this.state.forecast.weather[0].main === "Clear") {
            $("#background-holder").removeClass().addClass("sunny");
        } else  if (this.state.forecast.weather[0].main === "Snow"){
            $("#background-holder").removeClass().addClass("snow");
        } else  if (this.state.forecast.weather[0].main === "Thunderstorm"){
            $("#background-holder").removeClass().addClass("thunder");
        }else {
            $("#background-holder").removeClass().addClass("blur");
        }
    }
    componentDidMount(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=887a595fbf647ca30d0991d80683cb36`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        forecast: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div className="loader"/>;
        } else {
            return (
                <div className="container">
                    <form className="searchbar">
                        <input type="text" id="city-name" className="form-control" placeholder="City..." onChange={this.onChangeText} onKeyPress={this.onEnter}/>
                        <button type="button" className="btn btn-dark" onClick={this.onSearch}>
                            <i className="material-icons search-icon">search</i>
                        </button>
                    </form>
                    <Forecast weather={this.state.forecast}/>
                </div>
            );
        }
    }
}

export default App;
