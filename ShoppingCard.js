import React from 'react';
import './App.css';
class ShoppingCard extends React.Component {
    render() {
      return (
        <div>
          <div className='describe'>
          <div className='head'><i>{this.props.itemName}</i></div>
          </div>
          <div>{this.props.id}</div>
          <div className='img'>
          <img src={this.props.imageUrl} alt={this.props.itemName} className='image'/>
          </div>
          <div className='describe'>
          <p className='description'>{this.props.description}</p>
          </div>
          <div className='price'>
          <p>{this.props.price}</p>
          </div>
          <div className='btn'>
          <button onClick={this.props.onAddToCart} className='addtocart'>Add</button>
         </div>
         </div>
      );
    }
   }
export default ShoppingCard;