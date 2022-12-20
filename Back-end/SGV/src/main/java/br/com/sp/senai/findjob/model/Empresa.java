package br.com.sp.senai.findjob.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CNPJ;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
@Entity
@Table(name = "empresa")
public class Empresa {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "nome", length = 100)
	private String nome;

	@Email
	@Column(name = "email", length = 50)
	private String email;

	@Column(name = "telefone", length = 20)
	private String telefone;

	@Column(name = "cnpj", length = 20)
	@CNPJ
	private String cnpj;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "senha", columnDefinition = "TEXT")
	private String senha;

	@Column(name = "cep", length = 50)
	private String cep;

	@Column(name = "endereco", length = 100)
	private String endereco;

	@Column(name = "numero", length = 100)
	private String numero;

	@Column(name = "complemento", length = 15)
	private String complemento;

	@Column(name = "bairro", length = 50)
	private String bairro;

	@Column(name = "cidade", length = 50)
	private String cidade;

	@Column(name = "uf", length = 5)
	private String uf;

	public TipoUsuario tipoUsuario;

	private Boolean ativo;
	private Boolean aprova;

	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "empresa")
	private List<Vaga> vagas;

	
	  
	/*
	 * public void setEmpresa(String nome, String email, String telefone, String
	 * cnpj, String cep, String endereco, String numero, String complemento, String
	 * bairro, String cidade, String uf, TipoUsuario tipoUsuario, boolean ativo,
	 * boolean aprova) { this.nome = nome; this.email = email; this.telefone =
	 * telefone; this.cnpj = cnpj; this.cep = cep; this.endereco = endereco;
	 * this.numero = numero; this.complemento = complemento; this.bairro = bairro;
	 * this.cidade = cidade; this.uf = uf; this.tipoUsuario = tipoUsuario;
	 * this.ativo = ativo; this.aprova = aprova; }
	 */
	 

}
