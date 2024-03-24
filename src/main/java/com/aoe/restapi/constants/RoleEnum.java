package com.aoe.restapi.constants;

public enum RoleEnum {
    PROJECT_MANAGER("project manager"),
    ADMIN("admin"),
    User("user");

    private final String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
