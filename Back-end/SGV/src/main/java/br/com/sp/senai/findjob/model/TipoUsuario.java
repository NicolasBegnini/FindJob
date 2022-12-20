package br.com.sp.senai.findjob.model;

public enum TipoUsuario {

	USUARIO("usuario"), ADMINISTRADOR("administrador"), EMPRESA("empresa");

	String tipo;

	private TipoUsuario(String tipo) {
		this.tipo = tipo;
	}

	@Override
	public String toString() {
		return this.tipo;
	}
}

