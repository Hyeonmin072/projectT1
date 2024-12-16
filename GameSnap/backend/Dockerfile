# JDK 17 베이스 이미지 사용
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# JAR 파일 복사 (Gradle의 경우 build/libs 폴더에 생성됨)
COPY build/libs/*.jar app.jar

# 포트 설정 (application.properties나 application.yml에 설정된 포트와 동일하게 설정)
EXPOSE 1111

# JAR 파일 실행
ENTRYPOINT ["java","-jar","/app/app.jar"]