import { AuthToken, User } from "tweeter-shared";
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import { verify, anything, instance, mock, capture } from "ts-mockito";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import { PostStatusPresenter } from "../../../src/presenters/PostStatusPresenter"
import PostStatus from "../../../src/components/postStatus/PostStatus"
import { userEvent } from "@testing-library/user-event";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));


describe("Post Status", () => {
    beforeAll(() => {
        (useUserInfo as jest.Mock).mockReturnValue({
            currentUser: instance(mock(User)),
            authToken: instance(mock(AuthToken)),
        });
    });

    it("When first rendered the Post Status and Clear buttons are both disabled.", async () => {
        const { postStatusButton, clearStatusButton } = await renderPostStatusAndGetElement();
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("Both buttons are enabled when the text field has text", async () => {
        const { postStatusButton, clearStatusButton, postStatusTextField, user } = await renderPostStatusAndGetElement();
        await user.type(postStatusTextField, "testPost");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it("Both buttons are disabled when the text field is cleared", async () => {
        const { postStatusButton, clearStatusButton, postStatusTextField, user } = await renderPostStatusAndGetElement();
        await user.type(postStatusTextField, "testPost");
        await user.clear(postStatusTextField);
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("presenter's postStatus method is called with correct parameters when the Post Status button is pressed", async () => {
        const mockPresenter = mock(PostStatusPresenter);
        const mockPresenterInstance = instance(mockPresenter);

        const { postStatusButton, postStatusTextField, user } = await renderPostStatusAndGetElement(mockPresenterInstance);
        await user.type(postStatusTextField, "testPost");
        await user.click(await postStatusButton);

        verify(mockPresenter.submitPost(anything(), anything(), "testPost")).once();
        const [submitUser, submitAuth, text] = capture(mockPresenter.submitPost).last();
        expect(text).toEqual("testPost");
    });
})

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
        </MemoryRouter>
    )
}

const renderPostStatusAndGetElement = async (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const postStatusTextField = await screen.findByTestId("postStatusTextArea");
    const postStatusButton = await screen.findByTestId("postStatusButton");
    const clearStatusButton = await screen.findByTestId("clearStatusButton");
    return { postStatusTextField, postStatusButton, clearStatusButton, user };
};