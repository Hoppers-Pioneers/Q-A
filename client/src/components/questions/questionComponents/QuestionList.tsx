import { Box, Button, Stack, Typography } from "@mui/joy";
import QuestionListEntry from "./QuestionListEntry";
import QuestionModal from "./QuestionModal";
import { useCallback, useState } from "react";
import { Card } from "@mui/material";

type QuestionListProps = {
  setNumQuestions: (value: number) => void;
  numQuestions: number;
  itemId: number;
  questionSort: string;
  searchQuery: string;
  questions: {
    question_id: number;
    question_body: string;
    question_date: string;
    asker_name: string;
    question_helpfulness: number;
    reported: boolean;
    answers: object[];
  }[];
  questionsCache: {
    question_id: number;
    question_body: string;
    question_date: string;
    asker_name: string;
    question_helpfulness: number;
    reported: boolean;
    answers: object[];
  }[];
};

export default function QuestionList(props: QuestionListProps) {
  const [questionModal, setQuestionModal] = useState<boolean>(false); //tracks if this is visable
  const mappingQuestions = useCallback(() => {
    //either maps the questions array or displays "no questions"
    if (props.questions.length === 0) {
      //if there are no questions [complete]
      return (
        <>
          <Typography
            sx={{
              justifyContent: "center",
              textAlign: "center",
            }}
            level="h1"
          >
            No Questions At This time
          </Typography>
        </>
      );
    } else if (props.searchQuery.length >= 3) {
      //if there is a searchQuery [need to highlight every occurance of that word (use split set style and join probably)]
      return props.questions.map((question) => {
        if (
          !question.reported &&
          question.question_body.includes(props.searchQuery)
        ) {
          return (
            <QuestionListEntry
              searchQuery={props.searchQuery}
              key={props.questions.indexOf(question)}
              question={question}
            />
          );
        }
      });
    } else {
      // if there is no searchQuery
      return props.questions.map((question) => {
        if (!question.reported) {
          return (
            <QuestionListEntry
              key={props.questions.indexOf(question)}
              question={question}
            />
          );
        }
      });
    }
  }, [props.searchQuery, props.questions]);

  const renderQuestionModal = () => {
    //conditional rendering of QuestionModal
    if (questionModal) {
      return (
        <QuestionModal
          productId={props.itemId}
          questionModal={questionModal}
          setQuestionModal={setQuestionModal}
        />
      );
    }
  };
  const renderingMoreQuestions = () => {
    if (props.questions.length > props.questionsCache.length) {
      return (
        <Button onClick={moreQuestionsOnClick}>MORE ANSWERED QUESTIONS</Button>
      );
    }
  };

  const moreQuestionsOnClick = () => {
    //displays more questions
    props.setNumQuestions(props.numQuestions + 2);
  };

  return (
    <Box className={"Questions QuestionList"}>
      <Card>{mappingQuestions()}</Card>
      <Box>{renderQuestionModal()}</Box>
      <Stack className="Questions QuestionsList Buttons" direction={"row"}>
        {renderingMoreQuestions()}

        <Button
          onClick={() => {
            setQuestionModal(true);
          }}
        >
          ASK A QUESTION +
        </Button>
      </Stack>
    </Box>
  );
}
