from otree.api import *


doc = """
Your app description
"""


class C(BaseConstants):
    NAME_IN_URL = 'reflection'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    CHOICES = ['The basic explanation in the beginning of the game', 'The Key Principle of the allocation process',
               'The details of how the allocation process works', 'The way you are used to rank alternatives when asked to rank in real life']


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    typically_rank = models.LongStringField(

    )
    did_change = models.LongStringField(
    )
    is_high_to_low = models.StringField(
        choices=["Yes", "No"],
        widget=widgets.RadioSelect,
        )
    is_explain_help = models.StringField(
        choices=["Yes", "No"],
        widget=widgets.RadioSelect,
        )
    why_not = models.LongStringField(blank=True)
    why_yes = models.LongStringField(blank=True)
    # lead_explanation = models.IntegerField(
    #     choices=[1, 2, 3, 4, 5, 6, 7],
    #     widget=widgets.RadioSelect,
    # )
    # lead_principle = models.IntegerField(
    #     choices=[1, 2, 3, 4, 5, 6, 7],
    #     widget=widgets.RadioSelect,
    # )
    # lead_details = models.IntegerField(
    #     choices=[1, 2, 3, 4, 5, 6, 7],
    #     widget=widgets.RadioSelect,
    # )
    ranking = models.StringField(label="Please click and drag the boxes below so that the order reflects how influential each component was for your understanding of how to rank of the four prizes:")
    understand_choose_rankings = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        blank=True,
    )
    understand_principle = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    understand_allocation = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    how_easy_ranking = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    maximize_choose_second = models.IntegerField(
        min=0,max=100,
    )
    maximize_consider_prizes = models.IntegerField(
        min=0,max=100,
    )
    maximize_consider_rankings_other = models.IntegerField(
        min=0,max=100,
    )
    maximize_consider_prize_priorities = models.IntegerField(
        min=0,max=100,
    )
    chance_all_allocated = models.IntegerField(
        min=0,max=100,
    )
    chance_Instability = models.IntegerField(
        min=0,max=100,
    )
    chance_Pareto = models.IntegerField(
        min=0,max=100,
    )
    agree_allocation_fare = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    agree_allocation_good =models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    trust_account_all_participants =models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    rely_in_real_life =models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    allocation_transparent =models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    allocation_predictable =models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )
    your_ranking_matters = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
    )



# PAGES
class Reflection(Page):
    form_model = 'player'
    form_fields = [ "typically_rank", "did_change", "is_high_to_low", "is_explain_help", "why_not", "why_yes", "understand_choose_rankings", "understand_principle",
                   "understand_allocation", "how_easy_ranking", "maximize_choose_second", "maximize_consider_prizes",
                   "maximize_consider_rankings_other", "maximize_consider_prize_priorities", "chance_all_allocated",
                   "chance_Instability", "chance_Pareto", "agree_allocation_fare", "agree_allocation_good",
                   "trust_account_all_participants", "rely_in_real_life", "allocation_transparent", "allocation_predictable",
                   "your_ranking_matters"]







page_sequence = [Reflection]
