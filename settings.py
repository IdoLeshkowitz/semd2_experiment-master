from os import environ

SESSION_CONFIGS = [
    # Traditional, Mech-Prop, A
    dict(
        name="trajectory_1",
        display_name="Traditional, Mech-Prop, A",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      # mechanics_traditional + training
                      "step_2_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Traditional, Mech-Prop, B
    dict(
        name="trajectory_2",
        display_name="Traditional, Mech-Prop, B",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      # mechanics_traditional + training
                      "step_2_rounds",
                      "properties_traditional", "step_3_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Traditional, Prop-Mech, A
    dict(
        name="trajectory_3",
        display_name="Traditional, Prop-Mech, A",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "properties_traditional", "step_2_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Traditional, Prop-Mech, B
    dict(
        name="trajectory_4",
        display_name="Traditional, Prop-Mech, B",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "properties_traditional", "step_2_rounds",
                      # mechanics_traditional + training
                      "step_3_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Menu, Mech-Prop, A
    dict(
        name="trajectory_5",
        display_name="Menu, Mech-Prop, A",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      # mechanics_menu + training
                      "step_2_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Menu, Mech-Prop, B
    dict(
        name="trajectory_6",
        display_name="Menu, Mech-Prop, B",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      # mechanics_menu + training
                      "step_2_rounds",
                      "properties_menu", "step_3_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Menu, Prop-Mech, A
    dict(
        name="trajectory_7",
        display_name="Menu, Prop-Mech, A",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "properties_menu", "step_2_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Menu, Prop-Mech, B
    dict(
        name="trajectory_8",
        display_name="Menu, Prop-Mech, B",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "properties_menu", "step_2_rounds",
                      # mechanics_menu + training
                      "step_3_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Null, A
    dict(
        name="trajectory_9",
        display_name="Null, A",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "step_2_rounds",
                      # reflection, standardized tests, demographics
                      ]
    ),
    # Null, B
    dict(
        name="trajectory_10",
        display_name="Null, B",
        num_demo_participants=1,
        app_sequence=["consent_form", "step_1_null_description", "step_1_training_rounds",
                      "step_2_rounds",
                      "step_3_null_description", "step_3_rounds"
                      # reflection, standardized tests, demographics
                      ]
    ),
    # dict(
    #     name = "trajectory_1",
    #     display_name = "Traditional 1 Plan 1",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "step_2_rounds", "properties_traditional", "step_3_rounds"]
    # ),
    # dict(
    #     name = "trajectory_2",
    #     display_name = "Traditional 1 Plan 2",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "step_2_rounds", "properties_traditional", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_3",
    #     display_name = "Traditional 2 Plan 1",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "properties_traditional", "step_2_rounds", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_4",
    #     display_name = "Traditional 2 Plan 2",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "properties_traditional", "step_1_rounds", "step_2_rounds", "step_3_rounds"]
    # ),
    # dict(
    #     name = "trajectory_5",
    #     display_name = "Menu 1 Plan 1",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "step_2_rounds", "properties_menu", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_6",
    #     display_name = "Menu 1 Plan 2",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "step_2_rounds", "properties_menu", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_7",
    #     display_name = "Menu 2 Plan 1",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "properties_menu", "step_2_rounds", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_8",
    #     display_name = "Menu 2 Plan 2",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "properties_menu", "step_1_rounds", "step_2_rounds", "step_3_rounds"]
    # ),
    #
    # dict(
    #     name = "trajectory_9",
    #     display_name = "Null",
    #     num_demo_participants = 1,
    #     app_sequence = ["consent_form", "step_1_null_description", "step_1_rounds", "step_2_null_description", "step_2_rounds", "step_3_null_description", "step_3_rounds"]
    # ),
    dict(
        name = "allocator",
        display_name = "Treatment Allocator",
        num_demo_participants = 2,
        app_sequence = ["treatment_allocator"]
    )
]

ROOMS = [
    dict(
        name = "trajectory_1",
        display_name = "Traditional 1 Plan 1"
    ),

    dict(
        name = "trajectory_2",
        display_name = "Traditional 1 Plan 2"
    ),

    dict(
        name = "trajectory_3",
        display_name = "Traditional 2 Plan 1"
    ),

    dict(
        name = "trajectory_4",
        display_name = "Traditional 2 Plan 2"
    ),

    dict(
        name = "trajectory_5",
        display_name = "Menu 1 Plan 1"
    ),

    dict(
        name = "trajectory_6",
        display_name = "Menu 1 Plan 2"
    ),

    dict(
        name = "trajectory_7",
        display_name = "Menu 2 Plan 1"
    ),

    dict(
        name = "trajectory_8",
        display_name = "Menu 2 Plan 2"
    ),

    dict(
        name = "trajectory_9",
        display_name = "Null"
    ),
    dict(
        name = "trajectory_10",
        display_name = "NullB"
    )
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=0.00, doc=""
)

PARTICIPANT_FIELDS = ["trajectory_num"]
SESSION_FIELDS = []

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = '6162084313426'
