export default function reportAnswer(answer_id: number) {
  return {
    method: "PUT",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${answer_id}/report`,
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
