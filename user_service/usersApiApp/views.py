from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import users_table
from .models import feedback_table
from .models import inventory_table
from .models import orders_table
from .models import shops_table
from .models import items_table
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from statistics import mean

# Create your views here.

@api_view(['POST'])
def login(request):
    #Decoding binary data to json, then covnerting from json to python dictionary
    data = json.loads(request.body.decode('utf-8'))
    user_id=data['userId']
    password=data['password']
    userType=data['type']
    print(user_id,password,userType)
    user = users_table.objects.filter(user_id=user_id,password=password,type=userType).values()
    if user:
        return Response({"userId":user_id, "status":200},status=200)
    else:
        return Response({"message":"User not found!","status":404})
    
@api_view(['POST'])
def shop_view_feedback(request):
    data = json.loads(request.body.decode('utf-8'))
    shop_id = data['shop_id']
    feedback_details = feedback_table.objects.filter(shopkeeper_id = shop_id).values()
    feedbacks = []
    for feedback in feedback_details:
        customer_name = users_table.objects.filter(user_id = feedback["customer_id_id"]).values()[0]["name"]
        feedbacks.append({'customer_name':customer_name,'rating':feedback["rating"],'comments':feedback["comments"]})
    return Response({'feedbacks':feedbacks})

@api_view(['POST'])
def shop_details(request):
    data = json.loads(request.body.decode('utf-8'))
    shop_id = data['shop_id']
    
    shop_details = {}
    shop_name = None
    shops = shops_table.objects.filter(shopkeeper_id = shop_id).values().count()
    if shops>0:
        shop_details=shops_table.objects.filter(shopkeeper_id = shop_id).values()[0] 
        shop_name = shop_details['name']
    
    reviewCount = 0
    feedbacks = feedback_table.objects.filter(shopkeeper_id = shop_id).values()
    ratings=[]
    for x in feedbacks:
        ratings.append(x["rating"])
        reviewCount+=1
    rating = 0
    if len(ratings)>0:
        rating=mean(ratings)
    
    pendingOrdersCount = orders_table.objects.filter(shopkeeper_id=shop_id,status='Pending').count()
    completed_orders_cnt = orders_table.objects.filter(shopkeeper_id=shop_id,status='Completed').count()
    totalOrdersCount = pendingOrdersCount+completed_orders_cnt
    
    items = []
    sno=1
    inventory_details = inventory_table.objects.filter(shopkeeper_id = shop_id).values()
    for inventory in inventory_details:
        item_id = inventory["item_id_id"]
        item_details = items_table.objects.filter(item_id = item_id).values()[0]
        item_name = item_details['name']
        selling_price = item_details['price']
        quantity = inventory['quantity']
        items.append({'sno':sno,'item_name':item_name,'quantity':quantity,'selling_price':selling_price})
        sno+=1
    
    shop = { 'name': shop_name,"rating":rating,'reviewCount':reviewCount, 'pendingOrdersCount':pendingOrdersCount,'totalOrdersCount':totalOrdersCount}
    return Response({'shop': shop, 'items':items})

@api_view(['POST'])
def post_feedback(request):
    data = json.loads(request.body.decode('utf-8'))
    customer_id = data["customer_id"]
    shopkeeper_id = data['shopkeeper_id']
    orders_count = orders_table.objects.filter(shopkeeper_id = shopkeeper_id, customer_id=customer_id).count()
    if orders_count==0:
        return Response({'message': 'Please place at least one order to give feedback.', "status":404})
    rating =  data["rating"]
    comments = data["comments"]
    response = feedback_table(customer_id_id = customer_id, shopkeeper_id_id = shopkeeper_id, rating = rating, comments = comments)
    response.save()
    return Response({'message': 'Feedback added successfully!', "status":200})

@api_view(['GET'])
def pending_orders(request):
    data = json.loads(request.body.decode('utf-8'))
    shop_id = data["shop_id"]
    response = orders_table.objects.filter(shopkeeper_id = shop_id)
    serealized_response = serializers.serialize('json', response, fields=('order_id', 'customer_id', 'status', 'creation_date'))
    return Response({'serealized_response': serealized_response, 'shop_id': shop_id})


@api_view(['POST'])
def shoplist(request):
    data = shops_table.objects.all().values()
    valid_shops = []
    for shop in data:
        shop_id = shop["shopkeeper_id_id"]
        avl = inventory_table.objects.filter(shopkeeper_id = shop_id)
        if avl.count() == 0:
            pass
        else:
            avl = avl.values()
            for item in avl:
                if item["quantity"]>0:
                    valid_shops.append(item["shopkeeper_id_id"])
                    break
                
    shops = []
    for shop in valid_shops:
        shop_name = shops_table.objects.filter(shopkeeper_id = shop).values()
        shop_name = shop_name[0]["name"]
        feedbacks = feedback_table.objects.filter(shopkeeper_id = shop).values()
        ratings=[]
        for x in feedbacks:
            ratings.append(x["rating"])
        rating = 0
        if len(ratings)>0:
            rating=mean(ratings)
        shops.append({"shop_id":shop,"name":shop_name,"rating":rating})
    return Response({"shops": shops},status=200)

@api_view(['POST'])
def fetch_details(request):
    data = json.loads(request.body.decode('utf-8'))
    user_id = data["user_id"]
    response = users_table.objects.filter(user_id = user_id)
    serealized_response = serializers.serialize('json', response, fields=('name', 'email', 'mobile','address','type'))
    return Response({'serealized_response': serealized_response})
