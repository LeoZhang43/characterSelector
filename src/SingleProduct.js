import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from './products_context'
import { single_url as url } from './constants'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SingleProductPage = () => {
    const { id } = useParams();
    const history = useNavigate();
    const {
        single_product_success,
        single_product,
        fetchSingleProduct,
    } = useProductsContext()
  
    useEffect(() => {
      fetchSingleProduct(`${url}${id}`)
    },[])

    if(single_product_success === false){
        console.log('loading...')
        return(
            <h1>loading...</h1>
        )
    }
  
    // console.log(single_product)

    const{
        name,
        gender,
        image,
        species,
        status,
        type,
        episode,
        location,
        origin,
    } = single_product
    const ids = episode.map(url => {
        // Split the URL by '/', take the last part (ID) and return it.
        return url.split('/').pop() + ' ';
    });
    console.log('episode' + episode)
    console.log(ids)
    return (
        <Wrapper>
        <div className="section section-center page">
          <Link to='/products' className='btn'>
            back to main page
          </Link>
          <div className='product-center'>
            <img src={image} alt="image" />
            <section className='content'>
              <h2>{name}</h2>
              <h5 className='price'>{gender}</h5>
              <p className='info'>
                <span>species : </span>
                {species}
              </p>
              <p className='info'>
                <span>status : </span>
                {status}
              </p>
              <p className='info'>
                <span>type : </span>
                {type === "" ? 'None' : type}
              </p>
              <p className='info'>
                <span>episode : </span>
                {ids}
              </p>
              <p className='info'>
                <span>location : </span>
                {location.name}
              </p>
              <p className='info'>
                <span>origin : </span>
                {origin.name}
              </p>
              <hr />
            </section>
          </div>
        </div>
      </Wrapper>
    )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage