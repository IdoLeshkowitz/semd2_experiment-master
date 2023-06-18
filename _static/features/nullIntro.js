function renderIntroPage(){
    const jsxCode =`
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
                                You will learn about the game and allocation process while playing a round of the game.
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
                                For example, if you want to rank Prize A first, Prize B second, Prize C third and Prize D fourth, type “A” followed by “B” followed by “C” followed by “D.”
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
            },
            {
                type: 'allocationResults',
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
            },
        ],
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
// $("#submit-btn").click(function () {
//     $("#step-11 .incorrect-msg").hide();
//
//     var humanPlayerRanking = [parseInt(forminputs.first_priority.value) - 1, parseInt(forminputs.second_priority.value) - 1, parseInt(forminputs.third_priority.value) - 1, parseInt(forminputs.fourth_priority.value) - 1]
//
//     var unique = humanPlayerRanking.filter((value, index, array) => array.indexOf(value) === index);
//     if (unique.length < 4) {
//         $("#step-11 .incorrect-msg").show();
//         return;
//     }
//     /* disbale inout element */
//     $("#id_player_bid_text").prop('disabled', true);
//
//     $(this).hide();
//
//     var playersRankings = [humanPlayerRanking].concat(otherPlayersRankings);
//
//     liveSend({
//         "preferences": [playersRankings, prizesPriorities], "prizes": prizes, "values": prizesValues
//     });
//
//     $("#step-12").slideDown();
//     button = document.getElementById('proceed-step-13-btn');
//     button.scrollIntoView(true);
// });