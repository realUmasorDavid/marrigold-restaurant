from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Menu, Order, CartItem
from .serializers import MenuSerializer, OrderSerializer, CartItemSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from django.http import HttpResponse
from .utils import lock_file

def my_view(request):
    with open('example.txt', 'w') as f:
        lock_file(f)
        # Perform file operations
        f.write('Some data')
    return HttpResponse('File operation completed')



# Create your views here.

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        cart_items = request.data.get('items')
        for cart_item in cart_items:
            menu = Menu.objects.get(id=cart_item['menu'])
            quantity = cart_item['quantity']
            CartItem.objects.create(menu=menu, quantity=quantity, order=order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        cart_items = request.data.get('items')
        if cart_items:
            instance.cart_items.all().delete()
            for cart_item in cart_items:
                menu = Menu.objects.get(id=cart_item['menu'])
                quantity = cart_item['quantity']
                CartItem.objects.create(menu=menu, quantity=quantity, order=order)
        return Response(serializer.data)
    
class SignupViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def signup(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')

        print(f"Received data: email={email}, username={username}, password={password}")

        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

