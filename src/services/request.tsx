import axios from 'axios'

const API_URL: string = 'http://localhost:3000'

export async function getRequest(params: object): Promise<object> {
    try 
    {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } 
    catch (error: any) 
    {
        throw new Error(`Failed to get data from API: ${error.message}`);
    }
}

export async function postRequest(params: object): Promise<object> {
    try 
    {
        const response = await axios.post(API_URL, { params });
        return response.data;
    } 
    catch (error: any) 
    {
        throw new Error(`Failed to post data to API: ${error.message}`);
    }
}

export default getRequest;
