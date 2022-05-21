import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    console.log('ffff');
    
  res.render("index" /* {data:filterData} */);
});

export default router;
