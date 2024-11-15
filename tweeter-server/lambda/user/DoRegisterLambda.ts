import { DoLoginResponse, DoRegisterRequest } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";

export const handler = async (request: DoRegisterRequest): Promise<DoLoginResponse> => {
    const userService = new UserService();
    const [user, authToken] = await userService.register(
        request.firstName,
        request.lastName,
        request.alias,
        request.password,
        request.imageFileExtension,
        request.imageFileExtension
    );
    return {
        success: true,
        message: null,
        token: authToken.token,
        user: user.dto,
    };
};