from otree.api import *
import random

doc = """
An empty page that passes the variable of each trajectory.
There are 10 different apps like this, each with a matching variable.
"""


class C(BaseConstants):
    NAME_IN_URL = 'PassVars17'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1

    trajectory_num = 17  # Null, double


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    trajectory_num = models.IntegerField(initial=C.trajectory_num)
    full_training = models.BooleanField()


# PAGES
class PassVars(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.participant.trajectory_num = C.trajectory_num
        player.participant.full_training = True
        player.full_training = player.participant.full_training
        player.participant.understanding_bonus_limit = 0
        player.participant.understanding_bonus = 0
        player.participant.runtime__variant = "null"
        player.participant.runtime__treatment = "null"

page_sequence = [PassVars]
