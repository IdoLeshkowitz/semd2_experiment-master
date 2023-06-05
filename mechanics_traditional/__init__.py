from otree.api import *

doc = """
Your app description
"""


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


def make_question_1():
    return models.IntegerField(choices=[[1, "It is determined at random"], [2, "The prize who got paired to Ruth first"],
                                        [3, "The prize at which Ruth is in the highest priority."],
                                        [4, "The prize highest in Ruth’s ranking."]], label='Answer', widget=widgets.RadioSelect)


def make_question_2():
    return models.IntegerField(choices=[[1, "A random participant that is currently unpaired to any prize"],
                                        [2, "Its highest-priority participant, among the participants it was not yet paired with, and expect for you"],
                                        [3, "Its highest-priority participant"]], label='Answer', widget=widgets.RadioSelect)


def make_question_3():
    return models.IntegerField(choices=[[1, "No, there are new conflicts: two (or more) prizes are paired to the same participant"],
                                        [2, "No, some prizes are paired to participants that are not in their highest priority"], [3,
                                                                                                                                   "Yes, it is fine that two (or more) prizes are paired to the same participant because they all get different amounts of money anyway"],
                                        [4, "Yes, there are no more conflicts"]], label='Answer', widget=widgets.RadioSelect)


def make_question_4():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_5():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_6():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_7():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_8():
    return models.IntegerField(choices=[[1, "I can get any prize that I was paired with at some point in the allocation process, with equal chances."],
                                        [2, "It is certain that I will get the prize allocated to me at the end of the allocation process. [Correct]"], [3,
                                                                                                                                                         "I can only get one of the prizes I was paired with at some point in the allocation process, but I cannot know which one."],
                                        [4,
                                         "I am more likely to get a prize I was paired with at an earlier point in the allocation process than at a later point in the process."], ], label='Answer', widget=widgets.RadioSelect)


def make_question_9():
    return models.IntegerField(choices=[
        [1, "I will sometimes receive a prize which I ranked lower than any prize I was paired with during the allocation process."],
        [2, "Out of all the prizes I was paired with at some point in the allocation process, I will get the last one I was paired with."],
        [3, "If another participant does not want the prize allocated to them, then I may be able to switch prizes with them."], [4,
                                                                                                                                  "I am as likely to get a prize I was paired with at a later point in the allocation process as to get a prize I was paired with at an earlier point in the process"]], label='Which of the following is true?(Get it right on first try to increase your bonus)', widget=widgets.RadioSelect)


def make_participant_field(label):
    return models.IntegerField(choices=[[1, "R"], [2, "S"], [3, "T"], [4, "Y"]], label=label)


def make_prize(label):
    return models.IntegerField(choices=[[1, "Obtainable"], [2, "Unobtainable"]], label=label, widget=widgets.RadioSelect)


def make_prize_a():
    return make_prize("Prize A:")


def make_prize_b():
    return make_prize("Prize B:")


def make_prize_c():
    return make_prize("Prize C:")


def make_prize_d():
    return make_prize("Prize D:")


def make_obtainable_field_round_2(label):
    return models.IntegerField(choices=[[1, "C"], [2, "D"]], label=label, widget=widgets.RadioSelect)


