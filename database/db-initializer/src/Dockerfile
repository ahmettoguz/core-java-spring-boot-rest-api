# FROM mysql
FROM mysql:oraclelinux9

WORKDIR /docker-entrypoint-initdb.d

COPY ./init.sql .
COPY ./init.sh .

RUN chmod +x init.sh

ENTRYPOINT ["./init.sh"]