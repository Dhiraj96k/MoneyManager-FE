export const validateEmail=(email)=>{
    if(email.trim()){
        const regx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regx.test(email);
    }
    return false;
}