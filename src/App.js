import './App.css';
import { useProductsContext } from './products_context';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar' 
import Productspage from './ProductsPage'
import SingleProductPage from './SingleProduct';

function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Productspage />}></Route>
        <Route path='/products/:id' element={<SingleProductPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;