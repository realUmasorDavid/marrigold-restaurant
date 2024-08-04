from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import MenuViewSet, OrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'orderitems', OrderItemViewSet, basename='orderitem')

urlpatterns = [
    path('', include(router.urls)),
]