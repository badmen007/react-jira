import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;

      const previous = state.past[state.past.length - 1];
      const newPast = past.slice(0, state.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = () => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  };

  const set = (newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === state.present) {
        return currentState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  };

  const reset = (newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  };

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
