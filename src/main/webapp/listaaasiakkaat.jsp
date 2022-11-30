<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/styles.css">
<title>Asiakkaat</title>
</head>
<body onload="asetaFocus('hakusana')">

<table id="listaus">
	<thead>
		<tr>
			<th colspan="7" class="oikealle"><a id="linkki" href="lisaaasiakas.jsp">Lisää uusi asiakas</a></th>
		</tr>
		<tr>
			<th colspan="3" id="hakusana-text">Hakusana:</th>
			<th colspan="1"><input type="text" id="hakusana" onkeydown="tutkiKey(event, 'listaa')"></th>
			<th colspan="3"><input type="button" value="Hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>		
		<tr>
			<th>ID</th>
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelin</th>
			<th>Sposti</th>
			<th colspan="2"></th>
		</tr>
	</thead>
	<tbody id="tbody">
	</tbody>
</table>

<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<script>haeAsiakkaat();</script>

</body>
</html>