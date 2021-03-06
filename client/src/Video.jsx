import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import YouTube from "react-youtube";
import { format } from "date-fns";
import styles from "./Video.module.scss";

const Video = () => {
  const { youtubeVideoId } = useParams();
  const [player, setPlayer] = useState(null);
  const [video, setVideo] = useState({});
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/video/${youtubeVideoId}`);
      const video = await response.json();

      setVideo(video);
    })();
  }, [youtubeVideoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const note = { text: noteText, time: player.getCurrentTime() };

    // TODO: consider optimistic update
    const response = await fetch(`/api/video/${youtubeVideoId}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const video = await response.json();

    setVideo(video);
    setNoteText("");
  };

  const deleteNote = async (event, id) => {
    event.stopPropagation();

    const response = await fetch(`/api/video/${youtubeVideoId}/note/${id}`, {
      method: "DELETE",
    });
    const video = await response.json();

    setVideo(video);
  };

  const formatTime = (time) => format(time * 1000, "mm:ss");

  return (
    <>
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
          video.notes.map(({ time, text, _id }) => (
            <Paper
              key={_id}
              className={styles.deleteButtonWrapper}
              sx={{ display: "flex", alignItems: "center", p: 1 }}
              onClick={() => player.seekTo(time)}
            >
              <Typography color="primary" sx={{ mx: 1 }}>
                {formatTime(time)}
              </Typography>{" "}
              {text}
              <IconButton
                className={styles.deleteButton}
                sx={{ ml: "auto" }}
                size="small"
                onClick={(event) => deleteNote(event, _id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          ))}
      </Stack>
    </>
  );
};

export default Video;
