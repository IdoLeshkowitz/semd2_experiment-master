function renderPage() {
    const jsxCode = `
    const CurrencyContext = React.createContext(null);
    function MechanicsTrainingRound(props){
        const [modals,setModals]= React.useState({prizes:false,ranking:false,study:false,priorities:false});
        const [ranking,setRanking] = React.useState(null);
        const [allocationTimer,setAllocationTimer] = React.useState(null);
        const [activeStepsIds,setActiveStepsIds] = React.useState(props.activeSteps ?? [props.steps[0]]);
        const steps = [
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
        function onClick(){
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
            }
            /* else continue to next step */
            /* update active steps */
            const nextStepId = getNextStepId(activeStepsIds,steps);
            setActiveStepsIds([...activeStepsIds,nextStepId]);
        }
        React.useEffect(()=>{
            /* scroll the latest step into view in any step except the first */
            if (activeStepsIds.length === 1)return ;
            const latestStepId = activeStepsIds.at(-1);
            const latestStep = steps.find(step=>step.id===latestStepId);
            latestStep.sectionRef.current?.scrollIntoView({behavior:"smooth"});
        },[activeStepsIds]) 
        return (
            <CurrencyContext.Provider>
                <>
                    {modals.prizes && <PrizesModal onClose={()=>{setModals({...modals,prizes:false})}}/>}
                    {modals.ranking && <RankingModal onClose={()=>{setModals({...modals,ranking:false})}}/>}
                    {modals.study && <StudyModal onClose={()=>{setModals({...modals,study:false})}}/>}
                    {modals.priorities && <PrioritiesModal onClose={()=>{setModals({...modals,priorities:false})}}/>}
                    <button type="button" className="button-2" onClick={()=>{setModals({...modals,study:true})}}  style={{marginTop:'1rem',marginBottom:'1rem'}}>Click for a reminder on what the prizes mean</button>
                    <div style={{display:'flex', gap:'1.5rem',flexDirection:'column'}}>
                        {
                            activeStepsIds.map((stepId,index)=>{
                                const step = steps.find(step=>step.id===stepId);
                                if (step.type === "information"){
                                    return (
                                        <section ref={step.sectionRef}>
                                            {step.content}
                                            {index === activeStepsIds.length-1 && <Button onClick={onClick} text="Proceed" buttonRef={step.buttonRef}/>}
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
                                                />
                                            { index === activeStepsIds.length-1 && 
                                                <Button 
                                                    onClick={()=>{
                                                        step.inputRef.current.disabled = true;
                                                        onClick();
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
                                            <AllocationResults onClick={onClick}/>
                                        </section>
                                    )
                                }
                            })
                        }
                    </div>
                </>
            </CurrencyContext.Provider>
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
        const [showLoader,setShowLoader] = React.useState(true);
        React.useEffect(()=>{
            setTimeout(()=>{
                setShowLoader(false);
            },2000)
        },[])
        return (
             <>
                <h4>Step 3: Allocation Process</h4>
                { showLoader &&
                    <div id="load">
                        <p>
                            Allocation process working… <i class="fa-regular fa-hourglass-half fa-spin"></i>
                        </p>
                    </div>
                }
                { !showLoader &&
                    <div id="round-results">
                        <p>
                        You are going to perform the allocation process by yourself, according to what you learned.<br/>
                            Click on the button below to start.
                        </p>
                        <Button onClick={props.onClick} text="Proceed"/>
                    </div>
                }
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
                    <p>Each column shows the priorities of all participants at some prize, written from highest to lowest.
                    For example, the column under <b>Prize A</b> shows its priorities.
                    Prize A has Ruth in the 1st priority (the highest),
                    Shirley in the 2nd priority, You in the 3rd priority and Theresa in the 4th priority (the lowest).
                    So, for example, it is easier for Ruth to get Prize A this round, and harder for Theresa to get Prize A this round.</p>
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
                props.onInput(uppercasedCleanedInput.split(''));
            }
            return (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input  type="text"
                            style={{flexBasis: '10rem',textAlign: 'center'}}
                            className="form-control fw-bold fs-5 mt-2 mb-3 "
                            value={inputValue}
                            onInput={onInput}
                            ref = {props.inputRef}
                    />
                </div>
            )
        } 
    `
    renderReactComponent(jsxCode, "react-root", "MechanicsTrainingRound", JSON.stringify({...js_vars}))
}

renderPage()