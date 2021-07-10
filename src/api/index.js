import { baseURL } from "../config";
import axios from "axios";
axios.defaults.baseURL = baseURL;

export const getUsers = () => {
  return axios
    .get("/user_list")
    .then((response) => {
      console.log("getUsers", response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("getUser error", error);
    });
};

export const createUser = (userPayload) => {
  return axios
    .post("/create_user", userPayload)
    .then((response) => {
      console.log("createUser", response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("createUser error", error);
    });
};

export const updateUser = (userPayload) => {
  return axios
    .patch("/update_user", userPayload)
    .then((response) => {
      console.log("updateUser", response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("updateUser error", error);
    });
};

export const deleteUser = (userId) => {
  console.log("axios delete", userId);

  return axios
    .delete("/delete_user", { data: { userId } })
    .then((response) => {
      console.log("deleteUser", response);
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("deleteUser error", error);
    });
};
