from otree.api import *
import time, random
import numpy


doc = """
Your app description
"""

def prizes_priorities_list():
    first_round_priorities = [
        [2, 3, 0, 1],
        [2, 0, 3, 1],
        [3, 2, 0, 1],
        [0, 3, 1, 2]
    ]

    second_round_priorities = [
        [2, 1, 0, 3],
        [0, 2, 1, 3],
        [2, 3, 1, 0],
        [1, 0, 3, 2]
    ]

    third_round_priorities = [
        [2, 1, 0, 3],
        [2, 0, 1, 3],
        [2, 3, 1, 0],
        [1, 3, 0, 2]
    ]

    return [first_round_priorities, second_round_priorities, third_round_priorities]

def players_rankings_list():
    first_round_rankings = [
        [0, 2, 3, 1],
        [1, 0, 2, 3],
        [2, 1, 0, 3]
    ]

    second_round_rankings = [
        [0, 2, 3, 1],
        [1, 0, 2, 3],
        [3, 1, 0, 2]
    ]

    third_round_rankings = [
        [2, 3, 0, 1],
        [1, 0, 2, 3],
        [3, 1, 0, 2]
    ]

    return [first_round_rankings, second_round_rankings, third_round_rankings]

def expected_rankings_list():
    first_round_ranking = [2, 1, 0, 3]
    second_round_ranking = [0, 1, 3, 2]
    third_round_ranking = [3, 1, 2, 0]

    return [first_round_ranking, second_round_ranking, third_round_ranking]

def questions_answers():
    first_round = {
        "general-property": "True",
        # "self-rank-independence": "False",
        # "competitors-rank-independence": "True",
        "mechanism-misconception-1": "False",
        "mechanism-misconception-2": "False",
        "different-rank-outcome": "4"
    }

    second_round = {
        "ranking-change-1": "False",
        "ranking-change-2": "True",
        "ranking-change-3": "False",
        "ranking-change-4": "False",
        "ranking-change-5": "True",
        "brute-force-1": "3",
        "brute-force-2": "1",
        "brute-force-3": "2",
        "brute-force-4": "2"
    }

    third_round = {
        "ranking-change-1": "True",
        "ranking-change-2": "False",
        "ranking-change-3": "False",
        "ranking-change-4": "True",
        "ranking-change-5": "False",
        "brute-force-1": "1",
        "brute-force-2": "3",
        "brute-force-3": "3",
        "brute-force-4": "3"
    }

    return [first_round, second_round, third_round]

def make_priority_field(label):
    return models.IntegerField(
        choices = [
            [1, "A"],
            [2, "B"],
            [3, "C"],
            [4, "D"]
        ],
        label = label
    )

def make_boolean_field(label):
    return models.BooleanField(
        choices = [
            [True, "True"],
            [False, "False"]
        ],
        label = label,
        widget = widgets.RadioSelect
    )

def make_ranking_change_field(label):
    return models.BooleanField(
        choices = [
            [True, "Possibly True"],
            [False, "Definitely False"]
        ],
        label = label,
        widget = widgets.RadioSelect
    )

def make_brute_force_field(label):
    return models.IntegerField(
        choices = [
            [1, "Definitely included"],
            [2, "Possibly included"],
            [3, "Certainly not included"]
        ],
        label = label,
        widget = widgets.RadioSelect
    )

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
        return [[-1]*NM,[-1]*NW]
    
    # Create "map" to ranks
    W_ranks = NM * numpy.ones([NW,NM],int)
    for w in range(NW):
        for i in range(len(W_prefs[w])):
            W_ranks[w][W_prefs[w][i]] = i
    
    # Create vector of men still proposing
    proposing_men = numpy.ones(NM,int)
    proposing_index = numpy.zeros(NM,int)
    
    # Temporary matching
    matching = -1 * numpy.ones(NW,int)
    
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
    M_matching = -1 * numpy.ones(NM,int)
    for i in range(NW):
        if W_matching[i] != -1:
            M_matching[W_matching[i]] = i
    
    M_matching = M_matching.tolist()
    W_matching = W_matching.tolist()
    
    return [M_matching, W_matching]


