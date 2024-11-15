import { DoRegisterRequest, FollowRequest, PagedUserItemRequest, UserDto } from "tweeter-shared";
import { ServerFacade } from "../../../src/model/net/ServerFacade";
import "isomorphic-fetch";

describe("ServerFacade", () => {
    let facade: ServerFacade
    let testUser: UserDto = {
        firstName: "Guilherme",
        lastName: "Silva",
        alias: "@gSilva43",
        imageUrl: "https://coolwebite.com/image"
      };

    beforeAll(() => {
        facade = new ServerFacade();
    });

    it("registers a user successfully", async () => {
        const request: DoRegisterRequest = {
            firstName: "Guilherme",
            lastName: "Silva",
            alias: "@gSilva43",
            password: "senhaSegura26",
            userImageBytes: "bytes",
            imageFileExtension: "png",
            token: "asdf34f1"

        }
        const [user, authToken] = await facade.register(request);

        //verify all returned info is not null. 
        //Can't test if it's correct until fake data is not used.

        expect(user.firstName).not.toBeNull();
        expect(user.lastName).not.toBeNull();
        expect(user.alias).not.toBeNull();
        expect(user.imageUrl).not.toBeNull();

        expect(authToken.timestamp).not.toBeNull();
        expect(authToken.token).not.toBeNull();
    })

    it("retrieves list of followers successfully", async () => {
        const request: PagedUserItemRequest = {
            userAlias: "@gSilva43",
            pageSize: 20,
            lastItem: null,
            token: "asdf34f1"
        }
        const [followers, hasMore] = await facade.getMoreFollowers(request);

        //verify there are multiple followers and that hasMore is not null
        expect(followers.length).toBeGreaterThan(0);
        expect(hasMore).not.toBeNull();
    })

    it("retrieves following count correctly", async () => {
        const request: FollowRequest = {
            user: testUser,
            token: "asdf34f1"
        }
        const count = await facade.getFollowerCount(request);

        //make sure that the follower count is a number and is greater than 0
        expect(count).toBeGreaterThan(0);
    })
})

