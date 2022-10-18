import { createStyles, Box } from "@mantine/core";
// import React from "react";
import moment from "moment";

const PropertyCard = ({ data }) => {
  const {
    classes,
    // theme
  } = useStyles();
  return (
    <div
      className={classes.PropCard}
      onClick={() => window.open(`/property/${data._id}`, "_blank")}
    >
      <img
        className={classes.thumbnail}
        src={
          data.photos?.at(0)
            ? data.photos?.at(0)?.Location
            : "https://assets.nobroker.in/nb-new/public/List-Page/noProperty.jpg"
        }
        alt="Rentmine Property"
      />
      <Box className={classes.Box1}>
        {data.bhkType} {data.apartmentType} in {data.locality}
      </Box>
      <Box className={classes.Box2}>
        <Box className={classes.Chip}>{data.billUpArea}</Box>
        <Box className={classes.Chip}>₹ {data.deposit}(Deposit)</Box>
        <Box className={classes.Chip}>
          ₹ {data.rent}(Rent, {data.rentNegotiable && "Non-"}Negotiable)
        </Box>
      </Box>
      <Box className={classes.PropBox}>
        <Box className={classes.PropBox1}>
          <p className={classes.PropValue}>
            {data.furnishing}
            <br />
            <span className={classes.PropKey}>Furnishing</span>
          </p>
        </Box>
        <Box className={classes.PropBox1}>
          <p className={classes.PropValue}>
            {data.bhkType}
            <br />
            <span className={classes.PropKey}>Apartment Type</span>
          </p>
        </Box>
      </Box>
      <Box className={classes.PropBox}>
        <Box className={classes.PropBox1}>
          <p className={classes.PropValue}>
            {data.bathroom}
            <br />
            <span className={classes.PropKey}>Bathrooms</span>
          </p>
        </Box>
        <Box className={classes.PropBox1}>
          <p className={classes.PropValue}>
            {moment(data.availableFrom).format("DD-MMM-YYYY")}
            <br />
            <span className={classes.PropKey}>Available From</span>
          </p>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  PropCard: {
    width: "19rem",
    boxShadow: "3px 3px 5px 1px gray",
    cursor: "pointer",
    ["@media (min-width: 40rem)"]: {
      // width: "18rem",
    },
    ["@media (min-width: 80rem)"]: {
      // width: "18rem",
    },
  },
  thumbnail: {
    width: "18.5rem",
    margin: "0.25rem",
    height: "13rem",
    objectFit: "cover",
  },
  Box1: {
    margin: "0 0.25rem",
  },
  Box2: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0.25rem",
    gap: "0.25rem",
    flexWrap: "wrap",
  },
  Chip: {
    background: "#2d3eb9",
    padding: "0 0.75rem",
    borderRadius: "1rem",
    color: "#fff",
  },
  PropBox: {
    display: "flex",
    justifyContent: "space-evenly",
    // backgroundColor:"blue"
  },
  PropBox1: {
    // border: "1px solid gray",
    boxShadow: "1px 2px 2px 2px gray",
    width: "8rem",
    padding: "0 0.75rem",
    // backgroundColor:"red"
    margin: "0.35rem auto",
  },
  PropKey: {
    fontSize: "0.75rem",
    fontWeight: "normal",
  },
  PropValue: {
    fontSize: "0.85rem",
    fontWeight: "600",
  },
}));

export default PropertyCard;
