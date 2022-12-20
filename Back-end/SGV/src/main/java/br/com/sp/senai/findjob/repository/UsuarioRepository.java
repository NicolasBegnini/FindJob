package br.com.sp.senai.findjob.repository;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sp.senai.findjob.model.TipoUsuario;
import br.com.sp.senai.findjob.model.Usuario;

@Repository
public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {

	// buscar usuario no banco por Id e senha.
	public Usuario findByIdAndSenha(Long id, @NotNull String senha);

	public Usuario findByCpfAndEmail(String cpf, String email);

	public Usuario findByEmailAndSenhaAndAtivo(String email, String senha, boolean ativo);
	
	public Usuario findByNifAndAtivo(String nif, boolean ativo);
	
	public Page<Usuario> findByTipoUsuario(Pageable page, TipoUsuario tipo);
	

	@Query("SELECT u FROM Usuario u WHERE (u.tipoUsuario = 0) AND (u.nome LIKE %:t% or u.nif LIKE %:t% or u.email LIKE %:t% or u.cpf LIKE %:t%)")
	public Page<Usuario> buscarPorText (@Param("t") String usuario, Pageable page);
	
	@Query("SELECT u FROM Usuario u WHERE (u.tipoUsuario = 1) AND (u.nome LIKE %:t% or u.nif LIKE %:t% or u.email LIKE %:t%)")
	public Page<Usuario> buscarPorTextAdm (@Param("t") String usuario, Pageable page);
	
	@Query("SELECT u.nome, u.email, u.nif, u.cpf FROM Usuario u WHERE u.tipoUsuario = 0")
	public Iterable<Usuario> autoComplete ();
	
	@Query("SELECT u.nome, u.email, u.nif, u.cpf FROM Usuario u WHERE u.tipoUsuario = 1")
	public Iterable<Usuario> autoCompleteAdm ();
	
	public Usuario findByNif(String nif);
	
	public Usuario findByCpfAndId(String cpf, Long id);
	
	@Query("Select u.email from Usuario u where u.tipoUsuario = 1 and u.ativo = true")
	public List<String> buscaEmailAdmOther();
	
	public Usuario findByEmail(String email);

	public Usuario findByCpfAndSenha(String cpf, String senha);

	public Object findByCpf(String cpf);
	
}
