import React from 'react';


 const navigation = ({onRouteChange,isSignin}) =>{
    if(isSignin){
    return (
        <nav style ={{display:'flex',justifyContent:'flex-end'}}>
             <p onClick={() => onRouteChange('Signin')} className='f3 link dim black underline pa3 pointer'>SignOut</p>
        </nav>
    )
    }else{
        return(
        <nav style ={{display:'flex',justifyContent:'flex-end'}}>
        <p onClick={() => onRouteChange('Signin')} className='f3 link dim black underline pa3 pointer'>Signin</p>  
        <p onClick={() => onRouteChange('Register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
        )
    }
 }
 
 export default navigation;