def make_obtainable_field_round_3_4(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"]], label=label, widget=widgets.RadioSelect)


def make_prize_question():
    return models.IntegerField(choices=[[1, "The prize that was left unpaired in the temporary allocation"],
                                        [2, "The prize that other participants placed last in rankings on average"], [3, "The prize that I ranked the highest"],
                                        [4, "The prize at which I have the highest priority"], ], label='Answer', widget=widgets.RadioSelect)


def make_priority_field(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"], [3, "C"], [4, "D"]], label=label)


def get_prizes_priorities_by_round(round):
    first_round_priorities = {"A": ["R", "S", "T", "Y"], "B": ["R", "S", "Y", "T"], "C": ["S", "T", "R", "Y"], "D": ["Y", "T", "S", "R"]}
    second_round_priorities = {"A": ["R", "S", "T", "Y"], "B": ["T", "R", "S", "Y"], "C": ["S", "T", "R", "Y"], "D": ["Y", "T", "S", "R"]}
    third_round_priorities = {"A": ["R", "S", "T", "Y"], "B": ["T", "R", "S", "Y"], "C": ["S", "T", "R", "Y"], "D": ["Y", "T", "S", "R"]}
    fourth_round_priorities = {"A": ["R", "S", "T", "Y"], "B": ["T", "R", "S", "Y"], "C": ["S", "T", "R", "Y"], "D": ["Y", "T", "S", "R"]}
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_participants_priorities_by_round(round):
    first_round_priorities = {"R": ["A", "C", "B", "D"], "S": ["A", "C", "D", "B"], "T": ["B", "A", "D", "C"], "Y": ["C", "A", "B", "D"]}
    second_round_priorities = {"R": ["A", "B", "C", "D"], "S": ["A", "B", "C", "D"], "T": ["A", "B", "C", "D"], "Y": ["A", "B", "C", "D"]}
    third_round_priorities = {"R": ["A", "B", "C", "D"], "S": ["A", "B", "C", "D"], "T": ["A", "B", "C", "D"], "Y": ["A", "B", "C", "D"]}
    fourth_round_priorities = {"R": ["A", "B", "C", "D"], "S": ["A", "B", "C", "D"], "T": ["A", "B", "C", "D"], "Y": ["A", "B", "C", "D"]}
    priorities = [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]
    return priorities[round - 1]


def get_expected_prizes_ranking_by_round(round):
    first_round_ranking = [2, 0, 1, 3]
    second_round_ranking = [3, 2, 1, 0]
    third_round_ranking = [3, 2, 1, 0]
    fourth_round_ranking = [2, 3, 0, 1]
    rankings = [first_round_ranking, second_round_ranking, third_round_ranking, fourth_round_ranking]
    return rankings[round - 1]


class C(BaseConstants):
    NAME_IN_URL = 'mechanics_traditional'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 4

    NUMBER_OF_PARTICIPANTS = 4
    NUMBER_OF_PRIZES = 4
    PARTICIPANTS_NAMES = {'R': 1, "S": 2, "T": 3, "Y": 0}
    PRIZES_NAMES = {"A": 0, "B": 1, "C": 2, "D": 3}

    # this dict is used to determine the allocation of prizes in each round. if the round is divided into stages, then the allocation is determined by the
    # stage.
    EXPECTED_MATCHING_BY_ROUND = [
        [
            {'R': "A", 'S': 'none', 'T': 'none', 'Y': 'none'},
            {"R": "A", "S": "A", "T": "B", "Y": "C"},
            {"R": "A", "S": "C", "T": "B", "Y": "C"},
            {"R": "A", "S": "C", "T": "B", "Y": "A"},
            {"R": "A", "S": "C", "T": "B", "Y": "B"},
            {"R": "A", "S": "C", "T": "A", "Y": "B"},
            {"R": "A", "S": "C", "T": "D", "Y": "B"},
        ],
        [
            {'R': "D", "S": "B", "T": "A", "Y": "C"}
        ],
        [
            {'R': "D", "S": "A", "T": "C", "Y": "B"}
        ],
        [
            {'R': "C", "S": "D", "T": "B", "Y": "A"}
        ]
    ]

    # this list keeps the correct answers for the multiple choice questions
    CORRECT_ANSWERS_BY_ROUND = [[4, 2, 1, 1, 1, 1, 2, 2, 1, 4, 2, 3, 2, 2, 1, 4, 2, 3, 2, 2], [2, 2, 1, 1, 2], [1, 1, 2, 2, 2], [1, 1, 2, 2, 1]]

    # this dict keeps the max participants that can be assigned to each prize. in traditional mechanism, this is the same for all prizes.
    MAX_PARTICIPANTS_ASSIGNED_TO_PRIZE = {"A": NUMBER_OF_PARTICIPANTS, "B": NUMBER_OF_PARTICIPANTS, "C": NUMBER_OF_PARTICIPANTS, "D": NUMBER_OF_PARTICIPANTS}


class Player(BasePlayer):
    number_of_Schools = models.IntegerField(choices=[i for i in range(1, C.NUMBER_OF_PARTICIPANTS + 1)])
    number_of_students = models.IntegerField(choices=[i for i in range(1, C.NUMBER_OF_PRIZES + 1)])
    clicks = models.LongStringField()
    time_stamps = models.LongStringField()

    question_1 = make_question_1()
    question_2 = make_question_2()
    question_3 = make_question_3()
    question_4 = make_question_4()
    question_5 = make_question_5()
    question_6 = make_question_6()
    question_7 = make_question_7()
    question_8 = make_question_8()
    question_9 = make_question_9()
    question_10 = make_priority_field("Based on the allocation determined by the allocation process, click on the prize that you get in this round.(Get it right on first try to increase your bonus)")
    prize_a_obtainable = make_participant_field("Prize A")
    prize_b_obtainable = make_participant_field("Prize B")
    prize_c_obtainable = make_participant_field("Prize C")
    prize_d_obtainable = make_participant_field("Prize D")

    obtainable_prize_round_2 = make_obtainable_field_round_2('Answer')
    obtainable_prize_round_3_4 = make_obtainable_field_round_3_4('Answer')

    incorrect_seq_question_1 = models.LongStringField(initial="")
    incorrect_seq_question_2 = models.LongStringField(initial="")
    incorrect_seq_question_3 = models.LongStringField(initial="")
    incorrect_seq_question_4 = models.LongStringField(initial="")
    incorrect_seq_question_5 = models.LongStringField(initial="")
    incorrect_seq_question_6 = models.LongStringField(initial="")
    incorrect_seq_question_7 = models.LongStringField(initial="")
    incorrect_seq_question_8 = models.LongStringField(initial="")
    incorrect_seq_question_9 = models.LongStringField(initial="")
    incorrect_seq_question_10 = models.LongStringField(initial="")
    incorrect_seq_prize_a_obtainable = models.LongStringField(initial="")
    incorrect_seq_prize_b_obtainable = models.LongStringField(initial="")
    incorrect_seq_prize_c_obtainable = models.LongStringField(initial="")
    incorrect_seq_prize_d_obtainable = models.LongStringField(initial="")


    incorrect_seq_obtainable_prize_round_2 = models.LongStringField(blank=True)
    incorrect_seq_obtainable_prize_round_3_4 = models.LongStringField(blank=True)

    allocation_dashboard_question_1 = models.LongStringField(initial="")
    allocation_dashboard_question_2 = models.LongStringField(initial="")
    allocation_dashboard_question_3 = models.LongStringField(initial="")
    allocation_dashboard_question_4 = models.LongStringField(initial="")

    # Player's ranking variables
    first_priority = make_priority_field("First:")
    second_priority = make_priority_field("Second:")
    third_priority = make_priority_field("Third:")
    fourth_priority = make_priority_field("Fourth:")

    current_step = models.LongStringField(blank=True)
    matching_counter = models.IntegerField(initial=0)
    understanding_bonus = models.IntegerField(initial=0)

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
        player.participant.prizes_priorities = str(get_prizes_priorities_by_round(player.round_number))
        # the priorities of each participant .
        player.participant.participants_priorities = str(get_participants_priorities_by_round(player.round_number))
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
        player.participant.prizes_priorities = str(get_prizes_priorities_by_round(player.round_number))
        # the priorities of each participant .
        player.paticipant.participants_priorities = str(get_participants_priorities_by_round(player.round_number))
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
            "prizesPriorities":       get_prizes_priorities_by_round(player.round_number),
            "participantsPriorities": get_participants_priorities_by_round(player.round_number),
            "prizesNames":            C.PRIZES_NAMES,
            "participantsNames":      C.PARTICIPANTS_NAMES,
            "expectedRanking":        get_expected_prizes_ranking_by_round(player.round_number),
        }

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        # Setting the field so that it is not empty.
        player.time_stamps = 'L:'
        # initialize clicks
        player.clicks = ''
        player.participant.current_matching = {participant_name: 'none' for participant_name in C.PARTICIPANTS_NAMES}
        # the priorities of each prize .
        player.participant.prizes_priorities = get_prizes_priorities_by_round(player.round_number)
        # the priorities of each participant .
        player.participant.participants_priorities = get_participants_priorities_by_round(player.round_number)
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
            "participantsNames":      C.PARTICIPANTS_NAMES,
        }

    @staticmethod
    def js_vars(player: Player):
        return {
            "matchingMemo":            player.participant.matching_memo,
            "currentMatching":         player.participant.current_matching,
            "prizesPriorities":        player.participant.prizes_priorities,
            "participantsPriorities":  player.participant.participants_priorities,
            "prizesNames":             C.PRIZES_NAMES,
            "participantsNames":       C.PARTICIPANTS_NAMES,
            "maxParticipantsPerPrize": C.MAX_PARTICIPANTS_ASSIGNED_TO_PRIZE,
            "currentStep":             player.field_maybe_none("current_step"),
            "currentRound":            player.round_number,
            "correctAnswers":          C.CORRECT_ANSWERS_BY_ROUND[player.round_number - 1],
            "expectedMatchingByRound": C.EXPECTED_MATCHING_BY_ROUND[player.round_number - 1],
        }

    @staticmethod
    def get_form_fields(player: Player):
        if player.round_number == 1:
            questions = ["question_1", "question_2", "question_3", "question_4", "question_5", "question_6", "question_7", "question_8", "prize_a_obtainable",
                         "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "question_9", "question_10"]

            incorrect_answers = ["incorrect_seq_question_1", "incorrect_seq_question_2", "incorrect_seq_question_3", "incorrect_seq_question_4",
                                 "incorrect_seq_question_5", "incorrect_seq_question_6", "incorrect_seq_question_7", "incorrect_seq_question_8"]

            return questions + incorrect_answers

        else:
            if player.round_number == 2:
                questions = ["prize_a_obtainable", "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "obtainable_prize_round_2"]
                return questions
            else:
                questions = ["prize_a_obtainable", "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "obtainable_prize_round_3_4"]
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
            stage= data['stage']
            def create_submission_string(matching,is_correct,understanding_bonus):
                def get_correct_matching_string(is_correct):
                    if is_correct:
                        return 'correct'
                    else:
                        return 'incorrect'
                return f"[{str(matching)},{str(get_correct_matching_string(is_correct))},{str(understanding_bonus)}]"
            if stage == 0:
                player.allocation_dashboard_question_1 += create_submission_string(matching,is_correct,understanding_bonus)
            elif stage == 1:
                player.allocation_dashboard_question_2 += create_submission_string(matching,is_correct,understanding_bonus)
            elif stage == 2:
                player.allocation_dashboard_question_3 += create_submission_string(matching,is_correct,understanding_bonus)
            elif stage == 3:
                player.allocation_dashboard_question_4 += create_submission_string(matching,is_correct,understanding_bonus)
            player.understanding_bonus += understanding_bonus
        elif data['information_type'] == 'question_submission':
            question_id = data['question_id']
            answer = data['answer']
            is_correct = data['is_correct']
            understanding_bonus = data['understanding_bonus']
            player.understanding_bonus += understanding_bonus
            def create_question_submission_string(answer, is_correct, understanding_bonus):
                def get_correct_answer_string(is_correct):
                    if is_correct:
                        return 'correct'
                    else:
                        return 'incorrect'
                return f"[{str(answer)},{str(get_correct_answer_string(is_correct))},{str(understanding_bonus)}]"
            if question_id == "question_1":
                player.incorrect_seq_question_1 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_2":
                player.incorrect_seq_question_2 += create_question_submission_string(answer,is_correct,understanding_bonus)
                print(player.incorrect_seq_question_2)
            elif question_id == "question_3":
                player.incorrect_seq_question_3 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_4":
                player.incorrect_seq_question_4 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_5":
                player.incorrect_seq_question_5 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_6":
                player.incorrect_seq_question_6 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_7":
                player.incorrect_seq_question_7 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_8":
                player.incorrect_seq_question_8 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_9":
                player.incorrect_seq_question_9 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "question_10":
                player.incorrect_seq_question_10 += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "prize_a_obtainable":
                player.incorrect_seq_prize_a_obtainable += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "prize_b_obtainable":
                player.incorrect_seq_prize_b_obtainable += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "prize_c_obtainable":
                player.incorrect_seq_prize_c_obtainable += create_question_submission_string(answer,is_correct,understanding_bonus)
            elif question_id == "prize_d_obtainable":
                player.incorrect_seq_prize_d_obtainable += create_question_submission_string(answer,is_correct,understanding_bonus)
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
            player.participant.current_matching = {participant_name: 'none' for participant_name in C.PARTICIPANTS_NAMES}
            player.participant.matching_memo = []

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        # reset the current step
        player.current_step = ""


class MechanicsIntro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface ]
