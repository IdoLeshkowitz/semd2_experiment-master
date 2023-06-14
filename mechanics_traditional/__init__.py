from otree.api import *
from datetime import datetime, timezone

doc = """
Your app description
"""


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


def get_customers_priorities_by_round(round):
    first_round_priorities = {
        "A": ["Ruth", "Shirley", "Theresa", "You"],
        "B": ["Ruth", "Shirley", "You", "Theresa"],
        "C": ["Shirley", "Theresa", "Ruth", "You"],
        "D": ["You", "Theresa", "Shirley", "Ruth"]
    }
    second_round_priorities = {
        "A": ["Theresa", "You", "Shirley", "Ruth"],
        "B": ["Shirley", "Theresa", "You", "Ruth"],
        "C": ["Shirley", "You", "Ruth", "Theresa"],
        "D": ["Theresa", "Ruth", "You", "Shirley"]
    }
    third_round_priorities = {
        "A": ["Ruth", "Shirley", "Theresa", "You"],
        "B": ["Ruth", "You", "Shirley", "Theresa"],
        "C": ["Theresa", "You", "Shirley", "Ruth"],
        "D": ["Theresa", "Shirley", "Ruth", "You"]
    }
    fourth_round_priorities = {
        "A": ["Ruth", "You", "Shirley", "Theresa"],
        "B": ["Shirley", "You", "Theresa", "Ruth"],
        "C": ["Ruth", "You", "Theresa", "Shirley"],
        "D": ["Shirley", "Theresa", "You", "Ruth"]
    }
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_products_priorities_by_round(round):
    first_round_priorities = {"Ruth": ["A", "C", "D", "B"], "Shirley": ["A", "C", "D", "B"], "Theresa": ["B", "A", "D", "C"], "You": ["C", "A", "B", "D"]}
    second_round_priorities = {"Ruth": ["D", "C", "B", "A"], "Shirley": ["B", "C", "A", "D"], "Theresa": ["B", "A", "D", "C"], "You": ["D", "A", "C", "B"]}
    third_round_priorities = {"Ruth": ["D", "A", "B", "C"], "Shirley": ["C", "B", "A", "D"], "Theresa": ["C", "D", "A", "B"], "You": ["D", "C", "B", "A"]}
    fourth_round_priorities = {"Ruth": ["C", "A", "B", "D"], "Shirley": ["A", "D", "C", "B"], "Theresa": ["A", "D", "B", "C"], "You": ["C", "D", "A", "B"]}
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_expected_prizes_ranking_by_round(round):
    first_round_ranking = ["C", "A", "B", "D"]
    second_round_ranking = ["D", "A", "C", "B"]
    third_round_ranking = ["D", "C", "B", "A"]
    fourth_round_ranking = ["C", "D", "A", "B"]
    rankings = [first_round_ranking, second_round_ranking, third_round_ranking, fourth_round_ranking]
    return rankings[round - 1]


def get_correct_answers_by_round(round):
    CORRECT_ANSWERS_BY_ROUND = [[ 1, 4, 2, 3, 2, 2, 1, 4, 2, 3, 2, 2], [3, 2, 4, 1, 3], [2, 4, 3, 1, 2], [4, 3, 1, 2, 1]]
    return CORRECT_ANSWERS_BY_ROUND[round - 1]



class C(BaseConstants):
    VARIANT = "traditional"
    NAME_IN_URL = 'mechanics_traditional'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 4
    PARTICIPANTS = ["Ruth", "Shirley", "Theresa", "You"]
    PRIZES = ["A", "B", "C", "D"]
    STEPS_IN_TRAINING_ROUND = ["intro", "prizes_table", "prizes_priorities", "ranking_form", "allocation_results"]
    MAX_PRODUCTS_PER_CUSTOMER = {"A": len(PARTICIPANTS), "B": len(PARTICIPANTS), "C": len(PARTICIPANTS), "D": len(PARTICIPANTS)}


