import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      {playlist.videos &&
        playlist.videos.map((id) => (
          <Link to={`/video/${id}`}>
            <Paper sx={{ p: 2 }}>{id}</Paper>
          </Link>
        ))}
    </Stack>
  );
};

export default Playlist;
