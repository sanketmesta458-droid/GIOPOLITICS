import { Router, type IRouter } from "express";
import healthRouter from "./health";
import countriesRouter from "./countries";
import warsRouter from "./wars";
import leadersRouter from "./leaders";
import economyRouter from "./economy";
import newsRouter from "./news";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/countries", countriesRouter);
router.use("/wars", warsRouter);
router.use("/leaders", leadersRouter);
router.use("/economy", economyRouter);
router.use("/news", newsRouter);
router.use("/dashboard", dashboardRouter);

export default router;
