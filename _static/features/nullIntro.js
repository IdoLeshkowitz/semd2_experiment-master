let state ={};
window.addEventListener('load', renderIntroPage)

function renderIntroPage() {
    const jsxCode = `
        function Stam(){
            return <div></div>
        }
        const steps = [
            {
                type: 'instructions',
                content: (
                    <section>
                        <div class="explain">
                            <p>
                                In this study, you and three computerized participants, Ruth, Shirley, and Theresa, are going to play a game for four prizes.
                                Each prize is worth money, but might be worth a different amount of money for each participant.
                            </p>
                            <p>
                               You and the computerized participants will each rank the four prizes in any order you wish.<br/>
                                Then, an <b>allocation process</b> will use these rankings to allocate the prizes—one prize for each participant.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <div class="explain">
                            <p>
                                The allocation process tries to give each participant a prize that they ranked higher rather than a prize that they ranked lower,
                                while taking into account the rankings of all participants.
                            </p>
                            <p>
                                You will now learn about the game and allocation process while playing a training round of the game.
                                The text in blue bubbles, such as this text, provides explanations about the game and allocation process. <b>Make sure you read it carefully</b>.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <div class="explain">
                            <p>
                                A round of the game has three steps.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <h4>Step 1: Round Information</h4>
                        <div class="explain">
                            <p>
                                In Step 1, you first see the <b>prizes</b> you can get in this round and how much money they are worth to <b>you</b>.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type:'prizesTable',
                content: (
                    <p>
                        In this round, the <b>prizes</b> are:
                    </p>
                ),
                ref: React.createRef()    
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <div class="explain">
                            <p>
                                In the table above, under each prize A, B, C or D, you can see how much money it would add to <b>your</b> earnings.
                            </p>
                            <p>
                                Each prize might be worth a <b>different</b> amount of money for each participant, and each participant can only see the money amounts relevant to <b>themselves</b>. However, the prizes that earn <b>you</b> a large amount of money are also likely to earn the <b>other participants</b> a large amount of money. There is more likely to be <b>competition</b> for the high-earning prizes.
                            </p>
                            <p>
                              The money worth of prizes for you and for the other participants can be different in different rounds of the game, and they were <b>determined beforehand</b>. You and the other participants <b>cannot affect the money worth of prizes</b>.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                         <div class="explain">
                            <p>
                                Still in Step 1, you see next what we call the <b>prize priorities</b>.
                            </p>
                            <p>
                                All four participants have some <b>priority</b> for getting each of the four prizes.
                            </p>
                            <p>
                                These priorities can affect the allocation of prizes. <br/>
                                The higher your priority is for getting some prize, the more likely you are to get that prize at the end of the process.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type:'prizePrioritiesTable',
                content: (
                     <p>
                        In this round, the <b>prize priorities</b> for you and for the other participants are:
                    </p>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                         <div class="explain">
                            <p>
                               Each column shows the priorities of all participants for getting some prize, written from highest to lowest. <br/>
                                For example, the column under <b>Prize A</b> shows its priorities. Prize A has Ruth in the 1st priority (the highest),
                                Shirley in the 2nd priority, You in the 3rd priority and Theresa in the 4th priority (the lowest).
                                So, for example, it is easier for Ruth to get Prize A this round, and harder for Theresa to get Prize A this round.
                            </p>
                            <p>
                                The prize priorities can be different in different rounds of the game, and they were <b>determined beforehand</b>.<br/>
                                You and the other participants <b>cannot affect the prize priorities</b>.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'rankingForm',
                content: (
                    <>
                        <h4>Step 2: Submit Your Ranking</h4>
                        <div class="explain">
                            <p>
                                In Step 2, you are asked to <b>rank the four prizes</b>.
                            </p>
                            <p>
                                Please type your ranking of the four prizes in an order of your choice in the box below.<br/>
                                For example, if you want to rank Prize A first, Prize B second, Prize C third and Prize D fourth, type “A” followed by “B” followed by “C” followed by “D,” and then click “Submit Ranking.”
                            </p>
                        </div>
                    </>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                         <div class="explain">
                            <p>
                                The computerized participants simultaneously submit their own rankings. They <b>do not know your own ranking</b>.
                            </p>
                            <p>
                                Their rankings are aimed at getting them their high-earning prizes. Your own ranking <b>cannot affect the computerized participants’ rankings.</b>
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <h4>Step 3: Allocation Process</h4>
                        <div class="explain">
                            <p>
                                In Step 3, the allocation process allocates the prizes to participants.<br/>
                                Then, you get the prize that was allocated to you.
                            </p>
                            <p>
                                Remember:
                            </p>
                            <p>
                                The allocation process tries to give each participant a prize that they ranked higher rather than a prize that they ranked lower, while taking into account the rankings of all participants.
                            </p>
                            <p>
                                The prize priorities can affect the allocation of prizes.<br/>
                                The higher your priority is for getting some prize, the more likely you are to get that prize at the end of the process.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                type: 'allocationLoader',
                ref: React.createRef()
            },
            {
                type: 'allocationResults',
                ref: React.createRef()
            },
            {
                type: 'instructions',
                content: (
                    <section>
                        <div class="explain">
                            <p>
                                That's it! <br/>Click on the button below to proceed to more training rounds.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            }
        ]
        const CurrencyContext = React.createContext(null);
        function IntroPage(props){
            const [ranking, setRanking] = React.useState([])
            const [activeSteps, setActiveSteps] = React.useState([steps[0]])
            function onNext(){
                function isLastStep(){
                    return activeSteps.at(-1) === steps.at(-1)
                }
                if (isLastStep()){
                    document.getElementById("form").submit()
                    return
                }
                setActiveSteps([...activeSteps, steps[activeSteps.length]])
            }
            React.useEffect(() => {
                if (activeSteps.length === 1)return ;
                /* Scroll to the latest step */
                const latestStep = activeSteps.at(-1)
                const latestStepRef = latestStep.ref.current
                latestStepRef?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            },[activeSteps])
            return (
                <CurrencyContext.Provider value={props.currency}>
                    <>
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
                                            <RankingForm onNext={onNext} setRanking={setRanking} participantsRankings={props.players_rankings} prizesPriorities={js_vars.prizes_priorities} prizes={props.prizes} prizesValues={props.prizes_values} />
                                        </section>
                                    )
                                }
                                if (step.type === 'allocationLoader'){
                                    return (
                                        <section>
                                        {
                                            activeSteps.at(-1).type === 'allocationLoader' &&
                                                <AllocationLoader onNext={onNext} />
                                        }
                                        </section>
                                    )
                                }
                                if (step.type === 'prizesTable'){
                                    return (
                                        <>
                                            <section ref={step.ref}>
                                                {step.content}
                                                <PrizesTable prizesValues={props.prizes_values}/>
                                                <br/>
                                            </section>
                                        </>
                                    )
                                }
                                if (step.type === 'prizePrioritiesTable'){
                                    return (
                                        <>
                                        <section ref={step.ref}>
                                            {step.content}
                                            <PrizesPrioritiesTable prizesPriorities={props.prizes_priorities}/>
                                            <br/>
                                        </section>
                                        </>
                                    )
                                }
                                if (step.type === 'allocationResults'){
                                    return <AllocationResults />
                                }
                                return null
                            })
                        }
                        {   activeSteps.find((step)=>{return step.type === "allocationResults"}) === undefined &&
                            <AllocationResults hidden={true} />
                        }
                        { (activeSteps.at(-1).type === "instructions" || activeSteps.at(-1).type === "prizesTable" || activeSteps.at(-1).type === "prizePrioritiesTable" || activeSteps.at(-1).type === "allocationResults") &&  
                            <div className="btn-container">
                                <button type="button" className="btn btn-primary" onClick={onNext}>{activeSteps.at(-1) === steps.at(-1) ? "Proceed to training rounds":"Proceed"}</button>
                            </div>
                        }
                    </>
                </CurrencyContext.Provider>
            )
        }
        function AllocationResults(props){
            React.useEffect(() => {
                renderAllocationResults()
            })
            const display = props.hidden ? "none" : ""
            return <section id="allocation-results" style={{display}}></section>
        }
        function AllocationLoader(props){
            React.useEffect(() => {
                setTimeout(() => {
                    props.onNext()
                }, 4000)
            },[])
            return (
                <p>
                    Allocation process working… <i class="fa-regular fa-hourglass-half fa-spin"></i>
                </p>
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
            const prizesValues = props.prizesValues.map((prizeValue) => {
                return  (parseInt(prizeValue) /100).toFixed(2)
             })
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
                               return <td>{getMoneyString(prizesValues[index],currency)}</td>
                           })}
                        </tr>
                    </thead>
                </table>
               )    
        }
         function RankingForm(props){
            const [inputValue,setInputValue] = React.useState("");
            const [rankingValid,setRankingValid] = React.useState(false);
            const [showButton,setShowButton] = React.useState(true);
            const inputRef = React.useRef(null);
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
                if (isValid === false){
                    setIsInputValid(false);
                    return;
                }
                setInputValue(addEnDash(uppercasedCleanedInput));
                const isRankingValid = uppercasedCleanedInput.length === 4;
                if (isRankingValid === false){
                    setRankingValid(false);
                    return;
                }
                setRankingValid(true);
                props.setRanking([uppercasedCleanedInput[0],uppercasedCleanedInput[1],uppercasedCleanedInput[2],uppercasedCleanedInput[3]]);
            }
            function onSubmit(){
                function convertInputToRanking(input){
                    const ranking = removeEnDash(input).toUpperCase().split('').map((char) => {
                        return replaceCharWithNumericValue(char)-1;
                    });
                    return ranking;
                }
                if (!rankingValid === true) return ;
                setShowButton(false);
                inputRef.current.disabled = true;
                props.onNext()
                const humanPlayerRanking = convertInputToRanking(inputValue);
                const otherPlayersRankings = props.participantsRankings
                const playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);
                liveSend({
                     "preferences": [playersRankings, props.prizesPriorities], "prizes": props.prizes, "values": props.prizesValues
                });
            }
            return (
                <>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <input  type="text"
                                style={{flexBasis: '10rem',textAlign: 'center'}}
                                className="form-control fw-bold fs-5 mt-2 mb-3 "
                                value={inputValue}
                                ref={inputRef}
                                onKeyDown={(e)=>{
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        onSubmit();
                                    }
                                }}
                                onInput={onInput}
                        />
                    </div>
                    <div className="btn-container">
                    {
                        showButton &&
                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={onSubmit}
                                disabled={rankingValid === false}
                                >
                                    Submit Ranking
                                </button>
                    }
                    </div>
                </>
            )
        } 
    `

    function getPropsFormJsVars() {
        console.log(js_vars)
        return {
            ...js_vars
        }
    }

    renderReactComponent(jsxCode, 'react-root', 'IntroPage', JSON.stringify(getPropsFormJsVars()))
}

function renderAllocationResults(prizeName = state.prize, prizeValue = state.value) {
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
    const moneyString = getMoneyString((props.prizeValue/100).toFixed(2), props.currency);
    const buttonRef = React.useRef(null);
        return (
        <>
             <p>
                <b>You get Prize {props.prizeName}</b>.<br/>
                If this were a real round, your total earning would increase by <span id="points-won">{moneyString}</span>.<br/>
            </p>
        </>
        )
    }
    `
    const props = {prizeName, prizeValue, ...js_vars};
    renderReactComponent(jsxCode, "allocation-results", "AllocationResults", JSON.stringify(props))
}

function liveRecv(data) {
    state.prize = data["prize"];
    state.value = data["value"];
    renderAllocationResults(data["prize"], data["value"]);
}