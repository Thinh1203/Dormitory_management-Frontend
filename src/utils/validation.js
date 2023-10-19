export const checkPhoneNumber = (number) => {
    return /^0[0-9]{9}$/g.test(number);
}

export const checkEmail = (email) => {
    return /^(([\w]+)(\.*))+@((\w+)(\.)){1,}(com|net|co|vn|edu|gov|biz|org|uk)$/g.test(email);
}

export const checkImageExtension = (name) => {
    const regex = /^((([a-zA-Z0-9]+)(\s*))+(\_*)*(\-*))+(.jpg|.png|.jpeg)$/gmi;
    return regex.test(name);
}