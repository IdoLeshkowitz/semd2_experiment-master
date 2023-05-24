import random
import string

from otree.api import *

# STUDENT --> PRIZE | SCHOOL --> PARTICIPANT
doc = """
Your app description
"""


def prizes_priorities_list():
    first_round_priorities = [[1, 2, 3, 0], [1, 2, 0, 3], [2, 3, 1, 0], [0, 3, 2, 1]]

    second_round_priorities = [[1, 2, 3, 0], [1, 0, 2, 3], [3, 0, 2, 1], [3, 2, 1, 0]]

    third_round_priorities = [[1, 0, 2, 3], [2, 0, 3, 1], [1, 0, 3, 2], [2, 3, 0, 1]]

    return [first_round_priorities, second_round_priorities, third_round_priorities]


def players_rankings_list():
    first_round_rankings = [[0, 2, 3, 1], [1, 0, 2, 3], [2, 1, 0, 3]]

    second_round_rankings = [[0, 2, 3, 1], [1, 0, 2, 3], [3, 1, 0, 2]]

    third_round_rankings = [[2, 3, 0, 1], [1, 0, 2, 3], [3, 1, 0, 2]]

    return [first_round_rankings, second_round_rankings, third_round_rankings]


def expected_rankings_list():
    first_round_ranking = [2, 1, 0, 3]
    second_round_ranking = [3, 2, 1, 0]
    third_round_ranking = [2, 3, 0, 1]

    return [first_round_ranking, second_round_ranking, third_round_ranking]


