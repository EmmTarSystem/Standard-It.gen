import React from 'react';
import './result.css';


const Result = (props) => {

    //RENDER

    return (
        <div className={props.divResultClass}>
            <p className='nomNormalise'>NORMALISÉ :</p>
            <p  className="resultat">{props.textToDisplay}</p>
            <p className="pCopyNotify">COPIÉ !</p>
        </div>
    );
};

export default Result;