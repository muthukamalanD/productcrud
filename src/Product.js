import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardItem from "./CardItem";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
    color: blue
  },
  heroButtons: {
    marginTop: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default function Product() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  function getProduct() {
    fetch("https://60c83b2fafc88600179f660c.mockapi.io/user/product", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = (id) => {
    fetch(`https://60c83b2fafc88600179f660c.mockapi.io/user/product/${id}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => {
        getProduct();
        alert("Product deleted !");
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="yellow" gutterBottom>
              products
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              paragraph
            >
              products.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {products.length === 0 && (
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Loading. . . .
            </Typography>
          )}
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <CardItem
                  id={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* End footer */}
    </React.Fragment>
  );
}
