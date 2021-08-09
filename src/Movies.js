// import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import 'bootstrap/dist/css/bootstrap.min.css';

// class Movies extends React.Component {


//     render() {
//         return (
//             <>
//                 {this.props.moviesData.length!== 0 && this.props.showMovies &&

//                     <ListGroup>
//                         <ListGroup.Item>Top Movie</ListGroup.Item>
//                         <ListGroup.Item variant="primary">Title: {this.props.moviesData.title}</ListGroup.Item>
//                         <ListGroup.Item variant="secondary">Overview: {this.props.moviesData.overview}</ListGroup.Item>
//                         <ListGroup.Item variant="success">Average Votes: {this.props.moviesData.average_votes}</ListGroup.Item>
//                         <ListGroup.Item variant="danger">Total Votes: {this.props.moviesData.total_votes}</ListGroup.Item>
//                         <ListGroup.Item variant="warning">Image Url: {this.props.moviesData.image_url}</ListGroup.Item>
//                         <ListGroup.Item variant="info">Popularity: {this.props.moviesData.popularity}</ListGroup.Item>
//                         <ListGroup.Item variant="light">Release Date: {this.props.moviesData.released_on}</ListGroup.Item>
//                        { console.log(this.props.moviesDatamo)
//                         }                    </ListGroup>
//                 }
//                 {this.props.showMovies === false &&

//                     <ListGroup>

//                         <ListGroup.Item action variant="danger">
//                             {this.props.moviesData}
//                         </ListGroup.Item>

//                     </ListGroup>
//                 }

//             </>
//         )
//     }

// }

// export default Movies;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Movies extends React.Component {

    render() {
        return (
            <>

                {
                   
                    this.props.moviesData.map(element => {
                        return (
                        
                        
                        
                       <Row xs={1} md={3} className="g-4" style={{ width: '1000px' ,margin:'50px',marginLeft:'150px',marginRight:'50px'}}>
  {Array.from({ length: 2 }).map((_, idx) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={element.image_url}  style={{ border: 'groove', width: '200px' ,marginRight:'50px' ,}}/>
        <Card.Body>
          <Card.Title> Title:{element.title}</Card.Title>
          <Card.Text>
          Average Votes: {element.average_votes}
          </Card.Text>
          <Card.Text>
          Total Votes: {element.total_votes}
          </Card.Text>
          <Card.Text>
          Overview:  {element.overview} 
          </Card.Text>
           <Card.Text>
           Popularity: {element.popularity}
          </Card.Text>
           <Card.Text>
           Release Date:  {element.released_on}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>



                        )
                    })
                }


            </>
        )
    }


}

export default Movies;