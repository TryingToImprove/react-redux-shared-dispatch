"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var instances = {};

var sharedDispatch = function sharedDispatch() {
  var dispatchActions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var instanceKey = Component.displayName;

    instances[instanceKey] = Object.keys(dispatchActions).reduce(function (prev, cur) {
      return _extends({}, prev, _defineProperty({}, cur, {
        key: cur,
        func: dispatchActions[cur],
        executer: null
      }));
    }, {});

    return (0, _reactRedux.connect)()(function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        var dispatch = props.dispatch;


        var currentInstance = instances[instanceKey];
        var actionNames = Object.keys(currentInstance);
        _this.actions = actionNames.reduce(function (prev, key) {
          var x = currentInstance[key];

          return _extends({}, prev, _defineProperty({}, key, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            if (x.executer) {
              return x.executer;
            }

            x.executer = dispatch(x.func.apply(_this, args)).then(function (x) {
              x.executer = null;
              return x;
            });

            return x.executer;
          }));
        }, {});
        return _this;
      }

      _createClass(_class, [{
        key: "render",
        value: function render() {
          return _react2.default.createElement(Component, _extends({}, this.props, this.actions));
        }
      }]);

      return _class;
    }(_react2.default.Component));
  };
};

exports.default = sharedDispatch;