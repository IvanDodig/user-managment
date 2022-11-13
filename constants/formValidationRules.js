export const required = { required: true, message: "This field is required!" };

export const minLength = num => ({
  min: num,
  message: `Min ${num} characters!`,
});
export const maxLength = num => ({
  max: num,
  message: `Max ${num} characters!`,
});

export const email = {
  type: "email",
  message: "Enter valid email!",
};
