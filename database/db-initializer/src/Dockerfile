FROM mysql

WORKDIR /docker-entrypoint-initdb.d

COPY ./init.sql .
COPY ./init.sh .

RUN chmod +x init.sh

ENTRYPOINT ["./init.sh"]