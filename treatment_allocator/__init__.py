from otree.api import *
import itertools


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'treatment_allocator'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    TRAJECTORIES_LINKS = [
        "http://localhost:8000/room/trajectory_1", # Trajectory - Traditional 1, Plan 1
        "http://localhost:8000/room/trajectory_2", # Trajectory - Traditional 1, Plan 2
        "http://localhost:8000/room/trajectory_3", # Trajectory - Traditional 2, Plan 1
        "http://localhost:8000/room/trajectory_4", # Trajectory - Traditional 2, Plan 2
        "http://localhost:8000/room/trajectory_5", # Trajectory - Menu 1, Plan 1
        "http://localhost:8000/room/trajectory_6", # Trajectory - Menu 1, Plan 2
        "http://localhost:8000/room/trajectory_7", # Trajectory - Menu 2, Plan 1
        "http://localhost:8000/room/trajectory_8", # Trajectory - Menu 2, Plan 2
        "http://localhost:8000/room/trajectory_9",  # Trajectory - Null
        "http://localhost:8000/room/trajectory_10"  # Trajectory - Null B
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
    trajectories = itertools.cycle(range(10))
    for player in subsession.get_players():
        player.trajectory = next(trajectories)


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
