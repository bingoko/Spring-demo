package com.registration;

import org.springframework.data.annotation.Id;

public class User {
	//@Id
	//private String id;
	
	private String username;
	private String password;
	private String email;
	
//	public User (String username, String password, String email){
//		this.username = username;
//		this.password = password;
//		this.email = email;
//	}
	
	@Override
	public String toString() {
		return String.format("User , username:%s, password:%s, email:%s",username,password,email);
	}
	public String getUsername(){
		return username;
	}
	
	public void setUsername(String username){
		this.username = username;
	}
	
	public String getPassword(){
		return password;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public String getEmail(){
		return email;
	}
	
	public void setEmail(String email){
		this.email = email;
	}
}
