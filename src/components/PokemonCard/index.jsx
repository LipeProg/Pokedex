/*Componente do car do pokemon, o qual aparece sua foto e seu nome*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


/*essa é a função do card, onde tem como um parametro name e image.
  a qual esses parametros são vindo da api chamada na pagina a qual o componente esta sendo chamada*/
export default function PokemonCard({name, image, types}) {

  const typosPokemon = () => {
    if(types[1]){
      return types[0].type.name + " " + types[1].type.name
    }

    return types[0].type.name;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"

        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {typosPokemon()}
        </Typography>
        
      </CardContent>
 
    </Card>
  );
}
