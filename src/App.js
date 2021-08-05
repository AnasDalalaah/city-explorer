import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import "./App.css";
import Button from 'react-bootstrap/Button';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayName : '',
      lon : '',
      lat : '',
      showMap: false,
      errorMsg : 'bad response',
      displayErr : false
    }
  }
  getDataLocation=async (event)=>{
      
    event.preventDefault();
   
    let cityName=event.target.cityname.value;
    console.log({cityName})
  
  let URL= `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;

  console.log({URL})
    try{
      let locResult= await axios.get(URL);
      console.log(locResult.data[0].display_name);
      console.log(locResult.data[0].lat);
      console.log(locResult.data[0].lon);
     this.setState({
       displayName:locResult.data[0].display_name,
       latitude:locResult.data[0].lat,
       longitude:locResult.data[0].lon,
       show:true,
       showError:false,
     })
    }
    catch{

     this.setState({
       showError:true,
    })
    }
   
  
   }
 
  render()
  {
    return(
      <>
      <main>
      <h1>City Explorer</h1>
      <Form onSubmit={this.getDataLocation}>
          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label> The City Name </Form.Label>
            <Form.Control type="text" name='cityname'  placeholder="Enter City location" />
          </Form.Group>
          <Button variant="primary" type="submit">
          Explore 🛫
          </Button>
        </Form>
        {this.state.showError&&
        <Alert variant="erorr" >
           <Alert.Heading> Doesn't exist   </Alert.Heading>
           <p>
           this page can't be found 404
           </p>
   
           <p className="mb-0">
             Try again later on !
           </p>
         </Alert>}

        
        {this.state.show &&
         <Col>
         <h2>The City Name: {this.state.displayName}</h2>
         <h3>The Longitude :  {this.state.latitude}</h3>
         <h3>The Latitude : {this.state.longitude}</h3>
       </Col>
        
           }

        {this.state.show &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=
          ${this.state.latitude},${this.state.longitude}&zoom=1-18`} style={{marginLeft:"450px"}}/>
          }
          

          <h1>All Rights Reserved &copy; ASAC, Anas F. Dalalah</h1>
          </main>
      </>
    )
  }
}
export default App;
