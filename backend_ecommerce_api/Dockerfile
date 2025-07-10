# Etapa de build
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copiar el código fuente
COPY . .

# ✅ Dar permisos de ejecución al wrapper de Maven
RUN chmod +x ./mvnw

# Compilar el JAR
RUN ./mvnw clean package -DskipTests

# Etapa final
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Crear carpeta para imágenes
RUN mkdir -p uploads/productos

# Copiar el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Exponer carpeta como volumen si querés persistencia
VOLUME /app/uploads/productos

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
