import "isomorphic-fetch";
import { StatusService } from "../../../src/model/service/StatusService";
import { PagedStatusItemRequest } from "tweeter-shared";

describe("StatusService", () => {
    let service: StatusService;

    beforeAll(() => {
        service = new StatusService();
    });

    it("loads story items succesfully", async () => {
        const request: PagedStatusItemRequest = {
            userAlias: "@marcos3",
            pageSize: 40,
            lastItem: null,
            token: "14r13g4g24g1f"
        }
        const [stories, hasMore] = await service.loadMoreStoryItems(request);

        //makes sure there are one or more stories
        expect(stories.length).toBeGreaterThan(0);
        //make sure that the stories have a post and user
        expect(stories[0].post).not.toBeNull();
        expect(stories[0].user).not.toBeNull();
        //make sure that the hasMore property isn't null
        expect(hasMore).not.toBeNull()
    })
})