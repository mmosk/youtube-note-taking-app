import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/video`);
      const videos = await response.json();

      setVideos(videos);
    })();
  }, []);

  return (
    <Stack spacing={1}>
      {videos.map(({ youtubeVideoId }) => (
        <Link key={youtubeVideoId} to={`/video/${youtubeVideoId}`}>
          <Paper sx={{ p: 2 }}>{youtubeVideoId}</Paper>
        </Link>
      ))}
    </Stack>
  );
};

export default Home;
