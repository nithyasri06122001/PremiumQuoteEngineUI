import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sumInsuredListProduct1 = [
  500000, 1000000, 1500000, 2000000, 2500000, 5000000, 10000000,
];
const sumInsuredListProduct2 = [
  500000, 750000, 1000000, 1500000, 2000000, 2500000, 5000000, 7500000,
  10000000,
];

const sumInsuredListProduct3 = [100000, 200000, 300000, 400000, 500000, 750000];

const sumInsuredListProduct3F = [1000000, 1500000, 2000000, 2500000];

const sumInsuredListProduct5 = [1000, 2000, 3000];

const hospitalPolicyDaysBasic = [30, 60, 90, 120, 180];
const hospitalPolicyDaysEnhanced = [90, 120, 180];

const initialFormData = {
  productCode: "",
  productName: "",
  policyType: "Individual",
  adultCount: 1,
  childCount: "",
  starExtraProtect: "No",
  sumInsured: "",
  paymentPlan: "Full Payment",
  age: "",
  optionalCover: "No",
  optionalSumInsured: "500000",
  policyPlan: "",
  policyDays: "",
};

const PremiumQuoteEngine = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [premium, setPremium] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [isOptionalChecked, setIsOptionalChecked] = useState(false);

  const [optionalSumInsuredList, setoptionalSumInsuredList] = useState([]);

  const [minAge, setMinAge] = useState(1);

  const [maxAge, setMaxAge] = useState(100);

  useEffect(() => {
    if (formData.productCode === 3) {
      setMaxAge(75);
      setMinAge(60);
    } else {
      setMaxAge(100);
      setMinAge(1);
    }
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let optionalSum = sumInsuredListProduct1.filter((item) => {
      return item <= formData.sumInsured && item < 5000000;
    });
    setoptionalSumInsuredList(optionalSum);
  }, [formData.sumInsured, isOptionalChecked]);

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

    if (formData.productCode === "") {
      return toast.error("Select any product");
    }
    if (formData.policyType === "Floater" && formData.childCount === "") {
      return toast.error("Select child count");
    }
    if (
      formData.productCode === "3" &&
      formData.policyType === "Floater" &&
      formData.adultCount !== "2"
    ) {
      return toast.error("Enter a valid No of senior count");
    }
    if (
      (formData.productCode === "1" || formData.productCode === "4") &&
      (formData.age < 18 || formData.age > 100)
    ) {
      return toast.error("Age must be in between 18 to 100");
    }
    if (
      (formData.productCode === "2" || formData.productCode === "5") &&
      (formData.age < 1 || formData.age > 100)
    ) {
      return toast.error("Invalid Age Entered");
    }
    if (formData.productCode === "5") {
      if (formData.policyPlan === "") {
        return toast.error("Select your plan type");
      }
      if (formData.policyDays === "") {
        return toast.error("Select policy days");
      }
    }
    if (
      formData.productCode === "3" &&
      (formData.age < 60 || formData.age > 75)
    ) {
      return toast.error("Age must be in between 60 to 75");
    }
    if (!(formData.sumInsured > 0)) {
      return toast.error("Enter valid Sum Insured");
    }
    await fetch("http://139.59.95.35:8081/premium", {
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
        console.log(error);
      });
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleOptionalCheck = () => {
    setIsOptionalChecked(!isOptionalChecked);
  };
  useEffect(() => {
    if (isOptionalChecked) {
      setFormData({ ...formData, optionalCover: "Yes" });
    } else if (!isOptionalChecked) {
      setFormData({ ...formData, optionalCover: "No" });
    }
  }, [isOptionalChecked]);

  useEffect(() => {
    if (isChecked) {
      setFormData({ ...formData, starExtraProtect: "Yes" });
    } else if (!isChecked) {
      setFormData({ ...formData, starExtraProtect: "No" });
    }
  }, [isChecked]);

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  useEffect(() => {
    setPremium(null);
    setFormData({ ...formData, age: "", sumInsured: "" });
  }, [formData.productCode]);

  return (
    <div className="shadow  bg-light bg-gradient m-md-5 border rounded d-block w-100">
      <div className="row m-3">
        <p className="col-md">Quick Quote</p>
        <div className="col-lg d-flex">
          <label className="text-nowrap col-md-3 text-center p-2 bg-primary text-white border border-info rounded">
            Product
          </label>
          <select
            className="form-select "
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
            <option type="number" value="4">
              Star Micro Rural and Farmers Care
            </option>
            <option type="number" value="5">
              Star Hospital Cash
            </option>
          </select>
        </div>
      </div>
      <hr className="m-3"></hr>
      <form onSubmit={handleSubmit}>
        <div className="ms-5 ps-md-3 d-flex flex-wrap flex-fill gap-4">
          <div className="d-flex col-lg-5">
            <label className="text-nowrap col-md-5 text-center p-md-2 bg-primary text-white border border-info rounded">
              Policy Type
            </label>
            <select
              className="form-select"
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
            <div className="col-lg-5 d-flex">
              {formData.productCode !== "3" ? (
                <label className="text-nowrap col-md-5 text-center p-md-2 bg-primary text-white border border-info rounded">
                  No of Adult
                </label>
              ) : (
                <label className="text-nowrap text-nowrap col-md-5 text-center p-md-2  bg-primary text-white border border-info rounded">
                  No of Senior Citizen
                </label>
              )}
              <select
                className="form-select"
                name="adultCount"
                value={formData.adultCount}
                onChange={handleChange}
              >
                <option type="number" value="">
                  {" "}
                </option>
                {!(
                  formData.productCode === "3" &&
                  formData.policyType === "Floater"
                ) && (
                  <option type="number" value="1">
                    1
                  </option>
                )}
                <option type="number" value="2">
                  2
                </option>
              </select>
            </div>
          )}
          {formData.policyType === "Floater" &&
            formData.productCode !== "3" && (
              <div className="col-lg-5 d-flex">
                <label className="text-nowrap col-md-5 text-center p-md-2 bg-primary text-white border border-info rounded">
                  No of Child
                </label>
                <select
                  className="form-select"
                  name="childCount"
                  value={formData.childCount}
                  onChange={handleChange}
                >
                  <option type="number" value="">
                    {" "}
                  </option>
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
          <div className="d-flex col-md-5">
            <label className="text-nowrap col-lg-5 text-center p-2 bg-primary text-white border border-info rounded">
              Age
            </label>

            <input
              className="w-100 border  rounded"
              type="number"
              min={minAge}
              max={maxAge}
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {formData.productCode === "5" && (
            <div className="d-flex col-md-5">
              <label className="text-nowrap col-lg-5 text-center p-md-2 bg-primary text-white border border-info rounded">
                Policy Plan
              </label>
              <select
                className="form-select "
                name="policyPlan"
                value={formData.policyPlan}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Select Plan
                </option>
                <option type="text" value="Basic Plan">
                  Basic Plan
                </option>
                <option type="text" value="Enhanced Plan">
                  Enhanced Plan
                </option>
              </select>
            </div>
          )}

          {formData.productCode === "5" && (
            <div className="d-flex col-lg-5">
              <label className="text-nowrap col-md-5 text-center p-md-2 bg-primary text-white border border-info rounded">
                Policy Days
              </label>
              <select
                className="form-select"
                name="policyDays"
                required
                value={formData.policyDays}
                onChange={handleChange}
              >
                <option value=" "> </option>
                {formData.policyPlan === "Basic Plan" &&
                  hospitalPolicyDaysBasic.map((sum) => {
                    return (
                      <option key={sum} type="number" name="policyDays">
                        {sum}
                      </option>
                    );
                  })}
                {formData.policyPlan === "Enhanced Plan" &&
                  hospitalPolicyDaysEnhanced.map((sum) => {
                    return (
                      <option key={sum} type="number" name="policyDays">
                        {sum}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          <div className="d-flex col-md-5">
            <label className="text-nowrap col-lg-5 text-center p-md-2 bg-primary text-white border border-info rounded">
              Sum Insured
            </label>
            {formData.productCode === "" ? (
              <select
                disabled
                className="form-select"
                type="number"
                required
                name="sumInsured"
                value={formData.sumInsured}
                onChange={handleChange}
              ></select>
            ) : (
              <select
                className="form-select"
                type="number"
                required
                name="sumInsured"
                value={formData.sumInsured}
                onChange={handleChange}
              >
                <option value={" "}> </option>
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
                {formData.productCode === "4" &&
                  formData.policyType === "Individual" && (
                    <option value={100000}>100000</option>
                  )}
                {formData.productCode === "4" &&
                  formData.policyType === "Floater" && (
                    <option value={200000}>200000</option>
                  )}
                {formData.productCode === "5" &&
                  sumInsuredListProduct5.map((sum) => {
                    return (
                      <option key={sum} type="number" name="sumInsured">
                        {sum}
                      </option>
                    );
                  })}
              </select>
            )}
          </div>
          {formData.productCode === "2" && formData.sumInsured >= 1000000 && (
            <div className="col-lg-12">
              <p>Do you want STAR EXTRA PROTECT ?</p>
              <div className="d-flex gap-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheck}
                />
                <p className="mt-3">SECTION 1</p>
              </div>
              <p>1. Enhanced Room Rent</p>

              <p>2. Claim Guard (Consumables cover)</p>

              <p>3. Enhanced Limit for Modern Treatments</p>

              <p>4. Enhanced Limit for Ayush Treatment</p>

              <p>5. Home care treatment</p>

              <p>6. Bonus Guard</p>
            </div>
          )}
          {formData.productCode === "1" && (
            <div className="col-md-12">
              <div className="d-flex gap-2">
                <input
                  type="checkbox"
                  checked={isOptionalChecked}
                  onChange={handleOptionalCheck}
                />

                <p className="mt-3">
                  Do you want optional cover? - Lump sum on diagnosis of cancer
                </p>
              </div>
            </div>
          )}
          {isOptionalChecked && formData.productCode === "1" && (
            <div className="col-md-5 d-flex">
              <label className="text-nowrap col-5 text-center p-md-2 bg-primary text-white border border-info rounded">
                Lumpsum cover
              </label>
              <select
                className="form-select"
                type="text"
                name="optionalSumInsured"
                value={formData.optionalSumInsured}
                onChange={handleChange}
              >
                {formData.optionalCover === "Yes" &&
                  optionalSumInsuredList.map((optionalsum) => {
                    return (
                      <option name="optionalSumInsured">{optionalsum}</option>
                    );
                  })}
              </select>
            </div>
          )}

          <div className="col-md-5 d-flex">
            <label className="text-nowrap col-5 text-center p-md-2 bg-primary text-white border border-info rounded">
              Payment Method
            </label>
            <select
              className="form-select"
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
        <div className="d-flex w-80 text-center justify-content-around">
          {premium
            ? Object.keys(premium).map((key) => {
                return (
                  <div className="mt-5" key={key}>
                    {formData.productCode === "4" ? (
                      <p className="text-secondary">Premium</p>
                    ) : (
                      <p className="text-secondary">{key} YEAR</p>
                    )}

                    <p className="border border-3 border-primary rounded p-2 text-center">
                      ₹ {premium[key]}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
        <div className="m-3 text-center">
          <button className="btn btn-primary pe-3 ps-3" type="submit">
            Get Quote
          </button>
        </div>
        <ToastContainer
          autoClose={2000}
          closeOnClick
          position="bottom-right"
          theme="colored"
        />
      </form>
    </div>
  );
};

export default PremiumQuoteEngine;
