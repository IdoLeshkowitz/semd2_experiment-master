from otree.api import *


doc = """
An explanation of the matching mechanics
"""


class C(BaseConstants):
    NAME_IN_URL = 'Mechanics'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    pass


# PAGES
class Traditional(Page):
    pass


class Menu(Page):
    pass


page_sequence = [Traditional, Menu]
