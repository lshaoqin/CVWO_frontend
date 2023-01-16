import axios from 'axios'

//Change to URL of the API
const API_BASE_URL: string = 'https://tagup-jcqn.onrender.com'

export async function getRequest(path: string, params: object): Promise<object> {
    try 
    {
        const response = await axios.get(`${API_BASE_URL}/${path}`, { params } );
        return response.data;
    } 
    catch (error: any) 
    {
        throw new Error(`Failed to get data from API: ${error.message}`);
    }
}

export async function postRequest(path: string, params: object): Promise<object> {
    try 
    {
        const response = await axios.post(`${API_BASE_URL}/${path}`, params );
        return response.data;
    } 
    catch (error: any) 
    {
        if (error){
            throw new Error(error.response.data.error);
        }
        else {
            throw new Error('An error has occurred - Please try again!')
        }

        
    }
}

export default getRequest;
