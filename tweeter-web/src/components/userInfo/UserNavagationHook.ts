import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "./UserInfoHook";
import { UserNavigationPresenter } from "../../presenters/UserNavigationPresenter";

interface UserListener {
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const useUserNavigationHook = (): UserListener => {
    const { setDisplayedUser, currentUser, authToken } =
        useUserInfoHook();
    const { displayErrorMessage } = useToastListener();

    const listener = {
        setDisplayedUser: setDisplayedUser,
        displayErrorMessage: displayErrorMessage
    }

    const presenter = new UserNavigationPresenter(listener);
    
    return {
        navigateToUser: (event) => presenter.navigateToUser(event, authToken!, currentUser!),
    }
}

export default useUserNavigationHook;