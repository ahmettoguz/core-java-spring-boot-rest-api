<h1 id="top" align="center">Core Java Spring Boot <br/> Rest API </h1> 

<br>

<div align="center">
    <img width=600 src="assets/banner/banner.png">
</div>

## 🔍 Table of Contents

- [About Project](#intro)
- [Technologies](#technologies)
- [Software Versions](#software-versions)
- [Features](#features)
- [Releases](#releases)
- [System Startup](#system-startup)
  - [Developer Mode](#developer-mode)
  - [Production Mode](#production-mode)
- [Endpoint Documentation](#endpoint-documentation)
- [Test](#test)
- [Contributors](#contributors)
 
<br/>

<h2 id="intro">📌 About Project</h2> 

This Java Spring Boot REST API application efficiently manages relational data with ORM, supporting one-to-one, one-to-many, and many-to-many relationships. It enables hot reload for instant reflection of code changes and offers flexible environment configurations. Security is robustly managed through AOP, which separates authentication and authorization from business logic, and JWT tokens ensure secure, stateless sessions.The application uses Lombok to reduce boilerplate code and supports both custom and global exception handling for seamless error management. It is fully dockerized for consistent deployment and scalability, with Swagger documentation providing interactive API exploration. Quality assurance is ensured through comprehensive automated and manual testing.

<br/>

<h2 id="technologies">☄️ Technologies</h2>

### DevOps

&nbsp; [![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

### Build Tools

&nbsp; [![Apache Maven](https://img.shields.io/badge/apache_maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)

### ORM

&nbsp; [![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)](https://hibernate.org/)

### Database

&nbsp; [![Mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

### Security

&nbsp; [![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

### Web

&nbsp; [![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)

&nbsp; [![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/)

&nbsp; [![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)

&nbsp; [![Apache Tomcat](https://img.shields.io/badge/apache%20tomcat-%23F8DC75.svg?style=for-the-badge&logo=apache-tomcat&logoColor=black)](https://tomcat.apache.org/)

&nbsp; [![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)

<br/>

<h2 id="software-versions">🏷️ Software Versions</h2>

| Software     | Version    |
|--------------|------------|
| Java         | 23         |
| Spring Boot  | 3.4.0      |
| Apache Maven | 3.9.5      |
| Swagger      | 2.7.0      |
| Lombok       | 1.18.36    |

<br/>

<h2 id="features">🔥 Features</h2>

+ **Relational Database Management:** Efficient handling of relational data with ORM, supporting one-to-one, one-to-many, and many-to-many relationships.
+ **Hot Reload:** Changes in the codebase can be instantly reflected without needing to restart the application.
+ **Environment Configuration:** Configurations have been adjusted for enhanced flexibility.
+ **AOP:** Aspect-Oriented Programming handles authentication and authorization separately from business logic, ensuring security across the application.
+ **Lombok:** Lombok is used to eliminate boilerplate code for better readability and maintainability.
+ **JWT Authentication:** User authentication and authorization are managed with JSON Web Tokens for secure, stateless sessions.
+ **Exceptions:** The application manages both custom and global exceptions for error handling.
+ **Swagger Documentation:** Comprehensive API documentation integrated for documentation and testing purposes.
+ **Dockerization:** The application is containerized for consistent deployment and scaling.
+ **Automated & Manual Testing:** Both automated and manual tests implemented for quality assurance.

<br/>

<h2 id="releases">🚢 Releases</h2> 

&nbsp; [![.](https://img.shields.io/badge/1.0.0-233838?style=flat&label=version&labelColor=470137&color=077521)](https://github.com/ahmettoguz/core-java-spring-boot-rest-api/tree/v1.0.0)

<br/>

<h2 id="system-startup">🚀 System Startup</h2> 

<h3 id="developer-mode">🧪 Developer Mode</h3>

```
mvnw spring-boot:run
```

<br/>

<h3 id="production-mode">⚡Production Mode</h3> 

* Create a new directory named `core`.
* Clone the [`core-docker-config`](https://github.com/ahmettoguz/core-docker-config) and [`core-java-spring-boot-rest-api`](https://github.com/ahmettoguz/core-java-spring-boot-rest-api) repositories into the `core` directory.
```
git clone https://github.com/ahmettoguz/core-docker-config
git clone https://github.com/ahmettoguz/core-java-spring-boot-rest-api
```

* Copy `application-dev.properties` to create `application-prod.properties`. Refer to `production-example.txt` for guidance.
* Refer to the documentation provided in the [`core-docker-config`](https://github.com/ahmettoguz/core-docker-config) project for the system startup commands.

<br/>

<h2 id="endpoint-documentation">📍 Endpoint Documentation</h2>
You can access the full API documentation using Swagger UI.

To view the documentation visit: [`sw/swagger-ui/index.html`](https://localhost/sw/swagger-ui/index.html)

![endpoint-doc](assets/endpoint-doc/endpoint-doc.png)

<br/>

<h2 id="test">🔬 Test </h2>

Check out the [`core-mocha-api-automation-test`](https://github.com/ahmettoguz/core-mocha-api-automation-test) repository for both automation and manual tests.

<br/>

<h2 id="contributors">👥 Contributors</h2> 

<a href="https://github.com/ahmettoguz" target="_blank"><img width=60 height=60 src="https://avatars.githubusercontent.com/u/101711642?v=4"></a> 

### [🔝](#top)
