const ACTION_TYPES = {
    "NEXT_BUTTON_CLICKED": "NEXT_BUTTON_CLICKED", "SET_CURRENT_STEP": "SET_CURRENT_STEP",
}
const steps = [
    {
        id: "intro", type: "instructions", expectedAnswerIndex: 0,
    }, {
        id: "prize_table", type: "instructions",
    }, {
        id: "independence", type: "radio", expectedAnswerIndex: 1,
    }, {
        id: 'value_table', type: 'radio', expectedAnswerIndex: 1,
    }, {
        id: 'prize_priorities', type: 'instructions',
    }, {
        id: 'self_rank_independence', type: 'radio', expectedAnswerIndex: 1,
    }, {
        id: 'ranking_form', type: 'rankingForm',
    }, {
        id: 'allocation_results', type: 'allocationResults',
    }, {
        id: 'competitors_rank_independence', type: 'radio', expectedAnswerIndex: 0,
    }
]
const stepsDividedToRounds = [
    ['intro', 'prize_table', 'independence', 'value_table', 'prize_priorities', 'self_rank_independence', 'ranking_form', 'allocation_results', 'competitors_rank_independence'], ['intro', 'prize_table', 'prize_priorities', 'ranking_form', 'allocation_results'],
]
window.addEventListener("load", () => {
    renderUiFromState();
})


