import React, { useEffect, useState } from "react";
import * as Actions from "../../redux/auth/action";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import business_details_2 from "../../assets/images/professional-tradie.jpg";
import NavigationLinks from "../../components/Tradie Name/Index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Index = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { businessData, userData, businessUpdateres } = useSelector(
    (state) => state.auth
  );
  const { house_no, street, pincode, country, state, city } = businessData;
  const { business_name, license_number, working_radius } = userData;

  const [businessName, setBusinessName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [countryAdress, setCountryAdress] = useState("");
  const [cityAdress, setCityAdress] = useState("");
  const [stateAdress, setStateAdress] = useState("");
  const [workingRadius, setWorkingRadius] = useState("");

  useEffect(() => {
    if (business_name) {
      setBusinessName(business_name);
    }
    if (license_number) {
      setLicenseNumber(license_number);
    }
    if (street) {
      setStreetAddress(street);
    }
    if (house_no) {
      setHouseNo(house_no);
    }
    if (country) {
      setCountryAdress(country);
    }
    if (city) {
      setCityAdress(city);
    }
    if (state) {
      setStateAdress(state);
    }
    if (working_radius !== "") {
      setWorkingRadius(`${working_radius}`);
    }
  }, [userData, businessData]);

  const {
    Get_Business_Details_Action,
    Get_Business_Details_Update_Action,
    User_Profile_Get_Information_Action,
  } = Actions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Business_Details_Action());
    dispatch(User_Profile_Get_Information_Action());
  }, []);
  const onSubmit = () => {
    let makeData = {
      businessName,
      licenseNumber,
      streetAddress,
      houseNo,
      countryAdress,
      cityAdress,
      stateAdress,
      workingRadius,
      pincode,
    };
    dispatch(Get_Business_Details_Update_Action(makeData));
  };

  useEffect(() => {
    if (businessUpdateres) {
      history.push("/tradie-my-profile-upload");
      toast.success(businessUpdateres, {
        position: "bottom-left",
        autoClose: 2000,
        size: "small",
      });
    }
    setTimeout(() => {
      dispatch({ type: "BUSINESSS_DETAILS_UPDATE_SUCCESS", payloade: "" });
    }, 1000);
  }, [businessUpdateres]);

  return (
    <div>
      <Header />

      {/* <!-- My Profile--> */}
      <section className="section-top section-top--tradie-my-profile">
        <h2 className="section-top__title">
          My <span>Profile</span>
        </h2>
      </section>

      <section className="section section--tradie-my-profile">
        <div className="tradie-my-profile">
          <NavigationLinks />
          <form className="tradie-my-profile__form">
            <h4>Business Details</h4>
            <label>We would like to have following details form you.</label>
            <div className="input-group">
              <input
                value={businessName}
                type="text"
                placeholder="Business Name"
                {...register("BusinessName", {})}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
              />
              <input
                value={licenseNumber}
                type="text"
                placeholder="License Number"
                {...register("LicenseNumber", { required: true })}
                onChange={(e) => {
                  setLicenseNumber(e.target.value);
                }}
              />
            </div>
            <label>Business Address</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Street"
                value={streetAddress}
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                }}
                style={{ width: "90%" }}
              />
              {/* <PlacesAutocomplete /> from useautocomplete new pckg */}
              {/* <AutoPlaceComplete /> old packged used in home page */}
              {/* <GoogleApiLocation /> */}
            </div>
            <div className="input-group">
              <input
                value={houseNo}
                type="text"
                placeholder="House / Flat Number"
                {...register("houseflat", {})}
                onChange={(e) => {
                  setHouseNo(e.target.value);
                }}
              />
              <input
                value={countryAdress}
                type="text"
                placeholder="Country"
                onChange={(e) => {
                  setCountryAdress(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="State"
                value={stateAdress}
                onChange={(e) => {
                  setStateAdress(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="City"
                value={cityAdress}
                onChange={(e) => {
                  setCityAdress(e.target.value);
                }}
              />
            </div>
            <label>
              Set Working Radius{"      "}
              {`${workingRadius}Km`}
            </label>
            <div className="input-group">
              <input
                style={{
                  background: `linear-gradient(to right, rgb(237, 133, 91) 0%, rgb(237, 133, 91) ${workingRadius}%, rgb(255, 255, 255) ${workingRadius}%, white 100%)`,
                }}
                id="myinput"
                type="range"
                value={workingRadius}
                min="0"
                max="100"
                onChange={(e) => {
                  setWorkingRadius(e.target.value);
                }}
              />
              {/* <Range /> */}
            </div>
            <div className="input-group">
              <span
                className="btn-primary"
                onClick={() => {
                  onSubmit();
                }}
                style={{ float: "right" }}
              >
                Save
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* <!-- Are you a Professional Tradie? --> */}
      {/* {userData?.access === "provider" ? (
        ""
      ) : ( */}
      <section class="section section--left">
        <div class="professional-tradie">
          <div class="professional-tradie__description">
            <h3 class="professional-tradie__title">
              Are you a Professional Tradie?
            </h3>
            <p>
              If you would like to be part of our Tradie community and are ready
              to meet new clients today please continue so we can welcome you
              onboard.
            </p>
            <Link to="/about-us" class="btn-primary">
              Learn More
            </Link>
          </div>
          <div class="professional-tradie__image">
            <img src={business_details_2} alt="" />
          </div>
        </div>
      </section>
      {/* )} */}

      <Footer />
    </div>
  );
};

export default Index;
