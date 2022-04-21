import { useEffect, useState } from "react";
import data from "./mockData";
import { Typography, Grid, AppBar } from "@mui/material";
import BoxCard from "./components/BoxCard";
import Filter from "./components/Filter";

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState([]);
  const [size, setSize] = useState([]);
  const [condition, setCondition] = useState([]);
  const [type, setType] = useState([]);

  const sizeArray = ["20ft", "40ft", "45ft"];
  const statusArray = ["delivered", "in-progress", "pending"];
  const conditionArray = ["new", "cargo-worthy", "wind-watertight"];
  const typeArray = ["standard", "high-cube"];

  data.orders.sort(function (a, b) {
    var keyA = new Date(a.created),
      keyB = new Date(b.created);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  useEffect(() => {
    const url = "http://localhost:8080/api/crates";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          var keyA = new Date(a.created),
            keyB = new Date(b.created);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        console.log(data);
        setOriginalData(data);
      });
  }, []);

  useEffect(() => {
    const firstFilter = (array) => {
      if (status.length !== 0) {
        return array.filter((item) => status.includes(item.status));
      } else {
        return array;
      }
    };

    const secondFilter = (array) => {
      if (size.length !== 0) {
        return array.filter((item) => size.includes(item.size));
      } else {
        return array;
      }
    };

    const thirdFilter = (array) => {
      if (condition.length !== 0) {
        return array.filter((item) => condition.includes(item.condition));
      } else {
        return array;
      }
    };

    const fourthFilter = (array) => {
      if (type.length !== 0) {
        return array.filter((item) => type.includes(item.type));
      } else {
        return array;
      }
    };

    let result = originalData;
    result = firstFilter(result);
    result = secondFilter(result);
    result = thirdFilter(result);
    result = fourthFilter(result);
    setFilteredData(result);
  }, [status, size, condition, type, originalData]);
  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Typography variant="h3">BoxHub Coding Challenge</Typography>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Filter
            filter={status}
            setFilter={setStatus}
            dataArray={statusArray}
            text="Status"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Filter
            filter={size}
            setFilter={setSize}
            dataArray={sizeArray}
            text="Size"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Filter
            filter={type}
            setFilter={setType}
            dataArray={typeArray}
            text="Type"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Filter
            filter={condition}
            setFilter={setCondition}
            dataArray={conditionArray}
            text="Condition"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredData.map((box) => {
          return (
            <Grid item xs={6} sm={3} key={box.id}>
              <BoxCard
                imageURL={box.photo}
                shipId={box.id}
                customer={box.customer}
                status={box.status}
                condition={box.condition}
                size={box.size}
                type={box.type}
                sku={box.sku}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default App;
