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
        "A": ["Shirley", "Theresa", "You", "Ruth"],
        "B": ["Shirley", "You", "Theresa", "Ruth"],
        "C": ["Theresa", "Shirley", "You", "Ruth"],
        "D": ["You", "Theresa", "Ruth", "Shirley"]
    }
    second_round_priorities = {
        "A": ["Shirley", "Ruth", "You", "Theresa"],
        "B": ["You", "Shirley", "Ruth", "Theresa"],
        "C": ["Shirley", "Theresa", "Ruth", "You"],
        "D": ["Ruth", "You", "Theresa", "Shirley"]
    }
    third_round_priorities = {
        "A": ["Shirley", "Ruth", "You", "Theresa"],
        "B": ["Shirley", "You", "Ruth", "Theresa"],
        "C": ["Shirley", "Theresa", "Ruth", "You"],
        "D": ["Ruth", "Theresa", "You", "Shirley"]
    }
    fourth_round_priorities = {
        "A": ["Shirley", "Theresa", "Ruth", "You"],
        "B": ["You", "Shirley", "Theresa", "Ruth"],
        "C": ["Shirley", "Theresa", "Ruth", "You"],
        "D": ["Shirley", "You", "Theresa", "Ruth"]
    }
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_products_priorities_by_round(round):
    first_round_priorities = {"Ruth": ["A", "C", "D", "B"], "Shirley": ["B", "A", "C", "D"], "Theresa": ["C", "B", "A", "D"], "You": ["C", "B", "A", "D"]}
    second_round_priorities = {"Ruth": ["A", "C", "D", "B"], "Shirley": ["B", "A", "C", "D"], "Theresa": ["D", "B", "A", "C"], "You": ["A", "B", "D", "C"]}
    third_round_priorities = {"Ruth": ["C", "D", "A", "B"], "Shirley": ["B", "A", "C", "D"], "Theresa": ["D", "B", "A", "C"], "You": ["D", "B", "C", "A"]}
    fourth_round_priorities = {"Ruth": ["C", "D", "A", "B"], "Shirley": ["B", "A", "C", "D"], "Theresa": ["D", "B", "A", "C"], "You": ["D", "B", "C", "A"]}
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_expected_prizes_ranking_by_round(round):
    first_round_ranking = ["C", "B", "A", "D"]
    second_round_ranking = ["A", "B", "D", "C"]
    third_round_ranking = ["D", "B", "C", "A"]
    fourth_round_ranking = ["D", "B", "C", "A"]
    rankings = [first_round_ranking, second_round_ranking, third_round_ranking, fourth_round_ranking]
    return rankings[round - 1]


def get_correct_answers_by_round(round):
    CORRECT_ANSWERS_BY_ROUND = [[1, 4, 2, 3, 2, 2, 1, 4, 2, 3, 2, 2], [3, 2, 4, 1, 3], [2, 4, 3, 1, 2], [4, 3, 1, 2, 1]]
    return CORRECT_ANSWERS_BY_ROUND[round - 1]


def get_allocated_prizes_by_round(round):
    allocated_prizes = ["A", "B", "A", "D"]
    return allocated_prizes[round - 1]


class C(BaseConstants):
    VARIANT = "traditional"
    TREATMENT = "properties"
    NAME_IN_URL = 'properties_traditional'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 3
    UNDERSTANDING_BONUS_LIMIT = [4, 9, 9, 9]
    PARTICIPANTS = ["Ruth", "Shirley", "Theresa", "You", "Unpaired"]
    PRIZES = ["A", "B", "C", "D"]
    STEPS_IN_TRAINING_ROUND = ["intro", "prizes_table", "prizes_priorities", "ranking_form", "allocation_results"]
    MAX_PRODUCTS_PER_CUSTOMER = {"Ruth": len(PRIZES), "Theresa": len(PRIZES), "Unpaired": len(PRIZES), "Shirley": len(PRIZES), "You": 0}


