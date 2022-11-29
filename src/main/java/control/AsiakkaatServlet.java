package control;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Asiakas;
import model.dao.Dao;

@WebServlet("/asiakkaat/*")
public class AsiakkaatServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public AsiakkaatServlet() {
        System.out.println("AsiakkaatServlet.AsiakkaatServlet()");
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doGet()");
		String hakusana = request.getParameter("hakusana");
		String id = request.getParameter("id");
		Dao dao = new Dao();
		String strJSON="";
		
		if (hakusana != null) {		//Jos kutsun mukana tuli hakusana
			ArrayList<Asiakas> asiakkaat;
			
			if (!hakusana.equals("")) {
				asiakkaat = dao.getAllItems(hakusana);	//Haetaan kaikki hakusanan mukaiset							
			} else {
				asiakkaat = dao.getAllItems();	//Haetaan kaikki
			}
			strJSON = new Gson().toJson(asiakkaat);	
		} else if (id != null) {
			Asiakas asiakas = dao.getItem(Integer.parseInt(id));
			strJSON = new Gson().toJson(asiakas);
		}
		
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println(strJSON);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doPost()");
		//Luetaan JSON-tiedot POST-pyynnön bodysta ja luodaan niiden perusteella uusi asiakas
		String strJSONInput = request.getReader().lines().collect(Collectors.joining());
		//System.out.println(strJSONInput);
		Asiakas asiakas = new Gson().fromJson(strJSONInput, Asiakas.class);	
		//System.out.println(asiakas);
		Dao dao = new Dao();
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		if (dao.addItem(asiakas)) {
			out.println("{\"response\":1}");  // lisääminen onnistui {"response":1}
		} else {
			out.println("{\"response\":0}");  // lisääminen epäonnistui {"response":0}
		}
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doPut()");
		//Luetaan JSON-tiedot PUT-pyynnän bodysta ja luodaan niiden perusteella uusi auto
		String strJSONInput = request.getReader().lines().collect(Collectors.joining());
		//System.out.println("strJSONInput " + strJSONInput);		
		Asiakas asiakas = new Gson().fromJson(strJSONInput, Asiakas.class);
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		Dao dao = new Dao();			
		if(dao.changeItem(asiakas)){ //metodi palauttaa true/false
			out.println("{\"response\":1}");  //Auton muuttaminen onnistui {"response":1}
		}else{
			out.println("{\"response\":0}");  //Auton muuttaminen epäonnistui {"response":0}
		}
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doDelete()");
		int id = Integer.parseInt(request.getParameter("id"));
		Dao dao = new Dao();
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		if (dao.removeItem(id)) {
			out.println("{\"response\":1}");  // poistaminen onnistui {"response":1}
		} else {
			out.println("{\"response\":0}");  // poistaminen epäonnistui {"response":0}
		}
	}

}
