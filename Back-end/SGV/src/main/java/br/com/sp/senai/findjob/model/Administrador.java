package br.com.sp.senai.findjob.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
@Entity
@Table(name="administrador  ")
public class Administrador {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "nome", length = 200, nullable = false)
	private String nome;
	
	@Email(message = "insira um email válido!")
	@Column(name = "email", length = 100, nullable = false)
	private String email;
	
	@Column(name = "nif", length = 50, nullable = true)
	private String nif;
	
	@CPF
	@Column(name = "cpf", length = 50, nullable = true)
	private String cpf;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "senha", columnDefinition = "TEXT", nullable = false)
	private String senha;
	
	private Boolean ativo;
	
	public TipoUsuario tipoUsuario;
}
