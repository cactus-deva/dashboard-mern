import React from "react";
import { useList } from "@refinedev/core";
import { PropertyReferral, PieChart, TotalRevenue } from "../components";
import { Box, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#111420">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={30}
          series={[75, 25]}
          colors={["#6a82fb", "lightblue"]}
        />
        <PieChart
          title="Properties for Rent"
          value={400}
          series={[60, 40]}
          colors={["#6a82fb", "lightblue"]}
        />
        <PieChart
          title="Total Customers"
          value={700}
          series={[10, 90]}
          colors={["#6a82fb", "lightblue"]}
        />
        <PieChart
          title="Properties for Cities"
          value={500}
          series={[50, 50]}
          colors={["#6a82fb", "lightblue"]}
        />
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferral />
      </Stack>
    </Box>
  );
};

export default Home;
