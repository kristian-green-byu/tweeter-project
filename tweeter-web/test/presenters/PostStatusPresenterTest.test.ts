import { AuthToken, PostStatusRequest, Status, User } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenters/PostStatusPresenter";
import { anything, capture, instance, mock, spy, verify, when, deepEqual } from "ts-mockito";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;
    const authToken = new AuthToken("test", Date.now());
    const user = new User("test", "tester", "akaTest", "coolimage.png")
    const post = "test post";
    const status = new Status(post, user!, Date.now());
    const request : PostStatusRequest = {
      token: authToken.token,
      newStatus: status.dto
    };

      beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
    
        const postStatusPresenterSpy = spy(
          new PostStatusPresenter(mockPostStatusViewInstance)
        );
        postStatusPresenter = instance(postStatusPresenterSpy);
    
        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);
    
        when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
      });

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(user, authToken, post);
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    });

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
      await postStatusPresenter.submitPost(user, authToken, post);
      verify(mockStatusService.postStatus(deepEqual(request))).once();
  
      const [capturedInfo] = capture(
        mockStatusService.postStatus
      ).last();
      expect(capturedInfo.token).toBe(authToken.token);
      expect(capturedInfo.newStatus?.post).toBe(post);
    });

    it("when posting is successful, tells the view to clear the last info message, clear the post,"+
    " and display a status posted message", async () => {
        await postStatusPresenter.submitPost(user, authToken, post);

        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
        verify(mockPostStatusView.displayErrorMessage(anything())).never();
        
    });

    it("when posting is unsuccessful, tells the view to display an error message and clear the last info"
    +" message and does not tell it to clear the post or display a status posted message", async () => {
        const error = new Error("could not post status");
        when(mockStatusService.postStatus(deepEqual(request))).thenThrow(error);

        await postStatusPresenter.submitPost(user, authToken, post);
        verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: could not post status")).once();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });

});