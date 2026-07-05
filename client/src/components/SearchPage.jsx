import React from 'react'
import { useParams } from 'react-router-dom';

const SearchPage = () => {
    const { query } = useParams();
    
    return (
        <div className='flex justify-center h-screen items-center'>SearchPage query= {query}</div>
    )
}

export default SearchPage