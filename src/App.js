import { useEffect, useState } from "react";
import data from "./mockData";
import { Typography, Grid, AppBar } from "@mui/material";
import BoxCard from "./components/BoxCard";
import StatusFilter from "./components/StatusFilter";
import SizeFilter from "./components/SizeFilter";
import TypeFilter from "./components/TypeFilter";
import ConditionFilter from "./components/ConditionFilter";
function App() {
  data.orders.sort(function (a, b) {
    var keyA = new Date(a.created),
      keyB = new Date(b.created);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const [filteredData, setFilteredData] = useState(data.orders);
  const [status, setStatus] = useState([]);
  const [size, setSize] = useState([]);
  const [condition, setCondition] = useState([]);
  const [type, setType] = useState([]);

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

    let result = data.orders;
    result = firstFilter(result);
    result = secondFilter(result);
    result = thirdFilter(result);
    result = fourthFilter(result);
    setFilteredData(result);
  }, [status, size, condition, type]);
  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Typography variant="h3">BoxHub Coding Challenge</Typography>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StatusFilter status={status} setStatus={setStatus} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SizeFilter size={size} setSize={setSize} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TypeFilter type={type} setType={setType} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ConditionFilter condition={condition} setCondition={setCondition} />
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
