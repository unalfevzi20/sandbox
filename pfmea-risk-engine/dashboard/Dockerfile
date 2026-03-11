FROM node:20

WORKDIR /app

# Lock dosyası olmadığı için sadece package.json kopyalıyoruz
COPY package.json ./

# npm ci yerine npm install kullan
RUN npm install --force

# Kaynakları kopyala ve build al
COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]