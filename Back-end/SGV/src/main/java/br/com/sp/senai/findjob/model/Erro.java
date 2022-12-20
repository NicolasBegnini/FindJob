package br.com.sp.senai.findjob.model;

import org.springframework.http.HttpStatus;


public class Erro {
	private HttpStatus statusCode;
	private String mensagem;
	private String exception;

	public Erro(HttpStatus status, String msg, String exc) {
		this.statusCode = status;
		this.mensagem = msg;
		this.exception = exc;
	}

	public HttpStatus getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(HttpStatus statusCode) {
		this.statusCode = statusCode;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
	}
}
