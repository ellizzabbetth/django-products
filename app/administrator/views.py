from django.shortcuts import render

from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from common.authentication import JWTAuthentication
from core.models import User, Product, Category#, Link, Order
from common.serializers import UserSerializer
from .serializers import ProductSerializer, CategoryTitleSerializer#, LinkSerializer, OrderSerializer
from django.core.cache import cache
from rest_framework import status
from collections import defaultdict


# Create your views here.
class ProductGenericAPIView(
    generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin,
    mixins.UpdateModelMixin, mixins.DestroyModelMixin
):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    # queryset = Product.objects.all()
    # serializer_class = ProductSerializer

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)


        qs = Category.objects.all()
        cats_dict = CategoryTitleSerializer(qs, many=True).data     
        context = {
            # 'data': {

            # },
            'items': cats_dict
        }
        return Response(context, status=status.HTTP_200_OK)

    # def post(self, request):
    #     response = self.create(request)
    #     for key in cache.keys('*'):
    #         if 'products_frontend' in key:
    #             cache.delete(key)
    #     cache.delete('products_backend')
    #     return response

    # def put(self, request, pk=None):
    #     response = self.partial_update(request, pk)
    #     for key in cache.keys('*'):
    #         if 'products_frontend' in key:
    #             cache.delete(key)
    #     cache.delete('products_backend')
    #     return response

    # def delete(self, request, pk=None):
    #     response = self.destroy(request, pk)
    #     for key in cache.keys('*'):
    #         if 'products_frontend' in key:
    #             cache.delete(key)
    #     cache.delete('products_backend')
    #     return response