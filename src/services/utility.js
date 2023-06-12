function getTime() {
  const nowDate = new Date();
  const hh = nowDate.getHours().toString().padStart(2, "0");
  const mm = nowDate.getMinutes().toString().padStart(2, "0");
  const ss = nowDate.getSeconds().toString().padStart(2, "0");
  return `[${hh}:${mm}:${ss}]`;
}

module.exports = getTime;
