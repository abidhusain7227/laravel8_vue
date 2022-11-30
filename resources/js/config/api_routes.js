import config from "./index";

const routes = {
    // democurd
    addEmployeApi: config.api_url + "addemploye",
    getEmployeApi: config.api_url + "getemploye",
    activeInactiveEmployeApi: config.api_url + "activeinactiveemploye"
};

export { routes };
