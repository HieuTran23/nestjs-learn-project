import { Role } from "../enum/role.enum";
declare class User {
    id: number;
    email: string;
    hashPassword: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    currentHashedRefreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}
export default User;
