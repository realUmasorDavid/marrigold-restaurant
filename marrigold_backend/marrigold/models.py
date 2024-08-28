from django.db import models

# Create your models here.


class Menu(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='menu_images/', default='../menu_images/20240308_122033.jpg')
    category = models.TextField(max_length=100)

    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.BigAutoField(primary_key=True)
    customer_name = models.CharField(max_length=100, default='Unknown')
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(null=True, blank=True, default=None, help_text="True if accepted, False otherwise")

    def get_items_display(self):
        return ', '.join([f"{item.quantity} x {item.menu.name}" for item in self.cart_items.all()])

    get_items_display.short_description = 'Items'

    def __str__(self):
        return f"Order {self.id}"

    
class CartItem(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='cart_items')

    def __str__(self):
        return f"{self.quantity} x {self.menu.name}"


