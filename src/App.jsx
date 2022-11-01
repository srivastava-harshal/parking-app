import { useState } from "react";
import { Tabs } from "antd/lib";

import ParkingForm from "./components/ParkingForm";
import ParkingRecord from "./components/ParkingRecord";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  const [activeKey, setActiveKey] = useState("parking");

  const items = [
    {
      key: "parking",
      label: "Parking Form",
      children: <ParkingForm />,
    },
    {
      key: "records",
      label: "Parking Records",
      children: <ParkingRecord setActiveKey={setActiveKey} />,
    },
  ];

  return (
    <div className="App">
      <Tabs
        onChange={setActiveKey}
        activeKey={activeKey}
        destroyInactiveTabPane
        type="card"
        className="parking-tabs"
        items={items}
      />
    </div>
  );
}

export default App;
