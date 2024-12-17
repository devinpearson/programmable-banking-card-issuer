FROM nikolaik/python-nodejs:latest as base
# RUN apt-get update
# RUN apt-get install npm -y
# RUN apt add python3
# Add package file
COPY package.json ./
COPY package-lock.json ./
COPY .env.sample ./.env
COPY prisma ./prisma/ 
# Install deps
RUN npm install

# Copy source
COPY src ./src
# COPY public ./public
COPY tsconfig.json ./tsconfig.json

# Expose port 3000
EXPOSE 3001
CMD ["npm", "run", "dev"]