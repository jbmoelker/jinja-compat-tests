FROM mhart/alpine-node:6.6
# Travis Docker runner for ruby, python, php and node.
# Designed to work for Travis CI runner, DO NOT USE IN PRODUCTION!
# Alpine 3.4 based node & npm image

ENV TOOL_PACKAGES curl wget bash
ENV BUILD_PACKAGES curl-dev ruby-dev build-base
ENV RUBY_PACKAGES ruby ruby-io-console ruby-bundler
ENV PHP_PACKAGES php5 php5-openssl php5-json php5-phar php5-ctype
ENV PYTHON_PACKAGES python3 python3-dev py-pip

# Update and install all of the required packages.
# At the end, remove the apk cache
RUN apk update && \
    apk upgrade && \
    apk add $TOOL_PACKAGES && \
    apk add $BUILD_PACKAGES && \
    apk add $RUBY_PACKAGES && \
    apk add $PHP_PACKAGES && \
    apk add $PYTHON_PACKAGES && \
    rm -rf /var/cache/apk/*

# Install php package manager
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer 

# Copy over project
ADD . /app
WORKDIR /app

# Run package installers
RUN pip install -r requirements.txt
RUN bundle install
RUN composer install
RUN npm install

