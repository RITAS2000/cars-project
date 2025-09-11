import css from "./SearchBox.module.css";
import { BsChevronDown } from "react-icons/bs";
import Select, { components } from "react-select";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations.js";

import { setFilters } from "../../redux/filters/slice.js";
import { useState } from "react";

export default function SearchBox({ brands, priceOptions }) {
  const dispatch = useDispatch();

  const [brandLocal, setBrandLocal] = useState(null);
  const [priceLocal, setPriceLocal] = useState(null);
  const [minMileageLocal, setMinMileageLocal] = useState("");
  const [maxMileageLocal, setMaxMileageLocal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtersPayload = {
      brand: brandLocal ? brandLocal.value : null,
      price: priceLocal ? Number(priceLocal.value) : null,
      minMileage: minMileageLocal
        ? Number(minMileageLocal.replace(/,/g, ""))
        : null,
      maxMileage: maxMileageLocal
        ? Number(maxMileageLocal.replace(/,/g, ""))
        : null,
    };
    dispatch(setFilters(filtersPayload));
    dispatch(fetchCars({ page: 1, filters: filtersPayload, limit: 12 }));
    setBrandLocal(null);
    setPriceLocal(null);
    setMinMileageLocal("");
    setMaxMileageLocal("");
  };

  const formatNumber = (num) => {
    if (!num) return "";
    const raw = num.toString().replace(/,/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <div className={css.formContainer}>
          <label className={css.label}>
            Car brand
            <Select
              components={{ DropdownIndicator }}
              value={brandLocal}
              onChange={(value) => setBrandLocal(value)}
              options={brands.map((b) => ({ value: b, label: b }))}
              placeholder="Choose a brand"
              classNamePrefix="custom-select"
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: 204,
                  height: 44,
                  borderRadius: 12,
                  background: "#f7f7f7",
                  outline: "none",
                  border: "none",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "125%",
                  color: "#101828",
                  boxShadow: "none",
                }),
                valueContainer: (base) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 112,
                  padding: "0 24px 0 16px",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 12,
                  background: "#fff",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "125%",
                  color: "#8d929a",
                  border: "1px solid #f7f7f7",
                  width: 204,
                  height: 272,
                  marginTop: 4,
                  paddingRight: 8,
                  paddingTop: 10,
                  paddingBottom: 10,
                  boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",

                  zIndex: 10,
                }),
                menuList: (base) => ({
                  ...base,
                  borderRadius: 12,
                  height: 252,
                  background: "#fff",
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-button": {
                    display: "none",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#dadde1",
                    borderRadius: "10px",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: "transparent",
                  color: state.isSelected ? "#101828" : "#8d929a;",
                  cursor: "pointer",
                  padding: "4px 18px",
                  "&:active": {
                    backgroundColor: "#fff",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#101828",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  paddingLeft: 0,
                  paddingRight: 16,
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }),
              }}
            />
          </label>

          <label className={css.label}>
            Price/ 1 hour
            <Select
              components={{ DropdownIndicator }}
              value={priceLocal}
              onChange={(value) => setPriceLocal(value)}
              options={priceOptions}
              placeholder="Choose a price"
              formatOptionLabel={(option, { context }) => {
                if (context === "menu") return option.label;
                if (context === "value") return `To $${option.label}`;
              }}
              classNamePrefix="custom-select"
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: 204,
                  height: 44,
                  borderRadius: 12,
                  background: "#f7f7f7",
                  outline: "none",
                  border: "none",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "125%",
                  color: "#101828",
                  boxShadow: "none",
                }),
                valueContainer: (base) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 112,
                  padding: "0 24px 0 16px",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 12,
                  background: "#fff",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "125%",
                  color: "#8d929a",
                  border: "1px solid #f7f7f7",
                  width: 204,
                  height: 188,
                  marginTop: 4,
                  paddingTop: 8,
                  paddingBottom: 8,
                  boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",

                  zIndex: 10,
                }),
                menuList: (base) => ({
                  ...base,
                  borderRadius: 12,
                  background: "#fff",
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-button": {
                    display: "none",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#dadde1",
                    borderRadius: "10px",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: "transparent",
                  color: state.isSelected ? "#101828" : "#8d929a;",
                  cursor: "pointer",
                  padding: "4px 18px",
                  "&:active": {
                    backgroundColor: "#fff",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#101828",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  paddingLeft: 0,
                  paddingRight: 16,
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }),
              }}
            />
          </label>

          <label className={css.labelAll}>
            Сar mileage / km
            <div className={css.wrapper}>
              <div className={css.inputWrapper}>
                <span className={css.spanFrom}>From</span>
                <input
                  type="text"
                  className={`${css.inputLeft} ${css.noSpin}`}
                  value={formatNumber(minMileageLocal)}
                  onChange={(e) =>
                    setMinMileageLocal(
                      e.target.value.replace(/,/g, "").slice(0, 6)
                    )
                  }
                />
              </div>
              <div className={css.inputWrapper}>
                <span className={css.spanTo}>To</span>
                <input
                  type="text"
                  className={`${css.inputRight} ${css.noSpin}`}
                  value={formatNumber(maxMileageLocal)}
                  onChange={(e) =>
                    setMaxMileageLocal(
                      e.target.value.replace(/,/g, "").slice(0, 6)
                    )
                  }
                />
              </div>
            </div>
          </label>
          <button type="submit" className={css.button}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

const DropdownIndicator = (props) => {
  const open = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <BsChevronDown
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.8s ease",
          fontSize: 16,
          color: "#101828",
        }}
      />
    </components.DropdownIndicator>
  );
};
