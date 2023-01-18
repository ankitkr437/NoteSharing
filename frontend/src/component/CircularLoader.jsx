import React from 'react'
import {CircularProgress} from '@material-ui/core';
const Loader = ({item}) => {
  
  return (
    <div style={{display: 'flex',flexDirection:"column", alignItems: 'center',marginTop:"3vh"}}>
    <CircularProgress style={{width:"50px"}}/> 
    {
      item!=="redirecting" &&
    <h4 style={{fontSize:"20px",marginTop:"2vh"}}>Fetching the {item}...</h4>
    }
    </div>
  )
}

export default Loader