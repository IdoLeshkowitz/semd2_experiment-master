from datetime import datetime, timezone

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
    return [37, 7, 25, 57]


def generate_prizes_priorities():
    return [[1, 2, 0, 3], [2, 0, 3, 1], [3, 2, 0, 1], [0, 3, 1, 2]]


def generate_players_rankings():
    return [[1, 0, 2, 3], [2, 1, 3, 0], [0, 1, 2, 3]]


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
    NAME_IN_URL = 'null_intro'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    PARTICIPANTS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_VALUES = generate_prizes_values()
    PRIZES_PRIORITIES = generate_prizes_priorities()
    PARTICIPANTS_PRIORITIES = generate_players_rankings()


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    first_priority = models.StringField(blank=True)
    second_priority = models.StringField(blank=True)
    third_priority = models.StringField(blank=True)
    fourth_priority = models.StringField(blank=True)
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True)
    prizes_values = models.StringField(blank=True)
    prizes_priorities = models.StringField(blank=True)
    participants_priorities = models.StringField(blank=True)
    allocated_prize = models.StringField(blank=True)


def convert_participant_index_to_name(index):
    return C.PARTICIPANTS[index]


def convert_prize_index_to_name(index):
    return C.PRIZES[index]


# PAGES
class NullIntro(Page):
    form_model = "player"
    form_fields = ["first_priority", "second_priority", "third_priority", "fourth_priority"]

    @staticmethod
    def js_vars(player: Player):
        return dict(prizes=C.PRIZES, prizes_values=C.PRIZES_VALUES, prizes_priorities=C.PRIZES_PRIORITIES, players=C.PARTICIPANTS, players_rankings=C.PARTICIPANTS_PRIORITIES)

    def before_next_page(player: Player, timeout_happened):
        print("here")
        player.participants_priorities = str([{C.PARTICIPANTS[1:][index]: [convert_prize_index_to_name(prize) for prize in participant_priorities]} for
                                              index, participant_priorities in enumerate(C.PARTICIPANTS_PRIORITIES)])
        player.prizes_priorities = str([{C.PRIZES[index]: [convert_participant_index_to_name(participant) for participant in prize_priorities]} for
                                        index, prize_priorities in enumerate(C.PRIZES_PRIORITIES)])
        player.prizes_values = str({prize: round(C.PRIZES_VALUES[index] / 100, 2) for index, prize in enumerate(C.PRIZES)})
        player.end_time = str(datetime.now(timezone.utc))

    @staticmethod
    def vars_for_template(player: Player):
        return {
            "prize_value_1": C.PRIZES_VALUES[0] / 100,
            "prize_value_2": C.PRIZES_VALUES[1] / 100,
            "prize_value_3": C.PRIZES_VALUES[2] / 100,
            "prize_value_4": C.PRIZES_VALUES[3] / 100
            }

    @staticmethod
    def live_method(player: Player, data):
        if data["information_type"] == "ranking_form_submission":
            participants_priorities = data["participants_priorities"]
            prizes_priorities = data["prizes_priorities"]
            # convert dicts to lists
            enumerated_participants_priorities = convert_priorities_dict_to_list(participants_priorities)
            enumerated_prizes_priorities = convert_priorities_dict_to_list(prizes_priorities)
            # convert prize and participants names in indexes
            enumerated_prizes_priorities = convert_participants_names_to_indexes(enumerated_prizes_priorities, C.PARTICIPANTS)
            enumerated_participants_priorities = convert_prizes_names_to_indexes(enumerated_participants_priorities, C.PRIZES)
            preferences = [enumerated_participants_priorities, enumerated_prizes_priorities]
            matching = da(preferences)  # Calling the Differed-Acceptance algorithm.
            user_prize_index = matching[0][0]
            user_prize_name = C.PRIZES[user_prize_index]
            user_prize_value = C.PRIZES_VALUES[player.round_number - 1][user_prize_name]
            response = {"prize_name": user_prize_name, "prize_value": user_prize_value, "information_type": "allocation_results"}
            # save the player's ranking
            player.first_priority = str(C.PRIZES.index(participants_priorities["You"][0]) + 1)
            player.second_priority = str(C.PRIZES.index(participants_priorities["You"][1]) + 1)
            player.third_priority = str(C.PRIZES.index(participants_priorities["You"][2]) + 1)
            player.fourth_priority = str(C.PRIZES.index(participants_priorities["You"][3]) + 1)
            # save the allocated prize
            player.allocated_prize = user_prize_name
            time.sleep(2)
            return {player.id_in_group: response}

def convert_priorities_dict_to_list(priorities_dict):
    return [[priorities_dict[key][i] for i in range(len(priorities_dict[key]))] for key in priorities_dict.keys()]


def convert_prizes_names_to_indexes(prizes_priorities, prizes_list):
    return [[prizes_list.index(prizes_priorities[i][j]) for j in range(len(prizes_priorities[i]))] for i in range(len(prizes_priorities))]


def convert_participants_names_to_indexes(participants_priorities, participants_list):
    return [[participants_list.index(participants_priorities[i][j]) for j in range(len(participants_priorities[i]))] for i in
            range(len(participants_priorities))]
class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))


page_sequence = [PreProcess, NullIntro]
