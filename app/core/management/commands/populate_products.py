import json
from django.core.management.base import BaseCommand
from core.models import Category, Product

class Command(BaseCommand):
    # python manage.py populate_products path/to/file.json
    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str)

    json_file_path = "app/fixtures/shop-data.js"
    def handle(self, *args, **options):
         #with open(json_file, 'r') as j:
        with open(options['json_file']) as file:
            
            print('HERE')
            data_list = json.loads(file.read())
        # with open(options['json_file']) as f:
        #     data_list = json.load(f)
        print(data_list)
        for data in data_list:
            data['pk'] = data.pop('key')
           # Products.objects.get_or_create(pk=data['pk'], defaults=data)


# Bullk Create:  https://zerotobyte.com/using-django-bulk-create-and-bulk-update/
