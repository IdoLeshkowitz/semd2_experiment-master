from os import environ
SESSION_CONFIGS=[
    {
        'name' : 'MECH_TRAD_LT',
        'display_name' : 'Mechanics Traditional Long Training',
        'num_demo_participants' : 1,
        'participation_fee': 9,
        'app_sequence' : ["trajectory1", "ConsentForm", "NullIntro", "NullTraining","mechanics_traditional", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name' : 'MECH_TRAD_ST',
        'display_name' : 'Mechanics Traditional Short Training',
        'num_demo_participants' : 1,
        'app_sequence' : ["trajectory2", "ConsentForm", "NullIntro", "NullTraining","mechanics_traditional", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name' : 'MECH_TRAD_PROP_TRAD_LT',
        'display_name' : 'Mechanics Traditional Properties Traditional Long Training',
        'num_demo_participants' : 1,
        'app_sequence' : ["trajectory3", "ConsentForm", "NullIntro", "NullTraining","mechanics_traditional", "step_2_rounds","properties_traditional", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name' : 'MECH_TRAD_PROP_TRAD_ST',
        'display_name' : 'Mechanics Traditional Properties Traditional Short Training',
        'num_demo_participants' : 1,
        'app_sequence' : ["trajectory4", "ConsentForm", "NullIntro", "NullTraining","mechanics_traditional", "step_2_rounds","properties_traditional", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name' : 'PROP_TRAD_LT',
        'display_name' : 'Properties Traditional Long Training',
        'num_demo_participants' : 1,
        'app_sequence' : ["trajectory5", "ConsentForm", "NullIntro", "NullTraining","properties_traditional", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name' : 'PROP_TRAD_ST',
        'display_name' : 'Properties Traditional Short Training',
        'num_demo_participants' : 1,
        'app_sequence' : ["trajectory6", "ConsentForm", "NullIntro", "NullTraining","properties_traditional", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_TRAD_MECH_TRAD_LT",
        'display_name':"Properties Traditional Mechanics Traditional Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory7", "ConsentForm", "NullIntro", "NullTraining","properties_traditional", "step_2_rounds","mechanics_traditional", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_TRAD_MECH_TRAD_ST",
        'display_name':"Properties Traditional Mechanics Traditional Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory8", "ConsentForm", "NullIntro", "NullTraining","properties_traditional", "step_2_rounds","mechanics_traditional", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"MECH_MENU_LT",
        'display_name':"Mechanics Menu Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory9", "ConsentForm", "NullIntro", "NullTraining","mechanics_menu", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"MECH_MENU_ST",
        'display_name':"Mechanics Menu Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory10", "ConsentForm", "NullIntro", "NullTraining","mechanics_menu", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"MECH_MENU_PROP_MENU_LT",
        'display_name':"Mechanics Menu Properties Menu Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory11", "ConsentForm", "NullIntro", "NullTraining","mechanics_menu", "step_2_rounds","properties_menu", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"MECH_MENU_PROP_MENU_ST",
        'display_name':"Mechanics Menu Properties Menu Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory12", "ConsentForm", "NullIntro", "NullTraining","mechanics_menu", "step_2_rounds","properties_menu", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_MENU_LT",
        'display_name':"Properties Menu Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory13", "ConsentForm", "NullIntro", "NullTraining","properties_menu", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_MENU_ST",
        'display_name':"Properties Menu Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory14", "ConsentForm", "NullIntro", "NullTraining","properties_menu", "step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_MENU_MECH_MENU_LT",
        'display_name':"Properties Menu Mechanics Menu Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory15", "ConsentForm", "NullIntro", "NullTraining","properties_menu", "step_2_rounds","mechanics_menu", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"PROP_MENU_MECH_MENU_ST",
        'display_name':"Properties Menu Mechanics Menu Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory16", "ConsentForm", "NullIntro", "NullTraining", "properties_menu", "step_2_rounds","mechanics_menu", "step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        "name":"NULL_LT",
        "display_name":"Null Long Training",
        "num_demo_participants":1,
        "app_sequence":["trajectory17", "ConsentForm", "NullIntro", "NullTraining","step_1_null_training_rounds","step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit"]
    },
    {
        "name":"NULL_ST",
        "display_name":"Null Short Training",
        "num_demo_participants":1,
        "app_sequence":["trajectory18", "ConsentForm", "NullIntro", "NullTraining","step_1_null_training_rounds","step_2_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit"]
    },
    {
        'name':"NULL_NULL_LT",
        'display_name':"Null Null Long Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory19", "ConsentForm", "NullIntro", "NullTraining","step_1_null_training_rounds","step_2_rounds","step_3_null_description","step_3_null_training_rounds","step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    },
    {
        'name':"NULL_NULL_ST",
        'display_name':"Null Null Short Training",
        'num_demo_participants':1,
        'app_sequence':["trajectory20", "ConsentForm", "NullIntro", "NullTraining","step_1_null_training_rounds","step_2_rounds","step_3_null_description","step_3_null_training_rounds","step_3_rounds","understanding_test","reflection","cognitive_abilities", "demographics", "exit" ]
    }, dict(name="allocator", display_name="Treatment Allocator", num_demo_participants=40, app_sequence=["treatment_allocator"])
]
ROOMS =[
    {"name": "trajectory_1", "display_name": "MECH_TRAD_LT"},
    {"name": "trajectory_2", "display_name": "MECH_TRAD_ST"},
    {"name": "trajectory_3", "display_name": "MECH_TRAD_PROP_TRAD_LT"},
    {"name": "trajectory_4", "display_name": "MECH_TRAD_PROP_TRAD_ST"},
    {"name": "trajectory_5", "display_name": "PROP_TRAD_LT"},
    {"name": "trajectory_6", "display_name": "PROP_TRAD_ST"},
    {"name": "trajectory_7", "display_name": "PROP_TRAD_MECH_TRAD_LT"},
    {"name": "trajectory_8", "display_name": "PROP_TRAD_MECH_TRAD_ST"},
    {"name": "trajectory_9", "display_name": "MECH_MENU_LT"},
    {"name": "trajectory_10", "display_name": "MECH_MENU_ST"},
    {"name": "trajectory_11", "display_name": "MECH_MENU_PROP_MENU_LT"},
    {"name": "trajectory_12", "display_name": "MECH_MENU_PROP_MENU_ST"},
    {"name": "trajectory_13", "display_name": "PROP_MENU_LT"},
    {"name": "trajectory_14", "display_name": "PROP_MENU_ST"},
    {"name": "trajectory_15", "display_name": "PROP_MENU_MECH_MENU_LT"},
    {"name": "trajectory_16", "display_name": "PROP_MENU_MECH_MENU_ST"},
    {"name": "trajectory_17", "display_name": "NULL_LT"},
    {"name": "trajectory_18", "display_name": "NULL_ST"},
    {"name": "trajectory_19", "display_name": "NULL_NULL_LT"},
    {"name": "trajectory_20", "display_name": "NULL_NULL_ST"},
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=0.00, doc="",currency="USD"
)

PARTICIPANT_FIELDS = ["trajectory_num",'matchingalgho',  # History of the participant's choices until that point. To be presented somehow on the screen.
    'schools_lists',
    # This is a list of sublist. Each sublist corresponds to a school: the nth sublist represents the nth school's preferences: The first number represents the most preferred student by the school, the second entery represents the second-best preferred student etc.
    'students_lists',
    # This is a list of sublist. Each sublist corresponds to a student: the nth sublist represents the nth student's preferences: The first number represents the most preferred school by the student, the second entery represents the second-best preferred school etc.
    'partialmatching',
    # The current partial matching according to the participant's choices until that point. The length of the list equals the number of students. The value of each entery is the number of the school that the student has been matched too. Equals -10 if the student hasn't been matched yet.
    'schools_alphabet',  # A list [A,B,...,X] where X is the nth letter of the alphabet and n is the number of schools.
    'students_alphabet',
    'students_names',  # A list [1,2,...,m] where m is the number of students.
    'schools_range',  # A list [0,1,...,n-1] where n is the number of schools.
    'students_range',  # A list [0,1,...,m-1] where m is the number of students.
    'schoolsAPC',
    # This is a list of sublist. Each sublist corresponds to a school: its first entery is the name/letter of the school, and the other enteries are the students' numbers according to the school's preferences.
    'studentsAPC',
    # This is a list of sublist. Each sublist corresponds to a students: its first entery is the name/number of the student, and the other enteries are the schools' numbers according to the student's preferences.
    'max_students_per_school',
    # The nth number in the list represents the maximal number of students that can be matched to the nth school.
    'matched_number',
    "expected_ranking",
    "participants_priorities",
    "prizes_priorities",
    "current_matching",
    "expected_matching",
    "matching_memo",
    "full_training",
    "consent",
    "understanding_bonus",
    "max_understanding_bonus",
    "full_name",
    "email"
                      ]
SESSION_FIELDS = []

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = False

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = "semd-admin"

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = '6162084313426'
