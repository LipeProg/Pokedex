/*Pagina Home, a pagina principal onde poderemos acessar os detalhes do pokemon*/

import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import NavBar from '../components/navbar'
import { Container, Grid } from '@mui/material'
import axios from 'axios'

/*essa sera o local onde estara a api*/

export const Homepage = () => {
    /*Esse é o local onde sera armazenado os dados do pokemons, ele recebe um objeto e armazena no array*/
    const [Pokemons, setPokemons] = useState([]);

    /* Essa é a função para buscar da api os dados do pokemon, e adicionalos no state Pokemons */
    const getPokemons = () => {
        var endpoints = []

        /* este for serve para armazenar no array a quantidade que quiser de endpoints da api.
        Nesse caso ele esta armazenando 150 endpoints pokemons */
        for(var i = 1; i < 151; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

        /* aqui nos estamos executando a função que usa tudo.
            vamos executar a função axios.all para buscar na variavel endpoints os dados, executando a função get em todos os endpoints de uma vez só.
            apos isso adicionamos a resposta da requisição no state, atraves do setPokemons*/
        var response = axios.all(endpoints.map((endpoint) => 
            axios.get(endpoint)))
            .then((res) => setPokemons(res));

            return response

    };

    // esse hook serve para executar a função assim que o componente é montado
    useEffect(() => {
        getPokemons();
    }, []);
    

    /* esta função serve para quando voce pesquisar o pokemon ele aparecer.
        seja com letras proximas ao nome ou o nome completo */
    const filtroPokemons = (name) => {
        var pokemonsfiltrados = []
        
        /* esse if diz que caso não tenha nada na barra de pesquisa 
            ele volte a mostrar todos os pokemons */
        if(name ===""){
            getPokemons()
        }

        /* este for percorre todo o array Pokemons, e verifica se em cada objeto desse array tem a string name atraves do metodo includes.
            se esse objeto estiver com essa string ele armazena no array atraves do push() */
        for(var i in Pokemons){
            if(Pokemons[i].data.name.includes(name)){
                pokemonsfiltrados.push(Pokemons[i])
            };
        }

        /* e no final ele adiciona a setPokemons */
        setPokemons(pokemonsfiltrados);
    };

  return (
        <>
            {/* este navbar é a barra de pesquisa que vai aparecer na tela
                ela tem como propiedade a função filtroPokemon, que vai servir para ser usada no componente do navbar  */}
            <NavBar filtroPokemons = {filtroPokemons}/>

           {/* container  é usado para centralizar e definir um layout de largura para os elementos dentro dele. */}
            <Container maxWidth="false" >

                {/* grid container organiza oque estiver dentro dele em uma estrutura de grade.
                    o spacing define um espaçamentos dos elementos */}
                <Grid container spacing={2} >
                    {Pokemons.map((pokemon, key) => (
                        
                        /* estamos criando um card para cada pokemon, 
                            grid item esta com uma prop xs, ela esta dizendo que cada um dos card ocupa um espaço 2/12 */
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
