

Linting
docker-compose run --rm app sh -c "flake8"

Testing
docker-compose run --rm app sh -c "python manage.py test"

docker-compose run --rm app sh -c "python manage.py startapp core"


docker-compose run --rm app sh  --rm app sh -c "python manage.py makemigrations"
docker-compose run --rm app sh  -c "python manage.py wait_for_db && python manage.py migrate"

ADMIN
docker-compse run --rm app sh -c "python manage.py createsuperuser"


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