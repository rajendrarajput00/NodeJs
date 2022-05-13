import { Router } from "express";
import { postTaskReminder,getTaskReminder } from "../controllers/taskReminderController";
const router = Router();

router.post("/post-task-reminder", postTaskReminder);
router.get("/post-task-reminder", getTaskReminder);



export default router;
