# Node.js image'ı kullanarak temel bir imaj oluşturuyoruz
FROM node:20.5

# Çalışma dizinini belirliyoruz
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını proje içine kopyalıyoruz
COPY package*.json ./

# Gerekli bağımlılıkları kuruyoruz
RUN npm install

# Proje dosyalarını container'a kopyalıyoruz
COPY . .

# Uygulamanın dışarıya açılacak portunu belirliyoruz
EXPOSE 4000

# Uygulamayı başlatıyoruz
CMD ["node", "index.js"]
