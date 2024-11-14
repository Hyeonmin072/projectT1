package com.gamesnap.backend.config;

<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Value;
>>>>>>> 8c9a466f143d19961e0ca0ae9a935bd493a1935b
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${FRONTEND_URLS}")
    private String frontendUrls;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
<<<<<<< HEAD
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
=======
                .allowedOrigins(frontendUrls.split(","))
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
>>>>>>> 8c9a466f143d19961e0ca0ae9a935bd493a1935b
    }
}