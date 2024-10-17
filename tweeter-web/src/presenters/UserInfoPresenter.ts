import { AuthToken, User } from "tweeter-shared";
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

        // TODO: Call the server

        const followerCount = await this.service.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.service.getFolloweeCount(authToken, userToFollow);

        return [followerCount, followeeCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.service.getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await this.service.getFolloweeCount(authToken, userToUnfollow);

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
                this.isFollower = (
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        }, "determine follower status");
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            this.followeeCount = (await this.service.getFolloweeCount(authToken, displayedUser));
        }, "get followees count");
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            this.followerCount = (await this.service.getFollowerCount(authToken, displayedUser));
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