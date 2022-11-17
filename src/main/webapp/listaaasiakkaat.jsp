<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script defer src="scripts/main.js"></script>
<link rel="stylesheet" href="css/styles.css">
<title>Asiakkaat</title>
</head>
<body>

<table id="listaus">
	<thead>
		<tr>
			<th colspan="2" id="hakusana-text">Hakusana:</th>
			<th colspan="1"><input type="text" id="hakusana"></th>
			<th><input type="button" value="Hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>		
		<tr>
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelin</th>
			<th>Sposti</th>
		</tr>
	</thead>
	<tbody id="tbody">
	</tbody>
</table>

</body>
</html>