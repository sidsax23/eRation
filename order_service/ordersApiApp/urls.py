from django.urls import path
from .views import *

urlpatterns = [
    path('updatestatus/',update_status),
    path('cnt_details/',count_of_orders),
    path('last_order/',last_order),
    path('list/', orderlist),
    path('place_order/', place_order, name='place_order'),
]