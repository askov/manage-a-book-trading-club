#!/bin/bash
docker exec -it mbtc.backend bash -c "source _pyvenv/bin/activate && python manage.py makemigrations && python manage.py migrate"