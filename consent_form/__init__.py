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



# PAGES
class ConsentForm(Page):
    form_model = "player"
    form_fields = ["consent"]
    @staticmethod
    def app_after_this_page(player: Player, upcoming_apps):
        if player.consent == False:
            return upcoming_apps[-1]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.participant.consent = player.consent





page_sequence = [ConsentForm]
