import './App.css';
import { useProductsContext } from './products_context';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar' 
import Productspage from './ProductsPage'

function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Productspage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;