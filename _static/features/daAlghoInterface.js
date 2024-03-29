window.addEventListener('DOMContentLoaded', (event) => {
    renderDaAlgoPage()
});

function renderDaAlgoPage(props = js_vars) {
    const jsxCode = `
    function Stam(){
        return <div></div>
    }
    const DashboardContext = React.createContext()
    function DaAlgoInterface(props){
        const [currentMatching, setCurrentMatching] = React.useState(props.currentMatching)
        const [modals,setModals] = React.useState({allocation : false, video : false})
        const steps = getSteps(props.round,props.variant)
        const [currentStepId,setCurrentStepId] = React.useState(props.currentStepId || steps[0].id)      
        const [selectedProduct,setSelectedProduct] = React.useState(null)
        const [matchingCounter,setMatchingCounter] = React.useState(props.matchingCounter)
        const currentStep = steps.find(step => step.id === currentStepId)
        const [readyToProceed,setReadyToProceed] = React.useState(currentStep.type === "instructions")
        const [highlightedCustomer,setHighlightedCustomer] = React.useState(null)
        const [matchingMemo,setMatchingMemo] = React.useState(props.matchingMemo)
        const [videoSrc,setVideoSrc] = React.useState(null)
        const videoTimeStamp = React.useRef(0)
        function getSteps(round,variant){
            const steps = {
                "traditional":{
                    round1:[
                        {
                            id: "instructions_1",
                            type: "instructions",
                            content : (
                                <>
                                    <p>
                                        The training round is not yet over. To complete it, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Remember: each step or question during the process will count for your Understanding Bonus only if you get it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </>
                            )
                        },
                        {
                            id:"question_11",
                            type: "radio",
                            inputRef: React.createRef(null),
                            dashboardDisabled: true,
                            content : (
                                <>
                                    <p>
                                        Let’s begin with a question about the <b>big picture.</b>
                                    </p>
                                    <p>
                                    Please determine whether the following statement is true or false:<br/>
                                    The allocation process determines the prize I get based on the prize priorities, my own ranking, and the other, computerized participants’ rankings.<br/> 
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! The allocation process uses all these three components to determine the prize you get.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The allocation process uses all these three components to determine the prize you get.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>True</span>,
                                <span>False</span>,
                            ],
                            expectedAnswerIndex: 0,
                        },
                        {
                            id: "instructions_-1",
                            type: 'instructions',
                            content :(
                                <>
                                    <p>
                                        Now, you will perform all the steps determining the allocation and finally the prize you get.
                                    </p>
                                    <p>
                                        We will guide you how to use the <b>Allocation Dashboard</b> below to find the allocation of prizes to all participants, using the prize priorities and participants’ rankings.
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
                                     <Accordion title={<span><b>For example: ... </b>(click here to expand)</span>}>
                                        <p>
                                            The column under the letter <b>“A”</b> indicates the priorities of Prize A. Ruth <b>(“R”)</b> has the first (highest) priority for getting that prize, Shirley <b>(“S”)</b> has the second priority, Theresa <b>(“T”)</b> has the third priority, and you <b>(“Y”)</b> have the fourth (lowest) priority.
                                        </p>
                                     </Accordion>   
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
                                        Each letter under a participant's initial indicates one of the four prizes. The higher it is placed in the column, the higher that prize was ranked by that participant.
                                    </p>
                                    <Accordion title={<span><b>For example: ... </b>(click here to expand)</span>}> 
                                        <p>
                                            The column under the letter <b>“R”</b> indicates the ranking submitted by the computerized participant Ruth. She ranked Prize A <b>(“A”)</b> first (highest), Prize C <b>(“C”)</b> second, Prize D <b>(“D”)</b> third, and Prize B <b>(“B”)</b> fourth (lowest).
                                        </p>
                                        <p>
                                            Notice that the ranking under “Y” (you) is exactly the ranking that you submitted in the previous screen!
                                        </p>
                                     </Accordion><br/>
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
                            expectedMatching : {'Ruth': "A", 'Shirley': 'none', 'Theresa': 'none', 'You': 'none'},
                            content : (
                                <>
                                    <p>
                                        First, pair Ruth to her <b>highest-rank</b> prize. To do this:
                                    </p>
                                    <ol>
                                        <li>
                                            Start from the “Pick participants to pair” row, and click on <b>Ruth (“R”)</b>.
                                        </li>
                                        <li>
                                            Then, in the list of four prizes at the bottom left part of the dashboard, click on “+” next to the prize that is <b>highest in Ruth’s ranking.</b>
                                        </li>
                                    </ol>
                                    <p>
                                        Hint: the prize that is highest in Ruth’s ranking is indicated by the letter just under “R” in the Participant Rankings table.
                                    </p>
                                    <p>
                                        After pairing, “A” and “R” will be colored purple in the two tables, to indicate that they are paired.
                                    </p>
                                    <p style={{color: "#0b1ae3"}}>
                                        Only pair <b>Ruth (“R”)!</b> You will pair the other participants in the next step.
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            )
                        },
                        {
                            id: "matching_2",
                            type: "matching",
                            expectedMatching: {'Ruth': "A", 'Shirley': 'A', 'Theresa': 'B', 'You': 'C'},
                            content : (
                                <>
                                    <p>
                                        Now do the same for the three other participants. One by one, pair each of them to their highest-rank prize.
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
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
                                <span>The participant for whom Prize A is ranked higher.</span>,
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
                                        According to this step, only one participant should remain paired to Prize A. <b>Which participant should remain paired to Prize A?</b>
                                    </p>
                                    <p>
                                        Please select one of the answers below and then click Submit.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! When there is a conflict at some prize, only the participant highest in that prize’s priorities should remain paired to that prize. The others should get unpaired.
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
                                        The second step in solving conflicts is <b>Re-pair.</b><br/>
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
                            expectedMatching: {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "C"} ,
                            content : (
                                <>
                                    <p>
                                        Now, let’s solve the conflict.
                                    </p>
                                    <p>
                                        According to the Prize Priorities, <b>Ruth’s</b> priority for getting <b>Prize A</b> is higher than <b>Shirley’s</b>. Hence, <b>Shirley</b> should get unpaired from <b>Prize A</b>, and then get re-paired to her second highest-rank prize.
                                    </p>
                                    <p>
                                        Perform this using the two steps:
                                        <ol>
                                            <li>
                                                <b>Unpair</b>: at the lower part of the dashboard, next to Prize A (“A”), click on <b>Shirley (“S”)</b>.
                                            </li>
                                            <li>
                                                <p><b>Re-pair</b>: at the same lower part of the dashboard, click on “+” next to Shirley’s (“S”) <b>second highest-rank prize</b>.</p>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_3",
                            type: "radio",
                            expectedAnswerIndex: 0,
                            inputRef: React.createRef(null),
                            content:(
                                <p>
                                    Is the process determining the allocation of prizes to participants over?<br/>
                                    (Get it right on first try to increase your bonus) 
                                </p>
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
                                <span>Yes, there are no more conflicts.</span>
                            ]  
                        },
                        {
                            id: "matching_4",
                            type: 'matching',
                            expectedMatching : {"Ruth": "A", "Shirley": "C", "Theresa": "B", "You": "A"},
                            content : (
                                <>
                                    <p>
                                        Find the next conflict and solve it like before. First, find all prizes that are paired to two (or more) participants. Then, perform the two steps:
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such prize, keep only the participant with the highest priority for getting that prize paired to it.<br/>
                                            <b>Unpair</b> the other participants  from that prize.
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
                                        <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!&nbsp;</span>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_4",
                            inputRef: React.createRef(null),
                            type: "radio",
                            expectedAnswerIndex: 0,
                            content : (
                               <p>
                                    Is the process determining the allocation of prizes to participants over?<br/>
                                    (Get it right on first try to increase your bonus)
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
                                        First, find all prizes that are paired to two (or more) participants. Then, perform the two steps:
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such prize, keep only the participant with the highest priority for getting that prize paired to it.<br/>
                                            <b>Unpair</b> the other participants  from that prize.
                                        </li>
                                        <li>
                                            <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                            <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                        </li>
                                    </ul>
                                    <p>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!&nbsp;</span>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ), 
                        },
                        {
                            id: "question_5",
                            inputRef: React.createRef(null),
                            type: "radio",
                            content : (
                                <p>
                                    Is the process determining the allocation of prizes to participants over?<br/>
                                    (Get it right on first try to increase your bonus)
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
                                        First, find all prizes that are paired to two (or more) participants. Then, perform the two steps:
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such prize, keep only the participant with the highest priority for getting that prize paired to it.<br/>
                                            <b>Unpair</b> the other participants  from that prize.
                                        </li>
                                        <li>
                                            <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                            <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                        </li>
                                    </ul>
                                    <p>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!&nbsp;</span>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),        
                        },
                        {
                            id: "question_6",
                            type: "radio",
                            inputRef: React.createRef(null),
                            content : (
                                <p>
                                    Is the process determining the allocation of prizes to participants over?<br/>
                                    (Get it right on first try to increase your bonus)
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
                            id: "matching_7",
                            type: "matching",
                            content : (
                            <>
                                <p>
                                    Find all conflicts and solve them like before.
                                    First, find all prizes that are paired to two (or more) participants. Then, perform the two steps:
                                </p>
                                <ul>
                                    <li>
                                        <b>Unpair:</b> for each such prize, keep only the participant with the highest priority for getting that prize paired to it.<br/>
                                        <b>Unpair</b> the other participants  from that prize.
                                    </li>
                                    <li>
                                        <p><b>Re-pair:</b> re-pair these participants to their highest-rank prize among the prizes they were <b>not yet paired with</b>.</p>
                                        <p>Hint: You can easily find which prize you should re-pair the unpaired participant to, using the Participant Rankings table: this is the prize right below the one that is currently colored purple under the unpaired participant’s name.</p>
                                    </li>
                                </ul>
                                <p>
                                    <span style={{color: "#0b1ae3",fontWeight: "bold"}}>Only solve the conflict you see first on this screen!&nbsp;</span>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_7",
                            type: "radio",
                            inputRef: React.createRef(null),
                            content : (
                                <p>
                                    Is the process determining the allocation of prizes to participants over?<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
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
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_8",
                            type: "radio",
                            inputRef: React.createRef(null),
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
                                        <b>Which of the following is true?</b><br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Each participant <b>gets the prize they were paired with</b> at the end of the allocation process.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Each participant <b>gets the prize they were paired with</b> at the end of the allocation process.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>I can get any of the four prizes with equal chances.</span>,
                                <span>I can get any prize I was paired with at some point in the allocation process, but I cannot know which one.</span>,
                                <span>I will get one of the prizes I was paired with at some point in the allocation process, chosen at random.</span>,
                                <span>I will get the prize allocated to me at the end of the allocation process.</span>,
                            ],
                            expectedAnswerIndex: 3,
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_9",
                            type: "radio",
                            inputRef: React.createRef(null),
                            content : (
                                <p>
                                    <b>Which of the following is true?</b><br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! The allocation process depends on all prize priorities and on each participant’s ranking.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The allocation process depends on all prize priorities and on each participant’s ranking.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Only the other participants’ rankings are used to determine the allocation of prizes.</span>,
                                <span>Only my own ranking is used to determine the allocation of prizes.</span>,
                                <span>Only the prize priorities are used to determine the allocation of prizes.</span>,
                                <span>The prize priorities and all participants’ rankings are used to determine the allocation of prizes.</span>,
                            ],
                            expectedAnswerIndex: 3,
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_allocation_a",
                            type: "dropdown",
                            inputRef: React.createRef(null),
                            label: (<span>Prize A : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now please verify you understand what participant each prize is allocated to.
                                    Choose the participant that each prize is allocated to next to all the prizes below:<br/>
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
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_allocation_b",
                            type: "dropdown",
                            inputRef: React.createRef(null),
                            label: (<span>Prize B : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now please verify you understand what participant each prize is allocated to.
                                    Choose the participant that each prize is allocated to next to all the prizes below:<br/>
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
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_allocation_c",
                            type: "dropdown",   
                            inputRef: React.createRef(null),
                            label: (<span>Prize C : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now please verify you understand what participant each prize is allocated to.
                                    Choose the participant that each prize is allocated to next to all the prizes below:<br/>
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
                            dashboardDisabled: true,                            
                        },
                        {
                            id: "question_allocation_d",
                            type: "dropdown",
                            inputRef: React.createRef(null),
                            label: (<span>Prize D : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now please verify you understand what participant each prize is allocated to.
                                    Choose the participant that each prize is allocated to next to all the prizes below:<br/>
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
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_10",
                            inputRef: React.createRef(),
                            type: "radio",
                            content : (
                                <p>
                                    <b>Which of the following is true?</b><br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! The last prize you were paired with is the prize allocated to you at the end of the allocation process, and you get this prize.
                                </p>
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
                                <span>I will get the prize I ranked the lowest.</span>,
                                <span>If another participant does not want the prize allocated to them, then I may be able to switch prizes with them.</span>,
                                <span>I will get the last prize I was paired with during the allocation process.</span>,
                                <span>I might end up not getting any prize.</span>,
                            ],
                            expectedAnswerIndex: 2,
                            dashboardDisabled: true,
                        },
                        {
                            id: "allocated_prize",
                            type: "dropdown",
                            inputRef: React.createRef(),
                            content : (
                                <p>
                                     Based on the outcome of the allocation process, choose the prize that you (“Y”) get in this round.<br/>
                                     (Get it right on first try to increase your bonus)
                                </p>
                            ),
                            correctMsg:(
                                <p>Correct!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct!<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                            options :[
                                <span>A</span>,
                                <span>B</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 1,
                            dashboardDisabled: true,
                        },
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize B.</b>
                                </p>   
                            )
                        }
                    ],
                    round2:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        Find the <b>allocation</b> of prizes to participants using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final allocation</b>. Do <b>not</b> separately submit steps of the process like in Training Round 1.
                                    </p>
                                    <p>
                                        In case you are still not sure how to find the allocation by yourself, click on the button below to watch a helpful video explaining all the steps. Clicking on the video will pause/unpause it, and if you close and re-open the video, it will continue from the same point.
                                        <div style={{display:'flex', flexDirection : "column", justifyContent:'center', alignItems:'center'}}>
                                            <div class="btn-container">
                                                <button 
                                                    className="button-3"
                                                    type="button"
                                                    onClick={()=>{
                                                        setModals({...modals, video : true})
                                                        liveSend({
                                                            'information_type': 'video_modal_opened',
                                                            'time': new Date().toUTCString()
                                                        })
                                                    }}
                                                    >
                                                    Click here for a video with step-by-step explanations
                                                </button>
                                            </div>
                                            <span>(To restart the video, please refresh the page)</span>
                                        </div>
                                    </p>   
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {'Ruth': "D", "Shirley": "B", "Theresa": "C", "You": "A"},
                        },
                        {
                            id: "allocated_all",
                            type:"multiDropdown",
                            dashboardDisabled: true,
                            content:(
                                <>
                                    <p>
                                        For each of the four prizes below, choose <b>the participant to whom this prize is allocated,</b> based on the result of the allocation process.Ï
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>R</span>,
                                <span>S</span>,
                                <span>T</span>,
                                <span>Y</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [3,1,2,0],
                            correctMsg:(
                                <p>Correct!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct!<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(),
                            content:(
                               <p>Finally, select <b>the prize that you get</b> based on the allocation.</p>
                            ),
                            options:[
                                <span>A</span>,
                                <span>B</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 0,
                            correctMsg:(
                                <p>Correct! At the end of the process, each participant gets the prize they were allocated with.</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! At the end of the process, each participant gets the prize they were allocated with.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },  
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize A.</b>
                                </p>   
                            )
                        }
                    ],
                    round3:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        Find the <b>allocation</b> of prizes to participants using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final allocation</b>. Do <b>not</b> separately submit steps of the process like in Training Round 1.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {'Ruth': "B", "Shirley": "C", "Theresa": "A", "You": "D"},
                        },
                        {
                            id: "allocated_all",
                            type:"multiDropdown",
                            dashboardDisabled: true,
                            content:(
                                <>
                                    <p>
                                        For each of the four prizes below, choose the participant to whom this prize is allocated, based on the result of the allocation process.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>R</span>,
                                <span>S</span>,
                                <span>T</span>,
                                <span>Y</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [2,0,1,3],
                            correctMsg:(
                                <p>Correct!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct!<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(),
                            content:(
                               <p>Finally, select <b>the prize that you get</b> based on the allocation.</p>
                            ),
                            options:[
                                <span>A</span>,
                                <span>B</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 3,
                            correctMsg:(
                                <p>Correct! At the end of the process, each participant gets the prize they were allocated with.</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! At the end of the process, each participant gets the prize they were allocated with.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },  
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize D.</b>
                                </p>   
                            )
                        }
                    ],
                    round4:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        Find the <b>allocation</b> of prizes to participants using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final allocation</b>. Do <b>not</b> separately submit steps of the process like Training in Round 1.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {'Ruth': "D", "Shirley": "A", "Theresa": "B", "You": "C"},
                        },
                        {
                            id: "allocated_all",
                            type:"multiDropdown",
                            dashboardDisabled: true,
                            content:(
                                <>
                                    <p>
                                        For each of the four prizes below, choose the participant to whom this prize is allocated, based on the result of the allocation process.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>R</span>,
                                <span>S</span>,
                                <span>T</span>,
                                <span>Y</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [1,2,3,0],
                            correctMsg:(
                                <p>Correct!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct!<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(),
                            content:(
                               <p>Finally, select <b>the prize that you get</b> based on the allocation.</p>
                            ),
                            options:[
                                <span>A</span>,
                                <span>B</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 2,
                            correctMsg:(
                                <p>Correct! At the end of the process, each participant gets the prize they were allocated with.</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! At the end of the process, each participant gets the prize they were allocated with.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },  
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize C.</b>
                                </p>   
                            )
                        }
                    ],
                },
                "menu":{
                    round1:[
                        {
                            id: "instructions_1",
                            type: "instructions",
                            content : (
                                <>
                                    <p>
                                        The training round is not yet over. To complete it, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Remember: each step or question during the process will count for your Understanding Bonus only if you get it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </>
                            )
                        },
                        {
                            id: "question_11",
                            type: "radio",
                            inputRef: React.createRef(null),
                            dashboardDisabled: true,
                            content : (
                                <>
                                    <p>
                                        Let’s begin with a question about the <b>big picture.</b>
                                    </p>
                                    <p>
                                        Please determine whether the following statement is true or false:<br/>
                                        The allocation process first determines the Obtainable Prizes, which I <b>cannot affect with my own ranking.</b> Then, I always get the Obtainable Prize that is <b>placed highest in the ranking I submitted.</b><br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! In the allocation process, the group of Obtainable Prizes that you might receive is determined using only the other participants’ rankings and the prize priorities. Then, from among the Obtainable Prizes, you get the one that you ranked highest.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                   Correct! In the allocation process, the group of Obtainable Prizes that you might receive is determined using only the other participants’ rankings and the prize priorities. Then, from among the Obtainable Prizes, you get the one that you ranked highest.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>True</span>,
                                <span>False</span>,
                            ],
                            expectedAnswerIndex: 0,
                        },
                        {
                            id: "instructions_-1",
                            type: "instructions",
                            content : (
                                <>
                                    <p>
                                        Now, you will perform all the steps determining the temporary allocation, the Obtainable Prizes, and finally the prize you get.
                                    </p>
                                    <p>
                                        First, we will guide you how to use the <b>Allocation Dashboard</b> below to find the temporary allocation of prizes to all participants except for you, using the prize priorities and the rankings of all participants except for you.
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "instructions_2",
                            type: "instructions",
                            content : (
                                <>
                                    <p>
                                        On the upper left part of the dashboard below you see a condensed version of the <b>Participant Rankings</b>.
                                    </p>
                                    <p>
                                        Each letter under a participant's initial indicates one of the four prizes. The higher it is placed in the column, the higher that prize was ranked by that participant.
                                    </p>
                                    <p>
                                     <Accordion title={<span><b>For example: ... </b>(click here to expand)</span>}>
                                        <p>
                                            The column under the letter <b>“R”</b> indicates the ranking submitted by the computerized participant Ruth. She ranked Prize A <b>(“A”)</b> first (highest), Prize C <b>(“C”)</b> second, Prize D <b>(“D”)</b> third, and Prize B <b>(“B”)</b> fourth (lowest).<br/>
                                        </p>
                                     </Accordion>   
                                    <p>
                                        Notice: In real rounds of the game you do not see other participants’ rankings, but now, since you are in charge of the allocation process, you are able to see them.
                                    </p>
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
                                        On the upper right part of the dashboard below you see a condensed version of the <b>Prize Priorities</b> that you saw before.<br/>
                                        Each letter under a prize name indicates one of the four participants. The higher it is placed in the column, the higher that participant’s priority for getting that prize.
                                    </p>
                                    <Accordion title={<span><b>For example: ... </b>(click here to expand)</span>}> 
                                        <p>
                                            The column under the letter <b>“A”</b> indicates the priorities of Prize A. Ruth <b>(“R”)</b> has the first (highest) priority for getting that prize, Shirley <b>(“S”)</b> has the second priority, Theresa <b>(“T”)</b> has the third priority, and you <b>(“Y”)</b> have the fourth (lowest) priority.
                                        </p>
                                     </Accordion>
                                </>
                            )
                        },
                        {
                            id: "instructions_4",
                            type: 'instructions',
                            content :(
                                <p>
                                   The middle and lower parts of the dashboard enable you to pair prizes to participants, as will be explained next.
                                </p>
                            )
                        },
                        {
                            id: "matching_1",
                            type: "matching",
                            expectedMatching : {"A": "Ruth", "B":"none","C":"none","D":"none"},
                            content : (
                                <>
                                    <p>
                                        First, pair Prize A to its <b>highest-priority</b> participant. To do this:
                                    </p>
                                    <ol>
                                        <li>
                                            Start from the “Pick prizes to pair” row, and click on <b>Prize A (“A”)</b>.    
                                        </li>
                                        <li>
                                            Then, in the list of four participants at the bottom left part of the dashboard, click on “+” next to the participant, <b>except for you,</b> that is <b>highest in Prize A’s priorities.</b>
                                        </li>
                                    </ol>
                                    <p>
                                        Hint: the participant, except for you, that is highest in Prize A’s priorities, is indicated by the letter just under “A” in the Prize Priorities table.
                                    </p>
                                    <p>
                                        After pairing, “R” and “A” will be colored purple in the two tables, to indicate that they are paired.
                                    </p>
                                    <p style={{color: "#0b1ae3"}}>
                                        Only pair <b>Prize A (“A”)!</b> You will pair the other prizes in the next step.
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            )
                        },
                        {
                            id: "matching_2",
                            type: "matching",
                            expectedMatching: {"A":"Ruth","B":"Ruth","C":"Shirley","D":"Theresa"},
                            content : (
                                <>
                                    <p>
                                        Now do the same for the three other prizes. One by one, pair each of them to its <b>highest-priority</b> participant, except for you.
                                    </p>
                                    <p>
                                        Hint: The highest-priority participant at Prize D is You, but You cannot be paired with it during this stage of the process.<br/> 
                                        Who is Prize D’s highest-priority participant, <b>except for you</b>? (Another hint: it is Theresa)
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
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
                                <span>The prize that got paired to Ruth first.</span>,
                                <span>The prize where Ruth has higher priority.</span>,
                                <span>The prize highest in Ruth’s ranking.</span>,
                            ],
                            content : (
                                <>
                                    <p>
                                        Each prize is now paired to a participant. <br/>
                                        However, there are <b>conflicts</b>: two (or more) prizes are paired to the same participant.
                                    </p>
                                    <p>
                                        Notice: <b>Prize A</b> and <b>Prize B</b> are both paired to <b>Ruth</b>. This is a conflict.
                                    </p>
                                    <p>
                                        To solve a conflict, the first step is <b>Unpair</b>.<br/>
                                        According to this step, only one prize should remain paired to Ruth. <b>Which prize should remain paired to Ruth?</b>
                                    </p>
                                    <p>
                                        Please select one of the answers below and then click Submit.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! When there is a conflict at some participant, only the prize highest in that participant’s ranking should remain paired to that participant. The others should get unpaired.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                     Correct! When there is a conflict at some participant, only the prize highest in that participant’s ranking should remain paired to that participant. The others should get unpaired.<br/>
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
                                <span>A random participant that is currently unpaired to any prize.</span>,
                                <span>Its highest-priority participant, among the participants it was not yet paired with and except for you.</span>,
                                <span>Its highest-priority participant.</span>,
                            ],
                            expectedAnswerIndex: 1,
                            content : (
                                <>
                                    <p>
                                        The second step in solving conflicts is <b>Re-pair</b>.<br/>
                                        After a prize gets unpaired, what new participant does it get paired to?
                                    </p>
                                    <p>
                                        Please select one of the answers below and then click Submit.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Each unpaired prize is re-paired to its highest-priority participant, among the participants it was <b>not yet paired with</b> and <b>except for you</b>.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Each unpaired prize is re-paired to its highest-priority participant, among the participants it was <b>not yet paired with</b> and <b>except for you.</b><br/>
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
                            expectedMatching: {"A":"Ruth","B":"Shirley","C":"Shirley","D":"Theresa"},
                            content : (
                                <>
                                    <p>
                                        Now, let’s solve the conflict.
                                    </p>
                                    <p>
                                        According to the Participant Rankings, <b>Ruth</b> ranked <b>Prize A</b> higher than <b>Prize B</b>. Hence, Prize B should get unpaired from <b>Ruth</b>, and then get re-paired to its second highest-priority participant, among all participants <b>except for you</b>. 
                                    </p>
                                    <p>
                                        Perform this using the two steps:
                                        <ol>
                                            <li>
                                                <p>
                                                    <b>Unpair</b>: at the lower part of the dashboard, next to Ruth (“R”), click on <b>Prize B (“B”)</b>.
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <b>Re-pair</b>: at the same lower part of the dashboard, click on “+” next to Prize B’s (“B”) <b>second highest-priority participant</b>, among all participants <b>except for you</b>. 
                                                </p>
                                                <p>
                                                    Hint: You can easily find which participant it is, using the Prize Priorities table: this is the participant right below the one that is currently colored purple under Prize B’s name (“B”), or, in case that participant is you (“Y”), the one right below “Y”.
                                                </p>
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_3",
                            type: "radio",
                            expectedAnswerIndex: 0,
                            inputRef: React.createRef(null),
                            content:(
                                <p>
                                    Is the process determining the temporary allocation over?<br/> 
                                    (Remember: this process is only a first step, after which your Obtainable Prizes are determined, and then the prize you get is determined.)<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
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
                                <span>No, there are new conflicts: two (or more) prizes are paired to the same participant.</span>,
                                <span>No, some prizes are paired to participants that do not have the highest priority for getting them.</span>,
                                <span>Yes, it is fine that two (or more) prizes are paired to the same participant because they all get different amounts of money anyway.</span>,
                                <span>Yes, there are no more conflicts.</span>
                            ]  
                        },
                        {
                            id: "matching_4",
                            type: 'matching',
                            expectedMatching : {"A":"Ruth","B":"Theresa","C":"Shirley","D":"Theresa"},
                            content : (
                                <>
                                    <p>
                                        Find the next conflict and solve it like before. First, find all participants that are paired to two (or more) prizes. Then, perform the two steps: 
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such participant, keep only the prize with the highest rank by that participant paired to her. <b>Unpair</b> the other prizes  from that participant.
                                        </li>
                                        <li>
                                            <p>
                                                <b>Re-pair</b>: re-pair these prizes to their highest-priority participant, among the participants they were <b>not yet paired with</b> and <b>except for you</b>.
                                            </p>
                                            <p>
                                                Hint: You can easily find which participant you should re-pair the unpaired prize to, using the Prize Priorities table: this is the participant right below the one that is currently colored purple under the unpaired prize’s name, or, in case that participant is you (“Y”), the one right below "Y".
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_4",
                            inputRef: React.createRef(null),
                            type: "radio",
                            expectedAnswerIndex: 0,
                            content : (
                                <p>
                                    Is the process determining the temporary allocation over?<br/> 
                                    (Remember: this process is only a first step, after which your Obtainable Prizes are determined, and then the prize you get is determined.)<br/>
                                    (Get it right on first try to increase your bonus)
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
                            expectedMatching : {"A":"Ruth","B":"Theresa","C":"Shirley","D":"Shirley"},
                            content : (
                                <>
                                     <p>
                                        Find the next conflict and solve it like before. First, find all participants that are paired to two (or more) prizes. Then, perform the two steps: 
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such participant, keep only the prize with the highest rank by that participant paired to her. <b>Unpair</b> the other prizes  from that participant.
                                        </li>
                                        <li>
                                            <p>
                                                <b>Re-pair</b>: re-pair these prizes to their highest-priority participant, among the participants they were <b>not yet paired with</b> and <b>except for you</b>.
                                            </p>
                                            <p>
                                                Hint: You can easily find which participant you should re-pair the unpaired prize to, using the Prize Priorities table: this is the participant right below the one that is currently colored purple under the unpaired prize’s name, or, in case that participant is you (“Y”), the one right below "Y".
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ), 
                        },
                        {
                            id: "question_5",
                            inputRef: React.createRef(null),
                            type: "radio",
                            content : (
                                <p>
                                    Is the process determining the temporary allocation over?<br/> 
                                    (Remember: this process is only a first step, after which your Obtainable Prizes are determined, and then the prize you get is determined.)<br/>
                                    (Get it right on first try to increase your bonus)
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
                                        Find the next conflict and solve it like before. First, find all participants that are paired to two (or more) prizes. Then, perform the two steps: 
                                    </p>
                                    <ul>
                                        <li>
                                            <b>Unpair:</b> for each such participant, keep only the prize with the highest rank by that participant paired to her. <b>Unpair</b> the other prizes  from that participant.
                                        </li>
                                        <li>
                                            <p>
                                                <b>Re-pair</b>: re-pair these prizes to their highest-priority participant, among the participants they were <b>not yet paired with</b> and <b>except for you</b>.
                                            </p>
                                            <p>
                                                Hint: You can easily find which participant you should re-pair the unpaired prize to, using the Prize Priorities table: this is the participant right below the one that is currently colored purple under the unpaired prize’s name, or, in case that participant is you (“Y”), the one right below "Y".
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
                            expectedMatching : {"A":"Ruth","B":"Theresa","C":"Shirley","D":"Ruth"},
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),        
                        },
                        {
                            id: "question_6",
                            type: "radio",
                            inputRef: React.createRef(null),
                            content : (
                                <p>
                                    Is the process determining the temporary allocation over?<br/> 
                                    (Remember: this process is only a first step, after which your Obtainable Prizes are determined, and then the prize you get is determined.)<br/>
                                    (Get it right on first try to increase your bonus)
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
                            id: "matching_7",
                            type: "matching",
                            content : (
                            <>
                                <p>
                                    Find the next conflict and solve it like before. First, find all participants that are paired to two (or more) prizes. Then, perform the two steps: 
                                </p>
                                <ul>
                                    <li>
                                        <b>Unpair:</b> for each such participant, keep only the prize with the highest rank by that participant paired to her. <b>Unpair</b> the other prizes  from that participant.
                                    </li>
                                </ul>
                                <p>
                                <b>Notice</b>: at this stage, <b>Prize D</b> should be unpaired from Ruth, who has the least priority for getting it. Hence, there are no participants left to re-pair it to, and <b>it will remain unpaired</b>.
                                To leave Prize D unpaired, do the following:
                                After clicking on “D” at the <b>lower</b> part of the dashboard, click on “+” at the bottom Unpaired (“U.P.”) row.
                                </p>
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
                            expectedMatching : {"A":"Ruth","B":"Theresa","C":"Shirley","D":"Unpaired"},
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
                                    Incorrect answer. We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                        },
                        {
                            id: "question_7",
                            type: "radio",
                            inputRef: React.createRef(null),
                            content : (
                                <p> 
                                    Is the process determining the temporary allocation over?<br/> 
                                    (Remember: this process is only a first step, after which your Obtainable Prizes are determined, and then the prize you get is determined.)<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                            ),
                            correctMsg:(
                                <p>Correct! The process is only over when there are no more conflicts.</p>
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
                            expectedAnswerIndex: 1,
                            dashboardDisabled: true,
                        },
                        {
                            id: "question_8",
                            type: "radio",
                            inputRef: React.createRef(null),
                            dashboardDisabled: true,
                            content : (
                                <>
                                    <p>
                                        The <b>temporary</b> allocation is the following:
                                        <ul>
                                            <li>Prize A is temporarily allocated to Ruth.</li>
                                            <li>Prize B is temporarily allocated to Theresa.</li>
                                            <li>Prize C is temporarily allocated to Shirley.</li>
                                            <li>Prize D is temporarily left unpaired.</li>
                                        </ul>
                                    </p>
                                    <p>
                                        All participants <b>except for you</b> are temporarily matched to prizes.<br/> 
                                        What about you? Given the temporary allocation, which prizes can you obtain, in principle? In other words, <b>what are your Obtainable Prizes</b>?<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p> 
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>All four prizes, since I can obtain any prize where the other participant temporarily allocated to that prize does not want it.</span>,
                                <span>Any prize where my priority is higher than that of the participant who is temporarily allocated the prize.</span>,
                                <span>Only the prize that was left unpaired in the temporary allocation.</span>,
                                <span>Any prize where my priority is higher than that of the participant who is temporarily allocated the prize, and the prize that was left unpaired in the temporary allocation.</span>,
                            ],
                            expectedAnswerIndex: 3,
                        },
                        {
                            id: "question_9",
                            type: "radio",
                            inputRef: React.createRef(null),
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    <b>Which of the following is true?</b><br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are determined using the prize priorities and the rankings of all participants except for you. <b>Your own ranking cannot influence which prizes are Obtainable.</b>
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are determined using the prize priorities and the rankings of all participants except for you. Your own ranking cannot influence which prizes are Obtainable.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Only the rankings of all participants except for me are used to determine the Obtainable Prizes.</span>,
                                <span>My own ranking can affect which prizes are Obtainable.</span>,
                                <span>Only the prize priorities are used to determine the Obtainable Prizes.</span>,
                                <span>The prize priorities and the rankings of all participants except for me are used to determine the Obtainable Prizes.</span>,
                            ],
                            expectedAnswerIndex: 3,        
                        },
                        {
                            id: "question_allocation_a",
                            type: "dropdown",
                            dashboardDisabled: true,
                            boldCustomerInProductsTable: "You",
                            inputRef: React.createRef(null),
                            label: (<span>Prize A : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now use this rule to determine your <b>Obtainable Prizes.</b><br/>
                                    Note: Now is the first time that your priority for getting the different prizes matters. Remember, it is indicated by the <span style={{color: "#0b1ae3"}}>“Y”s in the Prize Priorities table</span>, which are now colored blue.<br/>   
                                    Choose “Obtainable” or “Unobtainable” next to all the prizes below:<br/>
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Prize A is temporarily allocated to Ruth, and your priority for getting that prize is <b>lower</b> than hers. Hence <b>you cannot obtain Prize A</b>.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Prize A is temporarily allocated to Ruth, and your priority for getting that prize is <b>lower</b> than hers. Hence <b>you cannot obtain Prize A</b>.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.    
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            expectedAnswerIndex: 1,
                        },
                        {
                            id: "question_allocation_b",
                            type: "dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(null),
                            boldCustomerInProductsTable: "You",
                            label: (<span>Prize B : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now use this rule to determine your <b>Obtainable Prizes.</b><br/>
                                    Note: Now is the first time that your priority for getting the different prizes matters. Remember, it is indicated by the <span style={{color: "#0b1ae3"}}>“Y”s in the Prize Priorities table</span>, which are now colored blue.<br/>   
                                    Choose “Obtainable” or “Unobtainable” next to all the prizes below:<br/>
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Prize B is temporarily allocated to Theresa, but your priority for getting that prize is <b>higher</b> than hers. Hence <b>you can obtain Prize B</b>.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Prize B is temporarily allocated to Theresa, but your priority for getting that prize is <b>higher</b> than hers. Hence <b>you can obtain Prize B.</b><br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            expectedAnswerIndex: 0,
                        },
                        {
                            id: "question_allocation_c",
                            type: "dropdown",   
                            dashboardDisabled: true,
                            inputRef: React.createRef(null),
                            boldCustomerInProductsTable: "You",
                            label: (<span>Prize C : (Get it right on first try to increase your bonus)</span>),
                            content : (
                                <p>
                                    Now use this rule to determine your <b>Obtainable Prizes.</b><br/>
                                    Note: Now is the first time that your priority for getting the different prizes matters. Remember, it is indicated by the <span style={{color: "#0b1ae3"}}>“Y”s in the Prize Priorities table</span>, which are now colored blue.<br/>   
                                    Choose “Obtainable” or “Unobtainable” next to all the prizes below:<br/>
                                </p>    
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Prize C is temporarily allocated to Shirley, and your priority for getting that prize is lower than hers. Hence <b>you cannot obtain Prize C</b>.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Prize C is temporarily allocated to Shirley, and your priority for getting that prize is lower than hers. Hence <b>you cannot obtain Prize C</b>.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            expectedAnswerIndex: 1,                            
                        },
                        {
                            id: "question_allocation_d",
                            type: "dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(null),
                            label: (<span>Prize D : (Get it right on first try to increase your bonus)</span>),
                            boldCustomerInProductsTable: "You",
                            content : (
                                <p>
                                    Now use this rule to determine your <b>Obtainable Prizes.</b><br/>
                                    Note: Now is the first time that your priority for getting the different prizes matters. Remember, it is indicated by the <span style={{color: "#0b1ae3"}}>“Y”s in the Prize Priorities table</span>, which are now colored blue.<br/>   
                                    Choose “Obtainable” or “Unobtainable” next to all the prizes below:<br/>
                                </p>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Prize D was left unpaired in the temporary allocation. Hence <b>you can obtain Prize D</b>.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Prize D was left unpaired in the temporary allocation. Hence <b>you can obtain Prize D.</b><br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect answer. Please try again.
                                </p>
                            ),
                            options :[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            expectedAnswerIndex: 0,
                        },
                        {
                            id: "question_10",
                            inputRef: React.createRef(),
                            type: "radio",
                            dashboardDisabled: true,
                            content : (
                                <>
                                    <p>
                                        Your <b>Obtainable Prizes</b> are:
                                    </p>
                                    <p style={{display:'flex',justifyContent:'center'}}>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold",border:'2px solid black',padding:'1rem 3rem'}}>  
                                            <b>Prize B </b>and<b> Prize D</b>
                                        </span>
                                    </p>
                                    <p>
                                        Among these Obtainable Prizes, which prize do <b>you actually get?</b><br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes, you get the one that you ranked the highest.</b>
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes, you get the one that you ranked the highest.</b><br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                            options :[
                                <span>The prize that was left unpaired in the temporary allocation.</span>,
                                <span>The prize that other participants placed last in rankings on average.</span>,
                                <span>The prize that I ranked the highest.</span>,
                                <span>The prize which I have the highest priority for getting.</span>,
                            ],
                            expectedAnswerIndex: 2,
                        },
                        {
                            id: "allocated_prize",
                            type: "dropdown",
                            dashboardDisabled: true,
                            inputRef: React.createRef(),
                            boldColumnInCustomersTable: "You",
                            content : (
                                <>
                                    <p>
                                        Your <b>Obtainable Prizes</b> are:
                                    </p>
                                    <p style={{display:'flex',justifyContent:'center'}}>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold",border:'2px solid black',padding:'1rem 3rem'}}>  
                                            <b>Prize B </b>and<b> Prize D</b>
                                        </span>
                                    </p>
                                    <p>
                                        Now, your ranking is used to determine which of the Obtainable Prizes you actually get. Out of these <b>Obtainable Prizes,</b> select the prize <b>you (“Y”) ranked the highest</b> from the list below. This is the prize you get.<br/>
                                        <span style={{color: "#0b1ae3"}}>
                                           Note: Now is the first (and only) time that <b>your own ranking matters!</b> Remember, it is indicated by the “Y” column in the Participant Rankings table, which is now colored in blue.<br/>
                                        </span><br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct!<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                            options :[
                                <span>B</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 0,
                        },
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            boldColumnInCustomersTable: "You",
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize B.</b>
                                </p>   
                            )
                        }
                    ],
                    round2:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        First, find the <b>temporary allocation</b> of prizes to all participants <b>except for you</b> using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final temporary allocation</b>. Do <b>not</b> separately submit steps of the process like in Training Round 1.
                                    </p>
                                    <p>
                                        In case you are still not sure how to find the allocation by yourself, click on the button below to watch a helpful video explaining all the steps. Clicking on the video will pause/unpause it, and if you close and re-open the video, it will continue from the same point.
                                        <div style={{display:'flex', flexDirection : "column", justifyContent:'center', alignItems:'center'}}>
                                            <div class="btn-container">
                                                <button 
                                                    className="button-3"
                                                    type="button"
                                                    onClick={()=>{
                                                        setModals({...modals, video : true})
                                                        liveSend({
                                                            'information_type': 'video_modal_opened',
                                                            'time': new Date().toUTCString()
                                                        })
                                                    }}
                                                    >
                                                    Click here for a video with step-by-step explanations
                                                    </button>
                                            </div>
                                            <span>(To restart the video, please refresh the page)</span>
                                        </div>
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct temporary allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct temporary allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect temporary allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct temporary allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect temporary allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {"A":"Unpaired","B":"Shirley","C":"Theresa","D":"Ruth"},
                        },
                        {
                            id: "allocated_all",
                            type:"multiDropdown",
                            dashboardDisabled: true,
                            boldCustomerInProductsTable: "You",
                            content:(
                                <>
                                    <p>
                                        Next, find your <b>Obtainable Prizes</b>. For each of the four prizes below, choose “Obtainable” or “Unobtainable,” based on what you learned in the previous screens.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [0,1,1,1],
                            correctMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            dashboardDisabled: true,
                            boldColumnInCustomersTable: "You",
                            inputRef: React.createRef(),
                            content:(
                                <> 
                                    <p>
                                        Your <b>Obtainable Prizes</b> are:
                                    </p>
                                    <p style={{display:'flex',justifyContent:'center'}}>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold",border:'2px solid black',padding:'1rem 3rem'}}>  
                                            <b>Prize A</b>
                                        </span>
                                    </p>
                                    <p>Finally, select <b>the prize that you get</b> out of the Obtainable Prizes from the list below.</p>
                                </>
                            ),
                            options:[
                                <span>A</span>,
                            ],
                            expectedAnswerIndex: 0,
                            correctMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize A is the one you <b>ranked highest</b>. Hence you get this prize.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize A is the one you <b>ranked highest</b>. Hence you get this prize.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },  
                        {
                            id :"allocation_results",
                            dashboardDisabled: true,
                            type : "instructions",
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize A.</b>
                                </p>   
                            )
                        }
                    ],
                    round3:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        First, find the <b>temporary allocation</b> of prizes to all participants <b>except for you</b> using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final temporary allocation</b>. Do <b>not</b> separately submit steps of the process like in Training Round 1.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct temorary allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct temorary allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect temorary allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct temorary allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect temorary allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {"A":"Theresa","B":"Ruth","C":"Unpaired","D":"Shirley"},
                        },
                        {
                            id: "allocated_all",
                            type:"multiDropdown",
                            dashboardDisabled: true,
                            boldCustomerInProductsTable: "You",
                            content:(
                                <>
                                    <p>
                                        Next, find your <b>Obtainable Prizes</b>. For each of the four prizes below, choose “Obtainable” or “Unobtainable,” based on what you learned in the previous screens.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [0,1,0,0],
                            correctMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            dashboardDisabled: true,
                            boldColumnInCustomersTable: "You",
                            inputRef: React.createRef(),
                            content:(
                                <> 
                                    <p>
                                        Your <b>Obtainable Prizes</b> are:
                                    </p>
                                    <p style={{display:'flex',justifyContent:'center'}}>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold",border:'2px solid black',padding:'1rem 3rem'}}>  
                                            <b>Prize A</b>,<b> Prize C </b>and<b> Prize D</b>
                                        </span>
                                    </p>
                                    <p>Finally, select <b>the prize that you get</b> out of the Obtainable Prizes from the list below.</p>
                                </>
                            ),
                            options:[
                                <span>A</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 2,
                            correctMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize D is the one you <b>ranked highest</b>. Hence you get this prize.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize D is the one you <b>ranked highest</b>. Hence you get this prize.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                        },  
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize D.</b>
                                </p>   
                            )
                        }
                    ],
                    round4:[
                        {
                            id: "instruction_1",
                            type:"instructions",
                            content:(
                                <>
                                    <p>
                                        In this training round, you will perform the allocation process by yourself, instead of the computer performing it.
                                    </p>
                                    <p>
                                        Each step or question will count for your Understanding Bonus, so think about your answers carefully!
                                    </p>
                                </>
                            ),
                        },
                        {
                            id: "matching_all",
                            type: "matching",
                            content : (
                                <>
                                    <p>
                                        First, find the <b>temporary allocation</b> of prizes to all participants <b>except for you</b> using the Allocation Dashboard below. Use the multi-step process you learned.
                                    </p>
                                    <p style={{color : "#0b1ae3"}}>
                                        Note: In this round, you should only submit once you find the <b>final temporary allocation</b>. Do <b>not</b> separately submit steps of the process like in Training Round 1.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus; it will count as <b>5 questions</b>.<br/>
                                        If you only get it right on the second try it will still count for your bonus; it will count as <b>2 questions</b>.)
                                    </p>
                                </>
                            ),
                            correctMsg:(
                                <p>Correct temporary allocation!</p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct temporary allocation!<br/>
                                    Good job on the first try! This will count as <b>5 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>
                                    Incorrect temporary allocation. Please try again.
                                </p>
                            ),
                            correctSecondMsg:(
                                <p>
                                    Correct temporary allocation!<br/>
                                    Good job on the second try! This will count as <b>2 questions</b> for your Understanding Bonus.
                                </p>
                            ),
                            incorrectSkipMsg:(
                                <p>
                                    Incorrect temporary allocation.<br/>
                                    We set the dashboard correctly for you this time. Please make sure you understand your mistake.
                                </p>
                            ),
                            expectedMatching:   {"A":"Shirley","B":"Unpaired","C":"Theresa","D":"Ruth"},
                        },
                        {
                            id: "allocated_all",
                            boldCustomerInProductsTable: "You",
                            type:"multiDropdown",
                            content:(
                                <>
                                    <p>
                                        Next, find your <b>Obtainable Prizes</b>. For each of the four prizes below, choose “Obtainable” or “Unobtainable,” based on what you learned in the previous screens.
                                    </p>
                                    <p>
                                        Click Submit when you are done.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                </>
                            ),
                            options:[
                                <span>Obtainable</span>,
                                <span>Unobtainable</span>,
                            ],
                            inputsRefs: [
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                                React.createRef(),
                            ],
                            labels:[
                                <span>Prize A</span>,
                                <span>Prize B</span>,
                                <span>Prize C</span>,
                                <span>Prize D</span>,
                            ],
                            expectedAnswersIndex: [1,0,0,0],
                            correctMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! The <b>Obtainable Prizes</b> are  any prize where your priority is higher than that of the participant it is temporarily allocated to, and the prize that was left unpaired in the temporary allocation.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                            dashboardDisabled: true,
                        },
                        {
                            id: "allocated_prize",
                            type:"dropdown",
                            boldColumnInCustomersTable: "You",
                            inputRef: React.createRef(),
                            content:(
                               <> 
                                    <p>
                                        Your <b>Obtainable Prizes</b> are:
                                    </p>
                                    <p style={{display:'flex',justifyContent:'center'}}>
                                        <span style={{color: "#0b1ae3",fontWeight: "bold",border:'2px solid black',padding:'1rem 3rem'}}>  
                                            <b>Prize B, </b><b>Prize C </b>and<b> Prize D</b>
                                        </span>
                                    </p>
                                    <p>Finally, select <b>the prize that you get</b> out of the Obtainable Prizes from the list below.</p>
                                </>
                            ),
                            options:[
                                <span>B</span>,
                                <span>C</span>,
                                <span>D</span>,
                            ],
                            expectedAnswerIndex: 1,
                            correctMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize C is the one you <b>ranked highest</b>. Hence you get this prize.
                                </p>
                            ),
                            correctFirstMsg:(
                                <p>
                                    Correct! Among the <b>Obtainable Prizes</b>, Prize C is the one you <b>ranked highest</b>. Hence you get this prize.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            ),
                            incorrectMsg:(
                                <p>Incorrect answer. Please try again.</p>
                            ),
                            dashboardDisabled: true,
                        },
                        {
                            id :"allocation_results",
                            type : "instructions",
                            dashboardDisabled: true,
                            content : (
                                <p>
                                    The allocation process is over.<b> You get Prize C.</b>
                                </p>   
                            )
                        }
                    ],
                }
            }
            return steps[variant]["round"+round]
        }
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
            if (props.round === 1){
                if (readyToProceed) return ; 
                function getLastExpectedMatching(steps){
                    let result;
                    for (let step of steps){
                        if (step.id === currentStepId){
                            break
                        }
                        if (step.type === "matching"){
                            result = step.expectedMatching
                        }
                    }
                    if (!result){
                        result = props.products.reduce((acc,product) => {
                            acc[product] = "none"
                            return acc
                        },{})
                    }
                    return result
                }
                const lastExpectedMatching = getLastExpectedMatching(steps)
                setCurrentMatching(lastExpectedMatching)
            }
            else {
                setCurrentMatching(props.products.reduce((acc,product) => {
                    acc[product] = "none"
                    return acc
                },{}))
            }
            setSelectedProduct(null)
            liveSend({information_type : "reset"})  
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
            setMatchingMemo([...matchingMemo, matchedProduct])
            setCurrentMatching(newMatching)
            setSelectedProduct(null)
            setHighlightedCustomer(matchedToCustomer)
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
            if (nextStep.type !== "matching"){
                window.scrollTo(0,0)
            }
            if (nextStep.type === "instructions"){
                setReadyToProceed(true)
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
            matching_memo : matchingMemo
            })
        },[matchingMemo])
        React.useEffect(()=>{
            liveSend({
            information_type : "step_update",
            step_id : currentStepId
            })
        },[currentStepId])
        React.useEffect(()=>{
            const url =  videoUrls[props.variant+"Mechanics"]
            const fetchVideo = async (url) => {
                try {
                    const response = await fetch(url);
                    const videoBlob = await response.blob();
                    const videoObjectUrl = URL.createObjectURL(videoBlob);
                    setVideoSrc(videoObjectUrl);
                } catch (error) {
                    console.error('Error fetching the video:', error);
                }    
            }
            fetchVideo(url)
        },[])
        React.useEffect(()=>{
            const urls = Object.values(imgUrls);
            urls.forEach(url=>{
                const img = new Image();
                img.src = url;
            })
        },[])
        return (
                <>
                <button type="button" className="button-2" onClick={()=>setModals({allocation:true})}>Click for a reminder on the technical details of the allocation process</button><br/>
                {modals.allocation && <AllocationModal onClose={()=>setModals({allocation:false})} variant={props.variant} />}
                {modals.video && <VideoModal onClose={()=>setModals({video:false})} variant={props.variant} timeStamp={videoTimeStamp} src={videoSrc} />}
                <DashboardContext.Provider 
                value={{
                    currentMatching,
                    setCurrentMatching,
                    products:props.products,
                    customers:props.customers,
                    variant:props.variant,
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
                    setMatchingCounter,
                    setMatchingMemo,
                    matchingMemo,
                    setReadyToProceed,
                    readyToProceed,
                }}
                    >
                    <Questions/>
                    <Dashboard />
                </DashboardContext.Provider>
                </>
            )
    }
    function Questions(){
        const {steps,currentStepId,onProceed,currentMatching,matchingCounter,setCurrentMatching,round,setMatchingCounter,setMatchingMemo,matchingMemo,setReadyToProceed,readyToProceed,setSelectedProduct} = React.useContext(DashboardContext)
        const [message,setMessage] = React.useState(null)
        const [didTouch,setDidTouch] = React.useState(false)
        const currentStep = steps.find(step => step.id === currentStepId)
        function incrementMatchingCounter(){
            setMatchingCounter(matchingCounter + 1)
            liveSend({
                information_type : "matching_counter_update",
                matching_counter : matchingCounter + 1
            })
        }
        function resetMatchingCounter(){
            setMatchingCounter(0)
            liveSend({
                information_type : "matching_counter_update",
                matching_counter : 0
            })
        }
        function onSubmit(){
            if (readyToProceed || currentStep.type === "instructions"){
                setMessage(null)
                setReadyToProceed(false)
                setDidTouch(false)
                onProceed()
                return 
            }
            if (currentStep.type === "radio"){
                const expectedAnswerIndex = currentStep.expectedAnswerIndex
                const selectedAnswerIndex = parseInt(currentStep.inputRef.current.querySelector("input:checked")?.value || null)
                const isCorrect = expectedAnswerIndex === selectedAnswerIndex   
                let currentMatchingCounter = matchingCounter      
                let understanding_bonus = 0 ;
                if (isCorrect){
                    if (matchingCounter === 0){
                        setMessage("correctFirstMsg")
                        understanding_bonus+= 1 
                    }
                    else{
                        setMessage("correctMsg")
                    }
                    setMatchingCounter(0)
                    setReadyToProceed(true)
                    currentStep.inputRef.current.querySelectorAll("input").forEach(input => {
                        input.disabled = true
                    })
                }
                else{
                    incrementMatchingCounter()
                    currentMatchingCounter = matchingCounter
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
                let currentMatchingCounter = matchingCounter
                if (isCorrect){
                    if (matchingCounter === 0){
                        setMessage("correctFirstMsg")
                        if (round ===1){
                            understanding_bonus+= 1    
                        }
                        else {
                            understanding_bonus+= 5
                        }
                    }
                    else{
                        if (round !== 1){
                            if (matchingCounter === 1){
                                understanding_bonus+= 2
                                setMessage("correctSecondMsg")
                            }
                            else {
                                setMessage("correctMsg")
                            }
                        }else{
                            setMessage("correctMsg")
                        }
                    }
                    setMatchingCounter(0)
                    setReadyToProceed(true)
                    setSelectedProduct(null)
                }
                else{
                    const isLastAttempt = currentMatchingCounter >= 2
                    if (isLastAttempt){
                        function getMatchedProducts(expectedMatching){
                            return Object.keys(expectedMatching).filter((product)=>{
                                if (expectedMatching[product] === "none") return false ; 
                                return true 
                            })
                        }
                        setMatchingMemo([...matchingMemo,...getMatchedProducts(expectedMatching)])
                        resetMatchingCounter()
                        setMessage("incorrectSkipMsg")
                        setCurrentMatching(expectedMatching)
                        setReadyToProceed(true)
                        setSelectedProduct(null)
                    }
                    else{
                        incrementMatchingCounter()
                        setMessage("incorrectMsg")
                    }
                }
                liveSend({
                    information_type : "matching_submission",
                    matching:currentMatching,
                    matching_id:currentStep.id,
                    is_correct:isCorrect,
                    matching_counter:currentMatchingCounter,
                    understanding_bonus:understanding_bonus,
                    time_stamp : new Date().toUTCString()  
                })
            }
            if (currentStep.type === "dropdown"){
                const expectedAnswerIndex = currentStep.expectedAnswerIndex
                const selectedAnswerIndex = parseInt(currentStep.inputRef.current.querySelector("select").value)
                const isCorrect = expectedAnswerIndex === selectedAnswerIndex
                let currentMatchingCounter = matchingCounter
                let understanding_bonus = 0 ;
                if (isCorrect){
                    if (matchingCounter === 0){
                        setMessage("correctFirstMsg")
                        understanding_bonus+= 1
                    }
                    else{
                        setMessage("correctMsg")
                    }
                    setMatchingCounter(0)
                    setReadyToProceed(true)
                    currentStep.inputRef.current.querySelector("select").disabled = true
                }
                else{
                    incrementMatchingCounter()
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
            if (currentStep.type === "multiDropdown"){
             const expectedAnswersIndex = currentStep.expectedAnswersIndex   
                const selectedAnswersIndex = currentStep.inputsRefs.map((inputRef,index) => {
                    return parseInt(inputRef.current.querySelector("select").value)
                })
                const isCorrect = expectedAnswersIndex.every((expectedAnswerIndex,index) => {
                    return expectedAnswerIndex === selectedAnswersIndex[index]
                })
                let currentMatchingCounter = matchingCounter
                let understanding_bonus = 0 ;
                if (isCorrect){
                    if (matchingCounter === 0){
                        setMessage("correctFirstMsg")
                        understanding_bonus+= 1
                    }
                    else{
                        setMessage("correctMsg")
                    }
                    setMatchingCounter(0)
                    setReadyToProceed(true)
                    currentStep.inputsRefs.forEach(inputRef => {
                        inputRef.current.querySelectorAll("select").forEach(select => {
                            select.disabled = true
                        })
                    })
                }
                else{
                    incrementMatchingCounter()
                    currentMatchingCounter = matchingCounter.current
                    setMessage("incorrectMsg")
                }
                liveSend({
                    information_type : "question_submission",
                    expected_answer : expectedAnswersIndex,
                    selected_answer : selectedAnswersIndex,
                    is_correct : isCorrect,
                    understanding_bonus : understanding_bonus,
                    matching_counter : currentMatchingCounter,
                    time_stamp : new Date().toUTCString(),
                    question_id : currentStep.id
                })
            }
        }
        const questionsSectionRef = React.useRef()
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
        function isButtonDisabled(){
            if (readyToProceed) return false ;
            if (currentStep.type === "matching" ) return false;
            return !didTouch
        }
        return (
            <section ref={questionsSectionRef}>
            {currentStep.content}
            {
                currentStep.type === "radio" &&
                    <div ref={currentStep.inputRef} id={currentStepId} key={currentStepId}>
                    {
                        currentStep.options.map((option,index) => {
                            return (
                                <div style={{display:'flex',gap:'0.5rem',alignItems:'baseline'}} key={index}>
                                    <input type="radio" id={currentStepId+"_option_"+index} name={currentStepId} value={index} onChange={()=>{setDidTouch(true)}} />
                                    <label htmlFor={currentStepId+"_option_"+index}>{option}</label>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                currentStep.type === "dropdown" &&
                    <div ref={currentStep.inputRef} style={{display:'flex',flexDirection:'column',gap:'0.5rem'}} id={currentStepId} key={currentStepId}>
                        <label htmlFor={currentStepId+'-dropdown'}>{currentStep.label}</label>
                        <select className="custom-select" id={currentStepId+'-dropdown'} onChange={()=>{setDidTouch(true)}}>
                            <option value={-1} selected key={currentStepId+"-1"}></option>
                            {
                                currentStep.options.map((option,index) => {
                                    return (
                                        <option value={index} key={currentStepId+index} id={currentStepId+index}>{option}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
            }   
            {
                currentStep.type === "multiDropdown" &&
                    <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    {
                        currentStep.labels.map((label,index) => {
                            return (
                                <div ref={currentStep.inputsRefs[index]} style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                                    <label htmlFor={currentStepId+'-dropdown'+index}>{label}</label>
                                    <select className="custom-select" id={currentStepId+'-dropdown'+index} onChange={()=>{setDidTouch(true)}}>
                                    <option value={-1} selected></option>
                                    {
                                        currentStep.options.map((option,index) => {
                                            return (
                                                <option value={index} >{option}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                )
                            })
                        }
                        </div>
            }     
            {! readyToProceed && 
                <div style={{display:"flex",justifyContent:'center',marginTop:'1rem'}}>
                    <button type="button" className="btn btn-primary" onClick={onSubmit} style={{marginTop: '0.5rem'}} disabled={isButtonDisabled()}>
                        {currentStep.type === "instructions" ? "Proceed"  :  readyToProceed ? "Proceed" : "Submit"}
                    </button>
                </div>
            }      
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
            {
                message && message === "correctSecondMsg" &&
                    <div class="correct-msg">
                        {currentStep.correctSecondMsg}
                    </div>
            }
            {readyToProceed && 
                <div style={{display:"flex",justifyContent:'center',marginTop:'1rem'}}>
                    <button type="button" className="btn btn-primary" onClick={onSubmit} style={{marginTop: '0.5rem'}} disabled={isButtonDisabled()}>
                        {currentStep.type === "instructions" ? "Proceed"  :  readyToProceed ? "Proceed" : "Submit"}
                    </button>
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
        const tableTitlesDirection = props.variant === "menu" ? "row-reverse" : "row";
        const currentStep = props.steps.find(step => step.id === props.currentStepId)
        const pointerEvents = (()=>{
            if (currentStep.dashboardDisabled) return "none";
            if (props.readyToProceed) return "none";
            currentStep.dashboardDisabled ? "none" : "auto"
        })()
        return (
            <>
                <div className="container-fluid" style={{border:'5px solid gray',position:'relative',marginTop:'2rem',pointerEvents:pointerEvents}}>
                {/* reset button */}
                <button
                    type="button"
                    className="position-absolute btn btn-outline-dark"
                    id="reset-button"
                    style={{ right: '.5rem', top: '.5rem' }}
                    onClick={props.onReset}
                 >
                    reset&nbsp;
                    <svg className="bi bi-arrow-counterclockwise" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" fillRule="evenodd" />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
                </button>
                <div className="row" style={{justifyContent: 'space-between',flexWrap: 'nowrap',alignItems: 'baseline',flexDirection:tableTitlesDirection}}>
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
                <div id="" style={{display:'flex',justifyContent:'space-evenly',gap:'2rem',marginTop:'1rem'}}>
                    {/* customers table */}
                    <CustomersTable />
                    {/* products table */}
                    <ProductsTable />
                </div>
                <hr/>
                {/* middle row */}
                <ProductsRow/>
                <hr/>
                {/* bottom row */}
                <CustomersRow/>
                <hr/>
            </div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'0.5rem'}}>
                    Allocation Dashboard
                </div>
            </>
        )
    }
    function CustomersRow(){
    const {currentMatching,maxProductsPerCustomer,customers,onMouseEnterCustomer,onMouseLeaveCustomer,selectedProduct,setSelectedProduct,onMatching,matchingMemo,products,onProductSelect,variant} = React.useContext(DashboardContext)
    /* 
    each row represents a customer
    for each row : 
        the products that the customer is matched to are presented in the order they were matched 
     */
     function orderProductsMatchedToCustomer(productsMatchedToCustomer,matchingMemo){
        const orderedProductsMatchedToCustomer = [];
        for (let i = matchingMemo.length - 1; i >= 0; i--){
            const product = matchingMemo[i]
            if (productsMatchedToCustomer.includes(product) && !orderedProductsMatchedToCustomer.includes(product)){
                orderedProductsMatchedToCustomer.unshift(product)
            }
            if (orderedProductsMatchedToCustomer.length === productsMatchedToCustomer.length){
                break
            }
        }
        return orderedProductsMatchedToCustomer
     }
     const containerStyle = ()=>{
         const gridTemplateRows = ()=>{
             const numberOfRows = Object.keys(customers).length;
             return "repeat("+numberOfRows+",57px)"
         }
         return {
          display: 'grid',
          gridTemplateColumns: '1fr 8fr',
          gridAutoFlow: 'row',
          gridRowGap: '.5rem',
          gridColumnGap: '.3rem',
          gridTemplateRows: gridTemplateRows(),
      }
    }
        return (
             <div id="third-row">
                <div id="prizes-rows">
                    <div className="customers-rows-container" style ={containerStyle()}>
                        {
                            customers.map((customer)=>{
                                const productsMatchedToCustomers = products.filter((product)=>{
                                    return currentMatching[product] === customer
                                })
                                const orderedProductsMatchedToCustomers = orderProductsMatchedToCustomer(productsMatchedToCustomers,matchingMemo)
                                function isMatchable(){
                                    const numberOfProductsMatchedToCustomer = getNumberOfProductsMatchedToCustomer()
                                    if (numberOfProductsMatchedToCustomer >= maxProductsPerCustomer[customer]) return false
                                    return true  
                                }
                                function getNumberOfProductsMatchedToCustomer(){
                                    let counter = 0
                                    for (let product in currentMatching){
                                        if (currentMatching[product] === customer){
                                            counter = counter + 1
                                        }
                                    }
                                    return counter
                                }
                                function showPlus(){
                                    if (!selectedProduct) return false
                                    if (currentMatching[selectedProduct] === customer) return false
                                    const matchable = isMatchable()
                                    return matchable
                                }
                                function getCustomerString(customer){
                                    if (customer === "Unpaired"){
                                        return "U.P."
                                    }
                                    return customer.charAt(0)
                                }
                                return(
                                    <>
                                        <span className={isMatchable() === false && 'text-faded'}>{getCustomerString(customer)}</span>
                                        <div
                                            onMouseEnter={()=>{
                                                if (!isMatchable()) return;
                                                onMouseEnterCustomer(customer)
                                            }}
                                            onMouseLeave={()=>{onMouseLeaveCustomer(customer)}}
                                            className="products-row" 
                                            style={{backgroundColor: !isMatchable() && 'var(--very-light-grey)'}}
                                        >
                                        { /* products */ }
                                        {
                                            orderedProductsMatchedToCustomers.length !== 0 &&  
                                            orderedProductsMatchedToCustomers.map((product,productIndex)=>{
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
                    {
                        variant === "menu" &&
                            <span><b>U.P.&nbsp;</b>= Unpaired</span>
                    }
                </div>
             </div>
        )
    }
    function ProductsTable() {
        const {products,productsPriorities,currentMatching,selectedProduct,maxProductsPerCustomer,steps,currentStepId}= React.useContext(DashboardContext)
        const currentStep = steps.find(steps=>steps.id === currentStepId)
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
                                        const isCellFaded =  maxProductsPerCustomer[customer] === 0
                                        const isCellBold = (() =>{
                                            const boldCustomer = currentStep.boldCustomerInProductsTable ?? null
                                            if (!boldCustomer) return false
                                            return boldCustomer === customer
                                        })()
                                        const className = () => {
                                           let classNames = "dButton"
                                           if (isCellHighlight) {
                                               classNames += " dButtonMatched"
                                           }
                                           if (isCellBold){
                                               classNames += " text-bold text-blue"
                                           }
                                           else if (isCellFaded){
                                               classNames += " text-faded"
                                           }
                                           return classNames
                                        }
                                        return (
                                            <div className={className()} key={rowIndex}>
                                                {customer.charAt(0)}
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
        const {customers, customersPriorities, currentMatching, highlightedCustomer, variant, steps, currentStepId }= React.useContext(DashboardContext)
        const currentStep = steps.find(steps=>steps.id === currentStepId)
        return(
            <div className="priorities-table-container">
                {
                    Object.keys(customersPriorities).map((customer,columnIndex)=>{
                        const customerPriorities = customersPriorities[customer]
                        const isColumnHighlighted = customer === highlightedCustomer
                        const isColumnBold = currentStep.boldColumnInCustomersTable === customer
                        const classNames = () => {
                            let classNames = "table-column flexItemButtonsBackground"
                            if (columnIndex === 0) {
                                classNames += " verticalRight"
                            }
                            else if (columnIndex === Object.keys(customersPriorities).length - 1) {
                                classNames += " verticalLeft"
                            }
                            else {
                                classNames += " verticalBoth"
                            }
                            if (isColumnHighlighted) {
                                classNames += " highlited"
                            }
                            if (variant === "menu" && customer === "You" && !isColumnBold){
                                classNames += " text-faded"
                            }
                            if (isColumnBold){
                                classNames += " text-bold text-blue"
                            }
                            return classNames
                        }
                        return (
                            <div className={classNames()} key={columnIndex}>
                                <div className="dButtonTop dButton" id={customer}>{customer.charAt(0)}</div>
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
        const {products,currentMatching,selectedProduct,setSelectedProduct,onProductSelect,variant}= React.useContext(DashboardContext)
        return (
            <div id="middle-row" >
                <span>
                    { variant === "traditional" && 
                        <b style={{fontSize: "1.5rem"}}>Pick participants to pair →</b>
                    }
                    { variant === "menu" && 
                        <b style={{fontSize: "1.5rem"}}>Pick prizes to pair →</b>
                    }
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
                    {
                            props.variant === "traditional" && 
                                <div>
                                    <p>
                                       <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                                       Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                                    </p><br/>
                                    <h5 style={{fontSize:'1.25rem'}}>Overview of allocation process</h5>
                                    <p>
                                        The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                                        <img src={imgUrls.trad} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                                    </p><br/>
                                    <h5 style={{fontSize:'1.25rem'}}>Details of allocation process</h5>
                                    <p>
                                        The allocation process is a multi-step process, as follows (it may look complicated, but don’t worry, we will rehearse this in a moment):
                                    </p>
                                    <ol>
                                        <li>
                                            In the first step, each participant is paired to their <b>highest</b>-rank prize.
                                        </li>
                                        <li>
                                            <p>
                                                In the next step, possible conflicts are detected and solved.<br/>
                                                If two (or more) participants are paired to the same prize, this is a <b>conflict</b>.<br/>
                                            </p>
                                            <p>
                                                Each conflict is solved in two steps:
                                                 <ul>
                                                    <li>
                                                        <b>Unpair</b>: only the participant highest in that prize’s priorities remains paired to that prize. The others get unpaired.
                                                    </li>
                                                    <li>
                                                        <b>Re-pair</b>: all unpaired participants can only get re-paired to prizes that they were not paired with before. Each unpaired participant is re-paired to their <b>highest-rank</b> prize among the prizes they <b>were not yet paired with</b>.
                                                    </li>
                                                </ul>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Later steps continue in the same way, by detecting and solving new conflicts.<br/>
                                                Like before, if two (or more) participants are paired to the same prize, this is a <b>conflict</b>.<br/> The conflict is solved using the same <b>Unpair</b> and <b>Re-pair</b> steps from above. 
                                            </p>
                                            <p>
                                                A participant can get unpaired from a prize <b>even if they successfully got paired to that prize in a previous step.</b>
                                            </p>
                                        </li>
                                    </ol>
                                    <p>
                                        When there are no more conflicts, the process is over. The result is each participant being paired to a different prize.
                                    </p>
                                    <p>
                                        Each prize is then allocated to the participant paired to it.
                                    </p>
                                </div>
                        }
                        {
                            props.variant === "menu" &&
                                <div>
                                    <p>
                                        <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                                        Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                                    </p><br/>
                                    <h5>Overview of allocation process</h5>
                                    <p>
                                        The prize you get is determined using an allocation process with two main steps:
                                        <ol>
                                            <li>The computer determines some group of <b>Obtainable Prizes</b> that you might receive. Your own ranking does not influence the Obtainable Prizes. Instead, they are determined using only the prize priorities and the rankings of the other participants.</li>
                                            <li>You get the Obtainable Prize that you <b>ranked highest</b> (in the ranking you submitted).</li>
                                        </ol> 
                                    </p><br/>
                                    <p style={{color: "#0b1ae3"}}>
                                        <b>The important principle</b>: Your own ranking does <b>not</b> influence what the Obtainable Prizes are, but it <b>does</b> determine what you get from among the Obtainable Prizes—you get the Obtainable Prize that you ranked the <b>highest.</b>
                                    </p>
                                    <p>
                                        The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                                        <img src={imgUrls.menu} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                                    </p>
                                    <h5>Details of allocation process</h5>
                                    <h6><b>Priorities and rankings → Temporary allocation → Obtainable Prizes</b></h6>
                                    <p>
                                        The allocation process begins with a multi-step process. This process  determines a “temporary allocation” of prizes to all participants <b>except for you</b>, and then determines your Obtainable Prizes based on this temporary allocation. This process <b>does not involve your own submitted ranking</b>, and works as follows (it may look complicated, but don’t worry, we will rehearse this in a moment):
                                    </p>
                                    <ol>
                                        <li>
                                            <p>
                                                 In the first step, each prize is paired to its <b>highest</b>-priority participant, among all participants <b>except for you.</b>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                In the next step, possible conflicts are detected and solved.<br/>
                                                If two (or more) prizes are paired to the same participant, this is a <b>conflict.</b>
                                            </p>
                                            <p>
                                                Each conflict is solved in two steps:
                                                <ul>
                                                    <li>
                                                       <b>Unpair:</b> only the prize highest in that participant’s ranking  remains paired to that participant. The others get unpaired.
                                                    </li>
                                                    <li>
                                                        <b>Re-pair:</b> all unpaired prizes can only get re-paired to participants that they were not paired with before, and who are not you. Each unpaired prize is re-paired to its <b>highest</b>-priority participant, among the participants they <b>were not yet paired with</b> and <b>except for you.</b>
                                                    </li>
                                                </ul>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Later steps continue in the same way, by detecting and solving new conflicts.
                                                Like before, if two (or more) prizes are paired to the same participant, this is a <b>conflict.</b> The conflict is solved using the same <b>Unpair</b> and <b>Re-pair</b> steps from above.
                                            </p>
                                            <p>
                                                A prize can get unpaired from a participant <b>even if it successfully got paired to that participant in a previous step.</b>
                                            </p>   
                                            <p>
                                                There is one <b>important thing to note about</b> the Re-pair step:<br/>
                                                During the process, one prize will encounter a conflict with <b>every</b> participant, except for you, and will eventually get unpaired from all of them. That prize cannot be re-paired and will <b>remain unpaired</b> at the end of the process.
                                            </p>
                                        </li>
                                    </ol>
                                    <p>
                                        When there are no more conflicts and when one prize was unpaired from all participants (except for you), the process is over. The result is each prize, except for the unpaired one, being paired to a different participant (except for you).
                                    </p>
                                    <p>
                                        Each prize except for the unpaired one is then <b>temporarily allocated</b> to the participant it is paired to.<br/>
                                    </p>
                                    <p>
                                        The other participants do not get their prize from the temporary allocation; their prizes are determined by some other process.
                                    </p>
                                    <p>
                                        Instead, the temporary allocation is used to determine your Obtainable Prizes.
                                    </p>
                                    <p>
                                        Next, we will tell you how the <b>Obtainable Prizes</b> are determined from the temporary allocation.<br/>
                                        In this temporary allocation, no prize was allocated to you. To determine which prize is allocated to you, the computer first determines which prizes you can obtain in principle. These are the <b>Obtainable Prizes.</b><br/>
                                        You can obtain two kinds of prizes:
                                        <ol>
                                            <li>Any prize for which <b>your priority is higher</b> than that of the participant it is temporarily allocated to.</li>
                                            <li><b>The prize that was left unpaired in the temporary allocation.</b></li>
                                        </ol>
                                        You cannot obtain any other prizes.
                                    </p>
                                    <h6><b>Obtainable Prizes → The prize you get</b></h6>
                                    
                                    <p>
                                        Finally, we will remind you how the prize you get is selected from among the Obtainable Prizes, using your ranking.<br/>
                                        In fact, this is the <b>only</b> time the allocation process uses your ranking. 
                                    </p>   
                                    <p>
                                        From among the Obtainable Prizes, <b>you get the one that you ranked the highest. </b><br/>
                                        In other words, the computer will look through your ranking from top to bottom, and you will get the first prize that is Obtainable.
                                    </p>     
                                </div>      
                        }
                </div>
            </div>
        )
    }
    function VideoModal(props){
        const url = React.useMemo(()=>{
            return videoUrls[props.variant+"Mechanics"]
        },[props.variant])
        const videoRef = React.useRef(null)
        React.useEffect(()=>{
            videoRef.current.currentTime = props.timeStamp.current
            play()
        },[])
        function play(){
            videoRef.current.play()
        }
        function pause(){
            videoRef.current.pause()
        }
        function onBackgroundClick(){
            onClose()
        }
        function onClose(){
            props.timeStamp.current = videoRef.current.currentTime
            liveSend({
                'information_type':'set_video_time_stamp',
                'time_stamp':videoRef.current.currentTime
            })
            props.onClose()
        }
        function onVideoClick(e){
            e.stopPropagation()
            const isPlaying = !videoRef.current.paused
            if (isPlaying){
                pause()
            }
            else {
                play() 
            }
        }
        
        return (
            <div className="video-modal" onClick={onBackgroundClick}>
             {/* close button */}
            <video
                ref={videoRef}
                onClick={onVideoClick}
                >
                <source src={props.src ?? url} type="video/mp4"></source>
            </video>
             <button 
                className="close-button"
                onClick={onClose}
             >
                Ⓧ
            </button> 
            </div>    
        )
    }
    `
    renderReactComponent(jsxCode, "react-root", "DaAlgoInterface", JSON.stringify(getPropsFromJsVars(js_vars)))

}

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

function liveRecv(data) {
    const props = getPropsFromJsVars(js_vars)
    // return renderDaAlgoPage()
}



