from otree.api import *
from datetime import datetime, timezone

doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'understanding_test'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    UNDERSTANDING_BONUS_LIMIT = 18


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    first_situation_a = models.StringField(
        label="Prize A",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    first_situation_b = models.StringField(
        label="Prize B",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    first_situation_c = models.StringField(
        label="Prize C",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    first_situation_d = models.StringField(
        label="Prize D",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    second_situation_a = models.StringField(
        label="Prize A",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    second_situation_b = models.StringField(
        label="Prize B",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    second_situation_c = models.StringField(
        label="Prize C",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    second_situation_d = models.StringField(
        label="Prize D",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    maximize_earnings_a = models.StringField(
        label="Sometimes I might have to rank the prize that earns me the most in second place or lower.",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    maximize_earnings_b = models.StringField(
        label="I should consider only how much each prize earns me while choosing my own ranking.",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    maximize_earnings_c = models.StringField(
        label="I should rank from the highest-earning to lowest-earning prize regardless of anything else.",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    maximize_earnings_d = models.StringField(
        label="I should consider the possible rankings of the other participants while choosing my own ranking.",
        choices=["True", "False"],
        widget=widgets.RadioSelect,
    )
    maximize_earnings_e = models.StringField(
    label="I should consider the prize priorities while choosing my own rankings.",
    choices=["True", "False"],
    widget=widgets.RadioSelect,
    )
    understanding_bonus_limit = models.IntegerField(initial=C.UNDERSTANDING_BONUS_LIMIT)
    understanding_bonus_from_round = models.IntegerField(initial=0)
    start_time = models.StringField(initial=str(datetime.now(timezone.utc)))
    end_time = models.StringField(blank=True)
    def first_situation_a_error_message(self, value):
        if value != "Possibly True":
            return 'Please select the correct answer'
# PAGES
class Understanding_test(Page):
    form_model = 'player'
    form_fields = ["first_situation_a", "first_situation_b", "first_situation_c", "first_situation_d",
                   "second_situation_a", "second_situation_b", "second_situation_c", "second_situation_d",
                   "maximize_earnings_a", "maximize_earnings_b", "maximize_earnings_c", "maximize_earnings_d","maximize_earnings_e"]

    @staticmethod
    def live_method(player: Player, data):
        if data['information_type'] == "add_understanding_bonus":
            points = data["points"]
            player.understanding_bonus_from_round = points
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.participant.understanding_bonus += player.understanding_bonus_from_round
        player.end_time = str(datetime.now(timezone.utc))

class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))

page_sequence = [PreProcess, Understanding_test]
