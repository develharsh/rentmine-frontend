import { useEffect, useContext, useState } from "react";
import { createStyles } from "@mantine/core";
import { ACTIONS, PropertyListReq } from "../store/actions";
import { DataContext } from "../store/globalstate";
import PropertyCard from "../components/custom/property-card";

const PropertyList = () => {
  const {
    classes,
    // theme
  } = useStyles();
  const { dispatch } = useContext(DataContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchPropertyListReq(setProperties, dispatch);
  }, []);
  return (
    <>
      <h1 className={classes.Heading}>Property List</h1>
      <div className={classes.gridOfProps}>
        {properties.map((each, idx) => (
          <PropertyCard data={each} key={idx} />
        ))}
      </div>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  Heading: {
    color: "red",
    textAlign: "center",
  },
  photos: {
    width: "18rem",
  },
  gridOfProps: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: "1rem",
    // [theme.fn.smallerThan("md")]: {
    //   border: "2px solid blue",
    // },
    // [theme.fn.smallerThan("sm")]: {
    //   border: "2px solid green",
    // },
  },
}));

const fetchPropertyListReq = async (setProperties, dispatch) => {
  try {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await PropertyListReq();
    setProperties(response.data);
  } catch (error) {
    dispatch({ type: ACTIONS.LOADING, payload: false });
    setProperties([]);
  }
};

export default PropertyList;
