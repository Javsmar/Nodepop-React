export const handleChange = (event, setCredentials) => {
  setCredentials(currentCredentials => ({
    ...currentCredentials,
    [event.target.name]: event.target.value,

  }));
};