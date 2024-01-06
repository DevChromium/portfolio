// TODO: Fix runtimes on vercel

export async function getAccessToken() {

    const base64Buffer = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")

    const payload = {
        method: "POST",
        headers: {
            "Authorization": `Basic ${base64Buffer}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": '*',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': '*'
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
            client_id: process.env.SPOTIFY_CLIENT_ID as string
        }),
        
        next: {
            revalidate: 60 * 60 * 60
        }
    }
    const res = await fetch("https://accounts.spotify.com/api/token", payload)
    const json = await res.json()
    return json;
}

// export async function getNowPlaying() {
//     let returnVal

//     const { access_token } = await getAccessToken()

//     const res = await fetch("https://api.spotify.com/v1/me/player", {
//         cache: "no-store",
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${access_token}`,
//             "Content-Type": "application/json",
//         }
//     });

//     const json = res.json()

//     return res.status === 200 ? json : { is_playing: false}
// }

export async function getNowPlaying() {
    const { access_token } = await getAccessToken()

    return fetch("https://api.spotify.com/v1/me/player", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store"
    })
}