import React, { useState, useEffect } from 'react';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import { client } from '../../client';
import { feedQuery, searchQuery } from '../../utils/data';
import Spinner from '../Spinner/Spinner';
import { MdTrendingUp } from 'react-icons/md';




const Search = ({ searchTerm }) => {

  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      
      client.fetch(query)
      .then((data) => {
        setPins(data);
        setLoading(false);
        console.log(data)
      })

    }
    else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false)
          console.log(data)
        })
    }
 
    // console.log(pins.length)
  }, [searchTerm])
  




  return (
    <div>
      { loading && <Spinner message={`Searching for ${searchTerm} posts`}/> }
      { pins && <MasonryLayout pins={pins} /> }
      { (pins?.length === 0 && searchTerm !== "" && !loading) && <Spinner message={`No posts found for "${searchTerm}"`} /> }
    </div>
    
  )

}

export default Search