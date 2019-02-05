import React, {useState} from 'react';
import './App.css';

function Price({ title, amount }) {

  return (
    <div>
      <h3>{title}</h3>
      <p>{amount}</p>
    </div>
  )
}

function Quantity({ amount, addQuantity, removeQuantity, updateQuantity }) {

  const quantityChanged = (e) => {
    updateQuantity(e.target.value);
  }

  return (
    <div>
      <h3>Quantity</h3>
      <input type="text" onChange={quantityChanged} value={ amount } />
      <button onClick={addQuantity}>+</button>
      <button onClick={removeQuantity}>-</button>
    </div>
  )
}

function Product( { item }) {

  const [product, setProduct] = useState(item);

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const calculateTotal = () => {
    return product.quantity * product.price;
  };

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
    <div className="product">
      <h3>{ product.title} </h3>
      <p>{ product.description }</p>
      <Price title="Price" amount={product.price} />
      <Quantity amount={product.quantity} addQuantity={addQuantity} removeQuantity={removeQuantity} updateQuantity={updateQuantity} />
      <Price title="Total" amount={calculateTotal()} />
    </div>
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

  const [products, setProducts] = useState(productData);

  return (
    <main className="cart">
      <h1>React Product</h1>
      <p>Having fun playing with React Hooks while building this product/cart form.</p>
      <div className="products">
        {products.map( (product,index) => (
          <Product key={index} item={product} />
        ))}
      </div>
    </main>
  )
}

export default App;
