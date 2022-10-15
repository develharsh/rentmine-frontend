import { createStyles } from "@mantine/core";
// import React from "react";

const PropertyCard = ({ data }) => {
  const {
    classes,
    // theme
  } = useStyles();
  return (
    <div className={classes.PropCard}>
      <img
        className={classes.thumbnail}
        src={data.photos?.at(0)?.Location}
        alt="Rentmine Photo of Property"
      />
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  PropCard: {
    width: "18rem",
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
    width: "17.5rem",
    margin:"0.25rem",
    height: "12rem",
    objectFit:"cover"
  },
}));

export default PropertyCard;
