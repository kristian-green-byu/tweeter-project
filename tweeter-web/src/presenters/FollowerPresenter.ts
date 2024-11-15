import { AuthToken, PagedUserItemRequest, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FollowerPresenter extends UserItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        const lastItem = this.lastItem ? this.lastItem.dto : null;
    
        const request: PagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: lastItem
        };

        return this.service.loadMoreFollowers(request);
    }
    protected getItemDescription(): string {
        return "load followers";
    }
}
