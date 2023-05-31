from otree.api import *
import random
import string

doc = """
Your app description
"""


def prizes_priorities_list():
    first_round_priorities = [[1,2,3,0], [1,2,0,3], [2,3,1,0], [0,3,2,1]]

    second_round_priorities = [[3, 0, 1, 2], [2, 3, 0, 1], [2, 0, 1, 3], [3, 1, 0, 2]]

    third_round_priorities =    [[1, 2, 3, 0], [1, 0, 2, 3], [3, 0, 2, 1], [3, 2, 1, 0]]

    fourth_round_priorities = [[1, 0, 2, 3], [2, 0, 3, 1], [1, 0, 3, 2], [2, 3, 0, 1]]
    return [first_round_priorities, second_round_priorities, third_round_priorities, fourth_round_priorities]


def players_rankings_list():
    # participants rankings
    # first_round_rankings = [[0, 2, 3, 1], [1, 0, 2, 3], [2, 1, 0, 3]]
    #
    # second_round_rankings = [[0, 2, 3, 1], [1, 0, 2, 3], [3, 1, 0, 2]]
    #
    # third_round_rankings = [[2, 3, 0, 1], [1, 0, 2, 3], [3, 1, 0, 2]]
    #
    # fourth_round_rankings = [[2, 0, 1, 3], [0, 3, 2, 1], [0, 3, 1, 2]]
    first_round_rankings = [[0, 2, 3, 1], [0, 2, 3, 1], [1, 0, 3, 2], [2, 0, 1, 3]]
    second_round_rankings = [[3, 2, 1, 0], [1, 2, 0, 3], [1, 0, 3, 2], [3, 0, 2, 1]]
    third_round_rankings = [[3, 0, 1, 2], [2, 1, 0, 3], [2, 3, 0, 1], [3, 2, 1, 0]]
    fourth_round_rankings = [[2, 0, 1, 3], [0, 3, 2, 1], [0, 3, 1, 2], [2, 3, 0, 1]]
    return [first_round_rankings, second_round_rankings, third_round_rankings, fourth_round_rankings]


def expected_rankings_list():
    first_round_ranking = [2, 1, 0, 3]
    second_round_ranking = [3, 0, 2, 1]
    third_round_ranking = [3, 2, 1, 0]
    fourth_round_ranking = [2, 3, 0, 1]
    return [first_round_ranking, second_round_ranking, third_round_ranking, fourth_round_ranking]


def make_priority_field(label):
    return models.IntegerField(choices=[[1, "A"], [2, "B"], [3, "C"], [4, "D"]], label=label)


class C(BaseConstants):
    NAME_IN_URL = 'mechanics_traditional'
    PLAYERS_PER_GROUP = None

    NUM_ROUNDS = 4
    MAX_SCHOOLS = 5
    MAX_STUDENTS = 9
    SCHOOLS_LETTERS = ['A', 'B', 'C', 'D']  # Change if MAX_SCHOOLS is changed !!!
    STUDENTS_LETTERS = ['R', 'S', 'T', 'Y']
    STAGE_1 = [1, -10, -10, -10]
    STAGES = {
        0: [-10, -10, -10, -10], 1: [1, -10, -10, -10], 2: [1, 1, 2, 3], 3: [1, 3, 2, 3], 4: [1, 3, 2, 2], 5: [1, 3, 4, 2]
    }
    ALLOCATION_2 = [4, 1, 3, 2]
    ALLOCATION_3 = [3, 4, 2, 1]
    CORRECT_ANSWERS = [4, 2, 1, 1, 2]
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
    return models.IntegerField(choices=[[1, "It is determined at random"], [2, "The participant who got paired to Prize A first"],
                                        [3, "The participant for whom Prize A is in the highest rank."],
                                        [4, "The participant highest in Prize A’s priorities."]], label='Answer', widget=widgets.RadioSelect)


def make_question_2():
    return models.IntegerField(choices=[[1, "A random prize that is currently unpaired to any participant"],
                                        [2, "Their highest-rank prize, among the prizes they were not yet paired with"],
                                        [3, "Their highest-rank prize."]], label='Answer', widget=widgets.RadioSelect)


def make_question_3():
    return models.IntegerField(choices=[[1, "No, there are new conflicts: two (or more) participants are paired to the same prize."],
                                        [2, "No, some participants are paired to prizes that are not in their highest rank ."], [3,
                                                                                                                                 "Yes, it is fine that two (or more) participants are paired to the same prize because they all get different amounts of money anyway."],
                                        [4, "Yes, there are no more conflicts."]], label='Answer', widget=widgets.RadioSelect)


