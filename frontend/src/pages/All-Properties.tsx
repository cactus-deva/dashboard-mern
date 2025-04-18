import React, { useMemo } from "react";
import { PropertyCard } from "../components";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router";
import { useTable } from "@refinedev/core";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const AllProperties = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
    setPageSize
  } = useTable();

  const AllProperties = data?.data ?? [];
  const currentPrice = sorter.find((item) => item.field === "price")?.order;
  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilters = useMemo(() => {
    const logical = filters.flatMap((item) => ("field" in item ? item : []));
    return {
      title: logical.find((item) => item.field === "title")?.value || "",
      propertyType:
        logical.find((item) => item.field === "propertyType")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;
  return (
    <Box>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Stack direction="column" width="100%">
          <Typography mt={1} fontSize={25} fontWeight={600} color="#11142d">
            {AllProperties.length > 0 ? "All Properties" : "No Properties"}
          </Typography>
          <Box
            mb={2}
            mt={1}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mt={{ xs: "20px", sm: "0px" }}
            >
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search Property"
                value={currentFilters.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-lable": "Without label" }}
                defaultValue=""
                value={currentFilters.propertyType}
                onChange={(e: any) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["Apartment", "Villa", "Farmhouse", "Condo", " Studio"].map(
                  (type) => {
                    return (
                      <MenuItem key={type} value={type.toLowerCase()}>
                        {type}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </Box>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <CustomButton
              title="Add Property"
              handleClick={() => navigate("/properties/create")}
              backgroundColor="#475be8"
              color="#fcfcfc"
              icon={<Add />}
            />
          </Stack>
        </Stack>
        {AllProperties.map((property) => {
          return (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          );
        })}
      </Box>
      {AllProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap={5}
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-lable": "Without label" }}
            defaultValue={10}
            onChange={(e: any) => {
              setPageSize(e.targetvalue ? Number(e.target.value) : 10)
            }}
          >
            <MenuItem value="">All</MenuItem>
            {[5,10,20,30].map(
              (size) => {
                return (
                  <MenuItem key={size} value={size}>
                    Show {size}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
