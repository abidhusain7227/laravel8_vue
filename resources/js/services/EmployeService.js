import { multipart_headers } from '../Helper/helper';
import { routes } from '../config/api_routes';
import axios from 'axios';

export const employeService = {

    // Add Employe
    addEmploye: (formData) => axios.post(routes.addEmployeApi, formData, { headers: multipart_headers() })
    
}