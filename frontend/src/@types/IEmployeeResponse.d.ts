import { RolesEnum } from "./RolesEnum";

export interface IEmployeeResponse {
    id: number;
    fullName: string;
    role: RolesEnum;
    position: string;
    pictureName: string;
}