const get = async url => {
    return await fetch(url, {
        method: "GET"
    }).then(res => res.text())
    .then(data => data)
    .catch(err => console.error(err))
}

export {
    get
}