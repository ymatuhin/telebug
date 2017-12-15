export default function getCommonInfo(customMessages) {
  let md = '';
  md += `<strong>Node</strong> ${process.versions.v8}    <code>${
    process.env.VERSION
  }</code>`;
  customMessages.forEach(msg => (md += `\n${msg}`));
  return md;
}
