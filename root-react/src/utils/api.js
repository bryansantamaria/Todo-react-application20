import axios from "axios";

export const getTodos = async (url) => {
  const data = await axios.get(url).then((res) => {
    return res;
  });
  return data;
};

export const postToDo = async (url, title) => {
  const data = await axios
    .post(url, {
      title,
      done: false,
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const delToDo = async (url) => {
  const data = await axios.delete(url).then((res) => {
    return res;
  });
  return data;
};

export const patchToDo = async (url, title) => {
  const data = await axios
    .put(url, {
      title: title,
      done: false,
    })
    .then((res) => {
      return res;
    });
  console.log(data);
  return data;
};

export const getOrderBy = async (url) => {
  const data = await await axios.get(url).then((res) => {
    return res;
  });
  return data;
};

export const postAccount = async (firstName, lastName, email, password) => {
  const data = await axios
    .post("http://localhost:8080/create", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      console.log(res);
      return res;
    });
  return data;
};
