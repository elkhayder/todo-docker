FROM ubuntu:20.04

RUN apt-get update && \
    apt install software-properties-common ca-certificates curl gnupg -y && \
    # Node
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    # PHP
    add-apt-repository ppa:ondrej/php && \
    apt-get update && \
    # Required packages
    apt-get install -y \
        nodejs \
        apache2 \
        apache2-utils \
        php8.1 \
        php8.1-common \
        php8.1-xml \
        php8.1-curl \
        php8.1-mysql \
        zip unzip \
        git

# Laravel's
COPY --chown=www-data:www-data ./backend /var/www/html/backend
# Apache2 Config
COPY ./backend/apache.conf /etc/apache2/sites-available/000-default.conf
# Frontend
COPY ./frontend /var/www/html/frontend

RUN cd /var/www/html/frontend && \
    # Install pnpm
    npm install -g pnpm && \
    # Install packages
    pnpm install && \
    # Build Frontend
    pnpm run build && \
    # Move built frontend to laravel's public folder
    mv ./dist/* ../backend/public/ && \
    # Move index.html to views/index.blade.php
    mv ../backend/public/index.html ../backend/resources/views/index.blade.php && \
    # Go to laravel's folder
    cd /var/www/html/backend && \
    # Install Composer
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer && \
    # Install vendor packages
    composer install --optimize-autoloader --no-dev && \
    # Generate cache key
    php artisan key:generate && \
    # Enable apache2 rewrite
    a2enmod rewrite

EXPOSE 80
WORKDIR /var/www/html/backend

#Serve
CMD ["apachectl", "-D", "FOREGROUND"]
