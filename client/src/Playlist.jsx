import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/playlist/${playlistId}`);
      const playlist = await response.json();

      setPlaylist(playlist);
    })();
  }, [playlistId]);

  return (
    <Stack spacing={1}>
      {playlist.notes &&
        playlist.notes.map(({ title, _id }) => (
          <Paper key={_id} sx={{ p: 1 }}>
            {title}
          </Paper>
        ))}
    </Stack>
  );
};

export default Playlist;
