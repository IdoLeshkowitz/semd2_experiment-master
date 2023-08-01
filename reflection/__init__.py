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
    typically_rank = models.StringField(blank=True, initial='')
    did_change =  models.LongStringField(blank=True, initial='')
    is_explain_help= models.LongStringField(blank=True, initial='')
    why_not = models.LongStringField(blank=True, initial='')
    why_yes = models.LongStringField(blank=True, initial='')
    understand_choose_rankings = models.LongStringField(blank=True, initial='')
    understand_principle = models.LongStringField(blank=True, initial='')
    understand_allocation = models.LongStringField(blank=True, initial='')
    chance_all_allocated = models.LongStringField(blank=True, initial='')
    agree_allocation_fare = models.LongStringField(blank=True, initial='')
    agree_allocation_good = models.LongStringField(blank=True, initial='')
    rely_in_real_life = models.LongStringField(blank=True, initial='')
    allocation_transparent = models.LongStringField(blank=True, initial='')
    allocation_predictable = models.LongStringField(blank=True, initial='')
    your_ranking_matters = models.LongStringField(blank=True, initial='')

    start_time = models.StringField(blank=True)
    end_time = models.StringField(blank=True)
# PAGES
class Reflection(Page):
    form_model = 'player'
    form_fields = [
        'typically_rank',
        'did_change',
        'is_explain_help',
        'why_not',
        'why_yes',
        'understand_choose_rankings',
        'understand_principle',
        'understand_allocation',
        'chance_all_allocated',
        'agree_allocation_fare',
        'agree_allocation_good',
        'rely_in_real_life',
        'allocation_transparent',
        'allocation_predictable',
        'your_ranking_matters'
    ]
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.end_time = str(datetime.now(timezone.utc))


class PreProcess(Page):
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        player.start_time = str(datetime.now(timezone.utc))

page_sequence = [PreProcess,Reflection]
