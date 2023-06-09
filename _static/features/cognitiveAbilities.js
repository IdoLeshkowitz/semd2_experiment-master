function renderCognitiveAbilitiesForm() {
    const jsxCode = `
    function Stam(){
        return <div>hello</div>
    }
    function isNumber(string,fieldName) {
        if ( !isNaN(parseFloat(string)) && isFinite(string)){
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a valid number for " + fieldName};
    }        
    function isRoundNumber(str,fieldName) {
        console.log(str)
        console.log(isNumber(str))
        if ( isNumber(str).isValid ===  true && str.indexOf('.') === -1){
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a round number for " + fieldName};
    }
    function isPositiveNumber(str,fieldName) {
        if(isNumber(str) && parseFloat(str) >= 0){
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a positive number for " + fieldName.replaceAll("_"," ")};
    }
    function isNumberInRange(str, min, max, fieldName) {
        if ( isNumber(str) && parseFloat(str) >= min && parseFloat(str) <= max) {
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a number between " + min + " and " + max + " for " + fieldName};
    }
    function CognitiveAbilitiesForm(props) {
        const [form,setForm] = React.useState({
            "bat_and_ball":{
                value: "",
                error: "",
                isPositiveNumber: true,
                label : <label>A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball.<br/>How much does the ball cost?</label>,
                units : 'cents'
            },
            "machines":{
                value: "",
                error: "",
                isRoundNumber: true,
                label : <label>If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?</label>,
                units : 'minutes'
            },
            "lily_pads":{
                value: "",
                error: "",
                isRoundNumber: true,
                label:<label>In a lake, there is a patch of lily pads.<br/>Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?</label>,
                units : 'days'
            },
            "choir":{
                value: "",
                error: "",
                isPositiveNumber: true,
                label:<label>Out of 1,000 people in a small town 500 are members of a choir. Out of these 500 members in the choir 100 are men. <br/>Out of the 500 inhabitants that are not in the choir 300 are men. What is the probability that a randomly drawn man is a member of the choir?</label>,
                units : '%',            
                min: 0,
                max: 100,
            },
        })
        function onSubmit (){
            let isValid = true;
            Object.keys(form).forEach((key) => {
                const field = form[key];
                /* if field has errors, mark flag  continue to next field */
                if (field.error){
                    isValid = false;
                    return; 
                }
                /* check if field is empty */
                if (field.value === ""){
                    isValid = false;
                    setForm((prevForm) => ({
                        ...prevForm,
                        [key]: {
                            ...prevForm[key],
                            error: "Please enter a value for " + form[key].units
                        }
                    }))
                }
            });
            if (isValid){
                document.querySelector("form").submit();
            }
        }
        return (
            <section style={{display:"flex", flexDirection :'column'}}>
                <div>
                    Please answer the following questions:
                </div>
                { Object.keys(form).map((key, index) => {
                        function handleChange(event) {
                            const value = event.target.value;
                            const fieldName = event.target.name;
                            const field = form[fieldName];
                            let error = "";
                            if (field.isPositiveNumber) {
                                const result = isPositiveNumber(value, form[key].units);
                                if (!result.isValid) {
                                    error = result.error;
                                }
                            }
                            if (field.isRoundNumber) {
                                const result = isRoundNumber(value, form[key].units);
                                if (!result.isValid) {
                                    error = result.error;
                                }
                            }
                            if (field.min && field.max) {
                                const result = isNumberInRange(value, field.min, field.max, form[key].units);
                                if (!result.isValid) {
                                    error = result.error;
                                }
                            }
                            setForm({
                                ...form,
                                [fieldName]: {
                                    ...field,
                                    value,
                                    error
                                }
                            });
                        }
                        return (
                            <div key={index}>
                                <hr/>
                                <div style={{display:'flex', flexDirection:'column', paddingTop:'1rem',paddingBottom:'1rem',gap:'1rem'}}>
                                    {form[key].label}
                                    <div>
                                        <input
                                            style={{width:'7rem',lineHeight:'1.5rem',paddingLeft:'1rem'}}
                                            name={key}
                                            type="text"
                                            value={form[key].value}
                                            onChange={handleChange}
                                        />
                                        <b style={{color:'grey', paddingLeft:'1rem'}}>{form[key].units}</b>
                                    </div>
                                    <span style={{ color: "red" }}>{form[key].error}</span>
                                </div>    
                            </div>
                        )
                    })
                }
                <hr/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={onSubmit} className="btn btn-primary" type="button">Submit</button>
                </div>
            </section>
        )
    }
    `
    renderReactComponent(jsxCode, 'cognitive-abilities', 'CognitiveAbilitiesForm')
}

function renderReactComponent(jsxCode, renderAt, componentName, props) {
    const renderString = jsxCode.concat(`
        ReactDOM.render(<${componentName} {...${props}} />, document.getElementById('${renderAt}'));
        `)
    /* transpile jsx code to js code */
    const transPiledCode = Babel.transform(renderString, {
        presets: ['react'],
    }).code;
    /* evaluate the transpiled code */
    eval(transPiledCode);
}

window.addEventListener('load', renderCognitiveAbilitiesForm)