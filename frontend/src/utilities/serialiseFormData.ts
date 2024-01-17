type FormDataKeyValuePairs = {
  [key: string]: FormDataEntryValue
}

const serialiseFormData = (data: HTMLFormElement | undefined) => {
  const formData = [...new FormData(data).entries()];

  return formData.reduce((acc: FormDataKeyValuePairs, curr) => {
    const [key, value] = curr;

    acc[key] = value;

    return acc;
  }, {});
};

export default serialiseFormData;
