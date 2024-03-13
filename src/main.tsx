import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import { apiFetcher } from "./services/api";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <SWRConfig
        value={{
            fetcher: apiFetcher,
            revalidateOnFocus: false,
            revalidateOnMount: true,
            revalidateIfStale: false,
        }}
    >
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </SWRConfig>
);
