"""
homeapp/urls.py
"""
from django.urls import path
from .views import *

urlpatterns = [
    path('show_shop_stock/', show_shop_stock, name='show_shop_stock'),

]