class Player(BasePlayer):
    clicks = models.LongStringField()

    incorrect_seq_question_1 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_2 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_3 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_4 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_5 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_6 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_7 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_8 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_9 = models.LongStringField(initial="", blank=True)
    incorrect_seq_question_10 = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocation_a = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocation_b = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocation_c = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocation_d = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocated_prize = models.LongStringField(initial="", blank=True)
    incorrect_seq_matching = models.LongStringField(initial="", blank=True)
    # Player's ranking variables
    first_priority = models.StringField(blank=True)
    second_priority = models.StringField(blank=True)
    third_priority = models.StringField(blank=True)
    fourth_priority = models.StringField(blank=True)

    active_steps = models.LongStringField(initial="", blank=True)
    current_step_id = models.LongStringField(blank=True, initial="")
    understanding_bonus = models.IntegerField(initial=0, blank=True)
    understanding_bonus_limit = models.IntegerField(initial=0, blank=True)
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True)
    matching_memo = models.LongStringField(initial=str([]), blank=True)
    current_matching = models.LongStringField(initial="", blank=True)
    prizes_priorities = models.LongStringField(initial="", blank=True)
    participants_priorities = models.LongStringField(initial="", blank=True)
    matching_counter = models.IntegerField(initial=0, blank=True)
    expected_ranking = models.StringField(initial="", blank=True)


def GetParticpantNumber(char):
    if char == 'R':
        return 1
    elif char == 'S':
        return 2
    elif char == 'T':
        return 3
    else:
        return 4


class DAalghoIntro(Page):
    form_model = 'player'
    form_fields = ['SchoolsNumber', 'StudentsNumber', ]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):  # EXPLANATION:
        player.time_stamps = 'L:'  # Setting the field so that it is not empty.
        player.clicks = '||'  # Setting the field so that it is not empty.
        player.participant.prizes_priorities = str(get_customers_priorities_by_round(player.round_number))
        # the priorities of each participant .
        player.participant.participants_priorities = str(get_products_priorities_by_round(player.round_number))
        # set expected ranking
        player.participant.expected_ranking = get_expected_prizes_ranking_by_round(player.round_number)


class DAalghoIntro2(Page):
    form_model = 'player'

    @staticmethod
    def get_form_fields(player):
        max_list = ['MaxStudentsA', 'MaxStudentsB', 'MaxStudentsC', 'MaxStudentsD', 'MaxStudentsE']
        n = player.number_of_Schools
        return max_list[0:n]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):  # EXPLANATION:
        # the priorities of each prize .
        player.participant.prizes_priorities = str(get_customers_priorities_by_round(player.round_number))
        # the priorities of each participant .
        player.paticipant.participants_priorities = str(get_products_priorities_by_round(player.round_number))
        # set expected ranking
        player.paticipant.expected_ranking = get_expected_prizes_ranking_by_round(player.round_number)


class TrainingRound(Page):
    form_model = "player"

    @staticmethod
    def get_form_fields(player: Player):
        priorities = ["first_priority", "second_priority", "third_priority", "fourth_priority", ]
        return priorities

    @staticmethod
    def js_vars(player: Player):
        return {
            "steps":                  C.STEPS_IN_TRAINING_ROUND,
            "currency":               player.session.config["currency"],
            "prizesPriorities":       get_customers_priorities_by_round(player.round_number),
            "participantsPriorities": get_products_priorities_by_round(player.round_number),
            "expectedRanking":        get_expected_prizes_ranking_by_round(player.round_number),
            "prizes":                 C.PRIZES,
            "participants":           C.PARTICIPANTS,
            "currentStep":            player.current_step_id,
        }

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.clicks = ''
        player.current_matching = str({participant_name: 'none' for participant_name in C.PARTICIPANTS})
        player.matching_memo = str([])


