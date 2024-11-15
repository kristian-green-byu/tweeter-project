import { AuthToken, Status, PagedStatusItemRequest } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
    const lastItem = this.lastItem ? this.lastItem.dto : null;

    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: PAGE_SIZE,
      lastItem: lastItem,
    };
    return this.service.loadMoreFeedItems(request);
  }
  protected getItemDescription(): string {
    return "load feed items";
  }
}