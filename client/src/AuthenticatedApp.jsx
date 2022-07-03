import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./Video";

const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="video/:youtubeVideoId" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
