from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'menus', MenuViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
