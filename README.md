Small library which allow you to dispatch multiple redux actions and only perform it once, to prevent multiple components firing multiple AJAX calls.


```js
import sharedDispatch from "react-redux-shared-components";

class MyComponent extends React.Component {
  componentDidMount() {
    this.props.onRequestData();
  }
  
  render() { return <div/>}
}

const mapDispatchToProps = {
  onRequestData: () => async (dispatch) => {
    // Excute AJAX calls
  }
};

export default sharedDispatch(mapDispatchToProps)(MyComponent);
``` 