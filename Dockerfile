# Escolha uma imagem de Node.js como base
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo yarn.lock para o diretório de trabalho
COPY package.json yarn.lock /app/

# Execute o comando yarn para instalar as dependências
RUN yarn install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . /app

# Compile o código React para produção
# RUN yarn build

# Defina a porta em que a aplicação irá ouvir
EXPOSE 8080

# Inicie a aplicação
CMD ["yarn", "start"]