import React from "react";
import { Select } from "antd";
import "./SelectBar.css";
const { Option } = Select;
const SelectBar = ({ handleSelectBar, handleSearchButton, searchResults }) => {
  return (
    <div className="select-bar">
      <Select
        defaultValue="Any"
        className="select-bar-category"
        onChange={(value) => handleSelectBar(value)}
        style={{ backgroundColor: "#ffcc01", color: "#f0f0f0" }}
      >
        <Option value="Any">Any</Option>
        <Option value="ar">AR</Option>
        <Option value="hg">HG</Option>
        <Option value="mg">MG</Option>
        <Option value="rf">RF</Option>
        <Option value="sg">SG</Option>
        <Option value="smg">SMG</Option>
      </Select>
      <Select
        className="select-bar-search"
        defaultValue="No Gun Selected"
        showSearch
        style={{ width: 200 }}
        placeholder="Enter gun name"
        onChange={(value) => handleSearchButton(value)}
        notFoundContent="Gun Not Found"
        optionFilterProp="value"
        filterOption={(input, option) => {
          const pattern = new RegExp(`^${input}`, "i");
          return pattern.test(option.value);
        }}
      >
        {searchResults.map((searchResult) => (
          <Option value={searchResult}>{searchResult}</Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectBar;
