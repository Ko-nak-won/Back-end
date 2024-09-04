@ECHO OFF

:: Run the back-end
CD be
START python manage.py runserver

CD ..

:: Run the front-end
CD fe
START yarn run start