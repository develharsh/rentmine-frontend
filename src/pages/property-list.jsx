import React from "react";
import { createStyles } from "@mantine/core";
import { ACTIONS, PropertyListReq } from "../store/actions";
import { DataContext } from "../store/globalstate";
import { useEffect } from "react";

const PropertyList = () => {
  const {
    classes,
    // theme
  } = useStyles();
  const { dispatch } = React.useContext(DataContext);
  const [properties, setProperties] = React.useState(null);

  React.useEffect(() => {
    alert("xx");
    if (properties == null) {
      alert("yy");
    //   dispatch({ type: ACTIONS.LOADING, payload: true });
      fetchPropertyListReq(setProperties);
    } else {
      alert("z");
    //   dispatch({ type: ACTIONS.LOADING, payload: false });
    }
  }, [properties]);
  return (
    <>
      <h1 className={classes.Heading}>Property List</h1>
      {properties?.map((each, idx) => (
        <div key={idx}>{each.bhkType}</div>
      ))}
    </>
  );
};

const useStyles = createStyles((theme) => ({
  Heading: {
    color: "red",
    textAlign: "center",
  },
}));

const fetchPropertyListReq = async (setProperties) => {
  const response = await PropertyListReq();
  if (response.success) setProperties(response.data);
  else setProperties([]);
};

export default PropertyList;
