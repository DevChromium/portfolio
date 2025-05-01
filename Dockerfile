FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine
COPY --from=builder /app/package.json /app/package-lock.json /app/.next /app/public ./

RUN npm cache clean --force && npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]