import express  from "express";
import { ServiceUser } from "../service/serviceUser"; 
const router = express.Router();

const serviceUser = new ServiceUser ()
router.get("/",serviceUser.gettuser );
// router.post("/",repoclient.createUser );
// router.post("/:id", );
//  router.put("/:id", updateProduit);

module.exports = router;