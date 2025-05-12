#!/bin/bash

set -e
# export DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE}

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate
python manage.py collectstatic --noinput
# Start server
echo "Starting server"
gunicorn elexis_dashboard.wsgi:application --bind ${HOST}:${PORT} --log-level=debug \
                          --timeout=0 \
                          --access-logfile=-\
                          --log-file=-