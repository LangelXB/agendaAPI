# Utiliza la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto 3000, si tu aplicación utiliza un puerto diferente, ajústalo aquí
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]