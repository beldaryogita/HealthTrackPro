//package com.example.hospital.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//    @Value("${jwt.secret}")
//    private String secret;
//
//    public String generateToken(String email) {
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
//                .signWith(SignatureAlgorithm.HS256, secret)
//                .compact();
//    }
//
//    public String extractEmail(String token) {
//        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
//    }
//
//    public boolean validateToken(String token, UserDetails userDetails) {
//        final String email = extractEmail(token);
//        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getExpiration().before(new Date());
//    }
//}
