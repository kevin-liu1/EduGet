import json

from wiseturn.models import Institution

schools = {}

with open('rankings.json', 'r') as f:
    for s in json.loads(f.read())['data']:
        schools[s['name']] = s

def convert(string):
    return float(string.split("\u2013")[0].replace(",", "").replace("%", ""))

for institution in Institution.objects.all():
    if institution.name in schools:
        print("Updating {}".format(institution.name))
        s = schools[institution.name]
        Institution.objects.filter(pk=institution.pk).update(**{
            "scores_overall": convert(s['scores_overall']),
            "scores_overall_rank": convert(s['scores_overall_rank']) / 10,
            "scores_teaching": convert(s['scores_teaching']),
            "scores_teaching_rank": convert(s['scores_teaching_rank']),
            "scores_research": convert(s['scores_research']),
            "scores_research_rank": convert(s['scores_research_rank']),
            "scores_citations": convert(s['scores_citations']),
            "scores_citations_rank": convert(s['scores_citations_rank']),
            "scores_industry_income": convert(s['scores_industry_income']),
            "scores_industry_income_rank": convert(s['scores_industry_income_rank']),
            "scores_international_outlook": convert(s['scores_international_outlook']),
            "scores_international_outlook_rank": convert(s['scores_international_outlook_rank']),
            "stats_number_students": convert(s['stats_number_students']),
            "stats_student_staff_ratio": convert(s['stats_student_staff_ratio']),
            "stats_pc_intl_students": convert(s['stats_pc_intl_students']),
            "stats_female_male_ratio": s['stats_female_male_ratio']
        })
