from otree.api import *


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'understanding_test'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    first_situation_a = models.StringField(
        label="Prize A",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    first_situation_b = models.StringField(
        label="Prize B",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    first_situation_c = models.StringField(
        label="Prize C",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    first_situation_d = models.StringField(
        label="Prize D",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    second_situation_a = models.StringField(
        label="Prize A",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    second_situation_b = models.StringField(
        label="Prize B",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    second_situation_c = models.StringField(
        label="Prize C",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    second_situation_d = models.StringField(
        label="Prize D",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    third_situation_a = models.StringField(
        label="Prize A",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    third_situation_b = models.StringField(
        label="Prize B",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    third_situation_c = models.StringField(
        label="Prize C",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    third_situation_d = models.StringField(
        label="Prize D",
        choices=["Possibly True", " Definitely False"],
        widget=widgets.RadioSelect,
    )
    def first_situation_a_error_message(self, value):
        if value != "Possibly True":
            return 'Please select the correct answer'
# PAGES
class Understanding_test(Page):
    form_model = 'player'
    form_fields = ["first_situation_a", "first_situation_b", "first_situation_c", "first_situation_d",
                   "second_situation_a", "second_situation_b", "second_situation_c", "second_situation_d",
                   "third_situation_a", "third_situation_b", "third_situation_c", "third_situation_d"]

    @staticmethod
    def live_method(player: Player, data):
        if data['information_type'] == "add_understanding_bonus":
            points = data["points"]
            player.participant.understanding_bonus += points

page_sequence = [Understanding_test]
