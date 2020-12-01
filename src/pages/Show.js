import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=> {

    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
    .then(results => {
      setTimeout(()=>{
        if(isMounted){
          setShow(results);
          setIsLoading(false);
        }
      }, 2000);
    }).catch(err => {
      if(isMounted){
        setError(err.message);
        setIsLoading(false);
      }
    })

    return () => {
      isMounted = false;
    }
  }, [id]);

  if(isLoading) {
    return <div>Data is being loaded</div>
  }

  if(error) {
    return <div>Error occurred: {error}</div>
  }

  return (
    <div>
      {show.name}
    </div>
  )
}

export default Show
