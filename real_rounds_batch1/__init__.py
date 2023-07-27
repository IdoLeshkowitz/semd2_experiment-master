from otree.api import *
import time, random
import numpy
from datetime import datetime, timezone

doc = """
Your app description
"""


def generate_prize_values():
    """
    Returns a randomly generated list of the values (in pennies)
    of the prizes for round i.

    Parameters
    ----------

    Returns
    -------
    list
        a list of the prizes values
        a list of the prizes values
    Ranodmizes 4 prizes value
    """
    import random

    v1 = random.uniform(90, 99)
    v2 = random.uniform(50, 89)
    v3 = random.uniform(10, 49)
    v4 = random.uniform(0, 9)

    values = [round(num / 100,2) for num in [v1, v2, v3, v4]]
    random.shuffle(values)
    print(values)
    return values


def generate_prizes_values_list(num_rounds):
    return [generate_prize_values() for _ in range(num_rounds)]


def generate_priorities(first_group, second_group):
    """
    Returns a randomly generated list of preferences of the first group
    on the second group.

    Parameters
    ----------
    first_group: list
        An ordered list of objects where each elements represent an individual.
    second_group: list
        An ordered list of objects where each elements represent an individual.

    Returns
    -------
    list
        a list of lists of indices where each index is the location of individual i
        in second_group.
    """
    players_indices = list(range(len(second_group)))
    return [random.sample(players_indices, len(second_group)) for _ in first_group]


def generate_priorities_list(first_group, second_group, num_rounds):
    return [generate_priorities(first_group, second_group) for _ in range(num_rounds)]


