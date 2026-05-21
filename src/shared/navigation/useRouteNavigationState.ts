import { useNavigation } from "react-router-dom";

/**
 * React Router navigation state — use for inline skeletons or disabling actions during transitions.
 * (Global progress bars belong in a layout inside the route tree if you add one later.)
 */
export function useRouteNavigationState() {
  const navigation = useNavigation();
  return {
    state: navigation.state,
    isBusy: navigation.state !== "idle",
    location: navigation.location,
  };
}
