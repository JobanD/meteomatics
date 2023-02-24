import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Form.css";

// This component is to gather user given paramaters for which data should be displayed
export default function Form({ getFormData }) {
  // hide form initially
  const [isExpanded, setIsExpanded] = useState(false);

  // used to open and close form
  const toggleForm = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  // functions provided by react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (data) => {
    getFormData(data);
    console.log(data);
  };

  // array of objs for weather parameters users can select
  const Params = [
    { value: "t_2m:C", label: "Temperature (C)" }, // temp defaults to temp at 2m above ground in celcius
    { value: "relative_humidity_2m:p", label: "Humidity (Pa)" },
    { value: "dew_point_2m:C", label: "Dew Point (C)" },
    {
      value: "msl_pressure:hPa",
      label: "Atmospheric Pressure and Density (hPa)",
    },
    { value: "wind_speed_2m:kmh", label: "Wind (kmh)" },
    { value: "effective_cloud_cover:octas", label: "Clouds (octas)" },
    { value: "precip_5min:mm", label: "Precipitation (mm)" },
    { value: "evaporation_1h:mm", label: "Evaporation (mm)" },
    { value: "cape:Jkg", label: "Atmospheric Stability (Jkg)" },
    { value: "frost_depth:cm", label: "Frost Depth (cm)" },
    { value: "clear_sky_rad:W", label: "Radiation (W)" },
  ];

  return (
    <div className="entireFormContainer">
      <button
        className={isExpanded ? "hamburger expandedNav" : "hamburger"}
        onClick={toggleForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={isExpanded ? "formContainer open" : "formContainer hidden"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formElement">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              id="latitude"
              placeholder="42.317432"
              {...register("latitude", {
                required: true,
              })}
            />
            {errors.latitude?.type === "required" && (
              <p className="errorMessage">Latitude is required.</p>
            )}
          </div>
          <div className="formElement">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              id="longitude"
              placeholder="-83.026772"
              {...register("longitude", {
                required: true,
              })}
            />
            {errors.longitude?.type === "required" && (
              <p className="errorMessage">Longitude is required.</p>
            )}
          </div>
          <div className="formElement">
            <label>Date</label>
            <input
              type="text"
              name="date"
              id="date"
              placeholder="yyyy-mm-dd"
              {...register("date", {
                required: true,
              })}
            />
            {errors.date?.type === "required" && (
              <p className="errorMessage">Date is required.</p>
            )}
          </div>
          <div className="formElement">
            <label>End Date</label>
            <input
              type="text"
              name="endDate"
              id="endDate"
              placeholder="yyyy-mm-dd"
              {...register("endDate")}
            />
          </div>
          <div className="formElement">
            <label>Time</label>
            <input
              type="text"
              name="time"
              id="time"
              placeholder="hh:mm"
              {...register("time", {
                required: true,
              })}
            />
            {errors.time?.type === "required" && (
              <p className="errorMessage">Time is required.</p>
            )}
          </div>
          <div className="formElement">
            <label>Select Parameters</label>
            <Controller
              name="parameter"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} isMulti options={Params} />
              )}
            />
            {errors.parameter?.type === "required" && (
              <p className="errorMessage">Parameter is required</p>
            )}
          </div>

          <button type="submit" className="submitButton button">
            Generate Data
          </button>
        </form>
      </div>
    </div>
  );
}
