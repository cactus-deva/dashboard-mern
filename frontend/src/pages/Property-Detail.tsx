import { ChatBubble, Delete, Edit, Phone, Place, Star } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import React from "react";
import { useNavigate, useParams } from "react-router";
import CustomButton  from "../components/common/CustomButton";

const checkImage = (url: string) => {
  const image = new Image();
  image.src = url;
  return image.width !== 0 && image.height !== 0;
};

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<any>();
  const { queryResult } = useShow<any>();
  const { data, isLoading, isError } = queryResult;
  const {id} = useParams()
  const {mutate} = useDelete<any>()
  const Properties = data?.data ?? [];
  const isCurrentUser = user?.email === Properties.creator?.email

  const handleDeleteProperty = () => {
    const response =  confirm("Do you want to DELETE this property?")
    if(response) {
      mutate({
        resource: "properties",
        id: id as string,
      },
    {
      onSuccess: () => {
        navigate("/properties")
      }
    })
    }
  }

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  console.log(Properties, 'properties>>')
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="100%"
    >
      <Typography fontSize={25} fontWeight={500} color="#11142d">
        Detail
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{
          xs: "column",
          lg: "row",
        }}
        gap={10}
        mt="10px"
      >
        <Box flex={1} width="100%">
          <img
            src={Properties.photo}
            width="100%"
            height={546}
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform="capitalize"
              >
                {Properties.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((i) => {
                  return <Star key={i} sx={{ color: "#f2c94c" }} />;
                })}
              </Box>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  mt="10px"
                >
                  {Properties.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place
                    sx={{
                      color: "#808191",
                    }}
                  />
                  <Typography fontSize={14} color="#11142d">
                    {Properties.location}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color="#11142d"
                  mt="10px"
                >
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={600} color="#475be8">
                    ${Properties.price}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="column" alignItems="flex-start" gap={1}>
              <Typography
                fontSize={16}
                fontWeight={600}
                color="#11142d"
                mt="10px"
              >
                Description
              </Typography>
              <Typography fontSize={16} fontWeight={600} color="#808191">
                {Properties.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          flex={1}
          maxWidth={{xs: "100%", lg: "380px"}}
          width="100%"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            padding={2}
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #e4e4e4"
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(Properties.creator.avatar)
                    ? Properties.creator.avatar
                    : "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                }
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <Box mt="15px">
                <Typography fontSize={16} fontWeight={600} color="#11142d">
                  {Properties.creator.name}
                </Typography>
                <Typography
                  mt="2px"
                  fontSize={14}
                  fontWeight={600}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>
              <Stack mt="15px">
                <Typography
                  mt="2px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  <Place sx={{color: "#808191"}} />
                  Bangkok, TH
                </Typography>
              </Stack>
              <Typography
                  mt="1px"
                  fontSize={16}
                  fontWeight={600}
                  color="#11142d"
                >
                 {Properties.creator.allProperties.length} {Properties.creator.allProperties.length <= 1 ? "Property" : "Properties"}
                </Typography>
            </Stack>
            <Stack
            width="100%"
            mt="25px"
            direction="row"
            flexWrap="wrap"
            gap={2}
            >
              <CustomButton
              title={!isCurrentUser ? "Message" : "Edit"}
              backgroundColor="#475be8"
              color="#fcfcfc"
              fullWidth
              icon={isCurrentUser ? <ChatBubble/> : <Edit />}
              handleClick={() => {
                navigate(`/properties/edit/${Properties._id}`)
              }}
              />
              <CustomButton
              title={!isCurrentUser ? "Call" : "Delete"}
              backgroundColor={!isCurrentUser ? "#2ed480" : "#d42e2e"}
              color="#fcfcfc"
              fullWidth
              icon={isCurrentUser ? <Phone /> : <Delete />}
              handleClick={() => {
                if(isCurrentUser) handleDeleteProperty()
              }}
              />
            </Stack>
          </Stack>
          <Stack>
            <img src="https://www.researchgate.net/publication/358118475/figure/fig6/AS:1116417764130830@1643186145997/Map-of-Southern-Thailand-highlighting-the-main-cities-of-the-region-Source-Wikitravel.jpg" />
          </Stack>
          <CustomButton
              title="Book Now"
              backgroundColor="#475be8"
              color="#fcfcfc"
              fullWidth
              />
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
