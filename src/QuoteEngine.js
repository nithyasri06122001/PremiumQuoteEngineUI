import React, { useEffect, useState } from "react";
import "./QuoteEngine.css";

const sumInsuredList = [
  500000, 1000000, 1500000, 2000000, 2500000, 5000000, 10000000,
];

const QuoteEngine = () => {
  const [formData, setFormData] = useState({
    productCode: 1,
    productName: "Women Care",
    policyType: "",
    adultCount: 1,
    childCount: 0,
    starExtraProtect: "No",
    sumInsured: "500000",
    paymentPlan: "Full Payment",
    age: "",
  });

  const [premium, setPremium] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await fetch("http://localhost:8080/premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPremium(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(premium);
  }, [premium]);

  return (
    <div className="QuoteEngine">
      <div className="head">
        <p>Quick Quote</p>
        <div className="product">
          <label>Product:</label>
          <select value={formData.productName} onChange={handleChange}>
            <option name="product"> Select Product</option>
            <option name="product">Women Care</option>
          </select>
        </div>
      </div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="row1">
          <div className="input">
            <label>Policy Type:</label>
            <select value={formData.productName} onChange={handleChange}>
              <option type="text" name="policyType">
                Individual
              </option>
              <option type="text" name="policyType">
                Floater
              </option>
            </select>
          </div>
          <div className="input">
            <label>Age :</label>
            <input
              type="number"
              required
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Sum Insured:</label>
            <select
              type="number"
              required
              name="sumInsured"
              value={formData.sumInsured}
              onChange={handleChange}
            >
              {sumInsuredList.map((sum) => {
                return (
                  <option type="number" name="sumInsured">
                    {sum}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="premium">
          {premium
            ? Object.keys(premium).map((key) => {
                return (
                  <p>
                    year {key}:{premium[key]}
                  </p>
                );
              })
            : null}
        </div>

        <div className="button">
          <button type="submit">Get Quote</button>
        </div>
      </form>
    </div>
  );
};

export default QuoteEngine;
