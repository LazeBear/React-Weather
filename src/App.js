import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import './css/Weather.css';

// import ClockList from './comp/ClockList';
import Header  from './Weather/Header';
import Footer  from './Weather/Footer';
import WeatherChannel from './Weather/WeatherChannel';

class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header />
                <WeatherChannel />
                <Footer />
            </div>
        );
    }
}

export default App;
