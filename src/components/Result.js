import React from 'react';
import './result.css';


const Result = (props) => {
    const textResultClass = (props.resultValid ? "resultatOK" : "resultatErreur");
    const copyNotifyClass = (props.resultValid ? "pCopyNotifyOK" : "pCopyNotifyErreur");
    //RENDER

    return (
        <div className={props.divResultClass}>
            <p className='nomNormalise'>NORMALISÉ :</p>
            <p  className={textResultClass}>{props.textToDisplay}</p>
            <p className={copyNotifyClass}>COPIÉ !</p>
        </div>
    );
};

export default Result;