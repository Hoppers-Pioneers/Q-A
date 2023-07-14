// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Box } from '@mui/material'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography, Divider } from '@mui/joy';
import characteristics from './Characteristics';
import { Stack } from '@mui/material'

const CharacteristicsList = ({ productRatings, selectedValues, setSelectedValues, setFormData, formData }) => {

  const handleChange = (event, char) => {
    setFormData({
      ...formData,
      characteristics: {
        ...(formData.characteristics || {}),
        [productRatings.characteristics[char].id]: Number(event.target.value)}
    })
    setSelectedValues({ ...selectedValues, [productRatings.characteristics[char].id]: Number(event.target.value)});
  };

  return (
    <>
      {Object.keys(productRatings.characteristics).map((char, index) => (
        <Stack key={index} justifyContent={'center'}>
          <FormLabel sx={{
            marginBottom: '15px',
            alignSelf: 'center',
            marginTop: '10px',
            marginRight: '22px',
            color: "#25252D"
            }}>{char}:</FormLabel>
            <RadioGroup
            color='neutral'
            onChange={(event) => handleChange(event, char)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'end',
              maxWidth: "auto",
              position: "relative"
            }}
          >
            {Object.entries(characteristics[char]).map((descriptor, index) => (
              <Box>
                {index === 0 ?
                <Typography sx={{
                  position: "absolute",
                  top: '-50%',
                  left: '7.825%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  color: "#25252D"
                  }}
                  level='body3'
                  >
                  {descriptor[1]}
                </Typography> : null}
                {index === 4 ?
                <Typography sx={{
                  position: "absolute",
                  top: '-50%',
                  left: '87.755%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  color: "#25252D"
                  }}
                  level='body3'
                  >
                  {descriptor[1]}
                </Typography> : null}
                <FormControlLabel
                  key={index}
                  value={descriptor[0]}
                  control={<Radio color='neutral' />}
                />
              </Box>
            ))}
          </RadioGroup>
          <Divider
          sx={{
            marginY: '20px'
          }}
          />
        </Stack>
      ))}
    </>
  );
            }

export default CharacteristicsList;