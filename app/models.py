# from django.db import models
# from django.contrib.auth.models import User

# class Customer(models.Model):
#     name = models.CharField(max_length=255)
#     code = models.CharField(max_length=50, unique=True)
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer")
    
#     class Meta:
#         db_table = "customer"
    
#     def __str__(self):
#         return self.name

# class Order(models.Model):
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
#     item = models.CharField(max_length=255)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     time = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         db_table = "order"
    
#     def __str__(self):
#         return f"{self.item} - {self.amount}"