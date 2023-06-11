from otree.api import *
from datetime import datetime, timezone

doc = """
Your app description
"""


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


def make_question_1():
    return models.IntegerField(blank=True, choices=[[1, "It is determined at random."], [2, "The participant who got paired to Prize A first."],
                                                    [3, "The participant for whom Prize A is in is in the highest rank."],
                                                    [4, "The participant highest in Prize A’s priorities."]], label='', widget=widgets.RadioSelect)


def make_question_2():
    return models.IntegerField(blank=True, choices=[[1, "A random prize that is currently unpaired to any participant."],
                                                    [2, "Their highest-rank prize among the prizes they were not yet paired with."],
                                                    [3, "Their highest-rank prize."]], label='Answer', widget=widgets.RadioSelect)


def make_question_3():
    return models.IntegerField(blank=True, choices=[[1, "No, there are new conflicts: two (or more) participants are paired to the same prize."],
                                                    [2, "No, some participants are paired to prizes that are not in their highest rank."], [3,
                                                                                                                                            "Yes, it is fine that two (or more) participants are paired to the same prize because they all get different amounts of money anyway."],
                                                    [4, "Yes, there are no more conflicts"]], label='Answer', widget=widgets.RadioSelect)


def make_question_4():
    return models.IntegerField(blank=True, choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_5():
    return models.IntegerField(blank=True, choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_6():
    return models.IntegerField(blank=True, choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_7():
    return models.IntegerField(blank=True, choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_8():
    return models.IntegerField(blank=True, choices=[
        [1, "I can get any prize that I was paired with at some point in the allocation process, with equal chances."],
        [2, "It is certain that I will get the prize allocated to me at the end of the allocation process."],
        [3, "I can only get one of the prizes I was paired with at some point in the allocation process, but I cannot know which one."], [4,
                                                                                                                                          "I am more likely to get a prize I was paired with at an earlier point in the allocation process than at a later point in the process."], ], label='Answer', widget=widgets.RadioSelect)


def make_question_9():
    return models.IntegerField(blank=True, choices=[
        [1, "I will sometimes receive a prize which I ranked lower than any prize I was paired with during the allocation process."],
        [2, "Out of all the prizes I was paired with at some point in the allocation process, I will get the last one I was paired with."],
        [3, "If another participant does not want the prize allocated to them, then I may be able to switch prizes with them."], [4,
                                                                                                                                  "I am as likely to get a prize I was paired with at a later point in the allocation process as to get a prize I was paired with at an earlier point in the process"]], label='', widget=widgets.RadioSelect)


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
    first_round_priorities = {"R": ["A", "C", "D", "B"], "S": ["A", "C", "D", "B"], "T": ["B", "A", "D", "C"], "Y": ["C", "A", "B", "D"]}
    second_round_priorities = {"R": ["D", "C", "B", "A"], "S": ["B", "C", "A", "D"], "T": ["B", "A", "D", "C"], "Y": ["D", "A", "C", "B"]}
    third_round_priorities = {"R": ["D", "A", "B", "C"], "S": ["C", "B", "A", "D"], "T": ["C", "D", "A", "B"], "Y": ["D", "C", "B", "A"]}
    fourth_round_priorities = {"R": ["C", "A", "B", "D"], "S": ["A", "D", "C", "B"], "T": ["A", "D", "B", "C"], "Y": ["C", "D", "A", "B"]}
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_expected_prizes_ranking_by_round(round):
    first_round_ranking = [2, 0, 1, 3]
    second_round_ranking = [3, 0, 2, 1]
    third_round_ranking = [3, 2, 1, 0]
    fourth_round_ranking = [2, 3, 0, 1]
    rankings = [first_round_ranking, second_round_ranking, third_round_ranking, fourth_round_ranking]
    return rankings[round - 1]


def get_correct_answers_by_round(round):
    CORRECT_ANSWERS_BY_ROUND = [[4, 2, 1, 1, 1, 1, 2, 2, 1, 4, 2, 3, 2, 2, 1, 4, 2, 3, 2, 2], [3, 2, 4, 1, 3], [2, 4, 3, 1, 2], [4, 3, 1, 2, 1]]
    return CORRECT_ANSWERS_BY_ROUND[round - 1]


def get_expected_matching_by_round(round):
    EXPECTED_MATCHING_BY_ROUND = [
        [{'Ruth': "A", 'Shirley': 'none', 'Theresa': 'none', 'You': 'none'}, {"Ruth": "A", "Shirley": "A", "Theresa": "B", "You": "C"},
         {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "C"}, {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "A"},
         {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "B"}, {"Ruth": "A", "Shirley": "C", "Theresa": "A", "You": "B"},
         {"Ruth": "A", "Shirley": "C", "Theresa": "D", "You": "B"}], [{'Ruth': "D", "Shirley": "B", "Theresa": "A", "You": "C"}],
        [{'Ruth': "D", "Shirley": "A", "Theresa": "C", "You": "B"}], [{'Ruth': "C", "Shirley": "D", "Theresa": "B", "You": "A"}]]
    return EXPECTED_MATCHING_BY_ROUND[round - 1]


class C(BaseConstants):
    NAME_IN_URL = 'mechanics_traditional'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 4
    NUMBER_OF_PARTICIPANTS = 4
    CUSTOMERS = ["Ruth", "Shirley", "Theresa", "You"]
    MAX_PARTICIPANTS_BY_CUSTOMER = {"A": NUMBER_OF_PARTICIPANTS, "B": NUMBER_OF_PARTICIPANTS, "C": NUMBER_OF_PARTICIPANTS, "D": NUMBER_OF_PARTICIPANTS}


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
    incorrect_seq_obtainable = models.LongStringField(initial="", blank=True)
    incorrect_seq_allocated_prize = models.LongStringField(initial="", blank=True)

    # Player's ranking variables
    first_priority = models.StringField(blank=True)
    second_priority = models.StringField(blank=True)
    third_priority = models.StringField(blank=True)
    fourth_priority = models.StringField(blank=True)

    current_step = models.LongStringField(blank=True)
    matching_counter = models.IntegerField(initial=0)
    understanding_bonus = models.IntegerField(initial=0)
    start_time = models.StringField(initial=datetime.now(timezone.utc))
    end_time = models.StringField(blank=True)


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
            "prizesPriorities":       get_customers_priorities_by_round(player.round_number),
            "participantsPriorities": get_products_priorities_by_round(player.round_number),
            "prizesNames":            C.PRIZES_NAMES,
            "participantsNames":      C.PARTICIPANTS_NUMBERS,
            "expectedRanking":        get_expected_prizes_ranking_by_round(player.round_number),
            "participantsFullNames":  C.PARTICIPANTS_FULL_NAMES,
        }

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        # Setting the field so that it is not empty.
        player.time_stamps = 'L:'
        # initialize clicks
        player.clicks = ''
        player.participant.current_matching = {participant_name: 'none' for participant_name in C.PARTICIPANTS_NUMBERS}
        # the priorities of each prize .
        player.participant.prizes_priorities = get_customers_priorities_by_round(player.round_number)
        # the priorities of each participant .
        player.participant.participants_priorities = get_products_priorities_by_round(player.round_number)
        player.participant.expected_ranking = get_expected_prizes_ranking_by_round(player.round_number)
        player.participant.matching_memo = []


class DAalghoInterface(Page):
    form_model = "player"

    @staticmethod
    def vars_for_template(player: Player):
        return {
            "prizesPriorities":       player.participant.prizes_priorities,
            "participantsPriorities": player.participant.participants_priorities,
            "prizesNames":            C.PRIZES_NAMES,
            "participantsNames":      C.PARTICIPANTS_NUMBERS,
        }

    @staticmethod
    def js_vars(player: Player):
        return {
            "matchingMemo":            player.participant.matching_memo,
            "currentMatching":         player.participant.current_matching,
            "customersPriorities":     player.participant.prizes_priorities,
            "productsPriorities":      player.participant.participants_priorities,
            "prizesNames":             C.PRIZES_NAMES,
            "participantsNumbers":     C.PARTICIPANTS_NUMBERS,
            "maxParticipantsPerPrize": C.MAX_PARTICIPANTS_BY_CUSTOMER,
            "currentStep":             player.field_maybe_none("current_step"),
            "currentRound":            player.round_number,
            "correctAnswers":          C.CORRECT_ANSWERS_BY_ROUND[player.round_number - 1],
            "expectedMatchingByRound": C.EXPECTED_MATCHING_BY_ROUND[player.round_number - 1],
            "participantsFullNames":   C.PARTICIPANTS_FULL_NAMES,
            "interfaceType":           "traditional",
        }

    @staticmethod
    def get_form_fields(player: Player):
        if player.round_number == 1:
            questions = ["question_1", "question_2", "question_3", "question_4", "question_5", "question_6", "question_7", "question_8", "prize_a_obtainable",
                         "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "question_9", "question_10"]

            return questions

        else:
            questions = ["prize_a_obtainable", "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "obtainable_prize"]
            return questions

    @staticmethod
    def live_method(player: Player, data):
        print(data)
        # onload event
        if data['information_type'] == 'onload':
            player.time_stamps = player.time_stamps + '|R:' + str(data['time'])
            player.clicks = player.clicks + '|load'
        # end event
        elif data['information_type'] == 'onend':
            player.time_stamps = player.time_stamps + '|F:' + str(data['time'])
            player.clicks = player.clicks + '||'
            return {player.id_in_group: {'information_type': 'submit'}}
        elif data['information_type'] == 'matching_submission':
            matching = data['matching']
            is_correct = data['is_correct']
            understanding_bonus = data['understanding_bonus']
            player.clicks += '|submit'
            stage = data['stage']

            def create_submission_string(matching, is_correct, understanding_bonus):
                def get_correct_matching_string(is_correct):
                    if is_correct:
                        return 'correct'
                    else:
                        return 'incorrect'

                return f"[{str(matching)},{str(get_correct_matching_string(is_correct))},{str(understanding_bonus)}]"

            if stage == 0:
                player.allocation_dashboard_question_1 += create_submission_string(matching, is_correct, understanding_bonus)
            elif stage == 1:
                player.allocation_dashboard_question_2 += create_submission_string(matching, is_correct, understanding_bonus)
            elif stage == 2:
                player.allocation_dashboard_question_3 += create_submission_string(matching, is_correct, understanding_bonus)
            elif stage == 3:
                player.allocation_dashboard_question_4 += create_submission_string(matching, is_correct, understanding_bonus)
            player.participant.understanding_bonus += understanding_bonus
        elif data['information_type'] == 'question_submission':
            question_id = data['question_id']
            answer = data['answer']
            is_correct = data['is_correct']
            understanding_bonus = data['understanding_bonus']
            player.participant.understanding_bonus += understanding_bonus

            def create_question_submission_string(answer, is_correct, understanding_bonus):
                def get_correct_answer_string(is_correct):
                    if is_correct:
                        return 'correct'
                    else:
                        return 'incorrect'

                return f"[{str(answer)},{str(get_correct_answer_string(is_correct))},{str(understanding_bonus)}]"

            if question_id == "question_1":
                player.incorrect_seq_question_1 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_2":
                player.incorrect_seq_question_2 += create_question_submission_string(answer, is_correct, understanding_bonus)
                print(player.incorrect_seq_question_2)
            elif question_id == "question_3":
                player.incorrect_seq_question_3 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_4":
                player.incorrect_seq_question_4 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_5":
                player.incorrect_seq_question_5 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_6":
                player.incorrect_seq_question_6 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_7":
                player.incorrect_seq_question_7 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_8":
                player.incorrect_seq_question_8 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_9":
                player.incorrect_seq_question_9 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "question_10":
                player.incorrect_seq_question_10 += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "prize_a_obtainable":
                player.incorrect_seq_prize_a_obtainable += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "prize_b_obtainable":
                player.incorrect_seq_prize_b_obtainable += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "prize_c_obtainable":
                player.incorrect_seq_prize_c_obtainable += create_question_submission_string(answer, is_correct, understanding_bonus)
            elif question_id == "prize_d_obtainable":
                player.incorrect_seq_prize_d_obtainable += create_question_submission_string(answer, is_correct, understanding_bonus)
        elif data['information_type'] == 'matching_update':
            """
            this event is called when the user clicks on a participant to match
            expecting data to include : 
                1. participant_to_match
                2. match_to_prize
            """
            participant_to_match = data['participant_to_match']
            match_to_prize = data['match_to_prize']
            player.clicks += '|' + participant_to_match + ':' + match_to_prize
            player.participant.current_matching = data['matching']
            player.participant.matching_memo = data['matching_memo']
        elif data['information_type'] == 'set_step':
            step = data['step']
            player.current_step = step
            pass
        elif data['information_type'] == "reset":
            player.clicks += '|reset'
            player.participant.current_matching = {participant_name: 'none' for participant_name in C.PARTICIPANTS_NUMBERS}
            player.participant.matching_memo = []

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        # reset the current step
        player.current_step = ""


class MechanicsIntro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


class EndTraining(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == C.NUM_ROUNDS


page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface, EndTraining]
