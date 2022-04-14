import { Typography, Card, CardContent, CardMedia } from "@mui/material";

const BoxCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.imageURL}
        alt="Box Photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.shipId}: {props.customer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {props.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Condition: {props.condition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {props.size}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {props.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          SKU: {props.sku}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default BoxCard;
