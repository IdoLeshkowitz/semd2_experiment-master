function renderIntroPage(){
    const jsxCode =`
    const steps = {
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
                    <section id="step-1_a">
                        <div class="explain">
                            <p>
                               <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in rounds of this study.
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
                           The allocation process begins with a multi-step process which <b>does not involve your own submitted ranking,</b> as follows:
                                <p>
                                    In the first step, each prize is paired to their its <b>highest</b>-priority participant, among all participants <b>except for you.</b>
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
                                    Like before, if two (or more) prizes are paired to the same participant, this is a <b>conflict.</b>
                                </p>
                                <p>
                                    Like before, each conflict is solved in two steps:
                                </p>
                                        <ul>
                                            <li>
                                                <b>Unpair:</b> only the prize highest in that participant’s ranking remains paired to that participant. The others get unpaired, <b>even if they successfully got paired to that participant in a previous step.</b>
                                            </li>
                                            <li>
                                                <b>Re-pair:</b> Every unpaired prize gets re-paired to its highest-priority participant, among the participants they <b>were not previously paired with</b> and <b>except for you.</b>
                                            </li>
                                        </ul>
                                <p>
                                    There is one <b>exception</b> to the Re-pair step:<br/>
                                    During the process, one prize will encounter a conflict with <b>every</b> participant, except for you, and will eventually get unpaired from all of them. That prize will <b>remain unpaired</b> at the end of the process.
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
                                When there are no more conflicts and when one prize was unpaired from all participants (except for you), the process is over. The result is each prize, except for the unpaired one, being paired to a different participant, except for you.
                            </p>
                            <p>
                                Each prize except for the unpaired one is then <b>temporarily allocated</b> to the participant it is paired to.
                            </p>
                            <p>
                                In this temporary allocation, no prize was allocated to you. To determine which prize is allocated to you, the computer first determines which prizes you can obtain in principle. These are the <b>Obtainable Prizes.</b>
                            </p>
                            <p>
                                You can obtain two kinds of prizes:
                                <ol>
                                    <li><b>Any prize that your priority of getting is higher</b> than that of the participant it is temporarily allocated to.</li>
                                    <li><b>The prize that was left unpaired in the temporary allocation.</b> You cannot obtain any other prizes.</li>
                                </ol>
                            </p>
                            <p>
                                At the end, among the Obtainable Prizes, you get the one that you ranked the <b>highest.</b>
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
        ]
    }
    function getSteps(variant){
        return variant === 'menu' ? steps.menu : steps.traditional
    }
    function IntroPage(props){
        const steps =  getSteps(props.variant)
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