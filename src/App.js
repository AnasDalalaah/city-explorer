import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './map'


class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      lon: '',
      lat: '',
      errorMsg: 'Bad Response',
      displayErr: false,
      showMap: false,
      showCard: false,
      weatherInfoArr :'',

    }

  }


  // getWeatherInfo = async () => {
  //   let URL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=a&lon=b&searchQuery=c`;
  //   let weatherData = await axios.get(URL);
  //   this.setState({
  //     weatherInfoArr :weatherData.data
  //   })
  //    console.log(weatherData);
  // }
  

  getLocationData = async (event) => {
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;





    try {

      let locationResult = await axios.get(URL)
      this.setState({
        displayName: locationResult.data[0].display_name,
        lon: locationResult.data[0].lon,
        lat: locationResult.data[0].lat,
        showMap: true,
        displayErr: false,
        showCard: true
      }

      )
    }
    catch {
      this.setState({
        showMap: false,
        displayErr: true,
        showCard: false
      }
      )
    }

    let uRL = `${process.env.REACT_APP_SERVER}/weather?lat=a&lon=b&searchQuery=c`;
    let weatherData = await axios.get(uRL);
    this.setState({
      weatherInfoArr :weatherData.data
    })
     console.log(weatherData);
  }
  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.getLocationData}>
          <input type='text' placeholder='Enter City' name='city' />
          <button type='submit'>Explore!</button>
        </form>

        <Map
          displayName={this.state.displayName}
          lon={this.state.lon}
          lat={this.state.lat}
          showMap={this.state.showMap}
          displayErr={this.state.displayErr}
          errorMsg={this.state.errorMsg}
          showCard={this.state.showCard}
        />

      </>

    )

  }
}

export default App;