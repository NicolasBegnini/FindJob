package br.com.sp.senai.findjob.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sp.senai.findjob.model.Vaga;

@Repository
public interface VagaRepository extends PagingAndSortingRepository<Vaga, Long> {

	// Query que lista Vaga por uma Empresa Especifica
	@Query("SELECT v FROM Vaga v INNER JOIN Empresa em ON v.empresa.id = em.id WHERE em.id = :id")
	public List<Vaga> buscaVagaPorEmpresa(@Param("id") Long id);

}
