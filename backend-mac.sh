# ./backend-mac.sh
source wiseturn/wiseturnenv/bin/activate
neo4j start
python wiseturn/manage.py runserver
