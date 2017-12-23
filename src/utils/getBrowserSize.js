export default () => {
  var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return [w, h];
};
