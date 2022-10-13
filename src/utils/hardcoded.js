const values = {
  BASE_URL:
    process.env[
      `REACT_APP_BASE_URL_${process.env.REACT_APP_MODE.toUpperCase()}`
    ],
  apartmentTypes: [
    "Apartment",
    "Independent House/Villa",
    "Gated Community Villa",
  ],
  bhkTypes: ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"],
  floors: ["Ground"],
  totalFloors: ["Ground Only"],
  propertyAge: [
    "Less than a Year",
    "1 to 3 Year",
    "3 to 5 Year",
    "5 to 10 Year",
    "More than 10 Year",
  ],
  facings: [
    "North",
    "South",
    "East",
    "West",
    "North East",
    "South East",
    "North West",
    "South West",
    "Don't Know",
  ],
  preferredTenants: ["Doesn't Matter", "Family", "Bachelors", "Company"],
  furnishings: ["Fully furnished", "Semi-furnished", "Unfurnished"],
  parkings: ["Bike", "Car", "Both", "None"],
  waterSupplies: ["Corporation", "Borewell", "Both"],
};

for (let i = 1; i <= 99; ++i) {
  values.floors.push(i.toString());
  values.totalFloors.push(i.toString());
}

export default values;
