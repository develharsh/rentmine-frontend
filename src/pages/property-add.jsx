import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/globalstate";
import { ACTIONS } from "../store/actions";
import {
  Button,
  TextInput,
  Select,
  Box,
  createStyles,
  NumberInput,
  Checkbox
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import Utils from "../utils/hardcoded";
import { State, City } from "country-state-city";

const PropertyAdd = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DataContext);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setStates(
      State.getStatesOfCountry("IN").map((each) =>
        Object({ label: each.name, value: each.isoCode })
      )
    );
  }, []);
  const form = useForm({
    initialValues: {
      apartmentType: "",
      bhkType: "",
      floor: "",
      totalFloor: "",
      propertyAge: "",
      facing: "",
      billUpArea: "",
      state: "",
      city: "",
      locality: "",
      landmark: "",
      rent: "",
      deposit: "",
      rentNegotiable: false,
      monthlyMaintenance: "",
      maintenanceAmount: "",
      availableFrom: "",
      preferredTenant: "",
      furnishing: "",
      parking: "",
      description: "",
      bathroom: "",
      balcony: "",
      waterSupply: "",
      gym: "",
      nonVegAllowed: "",
      gatedSecurity: "",
      whoWillShowProperty: "",
      secondaryPhone: "",
      availableAmenities: {
        lift: "",
        internetServices: "",
        airConditioner: "",
        clubHouse: "",
        interCom: "",
        swimmingPool: "",
        childrenPlayArea: "",
        fireSafety: "",
        servantRoom: "",
        shoppingCenter: "",
        gasPipeline: "",
        park: "",
        rainWaterHarvesting: "",
        sewageTreatmentPlant: "",
        houseKeeping: "",
        powerBackup: "",
        visitorParking: "",
      },
      photos: [],
      videos: [],
      yourAvailability: {
        days: "",
        allday: "",
        startTime: "",
        endTime: "",
      },
    },

    validate: {
      apartmentType: (value) =>
        value.length ? null : "Please Select Apartment Type.",
      bhkType: (value) => (value.length ? null : "Please Select BHK Type."),
      floor: (value) => (value.length ? null : "Please Select Floor."),
      totalFloor: (value) =>
        value.length ? null : "Please Select Total Floors.",
      propertyAge: (value) =>
        value.length ? null : "Please Select Property Age.",
      billUpArea: (value) =>
        value.length ? null : "Please Enter Billup Area.",
      state: (value) => (value.length ? null : "Please Enter State."),
      city: (value) => (value.length ? null : "Please Enter City."),
      locality: (value) => (value.length ? null : "Please Enter Locality."),
      landmark: (value) => (value.length ? null : "Please Enter Landmark."),
      rent: (value) =>
        !["", undefined].includes(value) ? null : "Please Enter Rent.",
      deposit: (value) =>
        !["", undefined].includes(value) ? null : "Please Enter Deposit.",
    },
  });
  useEffect(() => {
    if (form.values.state)
      setCities(
        City.getCitiesOfState("IN", form.values.state).map((each) =>
          Object({ label: each.name, value: each.name })
        )
      );
    else setCities([]);
  }, [form.values.state]);

  useEffect(() => {
    if (state.userSession === null) {
      navigate("/?callback=property/add");
    }
  }, [state.userSession]);
  const {
    classes,
    // theme
  } = useStyles();

  const handleSubmit = async (values) => {
    return console.log(values);
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = 1;
    dispatch({ type: ACTIONS.LOADING, payload: false });
    if (response.success) {
      showNotification({
        title: "Congrats",
        message: response.message,
        color: "green",
        icon: <IconCheck />,
      });
      form.reset();
      dispatch({ type: ACTIONS.DEMOPOPUP, payload: false });
    } else {
      showNotification({
        title: "Oops",
        message: response.message,
        color: "red",
        icon: <IconX />,
      });
    }
  };

  return (
    <>
      <h1 className={classes.Heading}>List Your Property For FREE</h1>
      <form onSubmit={form.onSubmit((v) => handleSubmit(v))}>
        <Box className={classes.first}>
          <Select
            withAsterisk
            label="Apartment Type"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.apartmentTypes}
            {...form.getInputProps("apartmentType")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="BHK Type"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.bhkTypes}
            {...form.getInputProps("bhkType")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Floor"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.floors}
            {...form.getInputProps("floor")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Total Floor"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.totalFloors}
            {...form.getInputProps("totalFloor")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Property Age"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.propertyAge}
            {...form.getInputProps("propertyAge")}
            className={classes.element}
          />
          <Select
            label="Facing"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.facings}
            {...form.getInputProps("facing")}
            className={classes.element}
          />
          <TextInput
            withAsterisk
            label="Billup Area"
            placeholder="400 Sq ft"
            {...form.getInputProps("billUpArea")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="State of Property"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={states}
            {...form.getInputProps("state")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="City of Property"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={cities}
            {...form.getInputProps("city")}
            className={classes.element}
          />
          <TextInput
            withAsterisk
            label="Locality"
            placeholder="Enter Location/Society Name"
            {...form.getInputProps("locality")}
            className={classes.element}
          />
          <TextInput
            withAsterisk
            label="Landmark"
            placeholder="Evergreen Street"
            {...form.getInputProps("landmark")}
            className={classes.element}
          />
          <NumberInput
            placeholder="5000"
            label="Expected Rent Per Month"
            withAsterisk
            {...form.getInputProps("rent")}
            className={classes.element}
          />
          <NumberInput
            placeholder="5000"
            label="Expected Deposit"
            withAsterisk
            {...form.getInputProps("deposit")}
            className={classes.element}
          />
          <Checkbox
            label="Rent Negotiable?"
            {...form.getInputProps("rentNegotiable")}
          />
          <div className="my-1">
            <Button fullWidth type="submit" className={classes.element}>
              Register
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  Heading: {
    color: "purple",
    textAlign: "center",
  },
  first: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
    // [theme.fn.smallerThan("md")]: {
    //   border: "2px solid blue",
    // },
    // [theme.fn.smallerThan("sm")]: {
    //   border: "2px solid green",
    // },
  },
  element: {
    width: "18rem",
  },
}));

export default PropertyAdd;
