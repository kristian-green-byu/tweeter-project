import { PagedStatusItemRequest, PostStatusRequest, Status } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class StatusService {
  private facade = new ServerFacade();

  public async loadMoreStoryItems(
    requestObject: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    return this.facade.getMoreStoryItems(requestObject);
  }

  public async loadMoreFeedItems(
    requestObject: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    return this.facade.getMoreFeedItems(requestObject);
  }

  public async postStatus(
    requestObject: PostStatusRequest
  ): Promise<void> {
    return this.facade.postStatus(requestObject)
  }
}