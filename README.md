

Linting
docker-compose run --rm app sh -c "flake8"

Testing
docker-compose run --rm app sh -c "python manage.py test"

docker-compose run --rm app sh -c "python manage.py startapp core"


docker-compose run --rm app sh  --rm app sh -c "python manage.py makemigrations"
docker-compose run --rm app sh  -c "python manage.py wait_for_db && python manage.py migrate"

ADMIN
docker-compse run --rm app sh -c "python manage.py createsuperuser"
