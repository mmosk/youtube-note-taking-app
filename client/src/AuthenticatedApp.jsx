import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./common/Header";
import Home from "./Home";
import Video from "./Video";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Header />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="video/:youtubeVideoId" element={<Video />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default AuthenticatedApp;
