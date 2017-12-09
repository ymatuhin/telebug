export default (url, formData, cb) => {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.send(formData);
  request.onload = cb;
};
