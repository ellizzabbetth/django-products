from django.core.management import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
import time

from faker import Faker

from core.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        for _ in range(30):
            user = User.objects.create(
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.email(),
                password='',
               
            )
            user.set_password('admin')
            user.save()