def make_question_4():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


def make_question_5():
    return models.IntegerField(choices=[[1, "No"], [2, "Yes"]], label='Answer', widget=widgets.RadioSelect)


class Player(BasePlayer):
    SchoolsNumber = models.IntegerField(choices=[i for i in range(1, C.MAX_SCHOOLS + 1)])
    StudentsNumber = models.IntegerField(choices=[i for i in range(1, C.MAX_STUDENTS + 1)])
    SchoolsPreferences = models.LongStringField()
    StudentsPreferences = models.LongStringField()
    Clicks = models.LongStringField()
    TimeStamps = models.LongStringField()
    FinalMatching = models.LongStringField()
    CorrectMatching = models.BooleanField()
    MaxStudentsA = models.StringField(label="Number of students school A can accept", choices=[i for i in
                                                                                               range(0, 19)])  # might need to be changed if C.LETTERS_SCHOOLS is changed.
    MaxStudentsB = models.StringField(label="Number of students school B can accept", choices=[i for i in range(1, 19)])
    MaxStudentsC = models.StringField(label="Number of students school C can accept", choices=[i for i in range(1, 19)])
    MaxStudentsD = models.StringField(label="Number of students school D can accept", choices=[i for i in range(1, 19)])
    MaxStudentsE = models.StringField(label="Number of students school E can accept", choices=[i for i in range(1, 19)])

    question_1 = make_question_1()
    question_2 = make_question_2()
    question_3 = make_question_3()
    question_4 = make_question_4()
    question_5 = make_question_5()
    incorrect_seq_question_1 = models.LongStringField(blank=True)
    incorrect_seq_question_2 = models.LongStringField(blank=True)
    incorrect_seq_question_3 = models.LongStringField(blank=True)
    incorrect_seq_question_4 = models.LongStringField(blank=True)
    incorrect_seq_question_5 = models.LongStringField(blank=True)

    # Player's ranking variables
    first_priority = make_priority_field("First:")
    second_priority = make_priority_field("Second:")
    third_priority = make_priority_field("Third:")
    fourth_priority = make_priority_field("Fourth:")


# FUNCTIONS


