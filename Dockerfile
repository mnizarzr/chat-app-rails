FROM ruby:3.0.5 AS builder

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN apt-get update && apt-get install -y postgresql-client --no-install-recommends

ENV NODE_ENV production
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

ENV APP_PATH /app
WORKDIR $APP_PATH

COPY Gemfile* $APP_PATH
COPY package*.json $APP_PATH
RUN bundle config --global frozen 1 && \
    bundle install --without development test && \
    npm install

COPY . $APP_PATH

ENTRYPOINT [ "./bin/serve" ]
