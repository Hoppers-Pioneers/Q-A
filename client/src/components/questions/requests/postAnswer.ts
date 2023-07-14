export default function postAnswer(
  question_id: number,
  body: string,
  name: string,
  email: string,
  photos: string[] = []
) {
  return {
    method: "POST",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question_id}/answers`,
    data: {
      body: body,
      name: name,
      email: email,
      photos: photos,
    },
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
