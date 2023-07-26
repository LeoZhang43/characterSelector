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
  single_product_success: false,
  single_product: [],
  sort:'name-a',
  filters: {
    text: '',
    species: 'all',
    status: 'all',
    gender: 'all',
    episode:'all',
    location: 'all',
    type: 'all',
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
      if(state.currentPage === 1 || state.currentPage < state.totalPages){
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
  const fetchSingleProduct = async(url) => {
    // console.log("try fetchSingleProduct");
    dispatch({type:'GET_SINGLE_PRODUCT_BEGIN'});
    try{
      const response = await axios.get(url)
      // console.log(response);
      const singleProducts = response.data
      dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: singleProducts })
    }catch(error){
      dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' })
    }
  }
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value)
    dispatch({type:'UPDATE_FILTERS', payload: {name, value}})
  }
  const clearFilters = () => {
    dispatch({type: 'CLEAR_FILTERS'})
  }
  useEffect(() => {
    fetchInfo(url)
  },[])
  useEffect(() => {
    fetchProducts(url)
  }, [state.currentPage])
  useEffect(() =>{
    dispatch({type: 'SORT_PRODUCTS'})
  },[state.sort])
  useEffect(() =>{
    dispatch({type: 'FILTER_PRODUCTS'})
  },[state.filters])
  return (
    <ProductsContext.Provider value={{
      ...state,
      fetchSingleProduct,
      updateSort,
      updateFilters,
      clearFilters,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
