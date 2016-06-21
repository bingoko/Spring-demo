package com.registration;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {

	   @RequestMapping(value="/user", method = RequestMethod.GET)
	   public ModelAndView user() {
		   return new ModelAndView("user","command", new User());
	   }
	
	   @RequestMapping(value="/addUser",method = RequestMethod.POST)
	   public String addUser(@ModelAttribute("UserRegistration")User user, ModelMap model) {
		   model.addAttribute("username", user.getUsername());
		   model.addAttribute("password", user.getPassword());
		   model.addAttribute("email", user.getEmail());
	      return "result";
	   }
	   
	   
	   
}
