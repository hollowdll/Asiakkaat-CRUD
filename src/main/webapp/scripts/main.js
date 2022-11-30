//funktio lomaketietojen muuttamiseksi JSON-stringiksi
function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
}

//funktio arvon lukemiseen urlista avaimen perusteella
function requestURLParam(sParam){
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++){
        let sParameterName = sURLVariables[i].split("=");
        if(sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}

//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
	}
}

//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaPaivita(){
	if(tutkiTiedot()){
		paivitaTiedot();
	}
}

//funktio syöttötietojen tarkistamista varten
function tutkiTiedot(){
	let ilmo="";
	if(document.getElementById("etunimi").value.length < 1 || document.getElementById("etunimi").value.match(/[0-9]/g)){
		ilmo="Etunimi ei kelpaa!";	
		document.getElementById("etunimi").focus();	
	} else if(document.getElementById("sukunimi").value.length < 1 || document.getElementById("sukunimi").value.match(/[0-9]/g)){
		ilmo="Sukunimi ei kelpaa!";	
		document.getElementById("sukunimi").focus();
	} else if(document.getElementById("puhelin").value.length < 1 || document.getElementById("puhelin").value.match(/[A-ZÅÄÖ]/gi)) {
		ilmo="Puhelinnumero ei kelpaa!";	
		document.getElementById("puhelin").focus();	
	} else if(document.getElementById("sposti").value.length < 1 || !document.getElementById("sposti").value.match(/@/g)){
		ilmo="Sähköposti ei kelpaa!";
		document.getElementById("sposti").focus();
	}
	if(ilmo!=""){
		document.getElementById("ilmo").innerHTML=ilmo;
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000);
		return false;
	} else{
		document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value);
		return true;
	}
}

//Funktio XSS-hyökkäysten estämiseksi (Cross-site scripting)
function siivoa(teksti){
	teksti=teksti.replace(/[\[\]{}<>; ]/g, "").trim();	// poista ei-halutut merkit
	teksti=teksti.replace(/'/g, "''");//&apos;
	/*
	teksti=teksti.replace(/</g, "");//&lt;
	teksti=teksti.replace(/>/g, "");//&gt;	
	*/
	return teksti;
}

function varmistaPoisto(id, nimi){
	if(confirm("Poista asiakas " + decodeURI(nimi) +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(id, nimi);
	}
}

function asetaFocus(target){
	document.getElementById(target).focus();
}

//Funktio Enter-nappiin. Kutsu bodyn onkeydown()-metodista.
function tutkiKey(event, target){	
	if(event.keyCode==13){	//13=Enter
		if(target=="listaa"){
			haeAsiakkaat();
		}else if(target=="lisaa"){
			tutkiJaLisaa();
		}else if(target=="paivita"){
			tutkiJaPaivita();
		}
	}
}
