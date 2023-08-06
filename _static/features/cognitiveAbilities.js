function renderCognitiveAbilitiesForm() {
    const jsxCode = `
    function Stam(){
        return <div>hello</div>
    }
    function isNumber(string,fieldName) {
        // Regular expression patterns
          var numberPattern = /^-?\\d+$/;             // Matches an optional negative sign followed by a sequence of digits
          var floatPattern = /^-?\\d+(\\.\\d+)?$/; 
        
        // Check if the string matches the number or float pattern
        const isValid = numberPattern.test(string) || floatPattern.test(string);
        if (isValid){
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a valid number for " + fieldName};
    }        
    function isRoundNumber(str,fieldName) {
        if ( isNumber(str).isValid ===  true && str.indexOf('.') === -1){
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a round number for " + fieldName};
    }
    function isLessThan(str, max, fieldName) {
        if ( isNumber(str).isValid && parseFloat(str) <= max) {
            return {isValid: true, error: ""};
        }
        return {isValid: false, error: "Please enter a number less than " + max + " for " + fieldName};
    }
    function isPositiveNumber(str,fieldName) {
        if(isNumber(str).isValid && parseFloat(str) >= 0){
            return {isValid: true, error: ""};
        }
        if (fieldName === "choir"){
            return {isValid: false, error: "Please enter a probability between 0 and 1 for probability"};
        }
        return {isValid: false, error: "Please enter a positive number for " + fieldName.replaceAll("_"," ")};
    }
    function isNumberInRange(str, min, max, fieldName) {
        if ( isNumber(str).isValid && parseFloat(str) >= min && parseFloat(str) <= max) {
            return {isValid: true, error: ""};
        }
        if (fieldName === "choir"){
            return {isValid: false, error: "Please enter a probability between 0 and 1 for probability"};
        }
        return {isValid: false, error: "Please enter a number between " + min + " and " + max + " for " + fieldName};
    }
    function CognitiveAbilitiesForm(props) {
        const [form,setForm] = React.useState({
            "bat_and_ball":{
                value: "",
                error: "",
                isPositiveNumber: true,
                isRoundNumber: true,
                label : <label>A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball.<br/>How much does the ball cost? Please enter an amount in cents:</label>,
                units : 'cents'
            },
            "machines":{
                value: "",
                error: "",
                isPositiveNumber: true,
                label : <label>If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets? Please enter a number of minutes:</label>,
                units : 'minutes'
            },
            "lily_pads":{
                value: "",
                error: "",
                isPositiveNumber: true,
                label:<label>In a lake, there is a patch of lily pads.<br/>Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake? Please enter a number of days:</label>,
                units : 'days'
            },
            "choir":{
                value: "",
                error: "",
                label:<label>Out of 1,000 people in a small town 500 are members of a choir. Out of these 500 members in the choir 100 are men. <br/>Out of the 500 inhabitants that are not in the choir 300 are men. What is the probability that a randomly drawn man is a member of the choir? Please enter a percent chance between 0 and 100:</label>,
                'units' : 'percent chance',                            
                isRoundNumber: true,
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
                            error: "Please enter a value for " + (form[key].units || "probability")
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
                                const result = isPositiveNumber(value, form[key].units ?? key);
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
                            if (field.min !== undefined && field.max !== undefined) {
                                const result = isNumberInRange(value, field.min, field.max, form[key].units ?? key);
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
                                            style={{width:'3rem',lineHeight:'2rem'}}
                                            name={key}
                                            id={key}
                                            type="text"
                                            value={form[key].value}
                                            onChange={handleChange}
                                        />&nbsp;
                                        {form[key].units}
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