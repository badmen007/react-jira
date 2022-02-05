import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, setState] = useState<State<D>>({
    // 这里为什么要传泛型
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      stat: "error",
      data: null,
    });
  };

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise");
    }

    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        //catch 会消化异常  如果不主动抛出的话  那么外面就接收不到异常
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    isLoading: state.stat === "loading",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
