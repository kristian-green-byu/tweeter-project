import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems: (newItems: T[]) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter<PagedItemView<T>>{
    private _hasMoreItems = true;
    private _lastItem: T | null = null;
    private _service: U

    public constructor(view: PagedItemView<T>) {
        super(view);
        this._service = this.createService();
    }

    protected abstract createService(): U;

    protected get lastItem() {
        return this._lastItem;
    }

    protected get service() {
        return this._service;
    }

    protected set lastItem(value: T | null) {
        this._lastItem = value;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }

    protected get view(): PagedItemView<T> {
        return super.view as PagedItemView<T>;
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        this.doFailureReportingOperation(async () => {
            const [newItems, hasMore] = await this.getMoreItems(
                authToken,
                userAlias,
            );

            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        }, this.getItemDescription());
    };

    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>

    protected abstract getItemDescription(): string;
}