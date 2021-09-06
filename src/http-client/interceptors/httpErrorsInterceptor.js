const errorCodesIgnored = [];

const showError = ({ message, fields }) => {
  /* let errorTitle = null;

  let errorMessage = message;

  if (fields && fields.length) {
    errorTitle = message;
    errorMessage = fields.reduce(
      (acc, field, index, arr) =>
        `${acc}${getFieldName(field)} ${field.description}${index < arr.length - 1 ? ' | ' : ''}`,
      '',
    );
  }

  showUserActionDanger(errorMessage, errorTitle); */
};

async function httpErrorsInterceptor(error) {
  const { response } = error;

  if (response) {
    if (errorCodesIgnored.includes(response.status)) {
      return Promise.reject(error);
    }

    const { data } = response;

    showError(data);
  } else {
    showError("An error has occurred.");
  }

  return Promise.reject(error);
}

export default httpErrorsInterceptor;
