package br.com.sp.senai.findjob.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.sp.senai.findjob.model.Administrador;

public interface AdministradorRepository extends PagingAndSortingRepository<Administrador, Long> {

	Administrador findByIdAndSenha(Long id, String senha);

	Administrador findByNifAndSenha(String nif, String senha);

	Administrador findByEmail(String email);

	Administrador findByCpf(String cpf);

	Administrador findByCpfAndSenha(String cpf, String senha);

}
