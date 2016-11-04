package threewks.controller;

import com.atomicleopard.expressive.Expressive;
import com.threewks.thundr.view.View;
import com.threewks.thundr.view.jsp.JspView;
import com.threewks.thundr.view.string.StringView;

import java.util.Map;

public class Controller {
	public View home() {
		Map<String, Object> model = Expressive.map("message", "hello world");
		return new JspView("home.jsp", model);
	}

	public View test() {
		return new StringView("Test api endpoint");
	}
}
