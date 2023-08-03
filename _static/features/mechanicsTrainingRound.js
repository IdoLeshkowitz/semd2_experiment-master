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
        const propertiesSteps = (variant,roundNumber) => {
            function rankingChangeFeedback(variant,feedbackNumber,x,y){
                if (feedbackNumber === 1){
                    if (variant === "menu"){
                        return(
                            <span>
                               Correct! Given that you originally ranked Prize {x} above Prize {y} but got Prize {y}, Prize {x} is not an Obtainable Prize. Hence, <b>no ranking</b> could possibly get you Prize {x}.
                            </span>
                        )
                    }
                    if (variant === "traditional"){
                        return <span>Correct! Given that you originally ranked Prize {x} above Prize {y} but got Prize {y}, <b>no ranking</b> could possibly get you Prize {x}. </span>
                    }
                }
                if (feedbackNumber === 2){
                    if (variant === "menu"){
                        return (
                            <span>
                                Correct! Given that you originally ranked Prize {y} above Prize {x} but got Prize {y}, Prize {x} <b>could</b> be an Obtainable Prize. Hence, an alternative ranking could possibly get you Prize {x}.
                            </span>
                        )
                    }
                    if (variant === "traditional"){
                        return <span>Correct! Given that you originally ranked Prize {y} above Prize {x} and got Prize {y}, an alternative ranking <b>could</b> possibly get you Prize {x}.</span>
                    }
                }
                if (feedbackNumber === 3){
                    if (variant === "menu"){
                        return (
                            <span>
                                Correct! Given that you originally got Prize {y}, Prize {y} is an Obtainable Prize. Since you still rank Prize {y} above Prize {x}, you <b>cannot</b> possibly get Prize {x}.
                            </span>
                        )
                    }
                    if (variant === "traditional"){
                        return <span>Correct! If you would have gotten Prize {x} when submitting this new ranking, then getting Prize {y} by submitting your original ranking would have been <b>impossible</b>, since Prize {y} is ranked higher in this new ranking than Prize {x}.</span>
                    }
                }
                if (feedbackNumber === 4){
                    if (variant === "menu"){
                        return (
                            <span>
                                Correct! Given that you originally ranked Prize {y} last and got it, it is the only Obtainable Prize. Hence every possible alternative ranking would only get you Prize {y}.
                            </span>
                        )
                    }
                    if (variant === "traditional"){
                        return <span>Correct! Given that you originally ranked Prize {y} last and got it, every possible alternative ranking would only get you Prize {y}. </span>
                    }
                }
                if (feedbackNumber === 5){
                    return (
                        <span>
                            Correct! The ranking that you originally submitted gets you Prize {y}.
                        </span>
                    )
                }
                if (feedbackNumber === 6){
                    if (variant === "menu"){
                        return (
                            <span>
                                Correct! Given that you originally ranked Prize {y} first and got it, Prize {y} is an Obtainable Prize. Hence an alternative ranking that ranks Prize {y} lower could still possibly get you Prize {y}, but it may also get you a different, higher-ranked, prize if that prize is also an Obtainable Prize.
                            </span>
                        )
                    }
                    if (variant === "traditional"){
                        return <span>Correct! Given that you originally ranked Prize {y} first and got it, an alternative ranking that ranks Prize {y} lower could still possibly get you Prize {y}, but it may also get you a different, higher-ranked, prize.</span>
                    }
                }
            }
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
            if (variant === "menu") {
                if (roundNumber === 1){
                    output.push(
                        {
                            id: "questions_intro",
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome. 
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),
                            type : "information",
                            sectionRef : React.createRef(null),
                        },
                        {
                            id : "questions_intro_2",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div>
                                    <p>
                                        In all the following questions, imagine the computer has already determined some prize priorities and rankings of the other, computerized participants, so that the only component left undecided is your own ranking.<br/>
                                        Please determine whether the following statements are true or false:
                                    </p>
                                </div>  
                            ),     
                        },
                        {
                            type : "component",
                            id : "general_property",
                            content : (
                                <>
                                    <div className="question">
                                        The allocation process first determines the Obtainable Prizes, which I <b>cannot affect with my own ranking</b>. Then, I always get the Obtainable Prize that is <b>placed highest in the ranking I submitted</b>.<br/> 
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question 
                                        type ="radio"
                                        id="general_property"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
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
                                                Correct! In the allocation process, the group of Obtainable Prizes that you might receive is determined using only the other participants’ rankings and the prize priorities. Then, from among the Obtainable Prizes, you get the one that you ranked highest.<br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }  
                                    />
                                </>
                           ),
                            sectionRef : React.createRef(null), 
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
                                        Submitting some ranking <b>cannot</b> ensure that I will get the <b>highest-rank</b> prize in that ranking, but it <b>does</b> ensure that I will <b>not</b> get the <b>lowest-rank</b> prize in that ranking.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="radio"
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
                                        Imagine I have a low priority for getting Prize A, which is the prize I want the most, but I have a high priority for getting Prize B, which I want the second most. Then, submitting a ranking that places Prize A first and Prize B second may lead to missing out on both prizes A and B, while submitting a different ranking could have gotten me Prize B. <br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="radio"
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
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. This means that both Prize A and Prize B are <b>non-Obtainable</b>. Remember that submitting different, alternative rankings would have no effect on your Obtainable Prizes, and cannot get you neither of these prizes. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your specific priorities for getting these prizes.</b>
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. This means that both Prize A and Prize B are <b>non-Obtainable</b>. Remember that submitting different, alternative rankings would have no effect on your Obtainable Prizes, and cannot get you neither of these prizes. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your specific priorities for getting these prizes.</b><br/>
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
                                            <b>Remember: You submitted the ranking C–B–A–D, and ended up getting Prize A</b>. Imagine you had instead submitted a different ranking (while all prize priorities and other participants’ rankings remained the same).
                                            Which of the following is true? (select one answer)<br/>
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
                                            expectedAnswerIndex = {3}
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
                if (roundNumber === 2){
                    output.push(
                        {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                        {
                            id : "submitted_ranking_reminder",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content :(
                                <>
                                    <p>
                                        <b>Remember: You submitted the ranking A–B–D–C, and ended up getting Prize B.</b>
                                    </p>
                                    <p>
                                        Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                        Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                    </p>    
                                </>
                            )
                        },
                        {
                            id : "ranking_change_1",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_1"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                {rankingChangeFeedback(variant,1,"A","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                            />
                                    </div>
                                </>
                            ),               
                        },
                        {
                            id : "ranking_change_2",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_2"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"D","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"D","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id : "ranking_change_3",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_3"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />  
                                    </div>
                                </>
                            ),        
                        },
                        {
                            id : "ranking_change_4",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_4"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),                      
                        },
                        {
                            id : "ranking_change_5",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_5"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id: "brute_force_info",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div className="explain">
                                    <p>
                                        Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                    </p>
                                    <p>
                                        Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                    </p> 
                                    <p>
                                        <b>(Remember: You submitted the ranking A–B–D–C, and ended up getting Prize B.)</b>
                                    </p>
                                    <p>
                                        Choose the correct answer below:
                                    </p>
                                </div>
                            ),
                        },
                        {
                            id : "brute_force_a",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_a"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {2}
                                    label = "Prize A (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"A","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"A","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_b",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_b"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {0}
                                    label = "Prize B (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_c",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_c"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize C (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_d",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_d"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize D (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"D","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"D","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),      
                        }
                    )
                }
                if (roundNumber === 3){
                    output.push(
                        {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                        {
                            id : "submitted_ranking_reminder",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content :(
                                <>
                                    <p>
                                        <b>Remember: You submitted the ranking D–B–C–A, and ended up getting Prize A.</b>
                                    </p>
                                    <p>
                                        Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                        Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                    </p>    
                                </>
                            )
                        },
                        {
                            id : "ranking_change_1",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_1"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                            />
                                    </div>
                                </>
                            ),               
                        },
                        {
                            id : "ranking_change_2",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_2"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id : "ranking_change_3",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_3"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />  
                                    </div>
                                </>
                            ),        
                        },
                        {
                            id : "ranking_change_4",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_4"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),                      
                        },
                        {
                            id : "ranking_change_5",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_5"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,4,null,"A")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id: "brute_force_info",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div className="explain">
                                    <p>
                                        Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                    </p>
                                    <p>
                                        Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                    </p> 
                                    <p>
                                        <b>(Remember: You submitted the ranking D–B–C–A, and ended up getting Prize A.)</b>
                                    </p>
                                    <p>
                                        Choose the correct answer below:
                                    </p>
                                </div>
                            ),
                        },
                        {
                            id : "brute_force_a",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_a"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {0}
                                    label = "Prize A (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"A")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"A")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_b",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_b"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {2}
                                    label = "Prize B (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"B","A")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"B","A")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_c",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_c"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {2}
                                    label = "Prize C (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"C","A")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"C","A")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_d",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_d"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {2}
                                    label = "Prize D (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"D","A")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"D","A")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),      
                        }
                    )
                }
                if (roundNumber === 4){
                    output.push(
                        {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                        {
                            id : "submitted_ranking_reminder",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content :(
                                <>
                                    <p>
                                        <b>Remember: You submitted the ranking D–B–C–A, and ended up getting Prize D.</b>
                                    </p>
                                    <p>
                                        Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                        Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                    </p>    
                                </>
                            )
                        },
                        {
                            id : "ranking_change_1",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_1"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"A","D")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"A","D")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                            />
                                    </div>
                                </>
                            ),               
                        },
                        {
                            id : "ranking_change_2",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_2"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,6,null,"D")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,6,null,"D")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id : "ranking_change_3",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_3"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","D")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","D")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />  
                                    </div>
                                </>
                            ),        
                        },
                        {
                            id : "ranking_change_4",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_4"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"A","D")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"A","D")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),                      
                        },
                        {
                            id : "ranking_change_5",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_5"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","D")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","D")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id: "brute_force_info",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div className="explain">
                                    <p>
                                        Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                    </p>
                                    <p>
                                        Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                    </p> 
                                    <p>
                                        (Remember: You submitted the ranking D–B–C–A, and ended up getting Prize D.)
                                    </p>
                                    <p>
                                        Choose the correct answer below:
                                    </p>
                                </div>
                            ),
                        },
                        {
                            id : "brute_force_a",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_a"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize A (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"A","D")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"A","D")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_b",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_b"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize B (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"B","D")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"B","D")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_c",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_c"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize C (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","D")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","D")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_d",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_d"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {0}
                                    label = "Prize D (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"D")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"D")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),      
                        }
                    )
                }
            }
            if (variant === "traditional"){
                if (roundNumber === 1){
                    output.push(
                        {
                            id: "questions_intro",
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome. 
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),
                            type : "information",
                            sectionRef : React.createRef(null),
                         },
                        {
                            id : "questions_intro_2",
                            content : (
                                <div>
                                    <p>
                                        In all the following questions, imagine the computer has already determined some prize priorities and rankings of the other, computerized participants, so that the only component left undecided is your own ranking.<br/>
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
                                       Submitting any ranking of prizes that I consider always gets me a prize <b>at least as high according to that ranking</b> compared to the prize I would have gotten if I had submitted any different, alternative ranking.<br/>
                                       (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question 
                                        type ="radio"
                                        id="general_property"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div> 
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                Correct! The prize you get if you submit any different, alternative ranking can only be <b>the same</b> as the prize you get when submitting a ranking that follows that order, or some prize that is ranked <b>lower according to that order</b>.
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! The prize you get if you submit any different, alternative ranking can only be <b>the same</b> as the prize you get when submitting a ranking that follows that order, or some prize that is ranked <b>lower according to that order</b>.<br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        } 
                                    />
                                </>
                           ),
                        },
                        {
                            id: "mechanism_misconception_1",
                            type : "component",
                            content : (
                                <>
                                    <div className="question">
                                        Submitting some ranking <b>cannot</b> ensure that I will get the <b>highest-rank</b> prize in that ranking, but it <b>does</b> ensure that I will <b>not</b> get the <b>lowest-rank</b> prize in that ranking.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="radio"
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
                                                Correct! The allocation process only ensures you a prize <b>at least as highly ranked in your submitted ranking</b> compared to the prize you would get if you submitted some different, alternative ranking. On some occasions, <b>the prize you get may be the one you ranked lowest.</b>
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! The allocation process only ensures you a prize <b>at least as highly ranked in your submitted ranking</b> compared to the prize you would get if you submitted some different, alternative ranking. On some occasions, <b>the prize you get may be the one you ranked lowest.</b><br/>
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
                                        Imagine I have a low priority for getting Prize A, which is the prize I want the most, but I have a high priority for getting Prize B, which I want the second most. Then, submitting a ranking that places Prize A first and Prize B second may lead to missing out on both prizes A and B, while submitting a different ranking could have gotten me Prize B. <br/>
                                        (Get it right on first try to increase your bonus)
                                    </div>
                                    <Question
                                        type ="radio"
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
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. Remember that submitting different, alternative rankings can only get you that <b>same prize</b>, or some other <b>lower prize</b> according to your original ranking. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your specific priorities for getting these prizes.</b>
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                Correct! Imagine submitting a ranking that places Prize A first and Prize B second, but getting some prize other than Prize A or Prize B. Remember that submitting different, alternative rankings can only get you that <b>same prize</b>, or some other <b>lower prize</b> according to your original ranking. Hence, no alternative ranking can get you Prize A or Prize B. This is true <b>regardless of your specific priorities for getting these prizes.</b><br/>
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
                                            <b>Remember: You submitted the ranking C–B–A–D, and ended up getting Prize A</b>. Imagine you had instead submitted a different ranking (while all prize priorities and other participants’ rankings remained the same).
                                            Which of the following is true? (select one answer)<br/>
                                            (Hint: think about a considered ranking and alternative rankings.)<br/>
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
                                            expectedAnswerIndex = {3}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    Correct! Submitting a ranking different from C–B–A–D could have only gotten you the <b>same prize</b> as when submitting the ranking C–B–A–D, that is, Prize A, or some prize <b>lower</b> on the original ranking—Prize D. In other words, no alternative, different ranking could have gotten you Prize C or Prize B.
                                                </div> 
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    Correct! Submitting a ranking different from C–B–A–D could have only gotten you the <b>same prize</b> as when submitting the ranking C–B–A–D, that is, Prize A, or some prize <b>lower</b> on the original ranking—Prize D. In other words, no alternative, different ranking could have gotten you Prize C or Prize B.<br/>
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
                if (roundNumber === 2){
                    output.push(
                        {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                        {
                            id : "submitted_ranking_reminder",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content :(
                                <>
                                    <p>
                                        <b>Remember: You submitted the ranking A–B–D–C, and ended up getting Prize B.</b>
                                    </p>
                                    <p>
                                        Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                        Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                    </p>    
                                </>
                            )
                        },
                        {
                            id : "ranking_change_1",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_1"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                {rankingChangeFeedback(variant,1,"A","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                            />
                                    </div>
                                </>
                            ),               
                        },
                        {
                            id : "ranking_change_2",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                            If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                            (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_2"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"D","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"D","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id : "ranking_change_3",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_3"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,3,"C","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />  
                                    </div>
                                </>
                            ),        
                        },
                        {
                            id : "ranking_change_4",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_4"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {1}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,1,"A","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),                      
                        },
                        {
                            id : "ranking_change_5",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <>
                                    <div className="question">
                                        <p>
                                        If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                        </p>
                                        <Question
                                            type ="radio"
                                            id="ranking_change_5"
                                            options = {["True","False"]}
                                            expectedAnswerIndex = {0}
                                            incorrectMsg = {
                                                <div className="incorrect-msg">
                                                    Incorrect answer. Please try again.
                                                </div>
                                            }
                                            correctMsg = {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","B")}
                                                </div>
                                            }
                                            correctFirstMsg= {
                                                <div className="correct-msg">
                                                    {rankingChangeFeedback(variant,2,"C","B")}
                                                    <br/>
                                                    Good job on the first try! This will count for your Understanding Bonus.
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                            ),
                        },
                        {
                            id: "brute_force_info",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div className="explain">
                                    <p>
                                        Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                    </p>
                                    <p>
                                        Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                    </p> 
                                    <p>
                                        <b>(Remember: You submitted the ranking A–B–D–C, and ended up getting Prize B.)</b>
                                    </p>
                                    <p>
                                        Choose the correct answer below:
                                    </p>
                                </div>
                            ),
                        },
                        {
                            id : "brute_force_a",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_a"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {2}
                                    label = "Prize A (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"A","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,1,"A","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_b",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_b"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {0}
                                    label = "Prize B (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,5,null,"B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_c",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_c"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize C (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"C","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),
                        },
                        {
                            id : "brute_force_d",
                            type : "component",
                            sectionRef : React.createRef(null),
                            content : (
                                <Question
                                    type ="radio"
                                    id="brute_force_d"
                                    options = {["Definitely included","Possibly included","Definitely not included"]}
                                    expectedAnswerIndex = {1}
                                    label = "Prize D (Get it right on first try to increase your bonus)"
                                    incorrectMsg = {
                                        <div className="incorrect-msg">
                                            Incorrect answer. Please try again.
                                        </div>
                                    }   
                                    correctMsg = {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"D","B")}
                                        </div>
                                    }
                                    correctFirstMsg= {
                                        <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"D","B")}
                                            <br/>
                                            Good job on the first try! This will count for your Understanding Bonus.
                                        </div>
                                    }
                                />
                            ),      
                        }
                    )
                }
                if (roundNumber === 3){
                output.push(
                    {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                    {
                        id : "submitted_ranking_reminder",
                        type : "information",
                        sectionRef : React.createRef(null),
                        content :(
                            <>
                                <p>
                                    <b>Remember: You submitted the ranking D–B–C–A, and ended up getting Prize A.</b>
                                </p>
                                <p>
                                    Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                    Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                </p>    
                            </>
                        )
                    },
                    {
                        id : "ranking_change_1",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_1"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                            {rankingChangeFeedback(variant,4,null,"A")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                        />
                                </div>
                            </>
                        ),               
                    },
                    {
                        id : "ranking_change_2",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_2"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        id : "ranking_change_3",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                    If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_3"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />  
                                </div>
                            </>
                        ),        
                    },
                    {
                        id : "ranking_change_4",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                    If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_4"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),                      
                    },
                    {
                        id : "ranking_change_5",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                    If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_5"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,4,null,"A")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        id: "brute_force_info",
                        type : "information",
                        sectionRef : React.createRef(null),
                        content : (
                            <div className="explain">
                                <p>
                                    Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                </p>
                                <p>
                                    Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                </p> 
                                <p>
                                    <b>(Remember: You submitted the ranking D–B–C–A, and ended up getting Prize A.)</b>
                                </p>
                                <p>
                                    Choose the correct answer below:
                                </p>
                            </div>
                        ),
                    },
                    {
                        id : "brute_force_a",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_a"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {0}
                                label = "Prize A (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,5,null,"A")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,5,null,"A")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_b",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_b"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {2}
                                label = "Prize B (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"B","A")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"B","A")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_c",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_c"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {2}
                                label = "Prize C (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }   
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"C","A")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"C","A")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_d",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_d"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {2}
                                label = "Prize D (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }   
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"D","A")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,1,"D","A")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),      
                    }
                )
            }
                if (roundNumber === 4){
                output.push(
                    {
                            id: "questions_intro",
                            type : "information",
                            sectionRef : React.createRef(null),
                            content : (
                                <div class="explain">
                                    <p>
                                        In this training round, you will answer a few questions about the Key Principle of your ranking and about this round’s outcome.
                                        Remember: each question will count for your Understanding Bonus only if you answer it correctly on your first attempt. Think about your answers carefully!
                                    </p>
                                </div>
                            ),      
                        },
                    {
                        id : "submitted_ranking_reminder",
                        type : "information",
                        sectionRef : React.createRef(null),
                        content :(
                            <>
                                <p>
                                    <b>Remember: You submitted the ranking D–B–C–A, and ended up getting Prize D.</b>
                                </p>
                                <p>
                                    Imagine you had instead submitted a different ranking, while all prize priorities and other participants’ rankings remained the same.<br/>
                                    Given the <b>Key Principle</b> of your ranking, which of the following might be true?
                                </p>    
                            </>
                        )
                    },
                    {
                        id : "ranking_change_1",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_1"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                            {rankingChangeFeedback(variant,2,"A","D")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"A","D")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                        />
                                </div>
                            </>
                        ),               
                    },
                    {
                        id : "ranking_change_2",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize D.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_2"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,6,null,"D")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,6,null,"D")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        id : "ranking_change_3",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                        If I had instead submitted A–D–B–C, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                        (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_3"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {1}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,3,"C","D")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,3,"C","D")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />  
                                </div>
                            </>
                        ),        
                    },
                    {
                        id : "ranking_change_4",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                    If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize A.<br/>
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_4"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"A","D")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"A","D")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),                      
                    },
                    {
                        id : "ranking_change_5",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <>
                                <div className="question">
                                    <p>
                                    If I had instead submitted C–A–B–D, then it is possible (or certain) that I would have gotten Prize C.<br/>
                                    (Get it right on first try to increase your bonus)
                                    </p>
                                    <Question
                                        type ="radio"
                                        id="ranking_change_5"
                                        options = {["True","False"]}
                                        expectedAnswerIndex = {0}
                                        incorrectMsg = {
                                            <div className="incorrect-msg">
                                                Incorrect answer. Please try again.
                                            </div>
                                        }
                                        correctMsg = {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"C","D")}
                                            </div>
                                        }
                                        correctFirstMsg= {
                                            <div className="correct-msg">
                                                {rankingChangeFeedback(variant,2,"C","D")}
                                                <br/>
                                                Good job on the first try! This will count for your Understanding Bonus.
                                            </div>
                                        }
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        id: "brute_force_info",
                        type : "information",
                        sectionRef : React.createRef(null),
                        content : (
                            <div className="explain">
                                <p>
                                    Imagine you are able to try submitting many different possible rankings, while the prize priorities and other participants’ rankings remain the same.
                                </p>
                                <p>
                                    Imagine that you try out and submit <b>every</b> possible ranking.<br/> 
                                        After each such submission, you write down the prize that this submission gets you.<br/>
                                        You end up with a log of some, but possibly not all, of the prizes.<br/>
                                        Think about each of the prizes: is that prize <b>definitely</b> included in the log, <b>possibly</b> included in the log, or <b>definitely not</b> included in the log?
                                </p> 
                                <p>
                                    <b>(Remember: You submitted the ranking D–B–C–A, and ended up getting Prize D.)</b>
                                </p>
                                <p>
                                    Choose the correct answer below:
                                </p>
                            </div>
                        ),
                    },
                    {
                        id : "brute_force_a",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_a"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {1}
                                label = "Prize A (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"A","D")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"A","D")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_b",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_b"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {1}
                                label = "Prize B (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"B","D")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"B","D")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_c",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_c"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {1}
                                label = "Prize C (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }   
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"C","D")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,2,"C","D")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        id : "brute_force_d",
                        type : "component",
                        sectionRef : React.createRef(null),
                        content : (
                            <Question
                                type ="radio"
                                id="brute_force_d"
                                options = {["Definitely included","Possibly included","Definitely not included"]}
                                expectedAnswerIndex = {0}
                                label = "Prize D (Get it right on first try to increase your bonus)"
                                incorrectMsg = {
                                    <div className="incorrect-msg">
                                        Incorrect answer. Please try again.
                                    </div>
                                }   
                                correctMsg = {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,5,null,"D")}
                                    </div>
                                }
                                correctFirstMsg= {
                                    <div className="correct-msg">
                                        {rankingChangeFeedback(variant,5,null,"D")}
                                        <br/>
                                        Good job on the first try! This will count for your Understanding Bonus.
                                    </div>
                                }
                            />
                        ),      
                    }
                )
            }
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
        React.useEffect(()=>{
            const urls = Object.values(imgUrls);
            urls.forEach(url=>{
                const img = new Image();
                img.src = url;
            })
        },[])
        return (
            <OnProceedContext.Provider value={onProceed}>
                <SendNextStepIdContext.Provider value={sendNextStepId}>
                    <MistakesCounterContext.Provider value={props.mistakesCounter ?? null}>
                        <>
                            {modals.prizes && <PrizesModal onClose={()=>{setModals({...modals,prizes:false})}}/>}
                            {modals.ranking && <RankingModal onClose={()=>{setModals({...modals,ranking:false})}}/>}
                            {modals.study && <StudyModal onClose={()=>{setModals({...modals,study:false})}}/>}
                            {modals.priorities && <PrioritiesModal onClose={()=>{setModals({...modals,priorities:false})}}/>}
                            {modals.allocation && <AllocationModal variant={props.variant}  treatment={props.treatment} onClose={()=>{setModals({...modals,allocation:false})}} variant = {props.variant}/>}
                                <button type="button" className="button-2" onClick={()=>{setModals({...modals,study:true})}}  style={{marginBottom:'1rem',display:"block"}}>Click for a general reminder on this study</button>
                                <button type="button" className="button-2" onClick={()=>{setModals({...modals,allocation:true})}}  style={{marginBottom:'1rem'}}>
                                    { props.treatment === "mechanics" ?
                                        "Click for a reminder on the technical details of the allocation process"
                                        : 
                                        "Click for a reminder on the Key Principle of your ranking"
                                    }
                                </button>
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
                                                    <AllocationResults onClick={onProceed} treatment={props.treatment} allocatedPrize={props.allocatedPrize} roundNumber={props.roundNumber}/>
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
                        { props.roundNumber === 1 && 
                            <><span>Since this is the first time, we will help with hints along the way.</span><br/></>
                        }
                        Click on the button below to start.
                    </p>
                    : 
                    <p>
                        <b>You get Prize {props.allocatedPrize}.</b>
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
                    <p>The allocation process attempts to give each participant a prize that they ranked higher rather than a prize that they ranked lower. However, this is not always possible, since the allocation process must take into account the rankings of all participants.</p>
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
                    The higher your priority is for getting some prize, the more likely you generally are to get that prize at the end of the process.
                    </p>
                    <p>Each column shows the priorities of all participants for getting some prize, written from highest to lowest.</p>
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
        if (props.treatment === "mechanics"){
            return (
                <div class="modal" id="GenModal" onClick={props.onClose} style={{display:'block'}}>
                    <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                        <span class="close" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</span>
                        {
                            props.variant === "traditional" && 
                             <div>
                                <p>
                                   <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                                   Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                                </p><br/>
                                <h5 style={{fontSize:'1.25rem'}}>Overview of allocation process</h5>
                                <p>
                                    The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                                    <img src={imgUrls.trad} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                                </p><br/>
                                <h5 style={{fontSize:'1.25rem'}}>Details of allocation process</h5>
                                <p>
                                    The allocation process is a multi-step process , as follows:
                                </p>
                                <ol>
                                    <li>
                                        In the first step, each participant is paired to their <b>highest</b>-rank prize.
                                    </li>
                                    <li>
                                        <p>
                                            In the next step, possible conflicts are detected and solved.<br/>
                                            If two (or more) participants are paired to the same prize, this is a <b>conflict</b>.<br/>
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
                                    <b>These details are important to learn:</b> You may be able to apply your knowledge of them to make better decisions in the upcoming real rounds of this study.<br/>
                                    Some details may seem confusing at first. This is quite natural! But don’t worry, we will show you step-by-step examples. Things will become clearer along the way.
                                </p><br/>
                                <h5 style={{fontSize:'1.25rem'}}>Overview of allocation process</h5>
                                <p>
                                    The prize you get is determined using an allocation process with two main steps:
                                    <ol>
                                        <li>The computer determines some group of <b>Obtainable Prizes</b> that you might receive. Your own ranking does not influence the Obtainable Prizes. Instead, they are determined using only the prize priorities and the rankings of the other participants.</li>
                                        <li>You get the Obtainable Prize that you <b>ranked highest</b> (in the ranking you submitted).</li>
                                    </ol> 
                                </p><br/>
                                <p style={{color: "#0b1ae3"}}>
                                    <b>The important principle</b>: Your own ranking does <b>not</b> influence what the Obtainable Prizes are, but it <b>does</b> determine what you get from among the Obtainable Prizes—you get the Obtainable Prize that you ranked the <b>highest.</b>
                                </p>
                                <p>
                                    The following image illustrates how your own ranking, the rankings of the other participants and the prize priorities affect the prize you get:
                                    <img src={imgUrls.menu} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                                </p>
                                <h5 style={{fontSize:'1.25rem'}}>Details of allocation process</h5>
                                <h6><b>Priorities and rankings → Temporary allocation → Obtainable Prizes</b></h6>
                                <p>
                                    The allocation process begins with a multi-step process. This process  determines a “temporary allocation” of prizes to all participants <b>except for you</b>, and then determines your Obtainable Prizes based on this temporary allocation. This process <b>does not involve your own submitted ranking</b>, and works as follows (it may look complicated, but don’t worry, we will rehearse this in a moment):
                                </p>
                                <ol>
                                    <li>
                                        <p>
                                             In the first step, each prize is paired to its <b>highest</b>-priority participant, among all participants <b>except for you.</b>
                                        </p>
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
                                                    <b>Re-pair:</b> all unpaired prizes can only get re-paired to participants that they were not paired with before, and who are not you. Each unpaired prize is re-paired to its <b>highest</b>-priority participant, among the participants they <b>were not yet paired with</b> and <b>except for you.</b>
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
                                    Each prize except for the unpaired one is then <b>temporarily allocated</b> to the participant it is paired to.<br/>
                                </p>
                                <p>
                                    The other participants do not get their prize from the temporary allocation; their prizes are determined by some other process.
                                </p>
                                <p>
                                    Instead, the temporary allocation is used to determine your Obtainable Prizes.
                                </p>
                                <p>
                                    Next, we will tell you how the <b>Obtainable Prizes</b> are determined from the temporary allocation.<br/>
                                    In this temporary allocation, no prize was allocated to you. To determine which prize is allocated to you, the computer first determines which prizes you can obtain in principle. These are the <b>Obtainable Prizes.</b><br/>
                                    You can obtain two kinds of prizes:
                                    <ol>
                                        <li>Any prize for which <b>your priority is higher</b> than that of the participant it is temporarily allocated to.</li>
                                        <li><b>The prize that was left unpaired in the temporary allocation.</b></li>
                                    </ol>
                                    You cannot obtain any other prizes.
                                </p>
                                <h6><b>Obtainable Prizes → The prize you get</b></h6>
                                
                                <p>
                                    Finally, we will remind you how the prize you get is selected from among the Obtainable Prizes, using your ranking.<br/>
                                    In fact, this is the <b>only</b> time the allocation process uses your ranking. 
                                </p>   
                                <p>
                                    From among the Obtainable Prizes, <b>you get the one that you ranked the highest. </b><br/>
                                    In other words, the computer will look through your ranking from top to bottom, and you will get the first prize that is Obtainable.
                                </p>     
                            </div>      
                        }
                    </div>
                </div>
            )
        }
        if (props.treatment === "properties"){
            return (
                <div class="modal" id="GenModal" onClick={props.onClose} style={{display:'block'}}>
                    <div class="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                        <span class="close" onClick={props.onClose} style={{cursor:'pointer'}}>&times;</span>
                        {
                            props.variant === "traditional" && 
                                <section> 
                                    <p>
                                        <b>This principle is important to learn:</b> You may be able to apply your knowledge of it to choose your rankings in the upcoming real rounds of this study.
                                    </p>
                                    <p>
                                        The prize you get is determined using an <b>allocation process</b> that uses your own ranking, the rankings of the other participants, and the prize priorities.<br/>
                                        The following image illustrates this:
                                    </p>
                                    <img src={imgUrls.trad} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>
                                    <p>
                                        Now, imagine that the computer already determined some prize priorities and rankings of the other, computerized participants. The only component left undecided is your own ranking.<br/>
                                        Now, as you decide which ranking to submit, imagine there is some specific ranking that you are considering submitting.
                                        Let’s call it “the considered ranking”.<br/>
                                    </p>
                                     <p style={{color: "#0b1ae3"}}>
                                        <b>The important principle</b>: The prize you get if you submit the considered ranking is the <b>highest</b> that submitting any ranking could get you, <b>according to the considered ranking.</b>
                                    </p>
                                    <p>
                                        In other words, if you submit any alternative ranking, different from the considered ranking, you will either get <b>the same</b> prize you get when submitting the considered ranking, or some prize <b>lower on the considered ranking.</b>
                                    </p>
                                    <p>
                                        No alternative ranking can get you a prize which you rank higher on the considered ranking, compared to the prize you get when you submit the considered ranking.
                                    </p>
                                    <p>
                                        For example, imagine that you submitted the ranking A–B–C–D and ended up getting Prize C. This means that Prize C is the highest possible that you could get on the considered ranking A–B–C–D. Submitting any other, alternative ranking different from A–B–C–D could have only gotten you the same prize, Prize C, or possibly a lower-ranked prize on the considered ranking, Prize D. No other alternative ranking could have gotten you Prize A or Prize B.
                                    </p>
                                </section>
                        }
                        {
                            props.variant === "menu" &&
                                <div>
                                    <p>
                                        <b>This principle is important to learn:</b> You may be able to apply your knowledge of it to choose your rankings in the upcoming real rounds of this study.
                                    </p>
                                    <p>
                                        The prize you get is determined using an allocation process with two main steps:
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
                                        <img src={imgUrls.menu} alt="explanation" style={{width:'100%',padding:'5% 10%'}}/>  
                                    </p>
                                    <p>
                                        For example, imagine that your Obtainable Prizes are C and D. If you submit the ranking A–B–C–D, you will get Prize C, which is the one you ranked highest among the Obtainable Prizes. No ranking you could possibly submit would get you Prize A or Prize B, since the Obtainable Prizes are C and D, and since your own ranking cannot influence the Obtainable Prizes.
                                    </p>
                                </div>      
                        }
                    </div>
                </div>
            )
        }
        return null
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
                    return parseInt(inputRef.current.querySelector('input[type="radio"]:checked')?.value)
                }
                if (props.type === "dropdown"){
                    return parseInt(inputRef.current.querySelector('select')?.value)
                }
            })() ?? -1 
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
                        <> 
                            {props.label && <label>{props.label}</label>}
                            <div ref={inputRef} style={{display:'flex',flexDirection:'column',marginTop: "0.5rem"}}>
                                {
                                    props.options.map((option,index) => {
                                        return (
                                            <div className="form-check" key={index}>
                                                <input className="form-check-input" type="radio" name={props.id+'-radio'} id={props.id+'-radio-'+index} value={index}/>
                                                <label className="form-check-label" htmlFor={props.id+'-radio-'+index}>
                                                    {option}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
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