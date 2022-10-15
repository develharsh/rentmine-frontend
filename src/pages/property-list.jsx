import { useEffect, useContext, useState } from "react";
import { createStyles } from "@mantine/core";
import { ACTIONS, PropertyListReq } from "../store/actions";
import { DataContext } from "../store/globalstate";

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
      {properties.map((each, idx) => (
        <div key={idx}>
          <div>
            {each.photos.map((photo, idx) => (
              <img
                key={idx}
                className={classes.photos}
                src={photo.Location}
                alt="rentmine"
              />
            ))}
          </div>
          <p>{each.bhkType}.</p>
        </div>
      ))}
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
