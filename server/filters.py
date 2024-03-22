from django_filters import rest_framework as filters
from .models import Machine, TechnicalService, Complaint


class MachineFilter(filters.FilterSet):
    class Meta:
        model = Machine
        fields = ['modelMachine', 'modelEngine', 'modelTransmission', 'modelDrivingBridge', 'modelControlledBridge',] 

class TechnicalServiceFilter(filters.FilterSet):
    class Meta:
        model = TechnicalService
        fields = ['typeTechnicalService', 'factoryNumMachine', 'serviceCompany',]


class ComplaintFilter(filters.FilterSet):
    class Meta:
        model = Complaint
        fields = ['nodeRefusal', 'recoveryMethod', 'serviceCompany', 'factoryNumMachine',]
