import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add title tag to the document
document.title = "Monorepo Setup Guide";

// Add viewport meta tag
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0';
document.getElementsByTagName('head')[0].appendChild(meta);

createRoot(document.getElementById("root")!).render(<App />);
