import './App.css';
import { useProductsContext } from './products_context';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Products() {
  const {
    filtered_products,
  } = useProductsContext()
  console.log(filtered_products)
  if(filtered_products.length < 1){
    return(
      <h5>
        Sorry, no products matched your search...
      </h5>
    )
  }
  return (
    <Wrapper>
      {filtered_products.map((product) => {
        const{ id, image, name, gender, species, status} = product
        return(
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5>id:{id}</h5>
              <h5>gender:{gender}</h5>
              <h5>species:{species}</h5>
              <h5>status:{status}</h5>
              <Link to={`/products/${id}`} className='btn'>
                <h3>details</h3>
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
    
  );
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    /* width: 200%; */
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default Products;