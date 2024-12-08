# 1. Nginx를 사용한 베이스 이미지
FROM nginx:alpine

# 2. React 빌드 파일을 Nginx의 html 디렉토리로 복사
COPY build/ /usr/share/nginx/html

# 3. Nginx의 기본 포트 80을 개방
EXPOSE 80

# 4. Nginx를 포그라운드로 실행
CMD ["nginx", "-g", "daemon off;"]
