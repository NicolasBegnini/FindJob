
package br.com.sp.senai.findjob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//exclude esta desabilitando os endpoints para não ficar solicitando login toda vez que rodar o servidor.
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class FindJobApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindJobApplication.class, args);
	}

}
