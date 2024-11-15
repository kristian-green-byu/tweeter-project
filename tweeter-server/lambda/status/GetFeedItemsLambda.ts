import { PagedStatusItemRequest, PagedStatusItemResponse } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";

export const handler = async (
    request: PagedStatusItemRequest
): Promise<PagedStatusItemResponse> => {
    const statusService = new StatusService();
    const [items, hasMore] = await statusService.loadMoreFeedItems(
        request.token,
        request.userAlias,
        request.pageSize,
        request.lastItem
    );

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore,
    };
};