def make_obtainable_field_round_2(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"]], label=label, widget=widgets.RadioSelect)


class C(BaseConstants):
    NAME_IN_URL = 'mechanics_menu'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 3
    MAX_SCHOOLS = 6
    MAX_STUDENTS = 9
    SCHOOLS_LETTERS = ['A', 'B', 'C', 'D' , 'E']  # Change if MAX_SCHOOLS is changed !!!
    STUDENTS_LETTERS = ['R', 'S', 'T', 'Y']
    STAGE_1 = [1, -10, -10, -10]
    STAGES = {
        0: [-10, -10, -10, -10],
        1: [1, -10, -10, -10],
        2: [1, 1, 2, 3],
        3: [1, 2, 2, 3],
        4: [1, 3, 2, 3],
        5: [1, 3, 2, 2],
        6: [1, 3, 2, 1],
        7: [1, 3, 2, -10]
    }
    ALLOCATION_2 = [-10, 2, 3, 1]
    ALLOCATION_3 = [2, -10, 1, 3]

    CORRECT_ANSWERS = [[4, 2, 1, 1, 1, 1, 2, 4, 2, 1, 2, 1, 3], [1, 1, 2, 2, 1], [1, 1, 2, 2, 1]]

    PLAYERS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_PRIORITIES = prizes_priorities_list()
    PLAYERS_RANKINGS = players_rankings_list()
    EXPECTED_RANKINGS = expected_rankings_list()


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
    return models.IntegerField(choices=[[1, "All four prizes, since I can in principle obtain all of them."],
                                        [2, "Any prize at which my priority is higher than the participant it is temporarily allocated to."],
                                        [3, "Only the prize that was left unpaired in the temporary allocation."], [4,
                                                                                                                    "Any prize at which my priority is higher than the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation."], ], label='Answer', widget=widgets.RadioSelect)


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


def make_prize_question():
    return models.IntegerField(choices=[[1, "The prize that was left unpaired in the temporary allocation"],
                                        [2, "The prize that other participants placed last in rankings on average"], [3, "The prize that I ranked the highest"],
                                        [4, "The prize at which I have the highest priority"], ], label='Answer', widget=widgets.RadioSelect)


def make_priority_field(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"], [3, "C"], [4, "D"]], label=label)


class Player(BasePlayer):
    SchoolsNumber = models.IntegerField(choices=[i for i in range(1, C.MAX_SCHOOLS + 1)])
    StudentsNumber = models.IntegerField(choices=[i for i in range(1, C.MAX_STUDENTS + 1)])
    SchoolsPreferences = models.LongStringField()
    StudentsPreferences = models.LongStringField()
    Clicks = models.LongStringField()
    TimeStamps = models.LongStringField()
    FinalMatching = models.LongStringField()
    CorrectMatching = models.BooleanField()
    MaxStudentsA = models.StringField(label="Number of students school A can accept", choices=[i for i in range(0,19)])  # might need to be changed if C.LETTERS_SCHOOLS is changed.
    MaxStudentsB = models.StringField(label="Number of students school B can accept", choices=[i for i in range(1, 19)])
    MaxStudentsC = models.StringField(label="Number of students school C can accept", choices=[i for i in range(1, 19)])
    MaxStudentsD = models.StringField(label="Number of students school D can accept", choices=[i for i in range(1, 19)])
    MaxStudentsE = models.StringField(label="Number of students school E can accept", choices=[i for i in range(1, 19)])

    question_1 = make_question_1()
    question_2 = make_question_2()
    question_3 = make_question_3()
    question_4 = make_question_4()
    question_5 = make_question_5()
    question_6 = make_question_6()
    question_7 = make_question_7()
    question_8 = make_question_8()

    prize_a_obtainable = make_prize_a()
    prize_b_obtainable = make_prize_b()
    prize_c_obtainable = make_prize_c()
    prize_d_obtainable = make_prize_d()

    question_prize = make_prize_question()
    obtainable_prize = make_obtainable_field_round_2('Answer')

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


# FUNCTIONS


def variablesFunction(player):
    d = {
        'schools_number':          player.SchoolsNumber,
        # This sets the number of schools. This of course can be determined randomly or according to some rule.
        'students_number':         player.StudentsNumber,  # Same as above but regarding the number of students.
        'schools_lists':           player.participant.schools_lists,
        'students_lists':          player.participant.students_lists,
        'matchingalgho':           player.participant.matchingalgho,
        'partialmatching':         player.participant.partialmatching,
        'schools_alphabet':        player.participant.schools_alphabet,
        'max_students_per_school': player.participant.max_students_per_school,
        'matched_number':          player.participant.matched_number,
        'correct_answers':         C.CORRECT_ANSWERS[player.round_number - 1],
    }
    # for i in range(player.SchoolsNumber):
    #     for j in range(player.StudentsNumber):
    #         d.update({'school'+str(i+1)+'pref'+str(j+1):player.SchoolsPreferences[i][j]})
    # for i in range(player.StudentsNumber):
    #     for j in range(player.SchoolsNumber):
    #         d.update({'student' + str(i + 1) + 'pref' + str(j + 1): player.SchoolsPreferences[i][j]})
    return d


def GetParticpantNumber(char):
    if char == 'R':
        return 1
    elif char == 'S':
        return 2
    elif char == 'T':
        return 3
    else:
        return 4


# PAGES
class DAalghoIntro(Page):
    form_model = 'player'
    form_fields = ['SchoolsNumber', 'StudentsNumber', ]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):  # EXPLANATION:
        player.TimeStamps = 'L:'  # Setting the field so that it is not empty.
        player.Clicks = '||'  # Setting the field so that it is not empty.


class DAalghoInterface(Page):
    form_model = "player"

    @staticmethod
    def vars_for_template(player: Player):
        return variablesFunction(player)

    @staticmethod
    def js_vars(player: Player):
        return variablesFunction(player)

    @staticmethod
    def get_form_fields(player: Player):
        if player.round_number == 1:
            questions = ["question_1", "question_2", "question_3", "question_4", "question_5", "question_6", "question_7", "question_8", "prize_a_obtainable",
                         "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "question_prize"]

            incorrect_answers = ["incorrect_seq_question_1", "incorrect_seq_question_2", "incorrect_seq_question_3", "incorrect_seq_question_4",
                                 "incorrect_seq_question_5", "incorrect_seq_question_6", "incorrect_seq_question_7", "incorrect_seq_question_8"]

            return questions + incorrect_answers

        else:
            questions = ["prize_a_obtainable", "prize_b_obtainable", "prize_c_obtainable", "prize_d_obtainable", "obtainable_prize"]
            return questions

    @staticmethod
    def live_method(player: Player, data):
        if data['information_type'] == 'onload':
            player.TimeStamps = player.TimeStamps + '|R:' + data['time']
            player.Clicks = player.Clicks + '||'
        elif data['information_type'] == 'submission':
            player.TimeStamps = player.TimeStamps + '|F:' + data['time']
            player.Clicks = player.Clicks + '||'
            player.FinalMatching = str(player.participant.partialmatching)
            return {
                player.id_in_group: {
                    'information_type': 'submit',
                }
            }
        elif data['information_type'] == 'matching_update':
            stage = data['stage']
            if data['matching'] == C.STAGES[stage]:
                return {
                    player.id_in_group: {
                        'information_type': 'matching_status',
                        'round':            player.round_number,
                        'status':           True
                    }
                }
            else:
                return {
                    player.id_in_group: {
                        'information_type': 'matching_status',
                        'round':            player.round_number,
                        'status':           False,
                        'matching':         C.STAGES[stage - 1]
                    }
                }
        elif data['information_type'] == 'training_rounds':
            if player.round_number == 2:
                if data['matching'] == C.ALLOCATION_2:
                    return {
                        player.id_in_group: {
                            'information_type': 'matching_status',
                            'round':            player.round_number,
                            'status':           True
                        }
                    }
                else:
                    return {
                        player.id_in_group: {
                            'information_type': 'matching_status',
                            'round':            player.round_number,
                            'status':           False
                        }
                    }
            if player.round_number == 3:
                if data['matching'] == C.ALLOCATION_3:
                    return {
                        player.id_in_group: {
                            'information_type': 'matching_status',
                            'round':            player.round_number,
                            'status':           True
                        }
                    }
                else:
                    return {
                        player.id_in_group: {
                            'information_type': 'matching_status',
                            'round':            player.round_number,
                            'status':           False
                        }
                    }
        elif data['information_type'] == "reset_button":
            # reset matched_number
            player.participant.matched_number = [0 for school in range(player.SchoolsNumber)]
            # reset partial_matching
            player.participant.partialmatching = [-10, -10, -10, -10]
            # add reset to clicks
            player.Clicks = player.Clicks + 'reset|'
            return {
                player.id_in_group: {
                    'information_type': 'reset'
                }
            }
        else:
            pystudent = int(data['student']) - 1  # Student i's data is stored in the i-1th placed in the lists (where 0 is the first entry).
            if data['information_type'] == 'student_button':  # An unmatched student button was pressed
                if player.Clicks[-2:] == data[
                    'student'] + ':':  # Either the student was unmatched or the unmatched button was reclicked to cancel its matching.
                    if player.participant.partialmatching[pystudent] > 0:  # If the student was already matched.
                        oldschool = player.participant.partialmatching[pystudent] - 1
                        player.participant.matched_number[oldschool] -= 1
                    player.Clicks = player.Clicks + data['student'] + '|'
                    player.participant.partialmatching[pystudent] = -10
                    return {
                        player.id_in_group: {
                            'information_type': 'student_unmatched',
                            'student':          data['student'],
                            'matched_number':   player.participant.matched_number,
                            'partialmatching':  player.participant.partialmatching,
                        }
                    }
                else:
                    player.Clicks = player.Clicks + data['student'] + ':'
                    return {
                        player.id_in_group: {
                            'information_type': 'student_matching',
                            'student':          data['student']
                        }
                    }
            elif data['information_type'] == 'school_plus_button':
                # check if the prize was assigned to a participant already, if so decrement the amount of prizes assigned to the old participant
                if player.participant.partialmatching[pystudent] > 0:
                    # if the prize was assigned to a participant already
                    oldschool = player.participant.partialmatching[pystudent] - 1
                    # decrement the amount of prizes assigned to the old participant
                    player.participant.matched_number[oldschool] -= 1
                player.Clicks = player.Clicks + str(data['school']) + '|'
                # assign the prize to the new participant
                player.participant.partialmatching[pystudent] = int(data['school'])
                pyschool = int(data['school']) - 1  # This is the integer returned to javascript!!
                player.participant.matched_number[pyschool] += 1
                return {
                    player.id_in_group: {
                        'information_type': 'student_matched',
                        'student':          data['student'],
                        'school':           pyschool,
                        'student_order':    player.participant.matched_number[pyschool],
                        'matched_number':   player.participant.matched_number,
                        'partialmatching':  player.participant.partialmatching,
                    }
                }
            elif data['information_type'] == 'rematch_button':
                if player.Clicks[-2:] == str(data['student']) + ':':
                    school = player.participant.schools_alphabet.index(data['school']) + 1
                    player.Clicks = player.Clicks + str(school) + '|'
                    return {
                        player.id_in_group: {
                            'information_type': 'canceled_rematch',
                            'student':          data['student'],
                            'school':           data['school']
                        }
                    }
                else:
                    return {
                        player.id_in_group: {
                            'information_type': 'ready_for_rematch',
                            'student':          data['student'],
                            'school':           data['school']
                        }
                    }  # The data sent to javascript is the same that was sent by it. Data['school'] is a letter!
                    player.Clicks = player.Clicks + str(data['student']) + ':'

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        pass  # Here one can compare the submitted matching with the DA matching for example.


class MechanicsIntro(Page):

    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


class TrainingRound(Page):
    form_model = "player"

    @staticmethod
    def get_form_fields(player: Player):
        priorities = ["first_priority", "second_priority", "third_priority", "fourth_priority", ]
        return priorities

    @staticmethod
    def js_vars(player: Player):
        return dict(prizes=C.PRIZES, prizes_priorities=C.PRIZES_PRIORITIES[player.round_number - 1], players=C.PLAYERS, players_rankings=C.PLAYERS_RANKINGS[
            player.round_number - 1], player_expected_ranking=C.EXPECTED_RANKINGS[player.round_number - 1], )

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.SchoolsNumber = 5  # participants number
        player.StudentsNumber = 4  # prizes number
        player.MaxStudentsA = '4'
        player.MaxStudentsB = '4'
        player.MaxStudentsC = '4'
        player.MaxStudentsD = '0'
        player.MaxStudentsE = '4'

        player.TimeStamps = 'L:'  # Setting the field so that it is not empty.
        player.Clicks = '||'  # Setting the field so that it is not empty.

        player.participant.max_students_per_school = []  # The nth number in the list represents the maximal number of students that can be matched to the nth school.
        for i in range(player.SchoolsNumber):
            codi = "player.participant.max_students_per_school.append(int(player.MaxStudents" + C.SCHOOLS_LETTERS[i] + "))"
            exec(codi)  # executing the code inside the string
        player.participant.matched_number = []  # The number of matched students per school.
        player.participant.schools_range = list(range(player.SchoolsNumber))  # A list [0,1,...,n-1] where n is the number of schools.
        SchoolsAlphabet = list(string.ascii_uppercase)
        player.participant.schools_alphabet = SchoolsAlphabet[
                                              0:player.SchoolsNumber]  # A list [A,B,...,X] where X is the nth letter of the alphabet and n is the number of schools.
        # player.participant.students_alphabet = ['R', 'S', 'T', 'Y']
        player.participant.students_range = list(range(player.StudentsNumber))  # A list [0,1,...,m-1] where m is the number of students.
        player.participant.students_names = list(range(1, (player.StudentsNumber + 1)))  # A list [1,2,...,m] where m is the number of students.
        # player.participant.students_names = C.STUDENTS_LETTERS.copy()
        player.participant.matchingalgho = '|'  # History of the participant's choices until that point. To be presented somehow on the screen.
        player.participant.partialmatching = [-10 for i in
                                              range(player.StudentsNumber)]  # The current partial matching according to the participant's choices until that point. The length of the list equals the number of students. The value of each entery is the number of the school that the student has been matched too. Equals -10 if the student hasn't been matched yet.
        schools_lists = list()
        for i in range(player.SchoolsNumber):  # Each school has a preference list over...
            schools_lists.append(list(range(player.StudentsNumber)))  # ...the different students.
            random.shuffle(schools_lists[i])  # The schools' preferences are randomly set.
            player.participant.matched_number.append(0)
        # mechanics traditional (prizes)-
        if player.round_number == 1:
            schools_lists = [[0, 2, 3, 1], [0, 2, 3, 1], [1, 3, 0, 2], [2, 1, 0, 3],[-1,-1,-1,-1]]
        if player.round_number == 2:
            schools_lists = [[3, 0, 1, 2], [2, 1, 0, 3], [2, 3, 0, 1], [3, 2, 1, 0],[-1,-1,-1,-1]]
        if player.round_number == 3:
            schools_lists = [[2, 0, 1, 3], [0, 3, 2, 1], [0, 3, 1, 2], [2, 3, 0, 1],[-1,-1,-1,-1]]
        player.participant.schools_lists = schools_lists  # This is a list of sublist. Each sublist corresponds to a school: the nth sublist represents the nth school's preferences: The first number represents the most preferred student by the school, the second entery represents the second-best preferred student etc.
        player.SchoolsPreferences = str(player.participant.schools_lists)  # saving this informtion.
        students_lists = list()
        for i in range(player.StudentsNumber):
            students_lists.append(list(range(player.SchoolsNumber)))  # The students' preferences are randomly set.
            random.shuffle(students_lists[i])
        # mechanics traditional(participants)-
        if player.round_number == 1:
            students_lists = [[0, 1, 2, 3], [0, 1, 3, 2], [1, 2, 0, 3], [3, 2, 1, 0]]
        if player.round_number == 2:
            students_lists = [[0, 1, 2, 3], [0, 3, 1, 2], [2, 3, 1, 0], [2, 1, 0, 3]]
        if player.round_number == 3:
            students_lists = [[0, 3, 1, 2], [1, 3, 2, 0], [0, 3, 2, 1], [1, 2, 3, 0]]

        player.participant.students_lists = students_lists  # This is a list of sublist. Each sublist corresponds to a student: the nth sublist represents the nth student's preferences: The first number represents the most preferred school by the student, the second entery represents the second-best preferred school etc.
        player.StudentsPreferences = str(player.participant.students_lists)  # Saving this information.
        SchoolsAlphabetPreferencesCombined = []
        for i in range(player.SchoolsNumber):
            L = [player.participant.schools_alphabet[i]]
            for j in range(player.StudentsNumber):
                L.append(player.participant.schools_lists[i][j] + 1)
            SchoolsAlphabetPreferencesCombined.append(L)
        player.participant.schoolsAPC = SchoolsAlphabetPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a school: its first entery is the name/letter of the school, and the other enteries are the students' numbers according to the school's preferences.
        StudentsNumberPreferencesCombined = []
        # iterates over the prizes
        for i in range(player.StudentsNumber):
            L = [i + 1]
            # itertas over the participants
            for j in range(player.SchoolsNumber):
                if j in player.participant.students_lists[i]:
                    L.append(player.participant.schools_alphabet[player.participant.students_lists[i][j]])
                else:
                    L.append("X")
            StudentsNumberPreferencesCombined.append(L)
        player.participant.studentsAPC = StudentsNumberPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a students: its first entery is the name/number of the student, and the other enteries are the schools' numbers according to the student's preferences.


page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface, ]
