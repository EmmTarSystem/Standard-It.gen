import React, { useRef, useState } from 'react';
import './formulaire.css';
import Result from './Result';



const Formulaire = () => {
    
                                                 //STATE


    // Affichage resultat
    //["texte resulat", "class de la div resultat"]
    const [resultValue,setResultValue] = useState(["","divResultHidden"]);


    //Emetteur 
    var cookieEmetteur = localStorage.getItem("Standard-It Basic Emetteur");
    const [emetteur,setEmetteur] = useState(cookieEmetteur ? cookieEmetteur :"");

    //protection
    const [protection,setProtection] = useState("NP");



                                        //VARIABILISATION DIVERS
    
                                        
    
    //Variabilisation
    var textResult = "";
    const nbreMaxCaractere=60;
    //Tableau des protections
    const allProtectionArray = ["NP","DR","DR-SF","S","S-SF"];

    // Variable pour nommage class style div selon protection
    var globalDivProtectionClass="globalDivProtectionClass"+protection;
   
    //variable pour la class de l'emetteur si remplit ou non
    const inputEmetteurClass = (emetteur !=="" ? "emetteurPresent" : "emetteurAbsent");
    const resultDisplayValid = (emetteur !=="" ? true : false);
    //Reférence aux elements des formulaires
    const inputTitleRef = useRef();




                                            //EVENTS CHANGE


    //CHANGEMENT PROTECTION
    const onChangeProtection = (e)=>{
        console.log("Changement de la protection pour = " + e);
        // Set la protection pour reactualisation et clear l'affichage
        setProtection(e);
        onHiddenResult();
    }






    //CHANGEMENT EMETTEUR
    const onChangeEmetteur = (e) =>{
        setEmetteur(e);
        //masque le resultat si non masqué
        onHiddenResult();
    }
    
   


    //CHANGEMENT TITRE
    const onChangeTitle = () => {
        onHiddenResult()
    }

    //Cache l'affichage resultat si besoin
    const onHiddenResult = () =>{
        if (resultValue[1] === "divResultVisible") {
            setResultValue(["","divResultHidden"])
            
        };
    };



                                        //EFFACER



    const onClickClear = () => {
        //clear uniquement si necessaire
        console.log("Clic Effacer")
        if (inputTitleRef.current.value !== "" || resultValue[1] !== "divResultHidden") {
            //efface le contenu de l'input
            inputTitleRef.current.value="";
            //set les states pour reactualiser l'affichage
            console.log("Effacement effectué");
            onHiddenResult();
        }else{
            console.log("Rien à effacer");
        }  
    };



                                // PROCESS DE NORMALISATION




    //Vérification avant normalisation
    const onClickNormalize = () => {

        //Vérification champ emetteur avant normalisation
        
        if(emetteur===""){
            console.log("Champ EMETTEUR vide !!!!");
            setResultValue(["Veuillez remplir le champ EMETTEUR !","divResultVisible"]);
        }else{
            onNormalize();
        }
    }

   




    // lancement de la normalisation

    const onNormalize = () => {
        console.log("clic normaliser")
        
        //Stockage COOKIE Emetteur si nouveau
        if(cookieEmetteur!==emetteur){
            localStorage.setItem("Standard-It Basic Emetteur",emetteur)
            console.log("Mémorisation nouveau cookie emetteur : " + emetteur);
        }
        

        //traitement du format orthographe du titre
        var correctedTitle = inputTitleRef.current.value;
        
                
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
            correctedTitle = correctedTitle.replace(correctionRef[i][0],correctionRef[i][1])
        };

        // 1 Lettre majuscule
        correctedTitle = correctedTitle.charAt(0).toUpperCase() + correctedTitle.slice(1);


        //Traitement du format date 
        var locDateToday = new Date(),
            year = (locDateToday.getFullYear()),
            tempMonth = (locDateToday.getMonth() + 1),
            tempDay = (locDateToday.getDate());

        // traitement format 2 digits
        var finalMonth =(tempMonth < 10 ? "0" + tempMonth : tempMonth);
        var finalDay =(tempDay < 10 ? "0" + tempDay : tempDay);

        // simplification de la date
        var locFinalDate = ('' +   year + finalMonth + finalDay);


        //Ecriture résultat finale
        textResult = locFinalDate+"_"+protection+"_"+emetteur+"_"+correctedTitle;      
      

        //Copie dans le clipboard 
        navigator.clipboard.writeText(textResult);
        console.log("Text copié dans le clipboard = " + textResult);
        //Set les STATES pour modifier l'affichage
        setResultValue([textResult,"divResultVisible"]);
        
       
    };


    console.log("Chargement formulaire");

    

                                                //RENDER



    return (
        // protection
        <div>
            <div className={globalDivProtectionClass}>
                <form action="" >
                    {allProtectionArray.map(
                    (element,i)=>{
                        return <div className='localDivProtectionClass' key={i}>
                        <input type="radio" name='classification' onChange={()=>onChangeProtection(element)} key={i} value={element} id={element} checked={element===protection}/>
                        <label htmlFor={element}>{element}</label>
                        </div>

                    }
                    )}
                </form>
            </div>
             {/* Input Emetteur */}
             <p>
                <label htmlFor="">EMETTEUR : </label>
                <input className={inputEmetteurClass} type="text" onChange={(e) => onChangeEmetteur(e.target.value)} placeholder={"Exemple : BALARD-CMI"} value={emetteur}/>
            </p>
          
            {/* Input Title */}
            <p>
                <label htmlFor="">NOM : </label>
                <input className='titre' type="text" ref={inputTitleRef} onChange={onChangeTitle} maxLength={nbreMaxCaractere} placeholder={nbreMaxCaractere + " caractères maximum / Pas de caractères spéciaux !"} autoFocus={true}/>
            </p>
            
            {/* Button*/}
            <p>
                <button onClick={onClickClear} className="btnClear">Effacer</button>
                <button onClick={onClickNormalize} className="btnNormalize">Normaliser</button>
            </p>

            {/* composant resultat */}
            < Result textToDisplay={resultValue[0]} divResultClass={resultValue[1]} resultValid={resultDisplayValid}/>
                        
        </div>

        
    );
};

export default Formulaire;