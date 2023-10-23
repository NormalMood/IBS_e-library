import { IEmployee } from "../@types/IEmployee";
import { RolesEnum } from "../@types/RolesEnum";
import axiosInstance, { BASE_EMPLOYEE_API } from "../api/axiosInstance";
import { PositionsMap } from "../map/PositionsMap";

export default class EmployeeService {

    static async getUserData() {
        const response = await axiosInstance.get(
            BASE_EMPLOYEE_API + '/data'
        )
        const userData: IEmployee = {
            fullName: response.data.fullName,
            isAdmin: response.data.role?.toString() === RolesEnum.ADMIN,
            position: PositionsMap.get(response.data.position) as string
        }
        return userData
    }

}