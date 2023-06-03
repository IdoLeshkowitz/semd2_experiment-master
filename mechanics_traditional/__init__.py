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
        [3, "If another participant does not want the prize allocated to them, then I may be able to switch prizes with them."],
        [4, "I am as likely to get a prize I was paired with at a later point in the allocation process as to get a prize I was paired with at an earlier point in the process"]], label='Which of the following is true?(Get it right on first try to increase your bonus)', widget=widgets.RadioSelect)


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
    EXPECTED_MATCHING_BY_ROUND = {
        1: {
            'stages': {
                0: {'R': "A", 'S': -10, 'T': -10, 'Y': -10},
                1: {"R": "A", "S": "A", "T": "B", "Y": "C"},
                2: {"R": "A", "S": "C", "T": "B", "Y": "C"},
                3: {"R": "A", "S": "C", "T": "B", "Y": "A"},
                4: {"R": "A", "S": "C", "T": "B", "Y": "B"},
                5: {"R": "A", "S": "C", "T": "A", "Y": "B"},
                6: {"R": "A", "S": "C", "T": "D", "Y": "B"},
            }
        },
        2: {'stages': {0: {'R': "D", "S": "B", "T": "A", "Y": "C"}}},
        3: {'stages': {0: {'R': "D", "S": "A", "T": "C", "Y": "B"}}},
        4: {'stages': {0: {'R': "C", "S": "D", "T": "B", "Y": "A"}}}
    },

    # this list keeps the correct answers for the multiple choice questions
    CORRECT_ANSWERS_BY_ROUND = [[4, 2, 1, 1, 1, 1, 2, 2, 1, 4, 2, 3, 2, 2,1,4,2,3,2,2], [2, 2, 1, 1, 2], [1, 1, 2, 2, 2], [1, 1, 2, 2, 1]]

    # this dict keeps the max participants that can be assigned to each prize. in traditional mechanism, this is the same for all prizes.
    MAX_PARTICIPANTS_ASSIGNED_TO_PRIZE = {"A": NUMBER_OF_PARTICIPANTS, "B": NUMBER_OF_PARTICIPANTS, "C": NUMBER_OF_PARTICIPANTS, "D": NUMBER_OF_PARTICIPANTS}


class Player(BasePlayer):
    number_of_Schools = models.IntegerField(choices=[i for i in range(1, C.NUMBER_OF_PARTICIPANTS + 1)])
    number_of_students = models.IntegerField(choices=[i for i in range(1, C.NUMBER_OF_PRIZES + 1)])
    clicks = models.LongStringField()
    time_stamps = models.LongStringField()
    final_matching = models.LongStringField()

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

    incorrect_seq_question_1 = models.LongStringField(blank=True)
    incorrect_seq_question_2 = models.LongStringField(blank=True)
    incorrect_seq_question_3 = models.LongStringField(blank=True)
    incorrect_seq_question_4 = models.LongStringField(blank=True)
    incorrect_seq_question_5 = models.LongStringField(blank=True)
    incorrect_seq_question_6 = models.LongStringField(blank=True)
    incorrect_seq_question_7 = models.LongStringField(blank=True)
    incorrect_seq_question_8 = models.LongStringField(blank=True)

    # Player's ranking variables
    first_priority = make_priority_field("First:")
    second_priority = make_priority_field("Second:")
    third_priority = make_priority_field("Third:")
    fourth_priority = make_priority_field("Fourth:")

    current_stage = models.IntegerField(initial=0)
    current_step = models.LongStringField(blank=True)
    matching_counter = models.IntegerField(initial=0)

    bonus_field = models.IntegerField(initial=0)


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
        player.clicks = '||'
        player.participant.current_matching = {participant_name: -10 for participant_name in C.PARTICIPANTS_NAMES}
        # the priorities of each prize .
        player.participant.prizes_priorities = get_prizes_priorities_by_round(player.round_number)
        # the priorities of each participant .
        player.participant.participants_priorities = get_participants_priorities_by_round(player.round_number)
        player.participant.expected_ranking = get_expected_prizes_ranking_by_round(player.round_number)


