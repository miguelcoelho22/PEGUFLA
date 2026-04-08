# Use uma imagem base leve e compatível com a sua versão do Java
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copie o .jar gerado para dentro do contêiner
COPY target/*.jar app.jar
# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]