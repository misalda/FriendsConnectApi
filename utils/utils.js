module.exports.arrayize = item => (Array.isArray(item) ? item : [item]);

module.exports.maskEmail = function maskEmail(email) {
  let [user, domain] = email.split("@");
  return [
    user
      .split("")
      .map((c, index) => (index < 4 ? "x" : c))
      .join(""),
    domain
  ].join("@");
};

module.exports.log = function log(message, level = "INFO") {
  console.log(`${new Date().toISOString()} - [${level}] - ${message}`);
};