import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box, Typography } from "@mui/material";

function Title({ collapsed }: { collapsed: boolean }) {
  return (
    <Box display={"flex"}>
      <AcUnitIcon sx={{ marginRight: collapsed ? 0 : 2 }} />
      <Typography
        fontSize={18}
        fontWeight={600}
        color="initial"
        display={collapsed ? "none" : "block"}
      >
        Dashboard
      </Typography>
    </Box>
  );
}
export default Title;
