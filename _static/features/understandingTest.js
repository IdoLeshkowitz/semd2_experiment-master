function renderUnderstandingTestPage(){
    const jsxCode = `
    function Stam(){
        return <div>Stam</div>
    }
    const pages = [
        <FirstPage/>,
        <SecondPage/>,
        <ThirdPage/>,
        <FourthPage/>,
    ]
    const CurrencyContext = React.createContext(props.currency)
    const StepForwardContext = React.createContext(null)
    function UnderstandingTest(props){
        const [page, setPage] = React.useState(props.pageIndex ?? 0)
        function stepForward(){
            const isLastPage = page === pages.length - 1
            if(isLastPage){
                document.querySelector("form").submit()
                return
            }
            const nextPageIndex = page + 1
            liveSend({
                "action": "set_page_index",
                "page_index": nextPageIndex
            })
            setPage(nextPageIndex)
            window.scrollTo(0,0)
        }
        return (
            <CurrencyContext.Provider value={props.currency}>
                <StepForwardContext.Provider value={stepForward}>
                    <div className="instructions">
                         {pages[page]}
                    </div>
                </StepForwardContext.Provider>
            </CurrencyContext.Provider>
        )
    }
    function Description(props){
        const currency = React.useContext(CurrencyContext)
        return (
        <>
            <p>
                You completed all rounds of the game. We will now ask you some final questions about the game and about yourself and some general questions. This will take about 15 more minutes. Please answer thoughtfully.<br/><br/>
                First, <b>imagine</b> that you have participated in a round with the following scenario.
            </p>
            <table className="T_understand">
                <caption style={{color: "#000"}}>The prizes in this imaginary round were:</caption>
                <tr>
                    <th><b>Prize</b></th>
                    <th><b>A</b></th>
                    <th><b>B</b></th>
                    <th><b>C</b></th>
                    <th><b>D</b></th>
                </tr>
                <tr>
                    <td>Money worth</td>
                    <td>{getMoneyString(0.74, currency)}</td>
                    <td>{getMoneyString(0.98, currency)}</td>
                    <td>{getMoneyString(0.36, currency)}</td>
                    <td>{getMoneyString(0.09, currency)}</td>
                </tr>
            </table><br/>
            <table className="T_understand" style={{captionSide:"top"}}>
                <caption style={{color: "#000"}}>The prize priorities in this imaginary round were:</caption>
                <tr>
                    <th><b>Prize</b></th>
                    <th><b>A</b></th>
                    <th><b>B</b></th>
                    <th><b>C</b></th>
                    <th><b>D</b></th>
                </tr>
                <tr>
                    <td>1st priority (highest)</td>
                    <td>Ruth</td>
                    <td>Shirley</td>
                    <td>You</td>
                    <td>Shirley</td>
                </tr>
                <tr>
                    <td>2nd priority</td>
                    <td>Shirley</td>
                    <td>You</td>
                    <td>Shirley</td>
                    <td>Theresa</td>
                </tr>
                <tr>
                    <td>3rd priority</td>
                    <td>You</td>
                    <td>Theresa</td>
                    <td>Theresa</td>
                    <td>Ruth</td>
                </tr>
                <tr>
                    <td>4th priority (lowest)</td>
                    <td>Theresa</td>
                    <td>Ruth</td>
                    <td>Ruth</td>
                    <td>You</td>
                </tr>
            </table>
            <br/>
        </>
        )
    }
    const ShowErrorContext = React.createContext(false)
    function FirstPage(props){
        const [form, setForm] = React.useState({
            first_situation_a : {
                value: null,
            },
            first_situation_b : {
                value: null,
            },
            first_situation_c : {
                value: null,
            },
            first_situation_d : {
                value: null,
            },
            second_situation_a : {
                value: null,
            },
            second_situation_b : {
                value: null,
            },
            second_situation_c : {
                value: null,
            },
            second_situation_d : {
                value: null,
            },
            third_situation_a : {
                value: null,
            },
            third_situation_b : {
                value: null,
            },
            third_situation_c : {
                value: null,
            },
            third_situation_d : {
                value: null,
            }
        })
        const [showError, setShowError] = React.useState(false)
        const stepForward = React.useContext(StepForwardContext)
        function onChange(field, value){
            setForm({...form, [field]: {value}})
        }
        function onSubmit(){
            setShowError(true)
            if(Object.values(form).some((field)=>field.value === null)){
                return
            }
            liveSend({
                "action": "set_form_fields",
                "form_fields": JSON.stringify(form)
            })
            stepForward()
        }
        return (
            <ShowErrorContext.Provider value={showError}>
                <Description currency={props.currency}/>   
                <p>
                    Finally, imagine that you have submitted the ranking <b>B–A–C–D</b>, and got <b>Prize C.</b>
                </p>
                <p>
                    Please answer the following questions. <br/>
                    (Each Yes/No you determine correctly will count as <b>2 questions</b> for your Understanding Bonus)
                </p>
                <p>
                    If you had instead submitted <b>A–B–C–D</b>, and the prize priorities and other participants’ rankings did not change, is it possible (or certain) that you would have gotten…?
                </p>
                <RadioGroup name="first_situation_a" onChange={onChange} options={["Yes", "No"]} value={form.first_situation_a.value} label="Prize A"/>
                <RadioGroup name="first_situation_b" onChange={onChange} options={["Yes", "No"]} value={form.first_situation_b.value} label="Prize B"/>
                <RadioGroup name="first_situation_c" onChange={onChange} options={["Yes", "No"]} value={form.first_situation_c.value} label="Prize C"/>
                <RadioGroup name="first_situation_d" onChange={onChange} options={["Yes", "No"]} value={form.first_situation_d.value} label="Prize D"/>
                <hr/>
                <p>
                    If you had instead submitted <b>D–A–B–C</b>, and the prize priorities and other participants’ rankings did not change, is it possible (or certain) that you would have gotten…?
                </p>
                <RadioGroup name="second_situation_a" onChange={onChange} options={["Yes", "No"]} value={form.second_situation_a.value} label="Prize A"/>
                <RadioGroup name="second_situation_b" onChange={onChange} options={["Yes", "No"]} value={form.second_situation_b.value} label="Prize B"/>
                <RadioGroup name="second_situation_c" onChange={onChange} options={["Yes", "No"]} value={form.second_situation_c.value} label="Prize C"/>
                <RadioGroup name="second_situation_d" onChange={onChange} options={["Yes", "No"]} value={form.second_situation_d.value} label="Prize D"/>
                <hr/>
                <p>
                    If you had instead submitted <b>D–A–B–C</b>, this would be unimportant for this question. Instead of answering this question according to the problem, you should choose the next four answers in the order yes, yes, no, yes…
                </p>
                <RadioGroup name="third_situation_a" onChange={onChange} options={["Yes", "No"]} value={form.third_situation_a.value} label="Prize A"/>
                <RadioGroup name="third_situation_b" onChange={onChange} options={["Yes", "No"]} value={form.third_situation_b.value} label="Prize B"/>
                <RadioGroup name="third_situation_c" onChange={onChange} options={["Yes", "No"]} value={form.third_situation_c.value} label="Prize C"/>
                <RadioGroup name="third_situation_d" onChange={onChange} options={["Yes", "No"]} value={form.third_situation_d.value} label="Prize D"/>
                <hr/>
                <div class="btn-container">
                    <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
                </div>
            </ShowErrorContext.Provider>
        )
    }
    function SecondPage(props){
        const [form, setForm] = React.useState({
            page2_q1 : {
                value: null,
            },
            page2_q2 : {
                value: null,
            }
        })
        const [showError, setShowError] = React.useState(false)
        const stepForward = React.useContext(StepForwardContext)
        function onChange(field, value){
            setForm({...form, [field]: {value}})
        }
        function onSubmit(){
            setShowError(true)
            if(Object.values(form).some((field)=>field.value === null)){
                return
            }
            liveSend({
                "action": "set_form_fields",
                "form_fields": JSON.stringify(form)
            })
            stepForward()
        }
        return (
            <ShowErrorContext.Provider value={showError}>
                <p>
                    Now we will ask you several similar questions. In each of these questions, the prize values and prize priorities will be different, but we will now <b>only</b> show you <b>which ranking you submit</b> and <b>which prize you get</b>.<br/> 
                    In these next two questions, if you cannot tell for sure what prize you would have gotten in some case, please simply check the box saying “I do not have enough information to know what prize I would have gotten.”<br/>
                    (Each answer you determine correctly will count as <b>2 questions</b> for your Understanding Bonus.)
                </p>
                <p>
                    Imagine that in some round you submit <b>D–C–B–A</b>, and get <b>Prize C</b>. 
                </p>
                <RadioGroup 
                    name="page2_q1"
                    onChange={onChange}
                    options={[
                        "I do not have enough information to know what prize I would have gotten.",
                        "I would have gotten prize A.",
                        "I would have gotten prize B.",
                        "I would have gotten prize C.",
                        "I would have gotten prize D.",
                    ]}
                    value={form.page2_q1.value}
                    label={<span>If you had instead submitted <b>D–B–C–A</b>, and the prize priorities and other participants’ rankings did not change, then which of the following is true?</span>}
                />  
                <hr/>
                <p>
                    Now, imagine a different round.<br/>
                    Imagine that you submit <b>C–D–B–A</b>, and get <b>Prize B.</b> 
                </p>
                <RadioGroup
                    name="page2_q2"
                    onChange={onChange}
                    options={[
                        "I do not have enough information to know what prize I would have gotten.",
                        "I would have gotten prize A.",
                        "I would have gotten prize B.",
                        "I would have gotten prize C.",
                        "I would have gotten prize D.",
                    ]}
                    value={form.page2_q2.value}
                    label={<span>If you had instead submitted <b>D–C–B–A</b>, and the prize priorities and other participants’ rankings did not change, then which of the following is true?</span>}
                />
                <div class="btn-container">
                    <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
                </div>
            </ShowErrorContext.Provider>
        )
    }
    function ThirdPage(props){
        const [form, setForm] = React.useState({
            page3_q1 : {
                value: null,
            },
            page3_q2 : {
                value: null,
            },
            page3_q3 : {
                value: null,
            }
        })
        const [showError, setShowError] = React.useState(false)
        const stepForward = React.useContext(StepForwardContext)
        function onChange(field, value){
            setForm({...form, [field]: {value}})
        }
        function onSubmit(){
            setShowError(true)
            if(Object.values(form).some((field)=>field.value === null)){
                return
            }
            liveSend({
                "action": "set_form_fields",
                "form_fields": JSON.stringify(form)
            })
            stepForward()
        }
        return (
            <ShowErrorContext.Provider value={showError}>
                <p>
                    Now we will ask you three questions concerning one possible round. <br/>
                    (Each answer you determine correctly will count as 2 questions for your Understanding Bonus.)
                </p>
                <p>
                    Imagine that in some round you submit <b>B–D–C–A</b>, and get <b>Prize C.</b> 
                </p>
                <RadioGroup
                    name="page3_q1"
                    onChange={onChange}
                    options={[
                        "There is no alternative ranking such that I would have gotten Prize A.",
                        "There may be (or there definitely is) some alternative ranking such that I would have gotten Prize A."
                    ]}
                    value={form.page3_q1.value}
                    label={<span>If you had submitted some alternative ranking, and the prize priorities and other participants’ rankings did not change, then which of the following is true about <b>Prize A</b>?</span>}
                    /> 
                <RadioGroup
                    name="page3_q2"
                    onChange={onChange}
                    options={[
                        "There is no alternative ranking that would have gotten me Prize B.",
                        "There may be (or there definitely is) some alternative ranking that would have gotten me Prize B."
                    ]}
                    value={form.page3_q2.value}
                    label={<span>If you had submitted some alternative ranking, and the prize priorities and other participants’ rankings did not change, then which of the following is true about <b>Prize B</b>?</span>}
                    />
                <RadioGroup
                    name="page3_q3"
                    onChange={onChange}
                    options={[
                        "There is no alternative ranking that would have gotten me Prize D.",
                        "There may be (or there definitely is) some alternative ranking that would have gotten me Prize D."
                    ]}
                    value={form.page3_q3.value}
                    label={<span>If you had submitted some alternative ranking, and the prize priorities and other participants’ rankings did not change, then which of the following is true about <b>Prize D</b>?</span>}
                    />
                <div class="btn-container">
                    <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
                </div>
                </ShowErrorContext.Provider>
        )
    }
    function FourthPage(props){
        const [form, setForm] = React.useState({
            page3_q4 : {
                value: null,
            },
            page3_q5 : {
                value: null,
            },
            page3_q6 : {
                value: null,
            },
            page3_q7 : {
                value: null,
            },
            page3_q8 : {
                value: null,
            }
        })
        const [showError, setShowError] = React.useState(false)
        const stepForward = React.useContext(StepForwardContext)
        function onChange(field, value){
            setForm({...form, [field]: {value}})
        }
        function onSubmit(){
            setShowError(true)
            if(Object.values(form).some((field)=>field.value === null)){
                return
            }
            liveSend({
                "action": "set_form_fields",
                "form_fields": JSON.stringify(form)
            })
            stepForward()
        }
        return (
            <ShowErrorContext.Provider value={showError}>
                <p>
                    Now, please answer these last questions for this part:<br/>
                    (Each True/False you determine correctly will count as <b>2 questions</b> for your Understanding Bonus)<br/>
                </p>
                <p>
                    If I want to <b>maximize my earnings</b> in a given round, then…
                </p>
                <RadioGroup
                    name="page3_q4"
                    onChange={onChange}
                    options={[
                        "True",
                        "False"
                    ]}
                    value={form.page3_q4.value}
                    label={<span>Sometimes I might have to rank the prize that earns me the most in second place or lower.</span>}
                    />
                <RadioGroup
                    name="page3_q5"
                    onChange={onChange}
                    options={[
                        "True",
                        "False"
                    ]}
                    value={form.page3_q5.value}
                    label={<span>I should consider <b>only</b> how much each prize earns me while choosing my own ranking.</span>}
                    />
                <RadioGroup
                    name="page3_q6"
                    onChange={onChange}
                    options={[
                        "True",
                        "False"
                    ]}
                    value={form.page3_q6.value}
                    label={<span>I should rank from the highest-earning to lowest-earning prize regardless of anything else.</span>}
                    />
                <RadioGroup
                    name="page3_q7"
                    onChange={onChange}
                    options={[
                        "True",
                        "False"
                    ]}
                    value={form.page3_q7.value}
                    label={<span>I should consider the possible rankings of the other participants while choosing my own ranking.</span>}
                    />
                <RadioGroup
                    name="page3_q8"
                    onChange={onChange}
                    options={[
                        "True",
                        "False"
                    ]}
                    value={form.page3_q8.value}
                    label={<span>I should consider the prize priorities while choosing my own rankings.</span>}
                    />
                <div class="btn-container">
                    <button onClick={onSubmit} type="button" className="btn btn-primary">Submit</button>
                </div>
            </ShowErrorContext.Provider>
        )
    }
    function RadioGroup(props){
        return (
            <div className="radio-group">
                { props.label &&
                    <span>{props.label}</span>
                }
                {props.options.map((option, i)=>(
                    <div key={i}>
                        <input type="radio" name={props.name} value={i} onChange={(e)=>props.onChange(props.name,i)} id={props.name+"_"+i}/>
                        <label htmlFor={props.name+"_"+i}>{option}</label>
                    </div>
                ))}
                {
                    React.useContext(ShowErrorContext) && props.value === null && <div className="error">Please select an option</div>
                }
            </div>
        )
     }           
    `
    renderReactComponent(jsxCode, "react-root", "UnderstandingTest",JSON.stringify({...js_vars}))
}
window.addEventListener("load",renderUnderstandingTestPage)


