from otree.api import *


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'consent_form'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    consent = models.BooleanField(
        label = "Confirmation:",
        choices = [
            [True, "Yes, I agree to participate in the study"],
            [False, "No, I do not agree to participate in the study"]
        ]
    )

    prolific_id = models.StringField(
        label = "Please enter your Prolific ID:"
    )


# PAGES
class ConsentForm(Page):
    form_model = "player"
    form_fields = ["consent", "prolific_id"]


page_sequence = [ConsentForm]
