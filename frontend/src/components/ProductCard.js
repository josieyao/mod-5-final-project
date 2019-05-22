import React from 'react'
import { Link } from 'react-router-dom'
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const styles = {
//     card: {
//       maxWidth: 345,
//     },
//     media: {
//       height: 140,
//     },
//   };



export default class _ProductCard extends React.Component {
    render(){
        console.log(this.props)
        return(
            <div className="product-card">
                <img src={this.props.image1} alt=" " height="300" width="300"></img>
                <h4>{this.props.name}</h4>
                <p>${this.props.price}</p>
                <br/>
                <Link to={`/products/${this.props.id}`}>View</Link>
                {/* <button>View</button>  */}

                {/* <p>Description:<p>
                </p>{this.props.description}</p> */}
                {/* <p>Quantity: {this.props.quantity}</p> */}
            </div>

        )
    }
}


{/* <Card className={this.props.name}>
<CardActionArea>
  <CardMedia
    className={this.props.name}
    image={this.props.image1}
    title="Contemplative Reptile"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      {this.props.name}
    </Typography>
    <Typography component="p">
      {this.props.description}
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
</Card> */}