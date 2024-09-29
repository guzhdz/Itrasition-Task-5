import FakerData from '../../services/FakerData.js';

let fakerData = new FakerData();

export async function GET(request) {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const action = queryParams.get('action');
    if (!action) {
        return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
    switch (action) {
        case 'initial':
            return generateInitialData(queryParams);

        case 'generate':
            return generateData(queryParams);

        default:
            return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
}

const generateInitialData = (params) => {
    const seed = parseInt(params.get('seed'));
    const region = parseInt(params.get('region'));
    const amount = parseInt(params.get('amount'));
    const error = parseFloat(params.get('error'));
    if(!seed || region === undefined || !amount || error === undefined){
        return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
    try {
        fakerData = new FakerData(region, seed, error);
        const data = fakerData.generateFakerData(amount);
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {

        return new Response(JSON.stringify({ error: "Server error. Please try again later." }), { status: 500 });
    }
}

const generateData = (params) => {
    const amount = parseInt(params.get('amount'));
    const page = parseInt(params.get('page'));
    if(!amount){
        return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
    try {
        fakerData.changeSeed(page);
        const data = fakerData.generateFakerData(amount);
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {

        return new Response(JSON.stringify({ error: "Server error. Please try again later." }), { status: 500 });
    }
}