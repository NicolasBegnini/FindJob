package br.com.sp.senai.findjob.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.sp.senai.findjob.model.DadosPessoais;

@Repository
public interface DadosPessoaisRepository extends PagingAndSortingRepository<DadosPessoais, Long>{
	

}
