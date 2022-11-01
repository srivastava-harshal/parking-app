import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { TimePicker } from "antd";

import { saveAndUpdate } from "../../utils/store";

const initialFormData = {
  ownerName: "",
  vehicleNumber: "",
  checkIn: "",
  checkOut: "",
};

const format = "HH:mm:ss";

const ParkingForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);

  const handleChange = (key, value) => {
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const validate = () => {
    const obj = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        obj[key] = `This is a mandatory field.`;
      }
    });
    setErrors({ ...obj });
    return !Object.values(obj).some((e) => e);
  };

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      saveAndUpdate(formData);
      setFormData(initialFormData);
    }
  };

  return (
    <div>
      <Form className="parking-form" layout="vertical">
        <div className="left-section">
          <Form.Item
            required
            label="Vehicle Owner"
            validateStatus={errors.ownerName ? "error" : ""}
            help={errors.ownerName}
          >
            <Input
              value={formData.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value)}
              placeholder="Enter Vehicle Owner Name"
            />
          </Form.Item>
          <Form.Item
            required
            label="Vehicle Registration Number"
            validateStatus={errors.vehicleNumber ? "error" : ""}
            help={errors.vehicleNumber}
          >
            <Input
              value={formData.vehicleNumber.toUpperCase()}
              onChange={(e) => handleChange("vehicleNumber", e.target.value)}
              placeholder="Enter Vehicle Registration Number"
            />
          </Form.Item>
        </div>
        <div className="right-section">
          <div className="right-top">
            <Form.Item
              required
              label="Check-In Time"
              validateStatus={errors.checkIn ? "error" : ""}
              help={errors.checkIn}
            >
              <TimePicker
                style={{ width: "250px" }}
                format={format}
                value={formData.checkIn}
                onChange={(e) => {
                  // const time = e._d.toString().split(" ")[4];
                  handleChange("checkIn", e);
                }}
              />
            </Form.Item>
            <Form.Item
              required
              label="Check-Out Time"
              validateStatus={errors.checkOut ? "error" : ""}
              help={errors.checkOut}
            >
              <TimePicker
                style={{ width: "250px" }}
                format={format}
                value={formData.checkOut}
                onChange={(e) => {
                  handleChange("checkOut", e);
                }}
              />
            </Form.Item>
          </div>
          <div className="button">
            <Button
              style={{ width: "200px" }}
              type="primary"
              onClick={onSubmit}
            >
              Alot Parking
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ParkingForm;
