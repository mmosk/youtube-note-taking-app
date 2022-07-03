import { useState } from "react";
import Container from "@mui/material/Container";
import YouTube from "react-youtube";
import { format } from "date-fns";
import styles from "./Video.module.scss";
import { useParams } from "react-router-dom";

const Video = () => {
  const params = useParams();
  const [player, setPlayer] = useState(null);

  const formatTime = (time) => format(time * 1000, "mm:ss");

  const createNote = (text) => {
    const note = { text, time: player.getCurrentTime() };
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <div className={styles.youtubePlayerWrapper}>
        <YouTube
          className={styles.youtubePlayer}
          videoId={params.youtubeVideoId}
          onReady={(event) => setPlayer(event.target)}
        />
      </div>
    </Container>
  );
};

export default Video;
