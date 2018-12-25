#!/bin/bash
docker exec -it mbtc.backend bash -c "python manage.py makemigrations"
docker exec -it mbtc.backend bash -c "python manage.py migrate"