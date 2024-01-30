# PROYECTO TEAMTASKS

Esta aplicación se basa en tener tus listas de tareas/recordatorios y poder organizarlas por categorías. Dichas tareas puedes compartirlas con más usuarios en el cual pueden participar.

## DIAGRAMAS

Explore el diagrama de casos de uso, el diagrama entidad-relación, el diagrama de clases y el diagrama relacional que aparecen a continuación:

### DIAGRAMA RELACIONAL

User(**email**,name,password)  
Task(**ID**,title,description)  
UserTask(**user_email**,**task_id**,type*of_access)
Notification(**ID**,title,description)  
TaskNotification(**task_id**,**notification_id**)
Tags(**ID**,title)  
TagTask(**tag_id**,**task_id**)
Configurations(**ID**,night_mode,list_mode,user_image,\_user_email*)

### DIAGRAMA DE CLASES

![CLASS DIAGRAM](https://github.com/Aridane1/TeamTasks/blob/main/screenshots/class_diagram.PNG)

### DIAGRAMA DE CASO DE USO

![USE CASE DIAGRAM](https://github.com/Aridane1/TeamTasks/blob/main/screenshots/use_case_diagram.PNG)

### DIAGRAMA DE ENTIDAD RELACION

![USE CASE DIAGRAM](https://github.com/Aridane1/TeamTasks/blob/main/screenshots/relation_ship_diagram.PNG)
