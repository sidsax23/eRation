"""
homeapp/urls.py
"""
from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login),
    path('shop_view_feedback/', shop_view_feedback, name = 'shop_view_feedback' ),
    path('shop_details/', shop_details, name='shop_details'),
    path('post_feedback/', post_feedback, name='post_feedback'),
    path('pending_orders/', pending_orders, name='pending_orders'),
    path('shops/', shoplist),
    path('details/',fetch_details, name='fetch_details'),
]