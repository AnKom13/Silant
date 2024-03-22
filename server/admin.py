from django.contrib import admin

# Register your models here.
from .models import Machine, ModelMachine, ModelEngine, ModelTransmission, \
    ModelDrivingBridge, ModelControlledBridge, ServiceCompany, TypeTechnicalService, \
        NodeRefusal, RecoveryMethod, TechnicalService, Complaint, Client, Manager
    

# Register your models here.
admin.site.register(Machine)
admin.site.register(ModelMachine)
admin.site.register(ModelEngine)
admin.site.register(ModelTransmission)
admin.site.register(ModelDrivingBridge)
admin.site.register(ModelControlledBridge)
admin.site.register(ServiceCompany)
admin.site.register(TypeTechnicalService)
admin.site.register(NodeRefusal)
admin.site.register(RecoveryMethod)
admin.site.register(TechnicalService)
admin.site.register(Complaint)
admin.site.register(Client)
admin.site.register(Manager)