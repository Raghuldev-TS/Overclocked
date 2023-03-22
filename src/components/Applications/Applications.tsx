import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchApplications, fetchOfferLists } from "../../confiq/actions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Modal from "@mui/material/Modal";
import "./Applications.css";
import CustomizedMenus from "../Common/CustomMenu";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Applications = () => {
  const dispatch = useDispatch();
  const {
    applicationLoading: loading,
    applications,
    offerLists,
    offerListLoading,
  } = useSelector((state: any) => state.users);

  const [offersLists, setOffersList] = useState(offerLists);

  useEffect(() => {
    setOffersList(offerLists);
  }, [offerLists]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchApplicationsList = async () => {
    await dispatch(fetchApplications());
  };

  useEffect(() => {
    fetchApplicationsList();
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

  console.log({ offerLists });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Applications
      </Typography>
      <Card variant="outlined">
        {applications?.map((application: any, index: number) => {
          return (
            <CardContent
              key={index}
              sx={{
                ":last-child": { paddingBottom: "16px" },
                " p": {
                  marginBottom: 0,
                },
              }}
            >
              <Grid container>
                <Grid item sm={6}>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    University Name
                  </Typography>
                  <p style={{ color: "#000", fontSize: "21px" }}>
                    {" "}
                    {application.university}
                  </p>
                </Grid>
                <Grid item sm={4}>
                  <Box className="loan-amount">
                    <p>Loan Amount</p>
                    <p className="amount">{application.loan_amount}</p>
                  </Box>
                </Grid>
                <Grid
                  item
                  sm={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<LocalOfferIcon />}
                    size="small"
                    onClick={async () => {
                      await dispatch(
                        fetchOfferLists(
                          application.offers_url.replace(
                            "https://api.sfd.interview.ovckd.dev/v1",
                            ""
                          )
                        )
                      );
                      // console.log("clicked");
                      handleOpen();
                    }}
                  >
                    View Offers
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          );
        })}
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Offers</Typography>
            <CustomizedMenus
              buttonText={"Filters"}
              listOptions={[
                {
                  text: "Sort Tenure by asc",
                  onClick: () => {
                    const newList = [...offersLists].sort((a: any, b: any) => {
                      return parseInt(a.tenure) - parseInt(b.tenure);
                    });
                    setOffersList(newList);
                  },
                },
                {
                  text: "Sort Tenure by desc",
                  onClick: () => {
                    const newList = [...offersLists].sort((a: any, b: any) => {
                      return parseInt(b.tenure) - parseInt(a.tenure);
                    });
                    setOffersList(newList);
                  },
                },
                {
                  text: "Sort Interest rate by asc",
                  onClick: () => {
                    const newList = [...offersLists].sort((a: any, b: any) => {
                      return (
                        parseFloat(a.interest_rate) -
                        parseFloat(b.interest_rate)
                      );
                    });
                    setOffersList(newList);
                  },
                },
                {
                  text: "Sort Interest rate by desc",
                  onClick: () => {
                    const newList = [...offersLists].sort((a: any, b: any) => {
                      return (
                        parseFloat(b.interest_rate) -
                        parseFloat(a.interest_rate)
                      );
                    });
                    setOffersList(newList);
                  },
                },
              ]}
            />
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {offersLists?.map((offer: any, index: number) => {
              return (
                <Grid item md={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box>
                        <img
                          height={20}
                          src={offer.bank_logo}
                          alt=""
                          style={{ marginBottom: "10px" }}
                        />
                      </Box>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        {offer.bank}
                      </Typography>
                      <Typography
                        sx={{ mb: 1, fontSize: 14 }}
                        color="text.secondary"
                      >
                        Interest Rate:- {offer.interest_rate}%
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Tenure:- {offer.tenure} years
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default Applications;
