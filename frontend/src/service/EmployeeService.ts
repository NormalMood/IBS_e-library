import { EmployeeDataEnum } from "../@types/EmployeeDataEnum";
import { IEmployee } from "../@types/IEmployee";
import axiosInstance, { BASE_EMPLOYEE_API } from "../api/axiosInstance";
import { PositionsMap } from "../map/PositionsMap";

export default class EmployeeService {

    static async setUserData() {
        const response = await axiosInstance.get<IEmployee>(
            BASE_EMPLOYEE_API + '/data'
        )
        localStorage.setItem(EmployeeDataEnum.FULLNAME.toString(), response.data.fullName)
        localStorage.setItem(EmployeeDataEnum.ROLE.toString(), response.data.role.toString())
        localStorage.setItem(EmployeeDataEnum.POSITION.toString(), PositionsMap.get(response.data.position) as string)
    }

}