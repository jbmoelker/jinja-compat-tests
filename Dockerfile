FROM mhart/alpine-node:6.6
# Alpine 3.4 based node & npm image

ENV BUILD_PACKAGES curl-dev ruby-dev build-base
# ENV RUBY_PACKAGES ruby ruby-io-console ruby-bundler
# 
# # Update and install all of the required packages.
# # At the end, remove the apk cache
# RUN apk update && \
#     apk upgrade && \
#     apk add $BUILD_PACKAGES && \
#     apk add $RUBY_PACKAGES && \
#     rm -rf /var/cache/apk/*

# Install base packages
RUN apk update 
RUN apk upgrade
RUN apk add $BUILD_PACKAGES 
RUN apk add curl wget bash

# Install ruby, ruby-io-console and ruby-bundler
RUN apk add ruby ruby-io-console ruby-bundler

# Clean APK cache
RUN rm -rf /var/cache/apk/*

RUN apk add --update \
    python3 \
    python3-dev \
    py-pip \
  && rm -rf /var/cache/apk/*



# Copy over project
ADD . /app
WORKDIR /app


# Run package installers
RUN bundle install
RUN pip install -r requirements.txt
RUN npm install

RUN apk --update add php5 php5-openssl php5-json php5-phar php5-ctype
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer 
RUN composer install
