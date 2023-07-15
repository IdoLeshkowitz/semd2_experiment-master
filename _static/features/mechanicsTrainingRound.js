function renderPage() {
    const jsxCode = `
    const CurrencyContext = React.createContext(null);
    const SendNextStepIdContext = React.createContext(null);
    const MistakesCounterContext = React.createContext(null);
    const OnProceedContext = React.createContext(null);
    function MechanicsTrainingRound(props){
        const [modals,setModals]= React.useState({prizes:false,ranking:false,study:false,priorities:false});
        const [ranking,setRanking] = React.useState(null);
        const [activeStepsIds,setActiveStepsIds] = React.useState(props.activeStepId ? [props.activeStepId] : [props.steps[0]]);
        const mechanicsSteps = [
                {
                    id:"intro",
                    type : "information",
                    content :(
                            <div class="explain">
                                <p>
                                This is a training round.<br/>
                                Everything is <b>the same</b> as in the real rounds you will play later on, except that you will <b>not</b> earn the money worth of the prize you will get. Instead, we will ask you questions which can count for your <b>Understanding Bonus</b> at the end of the study.
                                </p>
                                <p>
                                Remember: each question increases your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                </p>
                            </div> 
                    ),
                    sectionRef : React.createRef(null),
                },
                {
                  id:"prizes_table",
                  type:"information",
                  content:(
                    <>
                        <h4>Step 1: Round Information</h4>
                        <p>In this round, the <b>prizes</b> are:</p>
                        <EmptyPrizesTable prizes={props.prizes}/>
                        <button type="button" className="button-2" onClick={()=>{setModals({...modals,prizes:true})}}  style={{marginTop:'1rem',marginBottom:'1rem'}}>Click for a reminder on what the prizes mean</button>
                    </>    
                  ),
                  sectionRef:React.createRef(null),
                },
                {
                    id:"prizes-priorities",
                    type:"information",
                    sectionRef:React.createRef(null),
                    content:(
                        <>
                            <p>The <b>prize priorities</b> for you and for the other participants are:</p>
                            <PrizesPrioritiesTable prizesPriorities={props.prizesPriorities}/>
                            <button type="button" className="button-2" type="button" onClick={()=>setModals({...modals,priorities:true})}>Click for a reminder on what the priorities mean</button>
                        </>
                    )
                },
                {
                    id:"ranking_form",
                    type:"rankingForm",
                    sectionRef:React.createRef(null),
                    inputRef:React.createRef(null),
                    buttonRef:React.createRef(null),
                },
                {
                    id:"allocation_results",
                    type:"allocationResults",
                    sectionRef:React.createRef(null),
                },
            ]
        const propertiesSteps = (variant,roundNumber) =>{ 
            const output = [
                {
                    id:"intro",
                    type : "information",
                    content :(
                            <div class="explain">
                                <p>
                                This is a training round.<br/>
                                Everything is <b>the same</b> as in the real rounds you will play later on, except that you will <b>not</b> earn the money worth of the prize you will get. Instead, we will ask you questions which can count for your <b>Understanding Bonus</b> at the end of the study.
                                </p>
                                <p>
                                Remember: each question increases your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                </p>
                            </div> 
                    ),
                    sectionRef : React.createRef(null),
                },
                {
                  id:"prizes_table",
                  type:"information",
                  content:(
                    <>
                        <h4>Step 1: Round Information</h4>
                        <p>In this round, the <b>prizes</b> are:</p>
                        <EmptyPrizesTable prizes={props.prizes}/>
                        <button type="button" className="button-2" onClick={()=>{setModals({...modals,prizes:true})}}  style={{marginTop:'1rem',marginBottom:'1rem'}}>Click for a reminder on what the prizes mean</button>
                    </>    
                  ),
                  sectionRef:React.createRef(null),
                },
                {
                    id:"prizes-priorities",
                    type:"information",
                    sectionRef:React.createRef(null),
                    content:(
                        <>
                            <p>The <b>prize priorities</b> for you and for the other participants are:</p>
                            <PrizesPrioritiesTable prizesPriorities={props.prizesPriorities}/>
                            <button type="button" className="button-2" type="button" onClick={()=>setModals({...modals,priorities:true})}>Click for a reminder on what the priorities mean</button>
                        </>
                    )
                },
                {
                    id:"ranking_form",
                    type:"rankingForm",
                    sectionRef:React.createRef(null),
                    inputRef:React.createRef(null),
                    buttonRef:React.createRef(null),
                },
                {
                    id:"allocation_results",
                    type:"allocationResults",
                    sectionRef:React.createRef(null),
                },
            ]
                if(variant === "menu"){
                    output.push(
                        {
                            id: "questions_intro",
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of the game and about this round’s outcome. 
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                    <p>
                                        Please determine whether the following statements are true or false:
                                    </p>
                                </div>
                            ),
                            type : "information",
                            sectionRef : React.createRef(null),
                        },
                        {
                            type : "component",
                            id : "general_property",
                            content : (
                                <>
                                    <div className="question">
                                        Imagine the computer determined some prize priorities and rankings of the other, computerized participants.<br/>
                                        The computer determines the Obtainable Prizes, which <b>I cannot affect with my own ranking.</b> I always get the Obtainable Prize that is placed highest in the ranking I submitted.<br/> 
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question 
                                        type ="dropdown"
                                        id="general_property"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div> 
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                Correct! In the allocation process, the computer determines some group of Obtainable Prizes that you might receive, using <b>only the other participants’ rankings and the prize priorities.</b> Then, no ranking would get you a non-Obtainable Prize, and among the Obtainable Prizes, you get the one that you ranked highest.
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! In the allocation process, the computer determines some group of Obtainable Prizes that you might receive, using <b>only the other participants’ rankings and the prize priorities.</b> Then, no ranking would get you a non-Obtainable Prize, and among the Obtainable Prizes, you get the one that you ranked highest.<br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }  
                                    />
                                </>
                           ),
                            sectionRef : React.createRef(null), 
                            options : ["True","False"],
                            expectedAnswerIndex : 0,
                            incorrectMsg : (
                                <div className="incorrect-msg">
                                    Incorrect answer. Please try again.
                                </div>
                            ),
                            correctMsg : (
                                <div className="correct-msg">
                                    Correct! In the allocation process, the computer determines some group of Obtainable Prizes that you might receive, using <b>only the other participants’ rankings and the prize priorities.</b> Then, no ranking would get you a non-Obtainable Prize, and among the Obtainable Prizes, you get the one that you ranked highest.
                                </div>
                            ),
                            correctFirstMsg : (
                                <div className="correct-msg">
                                    Correct! In the allocation process, the computer determines some group of Obtainable Prizes that you might receive, using <b>only the other participants’ rankings and the prize priorities.</b> Then, no ranking would get you a non-Obtainable Prize, and among the Obtainable Prizes, you get the one that you ranked highest.<br/>
                                    Good job on the first try! This will count for your Understanding Bonus.
                                </div>
                            ),                        
                        },
                        {
                            id: "mechanism_misconception_1",
                            type : "component",
                            content : (
                                <>
                                    <div className="question">
                                        Imagine the computer determined some prize priorities and rankings of the other, computerized participants.<br/>
                                        Submitting some ranking <b>cannot</b> ensure that I will get the <b>highest-rank</b> prize in that ranking, but it <b>does</b> ensure that I will <b>not</b> get the <b>lowest-rank</b> prize in that ranking.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="dropdown"
                                        id="mechanism_misconception_1"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                Correct! The allocation process only ensures that <b>out of the Obtainable Prizes</b> (which you cannot affect with your own ranking), you get the one that you ranked highest. On some occasions, the <b>prize you ranked lowest may be the only Obtainable Prize</b> and hence you would get it.
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! The allocation process only ensures that <b>out of the Obtainable Prizes</b> (which you cannot affect with your own ranking), you get the one that you ranked highest. On some occasions, the <b>prize you ranked lowest may be the only Obtainable Prize</b> and hence you would get it.<br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                        />
                                </>
                            ),
                            sectionRef : React.createRef(null),
                        },
                        {
                            id: "mechanism_misconception_2",
                            type : "component",
                            content : (
                                <>
                                    <div className="question">
                                        Imagine the computer determined some prize priorities and rankings of the other, computerized participants.<br/>
                                        Imagine I have a low priority for getting Prize A, which is the prize I want the most, but I have a high priority for getting Prize B, which I want the second most. Then, submitting a ranking that places Prize A first and Prize B second may lead to missing out on both prizes A and B, while submitting a different ranking could have gotten me Prize B. <br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="dropdown"
                                        id="mechanism_misconception_2"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. This means that both Prize A and Prize B are <b>non-Obtainable</b>. Remember that submitting different, alternative rankings would have no effect on your Obtainable Prizes, and cannot get you neither of these prizes. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your priorities at these prizes.</b>
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. This means that both Prize A and Prize B are <b>non-Obtainable</b>. Remember that submitting different, alternative rankings would have no effect on your Obtainable Prizes, and cannot get you neither of these prizes. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your priorities at these prizes.</b><br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                        />
                                </>
                            ),
                            sectionRef : React.createRef(null)
                        },
                        {
                            id : "different_rank_outcome",
                            type : "component",
                            sectionRef : React.createRef(null),
                            
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            Please answer the following question:          
                                        </p>
                                        <p>
                                            Remember: You submitted the ranking C–B–A–D, and ended up getting Prize A. Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                            Which of the following might be true? (select one answer)<br/>
                                            (Hint: think about what the set of Obtainable Prizes could possibly be.)<br/>
                                            (Get it right on first try to increase your bonus)<br/>
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="different_rank_outcome"
                                            options = {[
                                                <span>It is certain that every possible ranking I could have submitted would have gotten me Prize A.</span>,
                                                <span>There might be some alternative ranking I could have submitted that would have gotten me Prize B.</span>,
                                                <span>There might be some alternative ranking I could have submitted that would have gotten me Prize C.</span>,
                                                <span>There might be some alternative ranking I could have submitted that would have gotten me Prize D.</span>,
                                            ]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    Correct! You always get your highest-ranked Obtainable Prize, in this case, Prize A. If your Obtainable Prizes included Prize C and/or Prize B, which you ranked higher than Prize A, you would have gotten one of them instead. Thus, the Obtainable Prizes can only include Prize A, and possibly Prize D, but <b>do not</b> include Prize C nor Prize B. Your ranking does not affect your Obtainable Prizes, so submitting a different ranking could have only gotten you Prize A or Prize D.
                                                </div> 
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    Correct! You always get your highest-ranked Obtainable Prize, in this case, Prize A. If your Obtainable Prizes included Prize C and/or Prize B, which you ranked higher than Prize A, you would have gotten one of them instead. Thus, the Obtainable Prizes can only include Prize A, and possibly Prize D, but <b>do not</b> include Prize C nor Prize B. Your ranking does not affect your Obtainable Prizes, so submitting a different ranking could have only gotten you Prize A or Prize D.<br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        }
                    )
                }
            return output;
        }
        const steps = props.treatment === "mechanics" ? mechanicsSteps : propertiesSteps(props.variant,props.roundNumber);
        if (props.didComplete){
            onProceed();
        }
        function onProceed(){
            const currentStepId = activeStepsIds.at(-1);
            const currentStep = steps.find(step=>step.id===currentStepId);
            function isLastStep(activeStepsIds,steps){
                const activeStepId = activeStepsIds.at(-1);
                const nextStepIndex = steps.findIndex(step=>step.id===activeStepId)+1;
                return nextStepIndex >= steps.length;
            }
            function getNextStepId(activeStepsIds,steps){
                const activeStepId = activeStepsIds.at(-1);
                const nextStepIndex = steps.findIndex(step=>step.id===activeStepId)+1;
                return steps[nextStepIndex].id;
            }
            function isNextStepInformation(nextStepId,steps){
                const nextStep = steps.find(step=>step.id===nextStepId);
                return nextStep.type === "information";
            }
            /* when button role is next, we want to go to the next step or to finish the page */
            const isLast = isLastStep(activeStepsIds,steps);
            if (isLast){
                /* if last step, submit the form */
                document.querySelector("form").submit();
                return ;
            }
            /* else continue to next step */
            /* update active steps */
            const nextStepId = getNextStepId(activeStepsIds,steps);
            setActiveStepsIds([...activeStepsIds,nextStepId]);
            liveSend({
                "action" : "setActiveStepId",
                "stepId" : nextStepId,
            })
        }
        function sendNextStepId(){
            const currentStepId = activeStepsIds.at(-1);
            const currentStepIndex = steps.findIndex(step=>step.id===currentStepId);
            const nextStepIndex = currentStepIndex+1;
            const nextStepId = steps[nextStepIndex]?.id;
            if (!nextStepId) {
                return liveSend({
                    "action" : "setCompleted",
                })
            } 
            liveSend({
                "action" : "setActiveStepId",
                "stepId" : nextStepId,
            })
        }
        React.useEffect(()=>{
            /* scroll the latest step into view in any step except the first */
            if (activeStepsIds.length === 1)return ;
            const latestStepId = activeStepsIds.at(-1);
            const latestStep = steps.find(step=>step.id===latestStepId);
            latestStep.sectionRef?.current?.scrollIntoView({behavior:"smooth"});
        },[activeStepsIds]) 
        return (
            <OnProceedContext.Provider value={onProceed}>
                <SendNextStepIdContext.Provider value={sendNextStepId}>
                    <MistakesCounterContext.Provider value={props.mistakesCounter ?? null}>
                        <>
                            {modals.prizes && <PrizesModal onClose={()=>{setModals({...modals,prizes:false})}}/>}
                            {modals.ranking && <RankingModal onClose={()=>{setModals({...modals,ranking:false})}}/>}
                            {modals.study && <StudyModal onClose={()=>{setModals({...modals,study:false})}}/>}
                            {modals.priorities && <PrioritiesModal onClose={()=>{setModals({...modals,priorities:false})}}/>}
                            {modals.allocation && <AllocationModal onClose={()=>{setModals({...modals,allocation:false})}} variant = {props.variant}/>}
                                <button type="button" className="button-2" onClick={()=>{setModals({...modals,study:true})}}  style={{marginBottom:'1rem',display:"block"}}>Click for a general reminder on this study</button>
                                <button type="button" className="button-2" onClick={()=>{setModals({...modals,allocation:true})}}  style={{marginBottom:'1rem'}}>Click for a reminder on the technical details of the allocation process</button>
                           
                            <div style={{display:'flex', gap:'1.5rem',flexDirection:'column'}}>
                                {
                                    activeStepsIds.map((stepId,index)=>{
                                        const step = steps.find(step=>step.id===stepId);
                                        if (step.type === "component"){
                                            return <section ref={step.sectionRef}>{step.content}</section>
                                        }
                                        if (step.type === "information"){
                                            return (
                                                <section ref={step.sectionRef}>
                                                    {step.content}
                                                    {index === activeStepsIds.length-1 && <Button onClick={onProceed} text="Proceed" buttonRef={step.buttonRef}/>}
                                                </section>
                                            )
                                        }
                                        if (step.type === "rankingForm"){
                                            const expectedRanking = props.participantsPriorities["You"];
                                            return (
                                                <section ref={step.sectionRef}>
                                                    <h4>Step 2: Submit Your Ranking</h4>
                                                    <button
                                                     className="button-2"
                                                     onClick={()=>{setModals({...modals,ranking:true})}}
                                                     type="button"
                                                        >
                                                        Click for a reminder on what this ranking means
                                                    </button>
                                                    <p class="ms-1">Please rank the four prizes <b>in the fixed, specific order {expectedRanking.join("–")}</b>.</p>
                                                    <RankingForm 
                                                        participantsPriorities={props.participantsPriorities}
                                                        inputRef={step.inputRef}
                                                        onInput={(ranking)=>{
                                                            const expectedRanking = props.participantsPriorities["You"];
                                                            const isCorrect = expectedRanking.every((prize,index)=>prize===ranking[index]);
                                                            if (!isCorrect){
                                                                setRanking(null);
                                                                step.buttonRef.current.disabled = true;
                                                                return 
                                                            }
                                                            setRanking(ranking);
                                                            step.buttonRef.current.disabled = false;
                                                        }}
                                                        onEnter={(ranking)=>{
                                                            const expectedRanking = props.participantsPriorities["You"];
                                                            const isCorrect = expectedRanking.every((prize,index)=>prize===ranking[index]);
                                                            if (!isCorrect){
                                                                setRanking(null);
                                                                step.buttonRef.current.disabled = true;
                                                                return
                                                            }
                                                            setRanking(ranking);
                                                            step.inputRef.current.disabled = true;
                                                            step.buttonRef.current.disabled = false;
                                                            onProceed();
                                                        }}
                                                        />
                                                    { index === activeStepsIds.length-1 && 
                                                        <Button 
                                                            onClick={()=>{
                                                                step.inputRef.current.disabled = true;
                                                                onProceed();
                                                            }}
                                                            className="btn btn-danger"
                                                            buttonRef={step.buttonRef}
                                                            text="Submit Ranking"
                                                            disabled={!ranking}
                                                            />
                                                    }
                                                </section>
                                            )
                                        }
                                        if (step.type === "allocationResults"){
                                            return (
                                                <section ref={step.sectionRef}>
                                                    <AllocationResults onClick={onProceed} treatment={props.treatment} allocatedPrize={props.allocatedPrize}/>
                                                    {index === activeStepsIds.length-1 && <Button onClick={onProceed} text="Proceed" buttonRef={step.buttonRef}/>}
                                                </section>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </>
                    </MistakesCounterContext.Provider>
                </SendNextStepIdContext.Provider>
            </OnProceedContext.Provider>
        )
    }
    function Button(props){
        const {onClick,text ,className} = props;
        return (
            <div class="btn-container">
                <button
                    className={className || "btn btn-primary"}
                    onClick={onClick}
                    type="button"
                    disabled={props.disabled ?? false}
                    ref={props.buttonRef}
                   >
                   {text ?? "Proceed"}
                </button>
            </div>
        )
    }
    function AllocationResults(props){
        return (
             <>
                <h4>Step 3: Allocation Process</h4>
                <div id="round-results">
                { props.treatment === "mechanics" ? 
                    <p>
                        You are going to perform the allocation process by yourself, according to what you learned.<br/>
                        Click on the button below to start.
                    </p>
                    : 
                    <p>
                        <b>You get prize {props.allocatedPrize}</b>
                    </p>
                }
                </div>
            </>
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
    function PrioritiesModal(props){
        return (
            <div class="modal" style={{display:'flex'}} onClick={props.onClose}>
                <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                    <i class="close1" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</i>
                    <p>
                    All four participants have some <b>priority</b> for getting each of the four prizes.
                    These priorities can affect the allocation of prizes.
                    </p>
                    <p>
                    The higher your priority is for getting some prize, the more likely you are to get that prize at the end of the process.
                    </p>
                    <p>Each column shows the priorities of all participants at some prize, written from highest to lowest.</p>
                    <p>The prize priorities can be different in different rounds of the game,
                    and they were <b>determined beforehand</b>. <br/>
                    You and the other participants <b>cannot affect the prize priorities</b>.</p>
                </div>
            </div>
        )
    }
    function EmptyPrizesTable(props){
        const {prizes} = props;
        return ( 
            <table id="prize-table">
                <thead>
                    <tr>
                        <th>Prize</th>
                        {prizes.map((prize) => <th>{prize}</th>)}
                    </tr>
                    <tr>
                        <td>Money worth</td>
                        <td colspan={prizes.length}>- Training round. No earnings from prizes -</td>
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
                 <table id="priorities-table" style={{marginBottom:'1rem'}}>
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
    function RankingForm(props){
        const [inputValue,setInputValue] = React.useState("");
        const [upperCaseInputValue,setUpperCaseInputValue] = React.useState("");
        const firstPriorityRef = React.useRef(null);
        const secondPriorityRef = React.useRef(null);
        const thirdPriorityRef = React.useRef(null);
        const fourthPriorityRef = React.useRef(null);
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
            setUpperCaseInputValue(uppercasedCleanedInput);
            const isValid = validateInput(uppercasedCleanedInput);
            if (isValid === false)return;
            setInputValue(addEnDash(uppercasedCleanedInput));
            props.onInput(uppercasedCleanedInput.split(''));
            firstPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[0]);
            secondPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[1]);
            thirdPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[2]);
            fourthPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[3]);
        }
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <input  type="text"
                        style={{flexBasis: '10rem',textAlign: 'center'}}
                        className="form-control fw-bold fs-5 mt-2 mb-3 "
                        value={inputValue}
                        onInput={onInput}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                e.preventDefault();
                                props.onEnter(upperCaseInputValue.split(''));
                            }
                        }}
                        ref = {props.inputRef}
                />
                <input type="hidden" name="first_priority" id="first_priority" ref={firstPriorityRef} required/>
                <input type="hidden" name="second_priority" id="second_priority" ref={secondPriorityRef} required/>
                <input type="hidden" name="third_priority" id="third_priority" ref={thirdPriorityRef} required/>
                <input type="hidden" name="fourth_priority" id="fourth_priority" ref={fourthPriorityRef} required/>
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
                                <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.<br/>
                                Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                            </p><br/>
                            <h5>Overview of allocation process</h5>
                            <p>
                                The allocation process will use all <b>participants’ rankings</b> and all prize priorities to determine the allocation of prizes to participants. <b>You will get the prize allocated to you.</b>
                            </p><br/>
                            <h5>Details of allocation process</h5>
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
                                Each prize is then <b>allocated</b> to the participant paired to it.
                            </p>
                        </div>
                }
                {
                    props.variant === "menu" &&
                        <div>
                            <p>
                                <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.<br/>
                                Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                            </p><br/>
                            <h5>Overview of allocation process</h5>
                            <p>
                                The allocation process will first use <b>all participants’ rankings except for yours,</b> and all the prize priorities, to determine a set of prizes that you can receive, called the <b>Obtainable Prizes.</b> Then, <b>you will get the prize you ranked highest out of these Obtainable Prizes.</b>
                            </p><br/>
                            <h5>Details of allocation process</h5>
                            <p>
                                The allocation process begins with a multi-step process which <b>does not involve your own submitted ranking, as follows:</b>
                            </p>
                            <ol>
                                <li>
                                    In the first step, each prize is paired to its <b>highest</b>-priority participant, among all participants <b>except for you.</b>
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
                                                <b>Re-pair:</b> all unpaired prizes can only get re-paired to participants that they were not paired with before. Each unpaired prize is re-paired to its <b>highest</b>-priority participant, among the participants it <b>was not yet paired with</b> and <b>except for you.</b>
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
                                Each prize except for the unpaired one is then <b>temporarily allocated</b> to the participant it is paired to.
                            </p>
                            <br/><h6><b>Temporary allocation → Obtainable Prizes</b></h6>
                            <p>
                                    We will now tell you how the <b>Obtainable Prizes</b> are determined from the temporary allocation.
                            </p>
                            <p>
                                In this temporary allocation, no prize was allocated to you. To determine which prize is allocated to you, the computer first determines which prizes you can obtain in principle. These are the <b>Obtainable Prizes.</b>
                            </p>
                            <p>
                                You can obtain two kinds of prizes:
                                <ol>
                                    <li><b>Any prize that your priority of getting is higher</b> than that of the participant it is temporarily allocated to.</li>
                                    <li><b>The prize that was left unpaired in the temporary allocation.</b></li>
                                </ol>
                                You cannot obtain any other prizes.
                            </p>
                            <br/><h6><b>Obtainable Prizes → The prize you get</b></h6>
                            <p>
                                We will now tell you how the prize you get is selected from among the Obtainable Prizes.
                            </p>
                            <p>
                                At the end, among the Obtainable Prizes, you get the one that you ranked the <b>highest.</b>
                            </p>
                        </div>      
                }
            </div>
        </div>
    )
}
    function Question(props){
        const [message, setMessage] = React.useState(null)
        const [readyToProceed, setReadyToProceed] = React.useState(false)
        const [hideSubmitButton, setHideSubmitButton] = React.useState(false)
        const mistakesCounter = React.useRef(React.useContext(MistakesCounterContext) ?? 0);
        const sendNextStepId = React.useContext(SendNextStepIdContext);
        const onProceed = React.useContext(OnProceedContext);
        const inputRef = React.useRef(null);
        function incrementMistakesCounter(){
            liveSend({
                "action" : "addMistake"
            })
            mistakesCounter.current += 1;
        }
        function resetMistakesCounter(){
            liveSend({
                "action" : "resetMistakes"
            })
            mistakesCounter.current = 0;
        }
        function onSubmit(){
            if (readyToProceed){
                onProceed();
                setHideSubmitButton(true);
                return;
            }
            const selectedOption = (() => {
                if (props.type === "radio"){
                    return parseInt(inputRef.current.querySelector('input[type="radio"]:checked').value)
                }
                if (props.type === "dropdown"){
                    return parseInt(inputRef.current.querySelector('select').value)
                }
            })()
            const expectedAnswerIndex = props.expectedAnswerIndex;
            const isCorrect = selectedOption === expectedAnswerIndex;
            const isFirstAttempt = mistakesCounter.current === 0;
            if (isCorrect){
                if (isFirstAttempt){
                    liveSend({
                        "action": "addUnderstandingBonus",
                        "bonus" : 1, 
                    })
                    setMessage("correctFirstMsg")
                }
                else {
                    setMessage("correctMsg")
                }
                sendNextStepId();
                setReadyToProceed(true);
                inputRef.current.querySelectorAll('input,select').forEach((el) => {
                    el.disabled = true;
                })
                resetMistakesCounter();
            }
            else {
                incrementMistakesCounter();
                setMessage("incorrectMsg")
            }
            liveSend({
                "action": "submit_question",
                "question_id": props.id,
                "expected_answer" : expectedAnswerIndex,
                "selected_answer" : selectedOption,
                "is_correct" : isCorrect,
                "understanding_bonus" : isFirstAttempt && isCorrect ? 1 : 0,
                "mistakes_counter": mistakesCounter.current,
                "time_stamp": new Date().toUTCString(),
            })
        }
        return (
            <>
                { props.type === "dropdown" &&
                     <div ref={inputRef} style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                        <label htmlFor={props.stepId+'-dropdown'}>{props.label}</label>
                        <select className="custom-select" id={props.stepId+'-dropdown'}>
                            <option value={-1} selected key={-1}></option>
                            {
                                props.options.map((option,index) => {
                                    return (
                                        <option value={index} key={index}>{option}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                {
                    props.type === "radio" && 
                        <div ref={inputRef} style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                            <label>{props.label}</label>
                            {
                                props.options.map((option,index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input className="form-check-input" type="radio" name={props.stepId+'-radio'} id={props.stepId+'-radio-'+index} value={index}/>
                                            <label className="form-check-label" htmlFor={props.stepId+'-radio-'+index}>
                                                {option}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
                { !readyToProceed && 
                    <div style={{display:"flex",justifyContent:'center',marginTop:'1rem'}}>
                        <button type="button" className="btn btn-primary" onClick={onSubmit} style={{marginTop: '0.5rem'}}>
                            Submit
                        </button>
                    </div>
                }     
                {
                    message && message === "incorrectMsg" && 
                        <div class="incorrect-msg">
                            {props.incorrectMsg}
                        </div>
                }
                {
                    message && message === "correctMsg" &&
                        <div class="correct-msg">
                            {props.correctMsg}
                        </div>       
                }
                {
                    message && message === "correctFirstMsg" &&
                        <div class="correct-msg">
                            {props.correctFirstMsg}
                        </div>
                }
                {
                    message && message === "correctSecondMsg" &&
                        <div class="correct-msg">
                            {props.correctSecondMsg}
                        </div>
                }
                { readyToProceed && !hideSubmitButton &&
                    <div style={{display:"flex",justifyContent:'center',marginTop:'1rem'}}>
                        <button type="button" className="btn btn-primary" onClick={onSubmit} style={{marginTop: '0.5rem'}}>
                            Proceed
                        </button>
                    </div>
                }      
            </> 
        )
    }
    `
    renderReactComponent(jsxCode, "react-root", "MechanicsTrainingRound", JSON.stringify({...js_vars}))
}

window.addEventListener("load", renderPage)