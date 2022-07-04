import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useAuth } from "./auth/useAuth";
import Header from "./common/Header";
import Playlist from "./Playlist";
import Video from "./Video";

const drawerWidth = 240;

const AuthenticatedApp = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <Link to={`playlist/${user.watchLater}`}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Watch Later" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 11 }}>
          <Container maxWidth="md">
            <Routes>
              <Route path="playlist/:playlistId" element={<Playlist />} />
              <Route path="video/:youtubeVideoId" element={<Video />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default AuthenticatedApp;
