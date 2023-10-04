import { PositionsEnum } from "./PositionsEnum";
import { RolesEnum } from "./RolesEnum";

export interface IEmployee {
    fullName: string;
    role: RolesEnum;
    position: string;
}