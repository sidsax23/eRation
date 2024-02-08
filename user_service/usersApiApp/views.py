from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import users_table

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
        return Response({"message":user[0]["type"]+" Logged In!"})
    else:
        return Response({"message":"User not found!"})