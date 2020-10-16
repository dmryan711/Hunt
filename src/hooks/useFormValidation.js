import React from 'react';
import {toast} from "../utils/toast";

function useFormValidation(initialState, validate, action){
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(()=>{
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors){
                action();
                setValues(initialState);
                setSubmitting(false);
            } else{
                let errPrefix = "";
                let errGramar = "";
                if(Object.keys(errors).length > 1){
                    errPrefix = "There are ";
                    errGramar = " errors: ";
                }else{
                    errPrefix = "There is ";
                    errGramar = " error: "
                }
                toast(errPrefix + Object.keys(errors).length + errGramar + Object.values(errors).join(", "));
                console.log(Object.keys(errors).length);
                setSubmitting(false);
            }
        }
    // eslint-disable-next-line
    },[errors]);

    function handleChange(event){
        setValues(previousValues =>({
            ...previousValues,
            [event.target.name]:event.target.value
        }));
    }

    function handleSubmit(){
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }
    return {
        handleSubmit, handleChange, values,setValues, isSubmitting
    };
}

export default useFormValidation;
