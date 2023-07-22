import React from 'react'
import styled from 'styled-components'
import Filters from './Filters'
import Sort from './Sort'
import Products from './Products'

const ProductsPage = () => {
  return (
    <main>
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <Products />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 10rem 40rem;
    justify-content: center;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
