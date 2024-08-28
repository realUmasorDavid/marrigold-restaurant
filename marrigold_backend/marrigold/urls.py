from django.urls import include, path
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from .views import MenuViewSet, OrderViewSet, SignupViewSet, LoginViewSet

router = DefaultRouter()
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'login', LoginViewSet, basename='login')

urlpatterns = [
    path('', include(router.urls)),
]