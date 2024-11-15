import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";

export class FollowService {

    public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
        return FakeData.instance.getFolloweeCount(user.alias);
    }

    public async getFollowerCount(token: string, user: UserDto): Promise<number> {
        return FakeData.instance.getFollowerCount(user.alias);
    }

    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
    ): Promise<[UserDto[], boolean]> {
        if(userAlias == null){
            throw new Error("[Bad Request] alias invalid");
        }
        return this.getFakeData(lastItem, pageSize, userAlias);
    };

    public async loadMoreFollowees(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
    ): Promise<[UserDto[], boolean]> {
        if(userAlias == null){
            throw new Error("[Bad Request] alias invalid");
        }
        return this.getFakeData(lastItem, pageSize, userAlias);
    };

    private async getFakeData(lastItem: UserDto | null, pageSize: number, userAlias: string): Promise<[UserDto[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastItem), pageSize, userAlias);
        const dtos = items.map((user: any) => user.dto);
        return [dtos, hasMore];
    }

    public async follow(
        token: string,
        userToFollow: UserDto
    ): Promise<[followerCount: number, followeeCount: number]> {

        const followerCount = await this.getFollowerCount(token, userToFollow);
        const followeeCount = await this.getFolloweeCount(token, userToFollow);

        return [followerCount, followeeCount];
    };

    public async unfollow(
        token: string,
        userToUnfollow: UserDto
    ): Promise<[followerCount: number, followeeCount: number]> {

        const followerCount = await this.getFollowerCount(token, userToUnfollow);
        const followeeCount = await this.getFolloweeCount(token, userToUnfollow);

        return [followerCount, followeeCount];
    };

    public async getIsFollowerStatus(
        token: string,
        user: UserDto,
        selectedUser: UserDto
    ): Promise<boolean> {
        return FakeData.instance.isFollower();
    };
}
