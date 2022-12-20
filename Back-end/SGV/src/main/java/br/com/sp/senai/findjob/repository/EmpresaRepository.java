package br.com.sp.senai.findjob.repository;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sp.senai.findjob.model.Empresa;
import br.com.sp.senai.findjob.model.Vaga;

@Repository
public interface EmpresaRepository extends PagingAndSortingRepository<Empresa, Long> {

	// buscar empresa no banco por Id e senha.
	public Empresa findByIdAndSenha(Long id, @NotNull String senha);
	
	//Quey para buscar por id de Empresa Especificado
	@Query("SELECT e FROM Empresa e WHERE e.id = :id")
	public List<Empresa> buscaPorIdEmpresa(@Param("id") Long id);

	public Object findByCnpj(String cnpj);

	public Empresa findByCnpjAndSenha(String cnpj, String senha);

	public Object findByEmail(String email);
	
	//
	
	

}
