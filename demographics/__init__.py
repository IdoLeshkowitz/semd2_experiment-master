from otree.api import *


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'demographics'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    state = models.StringField(
        label="What is your state of residence?",
        choices=["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
                 "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                 "Louisiana", "Maine",
                 "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
                 "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
                 "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
                 "Tennessee",
                 "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
                 "Washington, D.C.", "Puerto rico"]
    )
    zip_code = models.IntegerField(
        label= "What is your zip code? (5 digits)?", min=10000, max=99999
    )
    household_size = models.IntegerField(
        label= "Including you, how many people live in your household?", min=1
    )
    household_over18 = models.IntegerField(
        label= "How many people who live in this household are 18 or older?", min=1
    )
    birth_year = models.IntegerField(
        label= "What is your year of birth, select a year between 1900 and 2005.", choices=range(1900, 2005)
    )
    gender = models.StringField(
        label="What is your gender?",
        choices=["Male", "Female", "Non-binary", "Other", "Prefer not to answer"],
        widget=widgets.RadioSelect
    )
    race = models.StringField(
        label="What is your race/ethnicity?",
        choices=["White and/or European-American", " Black and/or African-American", "Native American and/or First Nations",
                 "Hispanic and/or Latino", "Asian and/or Pacific Islander", "Middle-Eastern and/or North African",
                 "Multiracial and/or Mixed", "Other", "Prefer not to answer"],
        widget=widgets.RadioSelect
    )
    educ_lvl = models.StringField(
        label="What is the highest level of education you have completed?",
        choices=["Middle School or less", "Some high school", "High school diploma", "GED (HS Equivalent)",
                 "Some college, but did not finish", "Two years college degree / Associate degree / A.A. / A.S.",
                 "Four-year college degree / B.A. / B.S.", "Some graduate school",
                 "Master’s degree (MA / MS / MBA / MFA / MDiv)", "Advanced degree (PhD / MD / JD)"],
        widget=widgets.RadioSelect
    )
    educ_prime = models.StringField(
        label="During your educational career, which of the following best describes your primary focus?",
        choices=["Humanities", "Social Sciences", "Natural Sciences or Math", "Applied Science or Engineering", "None"],
        widget=widgets.RadioSelect
    )
    marital_stat = models.StringField(
        label="What is your current marital status?",
        choices=["Married", "Widowed", "Separated", "Divorced", "Single", "Living with a significant other"],
        widget=widgets.RadioSelect
    )
    employment = models.StringField(
        label="Which of the following best describes your main activity or your employment status?",
        choices=["Working (other than your work at Prolific)", "Unemployed", "Retired", "Stay-at-home parent",
                 "Student", "Other"],
        widget=widgets.RadioSelect
    )
    social_views = models.StringField(
        label="In general, how do you consider your views on social issues?",
        choices=["Very liberal", "Liberal", "Slightly liberal", "Moderate",
                 "Slightly conservative", "Conservative", "Very conservative", "Other"],
        widget=widgets.RadioSelect
    )
    economic_views = models.StringField(
        label= "In general, how do you consider your views on economic issues?",
        choices=["Very liberal", "Liberal", "Slightly liberal", "Moderate",
                 "Slightly conservative", "Conservative", "Very conservative", "Other"],
        widget=widgets.RadioSelect
    )
    party = models.StringField(
        label="Do you consider yourself a…",
        choices=["Republican", "Democrat", "Independent", "Other", "None of the above"],
        widget=widgets.RadioSelect
    )
    election_2020 = models.StringField(
        label="For whom did you vote in the last presidential elections of 2020?",
        choices=["Joe Biden", "Donald Trump", "Other candidate", "I did not vote"],
        widget=widgets.RadioSelect
    )
    income = models.StringField(
        label="What is your combined annual household income?",
        choices=["Less than $20,000", "$20,000 – $39,999", "$40,000 – $59,999", "$60,000 – $79,999",
                 "$80,000 – $99,999", "$100,000 – $149,999", "$150,000 – $199,999", "$200,000 or more"],
        widget=widgets.RadioSelect
    )
    unclear = models.LongStringField(
        label= "Were the study instructions clear and simple to understand? Please briefly mention anything that was unclear."
               " Please share with us any other comments about the study, we highly value any feedback!"
    )


# PAGES
class Demographics(Page):
    form_model = "player"
    form_fields = ["state", "zip_code", "household_size", "household_over18", "birth_year", "gender", "race",
                   "educ_lvl", "educ_prime", "marital_stat", "social_views", "economic_views", "party",
                   "election_2020", "income", "unclear"]


page_sequence = [Demographics]
