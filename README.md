# PROYECTO TEAMTASKS

Esta aplicación se basa en tener tus listas de tareas/recordatorios y poder organizarlas por categorías. Dichas tareas puedes compartirlas con más usuarios en el cual pueden participar.

## DIAGRAMAS

Explore el diagrama de casos de uso, el diagrama entidad-relación, el diagrama de clases y el diagrama relacional que aparecen a continuación:

### DIAGRAMA RELACIONAL

User(**email**,name,password)  
Task(**ID**,title,description,task_image)  
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

## ENLACE FIGMA

Aqui esta el enlace al mockup del proyecto en figma.
https://www.figma.com/file/GxKQPAY7v7WyOuNTAJrT1H/TeamTask?type=design&node-id=0%3A1&mode=design&t=twyyncxV7omc5vg3-1
