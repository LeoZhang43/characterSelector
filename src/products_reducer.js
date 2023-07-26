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
    if(action.type === 'GET_SINGLE_PRODUCT_BEGIN'){
      return{
        ...state,
      }
    }
    if(action.type === 'GET_SINGLE_PRODUCT_SUCCESS'){
      return {
        ...state,
        single_product_success: true,
        single_product: action.payload,
      }
    }
    if(action.type === 'GET_SINGLE_PRODUCT_ERROR'){
      return{
        ...state, 
        single_product_success: false,
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
    if(action.type === 'UPDATE_FILTERS'){
      const{name, value} = action.payload;
      return {
        ...state,
        filters:{...state.filters,[name]:value}
      }
    }
    if(action.type === 'UPDATE_FILTERS'){
      const{name, value} = action.payload;
      return {
        ...state,
        filters:{...state.filters,[name]:value}
      }
    }
    if(action.type === 'CLEAR_FILTERS'){
      return{
        ...state,
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
    }
    if(action.type === 'FILTER_PRODUCTS'){
      const { products } = state
      const { text, species, status, gender, episode, location, type } = state.filters
      let tempProducts = [...products]
      if(text){
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      if(species !== 'all'){
        tempProducts = tempProducts.filter(product => product.species === species)
      }
      if(status !== 'all'){
        tempProducts = tempProducts.filter(product => product.status === status)
      }
      if(gender !== 'all'){
        tempProducts = tempProducts.filter(product => product.gender === gender)
      }
      if(type !== 'all'){
        tempProducts = tempProducts.filter(product => product.type === type)
      }
      if(location !== 'all'){
        tempProducts = tempProducts.filter(product => product.location.name === location)
      }
      if(episode !== 'all'){
        tempProducts = tempProducts.filter(product => {
          return product.episode.find((c) => c === episode)
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
  