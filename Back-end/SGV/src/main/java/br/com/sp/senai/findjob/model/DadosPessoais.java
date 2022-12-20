package br.com.sp.senai.findjob.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
@Entity
@Table(name = "dadosPessoais")
public class DadosPessoais {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String dataNasc;
	private String estCivil;
	private String nascionalidade;
	private String celular;
	private String telefone;
	private String recado;
	//endereco
	private String rua;
	private String numero;
	private String cep;
	private String bairro;
	private String cidade;
	private String uf;
	private boolean pcd;

	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToOne
	private Usuario usuario;
	
}




