import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const BlankPage = () => {
    const router = useNavigate()
  useEffect(() => {
    
    router("/login")
  }, [])
  
  return (
    <div>
        
    </div>
  )
}

export default BlankPage