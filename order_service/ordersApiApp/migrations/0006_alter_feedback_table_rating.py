# Generated by Django 5.0.1 on 2024-02-14 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordersApiApp', '0005_alter_orders_table_completion_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback_table',
            name='rating',
            field=models.IntegerField(),
        ),
    ]