class DAalghoInterface(Page):
    form_model = "player"
    current_stage = 0;

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
            "currentMatching":         player.participant.current_matching,
            "prizesPriorities":        player.participant.prizes_priorities,
            "participantsPriorities":  player.participant.participants_priorities,
            "prizesNames":             C.PRIZES_NAMES,
            "participantsNames":       C.PARTICIPANTS_NAMES,
            "maxParticipantsPerPrize": C.MAX_PARTICIPANTS_ASSIGNED_TO_PRIZE,
            "currentStep":             player.field_maybe_none("current_step"),
            "currentStage":            player.current_stage,
            "currentRound":            player.round_number,
            "correctAnswers":          C.CORRECT_ANSWERS_BY_ROUND[player.round_number - 1],
            "expectedMatchingByRound": C.EXPECTED_MATCHING_BY_ROUND[player.round_number - 1],
        }

    @staticmethod
    def get_form_fields(player: Player):
        if player.round_number == 1:
            questions = ["question_1", "question_2", "question_3", "question_4", "question_5", "question_6", "question_7", "question_8", "prize_a_obtainable",
                         "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable","question_9","question_10"]

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
            player.time_stamps = player.time_stamps + '|R:' + data['time']
            player.clicks = player.clicks + '||'
        # end event
        elif data['information_type'] == 'submission':
            player.time_stamps = player.time_stamps + '|F:' + data['time']
            player.clicks = player.clicks + '||'
            player.final_matching = str(player.participant.current_matching)
            return {player.id_in_group: {'information_type': 'submit'}}
        elif data['information_type'] == 'matching_submission':
            """
            this event is called when the user hit submits after he finished the matching
            the client gets back the following information:
                1. expected_matching (only after the last attempt)
                2. next_stage (if no more stages left in the current round the next stage is -1)
                3. is_correct (True if the matching is correct, False otherwise)
                4. is_last_matching (True if the current matching is the last matching in the current stage, False otherwise)
            expecting data to include :
                1. user_matching
            """
            current_stage = player.current_stage

            def get_expected_matching():
                return C.EXPECTED_MATCHING_BY_ROUND[player.round_number][current_stage]

            def is_last_matching():
                return player.matching_counter >= 3

            def is_matching_correct():
                return data['user_matching'] == C.EXPECTED_MATCHING_BY_ROUND[player.round_number][current_stage]

            return {
                player.id_in_group: {
                    'information_type':  'matching_feedback',
                    "next_stage":        current_stage + 1 if not is_last_matching() else -1,
                    "expected_matching": get_expected_matching() if is_last_matching() else None,
                    "is_correct":        is_matching_correct(),
                    "is_last_matching":  is_last_matching(),
                }
            }
            """ 
            sideEffects:
                1. update the matching per participant
                2. update the matching counter
                3. update the stage if needed
            """

            def update_current_matching():
                if not is_matching_correct() and is_last_matching():
                    player.participant.current_matching = get_expected_matching()
                else:
                    player.participant.current_matching = data['user_matching']

            def update_matching_counter():
                player.matching_counter = player.matching_counter + 1

            def update_stage():
                if is_last_matching():
                    player.current_stage = -1
                else:
                    player.current_stage = player.current_stage + 1

            update_current_matching()
            update_matching_counter()
            update_stage()


        elif data['information_type'] == 'match_participant':
            """
            this event is called when the user clicks on a participant to match
            expecting data to include : 
                1. participant_to_match
                2. match_to_prize
            """
            participant_to_match = data['participant_to_match']
            match_to_prize = data['match_to_prize']
            player.clicks = player.clicks + '||' + participant_to_match + '->' + match_to_prize

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        # reset the current step
        player.current_step = ""


class MechanicsIntro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface, ]
