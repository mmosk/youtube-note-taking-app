import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function UnauthenticatedApp() {
  return (
    <Box sx={{ p: 16 }}>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h2" component="div" gutterBottom>
          YouTube Note Taking App
        </Typography>
      </Box>
    </Box>
  );
}

export default UnauthenticatedApp;
