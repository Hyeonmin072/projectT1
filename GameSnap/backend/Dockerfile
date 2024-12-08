# 1. 기본 이미지 설정 (Java 17 기반)
FROM eclipse-temurin:17-jdk-alpine

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. 애플리케이션 JAR 파일 복사
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# 4. 애플리케이션 실행 명령
ENTRYPOINT ["java", "-jar", "app.jar"]
