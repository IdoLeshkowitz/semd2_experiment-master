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
        # change to # when uploading to heroku
        "http://localhost:8000/room/trajectory_1",  # Traditional, Mech-Prop, single
        # "https://semd22.herokuapp.com/room/trajectory_1",
        "http://localhost:8000/room/trajectory_2",  # Traditional, Mech-Prop, double
        # "https://semd22.herokuapp.com/room/trajectory_2",
        "http://localhost:8000/room/trajectory_3",  # Traditional, Prop-Mech, single
        # "https://semd22.herokuapp.com/room/trajectory_3",
        "http://localhost:8000/room/trajectory_4",  # Traditional, Prop-Mech, double
        # "https://semd22.herokuapp.com/room/trajectory_4",
        "http://localhost:8000/room/trajectory_5",  # Menu, Mech-Prop, single
        # "https://semd22.herokuapp.com/room/trajectory_5",
        "http://localhost:8000/room/trajectory_6",  # Menu, Mech-Prop, double
        # "https://semd22.herokuapp.com/room/trajectory_6",
        "http://localhost:8000/room/trajectory_7",  # Menu, Prop-Mech, single
        # "https://semd22.herokuapp.com/room/trajectory_7",
        "http://localhost:8000/room/trajectory_8",  # Menu, Prop-Mech, double
        # "https://semd22.herokuapp.com/room/trajectory_8",
        "http://localhost:8000/room/trajectory_9",       # Null, single
        # "https://semd22.herokuapp.com/room/trajectory_9",
        "http://localhost:8000/room/trajectory_10"        # Null, double
        # "https://semd22.herokuapp.com/room/trajectory_10",
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
