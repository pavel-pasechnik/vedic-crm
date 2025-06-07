webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactOnRails = __webpack_require__(1);

	var _reactOnRails2 = _interopRequireDefault(_reactOnRails);

	var _groupPerformanceAppClient = __webpack_require__(339);

	var _groupPerformanceAppClient2 = _interopRequireDefault(_groupPerformanceAppClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactOnRails2.default.register({ GroupPerformanceApp: _groupPerformanceAppClient2.default });

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IconButton = function IconButton(_ref) {
	  var color = _ref.color,
	      icon = _ref.icon,
	      onClick = _ref.onClick,
	      size = _ref.size,
	      tooltip = _ref.tooltip;
	  return _react2.default.createElement(
	    "button",
	    {
	      className: "btn btn-" + size + " btn-" + color,
	      "data-toggle": "tooltip",
	      onClick: onClick,
	      title: tooltip
	    },
	    _react2.default.createElement("span", { className: "glyphicon glyphicon-" + icon, "aria-hidden": "true" })
	  );
	};

	IconButton.defaultProps = {
	  color: 'default',
	  size: ''
	};

	IconButton.propTypes = {
	  color: _react.PropTypes.string.isRequired,
	  icon: _react.PropTypes.string.isRequired,
	  onClick: _react.PropTypes.func.isRequired,
	  size: _react.PropTypes.string.isRequired,
	  tooltip: _react.PropTypes.string
	};

	exports.default = IconButton;

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Loader = function Loader(_ref) {
	  var visible = _ref.visible;

	  if (!visible) return _react2.default.createElement("div", null);

	  return _react2.default.createElement(
	    "div",
	    { className: "loading-wrapper" },
	    _react2.default.createElement("i", { className: "fa fa-refresh fa-spin fa-3x fa-fw" }),
	    _react2.default.createElement(
	      "span",
	      { className: "sr-only" },
	      "Loading..."
	    )
	  );
	};

	Loader.propTypes = {
	  visible: _react.PropTypes.bool.isRequired
	};

	exports.default = Loader;

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(261);

	var _groupPerformanceStore = __webpack_require__(340);

	var _groupPerformanceStore2 = _interopRequireDefault(_groupPerformanceStore);

	var _groupPerformance = __webpack_require__(344);

	var _groupPerformance2 = _interopRequireDefault(_groupPerformance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
	  var store = (0, _groupPerformanceStore2.default)(props);

	  var reactComponent = _react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_groupPerformance2.default, null)
	  );

	  return reactComponent;
	};

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(273);

	var _reduxThunk = __webpack_require__(293);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(341);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function examinationResultsObj(people, examinations, examinationResults) {
	  var result = {};

	  examinationResults.forEach(function (examinationResult) {
	    var examId = examinationResult.examinationId;
	    var studentProfileId = examinationResult.studentProfileId;

	    if (!result[examId]) result[examId] = {};

	    result[examId][studentProfileId] = examinationResult;
	  });

	  examinations.forEach(function (examination) {
	    if (!result[examination.id]) result[examination.id] = {};

	    people.forEach(function (person) {
	      if (!result[examination.id][person.studentProfileId]) result[examination.id][person.studentProfileId] = {};
	    });
	  });

	  return result;
	}

	exports.default = function (props) {
	  var people = props.people,
	      canManage = props.canManage,
	      examinations = props.examinations,
	      localization = props.localization,
	      examinationResults = props.examinationResults;
	  var groupPerformanceState = _rootReducer.initialStates.groupPerformanceState;


	  var initialState = {
	    groupPerformanceStore: _extends({}, groupPerformanceState, {
	      people: people,
	      canManage: canManage,
	      examinations: examinations,
	      localization: localization,
	      examinationResults: examinationResultsObj(people, examinations, examinationResults)
	    })
	  };

	  var composedStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (fn) {
	    return fn;
	  });

	  var storeCreator = composedStore(_redux.createStore);
	  var store = storeCreator(_rootReducer2.default, initialState);

	  return store;
	};

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialStates = undefined;

	var _groupPerformanceReducer = __webpack_require__(342);

	var _groupPerformanceReducer2 = _interopRequireDefault(_groupPerformanceReducer);

	var _redux = __webpack_require__(273);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialStates = exports.initialStates = {
	  groupPerformanceState: _groupPerformanceReducer.initialState
	}; // A real world app will likely have many reducers and it helps to organize them in one file.


	var reducer = (0, _redux.combineReducers)({
	  groupPerformanceStore: _groupPerformanceReducer2.default
	});

	exports.default = reducer;

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialState = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = groupPerformanceReducer;

	var _groupPerformanceConstants = __webpack_require__(343);

	var _groupPerformanceConstants2 = _interopRequireDefault(_groupPerformanceConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = exports.initialState = {
	  loading: false,
	  editExaminationId: 0,
	  editRowExaminationId: 0,
	  editStudentProfileId: 0
	};

	function groupPerformanceReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _groupPerformanceConstants2.default.SHOW_LOADER:
	      return _extends({}, state, {
	        loading: true
	      });

	    case _groupPerformanceConstants2.default.HIDE_LOADER:
	      return _extends({}, state, {
	        loading: false
	      });

	    case _groupPerformanceConstants2.default.RESULT_SAVED:
	      return _extends({}, state, {

	        examinationResults: _extends({}, state.examinationResults, _defineProperty({}, action.examinationResult.examinationId, _extends({}, state.examinationResults[action.examinationResult.examinationId], _defineProperty({}, action.examinationResult.studentProfileId, action.examinationResult))))
	      });

	    case _groupPerformanceConstants2.default.RESULT_DELETED:
	      return _extends({}, state, {

	        examinationResults: _extends({}, state.examinationResults, _defineProperty({}, action.examinationId, _extends({}, state.examinationResults[action.examinationId], _defineProperty({}, action.studentProfileId, {}))))
	      });

	    case _groupPerformanceConstants2.default.OPEN_EXAMINATION_RESULT_EDITOR:
	      return _extends({}, state, {
	        editExaminationId: action.examinationId,
	        editStudentProfileId: action.personId
	      });

	    case _groupPerformanceConstants2.default.TOGGLE_EDIT_ROW:
	      return _extends({}, state, {
	        editRowExaminationId: state.editRowExaminationId === action.examinationId ? 0 : action.examinationId
	      });

	    default:
	      return state;
	  }
	}

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mirrorCreator = __webpack_require__(297);

	var _mirrorCreator2 = _interopRequireDefault(_mirrorCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var actionTypes = (0, _mirrorCreator2.default)(['SHOW_LOADER', 'HIDE_LOADER', 'RESULT_SAVED', 'RESULT_DELETED', 'TOGGLE_EDIT_ROW', 'OPEN_EXAMINATION_RESULT_EDITOR']);

	exports.default = actionTypes;

/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reactRedux = __webpack_require__(261);

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _performanceEditor = __webpack_require__(345);

	var _performanceEditor2 = _interopRequireDefault(_performanceEditor);

	var _groupPerformanceWidget = __webpack_require__(351);

	var _groupPerformanceWidget2 = _interopRequireDefault(_groupPerformanceWidget);

	var _redux = __webpack_require__(273);

	var _groupPerformanceActionCreators = __webpack_require__(354);

	var groupPerformanceActionCreators = _interopRequireWildcard(_groupPerformanceActionCreators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function select(state) {
	  return { groupPerformanceStore: state.groupPerformanceStore };
	}

	var GroupPerformance = function (_React$Component) {
	  _inherits(GroupPerformance, _React$Component);

	  function GroupPerformance() {
	    _classCallCheck(this, GroupPerformance);

	    return _possibleConstructorReturn(this, (GroupPerformance.__proto__ || Object.getPrototypeOf(GroupPerformance)).apply(this, arguments));
	  }

	  _createClass(GroupPerformance, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          dispatch = _props.dispatch,
	          groupPerformanceStore = _props.groupPerformanceStore;

	      var actions = (0, _redux.bindActionCreators)(groupPerformanceActionCreators, dispatch);
	      var people = groupPerformanceStore.people,
	          loading = groupPerformanceStore.loading,
	          canManage = groupPerformanceStore.canManage,
	          examinations = groupPerformanceStore.examinations,
	          localization = groupPerformanceStore.localization,
	          editExaminationId = groupPerformanceStore.editExaminationId,
	          examinationResults = groupPerformanceStore.examinationResults,
	          editStudentProfileId = groupPerformanceStore.editStudentProfileId,
	          editRowExaminationId = groupPerformanceStore.editRowExaminationId;
	      var toggleEditRow = actions.toggleEditRow,
	          asyncSaveResult = actions.asyncSaveResult,
	          asyncDeleteResult = actions.asyncDeleteResult,
	          openExaminationResultEditor = actions.openExaminationResultEditor;


	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(_groupPerformanceWidget2.default, {
	          people: people,
	          loading: loading,
	          canManage: canManage,
	          examinations: examinations,
	          toggleEditRow: toggleEditRow,
	          examinationResults: examinationResults,
	          editRowExaminationId: editRowExaminationId,
	          openExaminationResultEditor: openExaminationResultEditor
	        }),
	        _react2.default.createElement(_performanceEditor2.default, {
	          data: {
	            people: people,
	            loading: loading,
	            examinations: examinations,
	            localization: localization,
	            editExaminationId: editExaminationId,
	            examinationResults: examinationResults,
	            editStudentProfileId: editStudentProfileId
	          },
	          actions: {
	            asyncSaveResult: asyncSaveResult,
	            asyncDeleteResult: asyncDeleteResult
	          }
	        })
	      );
	    }
	  }]);

	  return GroupPerformance;
	}(_react2.default.Component);

	GroupPerformance.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  groupPerformanceStore: _react.PropTypes.object.isRequired
	};
	exports.default = (0, _reactRedux.connect)(select)(GroupPerformance);

