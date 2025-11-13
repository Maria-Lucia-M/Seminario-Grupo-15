# Imagen base
FROM node:20

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml primero para aprovechar cache
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Comando por defecto (modo desarrollo)
CMD ["pnpm", "start:dev"]
