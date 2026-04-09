FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libzip-dev \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_sqlite zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN mkdir -p database && touch database/database.sqlite

RUN composer install --no-interaction --optimize-autoloader --no-dev

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/database

RUN php artisan config:clear

RUN php artisan migrate --force

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000"]