import { DoLoginRequest, DoLoginResponse } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";

export const handler = async (request: DoLoginRequest): Promise<DoLoginResponse> => {
    const userService = new UserService();
    const [user, authToken] = await userService.login(request.userAlias, request.password)
    return {
        success: true,
        message: null,
        token: authToken.token,
        user: user.dto
    };
};