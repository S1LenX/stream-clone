const checkValidity=(email,pass)=>{
    const isEmailValid=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPassValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
    if(!isEmailValid) return "Email ID is not Valid";
    if(!isPassValid) return "Password is not Valid";
    return null;
};
export default checkValidity;