export default function getCommonInfo(customMessages) {
  let md = '';
  md += `<strong>Node</strong> ${process.versions.v8}`;
  customMessages.forEach(msg => (md += `\n${msg}`));
  return md;
}
