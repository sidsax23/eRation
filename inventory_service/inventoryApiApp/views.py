from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import inventory_table
from .models import orders_table
from .models import items_table
from .models import transactions_table
from datetime import date

@api_view(['POST'])
def show_shop_stock(request):
    data = json.loads(request.body.decode('utf-8'))
    shop_id = data['shop_id']
    response = inventory_table.objects.filter(shopkeeper_id=shop_id).values()
    item_names = []
    for i in range (len(response)):
        if response[i]["quantity"] > 0:
            items = items_table.objects.filter(item_id = response[i]["item_id_id"]).values()[0]
            item_names.append(items)
    return Response({'shopItems': item_names})

