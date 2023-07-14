import { Card, IconButton, Stack, Modal, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import Request from "./Request";
import { Clear, StarBorder } from "@mui/icons-material";

function Action1({ setModal, current, item }) {
  const [open, setOpen] = useState(false);
  const [compare, setCompare] = useState({});

  useEffect(() => {
    setModal(open);
  }, [open])

  const handleOpen = () => {
    setOpen(true);
    Request.getById(current.id).then((res) => {
      let a = res.data;
      const features = {};
      for (let i = 0; i < a.features.length; i++) {
        features[a.features[i].feature] = {}
        features[a.features[i].feature].main = a.features[i].value;
      }
      for (let i = 0; i < item.features.length; i++) {
        features[item.features[i].feature] ||= {}
        features[item.features[i].feature].compare = item.features[i].value;
      }
      setCompare(features);
    });
  }

  const cardStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '5px'
  }

  const textStyle = {
    width:'100%',
    textAlign:'center',
    backgroundColor: '#FBFFF1'
  }
  return (<div>
    <Modal open={open} onClose={() => { setOpen(false) }} sx={{width:'100%', height:'100%'
    }} disableEnforceFocus>
      <div style={{
      position: 'absolute',
      width: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: 'rgba(41,41,41,0.6)'
      }}>
      <Stack direction='row' spacing={2} sx={{marginBottom: '10px'}}>
        <Card sx={cardStyle}><Typography variant='h6' sx={textStyle}>{current.name}</Typography></Card>
        <Card sx={cardStyle}><Typography variant='h6' sx={textStyle}>Feature</Typography></Card>
        <Card sx={cardStyle}><Typography variant='h6' sx={textStyle}>{item.name}</Typography></Card>
      </Stack>
      <br/>
        {
          Array.from(Object.keys(compare)).map((feature, index) => {
            return (
              <div key={index}>
                <Stack direction='row' spacing={2} sx={{marginBottom: '5px'}}>
                  <Card sx={cardStyle}><Typography sx={textStyle}>{compare[feature].main || 'N/A'}</Typography></Card>
                  <Card sx={cardStyle}><Typography sx={textStyle}>{feature}</Typography></Card>
                  <Card sx={cardStyle}><Typography sx={textStyle}>{compare[feature].compare || 'N/A'}</Typography></Card>
                </Stack>
              </div>
            );
          })
        }
      </div>
    </Modal>
    <IconButton onClick={handleOpen} sx={{ color: 'black', backgroundColor: 'rgba(255,255,20,0.1)', position: 'absolute', right: '2px', top: '2px' }}><StarBorder fontSize='small' /></IconButton>
  </div>);
}
function Action2({ item, outfit, setOutfit }) {

  const handleClick = () => {
    let temp: object[] = [];
    temp = temp.concat(outfit);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == item.id) {
        temp.splice(i, 1);
      }
    }
    setOutfit(temp);
  }

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ color: 'black', backgroundColor: 'rgba(255,255,20,0.1)', position: 'absolute', right: '2px', top: '2px' }}><Clear fontSize='small' /></IconButton>
    </div>)
}

export {
  Action1,
  Action2
}