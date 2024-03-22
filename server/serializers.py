from rest_framework import serializers
from .models import Machine, Manager, Client, ServiceCompany

from .models import ModelMachine, ModelEngine, ModelControlledBridge, ModelDrivingBridge, ModelTransmission, RecoveryMethod, NodeRefusal
from .models import TechnicalService, TypeTechnicalService, Complaint
from django.contrib.auth.models import User 

class MachineSerializer(serializers.ModelSerializer):
    modelMachine = serializers.StringRelatedField()
    modelEngine = serializers.StringRelatedField()
    modelTransmission = serializers.StringRelatedField()
    modelDrivingBridge = serializers.StringRelatedField()
    modelControlledBridge = serializers.StringRelatedField()
    client = serializers.StringRelatedField()
    serviceCompany = serializers.StringRelatedField()

    class Meta:
        model = Machine
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    client = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    manager = serializers.SerializerMethodField()

    def get_client(self, obj):
        return Client.objects.filter(login=obj).exists()

    def get_company(self, obj):
        return ServiceCompany.objects.filter(login=obj).exists()

    def get_manager(self, obj):
        return Manager.objects.filter(login=obj).exists()

    class Meta:
        model = User
        fields = ['username', 'client', 'company', 'manager']
     

class MachineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'

class UnauthenticatedMachineSerializer(MachineSerializer):    
    modelMachine = serializers.StringRelatedField()
    modelEngine = serializers.StringRelatedField()
    modelTransmission = serializers.StringRelatedField()
    modelDrivingBridge = serializers.StringRelatedField()
    modelControlledBridge = serializers.StringRelatedField()

    class Meta:
        model = Machine
        
        fields = ('factoryNumMachine',
                  'modelMachine',
                  'modelEngine',
                  'factoryNumEngine',
                  'modelTransmission',
                  'factoryNumTransmission',
                  'modelDrivingBridge',
                  'factoryNumDrivingBridge',
                  'modelControlledBridge',
                  'factoryNumControlledBridge')        
        
class ModelMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelMachine
        fields = '__all__'   

class ModelEngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelEngine
        fields = '__all__'

class ModelTransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelTransmission
        fields = '__all__'

class ModelDrivingBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelDrivingBridge
        fields = '__all__'

class ModelControlledBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelControlledBridge
        fields = '__all__'        

class TypeTechnicalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeTechnicalService
        fields = '__all__'

class TechnicalServiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalService
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            service_company = ServiceCompany.objects.get(login=user)
        except ServiceCompany.DoesNotExist:
            return TechnicalService.objects.create(**validated_data)
        validated_data['serviceCompany'] = service_company
        return TechnicalService.objects.create(**validated_data)
        
class TechnicalServiceSerializer(TechnicalServiceCreateSerializer):
    factoryNumMachine = serializers.StringRelatedField()
    typeTechnicalService = serializers.StringRelatedField()
    serviceCompany = serializers.StringRelatedField()
 
class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = '__all__'     

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'  
        
class NodeRefusalSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeRefusal
        fields = '__all__'   
        
class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'

class ComplaintCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            service_company = ServiceCompany.objects.get(login=user)
        except ServiceCompany.DoesNotExist:
            return Complaint.objects.create(**validated_data)
        validated_data['serviceCompany'] = service_company
        return Complaint.objects.create(**validated_data)

class ComplaintSerializer(ComplaintCreateSerializer):
    nodeRefusal = serializers.StringRelatedField()
    recoveryMethod = serializers.StringRelatedField()
    factoryNumMachine = serializers.StringRelatedField()
    serviceCompany = serializers.StringRelatedField()

             