const EthrDID = require('ethr-did')
 
exports.getissuer = async () => {
    const issuer = new EthrDID.EthrDID({
        identifier: process.env.ID,
        privateKey: process.env.PEMKEY
    })
    return issuer;
}
