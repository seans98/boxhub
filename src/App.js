import data from "./mockData";
import { Typography, Grid, AppBar } from "@mui/material";
import BoxCard from "./components/BoxCard";
import StatusFilter from "./components/StatusFilter";
import SizeFilter from "./components/SizeFilter";
import TypeFilter from "./components/TypeFilter";
import ConditionFilter from "./components/ConditionFilter";
function App() {
  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Typography variant="h3">BoxHub Coding Challenge</Typography>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StatusFilter />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SizeFilter />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TypeFilter />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ConditionFilter />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {data.orders.map((box) => {
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
