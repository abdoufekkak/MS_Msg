import express from "express";
import { ServiceMessage } from "../service/serviceMessage";
const router = express.Router();
import {MessageDB  } from "../repo/message";
const userRepository = new MessageDB();
const serviceMessage = new ServiceMessage(userRepository);
router.get("by2users/", (req: any, res: any) => {
    serviceMessage.getmsgby2user(req,res)
});

// router.post("/", (req: any, res: any) => {
//     serviceMessage.save(req, res);
//   });
  
  router.delete("moi/:id", (req: any, res:any) => {
    serviceMessage.suppparmoi(req, res);
  });
  router.delete("all/:id", (req: any, res:any) => {
    // serviceUser.supp(req, res);
  });
  router.put("/:id", (req:any, res:any) => {
    serviceMessage.updatemssage(req, res);
  });

module.exports = router;