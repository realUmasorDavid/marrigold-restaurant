from rest_framework import serializers
from .models import Menu, Order, CartItem
import logging

logger = logging.getLogger(__name__)



class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'image', 'description', 'price', 'category']

  

class CartItemSerializer(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['menu', 'quantity']

    def get_menu(self, obj):
        menu = obj.menu
        return {
            'id': menu.id,
            'name': menu.name,
            'description': menu.description,
            'price': menu.price,
            'category': menu.category,
        }

    


class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cart_items')
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'total_price', 'created_at', 'status', 'items']

    def get_total_price(self, obj):
        return sum(item.quantity * item.menu.price for item in obj.cart_items.all())
    
    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        print("items_data:", items_data)
        total_price = sum(item_data['quantity'] * item_data['menu'].price for item_data in items_data)
        validated_data['total_price'] = total_price
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            print("item_data:", item_data)
            item_serializer = CartItemSerializer(data=item_data)
            if item_serializer.is_valid():
                item_serializer.save(order=order)
            else:
                print("Invalid CartItem data:", item_serializer.errors)
        return order