class DAalghoInterface(Page):
    form_model = "player"

    @staticmethod
    def js_vars(player: Player):
        return {
            "prizesPriorities":       get_customers_priorities_by_round(player.round_number),
            "participantsPriorities": get_products_priorities_by_round(player.round_number),
            "expectedRanking":        get_expected_prizes_ranking_by_round(player.round_number),
            "prizes":                 C.PRIZES,
            "participants":           C.PARTICIPANTS,
            "matchingMemo":           player.matching_memo,
            "currentMatching":        player.current_matching,
            "maxProductsPerCustomer": C.MAX_PRODUCTS_PER_CUSTOMER,
            "round":                  player.round_number,
            "variant":                C.VARIANT,
            "currentStepId":          player.current_step_id,
            "matchingCounter":        player.matching_counter,
        }

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        if data['information_type'] == 'matching_submission':
            understanding_bonus = data['understanding_bonus']
            player.clicks += '|submit'
            player.understanding_bonus += understanding_bonus
            player.incorrect_seq_matching += str(data)
            matching_counter = data['matching_counter']
            player.matching_counter = matching_counter
        elif data['information_type'] == 'question_submission':
            question_id = data['question_id']
            understanding_bonus = data['understanding_bonus']
            player.understanding_bonus += understanding_bonus
            matching_counter = data['matching_counter']
            player.matching_counter = matching_counter
            def create_question_submission_string(data):
                return str(data)
            if question_id == "question_1":
                player.incorrect_seq_question_1 += create_question_submission_string(data)
            elif question_id == "question_2":
                player.incorrect_seq_question_2 += create_question_submission_string(data)
            elif question_id == "question_3":
                player.incorrect_seq_question_3 += create_question_submission_string(data)
            elif question_id == "question_4":
                player.incorrect_seq_question_4 += create_question_submission_string(data)
            elif question_id == "question_5":
                player.incorrect_seq_question_5 += create_question_submission_string(data)
            elif question_id == "question_6":
                player.incorrect_seq_question_6 += create_question_submission_string(data)
            elif question_id == "question_7":
                player.incorrect_seq_question_7 += create_question_submission_string(data)
            elif question_id == "question_8":
                player.incorrect_seq_question_8 += create_question_submission_string(data)
            elif question_id == "question_9":
                player.incorrect_seq_question_9 += create_question_submission_string(data)
            elif question_id == "question_10":
                player.incorrect_seq_question_10 += create_question_submission_string(data)
            elif question_id == "question_allocation_a":
                player.incorrect_seq_allocation_a += create_question_submission_string(data)
            elif question_id == "question_allocation_b":
                player.incorrect_seq_allocation_b += create_question_submission_string(data)
            elif question_id == "question_allocation_c":
                player.incorrect_seq_allocation_c += create_question_submission_string(data)
            elif question_id == "question_allocation_d":
                player.incorrect_seq_allocation_d += create_question_submission_string(data)
            elif question_id == "allocated_prize":
                player.incorrect_seq_allocated_prize += create_question_submission_string(data)
        elif data['information_type'] == 'matching_update':
            """
            this event is called when the user clicks on a participant to match
            expecting data to include : 
                1. participant_to_match
                2. match_to_prize
            """
            def find_diff_in_matching(old_matching, new_matching):
                old_matching = eval(old_matching)
                for product in old_matching:
                    if old_matching[product] != new_matching[product]:
                        return [product, new_matching[product]]
                return None
            if find_diff_in_matching(player.current_matching, data["current_matching"]) == None:
                return
            [participant_to_match, match_to_prize] = find_diff_in_matching(player.current_matching, data["current_matching"])
            player.clicks += '|' + participant_to_match + ':' + match_to_prize
            player.current_matching = str(data['current_matching'])
        elif data['information_type'] == 'set_step':
            step = data['step']
            player.current_step = step
            pass
        elif data['information_type'] == "reset":
            player.clicks += '|reset'
            player.participant.current_matching = {participant_name: 'none' for participant_name in C.PARTICIPANTS_NUMBERS}
            player.participant.matching_memo = []
        elif data["information_type"] == "matching_memo_update":
            new_memo = data["matching_memo"]
            player.matching_memo = str(new_memo)
        elif data["information_type"] == "matching_counter_update":
            new_counter = data["matching_counter"]
            player.matching_counter = new_counter
        elif data["information_type"] == "step_update":
            step_id = data["step_id"]
            player.current_step_id = step_id

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.participant.understanding_bonus += player.understanding_bonus

class MechanicsIntro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.prizes_priorities = str(get_customers_priorities_by_round(player.round_number))
        player.participants_priorities = str(get_products_priorities_by_round(player.round_number))
        player.expected_ranking = str(get_expected_prizes_ranking_by_round(player.round_number))

class EndTraining(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == C.NUM_ROUNDS


page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface, EndTraining]
