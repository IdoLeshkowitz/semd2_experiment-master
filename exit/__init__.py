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
    pass


# PAGES
class EndSurvey(Page):
    # calculate total payoff and give code
    @staticmethod
    def vars_for_template(player: Player):
        total_payoff = player.participant.payoff_plus_participation_fee()
        return {
            "total_payoff": total_payoff,
            "completion_code": "5682D891"
        }



page_sequence = [EndSurvey]