/***/ },

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _reactRangeslider = __webpack_require__(346);

	var _reactRangeslider2 = _interopRequireDefault(_reactRangeslider);

	var _loader = __webpack_require__(327);

	var _loader2 = _interopRequireDefault(_loader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PerformanceEditor = function (_React$Component) {
	  _inherits(PerformanceEditor, _React$Component);

	  function PerformanceEditor(props, context) {
	    _classCallCheck(this, PerformanceEditor);

	    var _this = _possibleConstructorReturn(this, (PerformanceEditor.__proto__ || Object.getPrototypeOf(PerformanceEditor)).call(this, props, context));

	    _this.componentWillReceiveProps = function (nextProps) {
	      _this.setState(_this.initialState(nextProps.data));
	    };

	    _this.handleChange = function (value) {
	      _this.setState({
	        value: value
	      });
	    };

	    _this.initialState = function (_ref) {
	      var editStudentProfileId = _ref.editStudentProfileId,
	          editExaminationId = _ref.editExaminationId,
	          examinationResults = _ref.examinationResults;

	      var examinationResult = (examinationResults[editExaminationId] || {})[editStudentProfileId] || {};

	      return {
	        value: examinationResult.score || 0,
	        examinationResultId: examinationResult.id
	      };
	    };

	    _this.deleteResult = function () {
	      var _this$props = _this.props,
	          _this$props$data = _this$props.data,
	          editStudentProfileId = _this$props$data.editStudentProfileId,
	          editExaminationId = _this$props$data.editExaminationId,
	          asyncDeleteResult = _this$props.actions.asyncDeleteResult;


	      asyncDeleteResult(_this.state.examinationResultId, editExaminationId, editStudentProfileId);
	    };

	    _this.saveResult = function () {
	      var _this$props2 = _this.props,
	          _this$props2$data = _this$props2.data,
	          editStudentProfileId = _this$props2$data.editStudentProfileId,
	          editExaminationId = _this$props2$data.editExaminationId,
	          asyncSaveResult = _this$props2.actions.asyncSaveResult;
	      var _this$state = _this.state,
	          value = _this$state.value,
	          examinationResultId = _this$state.examinationResultId;


	      asyncSaveResult(examinationResultId, value, editExaminationId, editStudentProfileId);
	    };

	    _this.state = _this.initialState(props.data);
	    return _this;
	  }

	  _createClass(PerformanceEditor, [{
	    key: 'render',
	    value: function render() {
	      var _labels;

	      var _props$data = this.props.data,
	          people = _props$data.people,
	          loading = _props$data.loading,
	          editStudentProfileId = _props$data.editStudentProfileId,
	          examinations = _props$data.examinations,
	          localization = _props$data.localization,
	          editExaminationId = _props$data.editExaminationId;


	      var person = people.find(function (psn) {
	        return psn.studentProfileId === editStudentProfileId;
	      }) || {};
	      var examination = examinations.find(function (ex) {
	        return ex.id === editExaminationId;
	      }) || {};

	      var value = this.state.value;


	      var labels = (_labels = {}, _defineProperty(_labels, examination.minResult, localization.min), _defineProperty(_labels, examination.passingScore, localization.passing), _defineProperty(_labels, examination.maxResult, localization.max), _labels);

	      return _react2.default.createElement(
	        'div',
	        {
	          id: 'examinationResultEditorModal',
	          role: 'dialog',
	          tabIndex: '-1',
	          className: 'modal fade',
	          'aria-labelledby': 'gridSystemModalLabel'
	        },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog modal-sm', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
	            _react2.default.createElement(_loader2.default, { visible: loading }),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-header' },
	              _react2.default.createElement(
	                'button',
	                {
	                  type: 'button',
	                  className: 'close',
	                  'data-dismiss': 'modal',
	                  'aria-label': 'Close'
	                },
	                _react2.default.createElement(
	                  'span',
	                  { 'aria-hidden': 'true' },
	                  '\xD7'
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { className: 'modal-title text-center' },
	                _react2.default.createElement(
	                  'b',
	                  null,
	                  person.name
	                ),
	                _react2.default.createElement('br', null),
	                _react2.default.createElement(
	                  'b',
	                  null,
	                  examination.title
	                ),
	                _react2.default.createElement('br', null),
	                examination.courseTitle
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-body' },
	              _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-12' },
	                  _react2.default.createElement(
	                    'h4',
	                    { className: 'text-center' },
	                    _react2.default.createElement(
	                      'p',
	                      null,
	                      examination.description
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'slider custom-labels' },
	                      _react2.default.createElement(_reactRangeslider2.default, {
	                        min: examination.minResult || 0,
	                        max: examination.maxResult || 1,
	                        value: value,
	                        labels: labels,
	                        onChange: this.handleChange,
	                        handleLabel: '' + value
	                      })
	                    )
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'modal-footer text-center' },
	              _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-12 text-center' },
	                  _react2.default.createElement(
	                    'button',
	                    {
	                      type: 'button',
	                      onClick: this.saveResult,
	                      className: 'btn btn-primary'
	                    },
	                    localization.save
	                  ),
	                  _react2.default.createElement(
	                    'button',
	                    {
	                      type: 'button',
	                      onClick: this.deleteResult,
	                      className: 'btn btn-danger'
	                    },
	                    localization.delete
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return PerformanceEditor;
	}(_react2.default.Component);

	PerformanceEditor.propTypes = {
	  data: _react.PropTypes.shape({
	    people: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      name: _react.PropTypes.string.isRequired,
	      studentProfileId: _react.PropTypes.number.isRequired
	    })).isRequired,
	    loading: _react.PropTypes.bool.isRequired,
	    examinations: _react.PropTypes.array.isRequired,
	    localization: _react.PropTypes.shape({
	      min: _react.PropTypes.string.isRequired,
	      max: _react.PropTypes.string.isRequired,
	      save: _react.PropTypes.string.isRequired,
	      delete: _react.PropTypes.string.isRequired,
	      passing: _react.PropTypes.string.isRequired
	    }).isRequired,
	    editExaminationId: _react.PropTypes.number.isRequired,
	    examinationResults: _react.PropTypes.object.isRequired,
	    editStudentProfileId: _react.PropTypes.number.isRequired
	  }).isRequired,
	  actions: _react.PropTypes.shape({
	    asyncSaveResult: _react.PropTypes.func.isRequired,
	    asyncDeleteResult: _react.PropTypes.func.isRequired
	  }).isRequired
	};
	exports.default = PerformanceEditor;

/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Rangeslider = __webpack_require__(347);

	var _Rangeslider2 = _interopRequireDefault(_Rangeslider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Rangeslider2.default;

/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(348);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(263);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _resizeObserverPolyfill = __webpack_require__(349);

	var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

	var _utils = __webpack_require__(350);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-debugger: "warn" */


	/**
	 * Predefined constants
	 * @type {Object}
	 */
	var constants = {
	  orientation: {
	    horizontal: {
	      dimension: 'width',
	      direction: 'left',
	      reverseDirection: 'right',
	      coordinate: 'x'
	    },
	    vertical: {
	      dimension: 'height',
	      direction: 'top',
	      reverseDirection: 'bottom',
	      coordinate: 'y'
	    }
	  }
	};

	var Slider = function (_Component) {
	  _inherits(Slider, _Component);

	  function Slider(props, context) {
	    _classCallCheck(this, Slider);

	    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props, context));

	    _this.handleFormat = function (value) {
	      var format = _this.props.format;

	      return format ? format(value) : value;
	    };

	    _this.handleUpdate = function () {
	      if (!_this.slider) {
	        // for shallow rendering
	        return;
	      }
	      var orientation = _this.props.orientation;

	      var dimension = (0, _utils.capitalize)(constants.orientation[orientation].dimension);
	      var sliderPos = _this.slider['offset' + dimension];
	      var handlePos = _this.handle['offset' + dimension];

	      _this.setState({
	        limit: sliderPos - handlePos,
	        grab: handlePos / 2
	      });
	    };

	    _this.handleStart = function (e) {
	      var onChangeStart = _this.props.onChangeStart;

	      document.addEventListener('mousemove', _this.handleDrag);
	      document.addEventListener('mouseup', _this.handleEnd);
	      _this.setState({
	        active: true
	      }, function () {
	        onChangeStart && onChangeStart(e);
	      });
	    };

	    _this.handleDrag = function (e) {
	      e.stopPropagation();
	      var onChange = _this.props.onChange;
	      var _e$target = e.target,
	          className = _e$target.className,
	          classList = _e$target.classList,
	          dataset = _e$target.dataset;

	      if (!onChange || className === 'rangeslider__labels') return;

	      var value = _this.position(e);

	      if (classList && classList.contains('rangeslider__label-item') && dataset.value) {
	        value = parseFloat(dataset.value);
	      }

	      onChange && onChange(value, e);
	    };

	    _this.handleEnd = function (e) {
	      var onChangeComplete = _this.props.onChangeComplete;

	      _this.setState({
	        active: false
	      }, function () {
	        onChangeComplete && onChangeComplete(e);
	      });
	      document.removeEventListener('mousemove', _this.handleDrag);
	      document.removeEventListener('mouseup', _this.handleEnd);
	    };

	    _this.handleKeyDown = function (e) {
	      e.preventDefault();
	      var keyCode = e.keyCode;
	      var _this$props = _this.props,
	          value = _this$props.value,
	          min = _this$props.min,
	          max = _this$props.max,
	          step = _this$props.step,
	          onChange = _this$props.onChange;

	      var sliderValue = void 0;

	      switch (keyCode) {
	        case 38:
	        case 39:
	          sliderValue = value + step > max ? max : value + step;
	          onChange && onChange(sliderValue, e);
	          break;
	        case 37:
	        case 40:
	          sliderValue = value - step < min ? min : value - step;
	          onChange && onChange(sliderValue, e);
	          break;
	      }
	    };

	    _this.getPositionFromValue = function (value) {
	      var limit = _this.state.limit;
	      var _this$props2 = _this.props,
	          min = _this$props2.min,
	          max = _this$props2.max;

	      var diffMaxMin = max - min;
	      var diffValMin = value - min;
	      var percentage = diffValMin / diffMaxMin;
	      var pos = Math.round(percentage * limit);

	      return pos;
	    };

	    _this.getValueFromPosition = function (pos) {
	      var limit = _this.state.limit;
	      var _this$props3 = _this.props,
	          orientation = _this$props3.orientation,
	          min = _this$props3.min,
	          max = _this$props3.max,
	          step = _this$props3.step;

	      var percentage = (0, _utils.clamp)(pos, 0, limit) / (limit || 1);
	      var baseVal = step * Math.round(percentage * (max - min) / step);
	      var value = orientation === 'horizontal' ? baseVal + min : max - baseVal;

	      return (0, _utils.clamp)(value, min, max);
	    };

	    _this.position = function (e) {
	      var grab = _this.state.grab;
	      var _this$props4 = _this.props,
	          orientation = _this$props4.orientation,
	          reverse = _this$props4.reverse;


	      var node = _this.slider;
	      var coordinateStyle = constants.orientation[orientation].coordinate;
	      var directionStyle = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
	      var clientCoordinateStyle = 'client' + (0, _utils.capitalize)(coordinateStyle);
	      var coordinate = !e.touches ? e[clientCoordinateStyle] : e.touches[0][clientCoordinateStyle];
	      var direction = node.getBoundingClientRect()[directionStyle];
	      var pos = reverse ? direction - coordinate - grab : coordinate - direction - grab;
	      var value = _this.getValueFromPosition(pos);

	      return value;
	    };

	    _this.coordinates = function (pos) {
	      var _this$state = _this.state,
	          limit = _this$state.limit,
	          grab = _this$state.grab;
	      var orientation = _this.props.orientation;

	      var value = _this.getValueFromPosition(pos);
	      var position = _this.getPositionFromValue(value);
	      var handlePos = orientation === 'horizontal' ? position + grab : position;
	      var fillPos = orientation === 'horizontal' ? handlePos : limit - handlePos;

	      return {
	        fill: fillPos,
	        handle: handlePos,
	        label: handlePos
	      };
	    };

	    _this.renderLabels = function (labels) {
	      return _react2.default.createElement(
	        'ul',
	        {
	          ref: function ref(sl) {
	            _this.labels = sl;
	          },
	          className: (0, _classnames2.default)('rangeslider__labels')
	        },
	        labels
	      );
	    };

	    _this.state = {
	      active: false,
	      limit: 0,
	      grab: 0
	    };
	    return _this;
	  }

	  _createClass(Slider, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.handleUpdate();
	      var resizeObserver = new _resizeObserverPolyfill2.default(this.handleUpdate);
	      resizeObserver.observe(this.slider);
	    }

	    /**
	     * Format label/tooltip value
	     * @param  {Number} - value
	     * @return {Formatted Number}
	     */


	    /**
	     * Update slider state on change
	     * @return {void}
	     */


	    /**
	     * Attach event listeners to mousemove/mouseup events
	     * @return {void}
	     */


	    /**
	     * Handle drag/mousemove event
	     * @param  {Object} e - Event object
	     * @return {void}
	     */


	    /**
	     * Detach event listeners to mousemove/mouseup events
	     * @return {void}
	     */


	    /**
	     * Support for key events on the slider handle
	     * @param  {Object} e - Event object
	     * @return {void}
	     */


	    /**
	     * Calculate position of slider based on its value
	     * @param  {number} value - Current value of slider
	     * @return {position} pos - Calculated position of slider based on value
	     */


	    /**
	     * Translate position of slider to slider value
	     * @param  {number} pos - Current position/coordinates of slider
	     * @return {number} value - Slider value
	     */


	    /**
	     * Calculate position of slider based on value
	     * @param  {Object} e - Event object
	     * @return {number} value - Slider value
	     */


	    /**
	     * Grab coordinates of slider
	     * @param  {Object} pos - Position object
	     * @return {Object} - Slider fill/handle coordinates
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          value = _props.value,
	          orientation = _props.orientation,
	          className = _props.className,
	          tooltip = _props.tooltip,
	          reverse = _props.reverse,
	          labels = _props.labels,
	          min = _props.min,
	          max = _props.max,
	          handleLabel = _props.handleLabel;
	      var active = this.state.active;

	      var dimension = constants.orientation[orientation].dimension;
	      var direction = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
	      var position = this.getPositionFromValue(value);
	      var coords = this.coordinates(position);
	      var fillStyle = _defineProperty({}, dimension, coords.fill + 'px');
	      var handleStyle = _defineProperty({}, direction, coords.handle + 'px');
	      var showTooltip = tooltip && active;

	      var labelItems = [];
	      var labelKeys = Object.keys(labels);

	      if (labelKeys.length > 0) {
	        labelKeys = labelKeys.sort(function (a, b) {
	          return reverse ? a - b : b - a;
	        });

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = labelKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            var labelPosition = this.getPositionFromValue(key);
	            var labelCoords = this.coordinates(labelPosition);
	            var labelStyle = _defineProperty({}, direction, labelCoords.label + 'px');

	            labelItems.push(_react2.default.createElement(
	              'li',
	              {
	                key: key,
	                className: (0, _classnames2.default)('rangeslider__label-item'),
	                'data-value': key,
	                onMouseDown: this.handleDrag,
	                onTouchStart: this.handleStart,
	                onTouchEnd: this.handleEnd,
	                style: labelStyle
	              },
	              this.props.labels[key]
	            ));
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          ref: function ref(s) {
	            _this2.slider = s;
	          },
	          className: (0, _classnames2.default)('rangeslider', 'rangeslider-' + orientation, { 'rangeslider-reverse': reverse }, className),
	          onMouseDown: this.handleDrag,
	          onMouseUp: this.handleEnd,
	          onTouchStart: this.handleStart,
	          onTouchEnd: this.handleEnd,
	          'aria-valuemin': min,
	          'aria-valuemax': max,
	          'aria-valuenow': value,
	          'aria-orientation': orientation
	        },
	        _react2.default.createElement('div', { className: 'rangeslider__fill', style: fillStyle }),
	        _react2.default.createElement(
	          'div',
	          {
	            ref: function ref(sh) {
	              _this2.handle = sh;
	            },
	            className: 'rangeslider__handle',
	            onMouseDown: this.handleStart,
	            onTouchMove: this.handleDrag,
	            onTouchEnd: this.handleEnd,
	            onKeyDown: this.handleKeyDown,
	            style: handleStyle,
	            tabIndex: 0
	          },
	          showTooltip ? _react2.default.createElement(
	            'div',
	            {
	              ref: function ref(st) {
	                _this2.tooltip = st;
	              },
	              className: 'rangeslider__handle-tooltip'
	            },
	            _react2.default.createElement(
	              'span',
	              null,
	              this.handleFormat(value)
	            )
	          ) : null,
	          _react2.default.createElement(
	            'div',
	            { className: 'rangeslider__handle-label' },
	            handleLabel
	          )
	        ),
	        labels ? this.renderLabels(labelItems) : null
	      );
	    }
	  }]);

	  return Slider;
	}(_react.Component);

	Slider.propTypes = {
	  min: _propTypes2.default.number,
	  max: _propTypes2.default.number,
	  step: _propTypes2.default.number,
	  value: _propTypes2.default.number,
	  orientation: _propTypes2.default.string,
	  tooltip: _propTypes2.default.bool,
	  reverse: _propTypes2.default.bool,
	  labels: _propTypes2.default.object,
	  handleLabel: _propTypes2.default.string,
	  format: _propTypes2.default.func,
	  onChangeStart: _propTypes2.default.func,
	  onChange: _propTypes2.default.func,
	  onChangeComplete: _propTypes2.default.func
	};
	Slider.defaultProps = {
	  min: 0,
	  max: 100,
	  step: 1,
	  value: 0,
	  orientation: 'horizontal',
	  tooltip: true,
	  reverse: false,
	  labels: {},
	  handleLabel: ''
	};
	exports.default = Slider;

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ResizeObserver = factory());
	}(this, (function () {
	'use strict';

	/**
	 * A collection of shims that provide minimal functionality of the ES6 collections.
	 *
	 * These implementations are not meant to be used outside of the ResizeObserver
	 * modules as they cover only a limited range of use cases.
	 */
	/* eslint-disable require-jsdoc, valid-jsdoc */
	var MapShim = (function () {
	    if (typeof Map != 'undefined') {
	        return Map;
	    }

	    /**
	     * Returns index in provided array that matches the specified key.
	     *
	     * @param {Array<Array>} arr
	     * @param {*} key
	     * @returns {number}
	     */
	    function getIndex(arr, key) {
	        var result = -1;

	        arr.some(function (entry, index) {
	            if (entry[0] === key) {
	                result = index;

	                return true;
	            }

	            return false;
	        });

	        return result;
	    }

	    return (function () {
	        function anonymous() {
	            this.__entries__ = [];
	        }

	        var prototypeAccessors = { size: {} };

	        /**
	         * @returns {boolean}
	         */
	        prototypeAccessors.size.get = function () {
	            return this.__entries__.length;
	        };

	        /**
	         * @param {*} key
	         * @returns {*}
	         */
	        anonymous.prototype.get = function (key) {
	            var index = getIndex(this.__entries__, key);
	            var entry = this.__entries__[index];

	            return entry && entry[1];
	        };

	        /**
	         * @param {*} key
	         * @param {*} value
	         * @returns {void}
	         */
	        anonymous.prototype.set = function (key, value) {
	            var index = getIndex(this.__entries__, key);

	            if (~index) {
	                this.__entries__[index][1] = value;
	            } else {
	                this.__entries__.push([key, value]);
	            }
	        };

	        /**
	         * @param {*} key
	         * @returns {void}
	         */
	        anonymous.prototype.delete = function (key) {
	            var entries = this.__entries__;
	            var index = getIndex(entries, key);

	            if (~index) {
	                entries.splice(index, 1);
	            }
	        };

	        /**
	         * @param {*} key
	         * @returns {void}
	         */
	        anonymous.prototype.has = function (key) {
	            return !!~getIndex(this.__entries__, key);
	        };

	        /**
	         * @returns {void}
	         */
	        anonymous.prototype.clear = function () {
	            this.__entries__.splice(0);
	        };

	        /**
	         * @param {Function} callback
	         * @param {*} [ctx=null]
	         * @returns {void}
	         */
	        anonymous.prototype.forEach = function (callback, ctx) {
	            if ( ctx === void 0 ) ctx = null;

	            for (var i = 0, list = this.__entries__; i < list.length; i += 1) {
	                var entry = list[i];

	                callback.call(ctx, entry[1], entry[0]);
	            }
	        };

	        Object.defineProperties( anonymous.prototype, prototypeAccessors );

	        return anonymous;
	    }());
	})();

	/**
	 * Detects whether window and document objects are available in current environment.
	 */
	var isBrowser = typeof window != 'undefined' && typeof document != 'undefined' && window.document === document;

	/**
	 * A shim for the requestAnimationFrame which falls back to the setTimeout if
	 * first one is not supported.
	 *
	 * @returns {number} Requests' identifier.
	 */
	var requestAnimationFrame$1 = (function () {
	    if (typeof requestAnimationFrame === 'function') {
	        return requestAnimationFrame;
	    }

	    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
	})();

	// Defines minimum timeout before adding a trailing call.
	var trailingTimeout = 2;

	/**
	 * Creates a wrapper function which ensures that provided callback will be
	 * invoked only once during the specified delay period.
	 *
	 * @param {Function} callback - Function to be invoked after the delay period.
	 * @param {number} delay - Delay after which to invoke callback.
	 * @returns {Function}
	 */
	var throttle = function (callback, delay) {
	    var leadingCall = false,
	        trailingCall = false,
	        lastCallTime = 0;

	    /**
	     * Invokes the original callback function and schedules new invocation if
	     * the "proxy" was called during current request.
	     *
	     * @returns {void}
	     */
	    function resolvePending() {
	        if (leadingCall) {
	            leadingCall = false;

	            callback();
	        }

	        if (trailingCall) {
	            proxy();
	        }
	    }

	    /**
	     * Callback invoked after the specified delay. It will further postpone
	     * invocation of the original function delegating it to the
	     * requestAnimationFrame.
	     *
	     * @returns {void}
	     */
	    function timeoutCallback() {
	        requestAnimationFrame$1(resolvePending);
	    }

	    /**
	     * Schedules invocation of the original function.
	     *
	     * @returns {void}
	     */
	    function proxy() {
	        var timeStamp = Date.now();

	        if (leadingCall) {
	            // Reject immediately following calls.
	            if (timeStamp - lastCallTime < trailingTimeout) {
	                return;
	            }

	            // Schedule new call to be in invoked when the pending one is resolved.
	            // This is important for "transitions" which never actually start
	            // immediately so there is a chance that we might miss one if change
	            // happens amids the pending invocation.
	            trailingCall = true;
	        } else {
	            leadingCall = true;
	            trailingCall = false;

	            setTimeout(timeoutCallback, delay);
	        }

	        lastCallTime = timeStamp;
	    }

	    return proxy;
	};

	// Minimum delay before invoking the update of observers.
	var REFRESH_DELAY = 20;

	// A list of substrings of CSS properties used to find transition events that
	// might affect dimensions of observed elements.
	var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

	// Detect whether running in IE 11 (facepalm).
	var isIE11 = typeof navigator != 'undefined' && /Trident\/.*rv:11/.test(navigator.userAgent);

	// MutationObserver should not be used if running in Internet Explorer 11 as it's
	// implementation is unreliable. Example: https://jsfiddle.net/x2r3jpuz/2/
	//
	// It's a real bummer that there is no other way to check for this issue but to
	// use the UA information.
	var mutationObserverSupported = typeof MutationObserver != 'undefined' && !isIE11;

	/**
	 * Singleton controller class which handles updates of ResizeObserver instances.
	 */
	var ResizeObserverController = function() {
	    /**
	     * Indicates whether DOM listeners have been added.
	     *
	     * @private {boolean}
	     */
	    this.connected_ = false;

	    /**
	     * Tells that controller has subscribed for Mutation Events.
	     *
	     * @private {boolean}
	     */
	    this.mutationEventsAdded_ = false;

	    /**
	     * Keeps reference to the instance of MutationObserver.
	     *
	     * @private {MutationObserver}
	     */
	    this.mutationsObserver_ = null;

	    /**
	     * A list of connected observers.
	     *
	     * @private {Array<ResizeObserverSPI>}
	     */
	    this.observers_ = [];

	    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
	    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
	};

	/**
	 * Adds observer to observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be added.
	 * @returns {void}
	 */
	ResizeObserverController.prototype.addObserver = function (observer) {
	    if (!~this.observers_.indexOf(observer)) {
	        this.observers_.push(observer);
	    }

	    // Add listeners if they haven't been added yet.
	    if (!this.connected_) {
	        this.connect_();
	    }
	};

	/**
	 * Removes observer from observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be removed.
	 * @returns {void}
	 */
	ResizeObserverController.prototype.removeObserver = function (observer) {
	    var observers = this.observers_;
	    var index = observers.indexOf(observer);

	    // Remove observer if it's present in registry.
	    if (~index) {
	        observers.splice(index, 1);
	    }

	    // Remove listeners if controller has no connected observers.
	    if (!observers.length && this.connected_) {
	        this.disconnect_();
	    }
	};

	/**
	 * Invokes the update of observers. It will continue running updates insofar
	 * it detects changes.
	 *
	 * @returns {void}
	 */
	ResizeObserverController.prototype.refresh = function () {
	    var changesDetected = this.updateObservers_();

	    // Continue running updates if changes have been detected as there might
	    // be future ones caused by CSS transitions.
	    if (changesDetected) {
	        this.refresh();
	    }
	};

	/**
	 * Updates every observer from observers list and notifies them of queued
	 * entries.
	 *
	 * @private
	 * @returns {boolean} Returns "true" if any observer has detected changes in
	 *  dimensions of it's elements.
	 */
	ResizeObserverController.prototype.updateObservers_ = function () {
	    // Collect observers that have active observations.
	    var activeObservers = this.observers_.filter(function (observer) {
	        return observer.gatherActive(), observer.hasActive();
	    });

	    // Deliver notifications in a separate cycle in order to avoid any
	    // collisions between observers, e.g. when multiple instances of
	    // ResizeObserver are tracking the same element and the callback of one
	    // of them changes content dimensions of the observed target. Sometimes
	    // this may result in notifications being blocked for the rest of observers.
	    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

	    return activeObservers.length > 0;
	};

	/**
	 * Initializes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.connect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already added.
	    if (!isBrowser || this.connected_) {
	        return;
	    }

	    // Subscription to the "Transitionend" event is used as a workaround for
	    // delayed transitions. This way it's possible to capture at least the
	    // final state of an element.
	    document.addEventListener('transitionend', this.onTransitionEnd_);

	    window.addEventListener('resize', this.refresh);

	    if (mutationObserverSupported) {
	        this.mutationsObserver_ = new MutationObserver(this.refresh);

	        this.mutationsObserver_.observe(document, {
	            attributes: true,
	            childList: true,
	            characterData: true,
	            subtree: true
	        });
	    } else {
	        document.addEventListener('DOMSubtreeModified', this.refresh);

	        this.mutationEventsAdded_ = true;
	    }

	    this.connected_ = true;
	};

	/**
	 * Removes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.disconnect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already removed.
	    if (!isBrowser || !this.connected_) {
	        return;
	    }

	    document.removeEventListener('transitionend', this.onTransitionEnd_);
	    window.removeEventListener('resize', this.refresh);

	    if (this.mutationsObserver_) {
	        this.mutationsObserver_.disconnect();
	    }

	    if (this.mutationEventsAdded_) {
	        document.removeEventListener('DOMSubtreeModified', this.refresh);
	    }

	    this.mutationsObserver_ = null;
	    this.mutationEventsAdded_ = false;
	    this.connected_ = false;
	};

	/**
	 * "Transitionend" event handler.
	 *
	 * @private
	 * @param {TransitionEvent} event
	 * @returns {void}
	 */
	ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
	        var propertyName = ref.propertyName;

	    // Detect whether transition may affect dimensions of an element.
	    var isReflowProperty = transitionKeys.some(function (key) {
	        return !!~propertyName.indexOf(key);
	    });

	    if (isReflowProperty) {
	        this.refresh();
	    }
	};

	/**
	 * Returns instance of the ResizeObserverController.
	 *
	 * @returns {ResizeObserverController}
	 */
	ResizeObserverController.getInstance = function () {
	    if (!this.instance_) {
	        this.instance_ = new ResizeObserverController();
	    }

	    return this.instance_;
	};

	/**
	 * Holds reference to the controller's instance.
	 *
	 * @private {ResizeObserverController}
	 */
	ResizeObserverController.instance_ = null;

	/**
	 * Defines non-writable/enumerable properties of the provided target object.
	 *
	 * @param {Object} target - Object for which to define properties.
	 * @param {Object} props - Properties to be defined.
	 * @returns {Object} Target object.
	 */
	var defineConfigurable = (function (target, props) {
	    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
	        var key = list[i];

	        Object.defineProperty(target, key, {
	            value: props[key],
	            enumerable: false,
	            writable: false,
	            configurable: true
	        });
	    }

	    return target;
	});

	// Placeholder of an empty content rectangle.
	var emptyRect = createRectInit(0, 0, 0, 0);

	/**
	 * Converts provided string to a number.
	 *
	 * @param {number|string} value
	 * @returns {number}
	 */
	function toFloat(value) {
	    return parseFloat(value) || 0;
	}

	/**
	 * Extracts borders size from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @param {...string} positions - Borders positions (top, right, ...)
	 * @returns {number}
	 */
	function getBordersSize(styles) {
	    var positions = Array.prototype.slice.call(arguments, 1);

	    return positions.reduce(function (size, position) {
	        var value = styles['border-' + position + '-width'];

	        return size + toFloat(value);
	    }, 0);
	}

	/**
	 * Extracts paddings sizes from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @returns {Object} Paddings box.
	 */
	function getPaddings(styles) {
	    var positions = ['top', 'right', 'bottom', 'left'];
	    var paddings = {};

	    for (var i = 0, list = positions; i < list.length; i += 1) {
	        var position = list[i];

	        var value = styles['padding-' + position];

	        paddings[position] = toFloat(value);
	    }

	    return paddings;
	}

	/**
	 * Calculates content rectangle of provided SVG element.
	 *
	 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
	 *      to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getSVGContentRect(target) {
	    var bbox = target.getBBox();

	    return createRectInit(0, 0, bbox.width, bbox.height);
	}

	/**
	 * Calculates content rectangle of provided HTMLElement.
	 *
	 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
	 * @returns {DOMRectInit}
	 */
	function getHTMLElementContentRect(target) {
	    // Client width & height properties can't be
	    // used exclusively as they provide rounded values.
	    var clientWidth = target.clientWidth;
	    var clientHeight = target.clientHeight;

	    // By this condition we can catch all non-replaced inline, hidden and
	    // detached elements. Though elements with width & height properties less
	    // than 0.5 will be discarded as well.
	    //
	    // Without it we would need to implement separate methods for each of
	    // those cases and it's not possible to perform a precise and performance
	    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
	    // gives wrong results for elements with width & height less than 0.5.
	    if (!clientWidth && !clientHeight) {
	        return emptyRect;
	    }

	    var styles = getComputedStyle(target);
	    var paddings = getPaddings(styles);
	    var horizPad = paddings.left + paddings.right;
	    var vertPad = paddings.top + paddings.bottom;

	    // Computed styles of width & height are being used because they are the
	    // only dimensions available to JS that contain non-rounded values. It could
	    // be possible to utilize the getBoundingClientRect if only it's data wasn't
	    // affected by CSS transformations let alone paddings, borders and scroll bars.
	    var width = toFloat(styles.width),
	        height = toFloat(styles.height);

	    // Width & height include paddings and borders when the 'border-box' box
	    // model is applied (except for IE).
	    if (styles.boxSizing === 'border-box') {
	        // Following conditions are required to handle Internet Explorer which
	        // doesn't include paddings and borders to computed CSS dimensions.
	        //
	        // We can say that if CSS dimensions + paddings are equal to the "client"
	        // properties then it's either IE, and thus we don't need to subtract
	        // anything, or an element merely doesn't have paddings/borders styles.
	        if (Math.round(width + horizPad) !== clientWidth) {
	            width -= getBordersSize(styles, 'left', 'right') + horizPad;
	        }

	        if (Math.round(height + vertPad) !== clientHeight) {
	            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
	        }
	    }

	    // Following steps can't be applied to the document's root element as its
	    // client[Width/Height] properties represent viewport area of the window.
	    // Besides, it's as well not necessary as the <html> itself neither has
	    // rendered scroll bars nor it can be clipped.
	    if (!isDocumentElement(target)) {
	        // In some browsers (only in Firefox, actually) CSS width & height
	        // include scroll bars size which can be removed at this step as scroll
	        // bars are the only difference between rounded dimensions + paddings
	        // and "client" properties, though that is not always true in Chrome.
	        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
	        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

	        // Chrome has a rather weird rounding of "client" properties.
	        // E.g. for an element with content width of 314.2px it sometimes gives
	        // the client width of 315px and for the width of 314.7px it may give
	        // 314px. And it doesn't happen all the time. So just ignore this delta
	        // as a non-relevant.
	        if (Math.abs(vertScrollbar) !== 1) {
	            width -= vertScrollbar;
	        }

	        if (Math.abs(horizScrollbar) !== 1) {
	            height -= horizScrollbar;
	        }
	    }

	    return createRectInit(paddings.left, paddings.top, width, height);
	}

	/**
	 * Checks whether provided element is an instance of the SVGGraphicsElement.
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	var isSVGGraphicsElement = (function () {
	    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
	    // interface.
	    if (typeof SVGGraphicsElement != 'undefined') {
	        return function (target) { return target instanceof SVGGraphicsElement; };
	    }

	    // If it's so, then check that element is at least an instance of the
	    // SVGElement and that it has the "getBBox" method.
	    // eslint-disable-next-line no-extra-parens
	    return function (target) { return target instanceof SVGElement && typeof target.getBBox === 'function'; };
	})();

	/**
	 * Checks whether provided element is a document element (<html>).
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	function isDocumentElement(target) {
	    return target === document.documentElement;
	}

	/**
	 * Calculates an appropriate content rectangle for provided html or svg element.
	 *
	 * @param {Element} target - Element content rectangle of which needs to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getContentRect(target) {
	    if (!isBrowser) {
	        return emptyRect;
	    }

	    if (isSVGGraphicsElement(target)) {
	        return getSVGContentRect(target);
	    }

	    return getHTMLElementContentRect(target);
	}

	/**
	 * Creates rectangle with an interface of the DOMRectReadOnly.
	 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
	 *
	 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
	 * @returns {DOMRectReadOnly}
	 */
	function createReadOnlyRect(ref) {
	    var x = ref.x;
	    var y = ref.y;
	    var width = ref.width;
	    var height = ref.height;

	    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
	    var Constr = typeof DOMRectReadOnly != 'undefined' ? DOMRectReadOnly : Object;
	    var rect = Object.create(Constr.prototype);

	    // Rectangle's properties are not writable and non-enumerable.
	    defineConfigurable(rect, {
	        x: x, y: y, width: width, height: height,
	        top: y,
	        right: x + width,
	        bottom: height + y,
	        left: x
	    });

	    return rect;
	}

	/**
	 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
	 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 * @param {number} width - Rectangle's width.
	 * @param {number} height - Rectangle's height.
	 * @returns {DOMRectInit}
	 */
	function createRectInit(x, y, width, height) {
	    return { x: x, y: y, width: width, height: height };
	}

	/**
	 * Class that is responsible for computations of the content rectangle of
	 * provided DOM element and for keeping track of it's changes.
	 */
	var ResizeObservation = function(target) {
	    /**
	     * Broadcasted width of content rectangle.
	     *
	     * @type {number}
	     */
	    this.broadcastWidth = 0;

	    /**
	     * Broadcasted height of content rectangle.
	     *
	     * @type {number}
	     */
	    this.broadcastHeight = 0;

	    /**
	     * Reference to the last observed content rectangle.
	     *
	     * @private {DOMRectInit}
	     */
	    this.contentRect_ = createRectInit(0, 0, 0, 0);

	    /**
	     * Reference to the observed element.
	     *
	     * @type {Element}
	     */
	    this.target = target;
	};

	/**
	 * Updates content rectangle and tells whether it's width or height properties
	 * have changed since the last broadcast.
	 *
	 * @returns {boolean}
	 */
	ResizeObservation.prototype.isActive = function () {
	    var rect = getContentRect(this.target);

	    this.contentRect_ = rect;

	    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
	};

	/**
	 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
	 * from the corresponding properties of the last observed content rectangle.
	 *
	 * @returns {DOMRectInit} Last observed content rectangle.
	 */
	ResizeObservation.prototype.broadcastRect = function () {
	    var rect = this.contentRect_;

	    this.broadcastWidth = rect.width;
	    this.broadcastHeight = rect.height;

	    return rect;
	};

	var ResizeObserverEntry = function(target, rectInit) {
	    var contentRect = createReadOnlyRect(rectInit);

	    // According to the specification following properties are not writable
	    // and are also not enumerable in the native implementation.
	    //
	    // Property accessors are not being used as they'd require to define a
	    // private WeakMap storage which may cause memory leaks in browsers that
	    // don't support this type of collections.
	    defineConfigurable(this, { target: target, contentRect: contentRect });
	};

	var ResizeObserverSPI = function(callback, controller, callbackCtx) {
	    if (typeof callback !== 'function') {
	        throw new TypeError('The callback provided as parameter 1 is not a function.');
	    }

	    /**
	     * Collection of resize observations that have detected changes in dimensions
	     * of elements.
	     *
	     * @private {Array<ResizeObservation>}
	     */
	    this.activeObservations_ = [];

	    /**
	     * Registry of the ResizeObservation instances.
	     *
	     * @private {Map<Element, ResizeObservation>}
	     */
	    this.observations_ = new MapShim();

	    /**
	     * Reference to the callback function.
	     *
	     * @private {ResizeObserverCallback}
	     */
	    this.callback_ = callback;

	    /**
	     * Reference to the associated ResizeObserverController.
	     *
	     * @private {ResizeObserverController}
	     */
	    this.controller_ = controller;

	    /**
	     * Public ResizeObserver instance which will be passed to the callback
	     * function and used as a value of it's "this" binding.
	     *
	     * @private {ResizeObserver}
	     */
	    this.callbackCtx_ = callbackCtx;
	};

	/**
	 * Starts observing provided element.
	 *
	 * @param {Element} target - Element to be observed.
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.observe = function (target) {
	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    // Do nothing if current environment doesn't have the Element interface.
	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	        return;
	    }

	    if (!(target instanceof Element)) {
	        throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_;

	    // Do nothing if element is already being observed.
	    if (observations.has(target)) {
	        return;
	    }

	    observations.set(target, new ResizeObservation(target));

	    this.controller_.addObserver(this);

	    // Force the update of observations.
	    this.controller_.refresh();
	};

	/**
	 * Stops observing provided element.
	 *
	 * @param {Element} target - Element to stop observing.
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.unobserve = function (target) {
	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    // Do nothing if current environment doesn't have the Element interface.
	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	        return;
	    }

	    if (!(target instanceof Element)) {
	        throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_;

	    // Do nothing if element is not being observed.
	    if (!observations.has(target)) {
	        return;
	    }

	    observations.delete(target);

	    if (!observations.size) {
	        this.controller_.removeObserver(this);
	    }
	};

	/**
	 * Stops observing all elements.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.disconnect = function () {
	    this.clearActive();
	    this.observations_.clear();
	    this.controller_.removeObserver(this);
	};

	/**
	 * Collects observation instances the associated element of which has changed
	 * it's content rectangle.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.gatherActive = function () {
	        var this$1 = this;

	    this.clearActive();

	    this.observations_.forEach(function (observation) {
	        if (observation.isActive()) {
	            this$1.activeObservations_.push(observation);
	        }
	    });
	};

	/**
	 * Invokes initial callback function with a list of ResizeObserverEntry
	 * instances collected from active resize observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.broadcastActive = function () {
	    // Do nothing if observer doesn't have active observations.
	    if (!this.hasActive()) {
	        return;
	    }

	    var ctx = this.callbackCtx_;

	    // Create ResizeObserverEntry instance for every active observation.
	    var entries = this.activeObservations_.map(function (observation) {
	        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
	    });

	    this.callback_.call(ctx, entries, ctx);
	    this.clearActive();
	};

	/**
	 * Clears the collection of active observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.clearActive = function () {
	    this.activeObservations_.splice(0);
	};

	/**
	 * Tells whether observer has active observations.
	 *
	 * @returns {boolean}
	 */
	ResizeObserverSPI.prototype.hasActive = function () {
	    return this.activeObservations_.length > 0;
	};

	// Registry of internal observers. If WeakMap is not available use current shim
	// for the Map collection as it has all required methods and because WeakMap
	// can't be fully polyfilled anyway.
	var observers = typeof WeakMap != 'undefined' ? new WeakMap() : new MapShim();

	/**
	 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
	 * exposing only those methods and properties that are defined in the spec.
	 */
	var ResizeObserver$1 = function(callback) {
	    if (!(this instanceof ResizeObserver$1)) {
	        throw new TypeError('Cannot call a class as a function');
	    }

	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    var controller = ResizeObserverController.getInstance();
	    var observer = new ResizeObserverSPI(callback, controller, this);

	    observers.set(this, observer);
	};

	// Expose public methods of ResizeObserver.
	['observe', 'unobserve', 'disconnect'].forEach(function (method) {
	    ResizeObserver$1.prototype[method] = function () {
	        return (ref = observers.get(this))[method].apply(ref, arguments);
	        var ref;
	    };
	});

	var index = (function () {
	    // Export existing implementation if available.
	    if (typeof ResizeObserver != 'undefined') {
	        // eslint-disable-next-line no-undef
	        return ResizeObserver;
	    }

	    return ResizeObserver$1;
	})();

	return index;
	})));


