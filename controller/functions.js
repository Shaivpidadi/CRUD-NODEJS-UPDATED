const dbModule = require('./dbFunctions');
const check = require('./validation');

async function displayUserData(res) {
    try {

        const db = await dbModule.connectToDB();
        const data = await dbModule.getUserData(db);
        res.send(data);

    } catch (err) {
        console.log(err.message);
    }
};

async function insertUserData (req,res) {
    try {
        const result = check.validateData(req);

        if (result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }

        const customerData = {
            "name": req.body.name,
            "Created At": new Date()
        }

        const db = await dbModule.connectToDB();
        const data = await dbModule.insertUserData(db,customerData);

        res.status(200).send("Data inserted Successfully");

    }catch (err) {
        console.log(err.message);
    }
};


async function updateUserData(req,res) {
    try {
        const result = check.validateUpdateData(req);
        if (result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }

        let oldName = req.body.oldName;
        let newName = req.body.newName;

        const db = await dbModule.connectToDB();
        const data = await dbModule.checkData(db,oldName);

        if (data == null) {
            res.status(400).send("Data Not Found");
        }
        else{
            const updatedDB = dbModule.updateUserData(db,oldName,newName);
            res.status(200).send("Data updated Successfully");
        }

    }catch (err) {
        console.log(err.message);
    }
};

async function deleteUserData(req,res) {
    try {
        let name = req.params.name;
        const db = await dbModule.connectToDB();
        const data = await dbModule.checkData(db,name);
        if (data == null) {
            res.status(400).send("Data Not Found");
        }
        else{
            const updatedData = await dbModule.deleteUserData(db,name);
            res.status(200).send("Data Deleted Successfully");
        }
    } catch (err) {
        console.log(err.message);
    }
};



module.exports = {
    displayUserData, insertUserData, updateUserData, deleteUserData
}

