FROM php:8.1-fpm

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update && apt-get install -y mc wget curl git libfreetype6-dev \
libjpeg62-turbo-dev \
libxslt-dev \
libicu-dev \
libmcrypt-dev \
libxml2-dev \
libzip-dev \
libgpgme-dev \
libpq-dev \
nodejs \
&& docker-php-ext-install -j$(nproc) iconv mysqli pdo_mysql zip \
&& docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
&& docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl
RUN docker-php-ext-install xsl
RUN docker-php-ext-install soap
RUN docker-php-ext-install bcmath
RUN pecl install gnupg \
&& docker-php-ext-enable gnupg

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN docker-php-ext-configure sockets
RUN docker-php-ext-install sockets

RUN apt-get install -y \
    libmagickwand-dev --no-install-recommends \
    && pecl install imagick

ADD php.ini /usr/local/etc/php/php.ini

RUN wget https://getcomposer.org/installer -O - -q \
    | php -- --install-dir=/bin --filename=composer --quiet

RUN mkdir -p /var/www/.config
RUN chmod 777 /var/www/.config

WORKDIR /code

