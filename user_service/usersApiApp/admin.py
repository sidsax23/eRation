from django.contrib import admin

# Register your models here.

# Register your models here.
from .models import users_table
admin.site.register(users_table)

from .models import orders_table
admin.site.register(orders_table)
from .models import items_table
admin.site.register(items_table)
from .models import transactions_table
admin.site.register(transactions_table)
from .models import feedback_table
admin.site.register(feedback_table)
from .models import shops_table
admin.site.register(shops_table)
from .models import inventory_table
admin.site.register(inventory_table)