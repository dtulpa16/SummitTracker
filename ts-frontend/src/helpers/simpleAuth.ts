export const isLoggedIn = () => (
    localStorage.getItem("username") === process.env.REACT_APP_USERNAME &&
    localStorage.getItem("password") === process.env.REACT_APP_PASSWORD
  );
