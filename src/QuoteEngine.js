import React, { useEffect, useState } from "react";
import "./QuoteEngine.css";
import bootstrap from "bootstrap";

const sumInsuredListProduct1 = [
  500000, 1000000, 1500000, 2000000, 2500000, 5000000, 10000000,
];
const sumInsuredListProduct2 = [
  500000, 750000, 1000000, 1500000, 2000000, 2500000, 5000000, 7500000,
  10000000,
];

const sumInsuredListProduct3 = [100000, 200000, 300000, 400000, 500000, 750000];

const sumInsuredListProduct3F = [1000000, 1500000, 2000000, 2500000];

const initialFormData = {
  productCode: "",
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

  const [isChecked, setIsChecked] = useState(false);

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

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setFormData({ ...formData, starExtraProtect: "Yes" });
    } else if (!isChecked) {
      setFormData({ ...formData, starExtraProtect: "No" });
    }
  }, [isChecked]);

  return (
    <div className="col QuoteEngine bg-white">
      <div className="col-12 d-flex justify-content-between">
        <p>Quick Quote</p>
<<<<<<< HEAD
        <div className="d-flex">
          <label>Product</label>
          <select
            className="form-select"
=======
        <div className="product">
          <label style={{ display: "block", width: "130px" }}>Product:</label>
          <select
            style={{ marginTop: "14px" }}
>>>>>>> 525b5d810619659563f288f7ef51fe2432fe318c
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Select Product
            </option>
            <option type="number" value="1">
              Women Care
            </option>
            <option type="number" value="2">
              Star Comprehensive
            </option>
            <option type="number" value="3">
              Senior Citizen Red Carpet
            </option>
          </select>
        </div>
      </div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="col-12 d-flex  justify-content-around">
            <div className="d-flex input product">
              <label>Policy Type</label>
              <select
                className="form-select "
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
              <div className="input product">
                {formData.productCode !== "3" ? (
                  <label>No of Adult</label>
                ) : (
                  <label>No of Senior Citizen</label>
                )}
                <select
                  className="form-select"
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
          </div>
          <div className="col-6">
            {formData.policyType === "Floater" &&
              formData.productCode !== "3" && (
                <div className="input product">
                  <label>No of Child</label>
                  <select
                    className="form-select"
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
          </div>
          <div className="input">
            <label>Age </label>
            <input
              type="number"
              required
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="input product">
            <label>Sum Insured</label>
            <select
              className="form-select"
              type="number"
              required
              name="sumInsured"
              value={formData.sumInsured}
              onChange={handleChange}
            >
              {formData.productCode === "1" &&
                sumInsuredListProduct1.map((sum) => {
                  return (
                    <option key={sum} type="number" name="sumInsured">
                      {sum}
                    </option>
                  );
                })}
              {formData.productCode === "2" &&
                sumInsuredListProduct2.map((sum) => {
                  return (
                    <option key={sum} type="number" name="sumInsured">
                      {sum}
                    </option>
                  );
                })}
              {formData.productCode === "3" &&
                formData.policyType !== "Floater" &&
                sumInsuredListProduct3.map((sum) => {
                  return (
                    <option key={sum} type="number" name="sumInsured">
                      {sum}
                    </option>
                  );
                })}
              {formData.productCode === "3" &&
                sumInsuredListProduct3F.map((sum) => {
                  return (
                    <option key={sum} type="number" name="sumInsured">
                      {sum}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        {formData.productCode === "2" && formData.sumInsured >= 1000000 && (
          <div>
            <p>Do you want STAR EXTRA PROTECT ?</p>
            <div className="flex">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
              />
              <p>SECTION 1</p>
            </div>
            <p>1. Enhanced Room Rent</p>

            <p>2. Claim Guard (Consumables cover)</p>

            <p>3. Enhanced Limit for Modern Treatments</p>

            <p>4. Enhanced Limit for Ayush Treatment</p>

            <p>5. Home care treatment</p>

            <p>6. Bonus Guard</p>
          </div>
        )}

        <div className="input product">
          <label>Payment Method</label>
          <select
            className="form-select form-select-sm mb-3"
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
