import React from 'react'
import { get, post } from '../utility'

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
        const r = await get('https://pokeapi.co/api/v2/pokemon/')
        const parsed = JSON.parse(r)
    }

    const handleLoadPokemon = React.useCallback(async e => {
        const p = pokemonSearchRef?.current?.value
        if (p) {
            const r = await get(`http://localhost:5000/job?jobs=${p}`)
            const parsed = JSON.parse(r)
            setCurrentPokemon(parsed)
            console.log('r', parsed)
        }
    })

    async function handleAdd(e) {
        const m = e?.currentTarget?.getAttribute('modif')
        console.log(m)
        const r = await post('http://localhost:5000/add', {
            item: m
        })
        console.log(r, 'Added!')
    }

    console.log(currentPokemon)
    
    return (
        <div>
            <h1>Our Pokemon page!</h1>
            <input type='text' ref={pokemonSearchRef} />
            <button onClick={handleLoadPokemon}>Search</button>
            {
                currentPokemon?.map
                    ? currentPokemon.map(m => (
                        <div>
                            <h3>{m?.name.charAt(0).toUpperCase()}{m?.name.substring(1, m?.name?.length)}</h3>
                            <button onClick={handleAdd} modif={m.name}>Add</button>
                            {
                                m?.stats?.map((m, i) => (
                                    <div key={i}>
                                        <div>{m?.stat?.name}</div>
                                        <div>{m?.base_stat}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                    : null
            }
        </div>
    )
}