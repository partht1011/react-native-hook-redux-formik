var rootNavigator;

const setRootNavigator = ref => {
  rootNavigator = ref;
};

const getActiveRouteState = function(route) {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

const navigate = routeName => {
  rootNavigator.navigate(routeName);
};

export default {
  getActiveRouteState,
  setRootNavigator,
  navigate,
};
