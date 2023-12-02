import React from 'react';
import './ImageLinkform.css'
const ImageLinkform = ({onInputChange,onButtonChange}) => {
return (
        <div>
        <p className='f3 white'>
            {'This is the super barin to detect your face from the selective image.GET IT TRY.'}
        </p>
        <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
            <input
             className='f4 p4 w-70 center'type='text' onChange={onInputChange}></input>
            <button 
            className='button w-30 grow f4 link ph3 pb2 dib white bg-light-purple'
            onClick={onButtonChange}>
            Detect</button>
         </div>
        </div>
      </div>
    );

 }
 export default  ImageLinkform;