function renderIntroPage(){
    const jsxCode =`
    const mechaninsSteps = {
        "menu":[
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                You will now learn the full technical details of the allocation process.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                               <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                               Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
              content : (
                    <section>
                        <h4>Overview of allocation process</h4>
                            <div class="explain">
                                <p>
                                    The prize you get is determined in two main steps:
                                    <ol>
                                        <li>The computer determines some group of <b>Obtainable Prizes</b> that you might receive. Your own ranking does not influence the Obtainable Prizes. Instead, they are determined using only the prize priorities and the rankings of the other participants.</li>
                                        <li>You get the Obtainable Prize that you <b>ranked highest</b> (in the ranking you submitted).</li>
                                    </ol> 
                                </p>
                            </div>
                    </section>
                ),
                ref: React.createRef()  
            },
            {
                content : (
                 <section>
                    <div class="explain transparent">
                        <p style={{color : "#0b1ae3"}}>
                           <b>The important principle</b>: Your own ranking does <b>not</b> influence what the Obtainable Prizes are, but it <b>does</b> determine what you get from among the Obtainable Prizes—you get the Obtainable Prize that you ranked the <b>highest.</b>
                        </p>
                    </div>
                </section>   
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                        </div>
                        <img src={imgUrls.menu} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                    </section>
                ),
                ref : React.createRef()
            },
            {
                content : (
                    <section>
                        <h4>Details of allocation process</h4>
                        <h5><b>Priorities and rankings → Temporary allocation → Obtainable Prizes</b></h5>
                        <div class="explain">
                            The allocation process begins with a multi-step process. This process  determines a “temporary allocation” of prizes to all participants <b>except for you</b>, and then determines your Obtainable Prizes based on this temporary allocation. This process <b>does not involve your own submitted ranking</b>, and works as follows:
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            In the first step, each prize is paired to its <b>highest</b>-priority participant, among all participants <b>except for you.</b>          
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
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
                                            <b>Re-pair:</b> all unpaired prizes can only get re-paired to participants that they were not paired with before. Each unpaired prize is re-paired to its <b>highest</b>-priority participant, among the participants they <b>were not yet paired with</b> and <b>except for you.</b>
                                        </li>
                                    </ul>
                                </p>
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                           <p>
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
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                When there are no more conflicts and when one prize was unpaired from all participants (except for you), the process is over. The result is each prize, except for the unpaired one, being paired to a different participant (except for you).
                            </p>
                            <p>
                                Each prize except for the unpaired one is then <b>temporarily allocated</b> to the participant it is paired to.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                Next, we will tell you how the <b>Obtainable Prizes</b> are determined from the temporary allocation.
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
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <h5><b>Obtainable Prizes → The prize you get</b></h5>
                            <div class="explain">
                                <p>
                                    Finally, we will remind you how the prize you get is selected from among the Obtainable Prizes, using your ranking.<br/>
                                    In fact, this is the <b>only</b> time the allocation process uses your ranking. 
                                </p>    
                                <p>
                                    From among the Obtainable Prizes, <b>you get the one that you ranked the highest. </b> 
                                    In other words, the computer will look through your ranking from top to bottom, and you will get the first prize that is Obtainable.
                                </p>
                            </div>
                    </section>
                ),
                ref: React.createRef()                
            },
            {
                content : (
                    <section id="step-6">
                        <div class="explain">
                            <p>
                                On the next screens you will play training rounds of the game to master your understanding of the allocation process. Click the button below to proceed to these rounds.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            }
        ],
        "traditional": [
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                You will now learn the full technical details of the allocation process.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                    <div class="explain">
                        <p>
                           <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                           Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                        </p>
                    </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
              content : (
                    <section>
                        <h4>Overview of allocation process</h4>
                            <div class="explain">
                                The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                            </div>
                            <img src={imgUrls.trad} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <h4>Details of allocation process</h4>
                        <div class="explain">
                            <p>
                                The allocation process is a multi-step process, as follows:
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                In the first step, each participant is paired to their <b>highest</b>-rank prize.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                    In the next step, possible conflicts are detected and solved.<br/>
                                    If two (or more) participants are paired to the same prize, this is a <b>conflict</b>.<br/>
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
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                         <div class="explain">
                           <p>
                                Later steps continue in the same way, by detecting and solving new conflicts.<br/>
                                Like before, if two (or more) participants are paired to the same prize, this is a <b>conflict</b>.<br/> The conflict is solved using the same <b>Unpair</b> and <b>Re-pair</b> steps from above. 
                            </p>
                            <p>
                                A participant can get unpaired from a prize <b>even if they successfully got paired to that prize in a previous step.</b>
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div class="explain">
                            <p>
                                When there are no more conflicts, the process is over. The result is each participant being paired to a different prize.
                            </p>
                            <p>
                                Each prize is then allocated to the participant paired to it.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                         <div class="explain">
                            <p>
                                On the next screens you will play training rounds of the game to master your understanding of the allocation process. Click the button below to proceed to these rounds.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            }
        ]
    }
    const propertiesSteps =  {
        "menu": [
            {
                content : (
                    <section>
                        <div className="explain">
                             <p>
                                We will now tell you a general important principle of how your own ranking affects the allocation process.
                            </p>
                            <p>
                                <b>This principle is important to learn:</b> You may be able to apply your knowledge of it to choose your rankings in the upcoming real rounds of this study.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
              content : (
                  <section>
                      <div class="explain">
                        <p>
                            The prize you get is determined in two main steps:
                            <ol>    
                                <li>The computer determines some group of <b>Obtainable Prizes</b> that you might receive. Your own ranking does not influence the Obtainable Prizes. Instead, they are determined using only the prize priorities and the rankings of the other participants.</li>
                                <li>You get the Obtainable Prize that you <b>ranked highest</b> (in the ranking you submitted).</li>
                            </ol>
                        </p>
                      </div>
                  </section>
              ),
              ref : React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain transparent">
                            <p style={{color: "#0b1ae3"}}>
                                <b>The important principle</b>: Your own ranking does <b>not</b> influence what the Obtainable Prizes are, but it <b>does</b> determine what you get from among the Obtainable Prizes—you get the Obtainable Prize that you ranked the <b>highest</b>.
                            </p>
                       </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                            </p>
                            <img src={imgUrls.menu} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>  
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                             <p>
                                For example, imagine that your Obtainable Prizes are C and D. If you submit the ranking A–B–C–D, you will get Prize C, which is the one you ranked highest among the Obtainable Prizes. No ranking you could possibly submit would get you Prize A or Prize B, since the Obtainable Prizes are C and D, and since your own ranking cannot influence the Obtainable Prizes.
                             </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                             <p>
                                On the next screens you will play training rounds of the game to master your understanding of this principle.
                                Click the button below to proceed to these rounds.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()                     
            }
        ],
        "traditional":[
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                We will now tell you a general important principle of how your own ranking affects the allocation process.
                            </p>
                            <p>
                                <b>This principle is important to learn:</b> You may be able to apply your knowledge of it to choose your rankings in the upcoming real rounds of this study.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                The prize you get is determined using an <b>allocation process</b> that uses your own ranking, the rankings of the other participants, and the prize priorities.<br/>
                                The following image illustrates this:
                            </p>
                        </div>  
                        <img src={imgUrls.trad} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                Now, imagine that the computer already determined some prize priorities and rankings of the other, computerized participants. The only component left undecided is your own ranking.<br/>
                                As you decide which ranking to submit, imagine there is some specific ranking that you are considering submitting.
                                Let’s call it “the considered ranking”.<br/>
                            </p>    
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain transparent">
                            <p style={{color: "#0b1ae3"}}>
                                <b>The important principle</b>: The prize you get if you submit the considered ranking is the <b>highest possible</b> that you could get <b>according to the considered ranking.</b>
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <section>
                        <div className="explain">
                            <p>
                                In other words, if you submit any alternative ranking, different from the considered ranking, you will either get <b>the same</b> prize you get when submitting the considered ranking, or some prize <b>lower on the considered ranking.</b>
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            },
            {
                content : (
                    <content>
                        <div class="explain">
                            For example, imagine that you submitted the ranking A–B–C–D and ended up getting Prize C. This means that Prize C is the highest possible that you could get on the considered ranking A–B–C–D. Submitting any other, alternative ranking different from A–B–C–D could have only gotten you the same prize, Prize C, or possibly a lower-ranked prize on the considered ranking, Prize D. No other alternative ranking could have gotten you Prize A or Prize B.
                        </div>
                    </content>
                ),
                ref : React.createRef()
            },
            {
                content : (
                    <section id="step-6">
                        <div class="explain">
                            <p>
                                On the next screens you will play training rounds of the game to master your understanding of the allocation process. Click the button below to proceed to these rounds.
                            </p>
                        </div>
                    </section>
                ),
                ref: React.createRef()
            }
        ]
    }
    function getSteps(variant,treatment){
        if (treatment === "properties") return propertiesSteps[variant]
        if (treatment === "mechanics") return mechaninsSteps[variant]
    }
    function IntroPage(props){
        const steps =  getSteps(props.variant,props.treatment)
        const [activeSteps, setActiveSteps] = React.useState([steps[0]])
        const [allocationModal, setAllocationModal] = React.useState(false)
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
        React.useEffect(() => {
            const urls = Object.values(imgUrls)
            urls.forEach(url => {   
                const img = new Image()
                img.src = url
            })
        },[])
        return (
            <>
            {
                activeSteps.map((step, index) => {
                  return (
                      <div ref={step.ref}>
                      { step.content }
                      </div>
                  )  
                })
            }
            <div className="btn-container">
                <button type="button" className="btn btn-primary" onClick={onNext}>{activeSteps.at(-1) === steps.at(-1) ? "Proceed to training rounds":"Proceed"}</button>
            </div>
            </>
        )
    }
    `
    function getPropsFormJsVars(){
        return {
            ...js_vars
        }
    }

    renderReactComponent(jsxCode, 'react-root', 'IntroPage',JSON.stringify(getPropsFormJsVars()))
}
window.addEventListener('load', renderIntroPage)