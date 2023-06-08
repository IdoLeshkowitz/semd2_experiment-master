import random
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
    return {"A": 0.27, "B": 0.57, "C": 0.12, "D": 0.7}


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
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_VALUES = [generate_prizes_values() for _ in range(NUM_ROUNDS)]
    PRIZES_PRIORITIES = generate_priorities_list(PRIZES, PARTICIPANTS, NUM_ROUNDS)
    PARTICIPANTS_PRIORITIES = generate_priorities_list(PARTICIPANTS[1:], PRIZES, NUM_ROUNDS)  # for all participants except the player "You"
    QUESTIONS_ANSWERS = {"independence": "False", "value_table": "False", "self_rank_independence": "False", "competitors_rank_independence": "False"}


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Player's ranking variables
    first_priority = models.StringField()
    second_priority = models.StringField()
    third_priority = models.StringField()
    fourth_priority = models.StringField()
    allocated_prize = models.StringField()
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField()

    # Fields for saving each question's incorrect submitted answers
    independence_actions = models.LongStringField()
    value_table_actions = models.LongStringField()
    self_rank_independence_actions = models.LongStringField()
    competitors_rank_independence_actions = models.LongStringField()


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
        }  # return dict(prizes=C.PRIZES, prizes_values=C.PRIZES_VALUES[player.round_number - 1], prizes_priorities=C.PRIZE_PRIORITIES[  #     player.round_number - 1], players=C.PARTICIPANTS, players_rankings=C.PARTICIPANT_PRIORITIES[  #     player.round_number - 1], questions_answers=C.QUESTIONS_ANSWERS, round_number=player.round_number)

    @staticmethod
    def live_method(player: Player, data):
        if data["information_type"] == "ranking_form_submission":
            # save the player's ranking
            user_ranking = data["participants_priorities"]["You"]
            player.first_priority = user_ranking[0]
            player.second_priority = user_ranking[1]
            player.third_priority = user_ranking[2]
            player.fourth_priority = user_ranking[3]
            # resolve the matching
            participants_priorities = [data["participants_priorities"][participant] for participant in data["participants_priorities"]]
            prizes_priorities = [C.PRIZES_PRIORITIES[player.round_number - 1][prize] for prize in C.PRIZES_PRIORITIES[player.round_number - 1]]
            # convert prize names to indices
            for prize_priorities in prizes_priorities:
                for i, prize in enumerate(prize_priorities):
                    prize_priorities[i] = C.PARTICIPANTS.index(prize)
            for participant_priorities in participants_priorities:
                for i, prize in enumerate(participant_priorities):
                    participant_priorities[i] = C.PRIZES.index(prize)
            preferences = prizes_priorities + participants_priorities
            print(preferences)
            values = list((C.PRIZES_VALUES[player.round_number - 1]).values())
            matching = da(preferences)  # Calling the Differed-Acceptance algorithm.
            user_prize = matching[0][0]
            prizes = C.PRIZES
            response = {"prize_name": prizes[user_prize], "prize_value": values[user_prize]}
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
            return {player.id_in_group: data}

    def before_next_page(player: Player, timeout_happened):
        if player.round_number > 1:
            player.participant.understanding_bonus += 1
        player.end_time = str(datetime.now(timezone.utc))


page_sequence = [NullTraining]
