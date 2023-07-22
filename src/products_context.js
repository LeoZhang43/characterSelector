import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './products_reducer'
import { url } from './constants'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  currentPage: 1,
  totalPages: 1,
  totalCharachters: 0,
  filtered_products:[],
  sort:'name-a',
  filters: {
    text: '',
    species: 'all',
    status: 'all',
    gender: 'all',
    episode:'all',
    location: 'all',
  },
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const fetchInfo = async(url) => {
    const info = await axios.get(url)
    dispatch({ type:'GET_PRODUCTS_INITIAL', payload: info})
  }
  const fetchProducts = async(url) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' })
    try{
      const response = await axios.get(`${url}?page=${state.currentPage}`)
      const products = response.data.results
      if(state.currentPage == 1 || state.currentPage < state.totalPages){
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products })
      }else{
        dispatch({ type: 'GET_PRODUCTS_COMPLETE', payload: products})
      }
    }catch(error){
      dispatch({ type: 'GET_PRODUCTS_ERROR' })
    }
  }
  const updateSort = (e) => {
    const value = e.target.value
    dispatch({type: 'UPDATE_SORT', payload: value})
  }
  useEffect(() => {
    fetchInfo(url)
  },[])
  useEffect(() => {
    fetchProducts(url)
  }, [state.currentPage])
  useEffect(() =>{
    dispatch({type: 'SORT_PRODUCTS'})
  },[state.sort, state.filters])
  return (
    <ProductsContext.Provider value={{
      ...state,
      updateSort,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
