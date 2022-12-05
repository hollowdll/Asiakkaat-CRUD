<%@include file="header.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/styles.css">
<title>Muuta asiakkaan tietoja</title>
</head>
<body onload="asetaFocus('etunimi')" onkeydown="tutkiKey(event, 'paivita')">
	<form name="lomake">
		<table>
			<thead>
				<tr>
					<th colspan="5" class="oikealle"><a id="linkki" href="listaaasiakkaat.jsp">Takaisin listaukseen</a></th>
				</tr>
				<tr>
					<th>Etunimi</th>
					<th>Sukunimi</th>
					<th>Puhelin</th>
					<th>Sposti</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" name="etunimi" id="etunimi" /></td>
					<td><input type="text" name="sukunimi" id="sukunimi" /></td>
					<td><input type="text" name="puhelin" id="puhelin" /></td>
					<td><input type="text" name="sposti" id="sposti" /></td> 
					<td><input type="button" id="tallenna" value="Hyväksy" onclick="tutkiJaPaivita()"></td>
				</tr>
			</tbody>
		</table>
		<input type="hidden" name="id" id="id">
	</form>
	<p id="ilmo"></p>
	
	<script src="scripts/main.js"></script>
	<script src="scripts/io.js"></script>
	<script>haeAsiakas();</script>
</body>
</html>