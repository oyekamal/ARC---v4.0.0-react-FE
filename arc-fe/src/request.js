
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
            return response;
        }
}

function parseJSON(response) {
    if (response.status === 204 && response.status === 205) {
        return null;
    }
    return response.json();
}

export default async function request(url, options) {
    const fetchResponse = await fetch(url, options);
    const response = await checkStatus(fetchResponse);
     
    let jsonResponse;
    try {
        jsonResponse = await parseJSON(response);

    } catch (err) {
        jsonResponse = response;
    }
    return jsonResponse;
}