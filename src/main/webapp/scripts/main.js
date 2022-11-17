//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
const printItems = respObjList => {
	//console.log(respObjList);
	let htmlStr="";
	for (let item of respObjList) {
    	htmlStr+="<tr id='rivi_"+item.id+"'>";
    	htmlStr+="<td>"+item.etunimi+"</td>";
    	htmlStr+="<td>"+item.sukunimi+"</td>";
    	htmlStr+="<td>"+item.puhelin+"</td>";
    	htmlStr+="<td>"+item.sposti+"</td>";     	
    	htmlStr+="</tr>";    	
	}	
	document.getElementById("tbody").innerHTML = htmlStr;	
}

// hae asiakastiedot GET-metodilla
const haeAsiakkaat = () => {
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

// Hae kerran kaikki
haeAsiakkaat();