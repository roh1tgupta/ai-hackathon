import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    loadingBox: {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      background: "#ffffffe0",
      top: 0,
      zIndex: 2,
      left: 0,
    },
    successStatus: {
      background: "#fff",
    },
  })
);

export default function LoadingBox({ children, loading, success }) {
  const classes = useStyles();

  return (
    <Box className={`${classes.loadingBox} ${success ? classes.successStatus : ""}`}>
      {loading && <LinearProgress />}
      <Box
        display="flex"
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        px={2}
      >
        {children}
      </Box>
    </Box>
  );
}
