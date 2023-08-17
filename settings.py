from os import environ

from otree.project_template.settings import SESSION_CONFIG_DEFAULTS
SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=17.00, doc="",currency="USD",DEBUG=True
)
SESSION_CONFIGS=[
    {
        'name' : 'MECH_TRAD_LT',
        'display_name' : 'Mechanics Traditional Long Training',
        'num_demo_participants' : 1,
        'participation_fee': SESSION_CONFIG_DEFAULTS['participation_fee'],
        'app_sequence' : ["trajectory1", "consent_form", "null_intro", "null_training","mechanics_traditional", "real_rounds_batch1","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"MECH_MENU_LT",
        'display_name':"Mechanics Menu Long Training",
        'num_demo_participants':1,
        'participation_fee': SESSION_CONFIG_DEFAULTS['participation_fee'],
        'app_sequence':["trajectory9", "consent_form", "null_intro", "null_training","mechanics_menu", "real_rounds_batch1","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':                  'PROP_MENU_LT',
        'display_name':          'Properties Menu Long Training',
        'num_demo_participants': 1,
        'participation_fee':     SESSION_CONFIG_DEFAULTS['participation_fee'],
        'app_sequence':          ["trajectory13", "consent_form", "null_intro", "null_training", "properties_menu", "real_rounds_batch1",
                                  "understanding_test", "reflection", "cognitive_abilities", "demographics", "exit"]
    },
    {
        'name':                  'PROP_TRAD_LT',
        'display_name':          'Properties Traditional Long Training',
        'num_demo_participants': 1,
        'participation_fee':     SESSION_CONFIG_DEFAULTS['participation_fee'],
        'app_sequence':          ["trajectory5", "consent_form", "null_intro", "null_training", "properties_traditional", "real_rounds_batch1","understanding_test", "reflection", "cognitive_abilities", "demographics", "exit"]
    },
    {
        "name":"NULL_LT",
        "display_name":"Null Long Training",
        "num_demo_participants":1,
        "participation_fee":SESSION_CONFIG_DEFAULTS['participation_fee'],
        "app_sequence":["trajectory17", "consent_form", "null_intro", "null_training", "null", "real_rounds_batch1", "understanding_test", "reflection", "cognitive_abilities", "demographics", "exit"]
    },
    {
        "name":"TREATMENT_ALLOCATOR",
        "display_name":"Treatment Allocator",
        'num_demo_participants':1,
        "app_sequence":["treatment_allocator"],
    }
]
ROOMS =[
    {"name": "trajectory_1", "display_name": "MECH_TRAD_LT"},
    {"name": "trajectory_9", "display_name": "MECH_MENU_LT"},
    {"name": "trajectory_5", "display_name": "PROP_TRAD_LT"},
    {"name": "trajectory_13", "display_name": "PROP_MENU_LT"},
    {"name": "trajectory_17", "display_name": "NULL_LT"},
    {"name": "treatment_allocator", "display_name": "TREATMENT_ALLOCATOR"}
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']



PARTICIPANT_FIELDS = [
    "trajectory_num",
    "full_training",
    "consent",
    "understanding_bonus",
    "understanding_bonus_limit",
    "full_name",
    "email",
    "runtime__variant",
    "runtime__treatment"
                      ]
SESSION_FIELDS = []

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = SESSION_CONFIG_DEFAULTS["currency"]
USE_POINTS = False

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = "semd-admin"

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = '6162084313426'
