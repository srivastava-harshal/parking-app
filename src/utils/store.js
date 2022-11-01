import moment from "moment";
import uuid from "./uuid";

export const saveAndUpdate = (data = {}) => {
  let records = [];

  const existingData = window.localStorage.getItem("records");

  // If data exists, parse the data and store it in records
  if (existingData !== null) {
    const parsedData = JSON.parse(existingData);
    records = parsedData || [];
  }

  // Else store data with separate key for each record
  const key = uuid();
  records.push({ key, ...data });
  window.localStorage.setItem("records", JSON.stringify(records));
};

export const getParkingRecords = () => {
  const existingData = window.localStorage.getItem("records");
  if (existingData !== null) {
    const parsedData = JSON.parse(existingData);
    return parsedData.map((record) => ({
      ...record,
      checkIn: moment(record.checkIn).format("hh:mm a DD-MMM-YYYY"),
      checkOut: moment(record.checkOut).format("hh:mm a DD-MMM-YYYY"),
    }));
    // return parsedData || [];
  }
  return [];
};