function renderUiFromState(step) {
    const jsxCode = `
        function MoreStam(){
            return (<div>MoreStam</div>)
        }
        function Stam(){
            return (<div>Stam</div>)
        }
        function NullTrainingPage(props){
            const {initialStep, stepsInRound,roundNumber,prizePriorities,currency} = props;
            const [prizesModal, setPrizesModal] = React.useState(false);
            const [studyModal, setStudyModal] = React.useState(false);
            const [rankingModal, setRankingModal] = React.useState(false);
            const [activeSteps, setActiveSteps] = React.useState([initialStep])
            const [buttonRole, setButtonRole] = React.useState("next");
            const [allocationLoader, setAllocationLoader] = React.useState(false);
            const sectionsRefs = {
                "intro": React.useRef(null),
                "prize_table": React.useRef(null),
                "independence": React.useRef(null),
                "value_table": React.useRef(null),
                "prize_priorities": React.useRef(null),
                "self_rank_independence": React.useRef(null),
                "ranking_form": React.useRef(null),
                "allocation_results": React.useRef(null),
                "competitors_rank_independence": React.useRef(null),
            }
            const questionsRefs = {
                // "independence": React.useRef(null),
                // "value_table": React.useRef(null),
                // "self_rank_independence": React.useRef(null),
                // "competitors_rank_independence": React.useRef(null),
                independence: {
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null), 
                },
                value_table: {
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null),
                },
                self_rank_independence: {
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null),
                },
                competitors_rank_independence: {
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null),
                },
            }
            const rankingFormRefs = {
                "first_priority": React.useRef(null),
                "second_priority": React.useRef(null),
                "third_priority": React.useRef(null),
                "fourth_priority": React.useRef(null),
                "error_message": React.useRef(null),
                "input": React.useRef(null),
            }
            const mistakesCounter = React.useRef(0);
            React.useEffect(()=>{
                if (activeSteps.length === 1) return ;
                /* when activesteps changes get the ref of latest step and scroll to it */
                const latestStep = activeSteps.at(-1);
                const latestStepRef = sectionsRefs[latestStep.id];
                if (latestStepRef.current === null) return ;
                latestStepRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            },[activeSteps])
            function onClick(e){
                e.preventDefault();
                if (buttonRole === "next") {
                    return onNext(e);
                }
                if (buttonRole === "submit") {
                    return onSubmit(e);
                }
           }
            function onSubmit(e){
                const currentStep = activeSteps.at(-1);
                if (currentStep.type === "radio") {
                    const questionInformation = {
                            is_correct: false,
                            attemp_number: mistakesCounter.current + 1,
                            understanding_bonus: 0,
                            answer: null,
                            question_id: currentStep.id,
                            expected_answer: null,
                        }
                        const correctAnswer = currentStep.expectedAnswerIndex;
                        const userAnswer = parseInt(questionsRefs[currentStep.id]?.value.current);
                        questionInformation.expected_answer = correctAnswer;
                        questionInformation.answer = userAnswer;
                        /* hide all messages */
                       [questionsRefs[currentStep.id].incorrect.current, questionsRefs[currentStep.id].correct.current, questionsRefs[currentStep.id].correctFirstAttempt.current].forEach((ref) => {
                            if (ref === null) return ;
                            ref.classList.add("hidden");
                       })
                        if (correctAnswer === userAnswer) {
                            questionInformation.is_correct = true;
                            if (mistakesCounter.current === 0) {
                                /* show correct first message*/
                                const correctFirstAttempt = questionsRefs[currentStep.id].correctFirstAttempt.current;
                                if (correctFirstAttempt === null) return ;
                                correctFirstAttempt.classList.remove("hidden");
                                questionInformation.understanding_bonus = 1;
                            }else{
                                /* show correct message*/
                                const correct = questionsRefs[currentStep.id].correct.current;
                                if (correct === null) return ;
                                correct.classList.remove("hidden");
                            }
                            mistakesCounter.current = 0;
                            setButtonRole("next");
                        }
                        else {
                            mistakesCounter.current += 1;
                            /* show incorrect message*/
                            const incorrect = questionsRefs[currentStep.id].incorrect.current;
                            if (incorrect === null) return ;
                            incorrect.classList.remove("hidden");
                        }
                            liveSend({
                                "information_type" :"question_submission",
                                ...questionInformation
                            })
                        }
                if (currentStep.type === "rankingForm") {
                    const firstPriority = props.prizes[rankingFormRefs.first_priority.current - 1];
                    const secondPriority = props.prizes[rankingFormRefs.second_priority.current - 1];
                    const thirdPriority = props.prizes[rankingFormRefs.third_priority.current - 1];
                    const fourthPriority = props.prizes[rankingFormRefs.fourth_priority.current - 1];
                    const errorMessage = rankingFormRefs.error_message.current;
                    const input = rankingFormRefs.input.current;
                    if (!firstPriority || !secondPriority || !thirdPriority || !fourthPriority) {
                        errorMessage.classList.remove("hidden");
                        return ;
                    }
                    errorMessage.classList.add("hidden");
                    input.disabled = true;
                    setButtonRole("next");
                    const participantsPriorities = {
                        "You":[firstPriority, secondPriority, thirdPriority, fourthPriority],
                        ...props.participantsPriorities
                    }
                    liveSend({
                        information_type: "ranking_form_submission",
                        participants_priorities: participantsPriorities,
                    })
                }
           }
            function onNext(e){
                e.preventDefault();
                const currentStep = activeSteps.at(-1);
                const stepIndex = stepsInRound.findIndex((possibleStep) => possibleStep === currentStep.id);
                const isLastStep = stepIndex === stepsInRound.length - 1;
                if (isLastStep === true) {
                    document.getElementById("form").submit();
                    return 
                }
                const nextStep = steps.find((step) => step.id === stepsInRound[stepIndex + 1])        
                if (nextStep.type === "radio") {
                    setActiveSteps([...activeSteps, nextStep]);
                    setButtonRole("submit");
                }
                if (nextStep.type === "instructions") {
                    setActiveSteps([...activeSteps, nextStep]);
                    setButtonRole("next");
                }
                if (nextStep.type === "rankingForm") {
                    setActiveSteps([...activeSteps, nextStep]);
                    setButtonRole("submit");
                }
                if (nextStep.type === "allocationResults") {
                    setAllocationLoader(true);
                    setActiveSteps([...activeSteps, nextStep]);
                    setTimeout(() => {
                        setAllocationLoader(false);
                    }, 2000);
                }
            }
            return (
                <div>
                    {rankingModal && <RankingModal onClose={()=>{setRankingModal(false)}}/>}
                    {studyModal && <StudyModal onClose={()=>{setStudyModal(false)}}/>}
                    { activeSteps.some(step => step.id === "intro") &&
                         <section ref={sectionsRefs.intro}>
                         <button class="button-2" type="button" onClick={()=>{setStudyModal(true)}}>Click for a general reminder on this study</button> 
                            <p>
                                This is a training round.<br/>
                                {
                                    roundNumber === 1 ?
                                    <span>Everything is <b>the same</b> as in the real rounds you will play later on, except that you will <b>not</b> earn the money worth of the prize you will get. Instead, we will ask you questions which can count for your <b>Understanding Bonus</b> at the end of the study.</span>
                                    :
                                    <span>Everything is <b>the same</b> as in the real rounds you will play later on, except that you will <b>not</b> earn the money worth of the prize you will get. Instead, completing this round will count for your <b>Understanding Bonus</b> at the end of the study.</span>
                                }
                            </p>
                            {
                                roundNumber === 1 && <p>Remember: each question increases your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!</p>
                            }
                            {
                                activeSteps.at(-1).id === "intro" && 
                                    <Button 
                                        onClick={onClick} 
                                        text="Proceed"
                                        className="btn-primary"
                                    />
                            }
                        </section>
                    }
                    { activeSteps.some(step => step.id === "prize_table") &&
                        <section ref={sectionsRefs.prize_table}>
                            <h4>Step 1: Round Information</h4>
                            <p>In this round, your <b>prizes</b> are:</p>
                            <table id="prize-table">
                                <thead>
                                    <tr>
                                        <th>Prize</th>
                                        {props.prizes.map((prize) => <th>{prize}</th>)}
                                    </tr>
                                    <tr>
                                    <td>Money Worth</td>
                                       {props.prizes.map((prize)=>{
                                           return <td>{getMoneyString(props.prizesValues[prize],currency)}</td>
                                       })}
                                    </tr>
                                </thead>
                            </table><br/>
                            <button class="button-2" id="GenBtn1" onClick={()=>{setPrizesModal(true)}} type="button">Click for a reminder on what the prizes mean</button><br/>
                            {prizesModal === true && <PrizesModal onClose={()=>{setPrizesModal(false)}}/>}
                            {
                                activeSteps.at(-1).id === "prize_table" &&
                                    <Button
                                        onClick={onClick}
                                        text="Proceed"
                                        className="btn-primary"
                                    />
                            }
                        </section>
                    }
                    { activeSteps.some(step =>step.id === "independence") &&
                        <section ref={sectionsRefs.independence}>
                            <p>Please determine whether the following statement is true or false:</p>
                            <p>
                                If I rank some prize very <b>low</b>, I may earn <b>less</b> than its money worth, shown in the table above. If I rank some prize very <b>high</b>, I may earn <b>more</b> than its money worth.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                            <p>
                                <div className="radio">
                                    <input type="radio" name="independence" value={0} id="independence-0" onChange={(e)=>{questionsRefs.independence.value.current = e.target.value}} />
                                    <label htmlFor="independence-0">True</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="independence" value={1} id="independence-1" onChange={(e)=>{questionsRefs.independence.value.current = e.target.value}} />
                                    <label htmlFor="independence-1">False</label>
                                </div>
                            </p>
                            {
                                activeSteps.at(-1).id === "independence" &&
                                    <Button className="btn-primary" onClick={onClick} text={buttonRole === "submit" ? "Submit":"Proceed"}/>
                            }
                            <div class="incorrect-msg hidden" ref={questionsRefs.independence.incorrect}>
                                <p>Incorrect answer. Please try again.</p>
                            </div>
                            <div class="correct-msg hidden" ref={questionsRefs.independence.correct}>
                                <p>
                                    Correct! Your own ranking cannot affect the money worth of prizes shown in your table, which are determined beforehand.
                                </p>
                            </div>
                            <div class="correct-first-msg hidden" ref={questionsRefs.independence.correctFirstAttempt}>
                                <p>
                                    Correct! Your own ranking cannot affect the money worth of prizes shown in your table, which are determined beforehand.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </p>
                            </div>
                        </section>
                    }
                    { activeSteps.some(step=>step.id === "value_table") &&
                        <section ref={sectionsRefs.value_table}>
                            <p>Please determine whether the following statement is true or false:</p>
                             <p>
                                Every participant, including me and the computerized participants, has the same earnings table.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                            <p>
                                <div className="radio">
                                    <input type="radio" name="value_table" value={0} id="value_table-0" onChange={(e)=>{questionsRefs.value_table.value.current = e.target.value}} />
                                    <label htmlFor="value_table-0">True</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="value_table" value={1} id="value_table-1" onChange={(e)=>{questionsRefs.value_table.value.current = e.target.value}} />
                                    <label htmlFor="value_table-1">False</label>
                                </div>
                            </p>
                            {
                                activeSteps.at(-1).id === "value_table" &&
                                    <Button className="btn-primary" onClick={onClick} text={buttonRole === "submit" ? "Submit":"Proceed"}/>
                            }
                            <div class="incorrect-msg hidden" ref={questionsRefs.value_table.incorrect}>
                                <p>Incorrect answer. Please try again.</p>
                            </div>
                            <div class="correct-msg hidden" ref={questionsRefs.value_table.correct}>
                                <p>Correct! Each prize might be worth a different amount for each participant.</p>
                            </div>
                            <div class="correct-first-msg hidden" ref={questionsRefs.value_table.correctFirstAttempt}>
                                <p>Correct! Each prize might be worth a different amount for each participant.<br/>
                                Good job on the first try! This will count for your Understanding Bonus.</p>
                            </div>
                        </section>
                    }
                    { activeSteps.some(step=>step.id === "prize_priorities") &&
                        <section ref={sectionsRefs.prize_priorities}>
                            <p>The <b>prize priorities</b> for you and for the other participants are:</p>
                            <p>
                                <table id="priorities-table">
                                <thead>
                                    <tr>
                                        <th>Prize</th>
                                        {props.prizes.map((prize) => <th>{prize}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    { props.participants.map((participant,participantIndex)=>{
                                                {
                                                    /* 
                                                    render each line in prize priorities table . 
                                                    the first column describes the priority in the row.
                                                    each other column represents prize and includes the priority of the participant for that prize.
                                                    so that first row includes the prizes first priority for each prize.
                                                    prize priorities is an object in which the keys are the participants and the values are the participants ordered by their priority where first item has highest priority.
                                                    the number of rows is dynamic and it is max 5 .
                                                    looks like : {
                                                    "A" : ["Shirley","John","David"],
                                                    "B" : ["David","Shirley","John"],
                                                    "C" : ["John","David","Shirley"],
                                                    "D" : ["Shirley","John","David"]
                                                    } 
                                                    table should look like : 
                                                    |   | A | B | C | D |
                                                    | 1st priority (highest) | Shirley | David | John | Shirley |
                                                    | 2nd priority | John | Shirley | David | John |
                                                    | 3rd priority (lowest)  | David | John | Shirley | David |
                                                     */
                                                     function getRowDescription(index,numberOfRows){
                                                        let description = "";
                                                        if(index === 0){
                                                            description = "1st priority (highest)";
                                                        }
                                                        else if(index === 1){
                                                            description = "2nd priority";
                                                        }
                                                        else if (index === 2){
                                                            description = "3rd priority";
                                                        }
                                                        else if (index === 3){
                                                            description = "4th priority";
                                                        }
                                                        else if (index === 4){
                                                            description = "5th priority";
                                                        }
                                                        if (index === numberOfRows - 1){
                                                            description += " (lowest)";
                                                        }
                                                        return description;
                                                     }
                                                     return (
                                                        <tr>
                                                            <td>{getRowDescription(participantIndex,props.participants.length)}</td>
                                                            {props.prizes.map((prize,prizeIndex)=>{
                                                                return (
                                                                    <td>{props.prizesPriorities[prize][participantIndex]}</td>
                                                                )
                                                            })}
                                                        </tr>
                                                     )
                                                }
                                    })}
                                </tbody>
                            </table>
                            </p>
                            {
                                activeSteps.at(-1).id === "prize_priorities" &&
                                    <Button className="btn-primary" onClick={onClick} text={buttonRole === "submit" ? "Submit":"Proceed"}/>
                            }
                        </section>
                    }
                    { activeSteps.some(step=>step.id === "self_rank_independence") &&
                        <section ref={sectionsRefs.self_rank_independence}>
                            <p>Please determine whether the following statement is true or false:</p>
                            <p>
                                If I place a prize very <b>low</b> in my ranking, then my priority for getting that prize might <b>decrease</b>. If I place a prize very <b>high</b> in my ranking, then my priority for getting that prize might <b>increase</b>.<br/>
                                (Get it right on first try to increase your bonus)
                            </p>
                            <p>
                                <div className="radio">
                                    <input type="radio" name="self_rank_independence" value={0} id="self_rank_independence-0" onChange={(e)=>{questionsRefs.self_rank_independence.value.current = e.target.value}} />
                                    <label htmlFor="self_rank_independence-0">True</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="self_rank_independence" value={1} id="self_rank_independence-1" onChange={(e)=>{questionsRefs.self_rank_independence.value.current = e.target.value}} />
                                    <label htmlFor="self_rank_independence-1">False</label>
                                </div>
                            </p>
                            { activeSteps.at(-1).id === "self_rank_independence" &&
                                <Button className="btn-primary" onClick={onClick} text={buttonRole === "submit" ? "Submit":"Proceed"}/>
                            }
                            <div class="incorrect-msg hidden" ref={questionsRefs.self_rank_independence.incorrect}>
                                <p>Incorrect answer. Please try again.</p>
                            </div>
                            <div class="correct-msg hidden" ref={questionsRefs.self_rank_independence.correct}>
                                <p>Correct! Your own ranking cannot affect the prize priorities. Instead, they are determined beforehand.</p>
                            </div>
                            <div class="correct-first-msg hidden" ref={questionsRefs.self_rank_independence.correctFirstAttempt}>
                                <p>Correct! Your own ranking cannot affect the prize priorities. Instead, they are determined beforehand.<br/>
                                Good job on the first try! This will count for your Understanding Bonus.</p>
                            </div>
                        </section>    
                    }
                    { activeSteps.some(step=>step.id === "ranking_form") &&
                        <section ref={sectionsRefs.ranking_form}>
                            <h4>Step 2: Submit Your Ranking</h4>
                            <button className="button-2" id="GenBtn3" type="button" onClick={()=>{setRankingModal(true)}}>Click for a reminder on what this ranking means</button><br/>
                            <p>Please rank the four prizes in an order of your choice.</p>
                            <RankingForm refs={rankingFormRefs}/>
                            <div class="btn-container">
                                <Button 
                                    type="button"
                                    className="btn btn-danger btn-container"
                                    onClick={onClick}
                                    text={buttonRole === "submit" ? "Submit":"Proceed"}
                                >
                                    Submit ranking
                                </Button><br/>
                            </div>
                            <div className="incorrect-msg hidden" ref={rankingFormRefs.error_message}>
                                <p>You submitted an invalid ranking. Please resubmit.</p>
                            </div>
                        </section>
                    }
                    { activeSteps.some(step=>step.id === "allocation_results") &&
                        <section ref={sectionsRefs.allocation_results}>
                            <h4>Step 3: Allocation Process</h4>
                                { allocationLoader && 
                                    <div id="load">
                                        <p>
                                            Allocation process working… <i class="fa-regular fa-hourglass-half fa-spin"></i>
                                        </p>
                                    </div>
                                }
                                { props.roundNumber === 1 &&
                                    <div class="explain">
                                        <p>
                                            Remember:
                                        </p>
                                        <p>
                                            The allocation process tries to give each participant a prize that they ranked higher rather than a prize that they ranked lower,
                                            while taking into account the rankings of all participants.
                                        </p>
                                        <p>
                                            The prize priorities can affect the allocation of prizes. <br/>
                                            The higher your priority is at some prize, the more likely you are to get that prize at the end of the process.
                                        </p>
                                    </div>
                                }
                                <div id="round-results" />
                        </section>
                    }
                </div>
            )
        }   
        function RankingModal(props){
            return (
                <div className="modal" id="GenModal3" onClick={props.onClose}>
                    <div className="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                        <span className="close3">&times;</span>
                        <p>In Step 2, you are asked to <b>rank the four prizes</b> in an order of your choice.</p>
                        <p>The computerized participants simultaneously submit their own rankings. They <b>do not know</b> your own ranking.</p>
                        <p>Their rankings are aimed at getting them their high-earning prizes. Your own ranking <b>cannot affect the computerized participants’ rankings</b>.</p>
                    </div>
                </div>
                )
        }                    
        function RankingForm(props){
            const [inputValue,setInputValue] = React.useState("");
            function removeEnDash(str) {
                return str.replace(/–/g, '');
            }
    
            function addEnDash(str) {
                /* add en dash between each character */
                return str.split('').join('–');
            }
    
            function validateInput(str) {
                /*
                validate that input is max 4 characters long
                 */
                const isLengthValid = str.length <= 4;
                if (!isLengthValid) return false;
                /*
                validate that characters are either A | B | C | D . Non case sensitive.
                */
                const containsOnlyValidChars = /^[a-dA-D]*$/.test(str);
                if (!containsOnlyValidChars) return false;
                /*
                validate that each character is unique
                 */
                const containsOnlyUniqueChars = str.length === new Set(str).size;
                if (!containsOnlyUniqueChars) return false;
                return true;
            }
    
            function replaceCharWithNumericValue(str) {
                if (str === 'A') return 1;
                if (str === 'B') return 2;
                if (str === 'C') return 3;
                if (str === 'D') return 4;
                return undefined
            }
            function onInput(e){
                const uppercasedCleanedInput = removeEnDash(e.target.value).toUpperCase();
                const isValid = validateInput(uppercasedCleanedInput);
                if (isValid === false)return;
                setInputValue(addEnDash(uppercasedCleanedInput));
                props.refs.first_priority.current = replaceCharWithNumericValue(uppercasedCleanedInput[0]);
                props.refs.second_priority.current = replaceCharWithNumericValue(uppercasedCleanedInput[1]);
                props.refs.third_priority.current = replaceCharWithNumericValue(uppercasedCleanedInput[2]);
                props.refs.fourth_priority.current = replaceCharWithNumericValue(uppercasedCleanedInput[3]);
            }
            return (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input  type="text"
                            style={{flexBasis: '10rem',textAlign: 'center'}}
                            className="form-control fw-bold fs-5 mt-2 mb-3 "
                            value={inputValue}
                            onInput={onInput}
                            ref = {props.refs.input}
                    />
                </div>
            )
        } 
        function Button(props){
            const {onClick,text ,className} = props;
            return (
                <div class="btn-container">
                    <button className={"btn btn-primary "+className} onClick={onClick}>{text ?? "Proceed"}</button>
                </div>
            )
        }
        function PrizesModal(props){
            return (
                    <div class="modal" style={{display:"flex"}} onClick={props.onClose}>
                        <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                            <i class="close1" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</i>
                            <p>In Step 1, you first see the <b>prizes</b> you can get in this round and how much money they are worth to <b>you</b>. In the table, under each prize A, B, C or D, you can see how much money it would add to <b>your</b> earnings if <b>you get it</b>.</p>
                            <p>Each prize might be worth a <b>different</b> amount of money for each participant, and each participant can only see the money amounts relevant to <b>themselves</b>. However, the prizes that earn you a large amount of money are also likely to earn the <b>other participants</b> a large amount of money. There is more likely to be <b>competition</b> for the high-earning prizes.</p>
                            <p>The money worth of prizes for you and for the other participants can be different in different rounds of the game, and they were <b>determined beforehand</b>. You and the other participants <b>cannot affect the money worth of prizes</b>.</p>
                        </div>
                    </div>
            )
        }
        function StudyModal(props){
            return (
                <div class="modal" style={{display:'flex'}} onClick={props.onClose} >
                    <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                        <i class="close1" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</i>
                        <p>
                        In this study, you and three computerized participants, Ruth, Shirley, and Theresa, are going to play a game for four prizes.<br/>
                        Each prize is worth money, but might be worth a different amount of money for each participant.
                        </p>
                        <p>
                        You and the computerized participants will each rank the four prizes in any order you wish.<br/>
                        Then, an <b>allocation process</b> will use these rankings to allocate the prizes—one prize for each participant.
                        </p>
                        <p>The allocation process tries to give each participant a prize that they ranked higher rather than a prize that they ranked lower, while taking into account the rankings of all participants.</p>
                    </div>
                </div>
            )
        }
        function getMoneyString(amount, currency) {
            if (amount < 1) {
                const cents = Math.round(amount * 100,2);
                if (currency === "USD") {
                    return cents + "¢";
                }
                if (currency === "GBP") {
                    return cents + "p";
                }
            }
            if (amount >= 1) {
                if (currency === "USD") {
                    return "$" + amount;
                }
                if (currency === "GBP") {
                    return "£" + amount;
                }
            }
        }
    `
    const roundNumber = js_vars.roundNumber;
    const stepsInRound = stepsDividedToRounds[roundNumber - 1];
    const initialStepId = step || (js_vars.stepId ?? stepsInRound[0]);
    const initialStep = steps.find(step => step.id === initialStepId);
    const props = {initialStep, stepsInRound, roundNumber, ...js_vars};
    renderReactComponent(jsxCode, "content", "NullTrainingPage", JSON.stringify(props))
}

