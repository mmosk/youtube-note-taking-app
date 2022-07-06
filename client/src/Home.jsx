import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/video`);
      const videos = await response.json();

      setVideos(videos);
    })();
  }, []);

  const navigateTo = (youtubeVideoId) => navigate(`video/${youtubeVideoId}`);

  const deleteVideo = async (event, id) => {
    event.stopPropagation();

    try {
      await fetch(`/api/video/${id}`, { method: "DELETE" });

      setVideos((videos) => videos.filter(({ _id }) => _id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack spacing={1}>
      {videos.map(({ youtubeVideoId, _id }) => (
        <Paper
          onClick={() => navigateTo(youtubeVideoId)}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            cursor: "pointer",
          }}
        >
          {youtubeVideoId}
          <IconButton
            sx={{ ml: "auto" }}
            size="small"
            onClick={(event) => deleteVideo(event, _id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Paper>
      ))}
    </Stack>
  );
};

export default Home;
