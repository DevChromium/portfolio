// TODO: Fix runtimes on vercel

async function getAccessToken() {

    const base64Buffer = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")

    const payload = {
        method: "POST",
        headers: {
            "Authorization": `Basic ${base64Buffer}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
            client_id: process.env.SPOTIFY_CLIENT_ID as string
        }),
        cache: "no-store",
        next: {
            revalidate: 3600
        }
    }
    const res = await fetch("https://accounts.spotify.com/api/token", payload)
    const json = await res.json()
    return json;
}

export async function getCurrentPlayback() {
    let returnVal

    const { access_token } = await getAccessToken()

    const response = await fetch("https://api.spotify.com/v1/me/player", {
        cache: "no-store",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    });

    const json = response.json()

    return response.status === 200 ? json : { is_playing: false}
}