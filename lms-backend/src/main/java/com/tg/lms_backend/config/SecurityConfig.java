package com.tg.lms_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@enableWebSecurity

public class SecurityConfig extends WebSecurityConfigureAdapter {
	@Override
	
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.authorizeRequests()
		.antMatches("/api/auth/**").permitAll()
		.anyRequest().authenticated()
		.and()
		.httpBasic();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
