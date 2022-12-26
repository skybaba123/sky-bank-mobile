import axios from "axios";

const API_KEY = "AIzaSyAqqvviKQUnbNyg7B0zenzsJSJQWkvGbYM";
export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`; // mode = "signUp" or "signInWithPassword"

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
};

export const getUsers = async () => {
  const response = await axios.get(
    "https://skybank-56868-default-rtdb.firebaseio.com/users.json"
  );

  const data = await response.data;

  let loadedUsers = [];

  for (const key in data) {
    loadedUsers.push({
      id: key,
      fname: data[key].fname,
      lname: data[key].lname,
      userName: data[key].userName,
      email: data[key].email,
      accNum: data[key].accNum,
      transactions: data[key].transactions,
      password: data[key].password,
      accountBalance: data[key].accountBalance,
      savingBalance: data[key].savingBalance,
      owe: data[key].owe,
    });
  }
  return loadedUsers;
};

export const storeUsers = async (newUser) => {
  await axios.post(
    "https://skybank-56868-default-rtdb.firebaseio.com/users.json",
    newUser
  );
};
