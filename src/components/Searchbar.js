import React, { Component } from 'react'
class Searchbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            city: ""
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onSearch = this.onSearch.bind(this);

    }

    onSearch(){
        if(this.state.city !== ""){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=887a595fbf647ca30d0991d80683cb36`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.props.callbackFromParent(result);
                        console.log(result);
                        console.log(this.props.callbackFromParent);
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
    render() {
        return (
            <div className="searchbar">
                <input id="city-name" className="form-control" placeholder="City..." onChange={this.onChangeText}/>
                <button type="button" className="btn btn-dark" onClick={this.onSearch}>
                    <i className="material-icons search-icon">search</i>
                </button>
            </div>
        )
    }
}

export default Searchbar;