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
                               <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.<br/>
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
                                    The allocation process will first use <b>all participants’ rankings except for yours,</b> and all the prize priorities, to determine a set of prizes that you can receive, called the <b>Obtainable Prizes.</b> Then, <b>you will get the prize you ranked highest out of these Obtainable Prizes.</b> 
                                </p>
                            </div>
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
                           The allocation process begins with a multi-step process which <b>does not involve your own submitted ranking,</b> as follows:
                                <p>
                                    In the first step, each prize is paired to their <b>highest</b>-priority participant, among all participants <b>except for you.</b>
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
                        <h5><b>Temporary allocation → Obtainable Prizes</b></h5>
                        <div className="explain">
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
                                    We will now tell you how the prize you get is selected from among the Obtainable Prizes. 
                                </p>    
                                <p>
                                    At the end, among the Obtainable Prizes, <b>you get the one that you ranked the highest.</b>
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
                           <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.<br/>
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
                                    The allocation process will use all <b>participants’ rankings</b> and all prize priorities to determine the allocation of prizes to participants. <b>You will get the prize allocated to you.</b> 
                                </p>
                            </div>
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
                                    <p>
                                    In the first step, each participant is paired to their <b>highest</b>-rank prize.
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
                                We will now tell you a general important principle behind the allocation process.
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
                                Imagine the computer determined some prize priorities and rankings of the other, computerized participants. <br/>
                                In the allocation process, the computer will use these prize priorities and other participants’ rankings
                                to determine some group of <b>Obtainable Prizes</b> that you might receive.
                                <ul>
                                    <li>These Obtainable Prizes might include some or all of the prizes. There will always be at least one Obtainable Prize. </li>
                                    <li>Importantly, <b>you cannot affect the Obtainable Prizes with your own ranking</b>.
                                        They are only determined using the other participants' rankings and the prize priorities.</li>
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
                        <div className="explain">
                            <p>
                                Then:
                                <ul>
                                    <li>You always get the Obtainable Prize that is ranked highest in the ranking you submitted.</li>
                                    <li>In other words, no ranking would get you a non-Obtainable Prize, and among the Obtainable Prizes,
                                        you get the one that you ranked highest.</li>
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
                        <div className="explain">
                             <p>
                                For example, imagine that your Obtainable Prizes are B and D. If you submit the ranking A–B–C–D (from most to least preferred),
                                you will get Prize B, which is the one you ranked highest among the Obtainable Prizes.
                                No ranking you could possibly submit would get you Prize A or Prize C, since the Obtainable Prizes are B and D.
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