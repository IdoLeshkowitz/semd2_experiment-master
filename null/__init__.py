from datetime import datetime, timezone

from otree.api import *
import time, random
import numpy

doc = """
Your app description
"""


def generate_prizes_values(round_number, pageName):
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
    if pageName == "intro":
        return {"A": 0.37, "B": 0.07, "C": 0.57, "D": 0.25}
    # TODO: This function needs to be randomized.
    #       I also think it would be more robust to get the
    #       get the list of prizes (or just its length) and
    #       adjust the values list accordingly.
    all_rounds = {
        1: {"A": 0.37, "B": 0.07, "C": 0.25, "D": 0.57},
        2: {"A": 0.15, "B": 0.58, "C": 0.08, "D": 0.43},
        3: {"A": 0.32, "B": 0.06, "C": 0.39, "D": 0.58},
        4: {"A": 0.56, "B": 0.20, "C": 0.06, "D": 0.41},
    }
    return all_rounds[round_number]


def generate_prizes_priorities(roundNumber, pageName):
    if pageName == "intro":
        return {
            "A": ["Ruth", "Shirley", "You", "Theresa"],
            "B": ["Shirley", "You", "Theresa", "Ruth"],
            "C": ["Theresa", "Shirley", "You", "Ruth"],
            "D": ["You", "Theresa", "Ruth", "Shirley"]
        }
    all_rounds = {
        1: {
            "A": ["You", "Shirley", "Theresa", "Ruth"],
            "B": ["Theresa", "You", "Shirley", "Ruth"],
            "C": ["Shirley", "Ruth", "Theresa", "You"],
            "D": ["Ruth", "You", "Theresa", "Shirley"]
        },
        2: {
            "A": ["You", "Shirley", "Theresa", "Ruth"],
            "B": ["You", "Theresa", "Shirley", "Ruth"],
            "C": ["Shirley", "Ruth", "Theresa", "You"],
            "D": ["Theresa", "Ruth", "You", "Shirley"]
        },
        3: {
            "A": ["Shirley", "Ruth", "You", "Theresa"],
            "B": ["Theresa", "You", "Ruth", "Shirley"],
            "C": ["Ruth", "Theresa", "Shirley", "You"],
            "D": ["Shirley", "Ruth", "Theresa", "You"]
        },
        4: {
            "A": ["You", "Shirley", "Ruth", "Theresa"],
            "B": ["You", "Shirley", "Theresa", "Ruth"],
            "C": ["Theresa", "You", "Ruth", "Shirley"],
            "D": ["Theresa", "You", "Shirley", "Ruth"]
        }
    }
    return all_rounds[roundNumber]


def generate_participants_priorities(roundNumber, pageName):
    if pageName == "intro":
        return {"Ruth": ["D", "A", "C", "B"], "Shirley": ["D", "C", "A", "B"], "Theresa": ["C", "B", "A", "D"]}
    all_rounds = {
        1: {"Ruth": ["D", "A", "C", "B"], "Shirley": ["D", "C", "A", "B"], "Theresa": ["A", "B", "C", "D"]},
        2: {"Ruth": ["D", "A", "C", "B"], "Shirley": ["D", "C", "A", "B"], "Theresa": ["A", "B", "C", "D"]},
        3: {"Ruth": ["D", "C", "A", "B"], "Shirley": ["A", "D", "C", "B"], "Theresa": ["A", "D", "B", "C"]},
        4: {"Ruth": ["A", "D", "B", "C"], "Shirley": ["A", "B", "C", "D"], "Theresa": ["A", "D", "B", "C"]}
    }
    return all_rounds[roundNumber]


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
    variant = "null"
    NAME_IN_URL = 'null'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 4
    PARTICIPANTS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    UNDERSTANDING_BONUS_LIMIT_BY_ROUND = [4, 1, 1, 1]


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Player's ranking variables
    first_priority_intro = models.StringField(blank=True)
    second_priority_intro = models.StringField(blank=True)
    third_priority_intro = models.StringField(blank=True)
    fourth_priority_intro = models.StringField(blank=True)
    first_priority_training = models.StringField(blank=True)
    second_priority_training = models.StringField(blank=True)
    third_priority_training = models.StringField(blank=True)
    fourth_priority_training = models.StringField(blank=True)
    allocated_prize_intro = models.StringField(blank=True, initial="")
    allocated_prize_training = models.StringField(blank=True, initial="")

    start_time_intro = models.StringField(initial=datetime.now(timezone.utc))
    end_time_intro = models.StringField(blank=True)
    start_time_training = models.StringField(initial=datetime.now(timezone.utc))
    end_time_training = models.StringField(blank=True)
    understanding_bonus_from_round = models.IntegerField(initial=0)
    understanding_bonus_limit = models.IntegerField(initial="")

    prizes_values_intro = models.LongStringField(initial="", blank=True)
    prizes_priorities_intro = models.LongStringField(initial="", blank=True)
    participants_priorities_intro = models.LongStringField(initial="", blank=True)
    prizes_values_training = models.LongStringField(initial="", blank=True)
    prizes_priorities_training = models.LongStringField(initial="", blank=True)
    participants_priorities_training = models.LongStringField(initial="", blank=True)

    independence_actions = models.LongStringField(blank=True, initial="")
    value_table_actions = models.LongStringField(initial="", blank=True)
    self_rank_independence_actions = models.LongStringField(initial="", blank=True)
    competitors_rank_independence_actions = models.LongStringField(initial="", blank=True)

    current_step_id = models.StringField(initial="", blank=True)
    next_step_id = models.StringField(initial="", blank=True)
    mistakes_counter = models.IntegerField(initial=0)