/***/ },

/***/ 350:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.capitalize = capitalize;
	exports.clamp = clamp;
	/**
	 * Capitalize first letter of string
	 * @private
	 * @param  {string} - String
	 * @return {string} - String with first letter capitalized
	 */
	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.substr(1);
	}

	/**
	 * Clamp position between a range
	 * @param  {number} - Value to be clamped
	 * @param  {number} - Minimum value in range
	 * @param  {number} - Maximum value in range
	 * @return {number} - Clamped value
	 */
	function clamp(value, min, max) {
	  return Math.min(Math.max(value, min), max);
	}

/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _loader = __webpack_require__(327);

	var _loader2 = _interopRequireDefault(_loader);

	var _performanceRow = __webpack_require__(352);

	var _performanceRow2 = _interopRequireDefault(_performanceRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupPerformanceWidget = function (_React$Component) {
	  _inherits(GroupPerformanceWidget, _React$Component);

	  function GroupPerformanceWidget() {
	    _classCallCheck(this, GroupPerformanceWidget);

	    return _possibleConstructorReturn(this, (GroupPerformanceWidget.__proto__ || Object.getPrototypeOf(GroupPerformanceWidget)).apply(this, arguments));
	  }

	  _createClass(GroupPerformanceWidget, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      window.adjustAttendanceHeaders('.scrollable-header');
	      window.adjustAttendanceHeaders('.editable-cell', -2);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          people = _props.people,
	          loading = _props.loading,
	          canManage = _props.canManage,
	          examinations = _props.examinations,
	          toggleEditRow = _props.toggleEditRow,
	          examinationResults = _props.examinationResults,
	          editRowExaminationId = _props.editRowExaminationId,
	          openExaminationResultEditor = _props.openExaminationResultEditor;


	      var peopleIds = people.map(function (person) {
	        return person.studentProfileId;
	      });
	      var peopleNames = people.map(function (person) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'cell editable-cell person-name', key: person.name },
	          person.name
	        );
	      });

	      var performanceRows = examinations.map(function (examination, index) {
	        return _react2.default.createElement(_performanceRow2.default, {
	          key: index,
	          peopleIds: peopleIds,
	          canManage: canManage,
	          examination: examination,
	          toggleEditRow: toggleEditRow,
	          examinationResults: examinationResults[examination.id],
	          editRowExaminationId: editRowExaminationId,
	          openExaminationResultEditor: openExaminationResultEditor
	        });
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'groupScrollableTable col-xs-12 vert-offset-top-1 vert-offset-bottom-3' },
	        _react2.default.createElement(_loader2.default, { visible: loading }),
	        _react2.default.createElement(
	          'div',
	          { className: 'scrollable-row' },
	          _react2.default.createElement('div', { className: 'scrollable-header' }),
	          peopleNames
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'scrollable-rows' },
	          performanceRows
	        )
	      );
	    }
	  }]);

	  return GroupPerformanceWidget;
	}(_react2.default.Component);

	GroupPerformanceWidget.propTypes = {
	  people: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    name: _react.PropTypes.string.isRequired
	  })).isRequired,
	  loading: _react.PropTypes.bool.isRequired,
	  canManage: _react.PropTypes.bool.isRequired,
	  examinations: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    id: _react.PropTypes.number.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    maxResult: _react.PropTypes.number.isRequired,
	    minResult: _react.PropTypes.number.isRequired,
	    courseTitle: _react.PropTypes.string.isRequired,
	    description: _react.PropTypes.string.isRequired,
	    passingScore: _react.PropTypes.number.isRequired
	  })).isRequired,
	  toggleEditRow: _react.PropTypes.func.isRequired,
	  examinationResults: _react.PropTypes.object.isRequired,
	  editRowExaminationId: _react.PropTypes.number.isRequired,
	  openExaminationResultEditor: _react.PropTypes.func.isRequired
	};
	exports.default = GroupPerformanceWidget;

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _bootstrapIconButton = __webpack_require__(257);

	var _bootstrapIconButton2 = _interopRequireDefault(_bootstrapIconButton);

	var _performanceMarker = __webpack_require__(353);

	var _performanceMarker2 = _interopRequireDefault(_performanceMarker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PerformanceRow = function (_React$Component) {
	  _inherits(PerformanceRow, _React$Component);

	  function PerformanceRow() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, PerformanceRow);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PerformanceRow.__proto__ || Object.getPrototypeOf(PerformanceRow)).call.apply(_ref, [this].concat(args))), _this), _this.toggleEditRow = function () {
	      return _this.props.toggleEditRow(_this.props.examination.id);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(PerformanceRow, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          canManage = _props.canManage,
	          peopleIds = _props.peopleIds,
	          examination = _props.examination,
	          examinationResults = _props.examinationResults,
	          editRowExaminationId = _props.editRowExaminationId,
	          openExaminationResultEditor = _props.openExaminationResultEditor,
	          _props$examination = _props.examination,
	          title = _props$examination.title,
	          courseTitle = _props$examination.courseTitle;


	      var performanceMarkers = peopleIds.map(function (personId) {
	        return _react2.default.createElement(_performanceMarker2.default, {
	          key: personId,
	          score: examinationResults[personId] && examinationResults[personId].score,
	          personId: personId,
	          examinationId: examination.id,
	          isEditExamination: editRowExaminationId === examination.id,
	          examinationPassingScore: examination.passingScore,
	          openExaminationResultEditor: openExaminationResultEditor
	        });
	      });

	      var editButton = canManage ? _react2.default.createElement(_bootstrapIconButton2.default, {
	        size: 'sm',
	        icon: 'pencil',
	        color: 'primary',
	        onClick: this.toggleEditRow
	      }) : null;

	      return _react2.default.createElement(
	        'div',
	        { className: 'scrollable-row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'scrollable-header' },
	          _react2.default.createElement(
	            'div',
	            { className: 'pivoted-content vert-offset-bottom-1' },
	            _react2.default.createElement(
	              'b',
	              null,
	              title
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'span',
	              null,
	              courseTitle
	            )
	          ),
	          editButton
	        ),
	        performanceMarkers
	      );
	    }
	  }]);

	  return PerformanceRow;
	}(_react2.default.Component);

	PerformanceRow.propTypes = {
	  canManage: _react.PropTypes.bool.isRequired,
	  peopleIds: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
	  examination: _react.PropTypes.shape({
	    id: _react.PropTypes.number.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    maxResult: _react.PropTypes.number.isRequired,
	    minResult: _react.PropTypes.number.isRequired,
	    courseTitle: _react.PropTypes.string.isRequired,
	    description: _react.PropTypes.string.isRequired,
	    passingScore: _react.PropTypes.number.isRequired
	  }).isRequired,
	  examinationResults: _react.PropTypes.object.isRequired,
	  toggleEditRow: _react.PropTypes.func.isRequired,
	  editRowExaminationId: _react.PropTypes.number.isRequired,
	  openExaminationResultEditor: _react.PropTypes.func.isRequired
	};
	exports.default = PerformanceRow;

