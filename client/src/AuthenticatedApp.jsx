import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Video from "./Video";

const AuthenticatedApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="video/:youtubeVideoId" element={<Video />} />
      </Routes>
    </Router>
  );
};

export default AuthenticatedApp;
