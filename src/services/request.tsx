import axios from 'axios'

const API_BASE_URL: string = 'http://localhost:3000'

export async function getRequest(path: string, params: object): Promise<object> {
    try 
    {
        console.log(`${API_BASE_URL}/${path}`)
        const response = await axios.get(`${API_BASE_URL}/${path}`, params );
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
        console.log(`${API_BASE_URL}/${path}`)
        const response = await axios.post(`${API_BASE_URL}/${path}`, params );
        return response.data;
    } 
    catch (error: any) 
    {
        throw new Error(`Failed to post data to API: ${error.message}`);
    }
}

export default getRequest;
