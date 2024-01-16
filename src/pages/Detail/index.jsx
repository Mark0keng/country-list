import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../../components/Navbar";

import classes from "./style.module.scss";
import { callAPI } from "../../domain/api";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../../components/Theme";

const DetailCountry = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const fetchData = async () => {
    const response = await callAPI(`/name/${name}`, "GET");

    const modifiedData = response?.map((item) => {
      return {
        common: item.name.common,
        native: item.name.nativeName,
        flags: item.flags.svg,
        population: item.population,
        region: item.region,
        subregion: item.subregion,
        capital: item.capital,
        tld: item.tld,
        currencies: item.currencies,
        languages: item.languages,
        borders: item.borders,
      };
    });

    setCountry(modifiedData[0]);
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Navbar onToggleTheme={toggleTheme} />
      <div className={classes.container}>
        <div className={classes.back}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            <ArrowBackIcon /> Back
          </Button>
        </div>
        <Grid container spacing={5}>
          <Grid item sm={12} md={6}>
            <div>
              <img
                src={country?.flags}
                alt="country-flag"
                className={classes.flagImage}
              />
            </div>
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography gutterBottom variant="h6" component="div">
              {country?.common}
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <b>Native Name</b> :{" "}
                  {country?.native[Object?.keys(country?.native)[0]]?.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Population</b> : {country?.population}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Region</b> : {country?.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Sub Region</b> : {country?.subregion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Capital</b> : {country?.capital}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <b>Top Level Domain</b> : {country?.tld}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Currencies</b> :{" "}
                  {
                    country?.currencies[Object?.keys(country?.currencies)[0]]
                      ?.name
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* Languages :{country?.languages} */}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  <b>Border Countries</b> : {country?.borders?.join(", ")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* <div className={classes.countryContainer}> */}
      {/* <div className={classes.countryFlag}>
          <img
            src={country?.flags}
            alt="country-flag"
            className={classes.flagImage}
          />
        </div>

        <div className={classes.countryInfo}>
          <div className={}>
            <Typography gutterBottom variant="h6" component="div">
              {country?.common}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Native Name : {country?.native}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Population : {country?.population}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Region : {country?.region}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sub Region : {country?.subregion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Capital : {country?.capital}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Top Level Domain : {country?.tld}
            </Typography>
          </div>
        </div>
      </div> */}
    </ThemeProvider>
  );
};

export default DetailCountry;
