import React, { useEffect, useState } from "react";
import "./QuoteEngine.css";

const sumInsuredList = [
  500000, 1000000, 1500000, 2000000, 2500000, 5000000, 10000000,
];

const initialFormData = {
  productCode: 1,
  productName: "",
  policyType: "Individual",
  adultCount: 1,
  childCount: 0,
  starExtraProtect: "No",
  sumInsured: "500000",
  paymentPlan: "Full Payment",
  age: "",
};

const QuoteEngine = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [premium, setPremium] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.policyType === "Individual") {
      setFormData({
        ...formData,
        adultCount: initialFormData.adultCount,
        childCount: initialFormData.childCount,
      });
    }
  }, [formData.policyType]);

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
  return (
    <div className="QuoteEngine">
      <div className="head">
        <p>Quick Quote</p>
        <div className="product">
          <label>Product:</label>
          <select
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          >
            <option value="">Select Product</option>
            <option value="Women Care">Women Care</option>
          </select>
        </div>
      </div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="row1">
          <div className="input">
            <label>Policy Type:</label>
            <select
              name="policyType"
              value={formData.policyType}
              onChange={handleChange}
            >
              <option type="text" value="Individual">
                Individual
              </option>
              <option type="text" value="Floater">
                Floater
              </option>
            </select>
          </div>

          {formData.policyType === "Floater" && (
            <div className="input">
              <label>No of Adult</label>
              <select
                name="adultCount"
                value={formData.adultCount}
                onChange={handleChange}
              >
                <option type="number" value="1">
                  1
                </option>
                <option type="number" value="2">
                  2
                </option>
              </select>
            </div>
          )}
          {formData.policyType === "Floater" && (
            <div className="input">
              <label>No of Child</label>
              <select
                name="childCount"
                value={formData.childCount}
                onChange={handleChange}
              >
                {formData.adultCount > 1 && (
                  <option type="number" value="0">
                    0
                  </option>
                )}

                <option type="number" value="1">
                  1
                </option>
                <option type="number" value="2">
                  2
                </option>
                <option type="number" value="3">
                  3
                </option>
              </select>
            </div>
          )}

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
                  <option key={sum} type="number" name="sumInsured">
                    {sum}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input">
            <label>Payment Method:</label>
            <select
              type="text"
              name="paymentPlan"
              value={formData.paymentPlan}
              onChange={handleChange}
            >
              <option type="text" value="Full Payment">
                Full Payment
              </option>
              <option type="text" value="Half-Yearly EMI Plan">
                Half-Yearly EMI Plan
              </option>
              <option type="text" value="Quarterly EMI Plan">
                Quarterly EMI Plan
              </option>
            </select>
          </div>
        </div>
        <div className="premium">
          {premium
            ? Object.keys(premium).map((key) => {
                return (
                  <div className="Quote" key={key}>
                    <p className="year">{key} year</p>
                    <p>₹ {premium[key]}</p>
                  </div>
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
