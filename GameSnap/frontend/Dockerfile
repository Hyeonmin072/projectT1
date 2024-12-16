# 기본 이미지 설정
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 파일들을 먼저 복사
COPY package*.json ./

# 명시적으로 react-scripts 설치 추가
RUN npm install
RUN npm install react-scripts

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# Nginx 설정
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]