class C(BaseConstants):
    NAME_IN_URL = 'properties_menu'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 3
    PLAYERS = ["You", "Ruth", "Shirley", "Theresa"]
    PRIZES = ["A", "B", "C", "D"]
    PRIZES_PRIORITIES = prizes_priorities_list()
    PLAYERS_RANKINGS = players_rankings_list()
    EXPECTED_RANKINGS = expected_rankings_list()
    QUESTIONS_ANSWERS = questions_answers()


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    # Player's ranking variables
    first_priority = make_priority_field("First:")
    second_priority = make_priority_field("Second:")
    third_priority = make_priority_field("Third:")
    fourth_priority = make_priority_field("Fourth:")

    # Training round 1 questions
    general_property = make_boolean_field(
        label = "Answer:"
    )

    # self_rank_independence = make_boolean_field(
    #     label = "Answer:"
    # )
    #
    # competitors_rank_independence = make_boolean_field(
    #     label = "Answer:"
    # )

    mechanism_misconception_1 = make_boolean_field(
        label = "Answer:"
    )

    mechanism_misconception_2 = make_boolean_field(
        label = "Answer:"
    )

    different_rank_outcome = models.IntegerField(
        label = "Answer:",
        widget = widgets.RadioSelect
    )

    # Training rounds 2-3 questions
    ranking_change_1 = make_ranking_change_field(
        label = "Answer:"
    )

    ranking_change_2 = make_ranking_change_field(
        label = "Answer:"
    )

    ranking_change_3 = make_ranking_change_field(
        label = "Answer:"
    )

    ranking_change_4 = make_ranking_change_field(
        label = "Answer:"
    )

    ranking_change_5 = make_ranking_change_field(
        label = "Answer:"
    )

    brute_force_1 = make_brute_force_field(
        label = "Answer:"
    )

    brute_force_2 = make_brute_force_field(
        label = "Answer:"
    )

    brute_force_3 = make_brute_force_field(
        label = "Answer:"
    )

    brute_force_4 = make_brute_force_field(
        label = "Answer:"
    )

    # Fields for saving each question's incorrect submitted answers
    incorrect_seq_general_property = models.LongStringField(blank = True)
    # incorrect_seq_self_rank_independence = models.LongStringField(blank = True)
    # incorrect_seq_competitors_rank_independence = models.LongStringField(blank = True)
    incorrect_seq_mechanism_misconception_1 = models.LongStringField(blank = True)
    incorrect_seq_mechanism_misconception_2 = models.LongStringField(blank = True)
    incorrect_seq_different_rank_outcome = models.LongStringField(blank = True)

    incorrect_seq_ranking_change_1 = models.LongStringField(blank = True)
    incorrect_seq_ranking_change_2 = models.LongStringField(blank = True)
    incorrect_seq_ranking_change_3 = models.LongStringField(blank = True)
    incorrect_seq_ranking_change_4 = models.LongStringField(blank = True)
    incorrect_seq_ranking_change_5 = models.LongStringField(blank = True)

    incorrect_seq_brute_force_1 = models.LongStringField(blank = True)
    incorrect_seq_brute_force_2 = models.LongStringField(blank = True)
    incorrect_seq_brute_force_3 = models.LongStringField(blank = True)
    incorrect_seq_brute_force_4 = models.LongStringField(blank = True)


def different_rank_outcome_choices(player: Player):
    choices = [
        [1, "It's certain that every possible ranking I could submit would have gotten me Prize A."],
        [2, "There might be some alternative ranking I could've submitted that would have gotten me Prize B."],
        [3, "There might be some alternative ranking I could've submitted that would have gotten me Prize C."],
        [4, "There might be some alternative ranking I could've submitted that would have gotten me Prize D."]
    ]

    random.shuffle(choices)
    return choices

# PAGES
class ExplanationPage(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


class TrainingRound(Page):
    form_model = "player"

    @staticmethod
    def get_form_fields(player: Player):
        priorities = [
            "first_priority",
            "second_priority",
            "third_priority",
            "fourth_priority",
        ]

        # Training question for the round 1 only.
        training_questions = [
                "general_property",
                # "self_rank_independence",
                # "competitors_rank_independence",
                "mechanism_misconception_1",
                "mechanism_misconception_2",
                "different_rank_outcome"
            ]
        
        # Fields for tracking incorrect answers for round 1 only.
        incorrect_answers = [
            "incorrect_seq_general_property",
            # "incorrect_seq_self_rank_independence",
            # "incorrect_seq_competitors_rank_independence",
            "incorrect_seq_mechanism_misconception_1",
            "incorrect_seq_mechanism_misconception_2",
            "incorrect_seq_different_rank_outcome"
        ]

        if player.round_number > 1:
            # Training questions for rounds 2 + 3.
            training_questions = [
                "ranking_change_1",
                "ranking_change_2",
                "ranking_change_3",
                "ranking_change_4",
                "ranking_change_5",
                "brute_force_1",
                "brute_force_2",
                "brute_force_3",
                "brute_force_4"
                
            ]

            # Fields for tracking incorrect answers for rounds 2 + 3.
            incorrect_answers = [
                "incorrect_seq_ranking_change_1",
                "incorrect_seq_ranking_change_2",
                "incorrect_seq_ranking_change_3",
                "incorrect_seq_ranking_change_4",
                "incorrect_seq_ranking_change_5",
                "incorrect_seq_brute_force_1",
                "incorrect_seq_brute_force_2",
                "incorrect_seq_brute_force_3",
                "incorrect_seq_brute_force_4"
            ]

        return priorities + training_questions + incorrect_answers
    
    @staticmethod
    def js_vars(player: Player):
        return dict(
            prizes = C.PRIZES,
            prizes_priorities = C.PRIZES_PRIORITIES[player.round_number - 1],
            players = C.PLAYERS,
            players_rankings = C.PLAYERS_RANKINGS[player.round_number - 1],
            player_expected_ranking = C.EXPECTED_RANKINGS[player.round_number - 1],
            questions_answers = C.QUESTIONS_ANSWERS[player.round_number - 1]
        )

    @staticmethod
    def live_method(player: Player, data):
        """
        Recieves a data stracture from the client side, calls the
        Differed-Acceptance algorithm and sends the client side the
        player's matched prize and its value

        Parameters
        ----------
        player: Player
            Otree's object representing the current player.
        data: dictionary
            A data set with all the information needed from the client side
            for the matching algorithm.
        Returns
        -------
        dictionary
            A data set with the player's matched prize and its value.
        """
        # Sleep for 2 seconds to give the feeling the allocation process
        # takes more time than it really is (which practically 0 in our case).
        time.sleep(2)
        # TODO: Back when this was implemented, all the rounds data was determined
        #       in the frontend side (preferences of competitors and prizes, prizes values, etc.).
        #       Now, everything is implemented in the backend side. So, while everything still
        #       works fine, we should consider refactoring all the source code to avoid redundant
        #       transfer of data.
        preferences = data["preferences"]
        prizes = data["prizes"]
        matching = da(preferences)
        user_prize = matching[0][0]
        response = dict(
            prize = prizes[user_prize],
            value = 30
        )

        return {0: response}


page_sequence = [ExplanationPage, TrainingRound]
