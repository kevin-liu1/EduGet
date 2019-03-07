
# Before you do anything Django related

	source wiseturnenv/bin/activate

## Run Server

	python manage.py runserver

## Install packages from requirements

	pip install -r requirements.txt

## Make Migarations and Migrate
When there has been an update to the models

	python manage.py makemigrations
	python manage.py migrate

## Load Test Data

	python manage.py loaddata testdata.json
