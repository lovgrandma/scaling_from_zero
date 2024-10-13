import React from 'react'

export default props => {
    const [ componentDidMount, setComponentDidMount ] = React.useState(false)
    const [ currentPokemon, setCurrentPokemon ] = React.useState(null)
    const pokemonSearchRef = React.useRef()
    
    React.useEffect(() => {
        if (!componentDidMount) {
            getDefaults()
            setComponentDidMount(true)
        }
    }, [ componentDidMount ])

    const getDefaults = async () => {
        const r = await fetch("https://pokeapi.co/api/v2/pokemon/", {
            method: "GET",
            redirect: "follow"
        }).then(res => res.text())
        .then(data => data)
        .catch(err => console.error(err))
        const parsed = JSON.parse(r)
        console.log('Pokemon', parsed, typeof r, typeof parsed)
    }

    const handleLoadPokemon = React.useCallback(async e => {
        const p = pokemonSearchRef?.current?.value
        if (p) {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${p}`, {
                method: "GET",
                redirect: "follow"
                }).then(res => res.text())
                .then(data => data)
                .catch(err => console.error(err))
            const parsed = JSON.parse(r)
            setCurrentPokemon(parsed)
            console.log('r', parsed)
        }
    })
    
    return (
        <div>
            <h1>Our Pokemon page!</h1>
            <input type='text' ref={pokemonSearchRef} />
            <button onClick={handleLoadPokemon}>Search</button>
            {
                currentPokemon
                    ? <div>
                        <h3>{currentPokemon?.name.charAt(0).toUpperCase()}{currentPokemon?.name.substring(1, currentPokemon?.name?.length)}</h3>
                        {
                            currentPokemon?.stats?.map((m, i) => (
                                <div key={i}>
                                    <div>{m?.stat?.name}</div>
                                    <div>{m?.base_stat}</div>
                                </div>
                            ))
                        }
                    </div>
                    : null
            }
        </div>
    )
}