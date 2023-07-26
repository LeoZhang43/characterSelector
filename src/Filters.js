import React from 'react'
import { useProductsContext } from './products_context'
import { getUniqueValues } from './getUniqueValues'
import styled from 'styled-components'

const Filters = () => {
    const{
        filters: {
            text,
            species,
            status,
            gender,
            episode,
            location,
            type,
        },
        updateFilters,
        clearFilters,
        products,
    } = useProductsContext()
    const genders = getUniqueValues(products, 'gender')
    const specy = getUniqueValues(products, 'species')
    const statu = getUniqueValues(products, 'status')
    const types = getUniqueValues(products, 'type')
    const episodes = getUniqueValues(products, 'episode')
    const locations = getUniqueValues(products, 'location')
    console.log(products)
    console.log(genders)
    console.log(specy)
    console.log(statu)
    console.log(types)
    console.log(episodes)
    console.log(locations)
    return(
        <Wrapper>
            <div className='context'>
                <form onSubmit={(e) => e.preventDefault()}>
                <div className='form-control'>
                    <input 
                    // type='text'
                    name='text'
                    placeholder='search'
                    className='search-input'
                    value={text}
                    onChange={updateFilters}
                    />
                </div>
                <div className='form-control'>
                    <h5>specy</h5>
                    <div>
                    {specy.map((c, index) => {
                        return <button 
                        key={index}
                        onClick={updateFilters}
                        // type="button"
                        name="species"
                        value={c}
                        className={`${
                            species === c ? 'active' : null
                        }`}
                        >{c}</button>
                    })}
                    </div>
                </div>
                <div className='form-control'>
                    <h5>gender</h5>
                    <select 
                        name='gender' 
                        value={gender}
                        onChange={updateFilters}
                    >
                        {genders.map((c, index) => {
                        return(
                            <option 
                            key={index}
                            value={c}
                            >
                            {c}
                            </option>
                        )
                        })}
                    </select>
                </div>
                <div className='form-control'>
                    <h5>status</h5>
                    <select 
                        name='status' 
                        value={status}
                        onChange={updateFilters}
                    >
                        {statu.map((c, index) => {
                        return(
                            <option 
                            key={index}
                            value={c}
                            >
                            {c}
                            </option>
                        )
                        })}
                    </select>
                </div>
                <div className='form-control'>
                    <h5>episode</h5>
                    <select 
                        name='episode' 
                        value={episode}
                        onChange={updateFilters}
                    >
                        {episodes.map((c, index) => {
                        return(
                            <option 
                            key={index}
                            value={c}
                            >
                            {c.split('/').pop()}
                            </option>
                        )
                        })}
                    </select>
                </div>
                <div className='form-control'>
                    <h5>location</h5>
                    <select 
                        name='location' 
                        value={location}
                        onChange={updateFilters}
                    >
                        {locations.map((c, index) => {
                        return(
                            <option 
                            key={index}
                            value={c}
                            >
                            {c}
                            </option>
                        )
                        })}
                    </select>
                </div>
                <div className='form-control'>
                    <h5>type</h5>
                    <select 
                        name='type' 
                        value={type}
                        onChange={updateFilters}
                    >
                        {types.map((c, index) => {
                        return(
                            <option 
                            key={index}
                            value={c}
                            >
                                {c}
                            </option>
                        )
                        })}
                    </select>
                </div>
                </form>
                <button type='button' className='clear-btn' onClick={clearFilters}>
                {' '}
                clear filters
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    font-weight: bold;
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters