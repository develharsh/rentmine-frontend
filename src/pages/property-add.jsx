import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/globalstate";
import { ACTIONS, PropertyAddReq } from "../store/actions";
import {
  Button,
  TextInput,
  Select,
  Box,
  createStyles,
  NumberInput,
  Radio,
  Textarea,
  FileInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import Utils from "../utils/hardcoded";
import { State, City } from "country-state-city";
// import { useNavigate } from "react-router-dom";

const PropertyAdd = () => {
  const { state, dispatch } = useContext(DataContext);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [photos, setPhotos] = useState([]);
  // const navigate = useNavigate();

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
      phone: "",
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
    },

    // validate: {
    //   apartmentType: (value) =>
    //     value.length ? null : "Please Select Apartment Type.",
    //   bhkType: (value) => (value.length ? null : "Please Select BHK Type."),
    //   floor: (value) => (value.length ? null : "Please Select Floor."),
    //   totalFloor: (value) =>
    //     value.length ? null : "Please Select Total Floors.",
    //   propertyAge: (value) =>
    //     value.length ? null : "Please Select Property Age.",
    //   billUpArea: (value) =>
    //     value.length ? null : "Please Enter Billup Area.",
    //   state: (value) => (value.length ? null : "Please Enter State."),
    //   city: (value) => (value.length ? null : "Please Enter City."),
    //   locality: (value) => (value.length ? null : "Please Enter Locality."),
    //   landmark: (value) => (value.length ? null : "Please Enter Landmark."),
    //   rent: (value) =>
    //     !["", undefined].includes(value) ? null : "Please Enter Rent.",
    //   deposit: (value) =>
    //     !["", undefined].includes(value) ? null : "Please Enter Deposit.",
    //   maintenanceAmount: (value) =>
    //     form.values.monthlyMaintenance === "Maintenance Included" ||
    //     !["", undefined].includes(value)
    //       ? null
    //       : "Please Enter Monthly Maintenance Amount.",
    //   availableFrom: (value) =>
    //     value ? null : "Please Enter Date of Availability.",
    //   preferredTenant: (value) =>
    //     value.length ? null : "Please Select Preferred Tenant.",
    //   furnishing: (value) =>
    //     value.length ? null : "Please Select Furnishing.",
    //   parking: (value) => (value.length ? null : "Please Select Parking."),
    //   bathroom: (value) =>
    //     !["", undefined].includes(value)
    //       ? null
    //       : "Please Enter No. of Bathrooms.",
    //   gym: (value) => (value.length ? null : "Please Select Gym."),
    //   nonVegAllowed: (value) =>
    //     value.length ? null : "Please Select Food Choice.",
    //   gatedSecurity: (value) =>
    //     value.length ? null : "Please Select Security Type.",
    //   phone: (value) =>
    //     !["", undefined].includes(value)
    //       ? null
    //       : "Please Enter Contact Number.",
    //   availableAmenities: {
    //     lift: (value) => (value.length ? null : "Please Select Lift."),
    //     internetServices: (value) =>
    //       value.length ? null : "Please Select Internet Services.",
    //     airConditioner: (value) =>
    //       value.length ? null : "Please Select Air Conditioner.",
    //     clubHouse: (value) =>
    //       value.length ? null : "Please Select Club House.",
    //     interCom: (value) => (value.length ? null : "Please Select Intercom."),
    //     swimmingPool: (value) =>
    //       value.length ? null : "Please Select Swimming Pool.",
    //     childrenPlayArea: (value) =>
    //       value.length ? null : "Please Select Children Play Area.",
    //     fireSafety: (value) =>
    //       value.length ? null : "Please Select Fire Safety.",
    //     servantRoom: (value) =>
    //       value.length ? null : "Please Select Servant Room.",
    //     shoppingCenter: (value) =>
    //       value.length ? null : "Please Select Shopping Center.",
    //     gasPipeline: (value) =>
    //       value.length ? null : "Please Select Gas Pipeline.",
    //     park: (value) => (value.length ? null : "Please Select Park."),
    //     rainWaterHarvesting: (value) =>
    //       value.length ? null : "Please Select Rain Water Harvesting.",
    //     sewageTreatmentPlant: (value) =>
    //       value.length ? null : "Please Select Sewage Treatment Plant.",
    //     houseKeeping: (value) =>
    //       value.length ? null : "Please Select House Keeping.",
    //     powerBackup: (value) =>
    //       value.length ? null : "Please Select Power Backup.",
    //     visitorParking: (value) =>
    //       value.length ? null : "Please Select Visitor Parking.",
    //   },
    // },
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
    // alert("photos");
    const files = form.values.photos;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPhotos((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }, [form.values.photos]);

  useEffect(() => {
    if (state.userSession === null) {
      window.open("/?callback=property/add", "_self");
    }
  }, [state.userSession]);
  const {
    classes,
    // theme
  } = useStyles();

  const handleSubmit = async (values) => {
    values = prepareForRequest(values, photos);
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await PropertyAddReq(values);
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
          <Radio.Group
            {...form.getInputProps("rentNegotiable")}
            label="Rent Negotiable?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
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
          <Select
            label="Water Supply"
            placeholder="Click to Select"
            searchable
            clearable
            nothingFound="No options"
            data={Utils.waterSupplies}
            {...form.getInputProps("waterSupply")}
            className={classes.element}
          />
          <Radio.Group
            withAsterisk
            {...form.getInputProps("gym")}
            label="Gym?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("nonVegAllowed")}
            label="Non Veg Allowed?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("gatedSecurity")}
            label="Gated Security?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <NumberInput
            withAsterisk
            placeholder="8077014444"
            label="Contact No."
            {...form.getInputProps("phone")}
            className={classes.element}
          />
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.lift")}
            label="Lift?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.internetServices")}
            label="Internet Services?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.airConditioner")}
            label="Air Conditioner?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.clubHouse")}
            label="Club House?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.interCom")}
            label="Inter Com?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.swimmingPool")}
            label="Swimming Pool?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.childrenPlayArea")}
            label="Children Play Area?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.fireSafety")}
            label="Fire Safety?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.servantRoom")}
            label="Servant Room?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.shoppingCenter")}
            label="Shopping Center?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.gasPipeline")}
            label="Gas Pipeline?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.park")}
            label="Park?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.rainWaterHarvesting")}
            label="Rain Water Harvesting?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.sewageTreatmentPlant")}
            label="Sewage Treatment Plant?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.houseKeeping")}
            label="House Keeping?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.powerBackup")}
            label="Power Backup?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <Radio.Group
            withAsterisk
            {...form.getInputProps("availableAmenities.visitorParking")}
            label="Visitor Parking?"
            className={classes.element}
          >
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Radio.Group>
          <FileInput
            placeholder="Click to Select"
            label="Photos of Property"
            multiple
            withAsterisk
            {...form.getInputProps("photos")}
            className={classes.element}
            accept="image/*"
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

