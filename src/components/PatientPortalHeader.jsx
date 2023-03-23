import React from "react";
import { Box } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';

const Comp = () => {
  return (
    <Box color="#3f51b5" fontSize="25px" fontWeight="700" justifyContent="center" display="flex" alignItems="center">
      <HealingIcon color="primary" />
      <Box display="inline" marginLeft="10px"> Patient Portal </Box>
    </Box>
  );
};

export default Comp;
