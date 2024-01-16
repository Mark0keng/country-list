/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import classes from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";

export default function MediaCard({
  name,
  image,
  population,
  region,
  capital,
}) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea
        className={classes.card}
        onClick={() => {
          navigate(`/country/${name.toLowerCase()}`);
        }}
      >
        <CardMedia sx={{ height: 140 }} image={image} title="country-img" />
        <CardContent className={classes.title}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Population</b> : {population}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Region</b> : {region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Capital</b> : {capital}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
