#https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e
FROM alpine AS scratchpad
#Just to avoid rebuild on nginx.conf change
WORKDIR /app
COPY . .
RUN rm nginx.conf

FROM node:18-alpine AS builder
ENV NODE_ENV=production

# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i --production --legacy-peer-deps
COPY --from=scratchpad /app/  ./  

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL


RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV=production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]