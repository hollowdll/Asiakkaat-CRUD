

//funktio lomaketietojen muuttamiseksi JSON-stringiksi
function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
} 

// hae asiakastiedot GET-metodilla
function haeAsiakkaat() {
	const url = "asiakkaat?hakusana=" + document.getElementById("hakusana").value;
	const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };
     
    fetch(url, requestOptions)
    .then(response => response.json())	//Muutetaan vastausteksti JSON-objektiksi 
   	.then(response => printItems(response)) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList){
	//console.log(respObjList);
	let htmlStr="";
	for(let item of respObjList){//yksi kokoelmalooppeista		
    	htmlStr+="<tr id='rivi_"+item.id+"'>";
    	htmlStr+="<td>"+item.id+"</td>";
    	htmlStr+="<td>"+item.etunimi+"</td>";
    	htmlStr+="<td>"+item.sukunimi+"</td>";
    	htmlStr+="<td>"+item.puhelin+"</td>";
    	htmlStr+="<td>"+item.sposti+"</td>";    
		htmlStr+="<td><span class='poista' onclick=varmistaPoisto("+item.id+",'"+encodeURI(item.etunimi + " " + item.sukunimi)+"')>Poista</span></td>"; //encodeURI() muutetaan erikoismerkit, välilyönnit jne. UTF-8 merkeiksi.
    	htmlStr+="</tr>";    	
	}	
	document.getElementById("tbody").innerHTML = htmlStr;	
}

//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
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
	} else if(document.getElementById("sposti").value.length < 1 || !document.getElementById("sposti").value.match(/[@]/g)){
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
	teksti=teksti.replace(/[\[\]{}<> ]/g, "").trim();	// poista ei-halutut merkit
	teksti=teksti.replace(/'/g, "''");//&apos;
	/*
	teksti=teksti.replace(/</g, "");//&lt;
	teksti=teksti.replace(/>/g, "");//&gt;	
	*/
	return teksti;
}

//funktio tietojen lisäämistä varten. Kutsutaan backin POST-metodia ja välitetään kutsun mukana asiakkaan tiedot json-stringinä.
function lisaaTiedot(){
	let formData = serialize_form(document.lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	//console.log(formData);
	let url = "asiakkaat";    
    let requestOptions = {
        method: "POST", 	//Lisätään asiakas
        headers: { "Content-Type": "application/json" },  
    	body: formData
    };
      
    fetch(url, requestOptions)
    .then(response => response.json())	//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
   			document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys epäonnistui.";	
        }else if(responseObj.response==1){ 
        	document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys onnistui.";
			document.lomake.reset(); //Tyhjennetään asiakkaan lisäämisen lomake		        	
		}
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000);
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

function varmistaPoisto(id, nimi){
	nimi = decodeURI(nimi);
	if(confirm("Poista asiakas " + nimi +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(id, encodeURI(nimi));
	}
}

//Poistetaan asiakas kutsumalla backin DELETE-metodia ja välittämällä sille poistettavan asiakkaan id
function poistaAsiakas(id, nimi){
	let url = "asiakkaat?id=" + id;
    let requestOptions = {
        method: "DELETE"
    };
    
    fetch(url, requestOptions)
    .then(response => response.json())	//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
			alert("Asiakkaan poisto epäonnistui.");	        	
        }else if(responseObj.response==1){ 
			document.getElementById("rivi_"+id).style.backgroundColor="red";
			alert("Asiakkaan " + decodeURI(nimi) +" poisto onnistui."); //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
			haeAsiakkaat();      	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}
