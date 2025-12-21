export const setToken = (token) =>{
    localStorage.setItem("token", token);
};

export const getToken = (token) =>{
    localStorage.getItem("token", token);
};

export const logout = (token) =>{
    localStorage.removeItem(token);
}