/***/ },

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _bootstrapIconButton = __webpack_require__(257);

	var _bootstrapIconButton2 = _interopRequireDefault(_bootstrapIconButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PerformanceMarker = function PerformanceMarker(_ref) {
	  var score = _ref.score,
	      personId = _ref.personId,
	      examinationId = _ref.examinationId,
	      isEditExamination = _ref.isEditExamination,
	      examinationPassingScore = _ref.examinationPassingScore,
	      openExaminationResultEditor = _ref.openExaminationResultEditor;

	  var openEditor = function openEditor() {
	    return openExaminationResultEditor(personId, examinationId);
	  };

	  var content = '\xA0';
	  var cellClass = 'cell editable-cell';
	  var buttonClass = 'default';

	  if (score !== undefined) {
	    if (score >= examinationPassingScore) {
	      content = _react2.default.createElement('span', { className: 'glyphicon glyphicon-ok' });
	      cellClass = 'cell bg-success editable-cell';
	      buttonClass = 'success';
	    } else {
	      content = _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove' });
	      cellClass = 'cell bg-danger editable-cell';
	      buttonClass = 'danger';
	    }

	    if (examinationPassingScore !== 1) content = score;
	  }

	  var button = isEditExamination ? _react2.default.createElement(_bootstrapIconButton2.default, {
	    size: 'sm',
	    icon: 'pencil',
	    onClick: openEditor,
	    color: buttonClass
	  }) : null;

	  return _react2.default.createElement(
	    'div',
	    { className: cellClass },
	    button || content
	  );
	};

	PerformanceMarker.propTypes = {
	  score: _react.PropTypes.number,
	  personId: _react.PropTypes.number.isRequired,
	  examinationId: _react.PropTypes.number.isRequired,
	  isEditExamination: _react.PropTypes.bool.isRequired,
	  examinationPassingScore: _react.PropTypes.number.isRequired,
	  openExaminationResultEditor: _react.PropTypes.func.isRequired
	};

	exports.default = PerformanceMarker;

/***/ },

