import { useState } from 'react';
export const useForm = (callback, initialState = {}) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (event.target.value.trim() === '') {
      setErrors({ ...errors, [event.target.name]: true });
    } else {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    errors,
  };
};
