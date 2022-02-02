import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { IUser } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface IAuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token }); // 这个就是相当于是validate接口校验是否登录
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: IUser | null;
      login: (form: IAuthForm) => Promise<void>;
      register: (form: IAuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (form: IAuthForm) => auth.login(form).then(setUser);

  const register = (form: IAuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ login, register, logout, user }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};