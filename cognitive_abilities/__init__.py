from otree.api import *
from datetime import datetime, timezone

doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'cognitive_abilities'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    bat_and_ball = models.StringField(
        label="A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        blank=True,
    )
    machines = models.StringField(
        label="If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        blank=True,
    )
    lily_pads = models.StringField(
        label="In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for "
              "the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?",
        blank=True,
    )
    choir = models.StringField(
        label="Out of 1,000 people in a small town 500 are members of a choir. Out of these 500 "
              "members in the choir 100 are men. Out of the 500 inhabitants that are not in the choir 300 "
              "are men. What is the probability that a randomly drawn man is a member of the choir?",
        blank=True,
    )
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True)


# PAGES
class CognitiveAbilities(Page):
    form_model = "player"
    form_fields = ["bat_and_ball", "machines", "lily_pads", "choir"]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.end_time = str(datetime.now(timezone.utc))


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))


page_sequence = [PreProcess,CognitiveAbilities]
