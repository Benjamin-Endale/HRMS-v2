// ✅ Converts any object (with possible FileList fields) into FormData
export const toFormData = (obj) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof FileList && value.length > 0) {
      formData.append(key, value[0]); // send the actual file
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};
