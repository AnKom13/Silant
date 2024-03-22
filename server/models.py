from django.db import models

from django.db import models
from django.contrib.auth.models import User
#Согласно ТЗ должна обязательно присутствовать таблица Сервисная компания, но ничего не сказано о других ролях (Покупатель, Менеджер)
#Поэтому для единого подхода создам таблицы Покупатель, Менеджер и Сервисная компания (по единой схеме)
#Схема регистрации нового пользователя: 1) админ создает нового пользователя (лог, пароль), 2) вносит его в одну из таблиц
#админа можно внести во все



#Т.к. в процессе деятельности справочники могут изменяться (добавлятся новые позиции, устаревать)
#Простое удаление устаревшей позиции (напр. какая-то модель больше не выпускается), может создать массу проблем с "архивными данными"
#Например: удалили модель, открыли данные о машине до удалении, а в поле модель пусто
#Поэтому ввожу поле relevance(актуальность), если модель устарела устанавливаем ей флаг false
#При заполнении формы (для новых моделей) указываем фильтр по этому полю, что бы при вводе устаревшие значения не мешали
#Можно сделать так: Если модель устарела, то в названии добавим значение (напр. (устар.))
#Вариант с доп. полем позволяте реализовать оба варианта или их комбинацию
#БУДУ ИСПОЛЬЗОВАТЬ ЕГО (подход) ВО ВСЕХ СПРАВОЧНИКАХ    
class ModelMachine(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True, help_text='Наименование')    
    description = models.TextField('Описание', unique=True, help_text='Описание')      
    relevance = models.BooleanField(default=True)

    def __str__(self):
      return f"{self.name}"  
    
    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'       

class ModelEngine(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True, help_text='Наименование')    
    description = models.TextField('Описание', unique=True, help_text='Описание')     
    relevance = models.BooleanField(default=True)

    def __str__(self):
      return f'{self.name}'   
      

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'    

class ModelTransmission(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True, help_text='Наименование')    
    description = models.TextField('Описание', unique=True, help_text='Описание') 
    relevance = models.BooleanField(default=True)

    def __str__(self):
      return f"{self.name}"     

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссии'    

class ModelDrivingBridge(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True, help_text='Наименование')    
    description = models.TextField('Описание', unique=True, help_text='Описание')    
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}" 

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущего моста'    

class ModelControlledBridge(models.Model):
    name = models.CharField('Наименование', max_length=100, unique=True, help_text='Наименование')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}"     

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемого моста'  

class ServiceCompany(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    login = models.OneToOneField(User, verbose_name='Логин', on_delete=models.SET_NULL, null=True, blank=True, help_text='Логин')
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}" 
  
    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'  

class Client(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', help_text='Описание')

    login = models.OneToOneField(User, verbose_name='Логин', on_delete=models.SET_NULL, null=True, blank=True, help_text='Лог_ин')
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}" 
    
    class Meta:
        verbose_name = 'Покупатель'
        verbose_name_plural = 'Покупатели'  
  
class Manager(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    login = models.OneToOneField(User, verbose_name='Логин', on_delete=models.SET_NULL, null=True, blank=True, help_text='Логин')
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}"

    class Meta:
        verbose_name = 'Менеджер'
        verbose_name_plural = 'Менеджеры'   

 
