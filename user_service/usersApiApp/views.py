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
    email=data['email']
    password=data['password']
    user = users_table.objects.filter(email=email,password=password).values()
    if user:
        return Response({"message":user[0]["type"]+" Logged In!"})
    else:
        return Response({"message":"User not found!"})