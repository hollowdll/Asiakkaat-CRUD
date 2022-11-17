package control;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

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
		}
		
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println(strJSON);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doPost()");
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doPut()");
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("AsiakkaatServlet.doDelete()");
	}

}
