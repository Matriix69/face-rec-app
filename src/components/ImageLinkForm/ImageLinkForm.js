import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, OnButtonSubmit}) => {
    return (
        <div>
           <p className='f3 pa3 near-white'>
               {'This magic Brain will detect faces in your pictures, give it a try'}
           </p>
           <div className='center'>
            <div className='form center pa4 br3 shadow-3'>
               <input className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
               <button className='w-30 grow f4 link ph3 pv2 bw0 dib white bg-light-purple' onClick={OnButtonSubmit}>Detect</button>
            </div>
           </div>
        </div>
    );
}

export default ImageLinkForm;