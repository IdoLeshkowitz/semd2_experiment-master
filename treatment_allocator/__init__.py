from otree.api import *
import itertools


doc = """
The first link, that sends participants to the different treatments
"""


class C(BaseConstants):
    NAME_IN_URL = 'treatment_allocator'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    TRAJECTORIES_LINKS = [
        # change to # when uploading to heroku
        "http://localhost:8000/room/trajectory_1",  # Traditional, Mech-Prop, single
        # "https://semd22.herokuapp.com/room/trajectory_1",
        "http://localhost:8000/room/trajectory_9",  # Traditional, Mech-Prop, double
    ]

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
    for player in subsession.get_players():
        player.trajectory = itertools.cycle(range(len(C.TRAJECTORIES_LINKS)))
        player.trajectory = next(player.trajectory)


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    trajectory = models.IntegerField()


# PAGES
class Allocator(Page):
    @staticmethod
    def js_vars(player: Player):
        return dict(
            trajectory_link = C.TRAJECTORIES_LINKS[player.trajectory]
        )


page_sequence = [Allocator]
