
# Before you do anything Django related

	source wiseturnenv/bin/activate

## Run Server

	python manage.py runserver

## Make Migarations and Migrate
When there has been an update to the models

	python manage.py makemigrations
	python manage.py migrate

## Load Test Data

	python manage.py loaddata testdata.json
