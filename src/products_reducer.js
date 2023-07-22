import { act } from "react-dom/test-utils"

const products_reducer = (state, action) => {
    if(action.type === 'GET_PRODUCTS_INITIAL'){
        return{
            ...state,
            totalCharachters: action.payload.data.info.count,
            totalPages: action.payload.data.info.pages,
        }
    }
    if(action.type === 'GET_PRODUCTS_BEGIN'){
      return{
        ...state, 
        products_loading:true
      }
    }
    if(action.type === 'GET_PRODUCTS_SUCCESS'){
      return {
        ...state,
        products_loading: false,
        products: [...state.products, ...action.payload],
        filtered_products: [...state.products, ...action.payload],
        currentPage: state.currentPage + 1,
      }
    }
    if(action.type === 'GET_PRODUCTS_COMPLETE'){
        return {
          ...state,
          products_loading: false,
          products: [...state.products, ...action.payload],
          filtered_products: [...state.products, ...action.payload],
        }
      }
    if(action.type === 'GET_PRODUCTS_ERROR'){
      return{
        ...state, 
        products_loading: false, 
        products_error: true}
    }
    if(action.type === 'UPDATE_SORT'){
      return{
        ...state,
        sort:action.payload,
      }
    }
    if(action.type === 'SORT_PRODUCTS'){
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if(sort === 'id-lowest'){
        tempProducts = tempProducts.sort((a,b) => a.id - b.id)
      }
      if(sort === 'id-highest'){
        tempProducts = tempProducts.sort((a,b) => b.id - a.id)
      }
      if(sort === 'name-a'){
        tempProducts = tempProducts.sort((a,b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if(sort === 'name-z'){
        tempProducts = tempProducts.sort((a,b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return{
        ...state,
        filtered_products: tempProducts,
      }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default products_reducer
  