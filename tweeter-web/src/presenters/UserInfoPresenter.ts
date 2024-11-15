import { AuthToken, FollowRequest, IsFollowerStatusRequest, User } from "tweeter-shared";
import { MessageView, Presenter } from "./Presenter";
import { FollowService } from "../model/service/FollowService";
export class UserInfoPresenter extends Presenter<MessageView>{
    private service: FollowService
    public isFollower: boolean = false;
    public followeeCount: number = -1;
    public followerCount: number = -1;
    public isLoading: boolean = false;

    public constructor(view: MessageView) {
        super(view);
        this.service = new FollowService();
    }

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        const request: FollowRequest = {
            token: authToken.token,
            user: userToFollow
        }
        const followerCount = await this.service.getFollowerCount(request);
        const followeeCount = await this.service.getFolloweeCount(request);

        return [followerCount, followeeCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        const request: FollowRequest = {
            token: authToken.token,
            user: userToUnfollow
        }
        const followerCount = await this.service.getFollowerCount(request);
        const followeeCount = await this.service.getFolloweeCount(request);

        return [followerCount, followeeCount];
    };

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this.isFollower = false;
            } else {
                const request: IsFollowerStatusRequest = {
                    token: authToken.token,
                    user: currentUser.dto,
                    otherUser: displayedUser.dto
                }
                this.isFollower = (
                    await this.service.getIsFollowerStatus(request)
                );
            }
        }, "determine follower status");
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        const request: FollowRequest = {
            token: authToken.token,
            user: displayedUser
        }
        this.doFailureReportingOperation(async () => {
            this.followeeCount = (await this.service.getFolloweeCount(request));
        }, "get followees count");
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        const request: FollowRequest = {
            token: authToken.token,
            user: displayedUser
        }
        this.doFailureReportingOperation(async () => {
            this.followerCount = (await this.service.getFollowerCount(request));
        }, "get followers count")
    };

    public async followDisplayedUser(
        event: React.MouseEvent,
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void> {
        event.preventDefault();

        this.doFailureReportingOperation(async () => {
            this.isLoading = true;
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.follow(
                authToken!,
                displayedUser!
            );

            this.isFollower = true;
            this.followerCount = followerCount;
            this.followeeCount = followeeCount;
        }, "follow user", () => {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        })
    };

    public async unfollowDisplayedUser(
        event: React.MouseEvent,
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void> {
        event.preventDefault();
        this.doFailureReportingOperation(async () => {
            this.isLoading = true;
            this.view.displayInfoMessage(
                `Unfollowing ${displayedUser!.name}...`,
                0
            );

            const [followerCount, followeeCount] = await this.unfollow(
                authToken!,
                displayedUser!
            );

            this.isFollower = false;
            this.followerCount = followerCount;
            this.followeeCount = followeeCount;
        }, "unfollow user", () => {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        }) 
    };
}