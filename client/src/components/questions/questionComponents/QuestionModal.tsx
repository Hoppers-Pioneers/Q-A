import { TextField, Card, Fade, FormControl, FormLabel, Button, Modal } from "@mui/material";
import { CardContent, Typography, Divider } from "@mui/joy";
import axios from "axios";
import postQuestion from "../requests/postQuestion";
import { useState } from "react"

type QuestionModalProps = {
    productId: number;
    questionModal: boolean;
    setQuestionModal: (value: boolean) => void;
}

export default function QuestionModal(props: QuestionModalProps) {

    const [question, setQuestion] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const validEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    const isValid = () => {
        if (nickName.length > 3 && validEmail.test(email)) {
            return true
        }
        if (question.length > 600) alert('Question is too long');
        if (nickName.length < 3) alert('Nick names must be at least 3 characters long');
        if (!validEmail.test(email)) alert('Please input a valid email address')
        return false;
    }




    const handleClose = () => {
        props.setQuestionModal(false);
    }

    const postRequest = () => {//axios post request
        axios.request(postQuestion(props.productId, nickName, question, email))
            // .then(response => {
            //     console.log(response.status)
            // })
            .catch(error => console.log('error in questions post request', error))
    }

    return (
        <Modal
            className={'Questions QuestionModal'}
            open={props.questionModal}
            onClose={handleClose}
        >
            <Fade in={props.questionModal}>
                <Card
                    variant="outlined"
                    className="Questions QuestionModal modal"
                >
                    <Typography
                        level="h2"
                        fontSize="x1"
                    >Submit your Question</Typography>
                    <Typography>this will be the subtitle saying what item</Typography>
                    <Divider inset="none" />
                    <CardContent>
                        <FormControl>
                            <FormLabel>Question *</FormLabel>
                            <TextField
                                required
                                multiline={true}
                                defaultValue={' '}
                                placeholder="Question You want to ask"
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nickname *</FormLabel>
                            <TextField
                                required
                                inputProps={{ maxLength: 60 }}
                                defaultValue={' '}
                                onChange={(e) => {
                                    setNickName(e.target.value);
                                }} />
                            <Typography>For privacy reasons, do not use your full name or email</Typography>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email *</FormLabel>
                            <TextField
                                required
                                defaultValue={' '}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                        </FormControl>
                        <Button
                            type="submit"
                            onClick={() => {
                                if (isValid()) {
                                    postRequest();
                                    props.setQuestionModal(false)
                                }
                            }}
                        >Submit</Button>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
}