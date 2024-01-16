import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// eslint-disable-next-line react/prop-types
export default function Navbar({ onToggleTheme }) {
  // eslint-disable-next-line no-unused-vars
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Where in the world?
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={onToggleTheme} color="inherit">
            {themeMode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
            <Typography variant="p" fontSize={14} paddingLeft={1}>
              Dark Mode
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
