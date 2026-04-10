import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@/api/custom-fetch";


setBaseUrl("https://sincere-intuition-production-cf1c.up.railway.app/api");

createRoot(document.getElementById("root")!).render(<App />);
