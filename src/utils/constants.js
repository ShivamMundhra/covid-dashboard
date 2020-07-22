const ROOT_URL = "https://api.covid19india.org/v4/min";
const STATE_NAMES = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CT: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UT: "Uttarakhand",
  UP: "Uttar Pradesh",
  WB: "West Bengal",
  AN: "Andaman and Nicobar Islands",
  CH: "Chandigarh",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi",
  JK: "Jammu and Kashmir",
  LA: "Ladakh",
  LD: "Lakshadweep",
  PY: "Puducherry",
  TT: "India",
};

const stateCodes = [];
const stateCodesMap = {};
Object.keys(STATE_NAMES).map((key, index) => {
  stateCodesMap[STATE_NAMES[key]] = key;
  stateCodes.push({ code: key, name: STATE_NAMES[key] });
  return null;
});
export const STATE_CODES = stateCodesMap;
export const STATE_CODES_ARRAY = stateCodes;

const COMMON_THEME = {
  total: "#f44336",
  totalBar: "#f44336ad",
  recoverd: "#4caf50",
  deceased: "#607d8b",
  active: "#009688",
  greenSecondary: "#59d495",
};

const BASE_THEME = {
  primary: "#fff",
  secondary: "#f4f8fd",
};

const DARK_THEME = {
  secondary: "#122222",
  primary: "#161625",
  tertiary: "#282c34",
  purlpe: "#1e1e2e",
  test: "#131b2d",
  navbar: "#1f2940",
  label: "#5f65de",
  switch: "#273350",
};

export { ROOT_URL, STATE_NAMES, BASE_THEME, DARK_THEME, COMMON_THEME };
