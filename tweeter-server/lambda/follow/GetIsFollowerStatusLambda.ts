import { IsFollowerStatusRequest, IsFollowerStatusResponse } from "tweeter-shared";
import { FollowService } from "../../src/model/service/FollowService";

export const handler = async (
    request: IsFollowerStatusRequest
): Promise<IsFollowerStatusResponse> => {
    const followService = new FollowService();
    const isFollower = await followService.getIsFollowerStatus(request.token, request.user, request.otherUser)

    return {
        success: true,
        message: null,
        isFollower: isFollower
    };
};