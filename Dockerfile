# Usamos Node 20 como base
FROM node:20 AS build

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos del proyecto
COPY . .

# Compilamos la aplicación Angular para producción
RUN npm run build --prod

# Usamos una imagen ligera de nginx para servir la aplicación
FROM nginx:alpine AS final

# Copiamos los archivos compilados de Angular al directorio de Nginx
COPY --from=build /app/dist/auto-ventas-front/browser /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
