from django.shortcuts import render

# Create your views here.
import stripe
from django.db import transaction
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import LinkSerializer
from core.models import Link, Order, Product, OrderItem
import decimal

from app.settings import DOMAIN, STRIPE_API_KEY
# from django.core.mail import send_mail

stripe.api_key = STRIPE_API_KEY


class LinkAPIView(APIView):

    def get(self, _, code=''):
        link = Link.objects.filter(code=code).first()
        serializer = LinkSerializer(link)
        return Response(serializer.data)

# /checkout/orders
class OrderAPIView(APIView):
    @transaction.atomic
    def post(self, request):
        print(' in orders ')
        data = request.data
        print(data)
        link = Link.objects.filter(code=data['code']).first()

        if not link:
            raise expections.APIExceptions('invalid code!')

        try:
            order = Order()
            order.code = link.code
            order.user_id = link.user.id
            order.ambassador_email = link.user.email
            order.first_name = data['first_name']
            order.last_name = data['last_name']
            order.email = data['email']
            order.address = data['address']
            order.country = data['country']
            order.city = data['city']
            order.zip = data['zip']
            order.save()

            line_items = []

            for item in data['products']:
                product = Product.objects.filter(pk=item['product_id']).first()
                quantity = decimal.Decimal(item['quantity'])

                order_item = OrderItem()
                order_item.order = order
                order_item.product_title = product.title
                order_item.price = product.price
                order_item.quantity = quantity
                order_item.ambassador_revenue = decimal.Decimal(.1) * product.price * quantity
                order_item.admin_revenue = decimal.Decimal(.9) * product.price * quantity
                # with transaction.atomic:
                order_item.save()

            stripe.api_key = STRIPE_API_KEY
            #print(STRIPE_API_KEY)
            print(stripe.api_key)
            source = stripe.checkout.Session.create(
                success_url='http://localhost:5000/success?course={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:5000/error',
                payment_method_types=['card'],
                mode='subscription',
                line_items = [
                    {
                        'quantity': 1,
                        'price': 'price_1MaIH5H418K4ULt8vQAyyvwv'
                    }
                ]
            )

            order.transaction_id = source['id']
            order.save()

            return Response(source)
        except Exception:
            transaction.rollback()

        return Response({'message': 'Error occurred'})


class OrderConfirmAPIView(APIView):
    def post(self, request):
        
        order = Order.objects.filter(transaction_id=request.data['source']).first()
        if not order:
            raise exceptions.APIException('Order not found!')

        order.complete = 1
        order.save()

        # Admin Email
        send_mail(
            subject='An Order has been completed',
            message='Order #' + str(order.id) + 'with a total of $' + str(order.admin_revenue) + ' has been completed!',
            from_email='from@email.com',
            recipient_list=['admin@admin.com']
        )

        send_mail(
            subject='An Order has been completed',
            message='You earned $' + str(order.ambassador_revenue) + ' from the link #' + order.code,
            from_email='from@email.com',
            recipient_list=[order.ambassador_email]
        )

        return Response({
            'message': 'success'
        })

# admin can create a product and price

# admin can edit a product

# admin can edit a price