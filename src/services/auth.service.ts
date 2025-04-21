import { ILoginRequest } from "../interfaces/auth";
import { publicRequest } from "../utils/request";

const authService = {
    login: ({ email, password }: ILoginRequest): Promise<ILoginRequest> =>
        publicRequest.request({
            method: "POST",
            url: "https://67a9a2e56e9548e44fc439d1.mockapi.io/api/users", 
            data: { email, password },
        })
        
    
}
export default authService;