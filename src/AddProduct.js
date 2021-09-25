import { Button, Typography, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const ProductData = yup.object().shape({
  name: yup.string().required().min(5).max(30, "Keep it short"),
  avatar: yup.string().required(),
  rent: yup.number().required().positive().min(1),
  desc: yup.string().required().min(25),
  category: yup.string().required(),
  adjective: yup.string().required()
});

export function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProductData)
  });
  const history = useHistory();

  const addProd = (data) => {
    console.log("form data", data);
    fetch("https://60c83b2fafc88600179f660c.mockapi.io/user/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Product added !!");
        history.push("/");
      });
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <br />
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Add Products
      </Typography>
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
          label="Enter name"
        />
        <TextField
          variant="outlined"
          {...register("avatar")}
          error={errors?.avatar?.message}
          helperText={errors?.avatar?.message}
          label="Enter avatar"
          type="url"
        />

        <TextField
          variant="outlined"
          {...register("rent")}
          error={errors?.rent?.message}
          helperText={errors?.rent?.message}
          label="Enter rent"
          type="number"
        />
        <TextField
          variant="outlined"
          {...register("desc")}
          error={errors?.desc?.message}
          helperText={errors?.desc?.message}
          label="Enter desc"
          multiline
          maxRows={3}
        />
        <TextField
          variant="outlined"
          {...register("category")}
          error={errors?.category?.message}
          helperText={errors?.category?.message}
          label="Enter category"
        />
        <TextField
          variant="outlined"
          {...register("adjective")}
          error={errors?.adjective?.message}
          helperText={errors?.adjective?.message}
          label="Enter adjective"
        />

        <Button
          onClick={handleSubmit(addProd)}
          variant="contained"
          color="primary"
        >
          + Add
        </Button>
      </div>
    </div>
  );
}

// .then((result) => setPoll(result))
// .catch((err) => setPoll(intialPoll))

// if( errors.color && error.color.message){
//   errors = error.color.message
// }
