import axios from "axios";

const api = axios.create({

    baseURL:
        "http://localhost:5000/api",

    withCredentials: true

});

export const attachToken = (
    token
) => {

    api.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;

};

export default api;
