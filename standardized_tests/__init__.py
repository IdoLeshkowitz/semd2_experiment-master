from otree.api import *


doc = """
Your app description
"""

def make_1_to_7_choice_field(label):
    return models.IntegerField(
        choices = range(1, 8),
        label = label,
        widget = widgets.RadioSelectHorizontal,
    )

def make_scale_field(label):
    return models.IntegerField(
        min = 0,
        max = 100,
        label = label
    )

class C(BaseConstants):
    NAME_IN_URL = 'standardized_tests'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Play Pattern Questions
    typical_strategy = models.LongStringField(
        label = "How did you typically rank the four prizes?"
    )

    # Understanding Questions
    understand_game = make_1_to_7_choice_field("The game as a whole")
    understand_choice = make_1_to_7_choice_field("How to best choose your own ranking")
    understand_principle = make_1_to_7_choice_field("The important principle of the game")
    understand_allocation = make_1_to_7_choice_field("How the allocation of prizes to participants works")

    # Belief Questions
    win_highest_rank = make_scale_field("I am most likely to get a prize if I rank it highest in my list.")
    win_second_rank = make_scale_field("In some rounds I may be more likely to get a prize if by ranking it second rather than first.")
    own_preference = make_scale_field("I should consider my own preferences while choosing my own ranking.")
    other_ranking = make_scale_field("I should consider the other participants' rankings while choosing my own ranking.")
    priorities = make_scale_field("I should consider the prize priorities while choosing my own rankings.")

    # Properties Questions
    strategyproffness = make_scale_field("The best ranking one can submit is their true order of preference.")
    one_to_one = make_scale_field("The allocation process always ends with each participant getting a different prize, and each prize awarded to some participant.")
    stability = make_scale_field("After the allocation process, one can reallocate a prize to a participant that ranked it more highly, and the prize priority for the new participant will also be higher than its priority for the original participant who got it.")
    pareto = make_scale_field("After the allocation process, one can reallocate some of the prizes while making all participants better off according to their rankings.")

    # Statements
    fairness = make_1_to_7_choice_field("The allocation process is fair towards all participants.")

    # Cognitive Abilities
    bat_and_ball = models.FloatField(min = 0, label = "")
    machines = models.IntegerField(min = 0, label = "")
    lily_pads = models.IntegerField(min = 0, label = "")

    # Numeracy
    choir_men = models.FloatField(min = 0, max = 100, label = "")


# PAGES
class StandardizedTests(Page):
    form_model = "player"
    form_fields = [
        "typical_strategy",
        "understand_game",
        "understand_choice",
        "understand_principle",
        "understand_allocation",
        "win_highest_rank",
        "win_second_rank",
        "own_preference",
        "other_ranking",
        "priorities",
        "strategyproffness",
        "one_to_one",
        "stability",
        "pareto",
        "fairness",
        "bat_and_ball",
        "machines",
        "lily_pads",
        "choir_men"
    ]


page_sequence = [StandardizedTests]
