function RenderRoundPage() {
    const jsxCode = `
    const CurrencyContext = React.createContext(null);
    const steps = getSteps()
    const modalsContent = getModalsContent()
    function RoundPage(props){
        const [ranking, setRanking] = React.useState(props.prizes.map(() => undefined))
        const [activeModal,setActiveModal] = React.useState(null)
        const [activeSteps, setActiveSteps] = React.useState([steps[0]])
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
                     "preferences": [playersRankings, props.prizesPriorities], "prizes": props.prizes, "values": props.prizesValues
                });
            }
        },[activeSteps])
        function readyToProceed(){
            const step = activeSteps.at(-1)
            if (step.type === 'rankingForm'){
                return ranking.every(ranking => ranking !== undefined)
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
                    <button class="button-2" type="button" onClick={()=>{setActiveModal("study")}}>Click for a general reminder on this study</button><br/>
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
                                        <button class="button-2" type="button" onClick={()=>{setActiveModal("ranking")}}>Click here for a reminder on what this ranking means</button><br/>
                                        <RankingForm
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
                                        <button class="button-2" type="button" onClick={()=>{setActiveModal("prizes")}}>Click here for a reminder on what the prizes mean</button><br/>
                                    </section>
                                )
                            }
                            if (step.type === 'prizesPrioritiesTable'){
                                return (
                                    <section ref={step.ref}>
                                        {step.content}
                                        <PrizesPrioritiesTable prizesPriorities={props.prizesPriorities}/><br/>
                                        <button class="button-2" type="button" onClick={()=>{setActiveModal("prizesPriorities")}}>Click here for a reminder on what the priorities mean</button><br/>
                                    </section>
                                )
                            }                   
                            if (step.type === 'allocationResults'){
                                return (
                                    <section id="allocation-results" onClick={onNext}>
                                        <p>
                                            Allocation process working… <i class="fa-regular fa-hourglass-half fa-spin"></i>
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
        const [inputValue,setInputValue] = React.useState("");
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
        </div>
        )
    }
    function getSteps (){
        return [
            {
                "type" :"instructions",
                "content" : (
                    <section>
                        <div class="explain">
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
                        <p class="ms-1">
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
            <div class="modal" style={{display:'flex'}} onClick={props.onClose} >
                <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                    <i class="close1" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</i>
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
                    For example, the column under <b>Prize A</b> shows its priorities.
                    Prize A has Ruth in the 1st priority (the highest),
                    Shirley in the 2nd priority, You in the 3rd priority and Theresa in the 4th priority (the lowest).
                    So, for example, it is easier for Ruth to get Prize A this round, and harder for Theresa to get Prize A this round.</p>
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
        )
    }
    }
    `
    function getPropsFormJsVars() {
        console.log(js_vars)
        function getRanking(){
            const firstPriority = js_vars.firstPriority || undefined;
            const secondPriority = js_vars.secondPriority || undefined;
            const thirdPriority = js_vars.thirdPriority || undefined;
            const fourthPriority = js_vars.fourthPriority || undefined;
            if (firstPriority === undefined || secondPriority === undefined || thirdPriority === undefined || fourthPriority === undefined){
                return undefined;
            }
        }
        return {
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
            <div class="btn-container">
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


