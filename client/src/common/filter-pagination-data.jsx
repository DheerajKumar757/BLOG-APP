import axios from "axios";

export const filterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send = {} }) => {

    let obj;

    if(state != null && !create_new_arr) {
        // from page 2 onwards, the data will be appended to the existing array and returned.
        obj = { ...state, results: [ ...state.results, ...data ], page: page }
    }
    else {
        // for the first time i.e. for page 1, the data will be stored in a new array and returned.
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send)
        .then(({ data: { totalDocs }}) => {
            obj = { results: data, page: 1, totalDocs: totalDocs }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return obj;
}

/*
-> for the first time i.e. for page 1 create_new_arr will be true and 
the data will be stored in a new array and returned. 
-> For the next pages create_new_arr will be false by default 
and the data will be appended to the existing array and returned.

-> state is the previous array(if current page is 3 then data of 1 and 2 will be in state) 
of data and data is the new data to be appended to the previous array.
note that for the first time when create_new_arr is true, state will be undefined and data will be 
the new data to be stored in a new array and returned.
note: the data is not appended to the previous array but a new array is created and returned with the previous data and new data.

-> page is current page number whose data is being fetched.

-> countRoute is the route to get the total number of documents in the collection. 
It is used to calculate the total number of pages.

-> data_to_send is the data to be sent to the countRoute to get the total number of documents in the collection. 
It is used to calculate the total number of pages.

*/