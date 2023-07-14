// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Box, Fade, Modal, Card, CardContent, Button } from "@mui/material";
import { FormControl, FormLabel, Input } from '@mui/joy';
import { useState } from 'react';

const PhotosModal = ({isWriting, setAddingPhotos, style, setFormData, formData, addingPhotos}) => {

  const [photoUrl, setPhotoUrl] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleChildClose = () => {
    setAddingPhotos(false);
  }

  const validPhotoUrl = new RegExp('^(http(s?):)([/.\\w\\s-])*.(?:jpg|gif|png)', 'i')

  const handlePhotoSubmission = () => {
    if (validPhotoUrl.test(photoUrl)) {
      setFormData({
        ...formData,
        photos: [...(formData.photos || []), photoUrl]
      })
      handleChildClose();
    } else {
      setIsInvalid(true);
      setPhotoUrl('');
      setInputValue('');
      setErrorMessage("Enter a valid url.")
    }
  }

  const handleInputChange = (e) => {
    isInvalid === true ? setIsInvalid(false) : null;
    errorMessage ? setErrorMessage('') : null;
    setInputValue(e.target.value)
    setPhotoUrl(e.target.value);
  }

  return (
        <Box>
          <Modal
          open={addingPhotos}
          onClose={handleChildClose}>
            <Fade in={isWriting}>
              <Card variant="outlined" sx={style}>
                <CardContent>
                <FormControl>
                  <FormLabel>Photo Url:</FormLabel>
                  <Input multiline="true" error={isInvalid} value={inputValue} placeholder={errorMessage} onChange={handleInputChange}/>
                  <Button onClick={handlePhotoSubmission} sx={{
                    marginTop: "10px",
                    color: "#525252"
                  }}>Submit</Button>
                </FormControl>
                </CardContent>
              </Card>
            </Fade>
          </Modal>
        </Box>
  )
}

export default PhotosModal;