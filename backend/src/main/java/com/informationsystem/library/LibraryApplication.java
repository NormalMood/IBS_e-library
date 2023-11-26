package com.informationsystem.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisIndexedHttpSession;

import com.informationsystem.library.model.CookieExpiry;

@SpringBootApplication
@EnableRedisIndexedHttpSession(maxInactiveIntervalInSeconds = CookieExpiry.MAX_AGE)
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}
	
}
