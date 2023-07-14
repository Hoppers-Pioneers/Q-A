export default function reportQuestion(question_id: number) {
  return {
    method: "PUT",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question_id}/report`,
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
