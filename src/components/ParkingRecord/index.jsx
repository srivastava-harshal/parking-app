import React, { useEffect, useState } from "react";
import { Input, Table, Button } from "antd";

import { getParkingRecords } from "../../utils/store";

const { Search } = Input;

const columns = [
  {
    title: "Owner Name",
    dataIndex: "ownerName",
    key: "ownerName",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Vehicle Number",
    dataIndex: "vehicleNumber",
    key: "vehicleNumber",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "Check-In Time",
    dataIndex: "checkIn",
    key: "checkIn",
  },
  {
    title: "Check-Out Time",
    dataIndex: "checkOut",
    key: "checkOut",
  },
];

const ParkingRecord = ({ setActiveKey }) => {
  const res = getParkingRecords();
  const [searchValue, setSearchValue] = useState("");
  const [dataSource, setDataSource] = useState(res);

  useEffect(() => {
    setDataSource(
      res.filter((row) => {
        return Object.values(row).some((el) =>
          `${el}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }, [searchValue]);

  return (
    <div className="feedback-table-container">
      <div className="feedback-table-header">
        <div className="table-top">
          <p>
            {dataSource.length ? `${dataSource.length} records found` : null}
          </p>
          <Button onClick={() => setActiveKey("parking")} type="primary">
            Add new
          </Button>
        </div>
        <div className="feedback-table-header-cta">
          <Search
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ParkingRecord;
