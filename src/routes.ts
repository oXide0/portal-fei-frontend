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
                path: "isp/requests",
                Component: RequestsPage,
            },
            {
                path: "isp/create-request",
                Component: CreateRequestPage,
            },
            {
                path: "isp/edit-request/:requestId",
                Component: EditRequestPage,
            },
            {
                path: "isp/subjects-table/:tableId",
                Component: SubjectsTablePage,
            },
        ],
    },
]);
