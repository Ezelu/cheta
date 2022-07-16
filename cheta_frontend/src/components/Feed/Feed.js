
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../client';
import { searchQuery, feedQuery } from '../../utils/data';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';



export default function Feed () {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();


  useEffect(() => {
    // If a category exists, search for that category
    // Else, search for all the categories
    setLoading(true)
    
    if (categoryId) {
      const query = searchQuery(categoryId)
  
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false);
        })
        .catch(error => console.error(error));
      
    }
    else{
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
        .catch(error => console.error(error));
    }
  
  }, [ categoryId ])
  




  if (loading) return <Spinner message="We are adding beautiful memories to feed!" />

  return (
    <div>
      { pins?.length > 0 ?
       <MasonryLayout pins={pins} /> :
       <Spinner message="No posts found under this category!" />
      }
    </div>
  )
}

