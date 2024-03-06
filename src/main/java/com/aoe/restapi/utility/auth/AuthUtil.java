package com.aoe.restapi.utility.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AuthUtil {
    private static BCryptPasswordEncoder bCryptPasswordEncoder;

    static {
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public static String getEncryptedText(String plainText) {
        return bCryptPasswordEncoder.encode(plainText);
    }
}
