const get = async url => {
    return await fetch(url, {
        method: "GET"
    }).then(res => res.text())
    .then(data => data)
    .catch(err => console.error(err))
}

const post = async (url, body, headers, cred, options) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers ?? {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cred: cred ?? 'include'
    }).then(res => res.text())
    .then(data => data)
    .catch(err => console.error(err))
}

export {
    get,
    post
}