def convert_participant_index_to_name(index):
    return C.PARTICIPANTS[index]


def convert_prize_index_to_name(index):
    return C.PRIZES[index]


# PAGES
class NullIntro(Page):
    form_model = "player"
    form_fields = ["first_priority_intro", "second_priority_intro", "third_priority_intro", "fourth_priority_intro"]

    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

    @staticmethod
    def js_vars(player: Player):
        return {
            "prizes":                  C.PRIZES,
            "participants":            C.PARTICIPANTS,
            "prizes_values":           generate_prizes_values(player.round_number, "intro"),
            "prizes_priorities":       generate_prizes_priorities(player.round_number, "intro"),
            "participants_priorities": generate_participants_priorities(player.round_number, "intro"),
            "currency":                player.session.config["currency"],
            "variant":                 C.variant,
            "appName":                 "null"
        }

    def before_next_page(player: Player, timeout_happened):
        player.participants_priorities_intro = str(generate_participants_priorities(player.round_number, "intro"))
        player.prizes_priorities_intro = str(generate_prizes_priorities(player.round_number, "intro"))
        player.prizes_values_intro = str(generate_prizes_values(player.round_number, "intro"))
        player.end_time_intro = str(datetime.now(timezone.utc))
        player.start_time_training = str(datetime.now(timezone.utc))

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        time.sleep(2)
        preferences = data["preferences"]
        user_ranking = data["preferences"][0][0]
        player.first_priority_intro = C.PRIZES[user_ranking[0]]
        player.second_priority_intro = C.PRIZES[user_ranking[1]]
        player.third_priority_intro = C.PRIZES[user_ranking[2]]
        player.fourth_priority_intro = C.PRIZES[user_ranking[3]]
        matching = da(preferences)  # Calling the Differed-Acceptance algorithm.
        user_prize = matching[0][0]
        player.allocated_prize_intro = C.PRIZES[user_prize]
        prizes_values = generate_prizes_values(player.round_number, "intro")
        user_prize_value = prizes_values[player.allocated_prize_intro]
        return {player.id_in_group: {"prize": player.allocated_prize_intro, "value": user_prize_value}}


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
        player.start_time_intro = str(datetime.now(timezone.utc))


class NullTraining(Page):
    form_model = "player"

    # @staticmethod
    # def get_form_fields(player: Player):
    #     priorities = ["first_priority_training", "second_priority_training", "third_priority_training", "fourth_priority_training"]
    #     return priorities

    @staticmethod
    def js_vars(player: Player):
        return {
            "prizes":                 C.PRIZES,
            "participants":           C.PARTICIPANTS,
            "prizesPriorities":       generate_prizes_priorities(player.round_number, "training"),
            "participantsPriorities": generate_participants_priorities(player.round_number, "training"),
            "prizesValues":           generate_prizes_values(player.round_number, "training"),
            "roundNumber":            player.round_number,
            "currentStepId":          player.current_step_id,
            "nextStepId":             player.next_step_id,
            "mistakesCounter":        player.mistakes_counter,
            "currency":               player.session.config["currency"],
            "allocatedPrize":         player.allocated_prize_training,
            "variant":                C.variant,
            "appName":                "null"
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
            prizes_values = generate_prizes_values(player.round_number, "training")
            user_prize_value = prizes_values[user_prize_name]
            response = {"prize_name": user_prize_name, "prize_value": user_prize_value, "information_type": "allocation_results"}
            # save the player's ranking
            player.first_priority_training = str(C.PRIZES.index(participants_priorities["You"][0]) + 1)
            player.second_priority_training = str(C.PRIZES.index(participants_priorities["You"][1]) + 1)
            player.third_priority_training = str(C.PRIZES.index(participants_priorities["You"][2]) + 1)
            player.fourth_priority_training = str(C.PRIZES.index(participants_priorities["You"][3]) + 1)
            # save the allocated prize
            player.allocated_prize_training = user_prize_name
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

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        prizes_values = generate_prizes_values(player.round_number, "training")
        prizes_priorities = generate_prizes_priorities(player.round_number, "training")
        participants_priorities = generate_participants_priorities(player.round_number, "training")
        player.understanding_bonus_limit = C.UNDERSTANDING_BONUS_LIMIT_BY_ROUND[player.round_number - 1]
        player.participant.understanding_bonus_limit += player.understanding_bonus_limit
        player.prizes_values_training = str(prizes_values)
        player.prizes_priorities_training = str(prizes_priorities)
        player.participants_priorities_training = str(participants_priorities)
        if player.round_number != 1:
            player.understanding_bonus_from_round += C.UNDERSTANDING_BONUS_LIMIT_BY_ROUND[player.round_number - 1]
        player.participant.understanding_bonus += player.understanding_bonus_from_round
        player.end_time_training = str(datetime.now(timezone.utc))


page_sequence = [PreProcess, NullIntro, NullTraining]
