import React from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

const newProductInitialValues = {
  name: '',
  price: '',
  quantity: 1
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      products: initialProductList,
      newProduct: newProductInitialValues
    };
  }

  handleNewProductFieldChange = (name, value) => {
    this.setState({newProduct: {...this.state.newProduct, [name]: value}});
  }

  handleProductQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0 && window.confirm('Voulez-vous retirer ce produit de la commande ?')) {
      this.setState({products: this.state.products.filter(p => p.id !== productId)});
    } else {
      const newProductList = this.state.products.map(p => p.id === productId ? {...p, quantity: parseInt(newQuantity)} : p);
      this.setState({products: newProductList});
    }
  }

  handleNewProductFormSubmit = (event) => {
    event.preventDefault();
    const {name, price, quantity} = this.state.newProduct
    this.setState({
      products: [...this.state.products, {name, quantity, price: parseFloat(price), id: Math.random()}],
      newProduct: newProductInitialValues
    })
  }

  render () {
    const { products } = this.state;
    return (
      <div className='App'>
        <h1>Ma commande</h1>
        <table>
          <thead>
            <tr>
              <td>Produit</td>
              <td>Prix unitaire</td>
              <td>Quantité</td>
              <td>Prix total</td>
            </tr>
          </thead>
          <tbody>
            {products.map(p =>
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price} €</td>
                <td><input type='number' min='0' onChange={(event) => this.handleProductQuantityChange(p.id, event.target.value)} value={p.quantity} /></td>
                <td>{p.price * p.quantity} €</td>
              </tr>
            )}
          </tbody>
        </table>
        <p>Montant de la commande : <strong>{products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}€</strong></p>
        <form onSubmit={this.handleNewProductFormSubmit} >
          <h2>Ajouter un produit</h2>
          <div className='field'>
            <label htmlFor="name">Nom</label>
            <input 
              type='text' 
              id='name' 
              required
              value={this.state.newProduct.name} 
              onChange={(event) => { this.handleNewProductFieldChange('name', event.target.value)  }} 
            />   
          </div>
          <div className='field' >
            <label htmlFor="price">Prix</label>
            <input 
              required
              type='number'
              min='0.01' 
              step='0.01'
              id='price' 
              value={this.state.newProduct.price} 
              onChange={(event) => { this.handleNewProductFieldChange('price', event.target.value)  }} 
            />  
          </div>
          <input type='submit' value='Ajouter'/>
        </form>
      </div>
    );
  }
}

export default App;
