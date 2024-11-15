import { AuthToken, FakeData, Status } from "tweeter-shared";
import { StatusDto } from "tweeter-shared/dist/model/dto/StatusDto";

export class StatusService {
  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    if(userAlias == null){
      throw new Error("[Bad Request] alias invalid");
    }
    return this.getFakeData(lastItem, pageSize);
  };

  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    if(userAlias == null){
      throw new Error("[Bad Request] alias invalid");
    }
    return this.getFakeData(lastItem, pageSize);
  }

  private async getFakeData(
    lastItem: StatusDto | null,
    pageSize: number
  ): Promise<[StatusDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      Status.fromDto(lastItem),
      pageSize
    );
    const dtos = items.map((user: any) => user.dto);
    return [dtos, hasMore];
  }

  public async postStatus(
    token: string,
    newStatus: StatusDto | null
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));
  }
}