class Player(BasePlayer):
    clicks = models.LongStringField()

    incorrect_seq_general_property = models.LongStringField(initial="", blank=True)
    incorrect_seq_mechanism_misconception_1 = models.LongStringField(initial="", blank=True)
    incorrect_seq_mechanism_misconception_2 = models.LongStringField(initial="", blank=True)
    incorrect_seq_different_rank_outcome = models.LongStringField(initial="", blank=True)
    # Player's ranking variables
    first_priority = models.StringField(blank=True)
    second_priority = models.StringField(blank=True)
    third_priority = models.StringField(blank=True)
    fourth_priority = models.StringField(blank=True)

    active_steps = models.LongStringField(initial="", blank=True)
    current_step_id = models.LongStringField(blank=True, initial="")
    understanding_bonus = models.IntegerField(initial=0, blank=True)
    understanding_bonus_limit = models.IntegerField(initial="", blank=True)
    matching_memo = models.LongStringField(initial=str([]), blank=True)
    current_matching = models.LongStringField(initial="", blank=True)
    prizes_priorities = models.LongStringField(initial="", blank=True)
    participants_priorities = models.LongStringField(initial="", blank=True)
    expected_ranking = models.StringField(initial="", blank=True)
    mistakes_counter = models.IntegerField(initial=0, blank=True)

    intro_start_time = models.StringField(blank=True)
    intro_end_time = models.StringField(blank=True)
    training_start_time = models.StringField(blank=True)
    training_end_time = models.StringField(blank=True)
    did_complete = models.BooleanField(initial=False, blank=True)


def GetParticpantNumber(char):
    if char == 'R':
        return 1
    elif char == 'S':
        return 2
    elif char == 'T':
        return 3
    else:
        return 4


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
            "variant":                C.VARIANT,
            "allocatedPrize":         get_allocated_prizes_by_round(player.round_number),
            "mistakesCounter":        player.mistakes_counter,
            "activeStepId":           player.current_step_id,
            "didComplete":            player.did_complete,
            "roundNumber":            player.round_number,
            "treatment":              C.TREATMENT,
        }

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.training_end_time = str(datetime.now(timezone.utc))
        player.participant.understanding_bonus += player.understanding_bonus
        player.participant.understanding_bonus_limit += player.understanding_bonus_limit

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        action = data["action"]
        if action == "setActiveStepId":
            player.current_step_id = data["stepId"]
        if action == "addUnderstandingBonus":
            player.understanding_bonus += data["bonus"]
        if action == "addMistake":
            player.mistakes_counter += 1
        if action == "resetMistakes":
            player.mistakes_counter = 0
        if action == "setCompleted":
            player.did_complete = True
        if action == "submit_question":
            question_id = data["question_id"]
            if question_id == "general_property":
                player.incorrect_seq_general_property = str(data)
            elif question_id == "mechanism_misconception_1":
                player.incorrect_seq_mechanism_misconception_1 += str(data)
            elif question_id == "mechanism_misconception_2":
                player.incorrect_seq_mechanism_misconception_2 += str(data)
            elif question_id == "different_rank_outcome":
                player.incorrect_seq_different_rank_outcome += str(data)


class Intro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

    @staticmethod
    def js_vars(player: Player):
        return {'variant': C.VARIANT, "treatment": C.TREATMENT}

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.intro_end_time = str(datetime.now(timezone.utc))
        player.training_start_time = str(datetime.now(timezone.utc))


class EndTraining(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == C.NUM_ROUNDS


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        if player.round_number == 1:
            player.intro_start_time = str(datetime.now(timezone.utc))
        else:
            player.training_start_time = str(datetime.now(timezone.utc))

        def get_current_matching_by_variant(variant):
            if variant == "menu":
                return str({prize_name: 'none' for prize_name in C.PRIZES})
            if variant == "traditional":
                return str({participant_name: 'none' for participant_name in C.PRIZES})

        player.current_matching = get_current_matching_by_variant(C.VARIANT)
        player.matching_memo = str([])
        player.prizes_priorities = str(get_customers_priorities_by_round(player.round_number))
        player.participants_priorities = str(get_products_priorities_by_round(player.round_number))
        player.expected_ranking = str(get_expected_prizes_ranking_by_round(player.round_number))
        player.understanding_bonus_limit = C.UNDERSTANDING_BONUS_LIMIT[player.round_number - 1]


page_sequence = [PreProcess, Intro, TrainingRound, EndTraining]
