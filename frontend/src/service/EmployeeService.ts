import { IEmployee } from "../@types/IEmployee";
import { IEmployeeResponse } from "../@types/IEmployeeResponse";
import { RolesEnum } from "../@types/RolesEnum";
import axiosInstance, { BASE_EMPLOYEE_API } from "../api/axiosInstance";
import { PositionsMap } from "../map/PositionsMap";

export default class EmployeeService {

    static async getUserData() {
        const response = await axiosInstance.get<IEmployeeResponse>(
            BASE_EMPLOYEE_API + '/data'
        )
        const userData: IEmployee = {
            id: response.data.id,
            fullName: response.data.fullName,
            isAdmin: response.data.role?.toString() === RolesEnum.ADMIN,
            position: PositionsMap.get(response.data.position) as string,
            pictureName: response.data.pictureName
        }
        return userData
    }

}