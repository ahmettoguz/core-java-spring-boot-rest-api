package com.aoe.restapi.constants;

public enum RoleEnum {
    USER("user", 1),
    PROJECT_MANAGER("project manager", 2),
    ADMIN("admin", 3);

    private final String name;
    private final int id;

    RoleEnum(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }
}