class TypeTechnicalService(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    relevance = models.BooleanField(default=True)

    def __str__(self):
      return f"{self.name}"

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'       

class NodeRefusal(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    relevance = models.BooleanField(default=True)

    def __str__(self):
      return f"{self.name}"     

    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узлы отказа'
        
class RecoveryMethod(models.Model):
    name = models.CharField('Название', max_length=100, unique=True, help_text='Название')    
    description = models.TextField('Описание', unique=True, help_text='Описание')
    relevance = models.BooleanField(default=True)
    
    def __str__(self):
      return f"{self.name}"
     
    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'      
    
class Machine(models.Model):
    factoryNumMachine = models.CharField('Заводской номер машины',max_length=100, unique=True, help_text='Заводской номер машины')
    modelMachine = models.ForeignKey(ModelMachine, verbose_name='Модель техники', on_delete = models.CASCADE)
    modelEngine = models.ForeignKey(ModelEngine, verbose_name='Модель двигателя', on_delete =models.CASCADE, help_text='Модель двигателя')
    factoryNumEngine = models.CharField('Заводской номер двигателя', max_length=100, unique=True, help_text='Заводской номер двигателя')
    modelTransmission = models.ForeignKey(ModelTransmission, verbose_name='Модель трансмиссии', on_delete =models.CASCADE, help_text='Модель трансмиссии')
    factoryNumTransmission = models.CharField('Заводской номер трансмиссии', max_length=100, unique=True, help_text='Заводской номер трансмиссии')
    modelDrivingBridge = models.ForeignKey(ModelDrivingBridge, verbose_name='Модель ведущего моста', on_delete =models.CASCADE, help_text='Модель ведущего моста')
    factoryNumDrivingBridge = models.CharField('Заводской номер ведущего моста', max_length=100, unique=True, help_text='Заводской номер ведущего моста')
    modelControlledBridge = models.ForeignKey(ModelControlledBridge, verbose_name='Модель управляемого моста', on_delete =models.CASCADE, help_text='Модель управляемого моста')
    factoryNumControlledBridge = models.CharField('Заводской номер управляемого моста', max_length=100, unique=True, help_text='Заводской номер управляемого моста')
    deliveryAgreementData = models.CharField('Договор поставки  (Номер и  дата)', max_length=100, help_text='Договор поставки  (Номер и  дата)')
    shipmentDate = models.DateField('Дата отгрузки с завода', max_length=100, help_text='Дата отгрузки с завода') 
    reciver = models.CharField('Грузополучатель  (конечный потребитель)', max_length=100, help_text='Грузополучатель  (конечный потребитель)') #??
    deliveryAddress = models.CharField('Адрес доставки', max_length=100, help_text='Адрес доставки')
    equipment = models.CharField('Комплектация (доп. опции)', max_length=100, help_text='Комплектация (доп. опции)')
    client = models.ForeignKey('Client', verbose_name='Клиент', null=True, blank=True, on_delete=models.CASCADE, help_text='Клиент')    
    serviceCompany = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete =models.CASCADE, help_text='Сервисная компания (при покупке)')
    
    def __str__(self):
      return f"{self.factoryNumMachine}"   

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'  

class TechnicalService(models.Model):
    factoryNumMachine = models.ForeignKey(Machine, verbose_name='Заводской номер машины', on_delete =models.CASCADE, help_text='Заводской номер машины')
    typeTechnicalService = models.ForeignKey(TypeTechnicalService, verbose_name='Вид ТО', on_delete =models.CASCADE, help_text='Вид ТО')    
    technicalServiceDate = models.DateField('Дата ТО', max_length=100, help_text='Дата ТО')
    operatingHours = models.PositiveIntegerField('Наработка, м/час', help_text='Наработка, м/час')
    orderNum = models.CharField('Номер заказ-наряда', max_length=100, unique=True, help_text='Номер заказ-наряда') 
    orderDate = models.DateField('Дата заказ-наряда', help_text='Дата заказ-наряда') 
    serviceCompany = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete =models.CASCADE, help_text='Сервисная компания')
    
    def __str__(self):
      return f"{self.factoryNumMachine}-->{self.typeTechnicalService}" 
    
    class Meta:
        verbose_name = 'Тех. обслуживание'
        verbose_name_plural = 'Тех. обслуживание'

class Complaint(models.Model):
    factoryNumMachine = models.ForeignKey(Machine, verbose_name='Заводской номер машины', on_delete =models.CASCADE, help_text='Заводской номер машины')
    refusalDate = models.DateField('Дата отказа',help_text='Дата отказа')
    operatingHours = models.PositiveIntegerField('Наработка, м/час',help_text='Наработка, м/час')
    nodeRefusal = models.ForeignKey(NodeRefusal, verbose_name='Узел отказа', on_delete =models.CASCADE, help_text='Узел отказа')
    descriptionRefusal = models.TextField('Описание отказа',help_text='Описание отказа')    
    recoveryMethod = models.ForeignKey(RecoveryMethod, verbose_name='Способ восстановления', on_delete =models.CASCADE, help_text='Способ восстановления')
    sparePartsUsed = models.TextField('Используемые зап. части', help_text='Используемые зап. части', blank=True)
    recoveryDate = models.DateField('Дата восстановления', help_text='Дата восстановления')
    downtime = models.PositiveIntegerField('Время простоя в днях', blank=True, null=True, editable=False, help_text='Время простоя в днях')            
    serviceCompany = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete =models.CASCADE, help_text='Сервисная компания')    


    def save(self, *args, **kwargs):
        self.downtime = (self.recoveryDate - self.refusalDate).days
        super(Complaint, self).save(*args, **kwargs)

    def __str__(self):
      return f"{self.factoryNumMachine}-->{self.nodeRefusal}-->{self.refusalDate}-->{self.serviceCompany}" 
 
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
        
        