FROM openjdk:18-jdk-alpine3.15

WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN dos2unix mvnw
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]