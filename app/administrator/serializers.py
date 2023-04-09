from rest_framework import serializers

from core.models import Product, Category#, Link, OrderItem, Order


class ProductSerializer(serializers.ModelSerializer):
   # category = CategorySerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'imageUrl'
        ]

# https://stackoverflow.com/questions/28532420/django-rest-framework-keeps-returning-error-on-nested-relationship
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            'id', 'title', 'category_product'
        ]


class CategoryTitleSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, required=False)
    class Meta:
        model = Category
        fields = ['title', 'products']






# class LinkSerializer(serializers.ModelSerializer):
#     orders = serializers.SerializerMethodField('get_orders')

#     class Meta:
#         model = Link
#         fields = '__all__'

# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = '__all__'


# class OrderSerializer(serializers.ModelSerializer):
#     order_items = OrderItemSerializer(many=True)
#     total = serializers.SerializerMethodField('get_total')

#     def get_total(self, obj):
#         items = OrderItem.objects.filter(order_id=obj.id)
#         return sum((o.price * o.quantity) for o in items)

#     class Meta:
#         model = Order
#         fields = '__all__'