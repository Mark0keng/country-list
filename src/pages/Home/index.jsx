import { useEffect, useState } from "react";

import MediaCard from "../../components/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CssBaseline, Grid, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./style.module.scss";
import Navbar from "../../components/Navbar";

import { callAPI } from "../../domain/api";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../../components/Theme";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (region === "") {
      fetchCountries();
    }
    fetchRegion();
  }, [region]);

  useEffect(() => {
    setTimeout(() => fetchCountries(), 300);
    fetchRegion();
  }, [country]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const fetchCountries = async () => {
    let response = "";

    if (country === "") {
      response = await callAPI("/all", "GET");
    } else {
      response = await callAPI(`/name/${country}`, "GET");
    }

    const modifiedData = response?.map((item) => {
      return {
        name: item.name.common,
        flags: item.flags.svg,
        population: item.population,
        region: item.region,
        capital: item.capital,
      };
    });

    setCountries(modifiedData.slice(0, 20));
  };

  const fetchRegion = async () => {
    const response = await callAPI(`/region/${region}`, "GET");
    const modifiedData = response?.map((item) => {
      return {
        name: item.name.common,
        flags: item.flags.svg,
        population: item.population,
        region: item.region,
        capital: item.capital,
      };
    });

    setCountries(modifiedData.slice(0, 10));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Navbar onToggleTheme={toggleTheme} />
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <TextField
            id="outlined-basic"
            label="Search for a country..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            sx={{ m: 1, width: "100%" }}
          />

          <FormControl sx={{ m: 1, width: "50%" }}>
            <InputLabel id="filter-region">Filter By Region</InputLabel>
            <Select
              labelId="filter-region"
              id="filter-region"
              value={region}
              label="Filter By Region"
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value="">
                <em>All Region</em>
              </MenuItem>
              <MenuItem value={"africa"}>Africa</MenuItem>
              <MenuItem value={"america"}>America</MenuItem>
              <MenuItem value={"asia"}>Asia</MenuItem>
              <MenuItem value={"europe"}>Europe</MenuItem>
              <MenuItem value={"oceania"}>Oceania</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={7}>
          {countries?.map((country, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <MediaCard
                  name={country.name}
                  image={country.flags}
                  population={country.population}
                  capital={country.capital}
                  region={country.region}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Home;
