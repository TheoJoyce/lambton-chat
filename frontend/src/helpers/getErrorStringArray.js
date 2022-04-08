const getErrorStringArray = (errors) => {
    let messages = [];

    if (errors && errors.length > 0) {
        errors.forEach((error) => {
            messages.push(error.msg);
        });
    }

    return messages;
};

export { getErrorStringArray };
