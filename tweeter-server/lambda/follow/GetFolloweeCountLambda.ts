import { FollowRequest, CountResponse, UserDto } from "tweeter-shared";
import { FollowService } from "../../src/model/service/FollowService";

export const handler = async (
  request: FollowRequest
): Promise<CountResponse> => {
  const followService = new FollowService();
  const count = await followService.getFolloweeCount(request.token, request.user);

  return {
    success: true,
    message: null,
    count: count
  };
};