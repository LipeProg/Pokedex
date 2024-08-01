/*Pagina Home, a pagina principal onde poderemos acessar os detalhes do pokemon*/

import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import NavBar from '../components/navbar'
import { Container, Grid } from '@mui/material'
import axios from 'axios'

/*essa sera o local onde estara a api*/

export const Homepage = () => {
    /*Esse é o local onde sera armazenado os dados do pokemon*/
    const [Pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = () => {
        var endpoints = []
        for(var i = 1; i < 151; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

        var response = axios.all(endpoints.map((endpoint) => 
            axios.get(endpoint)))
            .then((res) => setPokemons(res));

            return response

    };


    const filtroPokemons = (name) => {
        var pokemonsfiltrados = []
        if(name ===""){
            getPokemons()
        }

        for(var i in Pokemons){
            if(Pokemons[i].data.name.includes(name)){
                pokemonsfiltrados.push(Pokemons[i])
            };
        }

        setPokemons(pokemonsfiltrados);
    };

  return (
    <>
        <NavBar filtroPokemons = {filtroPokemons}/>
        <Container maxWidth="false" >
            <Grid container spacing={2} >
                {Pokemons.map((pokemon, key) => (
                    <Grid item xs= {2} key= {key}>
                        <PokemonCard 
                        name={pokemon.data.name}
                        image={pokemon.data.sprites.front_default}
                        types={pokemon.data.types}/>
                        
                    </Grid>
                ))}

            </Grid>

        </Container>
        
    </>

  )
}
