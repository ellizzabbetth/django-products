

Linting
docker-compose run --rm app sh -c "flake8"

Testing
docker-compose run --rm app sh -c "python manage.py test"

docker-compose run --rm app sh -c "python manage.py startapp core"


docker-compose run --rm app sh  --rm app sh -c "python manage.py makemigrations"
docker-compose run --rm app sh  -c "python manage.py wait_for_db && python manage.py migrate"


docker-compose run --rm frontend sh -c 'npm i nodemon'
docker-compose logs -f -t app

ADMIN
docker-compse run --rm app sh -c "python manage.py createsuperuser"
docker-compose exec app sh:>> /app/app : pip install -r requirements.txt

Requirements
docker-compose up -d
docker-compose exec app sh
pip install Faker

Automated Testing
http://localhost:8000/api/docs/

OTP 
https://www.twilio.com/blog/enable-multiple-otp-methods-django
http://localhost:8000/api/profile/

Postman

Stripe

ML/Tensorflow
https://datagraphi.com/blog/post/2020/8/30/docker-guide-build-a-fully-production-ready-machine-learning-app-with-react-django-and-postgresql-on-docker
https://github.com/BobsProgrammingAcademy/image-classification-mnist/tree/master/frontend/src
https://developers.google.com/machine-learning/crash-course/generalization/peril-of-overfitting

Voice API
https://www.twilio.com/blog/drop-in-audio-chat-django-react-twilio-programmable-voice

Distributed Celery
https://betterprogramming.pub/distributed-task-queues-with-celery-rabbitmq-django-703c7857fc17

Layouts
https://getbootstrap.com/docs/4.0/examples/

Dockerized React
https://saasitive.com/tutorial/docker-compose-django-react-nginx-let-s-encrypt/

Environment Variables in DockerCompose
https://adamtheautomator.com/docker-compose-environment-variables/

# django-cors-headers==3.7.0
# PyJWT==2.0.1
# django-redis==4.12.1
# stripe==2.56.0
