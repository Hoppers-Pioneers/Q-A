import { Card, Typography } from "@mui/material";
import { AddCircle } from '@mui/icons-material';
function OutfitAdd({ setOutfit, outfit, current}) {

  const handleClick = () => {
    let temp: object[] = [];
    temp = temp.concat(outfit);
    temp.push(current);
    for (let i = 0; i < outfit.length; i++) {
      if (current.id === outfit[i].id) {
        return;
      }
    }
    setOutfit(temp);
  }

  return (
    <Card onClick={handleClick} sx={{padding: '10px',margin:'5px', minWidth:'calc(20% - 29px)'}}>
      <div className="item-card">
        <AddCircle sx={{fontSize:100, margin:0, marginBottom:5}}/>
        <Typography>Add To Outfit</Typography>
      </div>
    </Card>
  );
}

export default OutfitAdd;