import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function CardItem({ id, product, deleteProduct }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.avatar}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.adjective}
            {"- "}
            {product.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" style={{ color: "green" }}>
          $.{product.rent}
        </Button>
        <Button
          size="large"
          color="primary"
          onClick={() => history.push(`/editProduct/${product.id}`)}
        >
          Edit
        </Button>
        <Button
          size="large"
          color="secondary"
          onClick={() => deleteProduct(product.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
