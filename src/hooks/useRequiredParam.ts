import { useParams } from "react-router-dom";

/**
 * Custom hook to get a required parameter from the URL.
 * @param paramName The name of the parameter to retrieve.
 * @throws Error if the parameter is not present.
 * @returns The parameter value.
 */
export const useRequiredParam = (paramName: string): string => {
    const params = useParams();
    const paramValue = params[paramName];

    if (paramValue === undefined) {
        throw new Error(`Parameter "${paramName}" is required but not found.`);
    }

    return paramValue;
};
