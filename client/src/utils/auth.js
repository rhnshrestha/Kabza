export const setToken = (token) =>{
    localStorage.setItem("token", token);
};

export const getToken = (token) =>{
   return  localStorage.getItem("token");
};

export const logout = (token) =>{
    localStorage.removeItem("token");
}