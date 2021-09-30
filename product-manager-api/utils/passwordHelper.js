const passwordHelper = require('bcrypt');
const saltRounds = 10;

/**
 * Encrypt an plain text string and return it's hash
 */
module.exports.passwordEncryptor = (plainPassword) => {
    return new Promise( (resolve, reject) => {
        passwordHelper.hash(plainPassword.toString(), saltRounds, async function (err, hash) {
            if(err){
                reject(err);
            }
            else{
                resolve(hash);
            }
        });
    });
}

/**
 * Compare an password with its database hash and return if it's valid
 */
module.exports.compare = (formPassword,databasePassword) => {
    return new Promise( (resolve, reject) => {
        try {
            let result = passwordHelper.compareSync(formPassword.toString(),databasePassword.toString());
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

/**
 * generate an temp plain password an hash and return it
 */
module.exports.generateTempPassword = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (let i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            let newPassword = await this.passwordEncryptor(retVal.toString());
            resolve({
                encrypted : newPassword,
                plain : retVal
            });
        }
        catch (e) {
            reject(e);
        }
    });
}