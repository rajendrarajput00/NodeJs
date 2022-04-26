import { Router } from "express";
import { getExample, postExampleData } from "../controllers/exampleControllers";
import { postExampleDataValidation } from "../validation/ExampleValidation/ExampleValidation";

const router = Router();

router.get("/", getExample);
router.post("/", postExampleDataValidation, postExampleData);

export default router;
