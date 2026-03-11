FROM node:18

WORKDIR /app

# Backend klasöründeki package.json'ı kopyala
COPY package.json ./

RUN npm install --legacy-peer-deps

# Backend config dosyalarını kopyala
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# ÖNEMLİ: Backend/src tam yolu ile kopyalanmalı
COPY src ./src

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]