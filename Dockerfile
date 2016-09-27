FROM alpine:3.4

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

# RUN bundle install

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