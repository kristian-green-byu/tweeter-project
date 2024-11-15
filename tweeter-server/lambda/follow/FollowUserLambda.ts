import { FollowResponse, FollowRequest } from "tweeter-shared";
import { FollowService } from "../../src/model/service/FollowService";

export const handler = async (
    request: FollowRequest
): Promise<FollowResponse> => {
    const followService = new FollowService();
    const [followerCount, followeeCount] = await followService.follow(
        request.token,
        request.user
    );

    return {
        success: true,
        message: null,
        followeeCount: followeeCount,
        followerCount: followerCount
    };
};