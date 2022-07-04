import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import YouTube from "react-youtube";
import { format } from "date-fns";
import styles from "./Video.module.scss";
import { Typography } from "@mui/material";

const Video = () => {
  const { youtubeVideoId } = useParams();
  const [player, setPlayer] = useState(null);
  const [video, setVideo] = useState({});
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/video/${youtubeVideoId}`,
        { credentials: "include" }
      );
      const video = await response.json();
      setVideo(video);
    })();
  }, [youtubeVideoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const note = { text: noteText, time: player.getCurrentTime() };

    try {
      // TODO: consider optimistic update
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/video/${youtubeVideoId}/note`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      const video = await response.json();
      setVideo(video);
      setNoteText("");
    } catch (err) {
      alert(err);
    }
  };

  const formatTime = (time) => format(time * 1000, "mm:ss");

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <div className={styles.youtubePlayerWrapper}>
        <YouTube
          className={styles.youtubePlayer}
          videoId={youtubeVideoId}
          onReady={(event) => setPlayer(event.target)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel htmlFor="note-text">Note</InputLabel>
          <OutlinedInput
            id="note-text"
            label="Note"
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
          />
        </FormControl>
      </form>
      <Stack spacing={1}>
        {video.notes &&
          video.notes.map(({ text, time }) => (
            <Paper
              sx={{ display: "flex", p: 2 }}
              onClick={() => player.seekTo(time)}
            >
              <Typography color="primary" sx={{ mr: 1 }}>
                {formatTime(time)}
              </Typography>{" "}
              {text}
            </Paper>
          ))}
      </Stack>
    </Container>
  );
};

export default Video;
