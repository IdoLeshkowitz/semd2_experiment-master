import os

from otree.api import *
import itertools
import random

doc = """
The first link, that sends participants to the different treatments
"""


class C(BaseConstants):
    NAME_IN_URL = 'treatment_allocator'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    TRAJECTORIES_LINKS_DEV = {"trajectory_1": "http://localhost:8000/room/trajectory_1", "trajectory_9": "http://localhost:8000/room/trajectory_9",}
    TRAJECTORIES_LINKS_PROD = {"trajectory_1": "https://semd.herokuapp.com/room/trajectory_1", "trajectory_9": "https://semd.herokuapp.com/room/trajectory_9",}


class Subsession(BaseSubsession):
    pass


def creating_session(subsession: Subsession):
    """
    Allocates for each new player a trajectory number ranging
    from 0 to n-1, where n is the number of possible trajectories.

    Parameters
    ----------
    subsession: Subsession
        Otree's object representing the current subsession.
    
    Returns
    -------
    int
        an integer representing the chosen trajectory for the current player.
    """
    trajectories_distribution = generate_item_distribution(["trajectory_1", "trajectory_9"], [25, 75], 20)
    iterator = itertools.cycle(trajectories_distribution)
    for player in subsession.get_players():
        player.trajectory = next(iterator)


def generate_item_distribution(keys, percentages, n):
    distribution = []
    total_percentage = sum(percentages)
    if total_percentage != 100:
        raise ValueError("The total percentage should be 100.")

    for key, percentage in zip(keys, percentages):
        count = int(n * percentage / 100)
        distribution.extend([key] * count)

    remaining = n - len(distribution)
    distribution.extend(random.sample(keys, remaining))

    random.shuffle(distribution)
    return distribution


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    trajectory = models.IntegerField()


# PAGES
class Allocator(Page):
    @staticmethod
    def js_vars(player: Player):
        is_production = os.environ.get("OTREE_PRODUCTION") == "TRUE"
        if is_production:
            return {"trajectory_link": C.TRAJECTORIES_LINKS_PROD[player.trajectory]}
        else:
            return {"trajectory_link": C.TRAJECTORIES_LINKS_DEV[player.trajectory]}


page_sequence = [Allocator]
