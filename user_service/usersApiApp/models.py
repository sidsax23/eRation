from django.db import models

# Create your models here.

# -----------
# Create table
# -----------
# step-1. define the model in models.py
# step-2. add entry in admin.py so that it will appear in admin page
# Step-3: python manage.py makemigrations
# Step-4: python manage.py migrate
##########################

user_types=(('Customer','Customer'),('Shopkeeper','Shopkeeper'))
order_status_types=(('Pending','Pending'),('Completed','Completed'))

# FROM USER SERVICE :-
class users_table(models.Model):
    user_id = models.AutoField(primary_key=True) # AutoField - auto increment
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    mobile = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    type = models.CharField(max_length=100,choices=user_types)
    class Meta:
        db_table = 'users_table'


class orders_table(models.Model):
    order_id = models.AutoField(primary_key=True) # AutoField - auto increment
    customer_id = models.ForeignKey(users_table, on_delete=models.CASCADE, related_name='customer_orders', db_column="customer_id")
    shopkeeper_id = models.ForeignKey(users_table, on_delete=models.CASCADE, related_name='shopkeeper_orders',  db_column="shopkeeper_id")
    total_amount = models.FloatField()
    status = models.CharField(max_length=100,choices=order_status_types)
    
    class Meta:
        db_table = 'orders_table'
        

class items_table(models.Model):
    item_id = models.AutoField(primary_key=True) # AutoField - auto increment
    name = models.CharField(max_length=100)
    price = models.FloatField()
    
    class Meta:
        db_table = 'items_table'
        
        
class transactions_table(models.Model):
    transaction_id = models.AutoField(primary_key=True) # AutoField - auto increment
    order_id = models.ForeignKey(orders_table, on_delete=models.CASCADE, db_column="order_id")
    item_id = models.ForeignKey(items_table, on_delete=models.CASCADE, db_column="item_id")
    quantity = models.IntegerField()
    
    class Meta:
        db_table = 'transactions_table'
        
        
# FROM USER SERVICE :-
rating_choices = (('One',1),('Two',2),('Three',3),('Four',4),('Five',5))
class feedback_table(models.Model):
    feedback_id = models.AutoField(primary_key=True) # AutoField - auto increment
    customer_id = models.ForeignKey(users_table, on_delete=models.CASCADE, related_name='customer_feedback', db_column="customer_id")
    shopkeeper_id = models.ForeignKey(users_table, on_delete=models.CASCADE, related_name='shopkeeper_feedback',  db_column="shopkeeper_id")
    rating = models.IntegerField(choices=rating_choices)
    comments = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'feedback_table'
        

class shops_table(models.Model):
    shopkeeper_id = models.ForeignKey(users_table, on_delete=models.CASCADE, primary_key=True, db_column="shopkeeper_id")
    name = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'shops_table'
        

# FROM INVENTORY SERVICE
class inventory_table(models.Model):
    inventory_id = models.AutoField(primary_key=True) # AutoField - auto increment
    shopkeeper_id = models.ForeignKey(users_table, on_delete=models.CASCADE, db_column="shopkeeper_id")
    item_id = models.ForeignKey(items_table, on_delete=models.CASCADE, db_column="item_id")
    quantity = models.IntegerField()
    
    class Meta:
        db_table = 'inventory_table'