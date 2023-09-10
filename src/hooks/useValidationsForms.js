import React from 'react';

const useValidationsForms = (values = {}) => {

  console.log(values);
  // стейты
  // инпуты
  const [inputValues, setInputValues] = React.useState(values);
  // сообщение ошибки
  const [errMessage, setErrMessage] = React.useState({});
  // состояние валидности
  const [isValid, setIsValid] = React.useState(false);

  // управление инпутом
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrMessage({
      ...errMessage,
      [name]: e.target.validationMessage,
    });
    setIsValid(e.target.closest('form').checkValidity());
  };

  // сброс хранения данных
  const resetForm = React.useCallback(() => {
    setInputValues({});
    setErrMessage({});
    setIsValid(false)
  }, [])

  console.log(inputValues);
  console.log(errMessage);
  console.log(isValid);

  return {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    resetForm,
    setInputValues,
    setIsValid
  };
}

export default useValidationsForms;
