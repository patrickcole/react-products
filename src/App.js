import React, {useState} from 'react';
import "typeface-roboto";
import './App.css';


function Price({ title, amount }) {

  return (
    <div>
      <span hidden>{title}</span>
      <span className="title title__secondary">${amount}</span>
    </div>
  )
}

function Quantity({ amount, addQuantity, removeQuantity, updateQuantity }) {

  const quantityChanged = (e) => {
    updateQuantity(e.target.value);
  }

  return (
    <div className="controls">
      <span hidden>Quantity</span>
      <button className="button button__quantity effect__pop" onClick={addQuantity}>+</button>
      <input className="control control__quantity" type="text" onChange={quantityChanged} value={ amount } />
      <button className="button button__quantity effect__pop" onClick={removeQuantity}>-</button>
    </div>
  )
}

function Product( { item }) {

  const [product, setProduct] = useState(item);

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const addQuantity = () => {
    const newProduct = {
      ...product,
      quantity: product.quantity + 1
    };
    setProduct(newProduct);
  };

  const removeQuantity = () => {
    if ( product.quantity > 0 ){
      const newProduct = {
        ...product,
        quantity: product.quantity - 1
      };
      setProduct(newProduct);
    }
  };

  const updateQuantity = (val) => {

    let newValue = 0;
    if ( isNumeric(val) ) {
      newValue = parseInt(val);
    }

    const newProduct = {
      ...product,
      quantity: newValue
    };
    setProduct(newProduct);
  }

  return (
    <li className="product effect__pop">
      <span className="title">{ product.title} </span>
      <Price title="Price" amount={product.price} />
      <p className="description">{ product.description }</p>
      <Quantity amount={product.quantity} addQuantity={addQuantity} removeQuantity={removeQuantity} updateQuantity={updateQuantity} />
    </li>
  )
}

function App() {

  const productData = [
    {
      title: 'React Book',
      description: 'Ready to start using React?',
      quantity: 1,
      price: 10
    },
    {
      title: 'Angular Book',
      description: 'From Google!',
      quantity: 4,
      price: 25
    }
  ];

  const [products] = useState(productData);

  return (
    <main className="cart">
      <h3 className="title title__primary">Cart</h3>
      <ul className="products">
        {products.map( (product,index) => (
          <Product key={index} item={product} />
        ))}
      </ul>
      <div className="actions">
        <span className="title title__primary">Total: $0.00</span>
        <button className="button button__checkout title title__primary">Checkout</button>
      </div>
    </main>
  )
}

export default App;
