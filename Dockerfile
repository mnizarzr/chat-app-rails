FROM ruby:3.0.5 AS builder

RUN apt-get update && apt-get install -y nodejs postgresql-client --no-install-recommends

ENV NODE_ENV production
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
ENV APP_PATH /app

COPY Gemfile* $APP_PATH
COPY package*.json $APP_PATH
RUN npm install
RUN bundle config --global frozen 1
RUN bundle install --without development test

WORKDIR $APP_PATH
COPY . $APP_PATH

ENTRYPOINT [ "./bin/serve.sh" ]
