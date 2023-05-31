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
        label="We’ll start with a general question: How did you typically rank the four prizes? Please share with us your main considerations, even if you are not sure that you always thought about them all. "
    )
    did_change = models.LongStringField(
        label="Did you change the way you rank throughout the game? If so, in which way and at which point?"
    )
    is_high_to_low = models.StringField(
        choices=["Yes", "No"],
        widget=widgets.RadioSelect,
        label="Some participants of this study submit rankings that are not ordered from the highest-earning prize "
              "to the lowest-earning one. When forming your rankings during the game, did you typically rank the prizes from the highest-earning prize to the lowest-earning one?"
    )
    is_explain_help = models.StringField(
        choices=["Yes", "No"],
        widget=widgets.RadioSelect,
        label="In your view, did the explanations given during the game lead you to use a specific method of ranking the four prizes?"
    )
    why_not = models.LongStringField( label="Why do you think the explanations did not lead you to use a specific method of ranking the four prizes?")
    why_yes = models.LongStringField( label="What was that specific ranking method?")
    lead_explanation = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="The basic explanation in the beginning of the game"
    )
    lead_principle = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="The Key Principle of the allocation process"
    )
    lead_details = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="The details of how the allocation process works"
    )
    ranking = models.StringField(label="Please click and drag the boxes below so that the order reflects how influential each component was for your understanding of how to rank of the four prizes:")
    understand_choose_rankings = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How well do you think you now understand How to best choose your own ranking"
    )
    understand_principle = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How well do you think you now understand The Key Principle of the allocation process"
    )
    understand_allocation = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How well do you think you now understand How the allocation process works"
    )
    how_easy_ranking = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How easy was it for you to come up with your ranking each round?"
    )
    maximize_choose_second = models.IntegerField(
        min=0,max=100,
        label=" Sometimes I might have to rank the prize that earns me the most in second place or lower."
    )
    maximize_consider_prizes = models.IntegerField(
        min=0,max=100,
        label="I should consider how much each prize earns me while choosing my own ranking."
    )
    maximize_consider_rankings_other = models.IntegerField(
        min=0,max=100,
        label="I should consider the possible rankings of the other participants while choosing my own ranking."
    )
    maximize_consider_prize_priorities = models.IntegerField(
        min=0,max=100,
        label="I should consider the prize priorities while choosing my own rankings."
    )
    chance_all_allocated = models.IntegerField(
        min=0,max=100,
        label="The allocation process always ends with each participant getting a different prize, and each prize awarded to some participant."
    )
    chance_Instability = models.IntegerField(
        min=0,max=100,
        label="After the allocation process, there may be some participant and prize such that the participant ranks the prize higher than the prize they actually receive, and likewise, the participant has higher priority at the prize than the other participant who actually received the prize."
    )
    chance_Pareto = models.IntegerField(
        min=0,max=100,
        label="After the allocation process, any way to reallocate the prizes will definitely make some participant worse off according to their ranking, relative to the prize they got."
    )
    agree_allocation_fare = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="The allocation process is fair."
    )
    agree_allocation_good = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="The allocation process is overall a good way to allocate the prizes."
    )
    trust_account_all_participants = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How confident are you in the allocation process’s ability to give each participant a prize that they ranked higher rather than a prize that they ranked lower, while taking into account the rankings of all participants?"
    )
    rely_in_real_life = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How much would you be willing to rely on the allocation process in an important situation in real life (for example, assignment of students to public schools)?"
    )
    allocation_transparent = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How transparent is the allocation process, meaning that you received a full explanation of how the allocation process really works, and no details were kept away from you?"
    )
    allocation_predictable = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="How predictable is the final allocation?"
    )
    your_ranking_matters = models.IntegerField(
        choices=[1, 2, 3, 4, 5, 6, 7],
        widget=widgets.RadioSelect,
        label="To what extent do you think that your submitted ranking matters for the final allocation?"
    )





# PAGES
class Reflection(Page):
    form_model = 'player'
    form_fields = ["ranking", "typically_rank", "did_change", "is_high_to_low", "is_explain_help", "why_not", "why_yes",
                   "lead_explanation", "lead_principle", "lead_details", "understand_choose_rankings", "understand_principle",
                   "understand_allocation", "how_easy_ranking", "maximize_choose_second", "maximize_consider_prizes",
                   "maximize_consider_rankings_other", "maximize_consider_prize_priorities", "chance_all_allocated",
                   "chance_Instability", "chance_Pareto", "agree_allocation_fare", "agree_allocation_good",
                   "trust_account_all_participants", "rely_in_real_life", "allocation_transparent", "allocation_predictable",
                   "your_ranking_matters"]






page_sequence = [Reflection]
