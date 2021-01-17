const variables = require("../../../../variables")["default"];
const apiUrl: string = variables.apiUrl;

const getFullPath = (path: string): string => {
    return apiUrl + path;
}

export default getFullPath;