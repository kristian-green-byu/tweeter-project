import { FollowRequest, IsFollowerStatusRequest, PagedUserItemRequest, User } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class FollowService {
    private facade = new ServerFacade();

    public async getFolloweeCount(
        requestObject: FollowRequest
    ): Promise<number> {
        return this.facade.getFolloweeCount(requestObject);
    }

    public async getFollowerCount(
        requestObject: FollowRequest
    ): Promise<number> {
        return this.facade.getFollowerCount(requestObject);
    }
    public async loadMoreFollowers(
        request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
        return this.facade.getMoreFollowers(request);
    };

    public async loadMoreFollowees(
        request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
        return this.facade.getMoreFollowees(request);
    };

    public async follow(
        requestObject: FollowRequest
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.facade.follow(requestObject);
    }

    public async unfollow(
        requestObject: FollowRequest
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.facade.unfollow(requestObject)
    }

    public async getIsFollowerStatus(
        requestObject: IsFollowerStatusRequest
      ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return this.facade.isFollowerStatus(requestObject)
      }
}