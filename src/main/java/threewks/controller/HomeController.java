package threewks.controller;

import com.atomicleopard.expressive.Expressive;
import com.threewks.thundr.view.View;
import com.threewks.thundr.view.json.JsonView;
import com.threewks.thundr.view.jsp.JspView;

import java.util.Map;

public class HomeController {

	public View home() {
		Map<String, Object> model = Expressive.map("message", "hello world");
		return new JspView("home.jsp", model);
	}

	public View contactDetails() {
		Map<String, String> details = Expressive.map(
				"name", "Thundr NG2 (from api)",
				"website", "http://3wks.com.au",
				"phone", "02 1234 1234"
		);
		return new JsonView(details);
	}
}
