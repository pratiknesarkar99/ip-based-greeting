export async function getLocation() {
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
        throw new Error('Failed to fetch location');
    }
    const data = await response.json();
    if (data.status === 'fail') {
        throw new Error(data.message || 'Location lookup failed');
    }
    return data;
}

export async function getGreeting(languageCode, ip) {
    const url = `https://hellosalut.stefanbohacek.com/?lang=${languageCode}&ip=${ip}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch greeting');
    }
    return response.json();
}