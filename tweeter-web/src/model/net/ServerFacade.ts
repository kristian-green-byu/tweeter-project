import {
  AuthToken,
  CountResponse,
  DoLoginRequest,
  DoLoginResponse,
  DoRegisterRequest,
  FollowRequest,
  FollowResponse,
  GetUserRequest,
  GetUserResponse,
  IsFollowerStatusRequest,
  IsFollowerStatusResponse,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  PostStatusRequest,
  Status,
  TweeterRequest,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL = "https://4zaza1yy95.execute-api.us-east-2.amazonaws.com/dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followee/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to retrieve followees");
    }
  }

  public async getMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/follower/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to retrieve followers");
    }
  }

  public async getFolloweeCount(
    request: FollowRequest
  ): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      CountResponse
    >(request, "/followee/count");

    // Handle errors
    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred");
    }
  }

  public async getFollowerCount(
    request: FollowRequest
  ): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      CountResponse
    >(request, "/follower/count");

    // Handle errors
    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred");
    }
  }

  public async follow(
    request: FollowRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, "/follow");

    // Handle errors
    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to follow");
    }
  }

  public async unfollow(
    request: FollowRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, "/unfollow");

    // Handle errors
    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to unfollow");
    }
  }

  public async isFollowerStatus(request: IsFollowerStatusRequest): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      IsFollowerStatusRequest,
      IsFollowerStatusResponse
    >(request, "/follower/IsFollower");

    if (response.success) {
      return response.isFollower;
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred");
    }
  }

  public async getMoreStoryItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/story/list");

    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;
    if (response.success) {
      if (items == null) {
        throw new Error(`No stories`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to fetch story items");
    }
  }

  public async getMoreFeedItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/feed/list");

    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    if (response.success) {
      if (items == null) {
        throw new Error(`No feed found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to fetch feed items");
    }
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(request, "/post/list");

    if (response.success) {
      return;
    } else {
      console.error(response);
      throw new Error(response.message ?? "could not post status");
    }
  }

  public async login(request: DoLoginRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      DoLoginRequest,
      DoLoginResponse
    >(request, "/login");

    const user: User | null = User.fromDto(response.user);
    const authToken: AuthToken = new AuthToken(response.token, Date.now());
    if (response.success) {
      if (user == null) {
        console.error("User does not exist");
        throw new Error();
      }
      return [user, authToken];
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to login");
    }
  }

  public async register(request: DoRegisterRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      DoRegisterRequest,
      DoLoginResponse
    >(request, "/register");

    const user: User | null = User.fromDto(response.user);
    const authToken: AuthToken = new AuthToken(response.token, Date.now());

    if (response.success) {
      if (user == null) {
        console.error("User invalid");
        throw new Error();
      }
      return [user, authToken];
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to register");
    }
  }

  public async getUser(request: GetUserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
      GetUserRequest,
      GetUserResponse
    >(request, "/user/retrieve");

    const user: User | null = User.fromDto(response.user);

    if (response.success) {
      return user;
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to get user");
    }
  }

  public async logout(request: TweeterRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      TweeterResponse
    >(request, "/logout");

    // Handle errors
    if (response.success) {
      return;
    } else {
      console.error(response);
      throw new Error(response.message ?? "Unable to logout");
    }
  }

}