def make_priority_field(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"], [3, "C"], [4, "D"]], label=label)


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
    NAME_IN_URL = 'real_rounds_batch1'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 10  # change to 20 in real pilot
    PLAYERS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_VALUES = generate_prizes_values_list(NUM_ROUNDS)
    PRIZES_PRIORITIES = generate_priorities_list(PRIZES, PLAYERS, NUM_ROUNDS)
    PLAYERS_RANKINGS = generate_priorities_list(PLAYERS[1:], PRIZES, NUM_ROUNDS)


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Player's ranking variables
    first_priority = models.StringField(initial="", blank=True)
    second_priority = models.StringField(initial="", blank=True)
    third_priority = models.StringField(initial="", blank=True)
    fourth_priority = models.StringField(initial="", blank=True)
    prizes_values = models.StringField(initial="")
    prizes_priorities = models.StringField(initial="")
    other_participants_rankings = models.StringField(initial="")

    start_time = models.StringField(initial=str(datetime.now(timezone.utc)))
    end_time = models.StringField(blank=True)

    active_step_index = models.IntegerField(blank=True, initial=0)
    payoff_added = models.BooleanField(initial=False)


def get_prizes_in_round(prizes_by_round_str, round_number):
    return eval(prizes_by_round_str)[round_number - 1]


def get_prizes_priorities_in_round(prizes_priorities_by_round_str, round_number):
    return eval(prizes_priorities_by_round_str)[round_number - 1]


def get_players_rankings_in_round(players_rankings_by_round_str, round_number):
    return eval(players_rankings_by_round_str)[round_number - 1]


# PAGES
class RoundPage(Page):
    form_model = "player"
    form_fields = ["first_priority", "second_priority", "third_priority", "fourth_priority"]

    @staticmethod
    def js_vars(player: Player):
        return {
            "prizes":                 C.PRIZES,
            "prizesValues":           C.PRIZES_VALUES[player.round_number -1 ],
            "prizesPriorities":       get_prizes_priorities_in_round(player.prizes_priorities, player.round_number),
            "players":                C.PLAYERS,
            "participantsPriorities": get_players_rankings_in_round(player.other_participants_rankings, player.round_number),
            "currency":               player.session.config["currency"],
            "variant":                player.participant.runtime__variant,
            "treatment":              player.participant.runtime__treatment,
            "firstPriority":          C.PRIZES[int(player.first_priority)] if player.first_priority else "",
            "secondPriority":         C.PRIZES[int(player.second_priority)] if player.second_priority else "",
            "thirdPriority":          C.PRIZES[int(player.third_priority)] if player.third_priority else "",
            "fourthPriority":         C.PRIZES[int(player.fourth_priority)] if player.fourth_priority else "",
            "activeStepIndex":        player.active_step_index,
        }

    @staticmethod
    def vars_for_template(player: Player):
        return {
            "first_prize":  get_prizes_in_round(player.in_round(1).prizes_values, player.round_number)[0],
            "second_prize": get_prizes_in_round(player.in_round(1).prizes_values, player.round_number)[1],
            "third_prize":  get_prizes_in_round(player.in_round(1).prizes_values, player.round_number)[2],
            "fourth_prize": get_prizes_in_round(player.in_round(1).prizes_values, player.round_number)[3]
        }

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        if data["information_type"] == "set_active_step_id":
            step_index = data["active_step_index"]
            player.active_step_index = step_index
        elif data["information_type"] == "set_ranking":
            """
            Recieves a data stracture from the client side, calls the
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
            player.first_priority = str(preferences[0][0][0])
            player.second_priority = str(preferences[0][0][1])
            player.third_priority = str(preferences[0][0][2])
            player.fourth_priority = str(preferences[0][0][3])
            matching = da(preferences)  # Calling the Differed-Acceptance algorithm.
            user_prize = matching[0][0]
            # since prize values are in cents, we divide by 100 to get dollars
            payoff = values[user_prize]
            print(player.payoff_added)
            if not player.payoff_added:
                # add it to the user's payoff
                player.payoff += payoff
                player.payoff_added = True
            response = dict(prize=prizes[user_prize], value=values[user_prize], payoff=payoff)
            return {0: response}

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.end_time = str(datetime.now(timezone.utc))


########################################################################################################################

def randomize_prize_values():
    """
    Ranodmizes 4 prizes value
    """
    import random

    v1 = round(random.uniform(55, 60)) / 100
    v2 = round(random.uniform(33, 54)) / 100
    v3 = round(random.uniform(11, 32)) / 100
    v4 = round(random.uniform(5, 10)) / 100

    values = [v1, v2, v3, v4]
    random.shuffle(values)
    return values


### helping functions ###
#########################

def randomize_permutation(r, kind):
    """
    draw a permutation given the follwoing distributions:

    For rankings, i.e., participants preferences over prizes:
    * at each step, we pick an element from an array and place it below the previous one in the ranking
    * the chance to pick each one at each step is decreasing/increasing in its size/importance. For example, if we pick a prize from [0,1,2,3]
    the highest/lowest chance is to pick 0, then 1, then 2 and then 3.
    * Their chances are proportional to r**(their position in the order - 1)
    * (of course, the chances are also normalized to sum up to 1)

    For priorities, i.e., prizes preferences over participants:
    * at each step, we pick a participant from an array and place it below the previous one in the priorities
    * the chance to pick index_you ("You") is higher/lower than the chance to pick anyone else
    * the chance for "You" is proportional to 1, and the others to r.
    * (of course, the chances are also normalized to sum up to 1)
    """

    import numpy as np
    index_you = 0
    index_others = [i for i in [0, 1, 2, 3] if i != index_you]

    if kind == 'ranking':
        p_first = lambda n: (1 - r) / (1 - r ** n)

        side2_left = [0, 1, 2, 3]
        perm = []
        while side2_left != []:
            n = len(side2_left)
            p = p_first(n)
            next_side2 = np.random.choice(side2_left, p=[p * r ** i for i in range(n)])
            perm = perm + [next_side2]
            side2_left.remove(next_side2)

    if kind == 'priorities':
        n = 4
        p_pos_you = lambda pos: r ** pos * ((1 - r) / (1 - r ** n))

        # first, randomize a permutation of the side-1 participants other than "You"
        perm = list(np.random.permutation(index_others))

        # second, randomize the position of "You" (side-1 index 3) out of the 4 possible positions [0,1,2,3]
        you_pos = np.random.choice([0, 1, 2, 3], p=[p_pos_you(i) for i in range(4)])

        # insert "You" to the permutation
        perm.insert(you_pos, index_you)

    return perm


def randomize_others_rankings(prize_values, r=0.5):
    """
    returns a list of the three rankings of the other participants, where the prize order affects the ranking distribution
    """
    return [[get_prizes_dict(prize_values)[i] for i in randomize_permutation(r, kind='ranking')] for _ in range(3)]


def get_prizes_dict(prize_values):
    """
    Translates index 0 to the index of the highest-earning prize, index 1 to the second highest, and so on.
    """
    import numpy as np
    index_list = (-1 * np.array(prize_values)).argsort().tolist()
    return {i: j for i, j in zip([0, 1, 2, 3], index_list)}


def randomize_prize_priorities(prize_values, r_highest=1.7, r_regular=0.999):
    """
    returns a list of 4 prize priorities, where the highest-prize priorities are randomized differently than the other prizes' priorities
    """
    all_prize_priorities = [[], [], [], []]

    # set the highest prize's priorities
    highest_prize_index = get_prizes_dict(prize_values)[0]
    all_prize_priorities[highest_prize_index] = randomize_permutation(r_highest, kind='priorities')

    # set the other prizes' priorities
    other_prize_indices = [get_prizes_dict(prize_values)[i] for i in range(1, 4)]
    for index in other_prize_indices:
        all_prize_priorities[index] = randomize_permutation(r_regular, kind='priorities')
    return all_prize_priorities


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))
        if (player.round_number == 1):
            player.prizes_values = str([randomize_prize_values() for i in range(C.NUM_ROUNDS)])
            player.prizes_priorities = str([randomize_prize_priorities(get_prizes_in_round(player.prizes_values, i + 1)) for i in range(C.NUM_ROUNDS)])
            player.other_participants_rankings = str([randomize_others_rankings(get_prizes_in_round(player.prizes_values, i + 1)) for i in range(C.NUM_ROUNDS)])
        else:
            player.prizes_values = player.in_round(1).prizes_values
            player.prizes_priorities = player.in_round(1).prizes_priorities
            player.other_participants_rankings = player.in_round(1).other_participants_rankings


page_sequence = [PreProcess, RoundPage]
