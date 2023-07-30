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
    TRAJECTORIES_LINKS = {"trajectory_1": "trajectory_1", "trajectory_9": "trajectory_9","trajectory_13":"trajectory_13", "trajectory_5":"trajectory_5", "trajectory_17":"trajectory_17"}


class Subsession(BaseSubsession):
    trajectories_distribution = models.StringField(blank=True, initial="")


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
    # trajectories_distribution = generate_item_distribution(["trajectory_1", "trajectory_9"], [50,50], 10)
    trajectories_distribution = generate_item_distribution(["trajectory_1", "trajectory_9","trajectory_13", "trajectory_5", "trajectory_17"], [20,20,20,20,20], 10)
    subsession.trajectories_distribution = str(trajectories_distribution)
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
            base_url = os.environ.get("BASE_URL")
            url = f"{base_url}/room/{C.TRAJECTORIES_LINKS[player.trajectory]}"
        else:
            url =f"http://localhost:8000/room/{C.TRAJECTORIES_LINKS[player.trajectory]}"
        return {"trajectory_link": url}


page_sequence = [Allocator]
