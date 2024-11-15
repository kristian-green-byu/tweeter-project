import { AuthToken } from "tweeter-shared";
import { NavBarPresenter, NavBarView } from "../../src/presenters/NavBarPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito";
import { UserService } from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {
    let mockNavBarPresenterView: NavBarView;
    let navBarPresenter: NavBarPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("test", Date.now());

    beforeEach(() => {
        mockNavBarPresenterView = mock<NavBarView>();
        const mockNavBarPresenterViewInstance = instance(mockNavBarPresenterView);
        const navBarPresenterSpy = spy(new NavBarPresenter(mockNavBarPresenterViewInstance))
        navBarPresenter = instance(navBarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(navBarPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a logging out message", async () => {
        await navBarPresenter.logOut(authToken);
        verify(mockNavBarPresenterView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct auth token", async () => {
        await navBarPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    });

    it("presenter tells the view to clear the last info message and clear the user info when logout is successful", async () => {
        await navBarPresenter.logOut(authToken);

        verify(mockNavBarPresenterView.clearLastInfoMessage()).once();
        verify(mockNavBarPresenterView.clearUserInfo()).once();

        verify(mockNavBarPresenterView.displayErrorMessage(anything())).never();

    });

    it("displays an error message and does not clear the last info message or clear the user info when logout is unsuccessful", async () => {
        const error = new Error("Logout unsuccessful");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await navBarPresenter.logOut(authToken);
        verify(mockNavBarPresenterView.displayErrorMessage("Failed to log user out because of exception: Logout unsuccessful")).once();

        verify(mockNavBarPresenterView.clearLastInfoMessage()).never();
        verify(mockNavBarPresenterView.clearUserInfo()).never();
    });
});