/***/ 354:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.showLoader = showLoader;
	exports.hideLoader = hideLoader;
	exports.toggleEditRow = toggleEditRow;
	exports.resultDeleted = resultDeleted;
	exports.resultSaved = resultSaved;
	exports.openExaminationResultEditor = openExaminationResultEditor;
	exports.asyncDeleteResult = asyncDeleteResult;
	exports.asyncSaveResult = asyncSaveResult;

	var _jquery = __webpack_require__(333);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _groupPerformanceConstants = __webpack_require__(343);

	var _groupPerformanceConstants2 = _interopRequireDefault(_groupPerformanceConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function showLoader() {
	  return {
	    type: _groupPerformanceConstants2.default.SHOW_LOADER
	  };
	} // eslint-disable-line id-length
	function hideLoader() {
	  return {
	    type: _groupPerformanceConstants2.default.HIDE_LOADER
	  };
	}

	function toggleEditRow(examinationId) {
	  return {
	    examinationId: examinationId,
	    type: _groupPerformanceConstants2.default.TOGGLE_EDIT_ROW
	  };
	}

	function resultDeleted(examinationId, studentProfileId) {
	  return {
	    examinationId: examinationId,
	    studentProfileId: studentProfileId,
	    type: _groupPerformanceConstants2.default.RESULT_DELETED
	  };
	}

	function resultSaved(examinationResult) {
	  return {
	    examinationResult: examinationResult,
	    type: _groupPerformanceConstants2.default.RESULT_SAVED
	  };
	}

	function openExaminationResultEditor(personId, examinationId) {
	  (0, _jquery2.default)('#examinationResultEditorModal').modal('show');

	  return {
	    personId: personId,
	    examinationId: examinationId,
	    type: _groupPerformanceConstants2.default.OPEN_EXAMINATION_RESULT_EDITOR
	  };
	}

	function deleteResult(resultId, success, error) {
	  _jquery2.default.ajax({
	    error: error,
	    success: success,
	    url: '/ui/examination_results/' + resultId,
	    cache: false,
	    method: 'DELETE',
	    dataType: 'json'
	  });
	}

	function updateResult(resultId, score, success, error) {
	  _jquery2.default.ajax({
	    error: error,
	    success: success,
	    url: '/ui/examination_results/' + resultId,
	    data: { score: score },
	    cache: false,
	    method: 'PUT',
	    dataType: 'json'
	  });
	}

	function createResult(examinationId, studentProfileId, score, success, error) {
	  _jquery2.default.ajax({
	    error: error,
	    success: success,
	    url: '/ui/examination_results',
	    data: {
	      score: score,
	      examination_id: examinationId, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	      student_profile_id: studentProfileId // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	    },
	    cache: false,
	    method: 'POST',
	    dataType: 'json'
	  });
	}

	function asyncDeleteResult(resultId, examinationId, studentProfileId) {
	  return function (dispatch) {
	    if (!resultId) return;

	    dispatch(showLoader());

	    var error = function error() {
	      return dispatch(hideLoader());
	    };
	    var success = function success() {
	      dispatch(hideLoader());
	      dispatch(resultDeleted(examinationId, studentProfileId));
	    };

	    deleteResult(resultId, success, error);
	  };
	}

	function asyncSaveResult(id, score, examinationId, studentProfileId) {
	  return function (dispatch) {
	    dispatch(showLoader());

	    var error = function error() {
	      return dispatch(hideLoader());
	    };
	    var success = function success(_ref) {
	      var examinationResult = _ref.examinationResult;

	      dispatch(hideLoader());
	      dispatch(resultSaved(examinationResult));
	    };

	    if (id) {
	      updateResult(id, score, success, error);
	    } else {
	      createResult(examinationId, studentProfileId, score, success, error);
	    }
	  };
	}

/***/ }

});