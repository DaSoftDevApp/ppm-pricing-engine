# Dockerfile
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /usr/src/app

# Copie des fichiers de dépendances avec les bons droits
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

# Installation des dépendances
RUN npm ci

# Copie du reste du code source
COPY --chown=node:node . .

# On bascule sur l'utilisateur non-root AVANT l'exécution
USER node

# Exposition du port et commande de démarrage
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
