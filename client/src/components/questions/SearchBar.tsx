import { Box, TextField } from "@mui/material";

type SearchBarProps = {
  setQuestionSort: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps) {

  const searchFunc = (query: string) => {
    if (query.length >= 3) {
      props.setQuestionSort(query);
    }
  }
  return (
    <Box className={'Questions SearchBar'}>
      <TextField
        className="Question Searchbar Bar"
        type={"search"}
        id="QuestionSearchBar"
        defaultValue={props.searchQuery}
        placeholder="Have a question? Search for answers…"
        onChange={(e) => {
          searchFunc(e.target.value);
        }}
      />
    </Box>
  )
}