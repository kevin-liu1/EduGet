![enter image description here](https://i.imgur.com/JXxPX4k.png)

Eudget is a networking platform that aids its users by finding university programs that match their specific interests. Additionally, Eduget users will have personalized profiles that allow them to be matched with or get searched by potential job opportunities.

# Installation
### Acquire source files

    git clone https://github.com/jamesmili/Capstone.git

### Set up Django environment
install python and virtual env

    sudo apt-get update
    sudo apt-get install python3-pip python3-dev
    pip3 install virtualenv

activate virtual environment

    cd wiseturn
    source wiseturnenv/bin/activate

install python packages

    pip install -r requirements.txt

### Set up React environment

    sudo apt-get update
    sudo apt-get install nodejs npm


# Running and Building

### Running Backend Server

	python manage.py runserver

### Install packages from requirements

	pip install -r requirements.txt

### Make Migrations and Migrate
When there has been an update to the models

	python manage.py makemigrations
	python manage.py migrate

### Load Test Data

	python manage.py loaddata testdata.json

### Run the React app in the development mode

    npm start

### Builds the React app for production
	npm run build
