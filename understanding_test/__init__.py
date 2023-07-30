from otree.api import *
from datetime import datetime, timezone

doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'understanding_test'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    UNDERSTANDING_BONUS_LIMIT = 44


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    first_situation_a = models.StringField(initial="", blank=True)
    first_situation_b = models.StringField(initial="", blank=True)
    first_situation_c = models.StringField(initial="", blank=True)
    first_situation_d = models.StringField(initial="", blank=True)
    second_situation_a = models.StringField(initial="", blank=True)
    second_situation_b = models.StringField(initial="", blank=True)
    second_situation_c = models.StringField(initial="", blank=True)
    second_situation_d = models.StringField(initial="", blank=True)
    third_situation_a = models.StringField(initial="", blank=True)
    third_situation_b = models.StringField(initial="", blank=True)
    third_situation_c = models.StringField(initial="", blank=True)
    third_situation_d = models.StringField(initial="", blank=True)
    page2_q1 = models.StringField(initial="", blank=True)
    page2_q2 = models.StringField(initial="", blank=True)
    page3_q1 = models.StringField(initial="", blank=True)
    page3_q2 = models.StringField(initial="", blank=True)
    page3_q3 = models.StringField(initial="", blank=True)
    page3_q4 = models.StringField(initial="", blank=True)
    page3_q5 = models.StringField(initial="", blank=True)
    page3_q6 = models.StringField(initial="", blank=True)
    page3_q7 = models.StringField(initial="", blank=True)
    page3_q8 = models.StringField(initial="", blank=True)

    understanding_bonus_limit = models.IntegerField(initial=C.UNDERSTANDING_BONUS_LIMIT)
    understanding_bonus_from_round = models.IntegerField(initial=0)
    start_time = models.StringField(initial=str(datetime.now(timezone.utc)))
    page_index = models.IntegerField(initial=0)
    end_time = models.StringField(blank=True)

    def first_situation_a_error_message(self, value):
        if value != "Possibly True":
            return 'Please select the correct answer'


# PAGES
class Understanding_test(Page):
    form_model = 'player'
    form_fields = ["first_situation_a", "first_situation_b", "first_situation_c", "first_situation_d", "second_situation_a", "second_situation_b",
                   "second_situation_c", "second_situation_d", "third_situation_a", "third_situation_b", "third_situation_c", "third_situation_d", "page2_q1",
                   "page2_q2", "page3_q1", "page3_q2", "page3_q3", "page3_q4", "page3_q5", "page3_q6", "page3_q7", "page3_q8"]

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        action = data['action']
        if action == "set_page_index":
            player.page_index = data['page_index']
        if action == "set_form_fields":
            form_fields = eval(data['form_fields'])
            for field_name, payload in form_fields.items():
                value = str(payload['value'])
                setattr(player, field_name, value)


    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        expected_answer_indexes = {
            "first_situation_a":  "1",
            "first_situation_b":  "1",
            "first_situation_c":  "0",
            "first_situation_d":  "1",
            "second_situation_a": "1",
            "second_situation_b": "1",
            "second_situation_c": "0",
            "second_situation_d": "0",
            "third_situation_a":  "0",
            "third_situation_b":  "0",
            "third_situation_c":  "1",
            "third_situation_d":  "0",
            "page2_q1":           "0",
            "page2_q2":           "2",
            "page3_q1":           "1",
            "page3_q2":           "0",
            "page3_q3":           "0",
            "page3_q4":           "1",
            "page3_q5":           "0",
            "page3_q6":           "0",
            "page3_q7":           "1",
            "page3_q8":           "1",
        }
        understanding_bonus_per_correct_answer = 2
        for field_name, expected_answer_index in expected_answer_indexes.items():
            is_correct = getattr(player, field_name) == expected_answer_index
            if is_correct:
                player.understanding_bonus_from_round += understanding_bonus_per_correct_answer
        player.participant.understanding_bonus += player.understanding_bonus_from_round
        player.end_time = str(datetime.now(timezone.utc))
        player.understanding_bonus_limit = C.UNDERSTANDING_BONUS_LIMIT
        player.participant.understanding_bonus_limit += player.understanding_bonus_limit

    @staticmethod
    def js_vars(player: Player):
        return {
            "currency":  player.session.config["currency"],
            "pageIndex": player.page_index,
        }


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))


page_sequence = [PreProcess, Understanding_test]
