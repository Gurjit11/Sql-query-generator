import React, { useState } from "react";
import "./styles.css";
import Code from "./Code";

// Define the options for the select boxes
const queryTypes = [
  { value: "select", label: "Select" },
  { value: "insert", label: "Insert" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

const conditions = [
  { value: "where", label: "Where" },
  { value: "not", label: "Not" },
  { value: "and", label: "And" },
  { value: "or", label: "Or" },
];

function SQLVisualizer() {
  // Create some state variables with React hooks
  const [queryType, setQueryType] = useState("select"); // The selected query type
  const [tableName, setTableName] = useState(""); // The inputted table name
  const [columns, setColumns] = useState("*"); //
  const [values, setValues] = useState(""); //
  const [updateColumns, setUpdateColumns] = useState(""); //
  const [updateValues, setUpdateValues] = useState(""); //
  const [condition1, setCondition1] = useState(""); // The selected first condition
  const [condition2, setCondition2] = useState(""); // The selected second condition
  const [value1, setValue1] = useState(""); // The inputted first value
  const [value2, setValue2] = useState(""); // The inputted second value
  const [sqlQuery, setSqlQuery] = useState(""); // The generated SQL query
  const [columnName, setColumnName] = useState(""); // The inputted column name
  const [columnValue, setColumnValue] = useState(""); // The inputted column value

  const clearHandler = () => {
    setQueryType("select");
    setTableName("");
    setColumns("");
    setValues("");
    setUpdateColumns("");
    setUpdateValues("");
    setCondition1("");
    setCondition2("");
    setValue1("");
    setValue2("");
    setSqlQuery("");
    setColumnName("");
    setColumnValue("");
  };
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
      case "updateValues":
        setUpdateValues(event.target.value);
        break;
      case "updateColumns":
        setUpdateColumns(event.target.value);
        break;
      case "values":
        setValues(event.target.value);
        break;
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
    let query =
      " " +
      queryType.toUpperCase() +
      " " +
      columns +
      " FROM " +
      tableName +
      "\n";
    if (queryType === "insert") {
      query = queryType.toUpperCase() + " INTO " + tableName;
      if (columns !== "*") {
        query += " (" + columns.split(",").map((val) => "'" + val + "'") + ")";
      }
      query +=
        "\nVALUES " +
        " (" +
        values.split(",").map((val) => "'" + val + "'") +
        ")";
    }
    if (queryType === "update") {
      query =
        " " +
        queryType.toUpperCase() +
        " " +
        tableName +
        "\n SET " +
        updateColumns +
        " = '" +
        updateValues +
        "'\n";
    }
    if (queryType === "delete") {
      query = " " + queryType.toUpperCase() + " FROM " + tableName + "\n";
    }
    if (condition1 && condition1 === "where" && columnName && columnValue) {
      query += " WHERE " + columnName + " = '" + columnValue + "' ";
    }
    if (condition1 && condition1 === "not" && columnName && columnValue) {
      query += " WHERE NOT " + columnName + " = '" + columnValue + "' ";
    }
    if (condition2 !== "not" && condition2 !== "where" && value2) {
      query +=
        " " + condition2.toUpperCase() + " " + value1 + " = '" + value2 + "'\n";
    }

    // Set the state variable for the SQL query
    setSqlQuery(query);
  };

  return (
    <div className="sql-visualizer bg-gradient-to-br from-blue-950 max-w-3xl sm:p-10 p-3 py-10 rounded-md shadow-blue-950 shadow-[0_15px_100px_15px_rgba(0,0,0,0.1)] w-full flex justify-center flex-col text-white">
      <div className="text-3xl font-bold flex  justify-center mb-8">
        <span className="bg-gradient-to-br ml-3 from-yellow-300 to-green-400 bg-clip-text text-transparent">
          SQL Visualizer Tool
        </span>
      </div>
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
        {queryType && (queryType === "select" || queryType === "insert") && (
          <div>
            <label>Column Names</label>
            <input
              placeholder="separated by commas"
              type="text"
              name="columns"
              value={columns}
              onChange={handleInputChange}
            />
            ( * to select all columns )
          </div>
        )}
        <div className="input-box">
          <label>Table Name</label>
          <input
            type="text"
            name="tableName"
            value={tableName}
            onChange={handleInputChange}
          />
        </div>
        {queryType === "insert" && (
          <div className="input-box">
            <label>Values</label>
            <input
              placeholder="separated by commas"
              type="text"
              name="values"
              value={values}
              onChange={handleInputChange}
            />
          </div>
        )}
        {queryType === "update" && (
          <>
            <div className="input-box">
              <label>Column Name</label>
              <input
                type="text"
                name="updateColumns"
                value={updateColumns}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Column Value</label>
              <input
                type="text"
                name="updateValues"
                value={updateValues}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
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
        {condition1 && (condition1 === "where" || condition1 === "not") && (
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

        {queryType &&
          (queryType === "update" ||
            queryType === "select" ||
            queryType === "delete") &&
          condition1 === "where" && (
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
          )}
        {condition2 && condition1 === "where" && (
          <>
            <div className="input-box">
              <label>Column Name</label>
              <input
                type="text"
                name="value1"
                value={value1}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Column Value</label>
              <input
                type="text"
                name="value2"
                value={value2}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </div>
      <button
        className="bg-blue-900 w-fit font-semibold mx-auto px-5 py-3 rounded-lg mt-4 hover:from-blue-800 hover:bg-gradient-to-br hover:to-cyan-800 transition hover:duration-500 hover:ease-in-out"
        onClick={handleClick}
      >
        <span className="hover:scale-110">Show SQL Query</span>
      </button>
      <p className="flex justify-center  text-red-500">
        <span onClick={clearHandler} className="cursor-pointer">
          Clear
        </span>
      </p>
      <div className="output-box">
        {sqlQuery && (
          <>
            <Code output={sqlQuery || ""} loading={false} />
          </>
        )}
        {sqlQuery && (
          <div className="flex justify-end text-xs mr-2 text-blue-500">
            add semicolon ";" at the end
          </div>
        )}
      </div>
    </div>
  );
}

export default SQLVisualizer;
