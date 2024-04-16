Change directory:
    cd C:\Users\lenovo\Desktop\repository\Repository_Backup\repositoryBackup\public\Spring-Boot-Rest-Api\database

Build & Run:
    Build and run all the database services:
        docker-compose up -d --build

    Re-run db-initializer without build:
        docker-compose up -d db-initializer

    Re-build db-initializer:
        docker-compose build db-initializer
---------------------------------

Stop:

    docker compose down
---------------------------------

Check:

    docker ps -a
---------------------------------

Logging:

    docker logs db-initializer-container
    docker logs my-sql-spring-boot-rest-api-container
    docker logs phpmyadmin-spring-boot-rest-api-container


    docker inspect --format '{{.RestartCount}}' phpmyadmin-spring-boot-rest-api-container
    docker inspect --format '{{.RestartCount}}' my-sql-spring-boot-rest-api-container
---------------------------------

Enter:

    docker exec -it my-sql-spring-boot-rest-api-container /bin/bash

    printenv

    find / -type d -name "pmahomme-dark"

    exit
---------------------------------

Network Monitor:

    docker network ls

    docker network inspect spring-boot-rest-api-network
---------------------------------