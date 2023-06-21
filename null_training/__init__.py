import random
import time
from datetime import datetime, timezone

import numpy
from otree.api import *

doc = """
Your app description
"""


# def questions_answers():
#     return {"independence": "False", "value-table": "False",
#             "self-rank-independence": "False", "competitors-rank-independence": "False"}
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
    return [{"A": 0.37, "B": 0.57, "C": 0.12, "D": 0.6},{"A": 0.28, "B": 0.56, "C": 0.05, "D": 0.42}]


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
    return {item: random.sample(second_group, len(second_group)) for item in first_group}


def generate_priorities_list(first_group, second_group, num_rounds):
    return [generate_priorities(first_group, second_group) for _ in range(num_rounds)]


def convert_priorities_dict_to_list(priorities_dict):
    return [[priorities_dict[key][i] for i in range(len(priorities_dict[key]))] for key in priorities_dict.keys()]


def convert_prizes_names_to_indexes(prizes_priorities, prizes_list):
    return [[prizes_list.index(prizes_priorities[i][j]) for j in range(len(prizes_priorities[i]))] for i in range(len(prizes_priorities))]


def convert_participants_names_to_indexes(participants_priorities, participants_list):
    return [[participants_list.index(participants_priorities[i][j]) for j in range(len(participants_priorities[i]))] for i in
            range(len(participants_priorities))]


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
    NAME_IN_URL = 'step_1_training_rounds'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 2
    PARTICIPANTS = ["You", "Ruth", "Shirley", "Theresa"]
    UNDERSTANDING_BONUS_LIMIT_BY_ROUND = [4, 1]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_VALUES = generate_prizes_values()
    PRIZES_PRIORITIES = generate_priorities_list(PRIZES, PARTICIPANTS, NUM_ROUNDS)
    PARTICIPANTS_PRIORITIES = generate_priorities_list(PARTICIPANTS[1:], PRIZES, NUM_ROUNDS)  # for all participants except the player "You"
    QUESTIONS_ANSWERS = {"independence": "False", "value_table": "False", "self_rank_independence": "False", "competitors_rank_independence": "False"}


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Player's ranking variables
    first_priority = models.StringField(blank=True)
    second_priority = models.StringField(blank=True)
    third_priority = models.StringField(blank=True)
    fourth_priority = models.StringField(blank=True)
    allocated_prize = models.StringField(blank=True)
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True)
    understanding_bonus_from_round = models.IntegerField(initial=0)

    understanding_bonus_limit = models.IntegerField(initial="")
    prizes_values = models.LongStringField(initial="", blank=True)
    prizes_priorities = models.LongStringField(initial="", blank=True)
    participants_priorities = models.LongStringField(initial="", blank=True)

    # Fields for saving each question's incorrect submitted answers
    independence_actions = models.LongStringField(blank=True, initial="")
    value_table_actions = models.LongStringField(initial="", blank=True)
    self_rank_independence_actions = models.LongStringField(initial="", blank=True)
    competitors_rank_independence_actions = models.LongStringField(initial="", blank=True)

    current_step_id = models.StringField(initial="", blank=True)
    next_step_id = models.StringField(initial="", blank=True)
    mistakes_counter = models.IntegerField(initial=0)
    ""


# PAGES
class NullTraining(Page):
    form_model = "player"

    @staticmethod
    def get_form_fields(player: Player):
        priorities = ["first_priority", "second_priority", "third_priority", "fourth_priority"]
        questions_actions = ["independence_actions", "value_table_actions", "self_rank_independence_actions", "competitors_rank_independence_actions"]
        if player.round_number == 1:
            return questions_actions + priorities
        elif player.round_number == 2:
            return questions_actions

    @staticmethod
    def js_vars(player: Player):
        return {
            "roundNumber":            player.round_number,
            "prizes":                 C.PRIZES,
            "participants":           C.PARTICIPANTS,
            "prizesPriorities":       C.PRIZES_PRIORITIES[player.round_number - 1],
            "participantsPriorities": C.PARTICIPANTS_PRIORITIES[player.round_number - 1],
            "roundNumber":            player.round_number,
            "currency":               player.session.config["currency"],
            "prizesValues":           C.PRIZES_VALUES[player.round_number - 1],
            "currentStepId":          player.current_step_id,
            "nextStepId":             player.next_step_id,
            "mistakesCounter":        player.mistakes_counter,
        }

    @staticmethod
    def live_method(player: Player, data):
        print(data)
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
        if data["information_type"] == "question_submission":
            question_id = data["question_id"]
            if question_id == "independence":
                player.independence_actions += str(data)
            elif question_id == "value_table":
                player.value_table_actions += str(data)
            elif question_id == "self_rank_independence":
                player.self_rank_independence_actions += str(data)
            elif question_id == "competitors_rank_independence":
                player.competitors_rank_independence_actions += str(data)
            understanding_bonus_from_question = data['understanding_bonus']
            player.understanding_bonus_from_round += understanding_bonus_from_question
            return {player.id_in_group: data}
        if data["information_type"] == "set_current_step":
            player.current_step_id = data["step_id"]
        if data["information_type"] == "set_next_step":
            player.next_step_id = data["step_id"]
        if data["information_type"] == "set_mistakes_counter":
            player.mistakes_counter = data["mistakes_counter"]

    def before_next_page(player: Player, timeout_happened):
        player.understanding_bonus_limit = C.UNDERSTANDING_BONUS_LIMIT_BY_ROUND[player.round_number - 1]
        player.participant.understanding_bonus_limit += player.understanding_bonus_limit
        player.prizes_values += str(C.PRIZES_VALUES[player.round_number - 1])
        player.prizes_priorities += str(C.PRIZES_PRIORITIES[player.round_number - 1])
        player.participants_priorities += str(C.PARTICIPANTS_PRIORITIES[player.round_number - 1])
        if player.round_number > 1:
            player.understanding_bonus_from_round += C.UNDERSTANDING_BONUS_LIMIT_BY_ROUND[player.round_number - 1]
        player.participant.understanding_bonus += player.understanding_bonus_from_round
        player.end_time = str(datetime.now(timezone.utc))

class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))


page_sequence = [PreProcess, NullTraining]