function renderAllocationResults(prizeName,prizeValue){
    const jsxCode = `
    function Stam(){
        return <div></div>  
    }
    function getMoneyString(amount, currency) {
            if (amount < 1) {
                const cents = Math.round(amount * 100,2);
                if (currency === "USD") {
                    return cents + "¢";
                }
                if (currency === "GBP") {
                    return cents + "p";
                }
            }
            if (amount >= 1) {
                if (currency === "USD") {
                    return "$" + amount;
                }
                if (currency === "GBP") {
                    return "£" + amount;
                }
            }
    }
    function AllocationResults(props){
        return (
             <p>
                <b>You get Prize <span id="prize-won">{props.prizeName}</span></b>.<br/>
                If this were a real round, your total earning would increase by <span id="points-won">{getMoneyString(props.prizeValue)}</span>.<br/>
                { props.roundNumber === 1 &&
                    Since this is a training round, the questions you answer correctly on the first attempt count for your Understanding Bonus.
                }
                { props.roundNumber !== 1 &&
                    Since this is a training round, it will count for your Understanding Bonus.
                }
            </p>
        )
    }
    `
    const props = {prizeName,prizeValue,...js_vars};
    renderReactComponent(jsxCode, "round-results", "AllocationResults", JSON.stringify(props))
}
function liveRecv(data){
    console.log(data)
    if (data["information_type"] === "allocation_results"){
        renderAllocationResults(data["prize_name"],data["prize_value"])
    }
}