window.addEventListener('load', renderReflectionPage)


function renderReflectionPage(){
    const jsxCode =`
    function Stam(){
        return <div>hello</div>
    }
    const stringRegex = /^.+$/;
    function ReflectionPage(props){
        const [form, setForm] = React.useState({
            typically_rank: {
                value: null,
                error: null,
                match : stringRegex,
            },
            did_change: {
                value: null,
                error: null,
                match : stringRegex,
            },
            is_explain_help: {
                value: null,
                error: null,
                match : /^1|0$/,
            },
            why_not: {
                value: null,
                error: null,
            },
            why_yes: {
                value: null,
                error: null,
            },
            understand_choose_rankings: {
                value: null,
                error: null,
                match : /^1|2|3|4|5|6|7$/,
            },
            understand_principle: {
                value: null,
                error: null,
                match : /^1|2|3|4|5|6|7$/,
            },
            understand_allocation: {
                value: null,
                error: null,
                match : /^1|2|3|4|5|6|7$/,
            },
            agree_allocation_fare: {
                value: null,
                error: null,
                match : /^1|2|3|4|5|6|7$/,
            },
            agree_allocation_good: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },
            agree_allocation_different: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },
            rely_in_real_life: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },
            allocation_transparent: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },      
            allocation_predictable: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },
            your_ranking_matters: {
                value: null,
                error: null,
                match: /^1|2|3|4|5|6|7$/,
            },
        })
        function handleChange(field, value){
            let fieldState = form[field]
            const match = fieldState.match
            let valid = true
            if (match){
                if (typeof value === "string"){ 
                    valid = match.test(value)
                }
                if (typeof value === "number"){
                    valid = match.test(value.toString())
                }
            }
            fieldState = {
                ...fieldState,
                value: value,
                error: valid ? null : "Invalid input"
            }
            const newForm = {
                ...form,
                [field]: fieldState
            }
            setForm(newForm)
        }
        function handleSubmit(){
            let currentForm = {...form}
            let allCorrect = true
            for (const field in currentForm){
                const fieldState = currentForm[field]
                const match = fieldState.match
                const value = fieldState.value ?? ""
                let valid = true
                if (match){
                    if (typeof value === "string"){
                        valid = match.test(value)
                    }
                    if (typeof value === "number"){
                        valid = match.test(value.toString())
                    }
                }
                if (!valid){
                    fieldState.error = "Invalid input"
                    allCorrect = false
                }
                currentForm[field] = fieldState
            }
            if (allCorrect){
                document.querySelector("form").submit()
            }
            setForm(currentForm)
        }
        return (
            <div className="instructions">
            <p>From this point on we no longer care about right or wrong answers, we are only interested in your <b>honest</b> reflections and opinions.</p>
            <p>None of the questions from this point on will count for your Understanding Bonus.</p>
            <p> Please answer the following questions about your experience playing the game. </p>
            <label htmlFor="typically_rank"> We'll start with a general question: <b>How did you typically rank the four prizes</b> in the 10 real rounds? Please share with us your main considerations, even if you are not sure that you always thought about them all. </label>
            <textarea id="typically_rank" name="typically_rank" rows={3} style={{width: "100%", border:"1px solid lightgrey"}} onChange={(e)=>{handleChange("typically_rank", e.target.value)}}></textarea>
            <div className="btn-container">
                { form.typically_rank.error &&
                    <span id="typically_rank_error" className="text-danger">
                        {form.typically_rank.error}
                    </span>
                }
            </div>
            <label htmlFor="did_change">Did you <b>change</b> the way you rank throughout the game? If so, in which way and at which point?</label>
            <textarea id="did_change" name="did_change" rows={3} style={{width: "100%", border:"1px solid lightgrey"}} onChange={(e)=>{handleChange("did_change", e.target.value)}}></textarea>
            <div className="btn-container">
                { form.did_change.error &&
                    <span id="did_change_error" className="text-danger">
                        {form.did_change.error}
                    </span>
                }
            </div>
            <hr/>
            <div>
                <div className="radio-group">
                    <label htmlFor="is_explain_help">In your view, did the explanations given during the game <b>lead you to use a specific method</b> of ranking the four prizes?</label>
                    <div>
                        <input 
                            type="radio" 
                            value={0}
                            onChange={()=>{handleChange("is_explain_help", 0)}}
                            name="is_explain_help"   
                            id="is_explain_help_0"
                        />
                        <label htmlFor="is_explain_help_0">No</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            value={1}
                            onChange={()=>{handleChange("is_explain_help", 1)}}
                            name="is_explain_help"
                            id="is_explain_help_1"
                        />
                        <label htmlFor="is_explain_help_1">Yes</label>
                    </div>
                </div>
                <div className="btn-container">
                    { form.is_explain_help.error &&
                        <span id="is_explain_help_error" className="text-danger">
                            {form.is_explain_help.error}
                        </span>
                    }
                </div>
            </div>
            <div>
                <label htmlFor="why_not">
                    <b>If you answered “No” above:</b> Why do you think the explanations did not lead you to use a specific method of ranking the four prizes?
                </label>
                <textarea onChange={(e)=>handleChange("why_not", e.target.value)} id="why_not" name="why_not" rows={3} style={{width: "100%", border:"1px solid lightgrey"}}></textarea>
            </div>
            <div>
                <label htmlFor="why_yes">
                    <b>If you answered “Yes” above:</b> What was that specific ranking method?
                </label>
                <textarea id="why_yes" name="why_yes" rows={3} style={{width: "100%", border:"1px solid lightgrey"}}></textarea>
            </div>
            <hr/>
            <div className="slider-container">
                <p>
                    How well do you think you now understand how to <b>best choose</b> your own ranking?<br/>
                    (Note: you have to drag the sliders below to fill in a response. In case you want to keep a slider in the leftmost position, please drag it and return it to that position.)
                </p>
                <div className="slider-row">
                    <span> I do not understand at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.understand_choose_rankings.value) || 1} name="understand_choose_rankings" id="understand_choose_rankings" onChange={(e)=>handleChange("understand_choose_rankings", e.target.value)} />
                    <span> I understand very well</span>
                </div>
                <span id="understand_choose_rankings_indicator">
                    { form.understand_choose_rankings.value &&
                        <span>{form.understand_choose_rankings.value}</span>
                    }
                </span>
                <div className="btn-container">
                    { form.understand_choose_rankings.error &&
                        <span id="understand_choose_rankings_error" className="text-danger">
                            {form.understand_choose_rankings.error}
                        </span>
                    }
                </div>
            </div>
            <p>
                Note: you have to drag the sliders below to fill in a response. In case you want to keep a slider in the leftmost position, please drag it and return it to that position.
            </p>
            <div className="slider-container">
                <p>
                    How well do you think you now understand the <b>key principle</b> of your ranking?<br/>
                    (Note: you have to drag the sliders below to fill in a response. In case you want to keep a slider in the leftmost position, please drag it and return it to that position.)
                </p>
                <div className="slider-row">
                    <span> I do not understand at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.understand_principle.value) || 1} name="understand_principle" id="understand_principle" onChange={(e)=>handleChange("understand_principle", e.target.value)}/>
                    <span> I understand very well</span>
                </div>
                <span id="understand_principle_indicator">
                    { form.understand_principle.value &&
                        <span>{form.understand_principle.value}</span>
                    }
                </span>
                <div className="btn-container">
                    { form.understand_principle.error &&
                        <span id="understand_principle_error" className="text-danger">
                            {form.understand_principle.error}
                        </span>
                    }
                </div>
            </div>
            <div className="slider-container">
                <p>
                    How well do you think you now understand how the allocation process <b>works</b>?<br/>
                    (Note: you have to drag the sliders below to fill in a response. In case you want to keep a slider in the leftmost position, please drag it and return it to that position.)
                </p>
                <div className="slider-row">
                    <span> I do not understand at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.understand_allocation.value) || 1} name="understand_allocation" id="understand_allocation" onChange={(e)=>handleChange("understand_allocation", e.target.value)}/>
                    <span> I understand very well</span>
                </div>
                <span id="understand_allocation_indicator">
                    { form.understand_allocation.value &&
                        <span>{form.understand_allocation.value}</span>
                    }
                </span>
                <div className="btn-container">
                    { form.understand_allocation.error &&
                        <span id="understand_allocation_error" className="text-danger">
                            {form.understand_allocation.error}
                        </span>
                    }
                </div>
            </div>
            <hr/>
            <p>
                Imagine that the allocation process was used to give prizes to real people in a real-world setting. In particular, suppose that each participant is separately awarded prizes in the same way you were awarded prizes.<br/>
            </p>
            <p className="QuestionHead"> To what extent do you agree with the following statements?</p>
            <div className="slider-container">
                <p>The allocation process always ends with <b>each</b> participant getting a <b>different</b> prize, and <b>each</b> prize given to <b>some</b> participant.</p>
                <div className="slider-row">
                    <span>Completely disagree</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.agree_allocation_different.value) || 1} name="agree_allocation_different" id="agree_allocation_different" onChange={(e)=>handleChange("agree_allocation_different", e.target.value)}/>
                    <span>Completely agree</span>
                </div>
                <span id="agree_allocation_different_indicator">
                    { form.agree_allocation_different.value &&
                        <span>{form.agree_allocation_different.value}</span>
                    }
                </span>
                { form.agree_allocation_different.error &&
                    <span id="agree_allocation_different_error" className="text-danger">
                        {form.agree_allocation_different.error}
                    </span>
                }    
            </div>
            <div className="slider-container">
                <p>For a process that has to produce an allocation from given prize priorities and participants’ rankings, the allocation process is <b>fair.</b></p>
                <div className="slider-row">
                    <span>Completely disagree</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.agree_allocation_fare.value) || 1} name="agree_allocation_fare" id="agree_allocation_fare" onChange={(e)=>handleChange("agree_allocation_fare", e.target.value)}/>
                    <span>Completely agree</span>
                </div>
                <span id="agree_allocation_fare_indicator">
                    { form.agree_allocation_fare.value &&
                        <span>{form.agree_allocation_fare.value}</span>
                    }
                </span>
                { form.agree_allocation_fare.error &&
                    <span id="agree_allocation_fare_error" className="text-danger">
                        {form.agree_allocation_fare.error}
                    </span>
                }
            </div>
            
            <div className="slider-container">
                <p>For a process that has to produce an allocation from given prize priorities and participants’ rankings, the allocation process is <b>an overall good way</b> to allocate the prizes.</p>
                <div className="slider-row">
                    <span>Completely disagree</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.agree_allocation_good.value) || 1} name="agree_allocation_good" id="agree_allocation_good" onChange={(e)=>handleChange("agree_allocation_good", e.target.value)}/>
                    <span>Completely agree</span>
                </div>
                <span id="agree_allocation_good_indicator">
                    { form.agree_allocation_good.value &&
                        <span>{form.agree_allocation_good.value}</span>
                    }
                </span>
                { form.agree_allocation_good.error &&
                    <span id="agree_allocation_good_error" className="text-danger">
                        {form.agree_allocation_good.error}
                    </span>
                }
            </div>
            <div className="slider-container">
                <p>How much would you be willing to <b>rely on the allocation process</b> in an important situation in real life (for example, assignment of students to public schools)?</p>
                <div className="slider-row">
                    <span>Very unwilling</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.rely_in_real_life.value) || 1} name="rely_in_real_life" id="rely_in_real_life" onChange={(e)=>handleChange("rely_in_real_life", e.target.value)}/>
                    <span>Very willing</span>
                </div>
                <span id="rely_in_real_life_indicator">
                    { form.rely_in_real_life.value &&
                        <span>{form.rely_in_real_life.value}</span>
                    }
                </span>
                { form.rely_in_real_life.error &&
                    <span id="rely_in_real_life_error" className="text-danger">
                        {form.rely_in_real_life.error}
                    </span>
                }
            </div>
            <div className="slider-container">
                <p>How <b>transparent is the allocation process</b>, meaning that you received a full explanation of how the allocation process really works, and no details were kept away from you?</p>
                <div className="slider-row">
                    <span>Not transparent at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.allocation_transparent.value) || 1} name="allocation_transparent" id="allocation_transparent" onChange={(e)=>handleChange("allocation_transparent", e.target.value)}/>
                    <span>Completely transparent</span>
                </div>
                <span id="allocation_transparent_indicator">
                    { form.allocation_transparent.value &&
                        <span>{form.allocation_transparent.value}</span>
                    }
                </span>
                { form.allocation_transparent.error &&
                    <span id="allocation_transparent_error" className="text-danger">
                    {form.allocation_transparent.error}
                    </span>
                }
            </div>
            <div className="slider-container">
                <p>How <b>predictable</b> is the final allocation?</p>
                <div className="slider-row">
                    <span>Not predictable at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.allocation_predictable.value) || 1} name="allocation_predictable" id="allocation_predictable" onChange={(e)=>handleChange("allocation_predictable", e.target.value)}/>
                    <span>Completely predictable</span>
                </div>
                <span id="allocation_predictable_indicator">
                    { form.allocation_predictable.value &&
                        <span>{form.allocation_predictable.value}</span>
                    }
                </span>
                { form.allocation_predictable.error &&
                    <span id="allocation_predictable_error" className="text-danger">
                        {form.allocation_predictable.error}
                    </span>
                }
            </div>
            <div className="slider-container">
                <p>To what extent do you think that <b>your submitted ranking matters</b> for the final allocation?</p>
                <div className="slider-row">
                    <span>Not at all</span>
                    <input required type="range" min={1} max={7} value={parseInt(form.your_ranking_matters.value) || 1} name="your_ranking_matters" id="your_ranking_matters" onChange={(e)=>handleChange("your_ranking_matters", e.target.value)}/>
                    <span>Very much</span>
                </div>
                <span id="your_ranking_matters_indicator">
                    { form.your_ranking_matters.value &&
                        <span>{form.your_ranking_matters.value}</span>
                    }
                </span>
                { form.your_ranking_matters.error &&
                    <span id="your_ranking_matters_error" className="text-danger">
                        {form.your_ranking_matters.error}
                    </span>
                }
            </div>
            <hr/>
            <div className="btn-container">
                <button className="btn btn-primary" id="Next" type="button" onClick={handleSubmit}>
                    Next
                </button>
            </div>
        </div>
        )
    }
    `
    renderReactComponent(jsxCode,"react-root", "ReflectionPage", JSON.stringify({...js_vars}))
}