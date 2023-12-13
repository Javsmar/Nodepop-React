export const handleChange = (event, setCredentials) => {
  const { name, type, checked } = event.target;
  const newValue = type === "checkbox" ? checked : event.target.value;

  setCredentials((currentCredentials) => ({
    ...currentCredentials,
    [name]: newValue,
  }));
};
