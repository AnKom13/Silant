#from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, status
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from rest_framework.views import APIView
from .models import Machine, TechnicalService, Complaint, ModelMachine, ModelTransmission, ModelControlledBridge
from .models import TypeTechnicalService

from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

from .permissions import *
from .serializers import *
from .filters import *

# Create your views here.
class MachineListView(viewsets.ModelViewSet):
    queryset = Machine.objects.all().order_by('-shipmentDate')
    serializer_class = MachineSerializer
    permission_classes = [MachinePermissions]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_class = MachineFilter
    search_fields = ['factoryNumMachine']

    def get_queryset(self):
        if self.request.user.is_authenticated:
             if Client.objects.filter(login=self.request.user).exists():
                 user = self.request.user
                 queryset = super().get_queryset().filter(client__login=user)
                 return queryset     # Клиенты видят только свои машины

    def get_serializer_class(self):
         if self.request.user.is_authenticated:
             if self.action == 'create':
                 return MachineCreateSerializer
             return super().get_serializer_class()
         else:
             return MachineSerializer  
         
class TechnicalServiceView(viewsets.ModelViewSet):
    queryset = TechnicalService.objects.all().order_by('-technicalServiceDate')
    serializer_class = TechnicalServiceSerializer 
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TechnicalServiceFilter

    def get_queryset(self):
        if Client.objects.filter(login=self.request.user).exists():
            user = self.request.user
            queryset = super().get_queryset().filter(machine__client__login=user)
            print(queryset)
            return queryset     # Клиетны видят только ТО своих машин
        elif ServiceCompany.objects.filter(login=self.request.user).exists():
            user = self.request.user    # Сервисные компании видят только ТО выполненые ими
            queryset = super().get_queryset().filter(serviceCompany__serviceCompany=user)
            return queryset
        elif Manager.objects.filter(login=self.request.user).exists():
            queryset = TechnicalService.objects.all()
            return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return TechnicalServiceCreateSerializer
        return super().get_serializer_class()         
    
class GetUserView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get('access')
            decoded_token = AccessToken(token)
            user_id = decoded_token['user_id']
            User = get_user_model()
            user = User.objects.get(pk=user_id)
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class ModelMachineView(viewsets.ModelViewSet):
    queryset = ModelMachine.objects.all()
    serializer_class = ModelMachineSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)        
    
class ModelEngineView(viewsets.ModelViewSet):
    queryset = ModelEngine.objects.all()
    serializer_class = ModelEngineSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ModelTransmissionView(viewsets.ModelViewSet):
    queryset = ModelTransmission.objects.all()
    serializer_class = ModelTransmissionSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ModelDrivingBridgeView(viewsets.ModelViewSet):
    queryset = ModelDrivingBridge.objects.all()
    serializer_class = ModelDrivingBridgeSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class ModelControlledBridgeView(viewsets.ModelViewSet):
    queryset = ModelControlledBridge.objects.all()
    serializer_class = ModelControlledBridgeSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class TypeTechnicalServiceView(viewsets.ModelViewSet):
    queryset = TypeTechnicalService.objects.all()
    serializer_class = TypeTechnicalServiceSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class ServiceCompanyView(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    
    def single(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)    

class MachineDetailView(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    
    def single(self, request, *args, **kwargs):
        num = self.kwargs.get('factoryNumMachine')
        queryset = self.get_queryset().filter(factoryNumMachine=num)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data) 

    
class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    def single(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)         
    
class NodeRefusalView(viewsets.ModelViewSet):
    queryset = NodeRefusal.objects.all()
    serializer_class = NodeRefusalSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)    

class RecoveryMethodView(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [ListsPermissions]
    lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = self.kwargs.get('name')
        queryset = self.get_queryset().filter(name=name)
        instance = queryset.first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)    
    
class ComplaintListView(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('-refusalDate')
    serializer_class = ComplaintSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ComplaintFilter    
    permission_classes = [ComplaintPermissions]
    lookup_field = 'name'


    def get_queryset(self):
        if self.request.user.is_authenticated:
            if Client.objects.filter(login=self.request.user).exists():
                user = self.request.user
                queryset = super().get_queryset().filter(factoryNumMachine__client__login=user)
                return queryset     # Клиетны видят только рекламации связанные с их машинами
            if ServiceCompany.objects.filter(login=self.request.user).exists():
                user = self.request.user
                queryset = super().get_queryset().filter(serviceCompany__login=user)
                return queryset     # Сервисные компании видят только свои рекламации
            if Manager.objects.filter(login=self.request.user).exists():            
                 queryset = Complaint.objects.all()
                 return queryset #менеджер видит все

    def get_serializer_class(self):
        if self.action == 'create':
            return ComplaintCreateSerializer
        return super().get_serializer_class()
    
class TechnicalServiceListView(viewsets.ModelViewSet):
    queryset = TechnicalService.objects.all().order_by('-technicalServiceDate')
    serializer_class = TechnicalServiceSerializer 
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_class = TechnicalServiceFilter    
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'name'   

    def get_queryset(self):
        if self.request.user.is_authenticated:
             if Client.objects.filter(login=self.request.user).exists():
                 user = self.request.user
                 queryset = super().get_queryset().filter(factoryNumMachine__client__login=user)
                 return queryset     # Клиенты видят ТО своих машин
             if ServiceCompany.objects.filter(login=self.request.user).exists():
                 user = self.request.user
                 queryset = super().get_queryset().filter(serviceCompany__login=user)
                 return queryset     # сервисные компании  видят только свои ТО

    def get_serializer_class(self):
        if self.action == 'create':
            return TechnicalServiceCreateSerializer
        return super().get_serializer_class()
    