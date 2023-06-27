import axios from "axios";

export function getVideogames (){
    return async function(dispatch){
        const json = await axios.get("/videogames"); 
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        });
    };
};

export function getVideogamesByName (payload){
    return async function(dispatch){
        try {
            const json = await axios.get(`/videogames?name=${payload}`);
            return dispatch({
                type: "GET_VIDEOGAMES_NAME",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get(`/genres`);
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        });
    };
};

export function getPlatforms(){
    return async function(dispatch){
        const json = await axios.get(`/platforms`);
        return dispatch({
            type: "GET_PLATFORMS",
            payload: json.data
        });
    };
};

export function getDetail(payload){
    return async function(dispatch){
        try {
            const json = await axios.get(`/videogames/${payload}`)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }   
    };
};

export function postVideogame(payload){
    return async function(dispatch){
        const response = await axios.post(`/videogames`, payload);
        return response
    }
};

export function filterVideogamesByOrigin (payload){
    return{
        type: "FILTER_BY_ORIGIN",
        payload
    };
};

export function sortByRating (payload){
    return{
        type: "SORT_BY_RATING",
        payload
    };
};

export function sortByAlphabet (payload){
    return{
        type: "SORT_BY_ALPHABET",
        payload
    };
};

export function setCurrentPage(payload){
    return {
      type: "SET_CURRENT_PAGE",
      payload
    };
  };

export function setOrigin(payload){
    return {
        type: "SET_ORIGIN",
        payload
    };
};
