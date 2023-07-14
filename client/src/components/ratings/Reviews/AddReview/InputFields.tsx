// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { TextField } from "@mui/material";
import { FormControl, FormLabel } from "@mui/joy";

const InputFields = ({
  name,
  required,
  multiline,
  styles,
  handleFormChange,
  rows,
}) => {
  console.log(name)
  return (
    <FormControl required={required} sx={styles}>
      <FormLabel>{name}:</FormLabel>
      <TextField
        name={name === "Product Review" ? "body" : name.toLowerCase()}
        size="small"
        rows={rows}
        placeholder={""}
        multiline={multiline}
        onChange={handleFormChange}
      />
    </FormControl>
  );
};

export default InputFields;
