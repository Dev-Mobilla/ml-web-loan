const { createHash } = require("node:crypto");

const SignatureGenerator = (passPhrase) => {

    const hash = createHash("sha512").update(passPhrase).digest("hex");

    return hash;
}

module.exports = SignatureGenerator;