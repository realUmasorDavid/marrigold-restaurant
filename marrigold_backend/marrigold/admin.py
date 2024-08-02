from django.contrib import admin
from .models import Menu, Order

# Register your models here.

class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')
    search_fields = ('name', 'category')
    list_filter = ('category', 'price')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'get_items_display', 'total_price', 'created_at', 'status')
    search_fields = ('id',)
    list_filter = ('created_at', 'status')
    readonly_fields = ('items', 'total_price', 'created_at')

admin.site.register(Menu, MenuAdmin)
admin.site.register(Order, OrderAdmin)