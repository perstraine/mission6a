import "./App.css";
import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import {
  sortNameAsc,
  sortNameDesc,
  sortQuantAsc,
  sortQuantDesc,
} from "./QuickSort";

function App() {
  const [dbItems, setDbItems] = useState(undefined);
  const [errMsg, setErrMsg] = useState(false);
  const [sortMethod, setSortMethod] = useState("");
  const [toPrint, setToPrint] = useState();

  const getDb = async (e) => {
    const response = await axios.get("http://localhost:4000/find");
    if (response.data.length > 0) {
      const dataToSort = response.data;
      dataToSort.forEach(function (v) {
        delete v._id;
      });
      setDbItems(dataToSort);
    } else {
      setErrMsg(true);
    }
  };

  const selectOptions = [
    { value: "nameAsc", label: "Name - Asc" },
    { value: "nameDesc", label: "Name - Desc" },
    { value: "quantAsc", label: "Quantity - Asc" },
    { value: "quantDesc", label: "Quantity - Desc" },
  ];

  const handleChange = (selectedOption) => {
    setSortMethod(selectedOption.value);
  };

  useEffect(() => {
    getDb();
  }, []);

  useEffect(() => {
    sort(sortMethod);
  }, [sortMethod]);

  const sort = async (method) => {
    if (method === "nameAsc") {
      const newObj = await sortNameAsc(dbItems);
      setToPrint(newObj);
    }
    if (method === "nameDesc") {
      const newObj = await sortNameDesc(dbItems);
      setToPrint(newObj);
    }
    if (method === "quantAsc") {
      const newObj = await sortQuantAsc(dbItems);
      setToPrint(newObj);
    }
    if (method === "quantDesc") {
      const newObj = await sortQuantDesc(dbItems);
      setToPrint(newObj);
    }
  };


  return (
    <div className="App">
      <div className="inner-container">
        <h1>Fruit for sale!</h1>
        {/* <h3>Please see our stock list below.</h3> */}
        {dbItems === undefined && <h2>FETCHING DATA....</h2>}
        {errMsg === true && <h3>Failed to retrieve data. Try again.</h3>}
        <div className="results">
          {dbItems !== undefined && (
            <>
              <label>Sort by:</label>
              <Select
                options={selectOptions}
                onChange={handleChange}
                defaultValue={selectOptions[0]}
              />
            </>
          )}
          {toPrint !== undefined && (
            <div className="table">
              <table>
                <tbody>
                  <tr key={"header"}>
                    {Object.keys(toPrint[0]).map((key) => (
                      <th>{key}</th>
                    ))}
                  </tr>
                  {toPrint.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {dbItems !== undefined && toPrint === undefined && (
            <div className="table">
              <table>
                <tbody>
                  <tr key={"header"}>
                    {Object.keys(dbItems[0]).map((key) => (
                      <th>{key}</th>
                    ))}
                  </tr>
                  {dbItems.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
