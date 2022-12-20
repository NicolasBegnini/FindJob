package br.com.sp.senai.findjob.model;

import org.springframework.http.HttpStatus;

public class Sucesso {

	private HttpStatus error;
	private String message;
	
	public Sucesso(HttpStatus error, String message) {
		this.error = error;
		this.message = message;
	}
	
}
