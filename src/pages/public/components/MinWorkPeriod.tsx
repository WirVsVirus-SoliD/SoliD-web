import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { useState } from "react";

const MinWorkPeriod = ({ onChange }) => {
  const [state, setState] = useState({ value: "1", period: "Tage" });

  const handleChange = (event, key) => {
    const value = event.target.value;
    setState({ ...state, [key]: value });
    onChange(`${state.value} ${state.period}`);
  };

  const handleBlur = (event) => {
    let value = event.target.value;
    if (value === "") value = "1";
    setState({ ...state, value });
    onChange(`${state.value} ${state.period}`);
  };

  return (
    <div className="flex flex-row">
      <input
        className="mr-4 border-b w-1/6 text-center"
        value={state.value}
        onChange={(e) => handleChange(e, "value")}
        onBlur={(e) => handleBlur(e)}
        type="number"
      />
      <Select
        disableUnderline
        className="border border-brand border-solid rounded-full py-2 px-4"
        onChange={(e) => handleChange(e, "period")}
        value={state.period}
      >
        <MenuItem value="Tage">Tage</MenuItem>
        <MenuItem value="Wochen">Wochen</MenuItem>
      </Select>
    </div>
  );
};

export default MinWorkPeriod;
