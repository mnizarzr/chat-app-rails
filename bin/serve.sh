#!/usr/bin/env bash
# exit on error
set -o errexit


bundle install
bin/vite clobber --mode=production
RAILS_ENV=production bin/rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
bundle exec puma -C config/puma.rb
