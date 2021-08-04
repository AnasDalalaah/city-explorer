import React from 'react'
  import Form from 'react-bootstrap/Form'
  import axios from 'axios'
  import Button from 'react-bootstrap/Button'
  import Alert from 'react-bootstrap/Alert'
  import "./App.css";

  
  
  class App extends React.Component{
    
  
    constructor(props){
      super(props)
      this.state ={
         displayName:'',
        latitude:'',
        longitude:'', 
        lat:'',
        lon:'', 
        show:false,
        showError:false,
      }
      
  
    }
  
    getData=async (event)=>{
      
       event.preventDefault();
      
       let cityName=event.target.city.value;
      //  console.log({cityName})
     
       let URL= `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_SERVER_KEY}&q=${cityName}&format=json`;
       console.log({URL})
       let  URL1= `${process.env.REACT_APP_SERVER_URL}/data/weather?name=${cityName}`;
        

       try{
         let locResult= await axios.get(URL);
        
        this.setState({
          displayName:locResult.data[0].display_name,
          latitude:locResult.data[0].lat,
          longitude:locResult.data[0].lon,
          show:true,
          showError:false,

        })

          let locResult1= await axios.get(URL1);
           
           this.setState({
            
            lat:locResult1.data.lat,
            lon:locResult1.data.lon,
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
            
                <h1 style={{ color: "black" }}>
                  City Explorer
                </h1>
             
              <Form onSubmit={this.getData} >
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Label> The City Name </Form.Label>
                  <Form.Control type="text" name='
' placeholder="Enter City location" />

                </Form.Group>



                <Button variant="primary" type="submit" >
                Explore 🛫          </Button>
              </Form>



              {this.state.showError &&
                <Alert variant="erorr" >
                  <Alert.Heading> 404 Doesn't exist  </Alert.Heading>
                  <p>
                   "           this page can't be found 404
"
                  </p>
                  <hr />
                  <p className="mb-0">
                    Try again later on !
                  </p>
                </Alert>}


              {this.state.show &&
                <p style={{ marginLeft: "500px" }}>

                  {`${this.state.displayName}: latitude: ${this.state.lat} langitude:  ${this.state.lon}`}

                </p>
              }

              {this.state.show &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_SERVER_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=1-18`} style={{marginLeft:"400px"}}/>
          }

<h1>All Rights Reserved &copy; 2021, ASAC, Anas F. Dalalah</h1>
          </>

        )
      }

    }
  
export default App;
