import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login"
import { render, screen } from "@testing-library/react"
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenters/LoginPresenter";
import { anything, instance, mock, verify } from "ts-mockito";

library.add(fab);

describe("Login Component", () => {


    it("start with the sign-in button disabled", () => {
        const { submitButton } = renderLoginAndGetElement("/");
        expect(submitButton).toBeDisabled();
    });

    it("sign-in button is enabled when both the alias and password fields have text", async () => {
        const { submitButton, aliasField, passwordField, user } = renderLoginAndGetElement("/");

        await user.type(aliasField, "testAlias");
        await user.type(passwordField, "testPassword");

        expect(submitButton).toBeEnabled();
    });

    it("sign-in button is disabled if either the alias or password field is cleared", async () => {
        const { submitButton, aliasField, passwordField, user } = renderLoginAndGetElement("/");

        await user.type(aliasField, "testAlias");
        await user.type(passwordField, "testPassword");

        await user.clear(aliasField);
        expect(submitButton).toBeDisabled();

        await user.type(aliasField, "testAlias");
        expect(submitButton).toBeEnabled();

        await user.clear(passwordField);
        expect(submitButton).toBeDisabled();
    });

    it("presenter's login method is called with correct parameters when the sign-in button is pressed", async () => {
        const mockPresenter = mock(LoginPresenter);
        const mockPresenterInstance = instance(mockPresenter);

        const originalUrl = "https://test.com";
        const alias = "@testAlias";
        const password = "testPassword"
        const { submitButton, aliasField, passwordField, user } = renderLoginAndGetElement(originalUrl, mockPresenterInstance);
        await user.type(aliasField, alias);
        await user.type(passwordField, password);
        await user.click(await submitButton);

        verify(mockPresenter.doLogin(alias, password, anything(), originalUrl)).once();

    });
});


const renderLogin = (originalUrl?: string, presenter?: LoginPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? (
                <Login originalUrl={originalUrl} presenter={presenter} />
            ) : (
                <Login originalUrl={originalUrl} />)}
        </MemoryRouter>
    );
};

const renderLoginAndGetElement = (originalUrl?: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    return { submitButton, aliasField, passwordField, user }
}