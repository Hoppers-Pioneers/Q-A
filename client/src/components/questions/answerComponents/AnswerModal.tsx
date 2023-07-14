import { TextField, Card, Fade, FormControl, FormLabel, Button, Stack } from "@mui/material";
import { CardContent, Modal, Typography, Divider } from "@mui/joy";
import AnswerPicturesModal from "./AnswerPicturesModal";
import { useCallback, useState } from "react"
import axios from "axios";
import postAnswer from "../requests/postAnswer";

// import axios from "axios";

type AnswerModalProps = {
  question_id: number;
  answerModal: boolean;
  setAnswerModal: (value: boolean) => void;
}

export default function AnswerModal(props: AnswerModalProps) {
  const [picturesModal, setPicturesModal] = useState<boolean>(false); //not the problem

  //These are the form validation and post parts
  const validEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
  const [pictures, setPictures] = useState<string[]>([]);
  const [userName, setUsername] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const validateForm = () => {// This validates the form information
    if (userName.length < 60 && answer.length < 1000
      && validEmail.test(email) && pictures.length < 5) {
      return true;
    }//refector this to use tooltip
    if (userName.length > 60) alert('UserNames can not be over 60 characters');
    if (answer.length > 1000) alert('Your answer must be under 1000 characters.');
    if (!validEmail.test(email)) alert('Please input a valid email address');
    if (pictures.length > 5) alert('Too many pictures');
    return false;
  };
  const postRequest = () => {//axios post request
    axios.request(postAnswer(props.question_id, answer, userName, email, pictures))
      // .then((response) => {
      //   console.log(response.data);
      // })
      .catch((error) => console.log('Error in AnswerModal post request', error))
  }
  //this the the end of form validation and post


  const handleClose = () => {// closes modal not the problem
    props.setAnswerModal(false);
  }
  const conditionalPictures = useCallback(() => {// will show your pictures if you uploaded any
    if (pictures.length > 0) {
      pictures.map((picture) => {
        return (
          <img
            key={pictures.indexOf(picture)}
            src={picture}
            style={{ maxHeight: '100px' }}
            // onClick={() => {
            //   alert("This should make the image bigger but I'm coming back to that")
            // }}
          />
        )
      })
    } else {
      return (<Typography>No Pictures Yet</Typography>)
    }
  }, [pictures])
  return (
    <Modal
      className={'Questions Modal'}
      open={props.answerModal}
      onClose={handleClose}
    >
      <Fade in={props.answerModal}>
        <Card
          variant="outlined"
          className="Questions Modal"
        >
          <Typography
            level="h2"
            fontSize="x1"
          >Submit your Answer</Typography>
          <Typography>this will be the subtitle saying what item</Typography>
          <Divider inset="none" />
          <CardContent>
            <FormControl>
              <FormLabel>userName *</FormLabel>
              <TextField
                required
                defaultValue={''}
                placeholder="Example: jack543!"
                onChange={(e) => {
                  setUsername(e.target.value)
                }} />
              <Typography>For privacy reasons, do not use your full name or email</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Email *</FormLabel>
              <TextField
                multiline={true}
                required
                defaultValue={''}
                inputProps={{ maxLength: 1000 }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }} />
            </FormControl>
            <FormControl>
              <FormLabel>Answer *</FormLabel>
              <TextField
                multiline={true}
                required
                defaultValue={''}
                inputProps={{ maxLength: 1000 }}
                onChange={(e) => {
                  setAnswer(e.target.value)
                }} />
            </FormControl>
            <Card >
              <Stack direction={'row'}>{conditionalPictures()}</Stack>
            </Card>
            <Button
              onClick={() => {
                console.log('OPENING PICTURES MODAL IN ANSWERS')
                setPicturesModal(true)
              }}
            >Pictures</Button>
            <AnswerPicturesModal
              pictures={pictures}
              picturesModal={picturesModal}
              setPictuesModal={setPicturesModal}
              setPictures={setPictures}
            />
            <Button
              type="submit"
              onClick={() => {
                if (validateForm()) {
                  postRequest()
                  props.setAnswerModal(false);
                }
              }}
            >Submit</Button>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  )
}