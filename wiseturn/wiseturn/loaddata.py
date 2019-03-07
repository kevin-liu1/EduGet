import json

from wiseturn.models import Institution, Program
from urllib.parse import urlparse
import requests
from django.core.files.base import ContentFile

def listget(list, index, default):
    try:
        return list[index]
    except:
        return default

def run():
    with open('data.json') as f:
        d = json.loads(f.read())



    for k, v in d.items():
        institution, created = Institution.objects.get_or_create(
            slug = v['data']['attributes']['slug'],
            defaults = {
            "name" : v['data']['attributes']['name'],
            "dli_number" : v['data']['attributes'].get('dlin', ""),
            "founded" : v['data']['attributes']['founded_year'],
            "type" : v['data']['attributes']['establishment_type'],

            "description" : v['data']['attributes']['description'],
            
            "city" : v['data']['attributes']['address']['city'],
            "country" : v['data']['attributes']['address']['country'],
            "postal" : v['data']['attributes']['address']['postal'] or "",
            "province" : v['data']['attributes']['address']['province'],
            "street" : v['data']['attributes']['address']['street'],

            "cost_of_living" : v['data']['attributes']['living_cost'],

            "latitude" : v['data']['attributes']['geo_location']['latitude'],
            "longitude" : v['data']['attributes']['geo_location']['longitude']
            }
        )
        if not institution.logo:
            print("DOWNLOADING IMAGE FOR {}".format(institution.name))
            img_url = v['data']['attributes']['logo_path']['original']
            img_name = urlparse(img_url).path.split('/')[-1]

            response = requests.get(img_url)
            if response.status_code == 200:
                institution.logo.save(img_name, ContentFile(response.content), save=True)

        for program  in v['programs']:
            program, created = Program.objects.get_or_create(
                slug = program['attributes']['slug'],
                institution = institution,
                defaults = {
                    "name" : program['attributes']['name'],
                    "description" : program['attributes']['description'],
                    "tuition" : program['attributes']['tuition'],

                    "level" : program['attributes']['level_text'],
                    "discipline" : listget(program['attributes']['categories'], 0, {'name': ''})['name'],
                    "application_fee" : program['attributes']['application_fee'],
                }
            )