import React, { Component } from 'react';

import './App.css';
import ShoppingCard from './ShoppingCard';
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      showShop:true,  
      cartCount: parseInt(localStorage.getItem('cartCount')) ||0,
      message:'',
      messageforremove:'',
      products:[]
    };
  }
  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      })
  }
 
  addToCart(item) {
    const updatedCartItems = [...this.state.cartItems, item];
    this.setState(
      {
        cartItems: updatedCartItems,
        showShop:false,
        cartCount:this.state.cartCount+1,
        message: `${item.itemName} is added successfully`,
      },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); 
        localStorage.setItem('cartCount', this.state.cartCount.toString()); 
        this.displayCart(); 
        setTimeout(() => {
         this.setState({ message: '' });
       },3000);
      }
    );
  }

  removeFromCart(itemToRemove) {
    const updatedCartItems = this.state.cartItems.filter((item) => item !== itemToRemove);
    this.setState(
      {
        cartItems:updatedCartItems,
        cartCount:this.state.cartCount-1,
        messageforremove: `${itemToRemove.itemName} is removed successfully`,
      },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        localStorage.setItem('cartCount', this.state.cartCount.toString()); 
        setTimeout(() => {
         this.setState({ messageforremove: '' });
       }, 3000);
      }
    );
  }
  displayCart = () => {
    this.setState((prevState) => ({
      showShop: !prevState.showShop,
    }));
  };
  navigateToShopping = () => {
    this.setState({
      showShop:false,
    });
  };
  render() {
    return (
      <div>
        {this.state.showShop ? (
          <div >
            <div className='navigation'>
            <h1 className='shopping-cards'>Mobile Shop</h1> 
            <button onClick={this.navigateToShopping} className='navigation-button'>
            Cart
           </button> 
           <p className='count'> Count: {this.state.cartCount}</p> 
            </div>
            <div>
            <p className="message1">{this.state.message}</p>
            </div>
              <div className='cartt'>
                {this.state.products.map((product) => (
                   <div className='cart-container'>
                   <div className='cart'>
                    <ShoppingCard
                      itemName={product.title}
                      imageUrl={product.image}
                      price={`$${product.price}`}
                      description={product.description}
                      id={product.id}
                      onAddToCart={() => this.addToCart({
                        id:product.id,
                        imageUrl: product.image,
                        itemName: product.title,
                        price: `${product.price}`,
                        description: product.description,
                      })}
                    />
                  </div>
                  </div>
                ))}
              </div>
             </div>
        ):(
          <div>
            <div>
          <h1 className='cart-display'>Cart</h1>
          <p className="message2">{this.state.messageforremove}</p>
          <button onClick={this.displayCart} className='back-button'>
            Back
          </button>
          </div>
          
          {this.state.cartItems.length === 0 ? (
            <h2>Cart is empty</h2>
          ) : (
            <div className='cartt'>
              {this.state.cartItems.map((item) => (
                <div className='cart-container'>
                  <div className='cart'>
                    <div className='describe'>
                    <div className="head">
                    <i>{item.itemName}</i>
                    </div>
                    </div>
                    <div className='img'>
                    <img src={item.imageUrl} alt={item.itemName} className='image' />
                    </div>
                    <div className='describe'>
                    <p className='description'>{item.description}</p>
                    </div>
                    <div className='price'>
                    <p>${item.price}</p>
                    </div>
                    <div className='btn'>
                    <button onClick={()=>this.removeFromCart(item)}
                    className='removebutton'>
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
}
export default ShoppingCart;
// 'https://fakestoreapi.com/products'