const prepareForRequest = (values, photos) => {
  const myForm = new FormData();
  myForm.append("apartmentType", values.apartmentType);
  myForm.append("bhkType", values.bhkType);
  myForm.append("floor", values.floor);
  myForm.append("totalFloor", values.totalFloor);
  myForm.append("propertyAge", values.propertyAge);
  if (values.facing) myForm.append("facing", values.facing);
  myForm.append("billUpArea", values.billUpArea);
  myForm.append("state", values.state);
  myForm.append("city", values.city);
  myForm.append("locality", values.locality);
  myForm.append("landmark", values.landmark);
  myForm.append("rent", values.rent);
  myForm.append("deposit", values.deposit);
  if (values.rentNegotiable)
    myForm.append("rentNegotiable", values.rentNegotiable);
  myForm.append("monthlyMaintenance", values.monthlyMaintenance);
  if (values.monthlyMaintenance === "Maintenance Extra")
    myForm.append("maintenanceAmount", values.maintenanceAmount);
  myForm.append("availableFrom", values.availableFrom);
  myForm.append("preferredTenant", values.preferredTenant);
  myForm.append("furnishing", values.furnishing);
  myForm.append("parking", values.parking);
  if (values.description) myForm.append("description", values.description);
  myForm.append("bathroom", values.bathroom);
  if (values.balcony) myForm.append("balcony", values.balcony);
  myForm.append("waterSupply", values.waterSupply);
  myForm.append("gym", values.gym);
  myForm.append("nonVegAllowed", values.nonVegAllowed);
  myForm.append("gatedSecurity", values.gatedSecurity);
  myForm.append("phone", values.phone);
  myForm.append("availableAmenities.lift", values.availableAmenities.lift);
  myForm.append(
    "availableAmenities.internetServices",
    values.availableAmenities.internetServices
  );
  myForm.append(
    "availableAmenities.airConditioner",
    values.availableAmenities.airConditioner
  );
  myForm.append(
    "availableAmenities.clubHouse",
    values.availableAmenities.clubHouse
  );
  myForm.append(
    "availableAmenities.interCom",
    values.availableAmenities.interCom
  );
  myForm.append(
    "availableAmenities.swimmingPool",
    values.availableAmenities.swimmingPool
  );
  myForm.append(
    "availableAmenities.childrenPlayArea",
    values.availableAmenities.childrenPlayArea
  );
  myForm.append(
    "availableAmenities.fireSafety",
    values.availableAmenities.fireSafety
  );
  myForm.append(
    "availableAmenities.servantRoom",
    values.availableAmenities.servantRoom
  );
  myForm.append(
    "availableAmenities.shoppingCenter",
    values.availableAmenities.shoppingCenter
  );
  myForm.append(
    "availableAmenities.gasPipeline",
    values.availableAmenities.gasPipeline
  );
  myForm.append("availableAmenities.park", values.availableAmenities.park);
  myForm.append(
    "availableAmenities.rainWaterHarvesting",
    values.availableAmenities.rainWaterHarvesting
  );
  myForm.append(
    "availableAmenities.sewageTreatmentPlant",
    values.availableAmenities.sewageTreatmentPlant
  );
  myForm.append(
    "availableAmenities.houseKeeping",
    values.availableAmenities.houseKeeping
  );
  myForm.append(
    "availableAmenities.powerBackup",
    values.availableAmenities.powerBackup
  );
  myForm.append(
    "availableAmenities.visitorParking",
    values.availableAmenities.visitorParking
  );
  photos.forEach((image) => {
    myForm.append("photos", image);
  });
  // yourAvailability: {
  //   days: "",
  //   allday: "",
  //   startTime: "",
  //   endTime: "",
  // },

  return myForm;
};

export default PropertyAdd;
