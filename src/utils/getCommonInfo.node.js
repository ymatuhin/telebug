export default function getCommonInfo(customMessages) {
  let md = '';
  md += `<strong>Node</strong> ${process.versions.v8} by telebug ${
    process.env.VERSION
  }`;
  customMessages.forEach(msg => (md += `\n${msg}`));
  return md;
}
