import React from "react";
import { connect } from "react-redux";

const instances = {};

const sharedDispatch = (dispatchActions = {}) => Component => {
  const { displayName: instanceKey } = Component;
  instances[instanceKey] = Object.keys(dispatchActions).reduce((prev, cur) => {
    return {
      ...prev,
      [cur]: {
        key: cur,
        func: dispatchActions[cur],
        executer: null
      }
    };
  }, {});

  return connect()(
    class extends React.Component {
      constructor(props) {
        super(props);

        const { dispatch } = props;

        const currentInstance = instances[instanceKey];
        const actionNames = Object.keys(currentInstance);
        this.actions = actionNames.reduce((prev, key) => {
          const x = currentInstance[key];

          return {
            ...prev,
            [key]: (...args) => {
              if (x.executer) {
                return x.executer;
              }

              x.executer = dispatch(x.func.apply(this, args)).then(x => {
                x.executer = null;
                return x;
              });

              return x.executer;
            }
          };
        }, {});
      }

      render() {
        return <Component {...this.props} {...this.actions} />;
      }
    }
  );
};

export default sharedDispatch;
