from otree.api import *
import time, random
import numpy

doc = """
Your app description
"""


def generate_prizes_values():
    """
    Returns a randomly generated list of the values (in pennies)
    of the prizes for round i.

    Parameters
    ----------

    Returns
    -------
    list
        a list of the prizes values
    """

    # TODO: This function needs to be randomized.
    #       I also think it would be more robust to get the
    #       get the list of prizes (or just its length) and
    #       adjust the values list accordingly. 
    return [27, 7, 12, 57]


def generate_prizes_priorities():
    return [
        [1, 2, 0, 3],
        [2, 0, 3, 1],
        [3, 2, 0, 1],
        [0, 3, 1, 2]
    ]


def generate_players_rankings():
    return [
        [1, 0, 2, 3],
        [2, 1, 3, 0],
        [0, 1, 2, 3]
    ]


def make_priority_field(label):
    return models.IntegerField(
        choices=[
            [1, "A"],
            [2, "B"],
            [3, "C"],
            [4, "D"]
        ],
        label=label
    )


def da(preferences):
    """
    The Differed-Acceptance algorithm's implementation taken from Assaf Romm's source code.

    Parameters
    ----------
    preferences: list
        A list of size 2 of nXn matrices representing the preferences of one group on the other.
        A preference is a list of numbers ranging from 0 to n-1 where n is the size of a group. 
        preferences[0] - the proposing group.
        preferences[1] - the receiving group.

    Returns
    -------
    list
        A list of size 2 of lists of size n where each element i in each list is the matching
        index j of individual i according to the Differed-Acceptance algorithm.
    """
    M_prefs = preferences[0]
    W_prefs = preferences[1]

    NM = len(M_prefs)
    NW = len(W_prefs)

    if NM == 0 or NW == 0:
        return [[-1] * NM, [-1] * NW]

    # Create "map" to ranks
    W_ranks = NM * numpy.ones([NW, NM], int)
    for w in range(NW):
        for i in range(len(W_prefs[w])):
            W_ranks[w][W_prefs[w][i]] = i

    # Create vector of men still proposing
    proposing_men = numpy.ones(NM, int)
    proposing_index = numpy.zeros(NM, int)

    # Temporary matching
    matching = -1 * numpy.ones(NW, int)

    # Run proposals
    while sum(proposing_men) > 0:
        # Create vector of proposing men to each woman
        women_proposals = [[] for i in range(NW)]
        for m in proposing_men.nonzero()[0]:
            women_proposals[M_prefs[m][proposing_index[m]]].append(m)

        # Select/replace men where applicable
        for w in range(NW):
            if women_proposals[w] == []: continue
            if matching[w] > -1: women_proposals[w].append(matching[w])

            indices = numpy.take(W_ranks[w], women_proposals[w])
            amin_indices = numpy.argmin(indices)

            if indices[amin_indices] == NM:
                new_m = -1
            else:
                new_m = women_proposals[w][amin_indices]
                proposing_men[new_m] = 0

            matching[w] = new_m
            for m in women_proposals[w]:
                if m != new_m:
                    proposing_index[m] += 1
                    if proposing_index[m] == len(M_prefs[m]):
                        proposing_men[m] = 0
                    else:
                        proposing_men[m] = 1

    # We got a result, now need to inverse vector
    W_matching = matching
    M_matching = -1 * numpy.ones(NM, int)
    for i in range(NW):
        if W_matching[i] != -1:
            M_matching[W_matching[i]] = i

    M_matching = M_matching.tolist()
    W_matching = W_matching.tolist()

    return [M_matching, W_matching]


class C(BaseConstants):
    NAME_IN_URL = 'step_3_null_description'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    PLAYERS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_VALUES = generate_prizes_values()
    PRIZES_PRIORITIES = generate_prizes_priorities()
    PLAYERS_RANKINGS = generate_players_rankings()


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    first_priority = make_priority_field("First:")
    second_priority = make_priority_field("Second:")
    third_priority = make_priority_field("Third:")
    fourth_priority = make_priority_field("Fourth:")


# PAGES
class NullDescription(Page):
    form_model = "player"
    form_fields = [
        "first_priority",
        "second_priority",
        "third_priority",
        "fourth_priority"
    ]

    @staticmethod
    def js_vars(player: Player):
        return dict(
            prizes=C.PRIZES,
            prizes_values=C.PRIZES_VALUES,
            prizes_priorities=C.PRIZES_PRIORITIES,
            players=C.PLAYERS,
            players_rankings=C.PLAYERS_RANKINGS
        )

    @staticmethod
    def vars_for_template(player: Player):
        return {"first_prize": round(C.PRIZES_VALUES[0] / 100, 2),
                "second_prize": round(C.PRIZES_VALUES[1] / 100, 2),
                "third_prize": round(C.PRIZES_VALUES[2] / 100, 2),
                "fourth_prize": round(C.PRIZES_VALUES[3] / 100, 2), }

    @staticmethod
    def live_method(player: Player, data):
        """
        Recieves a data structure from the client side, calls the
        Differed-Acceptance algorithm and sends the client side the
        player's matched prize and its value

        Parameters
        ----------
        player: Player
            Otree's object representing the current player.
        data: dictionary
            A data set with all the information needed from the client side
            for the matching algorithm.
        Returns
        -------
        dictionary
            A data set with the player's matched prize and its value.
        """
        # Sleep for 2 seconds to give the feeling the allocation process
        # takes more time than it really is (which practically 0 in our case).
        time.sleep(2)
        # TODO: Back when this was implemented, all the rounds data was determined
        #       in the frontend side (preferences of competitors and prizes, prizes values, etc.).
        #       Now, everything is implemented in the backend side. So, while everything still
        #       works fine, we should consider refactoring all the source code to avoid redundant
        #       transfer of data.
        preferences = data["preferences"]
        prizes = data["prizes"]
        values = data["values"]
        matching = da(preferences)  # Calling the Differed-Acceptance algorithm.
        user_prize = matching[0][0]
        # since prize is in cents, we divide by 100 to get the dollar value
        payoff = round(values[user_prize] / 100, 2)
        # add the payoff to the player's payoff
        player.payoff += payoff
        response = dict(
            payoff=payoff,
            prize=prizes[user_prize],
            value=values[user_prize]
        )

        return {0: response}


page_sequence = [NullDescription]
