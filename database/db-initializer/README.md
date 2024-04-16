docker-compose up -d --build

docker run --rm -it --name db-initializer-container --network=database_spring-boot-rest-api-network -e MYSQL_HOST=my-sql -e MYSQL_USER=root -e MYSQL_PASSWORD=toor -e MYSQL_DATABASE=spring-boot-rest-api db-initializer-image


cls


docker network ls
docker network inspect bridge
docker network inspect host
docker network inspect none