import { useState } from "react";
import Container from "@mui/material/Container";
import YouTube from "react-youtube";
import styles from "./AuthenticatedApp.module.scss";

const AuthenticatedApp = () => {
  const [player, setPlayer] = useState(null);

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
