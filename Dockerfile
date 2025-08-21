FROM klakegg/hugo:ext AS build
WORKDIR /src
COPY . .
RUN hugo --minify

FROM nginx:alpine
COPY --from=build /src/public /usr/share/nginx/html
EXPOSE 80
