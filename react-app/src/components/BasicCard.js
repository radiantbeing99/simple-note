import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "./CustomizedDialog";

export default function BasicCard() {
  const note = {
    dateTime: "2022-02-16 14:13",
    title: "Title",
    description: (
      <div>
        Lorem ipsum dolor sit amet, <br />
        consectetur adipiscing elit.
      </div>
    ),
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {note.dateTime}
        </Typography>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography variant="body2">{note.description}</Typography>
      </CardContent>
      <CardActions>
        <CustomizedDialogs note={note}></CustomizedDialogs>
      </CardActions>
    </Card>
  );
}