def variablesFunction(player):
    d = {
        'initial_clicks':  str(player.Clicks), 'schools_number': player.SchoolsNumber,
        # This sets the number of schools. This of course can be determined randomly or according to some rule.
        'students_number': player.StudentsNumber,  # Same as above but regarding the number of students.
        'schools_lists':   player.participant.schools_lists, 'students_lists': player.participant.students_lists, 'matchingalgho': player.participant.matchingalgho, 'partialmatching': player.participant.partialmatching, 'schools_alphabet': player.participant.schools_alphabet, 'max_students_per_school': player.participant.max_students_per_school, 'matched_number': player.participant.matched_number, 'correct_answers': C.CORRECT_ANSWERS,
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


class DAalghoIntro2(Page):
    form_model = 'player'

    @staticmethod
    def get_form_fields(player):
        max_list = ['MaxStudentsA', 'MaxStudentsB', 'MaxStudentsC', 'MaxStudentsD', 'MaxStudentsE']
        n = player.SchoolsNumber
        return max_list[0:n]

    @staticmethod
    def before_next_page(player: Player, timeout_happened):  # EXPLANATION:
        player.participant.max_students_per_school = []  # The nth number in the list represents the maximal number of students that can be matched to the nth school.
        for i in range(player.SchoolsNumber):
            codi = "player.participant.max_students_per_school.append(int(player.MaxStudents" + C.SCHOOLS_LETTERS[i] + "))"
            exec(codi)  # executing the code inside the string
        player.participant.matched_number = [0 for school in range(player.SchoolsNumber)]  # The number of matched students per school.
        player.participant.schools_range = list(range(player.SchoolsNumber))  # A list [0,1,...,n-1] where n is the number of schools.
        SchoolsAlphabet = list(string.ascii_uppercase)
        player.participant.schools_alphabet = SchoolsAlphabet[
                                              0:player.SchoolsNumber]  # A list [A,B,...,X] where X is the nth letter of the alphabet and n is the number of schools.
        player.participant.students_range = list(range(player.StudentsNumber))  # A list [0,1,...,m-1] where m is the number of students.
        #    range(1, (player.StudentsNumber + 1)))  # A list [1,2,...,m] where m is the number of students.
        player.participant.matchingalgho = '|'  # History of the participant's choices until that point. To be presented somehow on the screen.
        player.participant.partialmatching = [-10 for i in
                                              range(player.StudentsNumber)]  # The current partial matching according to the participant's choices until that point. The length of the list equals the number of students. The value of each entery is the number of the school that the student has been matched too. Equals -10 if the student hasn't been matched yet.
        player.participant.schools_lists = prizes_priorities_list()  # This is a list of sublist. Each sublist corresponds to a school: the nth sublist represents the nth school's preferences: The first number represents the most preferred student by the school, the second entery represents the second-best preferred student etc.
        player.participant.students_lists = players_rankings_list()  # This is a list of sublist. Each sublist corresponds to a student: the nth sublist represents the nth student's preferences: The first number represents the most preferred school by the student, the second entery represents the second-best preferred school etc.
        player.StudentsPreferences = str(player.participant.students_lists)  # Saving this information.
        SchoolsAlphabetPreferencesCombined = []
        for i in range(player.SchoolsNumber):
            L = [player.participant.schools_alphabet[i]]
            for j in range(player.StudentsNumber):
                L.append(player.participant.schools_lists[i][j] + 1)
            SchoolsAlphabetPreferencesCombined.append(L)
        print(SchoolsAlphabetPreferencesCombined)
        player.participant.schoolsAPC = SchoolsAlphabetPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a school: its first entery is the name/letter of the school, and the other enteries are the students' numbers according to the school's preferences.
        StudentsNumberPreferencesCombined = []
        for i in range(player.StudentsNumber):
            L = [i + 1]
            for j in range(player.SchoolsNumber):
                L.append(player.participant.schools_alphabet[player.participant.students_lists[i][j]])
            StudentsNumberPreferencesCombined.append(L)
        player.participant.studentsAPC = StudentsNumberPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a students: its first entery is the name/number of the student, and the other enteries are the schools' numbers according to the student's preferences.


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
        player.SchoolsNumber = 4
        player.StudentsNumber = 4
        player.MaxStudentsA = '4'
        player.MaxStudentsB = '4'
        player.MaxStudentsC = '4'
        player.MaxStudentsD = '4'

        player.TimeStamps = 'L:'  # Setting the field so that it is not empty.
        player.Clicks = '||'  # Setting the field so that it is not empty.

        player.participant.max_students_per_school = []  # The nth number in the list represents the maximal number of students that can be matched to the nth school.
        for i in range(player.SchoolsNumber):
            codi = "player.participant.max_students_per_school.append(int(player.MaxStudents" + C.SCHOOLS_LETTERS[i] + "))"
            exec(codi)  # executing the code inside the string
        player.participant.matched_number = [0 for school in range(player.SchoolsNumber)]  # The number of matched students per school.
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
        schools_lists = prizes_priorities_list()
        player.participant.schools_lists = schools_lists  # This is a list of sublist. Each sublist corresponds to a school: the nth sublist represents the nth school's preferences: The first number represents the most preferred student by the school, the second entery represents the second-best preferred student etc.
        player.SchoolsPreferences = str(player.participant.schools_lists)  # saving this informtion.
        students_lists = players_rankings_list()
        player.participant.students_lists = students_lists  # This is a list of sublist. Each sublist corresponds to a student: the nth sublist represents the nth student's preferences: The first number represents the most preferred school by the student, the second entery represents the second-best preferred school etc.
        player.StudentsPreferences = str(player.participant.students_lists)  # Saving this information.
        SchoolsAlphabetPreferencesCombined = []
        for i in range(player.SchoolsNumber):
            L = [player.participant.schools_alphabet[i]]
            current_round_schools_list = player.participant.schools_lists[player.round_number - 1]
            for j in range(player.StudentsNumber):
                L.append(current_round_schools_list[i][j] + 1)
            SchoolsAlphabetPreferencesCombined.append(L)
        print(SchoolsAlphabetPreferencesCombined)
        player.participant.schoolsAPC = SchoolsAlphabetPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a school: its first entery is the name/letter of the school, and the other enteries are the students' numbers according to the school's preferences.
        StudentsNumberPreferencesCombined = []
        for i in range(player.StudentsNumber):
            L = [i + 1]
            current_round_students_list = player.participant.students_lists[player.round_number - 1]
            for j in range(player.SchoolsNumber):
                L.append(player.participant.schools_alphabet[current_round_students_list[i][j]])
            StudentsNumberPreferencesCombined.append(L)
        player.participant.studentsAPC = StudentsNumberPreferencesCombined  # This is a list of sublist. Each sublist corresponds to a students: its first entery is the name/number of the student, and the other enteries are the schools' numbers according to the student's preferences.


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
        questions = ["question_1", "question_2", "question_3", "question_4", "question_5"]

        incorrect_answers = ["incorrect_seq_question_1", "incorrect_seq_question_2", "incorrect_seq_question_3", "incorrect_seq_question_4",
                             "incorrect_seq_question_5"]

        return questions + incorrect_answers

    @staticmethod
    def live_method(player: Player, data):
        if data['information_type'] == 'onload':
            player.TimeStamps = player.TimeStamps + '|R:' + data['time']
            player.Clicks = player.Clicks + '||'
        elif data['information_type'] == 'submission':
            player.TimeStamps = player.TimeStamps + '|F:' + data['time']
            player.Clicks = player.Clicks + '||'
            player.FinalMatching = str(player.participant.partialmatching)
            return {player.id_in_group: {'information_type': 'submit', }}
        elif data['information_type'] == 'matching_update':
            stage = data['stage']
            if data['matching'] == C.STAGES[stage]:
                return {player.id_in_group: {'information_type': 'matching_status', 'round': player.round_number, 'status': True}}
            else:
                return {
                    player.id_in_group: {
                        'information_type': 'matching_status', 'round': player.round_number, 'status': False, 'matching': C.STAGES[stage - 1]
                    }
                }
        elif data['information_type'] == 'training_rounds':
            if player.round_number == 2:
                if data['matching'] == C.ALLOCATION_2:
                    return {player.id_in_group: {'information_type': 'matching_status', 'round': player.round_number, 'status': True}}
                else:
                    return {player.id_in_group: {'information_type': 'matching_status', 'round': player.round_number, 'status': False}}
            if player.round_number == 3:
                if data['matching'] == C.ALLOCATION_3:
                    return {player.id_in_group: {'information_type': 'matching_status', 'round': player.round_number, 'status': True}}
                else:
                    return {player.id_in_group: {'information_type': 'matching_status', 'round': player.round_number, 'status': False}}
        elif data['information_type'] == 'reset_button':
            player.participant.matched_number = [0 for i in range(player.SchoolsNumber)]
            player.participant.partialmatching = [0 for i in range(player.StudentsNumber)]
            player.Clicks = player.Clicks + 'reset|'
            return {
                player.id_in_group: {
                    'information_type': 'reset',
                },
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
                            'information_type':               'student_unmatched', 'student': data[
                                'student'], 'matched_number': player.participant.matched_number, 'partialmatching': player.participant.partialmatching,
                        }
                    }
                else:
                    player.Clicks = player.Clicks + data['student'] + ':'
                    return {player.id_in_group: {'information_type': 'student_matching', 'student': data['student']}}
            elif data['information_type'] == 'school_plus_button':
                if player.participant.partialmatching[pystudent] > 0:
                    oldschool = player.participant.partialmatching[pystudent] - 1
                    player.participant.matched_number[oldschool] -= 1
                player.Clicks = player.Clicks + str(data['student']) + ":" + str(data['school']) + '|'
                player.participant.partialmatching[pystudent] = int(data['school'])
                pyschool = int(data['school']) - 1  # This is the integer returned to javascript!!
                player.participant.matched_number[pyschool] += 1
                return {
                    player.id_in_group: {
                        'information_type': 'student_matched', 'student': data['student'], 'school': pyschool, 'student_order':
                            player.participant.matched_number[
                                pyschool], 'matched_number': player.participant.matched_number, 'partialmatching': player.participant.partialmatching, 'clicks': player.Clicks
                    }
                }
            elif data['information_type'] == 'rematch_button':
                if player.Clicks[-2:] == str(data['student']) + ':':
                    school = player.participant.schools_alphabet.index(data['school']) + 1
                    player.Clicks = player.Clicks + str(school) + '|'
                    return {
                        player.id_in_group: {
                            'information_type': 'canceled_rematch', 'student': data['student'], 'school': data['school']
                        }
                    }
                else:
                    player.Clicks = player.Clicks + str(data['student']) + ':'
                    return {
                        player.id_in_group: {
                            'information_type': 'ready_for_rematch', 'student': data['student'], 'school': data['school']
                        }
                    }  # The data sent to javascript is the same that was sent by it. Data['school'] is a letter!

class MechanicsIntro(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

class EndTraining(Page):
    @staticmethod
    def is_displayed(player: Player):
        #check if this is long training
        if player.participant.full_training:
            # if this is long training, show after round 4
            return player.round_number == 4
        else:
            # if this is short training, show after round 2
            return player.round_number == 2

    @staticmethod
    def app_after_this_page(player: Player, upcoming_apps):
        return upcoming_apps[0]




page_sequence = [MechanicsIntro, TrainingRound, DAalghoInterface,EndTraining]
