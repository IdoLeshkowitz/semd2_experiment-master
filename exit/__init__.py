from otree.api import *
from datetime import datetime, timezone
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
    full_name = models.StringField(label="Full Name:", blank=False)
    email = models.StringField(label="Email Address:", blank=False, )
    total_payment = models.FloatField(initial=0)
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True, initial="")


def get_understanding_bonus_ratio(understanding_bonus, max_understanding_bonus):
    return round(understanding_bonus / max_understanding_bonus * 100, 1)


def get_understanding_bonus_money(understanding_bonus_ratio):
    return round((understanding_bonus_ratio / 100) * 4, 2)


def get_total_payment(understanding_bonus_money, payoff):
    return float(understanding_bonus_money + payoff)


# PAGES
class EndSurvey(Page):
    form_model = 'player'
    form_fields = ['full_name', 'email']

    # calculate total payoff and give code
    @staticmethod
    def vars_for_template(player: Player):
        total_payoff = player.participant.payoff_plus_participation_fee()
        understanding_bonus_ratio = get_understanding_bonus_ratio(player.participant.understanding_bonus, player.participant.understanding_bonus_limit)
        understanding_bonus_money = get_understanding_bonus_money(understanding_bonus_ratio)
        total_payment = get_total_payment(understanding_bonus_money, total_payoff)
        return {
            "understanding_bonus_ratio": understanding_bonus_ratio,
            "understanding_bonus_money": understanding_bonus_money,
            "total_payoff":              total_payoff,
            "total_payment":             total_payment,
            "completion_code":           "5682D891"
        }

    @staticmethod
    def is_displayed(player: Player):
        return player.participant.consent == True

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.participant.full_name = player.full_name
        player.participant.email = player.email
        player.total_payment = get_total_payment(get_understanding_bonus_money(get_understanding_bonus_ratio(player.participant.understanding_bonus, player.participant.understanding_bonus_limit)), player.participant.payoff_plus_participation_fee())
        player.end_time = str(datetime.now(timezone.utc))


class ThankYou(Page):
    pass

class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))


page_sequence = [PreProcess,EndSurvey, ThankYou]
