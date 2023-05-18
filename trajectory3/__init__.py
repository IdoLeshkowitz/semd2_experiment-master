from otree.api import *
import random

doc = """
An empty page that passes the variable of each trajectory.
There are 10 different apps like this, each with a matching variable.
"""


class C(BaseConstants):
    NAME_IN_URL = 'PassVars3'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1

    trajectory_num = 3  # Traditional, Prop-Mech, single


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
        player.participant.full_training = random.choice([True, False])
        player.full_training = player.participant.full_training


page_sequence = [PassVars]
