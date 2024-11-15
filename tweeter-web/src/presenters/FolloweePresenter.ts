import { AuthToken, PagedUserItemRequest, User } from "tweeter-shared";
import { PAGE_SIZE } from "./PagedItemPresenter";
import { UserItemPresenter } from "./UserItemPresenter";
export class FolloweePresenter extends UserItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        
        const lastItem = this.lastItem ? this.lastItem.dto : null;
    
        const request: PagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: lastItem
        };

        return this.service.loadMoreFollowees(request);
    }
    protected getItemDescription(): string {
        return "load followees";
    }
}
