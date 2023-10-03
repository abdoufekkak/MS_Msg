const express = require("express");


const {
 userrole
} = require("../repo/User.ts");
const router = express.Router();


router.get("/",userrole.GetAllUser );
router.post("/",userrole.createUser );
// router.post("/:id", );
//  router.put("/:id", updateProduit);

module.exports = router;