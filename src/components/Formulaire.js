import React, { useRef, useState } from 'react';
import './formulaire.css';
import Result from './Result';



const Formulaire = () => {
    
    

    //Pour modifier l'affichage du titre normalisé ["texte resulat", "class de la div resultat"]
    const [resultValue,setResultValue] = useState(["","divResultHidden"]);


    //Emetteur state
    var cookieEmetteur = localStorage.getItem("Standard-It Basic Emetteur");
    const [emetteur,setEmetteur] = useState(cookieEmetteur ? cookieEmetteur :"");

    //Mention
    
    const [mention,setMention] = useState("NP");

    
       
    //Variabilisation
    var textResult = "";
    const nbreMaxCaractere=60;
    //Tableau des protections
    const allMentionArray = ["NP","DR","DR-SF","S","S-SF"];

    // Variable pour nommage class style div selon mention
    var globalDivMentionClass="globalDivMentionClass"+mention;
   
    //Reférence aux elements des formulaires
    const inputTitleRef = useRef();







    //EVENT CHANGEMENT PROTECTION
    const onChangeMention = (e)=>{
        console.log("Changement de la mention pour = " + e);
        // Set la mention pour reactualisation et clear l'affichage
        setMention(e);
        onElementChange();
    }






    //EVENT CHANGEMENT EMETTEUR
    const onChangeEmetteur = (e) =>{
        setEmetteur(e);
        //masque le resultat si non masqué
        onElementChange();
    }
    
   


    //EVENT CHANGEMENT TITRE
    const onTitleChange = () => {
        onElementChange()
    }

    //Cache l'affichage resultat si besoin
    const onElementChange = () =>{
        if (resultValue[1] === "divResultVisible") {
            setResultValue(["","divResultHidden"])
            
        };
    };





    //Vérification avant normalisation
    const onClickNormalize = () => {

        //Vérification champ emetteur avant normalisation
        
        if(emetteur===""){
            console.log("Le champ est vide !!!!");
        }else{
            onNormalize();
        }
    }

   




    // Process de normalisation

    const onNormalize = () => {
        console.log("clic normaliser")
        
        //Stockage COOKIE Emetteur si nouveau
        if(cookieEmetteur!==emetteur){
            localStorage.setItem("Standard-It Basic Emetteur",emetteur)
            console.log("Mémorisation nouveau cookie emetteur : " + emetteur);
        }
        

        //traitement du format orthographe du titre
        const titre = inputTitleRef.current.value;
        var titreCorrect = titre;
                
        // Tableau motifs à rempalcer
        const correctionRef = [
            [/[éèêë]/gi,"e"],
            [/[àâä]/gi,"a"],
            [/[ç]/gi,"c"],
            [/[ïî]/gi,"i"],
            [/[ùûü]/gi,"u"],
            [/ /gi,"-"]
          ];
        //Correction
        for(let i = 0; i < correctionRef.length; i++){
            titreCorrect = titreCorrect.replace(correctionRef[i][0],correctionRef[i][1])
        };

        // 1 Lettre majuscule
        titreCorrect = titreCorrect.charAt(0).toUpperCase() + titreCorrect.slice(1);


        //Traitement du format date 
        var locDateDuJour = new Date(),
            year = (locDateDuJour.getFullYear()),
            tempMonth = (locDateDuJour.getMonth() + 1),
            tempDay = (locDateDuJour.getDate());

        // traitement format 2 digits
        var finalMonth =(tempMonth < 10 ? "0" + tempMonth : tempMonth);
        var finalDay =(tempDay < 10 ? "0" + tempDay : tempDay);

        // simplification de la date
        var locDateFinale = ('' +   year + finalMonth + finalDay);


        //Ecriture résultat finale
        textResult = locDateFinale+"_"+mention+"_"+emetteur+"_"+titreCorrect;      
      

        //Copie dans le clipboard 
        var toCopy = textResult;
        navigator.clipboard.writeText(toCopy);
        console.log("Text copié dans le clipboard = " + toCopy);
        //Set les STATES pour modifier l'affichage
        setResultValue([textResult,"divResultVisible"]);
        
       
    };


   

    

    //EFFACER
    const onClickClear = () => {
        //clear uniquement si necessaire
        console.log("Clic Effacer")
        if (inputTitleRef.current.value !== "" || resultValue[1] !== "divResultHidden") {
            //efface le contenu de l'input
            inputTitleRef.current.value="";
            //set les states pour reactualiser l'affichage
            console.log("Effacement effectué")
            setResultValue(["","divResultHidden"]);
        }else{
            console.log("Rien à effacer")
        }
        
        
        
    };

  
    console.log("chargement formulaire");

    

    //Render
    return (
        // Mention
        <div>
            <div className={globalDivMentionClass}>
                <form action="" >
                    {allMentionArray.map(
                    (element,i)=>{
                        return <div className='localDivMentionClass' key={i}>
                        <input type="radio" name='classification' onChange={()=>onChangeMention(element)} key={i} value={element} id={element} checked={element===mention}/>
                        <label htmlFor={element}>{element}</label>
                        </div>

                    }
                    )}
                </form>
            </div>
             {/* Input Emetteur */}
             <p>
                <label htmlFor="">EMETTEUR : </label>
                <input className='emetteur' type="text" onChange={(e) => onChangeEmetteur(e.target.value)} placeholder={"Exemple : BALARD-CMI"} value={emetteur}/>
            </p>
          
            {/* Input Title */}
            <p>
                <label htmlFor="">NOM : </label>
                <input className='titre' type="text" ref={inputTitleRef} onChange={onTitleChange} maxLength={nbreMaxCaractere} placeholder={nbreMaxCaractere + " caractères maximum / Pas de caractères spéciaux !"} autoFocus={true}/>
            </p>
            
            {/* Button*/}
            <p>
                <button onClick={onClickClear} className="btnClear">Effacer</button>
                <button onClick={onClickNormalize} className="btnNormalize">Normaliser</button>
            </p>

            {/* composant resultat */}
            < Result textToDisplay={resultValue[0]} divResultClass={resultValue[1]} />
                        
        </div>

        
    );
};

export default Formulaire;