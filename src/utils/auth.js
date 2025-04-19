export const loginWithEmail = (email, password, users) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  } else {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
