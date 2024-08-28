from django.contrib import admin
from .models import Order, CartItem, Menu

# Register your models here.

class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')
    search_fields = ('name', 'category')
    list_filter = ('category', 'price')

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'get_items_display', 'total_price', 'created_at', 'status')
    search_fields = ('id', 'customer_name')
    list_filter = ('created_at', 'status')
    inlines = [CartItemInline]

admin.site.register(Order, OrderAdmin)
admin.site.register(CartItem)
admin.site.register(Menu)