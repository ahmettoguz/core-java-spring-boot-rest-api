FROM eclipse-temurin:23 AS builder

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

FROM amazoncorretto:23

# Set the working directory
WORKDIR /app

# Copy the packaged jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port
EXPOSE 80

# Set the active profile to 'prod'
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
