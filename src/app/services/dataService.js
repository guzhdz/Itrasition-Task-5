const API_URL = '/api/generate-data';
export const generateData = async (type, options) => {
    try {
        const url = new URL(API_URL, window.location.origin);
        url.searchParams.append('action', type);
        if(type === 'initial') {
            url.searchParams.append('seed', options.seed);
            url.searchParams.append('region', options.region);  
            url.searchParams.append('error', options.error); 
        } else {
            url.searchParams.append('page', options.page);
        }
        url.searchParams.append('amount', options.amount);
        
        const response = await fetch(url.toString());
        const data = await response.json();
        if (response.status != 200) {
            return {ok: false, message: data.error};
        } else {
            return {ok: true, data: data};
        }
    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
}