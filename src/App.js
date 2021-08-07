import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather';
import Movies from './Movies';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: '',
      displayMap: false,
      errorMessage: false,
      errorCode:'',
      weatherItem:[],
      showWeather:false,
      latitude:'',
      longitude:'',
      moviesArr: [],
      showMovies: false

    }
  }

  getCitylocation = async (event) => {
    event.preventDefault();

    let serverRoute = process.env.REACT_APP_SERVER;
    

    // const url = `http://localhost:3001/weather?city=amman&lon=35.9239625&lat=31.9515694`;
    
    
    let cityUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    
      
    try {
      

      
      let cityResult = await axios.get(cityUrl);
      
      
 
      this.setState({
        cityData: cityResult.data[0],
        displayMap: true,
        errorMessage: false,
        latitude: cityResult.data[0].lat,
        longitude: cityResult.data[0].lon
      })
      

    }
    catch(error) {
      this.setState({
        displayMap: false,
        errorMessage: true,
        errorCode: error,
      })
    }
    try{
      console.log(
        this.state.longitude
      )  ;   
       const url = `${serverRoute}/weather?city=${this.state.searchQuery}&lon=${this.state.longitude}&lat=${this.state.latitude}`;
      let importedData = await axios.get(url);
      
      this.setState({
        weatherItem:importedData.data,
        showWeather:true,
      })


    } catch(error){
      this.setState({
        weatherItem:error.response,
        showWeather:false
      })
    }
    try{
      let movieUrl = `${serverRoute}/movie?city=${this.state.searchQuery}`;
      let importedMoviesData = await axios.get(movieUrl);
      this.setState({
              moviesArr: importedMoviesData.data,
              showMovies: true
            })

    }catch (error){
      this.setState({
              showMovies: false,
              moviesArr: error.message,
            })

    }
    

  }
  
  updateSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <Form onSubmit={this.getCitylocation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter City location" onChange={this.updateSearchQuery} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore🛫
          </Button>
        </Form>

        {this.state.displayMap &&

          <Card style={{ width: '35rem',display:'flex'}}>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}`} />
            <Card.Body>
              <Card.Title><h2>The City Name:{this.state.cityData.display_name}</h2> 
              </Card.Title>
              <Card.Text>
              <h2>The Latitude:{this.state.cityData.lat} </h2><br></br>
              <h2>The Longitude:{this.state.cityData.lon} </h2>
                
              </Card.Text>
            </Card.Body>
          </Card>
      
        }

        {this.state.errorMessage &&

        <Alert variant="danger">
        Please Enter acorrect City Name, Error Code: 
        {this.state.errorCode.response.status}
      </Alert>
        }

{this.state.displayMap &&

          <Weather weatherData={this.state.weatherItem} showWeather={this.state.showWeather}></Weather>
          }

{this.state.displayMap &&
<Movies moviesData={this.state.moviesArr} showMovies={this.state.showMovies}></Movies>}

     
        <h1>All Rights Reserved &copy; 2021, ASAC, Anas F. Dalalah</h1>
      </>

    );
  }
}

export default App;