package br.com.sp.senai.findjob.util;

import java.nio.charset.StandardCharsets;

import com.google.common.hash.Hashing;

public class HashUtil {
	public static String hash(String palavra) {
		String salt = "SistemaGerenciadorVagas";
		palavra = salt + palavra;
		String hash = Hashing.sha384().hashString(palavra, StandardCharsets.UTF_8).toString();
		return hash;
	}
}
