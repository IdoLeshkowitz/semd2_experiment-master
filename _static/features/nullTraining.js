const steps = [
    {id: "intro", type: "instructions", expectedAnswerIndex: 0},
    {id: "prize_table", type: "instructions"},
    {id: "independence", type: "radio", expectedAnswerIndex: 1},
    {id: 'value_table', type: 'radio', expectedAnswerIndex: 1},
    {id: 'prize_priorities', type: 'instructions'},
    {id: 'self_rank_independence', type: 'radio', expectedAnswerIndex: 1},
    {id: 'ranking_form', type: 'rankingForm'},
    {id: 'allocation_results', type: 'allocationResults'},
    {id: 'competitors_rank_independence', type: 'radio', expectedAnswerIndex: 1},
    {id: 'end', type: 'end'},
]
const stepsDividedToRounds = [
    ['intro', 'prize_table', 'independence', 'value_table', 'prize_priorities', 'self_rank_independence', 'ranking_form', 'allocation_results', 'competitors_rank_independence',"end"],
    ['intro', 'prize_table', 'prize_priorities', 'ranking_form', 'allocation_results',"end"],
]
window.addEventListener("load", () => {
    renderUiFromState();
})

function renderUiFromState(step) {
    const jsxCode = `
        function MoreStam(){
            return (<div>MoreStam</div>)
        }
        const CurrencyContext = React.createContext(null);
        function NullTrainingPage(props){
            const {initialStep, stepsInRound,roundNumber,currency} = props;
            const [prizesModal, setPrizesModal] = React.useState(false);
            const [studyModal, setStudyModal] = React.useState(false);
            const [rankingModal, setRankingModal] = React.useState(false);
            const [shownSteps, setShownSteps] = React.useState([initialStep])
            const latestStep = shownSteps.at(-1);
            const [readyToProceed, setReadyToProceed] = React.useState(latestStep.type === "instructions");
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
                independence: {
                    input: React.useRef(null),
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null), 
                },
                value_table: {
                    input: React.useRef(null),
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null),
                },
                self_rank_independence: {
                    input: React.useRef(null),
                    value: React.useRef(null),
                    incorrect: React.useRef(null),
                    correct: React.useRef(null),
                    correctFirstAttempt: React.useRef(null),
                },
                competitors_rank_independence: {
                    input: React.useRef(null),
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
            const [mistakesCounter,setMistakesCounter] = React.useState(props.mistakesCounter);
            React.useEffect(()=>{
                if (shownSteps.length === 1) return ;
                /* when activesteps changes get the ref of latest step and scroll to it */
                const latestStep = shownSteps.at(-1);
                const latestStepRef = sectionsRefs[latestStep.id];
                if (latestStepRef.current === null) return ;
                latestStepRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            },[shownSteps])
            React.useEffect(()=>{
                const currentStepId = shownSteps.at(-1).id;
                const currentStep = steps.find((step) => step.id === currentStepId);
                if (currentStep.type === "end") {
                    document.querySelector("form").submit();
                }
                liveSend({
                    information_type:"set_current_step",
                    step_id : currentStepId
                })
                const currentStepIndex = stepsInRound.findIndex((stepId) => stepId === currentStepId);
                const nextStepId = stepsInRound[currentStepIndex + 1] || "end";
                liveSend({
                    information_type:"set_next_step",
                    step_id : nextStepId
                })
            },[shownSteps])
            React.useEffect(()=>{
                liveSend({
                    information_type:"set_mistakes_counter",
                    mistakes_counter : mistakesCounter
                })
            },[mistakesCounter])
            function onClick(e) {
                e.preventDefault();
                if (readyToProceed) {
                    onNext()
                    return 
                }
                const currentStep = shownSteps.at(-1);
                if (currentStep.type === "radio") {
                    const questionInformation = {
                        is_correct: false,
                        attempt_number: mistakesCounter,
                        understanding_bonus: 0,
                        answer: null,
                        question_id: currentStep.id,
                        expected_answer: null,
                        time : new Date().toUTCString()
                    }
                    const correctAnswer = currentStep.expectedAnswerIndex;
                    const userAnswer = parseInt(questionsRefs[currentStep.id]?.value.current);
                    questionInformation.expected_answer = correctAnswer;
                    questionInformation.answer = userAnswer;
                    /* hide all messages */
                    [questionsRefs[currentStep.id].incorrect.current, questionsRefs[currentStep.id].correct.current, questionsRefs[currentStep.id].correctFirstAttempt.current].forEach((ref) => {
                        ref?.classList.add("hidden");
                    })
                    if (correctAnswer === userAnswer) {
                        questionInformation.is_correct = true;
                        if (mistakesCounter === 0) {
                            const correctFirstAttempt = questionsRefs[currentStep.id].correctFirstAttempt.current;
                            correctFirstAttempt?.classList.remove("hidden");
                            questionInformation.understanding_bonus = 1;
                        }else{
                            /* show correct message*/
                            const correct = questionsRefs[currentStep.id].correct.current;
                            if (correct === null) return ;
                            correct.classList.remove("hidden");
                        }
                        /* disable inputs */
                        const parentElement = questionsRefs[currentStep.id].input.current;
                        const inputs = parentElement?.querySelectorAll("input");
                        inputs?.forEach((input) => {
                            input.disabled = true;
                        })
                        setMistakesCounter(0);
                        liveSend({
                            "information_type" :"set_current_step",
                            "step_id" : "",
                        })
                        setReadyToProceed(true);
                    }
                    else {
                        setMistakesCounter(mistakesCounter + 1);
                        /* show incorrect message*/
                        const incorrect = questionsRefs[currentStep.id].incorrect.current;
                        incorrect?.classList.remove("hidden");
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
                    onNext(e);
                    const participantsPriorities = {
                        "You":[firstPriority, secondPriority, thirdPriority, fourthPriority],
                        ...props.participantsPriorities
                    }
                    liveSend({
                        information_type: "ranking_form_submission",
                        participants_priorities: participantsPriorities,
                        prizes_priorities: props.prizesPriorities,
                    })
                }
           }
            function onNext(){
                const currentStep = shownSteps.at(-1);
                const stepIndex = stepsInRound.findIndex((possibleStep) => possibleStep === currentStep.id);
                const stepToBeStarted = steps.find((step) => step.id === stepsInRound[stepIndex + 1])
                if (stepToBeStarted.type === "radio") {
                    setReadyToProceed(false)
                }
                if (stepToBeStarted.type === "instructions") {
                    setReadyToProceed(true)
                }
                if (stepToBeStarted.type === "rankingForm") {
                    setReadyToProceed(false)
                }
                if (stepToBeStarted.type === "allocationResults") {
                    setReadyToProceed(true)
                }
                if (stepToBeStarted.type === "end") {
                    document.querySelector("form").submit();
                }
                setShownSteps([...shownSteps, stepToBeStarted]);
            }
            return (
                <CurrencyContext.Provider value={currency}>
                    <div>
                        {rankingModal && <RankingModal onClose={()=>{setRankingModal(false)}}/>}
                        {studyModal && <StudyModal onClose={()=>{setStudyModal(false)}}/>}
                        { shownSteps.some(step => step.id === "intro") &&
                            <>
                                 <button class="button-2" type="button" onClick={()=>{setStudyModal(true)}}>Click for a general reminder on this study</button> 
                                 <section ref={sectionsRefs.intro} className="explain">
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
                                        shownSteps.at(-1).id === "intro" && 
                                            <Button 
                                                onClick={onClick} 
                                                text="Proceed"
                                                className="btn-primary"
                                            />
                                    }
                                </section>
                           </> 
                        }
                        { shownSteps.some(step => step.id === "prize_table") &&
                            <section ref={sectionsRefs.prize_table}>
                                <h4>Step 1: Round Information</h4>
                                <p>In this round, your <b>prizes</b> are:</p>
                            
                                <PrizesTable prizesValues={props.prizesValues}/>
                                <br/>
                                <button class="button-2" id="GenBtn1" onClick={()=>{setPrizesModal(true)}} type="button">Click for a reminder on what the prizes mean</button><br/>
                                {prizesModal === true && <PrizesModal onClose={()=>{setPrizesModal(false)}}/>}
                                {
                                    shownSteps.at(-1).id === "prize_table" &&
                                        <Button
                                            onClick={onClick}
                                            text="Proceed"
                                            className="btn-primary"
                                        />
                                }
                            </section>
                        }
                        { shownSteps.some(step =>step.id === "independence") &&
                            <section ref={sectionsRefs.independence}>
                                <p>Please determine whether the following statement is true or false:</p>
                                <p>
                                    If I rank some prize very <b>low</b>, I may earn <b>less</b> than its money worth, shown in the table above. If I rank some prize very <b>high</b>, I may earn <b>more</b> than its money worth.<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                                <p ref={questionsRefs.independence.input}>
                                    <div className="radio">
                                        <input type="radio" name="independence" value={0} id="independence-0" onChange={(e)=>{questionsRefs.independence.value.current = e.target.value}} />
                                        <label htmlFor="independence-0">True</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="independence" value={1} id="independence-1" onChange={(e)=>{questionsRefs.independence.value.current = e.target.value}} />
                                        <label htmlFor="independence-1">False</label>
                                    </div>
                                </p>
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
                                {
                                    shownSteps.at(-1).id === "independence" &&
                                        <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                            </section>
                        }
                        { shownSteps.some(step=>step.id === "value_table") &&
                            <section ref={sectionsRefs.value_table}>
                                <p>Please determine whether the following statement is true or false:</p>
                                 <p>
                                    Every participant, including me and the computerized participants, has the same earnings table.<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                                <p ref={questionsRefs.value_table.input}>
                                    <div className="radio">
                                        <input type="radio" name="value_table" value={0} id="value_table-0" onChange={(e)=>{questionsRefs.value_table.value.current = e.target.value}} />
                                        <label htmlFor="value_table-0">True</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="value_table" value={1} id="value_table-1" onChange={(e)=>{questionsRefs.value_table.value.current = e.target.value}} />
                                        <label htmlFor="value_table-1">False</label>
                                    </div>
                                </p>
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
                                {
                                    shownSteps.at(-1).id === "value_table" &&
                                        <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                            </section>
                        }
                        { shownSteps.some(step=>step.id === "prize_priorities") &&
                            <section ref={sectionsRefs.prize_priorities}>
                                <p>The <b>prize priorities</b> for you and for the other participants are:</p>
                                <p>
                                    <PrizesPrioritiesTable prizesPriorities={props.prizesPriorities}/>
                                </p>
                                {
                                    shownSteps.at(-1).id === "prize_priorities" &&
                                        <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                            </section>
                        }
                        { shownSteps.some(step=>step.id === "self_rank_independence") &&
                            <section ref={sectionsRefs.self_rank_independence}>
                                <p>Please determine whether the following statement is true or false:</p>
                                <p>
                                    If I place a prize very <b>low</b> in my ranking, then my priority for getting that prize might <b>decrease</b>. If I place a prize very <b>high</b> in my ranking, then my priority for getting that prize might <b>increase</b>.<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                                <p ref={questionsRefs.self_rank_independence.input}>
                                    <div className="radio">
                                        <input type="radio" name="self_rank_independence" value={0} id="self_rank_independence-0" onChange={(e)=>{questionsRefs.self_rank_independence.value.current = e.target.value}} />
                                        <label htmlFor="self_rank_independence-0">True</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="self_rank_independence" value={1} id="self_rank_independence-1" onChange={(e)=>{questionsRefs.self_rank_independence.value.current = e.target.value}} />
                                        <label htmlFor="self_rank_independence-1">False</label>
                                    </div>
                                </p>
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
                                { shownSteps.at(-1).id === "self_rank_independence" &&
                                    <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                            </section>    
                        }
                        { shownSteps.some(step=>step.id === "ranking_form") &&
                            <section ref={sectionsRefs.ranking_form}>
                                <h4>Step 2: Submit Your Ranking</h4>
                                <button className="button-2" id="GenBtn3" type="button" onClick={()=>{setRankingModal(true)}}>Click for a reminder on what this ranking means</button><br/>
                                <p>Please rank the four prizes in an order of your choice.</p>
                                <RankingForm refs={rankingFormRefs}/>
                                { shownSteps.at(-1).id === "ranking_form" &&
                                    <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                                <div className="incorrect-msg hidden" ref={rankingFormRefs.error_message}>
                                    <p>You submitted an invalid ranking. Please resubmit.</p>
                                </div>
                            </section>
                        }
                        { shownSteps.some(step=>step.id === "allocation_results") &&
                            <section ref={sectionsRefs.allocation_results}>
                                <h4>Step 3: Allocation Process</h4>
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
                                        <div  id="round-results" onClick={onClick}>
                                            <p>
                                                Allocation process working… <i class="fa-regular fa-hourglass-half fa-spin"></i>
                                            </p>
                                        </div> 
                            </section>
                        }
                        { shownSteps.some(step=>step.id === "competitors_rank_independence") &&
                            <section ref={sectionsRefs.competitors_rank_independence}>
                                <p>Please determine whether the following statement is true or false:</p>
                                <p>
                                    I just submitted some ranking and got some prize. It is possible that if I had submitted a different ranking, my ranking would have <b>affected the other participants’ rankings</b> such that I would have gotten a different prize.<br/>
                                    (Get it right on first try to increase your bonus)
                                </p>
                                <p ref={questionsRefs.competitors_rank_independence.input}>
                                    <div className="radio">
                                        <input type="radio" name="competitors_rank_independence" value={0} id="competitors_rank_independence-0" onChange={(e)=>{questionsRefs.competitors_rank_independence.value.current = e.target.value}} />
                                        <label htmlFor="competitors_rank_independence-0">True</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="competitors_rank_independence" value={1} id="competitors_rank_independence-1" onChange={(e)=>{questionsRefs.competitors_rank_independence.value.current = e.target.value}} />
                                        <label htmlFor="competitors_rank_independence-1">False</label>
                                    </div>
                                </p>
                                <div class="incorrect-msg hidden" ref={questionsRefs.competitors_rank_independence.incorrect}>
                                    <p>Incorrect answer. Please try again.</p>
                                </div>
                                <div class="correct-msg hidden" ref={questionsRefs.competitors_rank_independence.correct}>
                                     <p>Correct! Your own ranking cannot affect the other participants' rankings.</p>
                                </div>
                                <div class="correct-first-msg hidden" ref={questionsRefs.competitors_rank_independence.correctFirstAttempt}>
                                    <p>Correct! Your own ranking cannot affect the other participants' rankings.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.</p>
                                </div>                                 
                                { shownSteps.at(-1).id === "competitors_rank_independence" &&
                                    <Button className="btn-primary" onClick={onClick} text={readyToProceed ? "Proceed" : "Submit"}/>
                                }
                           </section> 
                        }
                    </div>
                </CurrencyContext.Provider>
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
        function RankingModal(props){
            return (
                <div className="modal" id="GenModal3" style={{display:'flex'}} onClick={props.onClose}>
                    <div className="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                        <span className="close3" style={{cursor:'pointer'}} onClick={props.onClose}>&times;</span>
                        <p>In Step 2, you are asked to <b>rank the four prizes</b> in an order of your choice.</p>
                        <p>The computerized participants simultaneously submit their own rankings. They <b>do not know</b> your own ranking.</p>
                        <p>Their rankings are aimed at getting them their high-earning prizes. Your own ranking <b>cannot affect the computerized participants’ rankings</b>.</p>
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
        function PrizesTable(props){
            const {prizesValues} = props; 
            const prizesNames = Object.keys(prizesValues);
            const currency = React.useContext(CurrencyContext);
            return ( 
                <table id="prize-table">
                    <thead>
                        <tr>
                            <th>Prize</th>
                            {prizesNames.map((prize) => <th>{prize}</th>)}
                        </tr>
                        <tr>
                        <td>Money worth</td>
                           {prizesNames.map((prize)=>{
                               return <td>{getMoneyString(prizesValues[prize],currency)}</td>
                           })}
                        </tr>
                    </thead>
                </table>
               )    
        }
        function PrizesPrioritiesTable(props){
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
            const {prizesPriorities} = props;
            const prizes = Object.keys(prizesPriorities);
            const numberOfRows = 4;
            return (
                 <table id="priorities-table">
                    <thead>
                        <tr>
                            <th>Prize</th>
                            {prizes.map((prize) => <th>{prize}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            Array(numberOfRows).fill(0).map((_,index)=>{
                                return (
                                    <tr key={index}> 
                                        {/* description cell */}
                                        <td>{getRowDescription(index,numberOfRows)}</td>
                                        {/* priorities cells */}
                                        {prizes.map((prize)=>{
                                            return <td>{prizesPriorities[prize][index]}</td>
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    `

    function getInitialStepId(currentStepId, nextStepId) {
        /* if there is current step return it */
        if (currentStepId) {
            return currentStepId;
        }
        /* else if there is next step return it */
        else if (nextStepId) {
            return nextStepId;
        }
        /* else return the first step in the round */
        else {
            return stepsIdsInRound[0];
        }
    }

    const roundNumber = js_vars.roundNumber;
    const stepsIdsInRound = stepsDividedToRounds[roundNumber - 1];
    const initialStepId = getInitialStepId(js_vars.currentStepId, js_vars.nextStepId);
    const initialStep = steps.find((step) => step.id === initialStepId);
    const props = {initialStep, stepsInRound: stepsIdsInRound, roundNumber, ...js_vars};
    renderReactComponent(jsxCode, "content", "NullTrainingPage", JSON.stringify(props))
}

function renderAllocationResults(prizeName, prizeValue) {
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
    const moneyString = getMoneyString(props.prizeValue, props.currency);
    const buttonRef = React.useRef(null);
        return (
        <>
             <p>
                <b>You get Prize <span id="prize-won">{props.prizeName}</span></b>.<br/>
                If this were a real round, your total earning would increase by <span id="points-won">{moneyString}</span>.<br/>
                { props.roundNumber === 1 &&
                    <span>Since this is a training round, the questions you answer correctly on the first attempt count for your Understanding Bonus.</span>
                }
                { props.roundNumber !== 1 &&
                   <span> Since this is a training round, it will count for your Understanding Bonus.</span>
                }
            </p>
            <div className="btn-container">
                <button class="btn btn-primary" type="button" onClick={()=>{buttonRef.current.classList.add("hidden")}} ref={buttonRef}>Proceed</button>
            </div>
        </>
        )
    }
    `
    const props = {prizeName, prizeValue, ...js_vars};
    renderReactComponent(jsxCode, "round-results", "AllocationResults", JSON.stringify(props))
}

function liveRecv(data) {
    if (data["information_type"] === "allocation_results") {
        renderAllocationResults(data["prize_name"], data["prize_value"])
    }
}