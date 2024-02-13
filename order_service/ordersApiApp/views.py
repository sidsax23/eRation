from django.shortcuts import render
from .models import orders_table
from rest_framework.response import Response
import json
from rest_framework.decorators import api_view
from datetime import date
from django.core import serializers
from .models import transactions_table
from .models import items_table
from .models import shops_table
from .models import inventory_table
from .models import users_table
# Create your views here.

@api_view(['POST'])
def update_status(request):
    input = json.loads(request.body.decode('utf-8'))
    order_id = input['order_id']
    data = orders_table.objects.get(order_id=order_id)
    if(data.status=='Pending'):
        data.status='Completed'
        data.completion_date = date.today()
        data.save()
        return Response({"message":"Status Updated","status":1})
    else:
        return Response({"message": "Order already completed","status":0})



@api_view(['POST'])
def count_of_orders(request):
    input =json.loads(request.body.decode('utf-8'))
    customer_id = input['user_id']
    pending_orders_cnt = orders_table.objects.filter(customer_id=customer_id,status='Pending').count()
    completed_orders_cnt = orders_table.objects.filter(customer_id=customer_id,status='Completed').count()
    return Response({"Pending_orders_cnt":pending_orders_cnt,"Completed_orders_cnt":completed_orders_cnt})

@api_view(['POST'])
def orderlist(request):
    input = json.loads(request.body.decode('utf-8'))
    entered_id = input['user_id']
    userType = input['user_type']
    finalOrders = []
    if userType=='Customer':
        orders = orders_table.objects.filter(customer_id=entered_id).values()
    else:
        orders = orders_table.objects.filter(shopkeeper_id=entered_id).values()
    sno=1
    for order in orders:
        if userType=='Customer':
            name = shops_table.objects.filter(shopkeeper_id = order["shopkeeper_id_id"]).values()
            name = name[0]["name"] 
        else:
            name = users_table.objects.filter(user_id = order["customer_id_id"]).values()
            name = name[0]["name"] 
        data = transactions_table.objects.filter(order_id = order["order_id"]).values()
        items_name_array = []
        for entry in data:
            entry = entry["item_id_id"]
            item_name = items_table.objects.filter(item_id = entry).values()
            item_name = item_name[0]["name"]
            items_name_array.append(item_name)
        items_name = ""
        for item in items_name_array:
            items_name+=item+","
        items_name= items_name[:-1]
        finalOrder = {'id':order["order_id"],'sno':sno,'name':name,'items_name':items_name,'completion_date':order["completion_date"],'creation_date':order["creation_date"],'status':order["status"],'total_amount':order["total_amount"]}
        finalOrders.append(finalOrder)  
        sno+=1
    return Response({'orders': finalOrders})


@api_view(['POST'])
def last_order(request):
    input = json.loads(request.body.decode('utf-8'))
    user_id = input['user_id']
    response = orders_table.objects.filter(customer_id=user_id).order_by('order_id').values()
    if response.count() == 0:
        return Response({"Message":"No Record Found", "status":404})
    response = response[len(response)-1]
    data = transactions_table.objects.filter(order_id = response["order_id"]).values()
    items_name = []
    for entry in data:
        entry = entry["item_id_id"]
        name = items_table.objects.filter(item_id = entry).values()
        name = name[0]["name"]
        items_name.append(name)
    shop_name = shops_table.objects.filter(shopkeeper_id_id=response["shopkeeper_id_id"]).values()[0]['name']
    return Response({"response":response, "items_name":items_name,'shop_name':shop_name})


@api_view(['POST'])
def place_order(request):
    data = json.loads(request.body.decode('utf-8'))
    cust_id = data['cust_id']
    shop_id = data['shop_id']
    items = data['items']
    creation_date = date.today()
    amt=0
    for item in items:
        amt = amt + (item['quantity']*item['price'])
    obj = orders_table(customer_id_id = cust_id, shopkeeper_id_id = shop_id, total_amount = amt, status = 'Pending', creation_date = creation_date)
    obj.save()
    for item in items:
        transaction = transactions_table(order_id_id = obj.order_id, item_id_id = item['item_id'], quantity = item['quantity'])
        transaction.save()
        response = inventory_table.objects.get(shopkeeper_id =shop_id, item_id = item['item_id'])
        response.quantity = response.quantity - item['quantity']
        response.save()
    return Response({'message': 'Order placed successfully!'})
    