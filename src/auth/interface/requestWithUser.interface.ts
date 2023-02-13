import User from "src/user/user.entity";
import { Request} from 'express'

interface RequestWithUser extends Request {
    user: User
}

export default RequestWithUser