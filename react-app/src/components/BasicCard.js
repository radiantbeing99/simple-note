import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          2022-02-16 14:13
        </Typography>
        <Typography variant="h5" component="div">
          제목
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Donec vel enim eget nisi pretium molestie.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">자세히</Button>
      </CardActions>
    </Card>
  );
}
