import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiURL = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
  data?: object;
  token?: string;
}

//当一个参数有默认值的时候自动就变成可选的了
export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); // 为什么要手动抛出错误
      }
    });
};
// TODO  TS 操作符
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
