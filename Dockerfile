# Build the static site, then serve it with nginx.
FROM node:26-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# The CV is maintained in its own repository; every image carries the version on its main branch.
ADD --chmod=644 https://raw.githubusercontent.com/frederikb96/cv/main/cv.pdf dist/cv.pdf

FROM nginx:1.29-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
