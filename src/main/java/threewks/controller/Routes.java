package threewks.controller;

import com.threewks.thundr.route.Router;

public class Routes {
	public static void addRoutes(Router router) {
		router.get("/api/home/contact", HomeController.class, "contactDetails");
		router.get("/**", HomeController.class, "home");
	}
}
