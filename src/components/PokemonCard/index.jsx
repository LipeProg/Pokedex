/*Componente do car do pokemon, o qual aparece sua foto e seu nome*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/*essa é a função do card, onde tem como um parametro name e image.
  a qual esses parametros são vindo da api chamada na pagina a qual o componente esta sendo chamada*/
export default function PokemonCard({name, image}) {
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
        
      </CardContent>
 
    </Card>
  );
}
