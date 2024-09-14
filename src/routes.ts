import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import CategoryPage from "./pages/CategoryPage";
import CreateRequestPage from "./pages/isp/CreateRequestPage";
import EditRequestPage from "./pages/isp/EditRequestPage";
import RequestsPage from "./pages/isp/RequestsPage";
import SubjectsTablePage from "./pages/isp/SubjectsTablePage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: CategoryPage,
            },
            {
                path: "requests",
                Component: RequestsPage,
            },
            {
                path: "create-request",
                Component: CreateRequestPage,
            },
            {
                path: "edit-request/:requestId",
                Component: EditRequestPage,
            },
            {
                path: "subjects",
                Component: SubjectsTablePage,
            },
        ],
    },
]);
