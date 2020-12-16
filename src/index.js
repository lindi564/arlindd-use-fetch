import {useCallback,useState} from 'react'
import styles from './styles.module.css'

export const useFetch = () => {
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState()

  const fetchHook = useCallback( async ({url,method = 'GET', body = null, headers = {}}) => {
      try{
          const response = await fetch(url, {
              method,
              headers,
              body
            })
          const responseData = await response.json();
          return responseData;
      }catch(err){
        setError(error)
      }finally{
          setLoading(false)
      }
  },[])
  return [fetchHook,loading,error]
}