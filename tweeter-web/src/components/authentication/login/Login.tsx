import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfoHook from "../../userInfo/UserInfoHook";
import { LoginPresenter} from "../../../presenters/LoginPresenter";
import { AuthView } from "../../../presenters/AuthPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoHook();
  const { displayErrorMessage } = useToastListener();

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      doLogin();
    }
  };

  const listener: AuthView = {
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
    updateUserInfo: updateUserInfo
  }

  const [presenter] = useState(new LoginPresenter(listener));

  const doLogin = async () => {
    presenter.doLogin(alias, password, rememberMe, props.originalUrl!)
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationFields onEnter={loginOnEnter} setPassword={setPassword} setAlias={setAlias} />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={presenter.isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
