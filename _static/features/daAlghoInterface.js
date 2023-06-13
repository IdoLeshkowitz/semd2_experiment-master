window.addEventListener('DOMContentLoaded', (event) => {
    renderDaAlgoPage()
});

function renderDaAlgoPage() {
    const jsxCode = `
    function Stam(){
        return <div></div>
    }
    const steps = {
        "traditional":{
            round1:[
                {
                    id: "instructions_1",
                    type: "instructions",
                    content : (
                        <>
                            <p>
                            The training round is not yet over. To complete it, you will perform the allocation process by yourself, instead of the computer.
                            </p>
                            <p>
                                Remember: each step or question during the process will count for your Understanding Bonus only if you get it correctly on your first attempt. Think about your answers carefully!
                            </p>
                            <p>
                                We will guide you how to use the <b>Allocation Dashboard</b> below to find the allocation of prizes to all participants.
                            </p>
                        </>
                    )
                },
                {
                    id: "instructions_2",
                    type: "instructions",
                    content : (
                        <>
                            <p>
                                On the upper left part of the dashboard below you see a condensed version of the <b>Prize Priorities</b> that you saw before.
                            </p>
                            <p>
                                Each letter under a prize name indicates one of the four participants. The higher it is placed in the column, the higher the priority of that participant at that prize.
                            </p>
                            <p>
                                <b>For example:</b> The column under the letter <b>“A”</b> indicates the priorities of Prize A. Ruth <b>(“R”)</b> has the first (highest) priority for getting that prize, Shirley <b>(“S”)</b> has the second priority, Theresa <b>(“T”)</b> has the third priority, and you <b>(“Y”)</b> have the fourth (lowest) priority.
                            </p>
                        </>
                    )
                },
                {
                    id: 'instructions_3',
                    type: 'instructions',
                    content :(
                        <>
                            <p>
                                On the upper right part of the dashboard below you see a condensed version of the <b>Participant Rankings</b>.
                            </p>
                            <p>
                                Each letter under a participant name indicates one of the four prizes. The higher it is placed in the column, the higher that prize was ranked by that participant.
                            </p>
                            <Accordion title={<b>For example:...</b>}> 
                                <p>
                                    The column under the letter <b>“R”</b> indicates the ranking submitted by the computerized participant Ruth. She ranked Prize A <b>(“A”)</b> first (highest), Prize C <b>(“C”)</b> second, Prize D <b>(“D”)</b> third, and Prize B <b>(“B”)</b> fourth (lowest).
                                </p>
                                <p>
                                    Notice that the ranking under “Y” (you) is exactly the ranking that you submitted in the previous screen!
                                </p>
                             </Accordion>
                            <p>
                                Notice: In real rounds of the game you do not see other participants’ rankings, but now, since you are in charge of the allocation process, you are able to see them.
                            </p>
                        </>
                    )
                },
                {
                    id: "instructions_4",
                    type: 'instructions',
                    content :(
                        <p>
                           The middle and lower parts of the dashboard enable you to pair participants to prizes, as will be explained next.
                        </p>
                    )
                },
                {
                    id: "matching_1",
                    type: "matching",
                    expectedMatching :{'Ruth': "A", 'Shirley': 'none', 'Theresa': 'none', 'You': 'none'},
                    content : (
                        <>
                            <p>
                            First, pair each participant to their <b>highest-rank</b> prize.
                            </p>
                            <ol>
                                <li>
                                Start from the “Pick participants to pair” row, and click on <b>Ruth (“R”)</b>.
                                </li>
                                <li>
                                Then, in the list of four prizes at the bottom left part of the dashboard, click on “+” next to the prize that is <b>highest in their ranking</b>.
                                </li>
                            </ol>
                            <p>
                            Hint: the prize that is highest in Ruth’s ranking is indicated by the letter just under “R” in the Participant Rankings table.
                            </p>
                            <p>
                            After pairing, “A” and “R” will be colored purple in the two tables, to indicate that they are paired.
                            </p>
                            <p>
                            Click Submit when done.<br/>
                            (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    correctMsg:(
                         <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                         <p>
                            Correct! <br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    )
                },
                {
                    id: "matching_2",
                    type: "matching",
                    expectedMatching: {"Ruth": "A", "Shirley": "A", "Theresa": "B", "You": "C"},
                    content : (
                        <>
                            <p>
                                Now repeat the same for the three other participants. One by one, pair each of them to their highest-rank prize.
                            </p>
                            <p>
                                Click Submit after completing all three.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    correctMsg:(
                            <p>
                                Correct!
                            </p>
                    ),
                    correctFirstMsg:(
                            <p>
                                Correct! <br/>
                                Good job on the first try! This will count for your Understanding Bonus.
                            </p>
                    ),
                    incorrectMsg:(
                            <p>
                                Incorrect answer. Please try again.
                            </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ),
                },
                {
                    id: "question_1",
                    type: "radio",
                    inputRef: React.createRef(null),
                    expectedAnswerIndex: 3,
                    options :[
                        <span>It is determined at random.</span>,
                        <span>The participant who got paired to Prize A first.</span>,
                        <span>The participant for whom Prize A is in is in the highest rank.</span>,
                        <span>The participant highest in Prize A’s priorities.</span>,
                    ],
                    content : (
                        <>
                            <p>
                                Each participant is now paired to a prize.<br/>
                                However, there are <b>conflicts</b>: two (or more) participants are paired to the same prize.
                            </p>
                            <p>
                                Notice: <b>Ruth</b> and <b>Shirley</b> are both paired to <b>Prize A</b>. This is a conflict.
                            </p>
                            <p>
                                To solve a conflict, the first step is <b>Unpair</b>.<br/>
                                According to this step, only one participant should remain paired to Prize A. <b>Which participant should it be?</b>
                            </p>
                            <p>
                                Please select one of the answers below and then click Submit.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    correctMsg:(
                        <p>
                            Correct! When there is a conflict at some prize, only the participant highest in that prize’s priorities remain paired to that prize. The others should get unpaired.
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                             Correct! When there is a conflict at some prize, only the participant highest in that prize’s priorities remain paired to that prize. The others should get unpaired.<br/>
                             Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                },
                {
                    id: "question_2",
                    inputRef: React.createRef(null),
                    type: "radio",
                    options :[
                        <span>A random prize that is currently unpaired to any participant.</span>,
                        <span>Their highest-rank prize among the prizes they were not yet paired with.</span>,
                        <span>Their highest-rank prize.</span>,
                    ],
                    expectedAnswerIndex: 1,
                    content : (
                        <>
                            <p>
                                The second step in solving conflicts is Re-pair.<br/>
                                After a participant gets unpaired, what new prize do they get paired to?
                            </p>
                            <p>
                                Please select one of the answers below and then click Submit.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    correctMsg:(
                        <p>
                            Correct! Each unpaired participant is re-paired to their highest-rank prize among the prizes they were <b>not yet paired with</b>.
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! Each unpaired participant is re-paired to their highest-rank prize among the prizes they were <b>not yet paired with</b>.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                },
                {
                    id: "matching_3",
                    inputRef: React.createRef(null),
                    type: 'matching',
                    expectedMatching: {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "C"},
                    content : (
                        <>
                            <p>
                                Now, let’s solve the conflict.
                            </p>
                            <p>
                                According to the Prize Priorities, <b>Ruth’s</b> priority for getting <b>Prize A</b> is higher than <b>Shirley’s</b>. Hence, <b>Shirley</b> should get unpaired from <b>Prize A</b> , and then get re-paired to her second highest-rank prize.
                            </p>
                            <p>
                                Perform this using the two steps:
                                <ol>
                                    <li>
                                        <b>Unpair</b>: at the lower part of the dashboard, next to Prize A (“A”), click on <b>Shirley (“S”)</b>.
                                    </li>
                                    <li>
                                        <p><b>Re-pair</b>: at the same lower part of the dashboard, click on “+” next to Shirley’s (“S”) <b>second highest-rank prize</b> among all participants <b>except for you</b>.</p>
                                        <p>Hint: You can easily find which prize it is, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under Shirley’s name (“S”)</p>
                                    </li>
                                </ol>
                            </p>
                            <p>
                                Click Submit when done.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ),
                },
                {
                    id: "question_3",
                    type: "radio",
                    expectedAnswerIndex: 0,
                    content:(
                        <p>Is the process over?</p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    correctMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    options :[
                        <span>No, there are new conflicts: two (or more) participants are paired to the same prize.</span>,
                        <span>No, some participants are paired to prizes that are not in their highest rank.</span>,
                        <span>Yes, it is fine that two (or more) participants are paired to the same prize because they all get different amounts of money anyway.</span>,
                        <span>Yes, there are no more conflicts</span>,
                    ]  
                },
                {
                    id: "matching_4",
                    type: 'matching',
                    expectedMatching :  {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "A"},
                    content : (
                        <>
                            <p>
                                Find all conflicts and solve them like before.
                                First, find all prizes that are paired to two (or more) participants.
                            </p>
                            <ul>
                                <li>
                                    <b>Unpair</b>: for each such prize, keep only the participant with the highest priority at that participant paired to it. <b>Unpair</b> the other prizes from that participant.
                                </li>
                                <li>
                                    <p>
                                        <b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.
                                    </p>
                                    <p>
                                        Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.
                                    </p>
                                </li>
                            </ul>
                            <p>
                                <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen! </span>
                                If new conflicts emerge after solving the current one, wait. You will solve them one-by-one on the next screens.
                            </p>
                            <p>
                                Click Submit when done.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ), 
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ),
                },
                {
                    id: "question_4",
                    inputRef: React.createRef(null),
                    type: "radio",
                    expectedAnswerIndex: 0,
                    content : (
                        <p>Is the process over? <br/>(Get it right on first try to increase your bonus)</p>
                    ),
                    correctMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>No</span>,
                        <span>Yes</span>,
                    ],
                },
                {
                    id: "matching_5",
                    type: 'matching',
                    inputRef: React.createRef(null),
                    expectedMatching : {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "B"},
                    content : (
                        <>
                            <p>
                                Find all conflicts and solve them like before.
                                First, find all prizes that are paired to two (or more) participants.
                            </p>
                            <ul>
                                <li>
                                    <b>Unpair</b>: for each such prize, keep only the participant with the highest priority at that participant paired to it. <b>Unpair</b> the other prizes from that participant.
                                </li>
                                <li>
                                    <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                    <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                </li>
                            </ul>
                            <p>
                                <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!</span>
                                If new conflicts emerge after solving the current one, wait. You will solve them one-by-one on the next screens.
                            </p>
                            <p>
                                Click Submit when done.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                         </>
                    ), 
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ), 
                },
                {
                    id: "question_5",
                    inputRef: React.createRef(null),
                    type: "radio",
                    content : (
                        <p>Is the process over? <br/>(Get it right on first try to increase your bonus)</p>
                    ),
                    correctMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! The process is only over when there are no more conflicts.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>No</span>,
                        <span>Yes</span>,
                    ],
                    expectedAnswerIndex: 0,
                },
                {
                    id: "matching_6",
                    inputRef: React.createRef(null),
                    type: "matching",
                    content : (
                        <>
                            <p>
                                Find all conflicts and solve them like before.
                                First, find all prizes that are paired to two (or more) participants.
                            </p>
                            <ul>
                                <li>
                                    <b>Unpair</b>: for each such prize, keep only the participant with the highest priority at that participant paired to it. <b>Unpair</b> the other prizes from that participant.
                                </li>
                                <li>
                                    <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                    <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                </li>
                            </ul>
                            <p>
                                <span style={{color: "#0b1ae3",fontWeight: "bold"}}>
                                Only solve the conflict you see first on this screen!
                                </span>
                                If new conflicts emerge after solving the current one, wait. You will solve them one-by-one on the next screens.
                            </p>
                            <p>
                                Click Submit when done.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    expectedMatching : {"Ruth": "A", "Shirley": "C", "Theresa": "A", "You": "B"},
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ),    
                },
                {
                    id: "question_6",
                    type: "radio",
                    content : (
                        <p>Is the process over? <br/>(Get it right on first try to increase your bonus)</p>
                    ),
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>No</span>,
                        <span>Yes</span>,
                    ],
                    expectedAnswerIndex: 0,
                },
                {
                    id: "matching_6",
                    type: "matching",
                    content : (
                        <>
                            <p>
                                Find all conflicts and solve them like before.
                                First, find all prizes that are paired to two (or more) participants.
                            </p>
                            <ul>
                                <li>
                                    <b>Unpair</b>: for each such prize, keep only the participant with the highest priority at that participant paired to it. <b>Unpair</b> the other prizes from that participant.
                                </li>
                                <li>
                                    <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                    <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                </li>
                            </ul>
                            <p>
                                <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!</span>
                                If new conflicts emerge after solving the current one, wait. You will solve them one-by-one on the next screens.
                            </p>
                            <p>
                                Click Submit when done.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    expectedMatching : {"Ruth": "A", "Shirley": "C", "Theresa": "D", "You": "B"},
                    correctMsg:(
                        <p>
                            Correct!
                        </p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct!<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    incorrectSkipMsg:(
                        <p>
                            Incorrect answer. We set the dashboard correctly for you this time, and you are being automatically directed to the next step. Please make sure you understand your mistake.
                        </p>
                    ),        
                },
                {
                    id: "question_7",
                    type: "radio",
                    content : (
                        <p>Is the process over? <br/>(Get it right on first try to increase your bonus)</p>
                    ),
                    correctMsg:(
                        <p>Correct! There are no more conflicts.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! There are no more conflicts.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>No</span>,
                        <span>Yes</span>,
                    ],
                    expectedAnswerIndex: 1,    
                },
                {
                    id: "question_8",
                    type: "radio",
                    content : (
                        <>
                            <p>The allocation is the following:
                                <ul>
                                    <li>Prize A is allocated to Ruth.</li>
                                    <li>Prize B is allocated to You.</li>
                                    <li>Prize C is allocated to Shirely.</li>
                                    <li>Prize D is allocated to Theresa.</li>
                                </ul>
                            </p>
                            <p>
                                Which of the following is true?<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                        </>
                    ),
                    correctMsg:(
                        <p> Correct! The allocation generated by the process is the final one, and each participant now gets the prize they were allocated with.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! The allocation generated by the process is the final one, and each participant now gets the prize they were allocated with.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>I can get any prize that I was paired with at some point in the allocation process, with equal chances.</span>,
                        <span>It is certain that I will get the prize allocated to me at the end of the allocation process.</span>,
                        <span>I can only get one of the prizes I was paired with at some point in the allocation process, but I cannot know which one.</span>,
                        <span>I am more likely to get a prize I was paired with at an earlier point in the allocation process than at a later point in the process.</span>,
                    ],
                    expectedAnswerIndex: 1,
                },
                {
                    id: "question_allocation_a",
                    type: "dropdown",
                    content : (
                        <p>
                            Now please verify you understand what participant each prize is allocated to.
                            Click on the participant that each prize is allocated to next to all the prizes below:<br/>
                            (Get it right on first try to increase your bonus)
                        </p>
                    ),
                    correctMsg:(
                        <p>Correct! Prize A is allocated to Ruth.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! Prize A is allocated to Ruth.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>R</span>,
                        <span>S</span>,
                        <span>T</span>,
                        <span>Y</span>,
                    ],
                    expectedAnswerIndex: 0,
                },
                {
                    id: "question_allocation_b",
                    type: "dropdown",
                    content : (
                        <p>
                            Now please verify you understand what participant each prize is allocated to.
                            Click on the participant that each prize is allocated to next to all the prizes below:<br/>
                            (Get it right on first try to increase your bonus)
                        </p>
                    ),
                    correctMsg:(
                        <p>Correct! Prize B is allocated to You.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! Prize B is allocated to You.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>R</span>,
                        <span>S</span>,
                        <span>T</span>,
                        <span>Y</span>,
                    ],
                    expectedAnswerIndex: 3,
                },
                {
                    id: "question_allocation_c",
                    type: "dropdown",
                    content : (
                        <p>
                            Now please verify you understand what participant each prize is allocated to.
                            Click on the participant that each prize is allocated to next to all the prizes below:<br/>
                            (Get it right on first try to increase your bonus)
                        </p>    
                    ),
                    correctMsg:(
                        <p>Correct! Prize C is allocated to Shirley.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! Prize C is allocated to Shirley.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>R</span>,
                        <span>S</span>,
                        <span>T</span>,
                        <span>Y</span>,
                    ],
                    expectedAnswerIndex: 1,                            
                },
                {
                    id: "question_allocation_d",
                    type: "dropdown",
                    content : (
                        <p>
                            Now please verify you understand what participant each prize is allocated to.
                            Click on the participant that each prize is allocated to next to all the prizes below:<br/>
                            (Get it right on first try to increase your bonus)
                        </p>
                    ),
                    correctMsg:(
                        <p>Correct! Prize D is allocated to Theresa.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! Prize D is allocated to Theresa.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>
                            Incorrect answer. Please try again.
                        </p>
                    ),
                    options :[
                        <span>R</span>,
                        <span>S</span>,
                        <span>T</span>,
                        <span>Y</span>,
                    ],
                    expectedAnswerIndex: 2,
                },
                {
                    id: "question_9",
                    type: "radio",
                    content : (
                        <p>Which of the following is true?<br/>(Get it right on first try to increase your bonus)</p>
                    ),
                    correctMsg:(
                        <p>Correct! The last prize you were paired with is the prize allocated to you at the end of the allocation process, and you get this prize.</p>
                    ),
                    correctFirstMsg:(
                        <p>
                            Correct! The last prize you were paired with is the prize allocated to you at the end of the allocation process, and you get this prize.<br/>
                            Good job on the first try! This will count for your Understanding Bonus.
                        </p>
                    ),
                    incorrectMsg:(
                        <p>Incorrect answer. Please try again.</p>
                    ),
                    options :[
                        <span>I will sometimes receive a prize which I ranked lower than any prize I was paired with during the allocation process.</span>,
                        <span>Out of all the prizes I was paired with at some point in the allocation process, I will get the last one I was paired with.</span>,
                        <span>If another participant does not want the prize allocated to them, then I may be able to switch prizes with them.</span>,
                        <span>I am as likely to get a prize I was paired with at a later point in the allocation process as to get a prize I was paired with at an earlier point in the process</span>,
                    ],
                    expectedAnswerIndex: 1,
                },
                {
                    id: "step-23",
                    type: "radio",
                    formFields: {element: "question_10", correctAnswerIndex: 13},
                },
            ],
            round2:[
                {
                    id: "step-1-rounds",
                    type: "instructions",
                },
                {
                    id: "step-2-rounds",
                    type: "matching",
                    stage: 0,
                },
                {
                    id: "step-3-rounds",
                    type: "dropdown",
                    formFields: [
                        {element: "prize_a_obtainable", correctAnswerIndex: 0},
                        {element: "prize_b_obtainable", correctAnswerIndex: 1},
                        {element: "prize_c_obtainable", correctAnswerIndex: 2},
                        {element: "prize_d_obtainable", correctAnswerIndex: 3},
                    ],
                },
                {
                    id: "step-4-rounds",
                    type: "dropdown",
                    formFields: [
                        {element: "obtainable_prize", correctAnswerIndex: 4},
                    ],
                }
            ]
        }
    }
    function getSteps(round,variant){
        return steps[variant]["round"+round]
    }
    const DashboardContext = React.createContext()
    function DaAlgoInterface(props){
        const [currentMatching, setCurrentMatching] = React.useState(props.currentMatching)
        const [modals,setModals] = React.useState({allocation : false})
        const steps = getSteps(props.round,props.variant)
        const [currentStepId,setCurrentStepId] = React.useState(props.currentStepId || steps[0].id)      
        const [selectedProduct,setSelectedProduct] = React.useState(null)
        const matchingCounter = React.useRef(props.matchingCounter)
        const [highlightedCustomer,setHighlightedCustomer] = React.useState(null)
        const matchingMemo = React.useRef(props.matchingMemo)
        function onMouseEnterCustomer(customer){
            /* if there is a selected product, highlight do not highlight the customer */
            if(selectedProduct){
                return
            }
            setHighlightedCustomer(customer)
        }
        function onMouseLeaveCustomer(){
            setHighlightedCustomer(null)
        }
        function onReset(){
            setCurrentMatching(props.products.reduce((acc,product) => {
                acc[product] = "none"
                return acc
            },{}))
            setSelectedProduct(null)
        }
        function onMatching(matchedProduct, matchedToCustomer){
            const productWasMatched = currentMatching[matchedProduct] !== "none"
            let newMatching = {}
            if (!productWasMatched){
                newMatching = {...currentMatching, [matchedProduct]: matchedToCustomer}
            }
            else{
                const productIsCurrentlyMatchedTo = currentMatching[matchedProduct]
                newMatching = {
                    ...currentMatching,
                    [matchedProduct]: matchedToCustomer,
                    [productIsCurrentlyMatchedTo]: "none"
                }
            }
            setCurrentMatching(newMatching)
            setSelectedProduct(null)
            setHighlightedCustomer(matchedToCustomer)
            matchingMemo.current = [...matchingMemo.current, matchedProduct]
        }
        function onProductSelect(product){
            setHighlightedCustomer(null)
            const isSelected = selectedProduct === product
            if (isSelected) {
                React.startTransition(() => {
                    setSelectedProduct(null)
                })
            }
            else {
                setSelectedProduct(product)
            }
        }
        function onProceed(){
            const currentStepIndex = steps.findIndex(step => step.id === currentStepId)
            const nextStep = steps[currentStepIndex + 1]
            if (!nextStep){
                document.querySelector("form").submit()
                return 
            }           
            setCurrentStepId(nextStep.id)
        }
        React.useEffect(()=>{
            liveSend({
            information_type : "matching_update",
            current_matching : currentMatching
            })
        },[currentMatching])
        React.useEffect(()=>{
            liveSend({
            information_type : "matching_memo_update",
            matching_memo : matchingMemo.current
            })
        },[matchingMemo.current])
        React.useEffect(()=>{
            console.log("matchingCounter.current",matchingCounter.current)
            liveSend({
            information_type : "matching_counter_update",
            matching_counter : matchingCounter.current
            })
        },[matchingCounter.current])
        React.useEffect(()=>{
            liveSend({
            information_type : "step_update",
            step_id : currentStepId
            })
        },[currentStepId])
        return (
                <>
                <button type="button" className="button-2" onClick={()=>setModals({allocation:true})}>Click for a reminder on the technical details of the allocation process</button>
                {modals.allocation && <AllocationModal onClose={()=>setModals({allocation:false})} />}
                <DashboardContext.Provider 
                value={{
                    currentMatching,
                    setCurrentMatching,
                    products:props.products,
                    customers:props.customers,
                    maxProductsPerCustomer:props.maxProductsPerCustomer,
                    customersPriorities:props.customersPriorities,
                    productsPriorities:props.productsPriorities,
                    round:props.round,
                    onReset,
                    selectedProduct,
                    setSelectedProduct,
                    highlightedCustomer,
                    onMouseEnterCustomer,
                    onMouseLeaveCustomer,
                    onMatching,
                    matchingMemo,
                    onProductSelect,
                    currentStepId,
                    steps,
                    onProceed,
                    matchingCounter,
                }}
                    >
                    <Questions />
                    <Dashboard />
                </DashboardContext.Provider>
                </>
            )
    }
    function Questions(){
        const {steps,currentStepId,onProceed,currentMatching,matchingCounter,setCurrentMatching} = React.useContext(DashboardContext)
        const [message,setMessage] = React.useState(null)
        const [readyToProceed,setReadyToProceed] = React.useState(false)
        const currentStep = steps.find(step => step.id === currentStepId)
        function onSubmit(){
            if (readyToProceed || currentStep.type === "instructions"){
                setMessage(null)
                setReadyToProceed(false)
                onProceed()
                return 
            }
            if (currentStep.type === "radio"){
                const expectedAnswerIndex = currentStep.expectedAnswerIndex
                const selectedAnswerIndex = parseInt(inputRef.current.querySelector("input:checked")?.value || null)
                const isCorrect = expectedAnswerIndex === selectedAnswerIndex   
                let currentMatchingCounter = matchingCounter.current            
                let understanding_bonus = 0 ;
                if (isCorrect){
                    debugger
                    if (matchingCounter.current === 0){
                        debugger
                        setMessage("correctFirstMsg")
                        understanding_bonus+= 1 
                    }
                    else{
                        debugger
                        setMessage("correctMsg")
                    }
                    matchingCounter.current =  0
                    setReadyToProceed(true)
                    debugger
                }
                else{
                    matchingCounter.current = matchingCounter.current + 1
                    currentMatchingCounter = matchingCounter.current
                    setMessage("incorrectMsg")
                }
                liveSend({
                    information_type : "question_submission",
                    expected_answer : expectedAnswerIndex,
                    selected_answer : selectedAnswerIndex,
                    is_correct : isCorrect,
                    understanding_bonus : understanding_bonus,
                    matching_counter : currentMatchingCounter,
                    time_stamp : new Date().toUTCString(),
                    question_id : currentStep.id
                })
            }
            if (currentStep.type === "matching"){
                const expectedMatching = currentStep.expectedMatching
                let understanding_bonus = 0 ;
                const isCorrect = Object.keys(expectedMatching).every(product => {
                    return expectedMatching[product] === currentMatching[product]
                })
                let currentMatchingCounter = matchingCounter.current
                if (isCorrect){
                    if (matchingCounter.current === 0){
                        setMessage("correctFirstMsg")
                        understanding_bonus+= 1    
                    }
                    else{
                        setMessage("correctMsg")
                    }
                    matchingCounter.current =  0 
                    setReadyToProceed(true)
                }
                else{
                    const isLastAttempt = matchingCounter.current === 2
                    if (isLastAttempt){
                        matchingCounter.current = 0
                        setMessage("incorrectSkipMsg")
                        setCurrentMatching(expectedMatching)
                        setReadyToProceed(true)
                    }
                    else{
                        matchingCounter.current = matchingCounter.current + 1
                        currentMatchingCounter = matchingCounter.current
                        setMessage("incorrectMsg")
                    }
                }
                liveSend({
                    information_type : "matching_submission",
                    matching:currentMatching,
                    is_correct:isCorrect,
                    understanding_bonus:understanding_bonus,
                    matching_counter:currentMatchingCounter,
                    time_stamp : new Date().toUTCString()  
                })
            }
        }
        React.useEffect(()=>{
            if (!readyToProceed) return ;
            const currentStepIndex = steps.findIndex(step => step.id === currentStepId)
            const nextStep = steps[currentStepIndex + 1]
            const nextStepId = nextStep?.id
            if (!nextStepId){
                return
            }
            liveSend({
                information_type : "step_update",
                step_id : nextStepId
            })
        },[readyToProceed])
        const inputRef = React.useRef(null)
        return (
            <section>
            {currentStep.content}
            {
                currentStep.type === "radio" &&
                <div ref={inputRef}>
                    {
                        currentStep.options.map((option,index) => {
                            return (
                                <div style={{display:'flex',gap:'0.5rem'}}>
                                    <input type="radio" id={index} name={option} value={index} />
                                    <label htmlFor={index}>{option}</label>
                                </div>
                            )
                        })
                    }
                </div>
            }
            <div style={{display:"flex",justifyContent:'center'}}>
                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                    {currentStep.type === "instructions" ? "Proceed"  :  readyToProceed ? "Proceed" : "Submit"}
                </button>
            </div>
                {
                    message && message === "incorrectMsg" && 
                        <div class="incorrect-msg">
                            {currentStep.incorrectMsg}
                        </div>
                }
                {
                    message && message === "correctMsg" &&
                        <div class="correct-msg">
                            {currentStep.correctMsg}
                        </div>       
                }
                {
                    message && message === "incorrectSkipMsg" &&
                        <div class="incorrect-msg">
                            {currentStep.incorrectSkipMsg}
                        </div>
                }
                {
                    message && message === "correctFirstMsg" &&
                        <div class="correct-msg">
                            {currentStep.correctFirstMsg}
                        </div>
                }
            </section>
        )
    }
    function Accordion(props){
        const [expanded,setExpanded] = React.useState(false)
        return (
            <div className="accordion" id="accordionExample">
                <span style={{cursor:'pointer'}} onClick={()=>setExpanded(!expanded)}>
                {props.title}
                </span>
                {
                    expanded &&
                    <div className="accordion-body">
                        {props.children}
                    </div>
                }  
            </div>
        )
    }
    function Dashboard(){
        const props = React.useContext(DashboardContext)
        return (
            <div className="container-fluid" style={{border:'5px solid gray',position:'relative',marginTop:'1rem'}}>
                {/* reset button */}
                { props.round === 1 &&
                    <button
                        type="button"
                        className="position-absolute btn btn-outline-dark"
                        id="reset-button"
                        style={{ right: '.5rem', top: '.5rem' }}
                        onClick={props.onReset}
                     >
                        reset
                        <svg className="bi bi-arrow-counterclockwise" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" fillRule="evenodd" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </button>
                }
                <div className="row" style={{justifyContent: 'space-between',flexWrap: 'nowrap',alignItems: 'baseline'}}>
                    <div className="column" style={{flex: '1 2 auto'}}>
                        <b style={{fontSize: "1.5rem"}}>
                            Prize Priorities:
                        </b>
                    </div>
                    <div className="column" style={{flex: '1 2 auto'}}>
                        <b style={{fontSize: "1.5rem"}}>
                            Participant Rankings:
                        </b>
                    </div>
                </div>
                <div id="tables-row" style={{justifyContent: 'space-between',flexWrap: 'nowrap',alignItems: 'baseline'}}>
                    {/* products table */}
                    <ProductsTable />
                    {/* customers table */}
                    <CustomersTable />
                </div>
                <hr/>
                {/* middle row */}
                <ProductsRow/>
                <hr/>
                {/* bottom row */}
                <CustomersRow/>
                <hr/>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'0.5rem'}}>
                    Allocation Dashboard
                </div>
            </div>
        )
    }
    function CustomersRow(){
    const {currentMatching,maxProductsPerCustomer,customers,onMouseEnterCustomer,onMouseLeaveCustomer,selectedProduct,setSelectedProduct,onMatching,matchingMemo,products,onProductSelect} = React.useContext(DashboardContext)
    /* 
    each row represents a customer
    for each row : 
        the products that the customer is matched to are presented in the order they were matched 
     */
        return (
             <div id="third-row">
                <div id="prizes-rows">
                    <div className="customers-rows-container">
                        {
                            customers.map((customer,productIndex)=>{
                                const productsMatchedToCustomers = products.filter((product)=>{
                                                return currentMatching[product] === customer
                                            })
                                productsMatchedToCustomers.sort((a,b)=>{
                                    return matchingMemo.current.findIndex((customer)=> customer === b) - matchingMemo.current.findIndex((customer)=> customer === a)
                                })
                                function showPlus(){
                                    if (!selectedProduct) return false
                                    if (currentMatching[selectedProduct] === customer) return false
                                    function getNumberOfProductsMatchedToCustomer(){
                                        let counter = 0
                                        for (let product in currentMatching){
                                            if (currentMatching[product] === customer){
                                                counter = counter + 1
                                            }
                                        }
                                        return counter
                                    }
                                    const numberOfProductsMatchedToCustomer = getNumberOfProductsMatchedToCustomer()
                                    if (numberOfProductsMatchedToCustomer >= maxProductsPerCustomer) return false 
                                    return true
                                }
                                return(
                                    <>
                                        <span>{customer}</span>
                                        <div
                                            onMouseEnter={()=>{onMouseEnterCustomer(customer)}}
                                            onMouseLeave={()=>{onMouseLeaveCustomer(customer)}}
                                            className="products-row"
                                        >
                                        { /* plus button */ }
                                        { showPlus() &&
                                            <div className="iButton-container">
                                                <button 
                                                    className="iButton red"
                                                    type="button"
                                                    onClick={() => {
                                                        onMatching(selectedProduct,customer)
                                                    }}
                                                 >
                                                    +
                                                </button>
                                            </div>
                                        }
                                        { /* products */ }
                                        {
                                            productsMatchedToCustomers.length !== 0 &&  
                                            productsMatchedToCustomers.map((product,productIndex)=>{
                                                const isSelected = selectedProduct === product
                                                const className = isSelected ? "iButton dark-purple " : "iButton purple"
                                                return (
                                                    <div className="iButton-container">
                                                       <button
                                                            type="button"
                                                            key={productIndex}
                                                            onClick={()=>{
                                                                onProductSelect(product)
                                                            }} 
                                                            className={className}
                                                        >
                                                             {product.slice(0,1)}
                                                       </button>
                                                   </div>
                                                   )  
                                                })
                                        }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="legend-container">
                    <span><b>R&nbsp;</b>= Ruth</span>
                    <span><b>S&nbsp;</b>= Shirley</span>
                    <span><b>T&nbsp;</b>= Theresa</span>
                    <span><b>Y&nbsp;</b>= You</span>
                </div>
             </div>
        )
    }
    function ProductsTable() {
        const {products,productsPriorities,currentMatching,selectedProduct}= React.useContext(DashboardContext)
        return(
            <div className="priorities-table-container">
                {products.map((product,columnIndex)=>{
                    const productPriorities = productsPriorities[product]
                    const isColumnHighlight = product === selectedProduct
                    const isLast = columnIndex === products.length - 1
                    const classNames = () => {
                       let classNames = "table-column flexItemButtonsBackground"
                       if (columnIndex === 0) {
                           classNames += " verticalRight"
                       } else if (isLast) {
                           classNames += " verticalLeft"
                       } else {
                           classNames += " verticalBoth"
                       }
                       if (isColumnHighlight) {
                           classNames += " highlited"
                       }
                       return classNames
                   }
                    return (
                        <div className={classNames()} key={columnIndex}>
                            <div className="dButtonTop dButton" id={product}>{product.slice(0,1)}</div>
                                {
                                    productPriorities.map((customer,rowIndex)=>{
                                        const isCellHighlight = currentMatching[product] === customer
                                        const className = () => {
                                           let classNames = "dButton"
                                           if (isCellHighlight) {
                                               classNames += " dButtonMatched"
                                           }
                                           return classNames
                                        }
                                        return (
                                            <div className={className()} key={rowIndex}>
                                                {customer}
                                            </div>
                                        )   
                                    })
                                }
                        </div>
                        )    
                    })
                }
            </div>
        )
    }
    function CustomersTable() {
        const {customers,customersPriorities,currentMatching,highlightedCustomer}= React.useContext(DashboardContext)
        return(
            <div className="priorities-table-container">
                {
                    customers.map((customer,columnIndex)=>{
                        const customerPriorities = customersPriorities[customer]
                        const isColumnHighlighted = customer === highlightedCustomer
                        const classNames = () => {
                            let classNames = "table-column flexItemButtonsBackground"
                            if (columnIndex === 0) {
                                classNames += " verticalRight"
                            }
                            else if (columnIndex === customers.length - 1) {
                                classNames += " verticalLeft"
                            }
                            else {
                                classNames += " verticalBoth"
                            }
                            if (isColumnHighlighted) {
                                classNames += " highlited"
                            }
                            return classNames
                        }
                        return (
                            <div className={classNames()} key={columnIndex}>
                                <div className="dButtonTop dButton" id={customer}>{customer}</div>
                                {
                                    customerPriorities.map((product,rowIndex)=>{
                                        const isCellHighlight = currentMatching[product] === customer
                                        const className = () => {
                                            let classNames = "dButton"
                                            if (isCellHighlight) {
                                                classNames += " dButtonMatched"
                                            }
                                            return classNames
                                        }
                                        return (
                                            <div className={className()} key={rowIndex}>
                                                {product.slice(0,1)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    function ProductsRow(){
        /* 
            the middle row is presenting the products that is currently Unmatched.
            on product clicked: 
               if a product is not selected :
                it is being selected
               if a product is selected :
                it is being unselected
            if a product is matched : 
                it is not being presented
            if a product is selected :
                it is being highlighted
         */
        const {products,currentMatching,selectedProduct,setSelectedProduct,onProductSelect}= React.useContext(DashboardContext)
        return (
            <div id="middle-row" >
                <span>
                    <b style={{fontSize: "1.5rem"}}>Pick participants to pair →</b>
                </span>
                <div class="products-row">
                    {
                        products.map((product,index)=>{
                            const isMatched = currentMatching[product] !== 'none'
                            const isSelected = selectedProduct === product
                            if (isMatched) return null
                            return (
                                <div className="iButtonContainer" key={index}>
                                    <button
                                        type="button"
                                        className={isSelected ? "iButton dark-purple" : "iButton purple"}
                                        onClick={()=>{onProductSelect(product)}}
                                        >
                                        {product.slice(0,1)}
                                    </button>
                                </div>    
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    function AllocationModal(props){
        return (
            <div class="modal" id="GenModal" onClick={props.onClose} style={{display:'block'}}>
                <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                    <span class="close" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</span>
                    <div>
                        <p>
                            <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.
                        </p>
                        <p>
                            The allocation process is a multi-step process , as follows:
                        </p>
                        <ol>
                            <li>
                            In the first step, each participant is paired to their <b>highest</b>-rank prize.
                            </li>
                            <li>
                                <p>
                                    In the next step, possible conflicts are detected and solved. If two (or more) participants are paired to the same prize, this is a <b>conflict</b>.
                                </p>
                                <p>
                                    Each conflict is solved in two steps:
                                     <ul>
                                        <li>
                                            <b>Unpair:</b> only the participant highest in that prize’s priorities remains paired to that prize. The others get unpaired.
                                        </li>
                                        <li>
                                            <b>Re-pair:</b> all unpaired participants can only get re-paired to prizes that they were not paired with before. Each unpaired participant is re-paired to their <b>highest-rank</b> prize among the prizes they <b>were not yet paired with</b>.
                                        </li>
                                    </ul>
                                </p>
                            </li>
                            <li>
                                <p>
                                    Later steps continue in the same way, by detecting and solving new conflicts.<br/>
                                    Like before, if two (or more) participants are paired to the same prize, this is a <b>conflict</b>.
                                </p>
                                <p> 
                                    Like before, each conflict is solved in two steps:
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> only the participant highest in that prize’s priorities remains paired to that prize . The others get unpaired, <b>even if they successfully got paired to that prize in a previous step</b>.
                                        </li>
                                        <li>
                                            <b>Re-pair:</b> Every unpaired participant gets re-paired to their highest-rank prize among the prizes they <b>were not previously paired with</b>.
                                        </li>
                                    </ul>
                                </p>
                            </li>
                        </ol>
                        <p>
                            When there are no more conflicts, the process is over. The result is each participant being paired to a different prize.
                        </p><br/>
                        <p>
                            Each prize is then <b>allocated</b> to the participant paired to it.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    `

    function getPropsFromJsVars(js_vars) {
        function parseDictToObject(str) {
            const validJsonStr = str.replace(/'/g, '"');
            const obj = JSON.parse(validJsonStr);
            return obj
        }

        function parseArray(str) {
            const validJsonStr = str.replace(/'/g, '"');
            const obj = JSON.parse(validJsonStr);
            return obj
        }

        const variant = js_vars.variant
        /*
        because this script is shared between traditional and menu we are not using the terms "participant" and "prize".
        since their roles are switching between the two variants.
        the convention for this micro frontend is "products" and ״customers״.
        the middle row in the dashboard is presenting the products.
        since a item in the middle row can only be assigned to one customer this convention is correct.
        in traditional :
            the middle row represents the participants.
            so the conversion is as follows :
                participant -> product
                prize -> customer
        in menu :
            the middle row represents the prizes.
            so the conversion is as follows :
                participant -> customer
                prize -> product
         */
        const participants = js_vars.participants
        const prizes = js_vars.prizes
        const products = variant === "traditional" ? participants : prizes
        const customers = variant === "traditional" ? prizes : participants
        const customersPriorities = variant === "traditional" ? js_vars.prizesPriorities : js_vars.participantsPriorities
        const productsPriorities = variant === "traditional" ? js_vars.participantsPriorities : js_vars.prizesPriorities
        return {
            ...js_vars,
            products,
            customers,
            customersPriorities,
            productsPriorities,
            currentMatching: parseDictToObject(js_vars.currentMatching),
            matchingMemo: parseArray(js_vars.matchingMemo),
        }
    }

    renderReactComponent(jsxCode, "react-root", "DaAlgoInterface", JSON.stringify(getPropsFromJsVars(js_vars)))
}
