const db = require("../models");
const key = db.key;

const { generateKeyPair } = require("../key/index");

exports.allKey = (req, res) => {
   
    key.find({
        userid: req.userId
    }).exec((err, keys) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!keys) {
            res.status(400).send({ message: "No Keys !" });
            return;
        }
        else {
            res.status(200).send(keys);
        }
    })
};

exports.insertKey = async (req, res) => {
     try{
        console.log(req.userId)
        if (req.body.secret) {
           const generateKeyPairObject = await generateKeyPair(req.body.secret);
        //    console.log(generateKeyPairObject) 
           if(generateKeyPairObject)
            {
                //console.log('generateKeyPairObject',generateKeyPairObject.publicKey)
                key.insertMany({ userid: req.userId, public: generateKeyPairObject.publicKey1,
                    private: generateKeyPairObject.privateKey1  }, function (err, keys) {
                    if (err) {
                        console.log('could not insert')
                        throw err
                    }
                    if (!keys) {
                        res.status(400).send({ message: "No Keys !" });
                        return;
                    }
                    else {
                        //console.log('keys',keys)
                        res.status(200).send("Done");
                    }
                    //key.close()
                })
            }
            else
                throw(true)
        }
        else
            throw("Request")
     }
     catch(e)
     {
        console.log(e)
        res.status(400).send({ message: "Not Generate"});
        return;
     }
   

};
