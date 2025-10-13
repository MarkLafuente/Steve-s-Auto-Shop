import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const SignOutDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      // maxWidth="xs"
      // fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: "350px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          m: 4,
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" mt="10px" alignItems="center" justifyContent="center" color= "#000000ff" gap={1}>
          <LogoutIcon />
          <Typography fontSize={"18px"} fontWeight={"bold"}>Sign Out</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography textAlign="center" color= "#000000ff" fontWeight={"normal"} fontSize={"14px"}>
          Are you sure you want to sign out?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",    
          gap: 2,  
          mt: 2,
          pb: 3 
        }}
      >
        <Button onClick={onClose} sx={{ color: "#000000ff", backgroundColor: "e0e0e0", "&:hover":{backgroundColor: "#bdbdbd"}}}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Sign Out
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default SignOutDialog;