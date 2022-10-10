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
  Checkbox,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import Utils from "../utils/hardcoded";
import { State, City } from "country-state-city";

const PropertyAdd = () => {
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
        lift: false,
        internetServices: false,
        airConditioner: false,
        clubHouse: false,
        interCom: false,
        swimmingPool: false,
        childrenPlayArea: false,
        fireSafety: false,
        servantRoom: false,
        shoppingCenter: false,
        gasPipeline: false,
        park: false,
        rainWaterHarvesting: false,
        sewageTreatmentPlant: false,
        houseKeeping: false,
        powerBackup: false,
        visitorParking: false,
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
      maintenanceAmount: (value) =>
        form.values.monthlyMaintenance == "Maintenance Included" ||
        !["", undefined].includes(value)
          ? null
          : "Please Enter Monthly Maintenance Amount.",
      availableFrom: (value) =>
        value ? null : "Please Enter Date of Availability.",
      preferredTenant: (value) =>
        value.length ? null : "Please Select Preferred Tenant.",
      furnishing: (value) =>
        value.length ? null : "Please Select Furnishing.",
      parking: (value) => (value.length ? null : "Please Select Parking."),
      bathroom: (value) =>
        !["", undefined].includes(value)
          ? null
          : "Please Enter No. of Bathrooms.",
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
      // window.open("/?callback=property/add", "_self");
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
            className={classes.element}
          />
          <Select
            label="Monthly Maintenance"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={["Maintenance Included", "Maintenance Extra"]}
            {...form.getInputProps("monthlyMaintenance")}
            className={classes.element}
          />
          {form.values.monthlyMaintenance === "Maintenance Extra" && (
            <NumberInput
              withAsterisk
              placeholder="300"
              label="Monthly Maintenance Amount"
              {...form.getInputProps("maintenanceAmount")}
              className={classes.element}
            />
          )}
          <DatePicker
            placeholder="Select date"
            label="Available From"
            withAsterisk
            {...form.getInputProps("availableFrom")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Preferred Tenant"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.preferredTenants}
            {...form.getInputProps("preferredTenant")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Furnishing"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.furnishings}
            {...form.getInputProps("furnishing")}
            className={classes.element}
          />
          <Select
            withAsterisk
            label="Parking"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.parkings}
            {...form.getInputProps("parking")}
            className={classes.element}
          />
          <Textarea
            label="Description"
            placeholder="This semi furnished 1 BHK is available for rent in Sector 40..."
            {...form.getInputProps("description")}
            className={classes.element}
          />
          <NumberInput
            placeholder="No. of Bathroom"
            label="Bathroom"
            withAsterisk
            {...form.getInputProps("bathroom")}
            className={classes.element}
          />
          <NumberInput
            placeholder="No. of Balcony"
            label="Balcony"
            {...form.getInputProps("balcony")}
            className={classes.element}
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
    // alignItems: "center",
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
