import React, { useState } from "react";

// Define the options for the select boxes
const queryTypes = [
  { value: "select", label: "Select" },
  { value: "insert", label: "Insert" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

const conditions = [
  { value: "where", label: "Where" },
  { value: "on", label: "On" },
  { value: "and", label: "And" },
  { value: "or", label: "Or" },
];

function SQLVisualizer() {
  // Create some state variables with React hooks
  const [queryType, setQueryType] = useState(""); // The selected query type
  const [tableName, setTableName] = useState(""); // The inputted table name
  const [columns, setColumns] = useState("*"); //
  const [condition1, setCondition1] = useState(""); // The selected first condition
  const [condition2, setCondition2] = useState(""); // The selected second condition
  const [value1, setValue1] = useState(""); // The inputted first value
  const [value2, setValue2] = useState(""); // The inputted second value
  const [sqlQuery, setSqlQuery] = useState(""); // The generated SQL query
  const [columnName, setColumnName] = useState(""); // The inputted column name
  const [columnValue, setColumnValue] = useState(""); // The inputted column value

  // Create a function to handle the change of the select boxes
  const handleSelectChange = (event: any) => {
    // Set the state variable for the corresponding select box
    switch (event.target.name) {
      case "queryType":
        setQueryType(event.target.value);
        break;
      case "condition1":
        setCondition1(event.target.value);
        break;
      case "condition2":
        setCondition2(event.target.value);
        break;
      default:
        break;
    }
  };

  // Create a function to handle the change of the input boxes
  const handleInputChange = (event: any) => {
    // Set the state variable for the corresponding input box
    switch (event.target.name) {
      case "columns":
        setColumns(event.target.value);
        break;
      case "tableName":
        setTableName(event.target.value);
        break;
      case "value1":
        setValue1(event.target.value);
        break;
      case "value2":
        setValue2(event.target.value);
        break;
      case "columnName":
        setColumnName(event.target.value);
        break;
      case "columnValue":
        setColumnValue(event.target.value);
        break;
      default:
        break;
    }
  };

  // Create a function to handle the click of the button
  const handleClick = () => {
    // Create a SQL query based on the user's inputs using conditions in JSX
    let query = queryType + " * FROM " + tableName;
    if (condition1 && condition1 === "where" && columnName && columnValue) {
      query += " WHERE " + columnName + " = " + columnValue;
    }
    if (condition2 && value2) {
      query += " " + condition2 + " " + value2;
    }

    // Set the state variable for the SQL query
    setSqlQuery(query);
  };

  return (
    <div className="sql-visualizer bg-blue-400 w-full flex justify-center flex-col text-black">
      <h1>SQL Visualizer</h1>
      <div className="select-boxes">
        <div className="select-box">
          <label>Query Type</label>
          <select
            name="queryType"
            value={queryType}
            onChange={handleSelectChange}
          >
            {queryTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Column Names</label>
          <input
            type="text"
            name="columns"
            value={columns}
            onChange={handleInputChange}
          />
          ( * to select all )
        </div>
        <div className="input-box">
          <label>Table Name</label>
          <input
            type="text"
            name="tableName"
            value={tableName}
            onChange={handleInputChange}
          />
        </div>
        {queryType &&
          (queryType === "update" ||
            queryType === "select" ||
            queryType === "delete") && (
            <div className="select-box">
              <label>Condition 1</label>
              <select
                name="condition1"
                value={condition1}
                onChange={handleSelectChange}
              >
                {conditions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        {condition1 && condition1 === "where" && (
          <>
            <div className="input-box">
              <label>Column Name</label>
              <input
                type="text"
                name="columnName"
                value={columnName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Column Value</label>
              <input
                type="text"
                name="columnValue"
                value={columnValue}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {(queryType && queryType === "update") ||
          queryType === "select" ||
          (queryType === "delete" && (
            <div className="select-box">
              <label>Condition 2</label>
              <select
                name="condition2"
                value={condition2}
                onChange={handleSelectChange}
              >
                {conditions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        {condition2 && (
          <div className="input-box">
            <label>Value 2</label>
            <input
              type="text"
              name="value2"
              value={value2}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <button onClick={handleClick}>Show SQL Query</button>
      <div className="output-box">
        {sqlQuery && (
          <>
            <h2>SQL Query</h2>
            <p>{sqlQuery}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SQLVisualizer;
