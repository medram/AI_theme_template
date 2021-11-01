FROM php:7.3-apache

WORKDIR /var/www/html

COPY --chown=www-data:www-data ./dist/ .

RUN find . -type d -exec chmod 755 {} \; \
    && find . -type f -exec chmod 644 {} \;

EXPOSE 80
