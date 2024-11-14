package com.aoe.restapi.utility.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationHours}")
    private long expirationHours;

    private Key generateKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Integer id) {
        Key key = generateKey();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationHours * 3600000);

        return Jwts.builder()
                .setSubject(id + "")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims parseToken(String token) {
        Jws<Claims> jws = Jwts.parser()
                .setSigningKey(generateKey())
                .build()
                .parseClaimsJws(token);
        return jws.getBody();
    }

    public String getIdFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(generateKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(generateKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
