#!/bin/bash
docker exec -it mbtc.backend bash -c "source _pyvenv/bin/activate && python manage.py migrate && python load_fixtures.py $1 $2"