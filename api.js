export async function getLocation() {
    const response = await fetch('https://free.freeipapi.com/api/json');
    if (!response.ok) {
        throw new Error('Failed to fetch location');
    }
    const data = await response.json();
    if (!data.countryCode || !data.ipAddress) {
        throw new Error('Location response missing required fields');
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