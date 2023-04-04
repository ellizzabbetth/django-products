
"""
Database models.
"""
from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default='')
    file_avatar = models.FileField(upload_to='file_avatar/', default='', null=True, blank=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_length=10, decimal_places=2, max_digits=5)
    imageUrl = models.CharField(max_length=255)
    category = models.ManyToManyField('Category', related_name='category_products', blank=True)

    def __unicode__(self):
        return self.name

    def __str__(self):
        return f'{self.id}: {self.name}'

category_choices = [
    ('hats', 'hats'),
    ('jackets', 'jackets'),
    ('mens', 'mens'),
    ('sneakers', 'sneakers'),
    ('womens', 'womens')
]

class Category(models.Model):
    title = models.CharField(choices=category_choices, max_length=40, null=True, blank=True, default='womens')

    def __unicode__(self):
        return self.title

    def __str__(self):
        return f'{self.id}: {self.title}'