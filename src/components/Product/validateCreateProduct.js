export default function validateSignup(values){
    let errors = {};


    //Title Errors
    if(!values.title){
        errors.title = "A title is required";
    }

    //description Errors
    if(!values.description){
        errors.description = "A description is required";
    }else if (values.description.length < 10) {
        errors.description = "Your description must be 10 characters long";
    }

    // URL Errors
    if (!values.url) {
        errors.url = "A URL required.";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "The URL must be valid.";
    }

    return errors;
}