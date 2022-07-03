import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import YouTube from "react-youtube";
import { format } from "date-fns";
import styles from "./Video.module.scss";
import { useParams } from "react-router-dom";

const Video = () => {
  const { youtubeVideoId } = useParams();
  const [player, setPlayer] = useState(null);
  const [video, setVideo] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:5000/video/${youtubeVideoId}`,
        { credentials: "include" }
      );
      const video = await response.json();
      setVideo(video);
    })();
  }, []);

  const formatTime = (time) => format(time * 1000, "mm:ss");

  const createNote = (text) => {
    const note = { text, time: player.getCurrentTime() };
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <div className={styles.youtubePlayerWrapper}>
        <YouTube
          className={styles.youtubePlayer}
          videoId={youtubeVideoId}
          onReady={(event) => setPlayer(event.target)}
        />
      </div>
      <pre>{JSON.stringify(video, null, 2)}</pre>
    </Container>
  );
};

export default Video;
