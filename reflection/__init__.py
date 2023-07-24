from otree.api import *
from datetime import datetime, timezone

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
    did_change = models.LongStringField()
    is_explain_help = models.StringField(choices=["Yes", "No"], widget=widgets.RadioSelect, )
    why_not = models.LongStringField(blank=True)
    why_choose = models.LongStringField(blank=True)
    why_yes = models.LongStringField(blank=True)
    understand_choose_rankings = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    understand_principle = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    understand_allocation = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    maximize_consider_prizes = models.IntegerField(min=0, max=100, )
    maximize_consider_rankings_other = models.IntegerField(min=0, max=100, )
    maximize_consider_prize_priorities = models.IntegerField(min=0, max=100, )
    chance_all_allocated = models.IntegerField(min=0, max=100, )
    chance_Pareto = models.IntegerField(min=0, max=100, )
    agree_allocation_fare = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    agree_allocation_good = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    rely_in_real_life = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    allocation_transparent = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    allocation_predictable = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    your_ranking_matters = models.IntegerField(choices=[1, 2, 3, 4, 5, 6, 7], widget=widgets.RadioSelect, )
    start_time = models.StringField(initial=str(datetime.now(timezone.utc)))
    end_time = models.StringField(blank=True)


# PAGES
class Reflection(Page):
    form_model = 'player'
    form_fields = ["typically_rank", "did_change", "is_explain_help", "why_not", "why_yes", "understand_choose_rankings","why_choose",
                   "understand_principle", "understand_allocation", "chance_all_allocated", "chance_Pareto",
                   "agree_allocation_fare", "agree_allocation_good", "rely_in_real_life", "allocation_transparent","allocation_predictable", "your_ranking_matters"]
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.end_time = str(datetime.now(timezone.utc))


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))

page_sequence = [PreProcess,Reflection]
