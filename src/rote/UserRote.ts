import express from "express";
import { ServiceUser } from "../service/serviceUser";
const router = express.Router();
import { UserRepository } from "../repo/User";
const userRepository = new UserRepository();
const serviceUser = new ServiceUser(userRepository);
router.get("/", (req: any, res: any) => {
  serviceUser.users(req, res);
});

router.post("/", (req: any, res: any) => {
    serviceUser.save(req, res);
  });
  
  router.delete("/:id", (req: any, res:any) => {
    serviceUser.supp(req, res);
  });
  
  router.put("/:id", (req:any, res:any) => {
    serviceUser.update(req, res);
  });

module.exports = router;