from django.urls import path
from .views import MachineListView, GetUserView, ModelMachineView, ModelEngineView, ModelTransmissionView, ModelDrivingBridgeView, ModelControlledBridgeView
from .views import TechnicalServiceListView, TypeTechnicalServiceView, ServiceCompanyView, NodeRefusalView, RecoveryMethodView,ComplaintListView, ClientView
from .views import MachineDetailView

urlpatterns = [
    path('machine/', MachineListView.as_view({'get': 'list', 'post': 'create'})),

    path('technical-service/', TechnicalServiceListView.as_view({'get': 'list', 'post': 'create'})),
    path('reclamation/', ComplaintListView.as_view({'get': 'list', 'post': 'create'})),
    path('service-company/<str:name>', ServiceCompanyView.as_view({'get': 'single',})),
    path('service-company/', ServiceCompanyView.as_view({'get': 'list'})),
    path('client/<str:name>', ClientView.as_view({'get': 'single',})),
    path('client/', ClientView.as_view({'get': 'list', 'post': 'create'})),

    path('get-user', GetUserView.as_view()),
    
    path('machine-model/', ModelMachineView.as_view({'get': 'list', 'post': 'create'})),
    path('machine-model/<str:name>', ModelMachineView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    path('engine-model/', ModelEngineView.as_view({'get': 'list', 'post': 'create'})),
    path('engine-model/<str:name>', ModelEngineView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    path('transmission-model/', ModelTransmissionView.as_view({'get': 'list', 'post': 'create'})),
    path('transmission-model/<str:name>', ModelTransmissionView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    
    path('driving-bridge-model/', ModelDrivingBridgeView.as_view({'get': 'list', 'post': 'create'})),
    path('driving-bridge-model/<str:name>', ModelDrivingBridgeView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    
    path('controlled-bridge-model/', ModelControlledBridgeView.as_view({'get': 'list', 'post': 'create'})),
    path('controlled-bridge-model/<str:name>', ModelControlledBridgeView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    
    path('type-technical-service/<str:name>', TypeTechnicalServiceView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    path('type-technical-service/', TypeTechnicalServiceView.as_view({'get': 'list', 'post': 'create'})),
    
    path('node-refusal/', NodeRefusalView.as_view({'get': 'list', 'post': 'create'})),
    path('node-refusal/<str:name>', NodeRefusalView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),

    path('recovery-method/', RecoveryMethodView.as_view({'get': 'list', 'post': 'create'})),
    path('recovery-method/<str:name>', RecoveryMethodView.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'update',
        'delete': 'destroy'})),
    
]
