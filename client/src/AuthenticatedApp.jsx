import { useState } from "react";
import Container from "@mui/material/Container";
import YouTube from "react-youtube";
import { format } from "date-fns";
import styles from "./AuthenticatedApp.module.scss";

const AuthenticatedApp = () => {
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
          videoId="2g811Eo7K8U"
          onReady={(event) => setPlayer(event.target)}
        />
      </div>
    </Container>
  );
};

export default AuthenticatedApp;
