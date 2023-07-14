import { Card, IconButton, Typography, Modal } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import Rating from "../Rating";
import Request from "./Request";
import { Clear, StarBorder } from "@mui/icons-material";
import { Action1, Action2 } from "./Action";

function Item( { setOutfit, outfit, setCurrent, type, current, item } ) {
  const [ rating, setRating ] = useState(3.5);
  const [ img, setImg] = useState('');
  const [ modal, setModal ] = useState(false);

  useEffect(() => {
    if (item.id !== undefined) {
      Request.getStyles(item.id).then((res) => {
        setImg(res.data.results[0].photos[0].thumbnail_url || '');
      });
    }
  }, [item]);

  const cardClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const iconLength = 40;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // console.log(`x: ${x}, y: ${y}`);
    if ((x < rect.width - iconLength || y > iconLength) && !modal) {
      setCurrent(item);
    }
  };

  return (
    <Card onClick={cardClick} sx={{padding: '10px',margin:'5px', minWidth:'calc(20% - 30px)', maxWidth:'calc(20% - 30px)'}}>
      <div className='item-card'>
      <div style={{position: 'relative', width:'100%', height: '150px'}}>
        <img src={img} style={{width: '100%', height: '150px', objectFit: 'cover'}}/>
        { type === 1 ? <Action1 setModal={setModal} current={current} item={item}/> : <Action2 item={item} setOutfit={setOutfit} outfit={outfit}/>}
      </div>
      <Typography variant='h8' sx={{color: '#124559'}}> { item.category } </Typography>
      <Typography variant='h7' sx={{color: '#124559'}}> { item.name } </Typography>
      <Typography sx={{color: '#F6AE2D'}}> ${ item.default_price } </Typography>
      <Rating item={item}/>
      </div>
    </Card>
  );
}

export default Item;