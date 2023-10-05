import express  from "express";
import { ServiceUser } from "../service/serviceUser"; 
const router = express.Router();
import { UserRepository } from "../repo/User";
const userRepository=new UserRepository()
const serviceUser = new ServiceUser (userRepository)
router.get("/",(req: any, res: any) => {serviceUser.users(req,res)});
// router.post("/",serviceUser.users );
// router.post("/:id", );
//  router.put("/:id", updateProduit);

module.exports = router;
