FROM node:18-alpine AS builder

RUN apk add --no-cache openssl bash libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS runtime

RUN apk add --no-cache openssl bash libc6-compat

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY .env .env

COPY prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/main.js"]