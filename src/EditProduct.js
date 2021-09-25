import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useEffect, useState } from "react";

const ProductData = yup.object().shape({
  name: yup.string().required().min(5).max(30, "Keep it short"),
  avatar: yup.string().required(),
  rent: yup.number().required().positive().min(1),
  desc: yup.string().required().min(25),
  category: yup.string().required(),
  adjective: yup.string().required()
});

export function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductData)
  });
  const history = useHistory();
  const { id } = useParams();

  const editProd = (data) => {
    console.log("form data", data);
    fetch(`https://60c83b2fafc88600179f660c.mockapi.io/user/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Product Updated !!");
        history.push("/");
      });
  };
  const [product, setProduct] = useState({});
  useEffect(() => {
    loadProduct(id);
  }, []);

  function loadProduct(id) {
    // Filter the contestant in the API
    fetch(`https://60c83b2fafc88600179f660c.mockapi.io/user/product/${id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => {
        //console.log("Company", data);
        setProduct(data);
      });
  }

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <br />
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Update Products
      </Typography>
      {!product.id && <h1 style={{ textAlign: "center" }}>Loading ...</h1>}
      {product.id && (
        <div
          className="vote-form"
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <TextField
            autoFocus
            variant="outlined"
            {...register("name")}
            error={errors?.name?.message}
            helperText={errors?.name?.message}
            defaultValue={product.name}
            label="Enter name"
          />
          <TextField
            autoFocus
            variant="outlined"
            {...register("avatar")}
            error={errors?.avatar?.message}
            helperText={errors?.avatar?.message}
            defaultValue={product.avatar}
            label="Enter avatar"
            type="url"
          />

          <TextField
            autoFocus
            variant="outlined"
            {...register("rent")}
            error={errors?.rent?.message}
            helperText={errors?.rent?.message}
            defaultValue={product.rent}
            label="Enter rent"
            type="number"
          />
          <TextField
            autoFocus
            variant="outlined"
            {...register("desc")}
            error={errors?.desc?.message}
            helperText={errors?.desc?.message}
            defaultValue={product.desc}
            label="Enter desc"
            multiline
            maxRows={3}
          />
          <TextField
            autoFocus
            variant="outlined"
            {...register("category")}
            error={errors?.category?.message}
            helperText={errors?.category?.message}
            defaultValue={product.category}
            label="Enter category"
          />
          <TextField
            autoFocus
            variant="outlined"
            {...register("adjective")}
            error={errors?.adjective?.message}
            helperText={errors?.adjective?.message}
            defaultValue={product.adjective}
            label="Enter adjective"
          />

          <Button
            onClick={handleSubmit(editProd)}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
}

// .then((result) => setPoll(result))
// .catch((err) => setPoll(intialPoll))

// if( errors.color && error.color.message){
//   errors = error.color.message
// }
