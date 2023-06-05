from otree.api import *


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'Exit'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    full_name = models.StringField(
        label = "Full Name:",
        blank = False
    )
    email = models.StringField(
        label = "Email Address:",
        blank = False,
    )


# PAGES
class EndSurvey(Page):
    form_model = 'player'
    form_fields = ['full_name','email']
    # calculate total payoff and give code
    @staticmethod
    def vars_for_template(player: Player):
        total_payoff = player.participant.payoff_plus_participation_fee()
        understanding_bonus_ratio = round(player.participant.understanding_bonus / player.participant.max_understanding_bonus)
        understanding_bonus_money = round(understanding_bonus_ratio * 0.5,2)
        return {
            "understanding_bonus_ratio": understanding_bonus_ratio,
            "understanding_bonus_money": understanding_bonus_money,
            "total_payoff": total_payoff,
            "completion_code": "5682D891"
        }

    @staticmethod
    def is_displayed(player: Player):
        return player.participant.consent == True


class ThankYou(Page):
    pass
page_sequence = [EndSurvey,ThankYou]
