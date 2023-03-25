

Linting
docker-compose run --rm app sh -c "flake8"

Testing
docker-compose run --rm app sh -c "python manage.py test"

docker-compose run --rm app sh -c "python manage.py startapp core"
