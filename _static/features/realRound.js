function RenderRoundPage() {
    const jsxCode = `
    const CurrencyContext = React.createContext(null);
    const steps = getSteps()
    const modalsContent = getModalsContent()
    function getActiveSteps(activeStepIndex){
        if (!activeStepIndex) return [steps[0]]
        return steps.slice(0, activeStepIndex + 1)
    }
    function RoundPage(props){
        const [ranking, setRanking] = React.useState(props.initialRanking)
        const [activeModal,setActiveModal] = React.useState(null)
        const [activeSteps, setActiveSteps] = React.useState(getActiveSteps(props.activeStepIndex))
        React.useEffect(() => {
            if (activeSteps.length === 1)return ;
            /* Scroll to the latest step */
            const latestStep = activeSteps.at(-1)
            const latestStepRef = latestStep.ref.current
            latestStepRef?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        },[activeSteps])
        React.useEffect(() => {
            if (activeSteps.at(-2)?.type === 'rankingForm'){
                function prizesNamesToIndices(prizesNames){
                    const prizes = props.prizes
                    return prizesNames.map(prizeName => prizes.indexOf(prizeName))
                }
                const humanPlayerRanking = prizesNamesToIndices(ranking)
                const otherPlayersRankings = props.participantsPriorities
                const playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);
                liveSend({
                    "information_type": "set_ranking",
                     "preferences": [playersRankings, props.prizesPriorities], "prizes": props.prizes, "values": props.prizesValues
                });
            }
        },[activeSteps])
        React.useEffect(() => {
            liveSend({
            "information_type": "set_active_step_id",
            "active_step_index": activeSteps.length - 1,
            })
        },[activeSteps])
        function readyToProceed(){
            const step = activeSteps.at(-1)
            if (step.type === 'rankingForm'){
                return ranking.every(ranking => !!ranking)
            }
            return true
        }
        function onNext(){
            if (!readyToProceed()) return ;
            function isLastStep(){
                return activeSteps.at(-1) === steps.at(-1)
            }
            if (isLastStep()){
                document.getElementById("form").submit()
                return
            }
            setActiveSteps([...activeSteps, steps[activeSteps.length]])
        }
        function getButtonText(){
            const step = activeSteps.at(-1)
            if (step?.type === 'rankingForm'){
                return "Submit Ranking"
            } 
            return "Proceed"
        }
        function getButtonClassName(){
            const step = activeSteps?.at(-1)
            if (step?.type === 'rankingForm'){
                return "btn btn-danger"
            }
            return "btn btn-primary"
        }
        return (
            <CurrencyContext.Provider value={props.currency}>
                    <button className="button-2" type="button" onClick={()=>{setActiveModal("study")}}>Click for a general reminder on this study</button><br/>
                    {
                        props.treatment === "mechanics"  &&
                            <>  
                                <button className="button-2" type="button" onClick={()=>{setActiveModal(props.variant === "menu"? "mechanicsMenuAllocation":"mechanicsTraditionalAllocation")}}>Click for a reminder on the technical details of the allocation process</button><br/>
                            </>
                    }
                    {
                        props.treatment === "properties" && 
                            <>
                                <button className="button-2" type="button" onClick={()=>{setActiveModal(props.variant === "menu"? "propertiesMenuAllocation":"propertiesTraditionalAllocation")}}>Click here for a reminder on the Key Principle of the allocation process</button><br/>
                            </>
                    }
                    {
                        activeModal &&
                        <Modal onClose={() => setActiveModal(null)}>
                            {modalsContent[activeModal]}
                        </Modal>
                    }
                    {
                        activeSteps.map((step, index) => {
                            if (step.type === 'instructions'){
                                return (
                                    <>
                                        <section ref={step.ref}>
                                            { step.content }
                                        </section>
                                    </>
                                )  
                            }
                            if (step.type === 'rankingForm'){
                                return (
                                    <section ref={step.ref}>
                                        {step.content}
                                        <button className="button-2" type="button" onClick={()=>{setActiveModal("ranking")}}>Click here for a reminder on what this ranking means</button><br/>
                                        <RankingForm
                                            initialRanking = {ranking}
                                            disabled = {activeSteps.at(-1).type !== 'rankingForm'}
                                            onNext={onNext}
                                            setRanking={setRanking}
                                            onEnter={onNext}
                                            />
                                    </section>
                                )
                            }
                            if (step.type === 'prizesTable'){
                                return (
                                    <section ref={step.ref}>
                                        {step.content}
                                        <PrizesTable prizesValues={props.prizesValues}/><br/>
                                        <button className="button-2" type="button" onClick={()=>{setActiveModal("prizes")}}>Click here for a reminder on what the prizes mean</button><br/>
                                    </section>
                                )
                            }
                            if (step.type === 'prizesPrioritiesTable'){
                                return (
                                    <section ref={step.ref}>
                                        {step.content}
                                        <PrizesPrioritiesTable prizesPriorities={props.prizesPriorities}/><br/>
                                        <button className="button-2" type="button" onClick={()=>{setActiveModal("prizesPriorities")}}>Click here for a reminder on what the priorities mean</button><br/>
                                    </section>
                                )
                            }                   
                            if (step.type === 'allocationResults'){
                                return (
                                    <section id="allocation-results" onClick={onNext} style={{pointerEvents:'none'}}>
                                        <p>
                                            Allocation process working… <i className="fa-regular fa-hourglass-half fa-spin"></i>
                                        </p>
                                    </section>
                                )
                            }
                            return null
                        })
                    }  
                    {
                        activeSteps.at(-1).type !== 'allocationResults' &&
                            <div className="btn-container">
                                <button 
                                    type="button"
                                    className={getButtonClassName()}
                                    onClick={onNext}
                                    disabled={!readyToProceed()}
                                    >
                                    {getButtonText()}
                                </button>
                            </div>
                    }
            </CurrencyContext.Provider>
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
            const prizes = ["A","B","C","D"];
            const participantsNames=["You","Ruth","Shirley","Theresa"]
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
                            Array(numberOfRows).fill(0).map((_,rowIndex)=>{
                                return (
                                    <tr key={rowIndex}> 
                                        {/* description cell */}
                                        <td>{getRowDescription(rowIndex,numberOfRows)}</td>
                                        {/* priorities cells */}
                                        {prizes.map((prize,columnIndex)=>{
                                            return (
                                                <td key={columnIndex}>{participantsNames[prizesPriorities[columnIndex][rowIndex]]}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    function PrizesTable(props){
        const prizesNames = ["A","B","C","D"];
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
                        {prizesNames.map((prize,index)=>{
                           return <td>{getMoneyString(props.prizesValues[index],currency)}</td>
                        })}
                    </tr>
                </thead>
            </table>
        )    
    }
    function RankingForm(props){
        const [inputValue,setInputValue] = React.useState(addEnDash(props?.initialRanking?.join('')?.toUpperCase() ?? ''));
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
            /* validate that input is max 4 characters long */
            const isLengthValid = str.length <= 4;
            if (!isLengthValid) return false;
            /* validate that characters are either A | B | C | D . Non case sensitive. */
            const containsOnlyValidChars = /^[a-dA-D]*$/.test(str);
            if (!containsOnlyValidChars) return false;
            /* validate that each character is unique */
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
            if (isValid === false) return;
            setInputValue(addEnDash(uppercasedCleanedInput));
            props.setRanking([uppercasedCleanedInput[0],uppercasedCleanedInput[1],uppercasedCleanedInput[2],uppercasedCleanedInput[3]]);
            firstPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[0]);
            secondPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[1]);
            thirdPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[2]);
            fourthPriorityRef.current.value = replaceCharWithNumericValue(uppercasedCleanedInput[3]);
        }
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <input  
                    type="text"
                    style={{flexBasis: '10rem',textAlign: 'center'}}
                    className="form-control fw-bold fs-5 mt-2 mb-3 "
                    value={inputValue}
                    disabled={props.disabled}
                    onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            props.onEnter();
                        }
                    }}
                    onInput={onInput}
                   />
                    <input type="hidden" name="first_priority" id="first_priority" ref={firstPriorityRef} required/>
                    <input type="hidden" name="second_priority" id="second_priority" ref={secondPriorityRef} required/>
                    <input type="hidden" name="third_priority" id="third_priority" ref={thirdPriorityRef} required/>
                    <input type="hidden" name="fourth_priority" id="fourth_priority" ref={fourthPriorityRef} required/>                   
        </div>
        )
    }
    function getSteps (){
        return [
            {
                "type" :"instructions",
                "content" : (
                    <section>
                        <div className="explain">
                            <p><b>This is a real round!</b> <br/>
                            Your total earnings will increase according to the prize you will get at the end of the round.</p>
                        </div>
                    </section>
                ),
                "ref" : React.createRef()
            },
            {
                "type" :"prizesTable",
                "content" : (
                    <>
                        <br/>
                        <h4>Step 1: Round Information</h4>
                        <p>
                            In this round, your <b>prizes</b> are:
                        </p>
                    </>
                    
                ),
                "ref" : React.createRef()
            },
            {
                "type" :"prizesPrioritiesTable",
                "content" : (
                     <p>
                        The <b>prize priorities</b> for you and for the other participants are:
                    </p>
                ),
                "ref" : React.createRef()
            },
            {
                "type" :"rankingForm",
                "content" : (
                    <>
                        <h4>Step 2: Submit Your Ranking</h4>
                        <p className="ms-1">
                            Please rank the four prizes in an order of your choice.
                        </p>
                    </>
                ),
                "ref" : React.createRef()
            },
            {
                "type" :"allocationResults",
                ref : React.createRef()      
            },
        ]
    }
    function Modal(props){
        return (
            <div className="modal" style={{display:'flex'}} onClick={props.onClose} >
                <div className="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                    <i className="close1" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</i>
                    {props.children}
                </div>
            </div>
        )
    }
    function getModalsContent (){
        return {
            "ranking":(
                <>
                    <p>In Step 2, you are asked to <b>rank the four prizes</b> in an order of your choice.</p>
                    <p>The computerized participants simultaneously submit their own rankings. They <b>do not know</b> your own ranking.</p>
                    <p>Their rankings are aimed at getting them their high-earning prizes. Your own ranking <b>cannot affect the computerized participants’ rankings</b>.</p>
                </>
            ),
            "prizes":(
                <>
                    <p>
                        In Step 1, you first see the <b>prizes</b> you can get in this round and how much money they are worth to <b>you</b>. In the table, under each prize A, B, C or D, you can see how much money it would add to <b>your</b> earnings if <b>you get it</b>.
                    </p>
                    <p>
                        Each prize might be worth a <b>different</b> amount of money for each participant, and each participant can only see the money amounts relevant to <b>themselves</b>. However, the prizes that earn you a large amount of money are also likely to earn the <b>other participants</b> a large amount of money. There is more likely to be <b>competition</b> for the high-earning prizes.
                    </p>
                    <p>
                        The money worth of prizes for you and for the other participants can be different in different rounds of the game, and they were <b>determined beforehand</b>. You and the other participants <b>cannot affect the money worth of prizes</b>.
                    </p>
                </>
            ),
            "prizesPriorities":(
                <>
                    <p>
                        All four participants have some <b>priority</b> for getting each of the four prizes.
                        These priorities can affect the allocation of prizes.
                    </p>
                    <p>
                        The higher your priority is for getting some prize, the more likely you are to get that prize at the end of the process.
                    </p>
                    <p>
                        Each column shows the priorities of all participants at some prize, written from highest to lowest.
                    </p>
                    <p>
                        The prize priorities can be different in different rounds of the game,
                        and they were <b>determined beforehand</b>. <br/>
                        You and the other participants <b>cannot affect the prize priorities</b>.
                    </p>
                </>
            ),
            "study":(
                <>
                    <p>
                        In this study, you and three computerized participants, Ruth, Shirley, and Theresa, are going to play a game for four prizes.<br/>
                        Each prize is worth money, but might be worth a different amount of money for each participant.
                    </p>
                    <p>
                        You and the computerized participants will each rank the four prizes in any order you wish.<br/>
                        Then, an <b>allocation process</b> will use these rankings to allocate the prizes—one prize for each participant.
                    </p>
                    <p>
                        The allocation process tries to give each participant a prize that they ranked higher rather than a prize that they ranked lower, while taking into account the rankings of all participants.
                    </p>
                </>
            ),
            "mechanicsTraditionalAllocation":(
                <div>
                    <p>
                        <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
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
            ),
            "mechanicsMenuAllocation":(
                <div>
                    <p>
                        <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
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
            ),
            "propertiesMenuAllocation":(
                <div>
                    <p>
                        We will now tell you a general important principle of how your own ranking affects the allocation process.
                    </p>
                    <p>
                        <b>This principle is important to learn:</b> You may be able to apply your knowledge of it to choose your rankings in rounds of this study.
                    </p>
                    <p>
                        The prize you get is determined in two main steps:
                        <ol>    
                            <li>The computer determines some group of <b>Obtainable Prizes</b> that you might receive. Your own ranking does not influence the Obtainable Prizes. Instead, they are determined using only the prize priorities and the rankings of the other participants.</li>
                            <li>You get the Obtainable Prize that you <b>ranked highest</b> (in the ranking you submitted).</li>
                        </ol>
                    </p>
                    <p style={{color: "#0b1ae3"}}>
                        <b>The important principle</b>: Your own ranking does <b>not</b> influence what the Obtainable Prizes are, but it <b>does</b> determine what you get from among the Obtainable Prizes—you get the Obtainable Prize that you ranked the <b>highest</b>.
                    </p>
                    <p>
                        The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                        <img src="https://drive.google.com/uc?export=download&id=1espDo1YsV4LlO9KbEvJtwxa_piBKDBY_" alt="explanation" style={{width:'100%',margin:'2% 0%'}}/>  
                    </p>
                    <p>
                        For example, imagine that your Obtainable Prizes are C and D. If you submit the ranking A–B–C–D, you will get Prize C, which is the one you ranked highest among the Obtainable Prizes. No ranking you could possibly submit would get you Prize A or Prize B, since the Obtainable Prizes are C and D, and since your own ranking cannot influence the Obtainable Prizes.
                    </p>
                    <p>
                        On the next screens you will play training rounds of the game to master your understanding of this principle.
                        Click the button below to proceed to these rounds.
                    </p>
                </div>     
            ),
            "propertiesTraditionalAllocation":(
                  <section>
                    <p>
                        We will now tell you a general important principle of how your own ranking affects the allocation process.
                    </p> 
                    <p>
                        <b>This principle is important to learn</b>: You may be able to apply your knowledge of it to choose your rankings in rounds of this study.
                    </p>
                    <p>
                        The prize you get is determined using an <b>allocation process</b> that uses your own ranking, the rankings of the other participants, and the prize priorities.<br/>
                        The following image illustrates this:
                    </p>
                    <img src="https://drive.google.com/uc?export=download&id=1enjUDw5ZdXdufgxNm0PfC5DNz-NLeFmy" alt="explanation" style={{width:'100%',margin:'2% 0%'}}/>
                    <p>
                        Now, imagine that the computer already determined some prize priorities and rankings of the other, computerized participants. The only component left undecided is your own ranking.<br/>
                        Now, as you decide which ranking to submit, imagine there is some specific ranking that you are considering submitting.
                        Let’s call it “the considered ranking”.<br/>
                    </p>
                     <p style={{color: "#0b1ae3"}}>
                        The important principle: The prize you get if you submit the considered ranking is the highest possible that you could get according to the considered ranking.
                    </p>
                    <p>
                        In other words, if you submit any alternative ranking, different from the considered ranking, you will either get <b>the same</b> prize you get when submitting the considered ranking, or some prize <b>lower on the considered ranking.</b>
                    </p>
                    <p>
                        For example, imagine that you submitted the ranking A–B–C–D and ended up getting Prize C. This means that Prize C is the highest possible that you could get on the considered ranking A–B–C–D. Submitting any other, alternative ranking different from A–B–C–D could have only gotten you the same prize, Prize C, or possibly a lower-ranked prize on the considered ranking, Prize D. No other alternative ranking could have gotten you Prize A or Prize B.
                    </p>
                </section>
            )       
        }
    }
    `

    function getPropsFormJsVars() {
        function getRanking() {
            const firstPriority = js_vars.firstPriority || null;
            const secondPriority = js_vars.secondPriority || null;
            const thirdPriority = js_vars.thirdPriority || null;
            const fourthPriority = js_vars.fourthPriority || null;
            return [firstPriority, secondPriority, thirdPriority, fourthPriority]
        }
        return {
            "initialRanking": getRanking(),
            ...js_vars
        }
    }

    renderReactComponent(jsxCode, 'react-root', 'RoundPage', JSON.stringify(getPropsFormJsVars()))
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
    const moneyString = getMoneyString((props.prizeValue), props.currency);
    const buttonRef = React.useRef(null);
        return (
        <>
             <p>
                <b>You get Prize {props.prizeName}</b>, and your total earnings increase by <b>{moneyString}</b>.
            </p>
            <div className="btn-container" style={{pointerEvents:'auto'}}>
                <button type="button" ref={buttonRef} className="btn btn-primary" onClick={()=>{buttonRef.current.display = "none"}}>Next</button>
            </div>
        </>
        )
    }
    `
    const props = {prizeName, prizeValue, ...js_vars};
    renderReactComponent(jsxCode, "allocation-results", "AllocationResults", JSON.stringify(props))
}

function liveRecv(data) {
    renderAllocationResults(data["prize"], data["value"]);
}

window.addEventListener('load', RenderRoundPage)
