import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { fetchUsers } from "../../confiq/actions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const alignCenter = { display: "flex", alignItems: "center", gap: "10px" };

const Users = () => {
  // const [users, setUsers] = useState([1, 1, 1, 1, 1, 1, 1]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: any) => state.users);

  const fetchUsersList = async () => {
    await dispatch(fetchUsers());
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        User
      </Typography>
      <Grid container spacing={2}>
        {/* {users.map((user: any) => ( */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Profile
              </Typography>
              <Typography variant="h5" component="div" sx={alignCenter}>
                <AccountCircleIcon />
                {/* <Avatar {...stringAvatar(user?.name)} /> */}
                {user?.name}
              </Typography>
              <Typography sx={alignCenter} color="text.secondary">
                <EmailIcon />
                {user?.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                startIcon={<FileCopyIcon />}
                size="small"
                onClick={() => {
                  navigate("/applications");
                }}
              >
                View Application
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* ))} */}
      </Grid>
    </Box>
  );
};

export default Users;
