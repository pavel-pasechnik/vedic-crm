webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactOnRails = __webpack_require__(1);

	var _reactOnRails2 = _interopRequireDefault(_reactOnRails);

	var _groupAttendanceAppClient = __webpack_require__(260);

	var _groupAttendanceAppClient2 = _interopRequireDefault(_groupAttendanceAppClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactOnRails2.default.register({ GroupAttendanceApp: _groupAttendanceAppClient2.default });

/***/ },

/***/ 254:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bindAll;
	/* eslint-disable no-param-reassign */

	function bindAll(that) {
	  for (var _len = arguments.length, methods = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    methods[_key - 1] = arguments[_key];
	  }

	  methods.forEach(function (method) {
	    return that[method] = that[method].bind(that);
	  });
	}

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(261);

	var _groupAttendanceStore = __webpack_require__(292);

	var _groupAttendanceStore2 = _interopRequireDefault(_groupAttendanceStore);

	var _groupAttendance = __webpack_require__(298);

	var _groupAttendance2 = _interopRequireDefault(_groupAttendance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// See documentation for https://github.com/reactjs/react-redux.
	// This is how you get props from the Rails view into the redux store.
	// This code here binds your smart component to the redux store.
	exports.default = function (props) {
	  var store = (0, _groupAttendanceStore2.default)(props);
	  var reactComponent = _react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_groupAttendance2.default, null)
	  );
	  return reactComponent;
	};

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// See
	// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
	// This is not actually used for this simple example, but you'd probably want to use this
	// once your app has asynchronous actions.


	var _redux = __webpack_require__(273);

	var _reduxThunk = __webpack_require__(293);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(294);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
	  // This is how we get initial props Rails into redux.
	  var people = props.people,
	      canManage = props.canManage,
	      defaultPhoto = props.defaultPhoto,
	      localization = props.localization,
	      academicGroupId = props.academicGroupId;
	  var groupAttendanceState = _rootReducer.initialStates.groupAttendanceState;


	  var initialState = {
	    groupAttendanceStore: _extends({}, groupAttendanceState, {
	      people: people,
	      canManage: canManage,
	      defaultPhoto: defaultPhoto,
	      localization: localization,
	      academicGroupId: academicGroupId
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

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialStates = undefined;

	var _groupAttendanceReducer = __webpack_require__(295);

	var _groupAttendanceReducer2 = _interopRequireDefault(_groupAttendanceReducer);

	var _redux = __webpack_require__(273);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialStates = exports.initialStates = {
	  groupAttendanceState: _groupAttendanceReducer.initialState
	}; // A real world app will likely have many reducers and it helps to organize them in one file.


	var reducer = (0, _redux.combineReducers)({
	  groupAttendanceStore: _groupAttendanceReducer2.default
	});

	exports.default = reducer;

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialState = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = groupAttendanceReducer;

	var _groupAttendanceConstants = __webpack_require__(296);

	var _groupAttendanceConstants2 = _interopRequireDefault(_groupAttendanceConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var initialState = exports.initialState = {
	  page: 0,
	  loading: false,
	  classSchedules: [],
	  selectedScheduleIndex: undefined,
	  selectedPersonIndex: 0
	};

	function markUnknown(state, attendance) {
	  var scheduleId = attendance.scheduleId,
	      studentProfileId = attendance.studentProfileId;


	  var classSchedules = state.classSchedules.map(function (schedule) {
	    var newSchedule = _extends({}, schedule);

	    if (newSchedule.id === scheduleId) delete newSchedule.attendances[studentProfileId];

	    return newSchedule;
	  });

	  return _extends({}, state, {
	    classSchedules: classSchedules
	  });
	}

	function markPresence(state, attendance) {
	  var scheduleId = attendance.scheduleId,
	      studentProfileId = attendance.studentProfileId;


	  var classSchedules = state.classSchedules.map(function (schedule) {
	    var newSchedule = _extends({}, schedule);

	    if (newSchedule.id === scheduleId) newSchedule.attendances[studentProfileId] = attendance;

	    return newSchedule;
	  });

	  return _extends({}, state, {
	    classSchedules: classSchedules
	  });
	}

	function groupAttendanceReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _groupAttendanceConstants2.default.OPEN_ATTENDANCE_SUBMITTER:
	      return _extends({}, state, {
	        selectedScheduleIndex: action.selectedScheduleIndex,
	        selectedPersonIndex: 0
	      });

	    case _groupAttendanceConstants2.default.PREVIOUS_PERSON:
	      return _extends({}, state, {
	        selectedPersonIndex: state.selectedPersonIndex > 0 ? state.selectedPersonIndex - 1 : 0
	      });

	    case _groupAttendanceConstants2.default.NEXT_PERSON:
	      return _extends({}, state, {
	        selectedPersonIndex: state.selectedPersonIndex < state.people.length - 1 ? state.selectedPersonIndex + 1 : state.selectedPersonIndex
	      });

	    case _groupAttendanceConstants2.default.SHOW_LOADER:
	      return _extends({}, state, {
	        loading: true
	      });

	    case _groupAttendanceConstants2.default.HIDE_LOADER:
	      return _extends({}, state, {
	        loading: false
	      });

	    case _groupAttendanceConstants2.default.MARK_UNKNOWN:
	      return action.attendance.toDelete ? markPresence(state, action.attendance) : markUnknown(state, action.attendance);

	    case _groupAttendanceConstants2.default.MARK_PRESENCE:
	      return markPresence(state, action.attendance);

	    case _groupAttendanceConstants2.default.UPDATE_CLASS_SCHEDULES_AND_PAGE:
	      return _extends({}, state, {
	        page: action.page,
	        classSchedules: [].concat(_toConsumableArray(action.classSchedules), _toConsumableArray(state.classSchedules))
	      });

	    default:
	      return state;
	  }
	}

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mirrorCreator = __webpack_require__(297);

	var _mirrorCreator2 = _interopRequireDefault(_mirrorCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var actionTypes = (0, _mirrorCreator2.default)(['SHOW_LOADER', 'HIDE_LOADER', 'NEXT_PERSON', 'MARK_UNKNOWN', 'MARK_PRESENCE', 'PREVIOUS_PERSON', 'OPEN_ATTENDANCE_SUBMITTER', 'UPDATE_CLASS_SCHEDULES_AND_PAGE']);

	exports.default = actionTypes;

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _attendanceSubmitter = __webpack_require__(299);

	var _attendanceSubmitter2 = _interopRequireDefault(_attendanceSubmitter);

	var _groupAttendanceWidget = __webpack_require__(326);

	var _groupAttendanceWidget2 = _interopRequireDefault(_groupAttendanceWidget);

	var _reactRedux = __webpack_require__(261);

	var _redux = __webpack_require__(273);

	var _groupAttendanceActionCreators = __webpack_require__(332);

	var groupAttendanceActionCreators = _interopRequireWildcard(_groupAttendanceActionCreators);

	var _webworkifyWebpack = __webpack_require__(337);

	var _webworkifyWebpack2 = _interopRequireDefault(_webworkifyWebpack);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AttendanceWorker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(338));

	function select(state) {
	  return { groupAttendanceStore: state.groupAttendanceStore };
	}

	var GroupAttendance = function (_React$Component) {
	  _inherits(GroupAttendance, _React$Component);

	  function GroupAttendance() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, GroupAttendance);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupAttendance.__proto__ || Object.getPrototypeOf(GroupAttendance)).call.apply(_ref, [this].concat(args))), _this), _this.actions = function () {
	      return (0, _redux.bindActionCreators)(groupAttendanceActionCreators, _this.props.dispatch);
	    }, _this.markUnknownAndNext = function (attendance) {
	      var _this$actions = _this.actions(),
	          nextPerson = _this$actions.nextPerson,
	          asyncMarkUnknown = _this$actions.asyncMarkUnknown;

	      asyncMarkUnknown(_this.postToWorker, attendance);
	      nextPerson();
	    }, _this.markPresenceAndNext = function (attendance, presence) {
	      var _this$actions2 = _this.actions(),
	          nextPerson = _this$actions2.nextPerson,
	          asyncMarkPresence = _this$actions2.asyncMarkPresence;

	      asyncMarkPresence(_this.postToWorker, attendance, presence);
	      nextPerson();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(GroupAttendance, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var actions = this.actions();

	      actions.getAttendance();

	      AttendanceWorker.addEventListener('message', function (msg) {
	        actions.workerReplyDispatcher(JSON.parse(msg.data), _this2.postToWorker);
	      });

	      actions.syncNextAttendance(this.postToWorker);
	    }
	  }, {
	    key: 'postToWorker',
	    value: function postToWorker(msg) {
	      AttendanceWorker.postMessage(JSON.stringify(msg));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props$groupAttendanc = this.props.groupAttendanceStore,
	          people = _props$groupAttendanc.people,
	          loading = _props$groupAttendanc.loading,
	          canManage = _props$groupAttendanc.canManage,
	          defaultPhoto = _props$groupAttendanc.defaultPhoto,
	          localization = _props$groupAttendanc.localization,
	          classSchedules = _props$groupAttendanc.classSchedules,
	          selectedPersonIndex = _props$groupAttendanc.selectedPersonIndex,
	          selectedScheduleIndex = _props$groupAttendanc.selectedScheduleIndex;

	      var _actions = this.actions(),
	          nextPerson = _actions.nextPerson,
	          getAttendance = _actions.getAttendance,
	          previousPerson = _actions.previousPerson,
	          openAttendanceSubmitter = _actions.openAttendanceSubmitter;

	      var markUnknownAndNext = this.markUnknownAndNext,
	          markPresenceAndNext = this.markPresenceAndNext;


	      return _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(_groupAttendanceWidget2.default, {
	          people: people,
	          loading: loading,
	          canManage: canManage,
	          getAttendance: getAttendance,
	          classSchedules: classSchedules,
	          openAttendanceSubmitter: openAttendanceSubmitter
	        }),
	        canManage ? _react2.default.createElement(_attendanceSubmitter2.default, {
	          data: {
	            people: people,
	            defaultPhoto: defaultPhoto,
	            localization: localization,
	            classSchedules: classSchedules,
	            selectedPersonIndex: selectedPersonIndex,
	            selectedScheduleIndex: selectedScheduleIndex
	          },
	          actions: {
	            nextPerson: nextPerson,
	            previousPerson: previousPerson,
	            markUnknownAndNext: markUnknownAndNext,
	            markPresenceAndNext: markPresenceAndNext
	          }
	        }) : null
	      );
	    }
	  }]);

	  return GroupAttendance;
	}(_react2.default.Component);

	// Don't forget to actually use connect!
	// Note that we don't export groupAttendance, but the redux "connected" version of it.
	// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples


	GroupAttendance.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  groupAttendanceStore: _react.PropTypes.object.isRequired
	};
	exports.default = (0, _reactRedux.connect)(select)(GroupAttendance);

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reactImage = __webpack_require__(300);

	var _reactImage2 = _interopRequireDefault(_reactImage);

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _bindAll = __webpack_require__(254);

	var _bindAll2 = _interopRequireDefault(_bindAll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AttendanceSubmitter = function (_React$Component) {
	  _inherits(AttendanceSubmitter, _React$Component);

	  function AttendanceSubmitter(props, context) {
	    _classCallCheck(this, AttendanceSubmitter);

	    var _this = _possibleConstructorReturn(this, (AttendanceSubmitter.__proto__ || Object.getPrototypeOf(AttendanceSubmitter)).call(this, props, context));

	    (0, _bindAll2.default)(_this, 'getPerson', 'getSchedule', 'markUnknown', 'markPresence', 'getAttendance');
	    return _this;
	  }

	  _createClass(AttendanceSubmitter, [{
	    key: 'getPerson',
	    value: function getPerson() {
	      return this.props.data.people[this.props.data.selectedPersonIndex] || {};
	    }
	  }, {
	    key: 'getSchedule',
	    value: function getSchedule() {
	      return this.props.data.classSchedules[this.props.data.selectedScheduleIndex] || {};
	    }
	  }, {
	    key: 'getAttendance',
	    value: function getAttendance() {
	      var schedule = this.getSchedule();
	      var studentProfileId = this.getPerson().studentProfileId;
	      var attendance = (schedule.attendances || {})[studentProfileId] || {};

	      return _extends({}, attendance, {
	        studentProfileId: studentProfileId,
	        scheduleId: schedule.id
	      });
	    }
	  }, {
	    key: 'markUnknown',
	    value: function markUnknown() {
	      this.props.actions.markUnknownAndNext(this.getAttendance());
	    }
	  }, {
	    key: 'markPresence',
	    value: function markPresence(neededPresence) {
	      var _this2 = this;

	      return function () {
	        _this2.props.actions.markPresenceAndNext(_this2.getAttendance(), neededPresence);
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          _props$data = _props.data,
	          people = _props$data.people,
	          defaultPhoto = _props$data.defaultPhoto,
	          localization = _props$data.localization,
	          selectedPersonIndex = _props$data.selectedPersonIndex,
	          _props$actions = _props.actions,
	          nextPerson = _props$actions.nextPerson,
	          previousPerson = _props$actions.previousPerson;


	      var person = this.getPerson();
	      var attendance = this.getAttendance();
	      var classSchedule = this.getSchedule();

	      var nextPersonDisabled = selectedPersonIndex === people.length - 1;
	      var previousPersonDisabled = selectedPersonIndex === 0;

	      var defaultImage = _react2.default.createElement('img', { className: 'img-thumbnail img-version-standart', src: defaultPhoto, alt: person.name });

	      var bodyClass = 'modal-body';
	      var absentClass = 'btn btn-danger';
	      var presentClass = 'btn btn-success';
	      var unknownClass = 'btn btn-default';

	      if (attendance.presence === true) {
	        bodyClass = bodyClass + ' bg-success';
	        presentClass = presentClass + ' active';
	      } else if (attendance.presence === false) {
	        bodyClass = bodyClass + ' bg-danger';
	        absentClass = absentClass + ' active';
	      } else {
	        unknownClass = unknownClass + ' active';
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          id: 'attendanceSubmitterModal',
	          role: 'dialog',
	          tabIndex: '-1',
	          className: 'modal fade',
	          'aria-labelledby': 'gridSystemModalLabel'
	        },
	        _react2.default.createElement(
	          'div',
	          { className: 'modal-dialog', role: 'document' },
	          _react2.default.createElement(
	            'div',
	            { className: 'modal-content' },
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
	                  classSchedule.courseTitle
	                ),
	                _react2.default.createElement('br', null),
	                classSchedule.date
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: bodyClass },
	              _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-12 text-center' },
	                  _react2.default.createElement(_reactImage2.default, {
	                    alt: person.name,
	                    src: [person.photoPath, defaultPhoto],
	                    loader: defaultImage,
	                    className: 'img-thumbnail img-version-standart'
	                  })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-12' },
	                  _react2.default.createElement(
	                    'h4',
	                    { className: 'text-center' },
	                    person.name
	                  )
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-12 text-center' },
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'btn-group', role: 'group' },
	                    _react2.default.createElement(
	                      'button',
	                      {
	                        type: 'button',
	                        onClick: this.markPresence(true),
	                        className: presentClass
	                      },
	                      localization.present
	                    ),
	                    _react2.default.createElement(
	                      'button',
	                      {
	                        type: 'button',
	                        onClick: this.markPresence(false),
	                        className: absentClass
	                      },
	                      localization.absend
	                    ),
	                    _react2.default.createElement(
	                      'button',
	                      {
	                        type: 'button',
	                        onClick: this.markUnknown,
	                        className: unknownClass
	                      },
	                      localization.unknown
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
	                    'div',
	                    { className: 'btn-group', role: 'group' },
	                    _react2.default.createElement(
	                      'button',
	                      {
	                        type: 'button',
	                        onClick: previousPerson,
	                        disabled: previousPersonDisabled,
	                        className: 'btn btn-default'
	                      },
	                      localization.back
	                    ),
	                    _react2.default.createElement(
	                      'button',
	                      {
	                        type: 'button',
	                        onClick: nextPerson,
	                        disabled: nextPersonDisabled,
	                        className: 'btn btn-default'
	                      },
	                      localization.forth
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return AttendanceSubmitter;
	}(_react2.default.Component);

	AttendanceSubmitter.propTypes = {
	  data: _react.PropTypes.shape({
	    people: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      name: _react.PropTypes.string.isRequired,
	      photoPath: _react.PropTypes.string.isRequired,
	      studentProfileId: _react.PropTypes.number.isRequired
	    })).isRequired,
	    defaultPhoto: _react.PropTypes.string.isRequired,
	    localization: _react.PropTypes.object.isRequired,
	    classSchedules: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	      id: _react.PropTypes.number.isRequired,
	      date: _react.PropTypes.string.isRequired,
	      courseTitle: _react.PropTypes.string.isRequired,
	      attendances: _react.PropTypes.object.isRequired
	    })).isRequired,
	    selectedPersonIndex: _react.PropTypes.number.isRequired,
	    selectedScheduleIndex: _react.PropTypes.number
	  }).isRequired,
	  actions: _react.PropTypes.shape({
	    nextPerson: _react.PropTypes.func.isRequired,
	    previousPerson: _react.PropTypes.func.isRequired,
	    markUnknownAndNext: _react.PropTypes.func.isRequired,
	    markPresenceAndNext: _react.PropTypes.func.isRequired
	  })
	};
	exports.default = AttendanceSubmitter;

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(301);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(302);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _getPrototypeOf = __webpack_require__(303);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(306);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(307);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(310);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(319);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(263);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cache = {};

	var Img = function (_Component) {
	  (0, _inherits3.default)(Img, _Component);

	  function Img(props) {
	    (0, _classCallCheck3.default)(this, Img);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Img.__proto__ || (0, _getPrototypeOf2.default)(Img)).call(this, props));

	    _this.srcToArray = function (src) {
	      return (Array.isArray(src) ? src : [src]).filter(function (x) {
	        return x;
	      });
	    };

	    _this.onLoad = function () {
	      cache[_this.sourceList[_this.state.currentIndex]] = true;
	      /* istanbul ignore else */
	      if (_this.i) _this.setState({ isLoaded: true });
	    };

	    _this.onError = function () {
	      cache[_this.sourceList[_this.state.currentIndex]] = false;
	      // if the current image has already been destroyed, we are probably no longer mounted
	      // no need to do anything then
	      /* istanbul ignore else */
	      if (!_this.i) return false;

	      // before loading the next image, check to see if it was ever loaded in the past
	      for (var nextIndex = _this.state.currentIndex + 1; nextIndex < _this.sourceList.length; nextIndex++) {
	        // get next img
	        var src = _this.sourceList[nextIndex];

	        // if we have never seen it, its the one we want to try next
	        if (!(src in cache)) {
	          _this.setState({ currentIndex: nextIndex });
	          break;
	        }

	        // if we know it exists, use it!
	        if (cache[src] === true) {
	          _this.setState({ currentIndex: nextIndex, isLoading: false, isLoaded: true });
	          return true;
	        }

	        // if we know it doesn't exist, skip it!
	        /* istanbul ignore else */
	        if (cache[src] === false) continue;
	      }

	      // currentIndex is zero bases, length is 1 based.
	      // if we have no more sources to try, return - we are done
	      if (nextIndex === _this.sourceList.length) return _this.setState({ isLoading: false });

	      // otherwise, try the next img
	      _this.loadImg();
	    };

	    _this.loadImg = function () {
	      _this.i = new Image();
	      _this.i.src = _this.sourceList[_this.state.currentIndex];
	      _this.i.onload = _this.onLoad;
	      _this.i.onerror = _this.onError;
	    };

	    _this.unloadImg = function () {
	      delete _this.i.onerror;
	      delete _this.i.onload;
	      delete _this.i.src;
	      delete _this.i;
	    };

	    _this.sourceList = _this.srcToArray(_this.props.src);

	    // check cache to decide at which index to start
	    for (var i = 0; i < _this.sourceList.length; i++) {
	      // if we've never seen this image before, the cache wont help.
	      // no need to look further, just start loading
	      /* istanbul ignore else */
	      if (!(_this.sourceList[i] in cache)) break;

	      // if we have loaded this image before, just load it again
	      /* istanbul ignore else */
	      if (cache[_this.sourceList[i]] === true) {
	        var _ret;

	        _this.state = { currentIndex: i, isLoading: false, isLoaded: true };
	        return _ret = true, (0, _possibleConstructorReturn3.default)(_this, _ret);
	      }
	    }

	    _this.state = _this.sourceList.length
	    // 'normal' opperation: start at 0 and try to load
	    ? { currentIndex: 0, isLoading: true, isLoaded: false }
	    // if we dont have any sources, jump directly to unloaded
	    : { isLoading: false, isLoaded: false };
	    return _this;
	  }

	  (0, _createClass3.default)(Img, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // kick off process
	      /* istanbul ignore else */
	      if (this.state.isLoading) this.loadImg();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // ensure that we dont leave any lingering listeners
	      /* istanbul ignore else */
	      if (this.i) this.unloadImg();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      var src = this.srcToArray(nextProps.src);

	      var srcAdded = src.filter(function (s) {
	        return _this2.sourceList.indexOf(s) === -1;
	      });
	      var srcRemoved = this.sourceList.filter(function (s) {
	        return src.indexOf(s) === -1;
	      });

	      // if src prop changed, restart the loading process
	      if (srcAdded.length || srcRemoved.length) {
	        this.sourceList = src;

	        // if we dont have any sources, jump directly to unloader
	        if (!src.length) return this.setState({ isLoading: false, isLoaded: false });
	        this.setState({ currentIndex: 0, isLoading: true, isLoaded: false }, this.loadImg);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // if we have loaded, show img
	      if (this.state.isLoaded) {
	        // clear non img props
	        var _props = this.props,
	            src = _props.src,
	            loader = _props.loader,
	            unloader = _props.unloader,
	            rest = (0, _objectWithoutProperties3.default)(_props, ['src', 'loader', 'unloader']); //eslint-disable-line

	        return _react2.default.createElement('img', (0, _extends3.default)({ src: this.sourceList[this.state.currentIndex] }, rest));
	      }

	      // if we are still trying to load, show img and a loader if requested
	      if (!this.state.isLoaded && this.state.isLoading) return this.props.loader ? this.props.loader : null;

	      // if we have given up on loading, show a place holder if requested, or nothing
	      /* istanbul ignore else */
	      if (!this.state.isLoaded && !this.state.isLoading) return this.props.unloader ? this.props.unloader : null;
	    }
	  }]);
	  return Img;
	}(_react.Component);

	Img.defaultProps = {
	  loader: false,
	  unloader: false,
	  src: []
	};
	 false ? Img.propTypes = {
	  loader: _propTypes.node,
	  unloader: _propTypes.node,
	  src: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.array])
	} : void 0;
	exports.default = Img;

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },

/***/ 302:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(304), __esModule: true };

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(305);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(12);

	__webpack_require__(22)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },

/***/ 306:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(308);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(309), __esModule: true };

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(311);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(312)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(313), __esModule: true };

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(314);
	__webpack_require__(225);
	module.exports = __webpack_require__(7).Symbol;

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(11)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(207)
	  , DESCRIPTORS    = __webpack_require__(206)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(203)
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(212)
	  , setToStringTag = __webpack_require__(210)
	  , uid            = __webpack_require__(213)
	  , wks            = __webpack_require__(211)
	  , keyOf          = __webpack_require__(315)
	  , $names         = __webpack_require__(316)
	  , enumKeys       = __webpack_require__(317)
	  , isArray        = __webpack_require__(318)
	  , anObject       = __webpack_require__(216)
	  , toIObject      = __webpack_require__(230)
	  , createDesc     = __webpack_require__(205)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(202)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(11)
	  , toIObject = __webpack_require__(230);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(230)
	  , getNames  = __webpack_require__(11).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(11);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(15);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(320)["default"];

	var _Object$setPrototypeOf = __webpack_require__(322)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(321), __esModule: true };

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(323), __esModule: true };

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(324);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(325).set});

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(217)
	  , anObject = __webpack_require__(216);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },

/***/ 326:
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

	var _attendanceRow = __webpack_require__(328);

	var _attendanceRow2 = _interopRequireDefault(_attendanceRow);

	var _statisticsRow = __webpack_require__(330);

	var _statisticsRow2 = _interopRequireDefault(_statisticsRow);

	var _fetchAttendanceButton = __webpack_require__(331);

	var _fetchAttendanceButton2 = _interopRequireDefault(_fetchAttendanceButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupAttendanceWidget = function (_React$Component) {
	  _inherits(GroupAttendanceWidget, _React$Component);

	  function GroupAttendanceWidget() {
	    _classCallCheck(this, GroupAttendanceWidget);

	    return _possibleConstructorReturn(this, (GroupAttendanceWidget.__proto__ || Object.getPrototypeOf(GroupAttendanceWidget)).apply(this, arguments));
	  }

	  _createClass(GroupAttendanceWidget, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      window.adjustAttendanceHeaders('.scrollable-header');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          people = _props.people,
	          loading = _props.loading,
	          canManage = _props.canManage,
	          classSchedules = _props.classSchedules,
	          getAttendance = _props.getAttendance,
	          openAttendanceSubmitter = _props.openAttendanceSubmitter;


	      var peopleIds = people.map(function (person) {
	        return person.studentProfileId;
	      });
	      var peopleNames = people.map(function (person) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'cell person-name', key: person.name },
	          person.name
	        );
	      });

	      var attendanceRows = classSchedules.map(function (classSchedule, index) {
	        return _react2.default.createElement(_attendanceRow2.default, {
	          key: index,
	          canManage: canManage,
	          peopleIds: peopleIds,
	          scheduleIndex: index,
	          classSchedule: classSchedule,
	          openAttendanceSubmitter: openAttendanceSubmitter
	        });
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'groupScrollableTable col-xs-12 vert-offset-top-1 vert-offset-bottom-3' },
	        _react2.default.createElement(_loader2.default, { visible: loading }),
	        _react2.default.createElement(
	          'div',
	          { className: 'people-row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'scrollable-header' },
	            _react2.default.createElement(_fetchAttendanceButton2.default, { getAttendance: getAttendance })
	          ),
	          peopleNames
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'scrollable-rows' },
	          _react2.default.createElement(_statisticsRow2.default, { peopleIds: peopleIds, classSchedules: classSchedules }),
	          attendanceRows
	        )
	      );
	    }
	  }]);

	  return GroupAttendanceWidget;
	}(_react2.default.Component);

	GroupAttendanceWidget.propTypes = {
	  people: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    name: _react.PropTypes.string.isRequired
	  })).isRequired,
	  loading: _react.PropTypes.bool.isRequired,
	  canManage: _react.PropTypes.bool.isRequired,
	  classSchedules: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    id: _react.PropTypes.number.isRequired,
	    date: _react.PropTypes.string.isRequired,
	    courseTitle: _react.PropTypes.string.isRequired,
	    attendances: _react.PropTypes.object.isRequired
	  })).isRequired,
	  getAttendance: _react.PropTypes.func.isRequired,
	  openAttendanceSubmitter: _react.PropTypes.func.isRequired
	};
	exports.default = GroupAttendanceWidget;

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

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	var _bindAll = __webpack_require__(254);

	var _bindAll2 = _interopRequireDefault(_bindAll);

	var _attendanceMarker = __webpack_require__(329);

	var _attendanceMarker2 = _interopRequireDefault(_attendanceMarker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AttendanceRow = function (_React$Component) {
	  _inherits(AttendanceRow, _React$Component);

	  function AttendanceRow(props, context) {
	    _classCallCheck(this, AttendanceRow);

	    var _this = _possibleConstructorReturn(this, (AttendanceRow.__proto__ || Object.getPrototypeOf(AttendanceRow)).call(this, props, context));

	    (0, _bindAll2.default)(_this, 'openAttendanceSubmitter');
	    return _this;
	  }

	  _createClass(AttendanceRow, [{
	    key: 'openAttendanceSubmitter',
	    value: function openAttendanceSubmitter() {
	      this.props.openAttendanceSubmitter(this.props.scheduleIndex);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          canManage = _props.canManage,
	          peopleIds = _props.peopleIds,
	          _props$classSchedule = _props.classSchedule,
	          date = _props$classSchedule.date,
	          courseTitle = _props$classSchedule.courseTitle,
	          attendances = _props$classSchedule.attendances;


	      var presenceCount = 0;
	      var attendanceMarkers = [];

	      peopleIds.forEach(function (personId) {
	        var _ref = attendances[personId] || {},
	            inSync = _ref.inSync,
	            presence = _ref.presence;

	        if (presence) presenceCount++;

	        attendanceMarkers.push(_react2.default.createElement(_attendanceMarker2.default, { inSync: inSync, presence: presence, key: personId }));
	      });

	      var editButton = canManage ? _react2.default.createElement(
	        'button',
	        { className: 'btn btn-sm btn-primary', onClick: this.openAttendanceSubmitter },
	        _react2.default.createElement('span', { className: 'glyphicon glyphicon-pencil', 'aria-hidden': 'true' })
	      ) : null;

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
	              courseTitle
	            ),
	            _react2.default.createElement('br', null),
	            date
	          ),
	          editButton
	        ),
	        attendanceMarkers,
	        _react2.default.createElement(
	          'div',
	          { className: 'cell' },
	          presenceCount
	        )
	      );
	    }
	  }]);

	  return AttendanceRow;
	}(_react2.default.Component);

	AttendanceRow.propTypes = {
	  canManage: _react.PropTypes.bool.isRequired,
	  peopleIds: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
	  classSchedule: _react.PropTypes.shape({
	    id: _react.PropTypes.number.isRequired,
	    date: _react.PropTypes.string.isRequired,
	    courseTitle: _react.PropTypes.string.isRequired,
	    attendances: _react.PropTypes.object.isRequired
	  }).isRequired,
	  scheduleIndex: _react.PropTypes.number.isRequired,
	  openAttendanceSubmitter: _react.PropTypes.func.isRequired
	};
	exports.default = AttendanceRow;

/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AttendanceMarker = function AttendanceMarker(_ref) {
	  var inSync = _ref.inSync,
	      presence = _ref.presence;

	  var spinner = _react2.default.createElement("span", { className: "glyphicon glyphicon-refresh", "aria-hidden": "true" });

	  if (presence === true) return _react2.default.createElement(
	    "div",
	    { className: "cell bg-success" },
	    inSync ? spinner : '.'
	  );
	  if (presence === false) return _react2.default.createElement(
	    "div",
	    { className: "cell bg-danger" },
	    inSync ? spinner : 'н'
	  );

	  return _react2.default.createElement(
	    "div",
	    { className: "cell" },
	    inSync ? spinner : "\xA0"
	  );
	};

	AttendanceMarker.propTypes = {
	  inSync: _react.PropTypes.bool,
	  presence: _react.PropTypes.bool
	};

	exports.default = AttendanceMarker;

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cellClass = function cellClass(value) {
	  if (value >= 82) return 'bg-success';
	  if (value >= 66) return 'bg-warning';

	  return 'bg-danger';
	};

	var StatisticsRow = function (_React$Component) {
	  _inherits(StatisticsRow, _React$Component);

	  function StatisticsRow() {
	    _classCallCheck(this, StatisticsRow);

	    return _possibleConstructorReturn(this, (StatisticsRow.__proto__ || Object.getPrototypeOf(StatisticsRow)).apply(this, arguments));
	  }

	  _createClass(StatisticsRow, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          peopleIds = _props.peopleIds,
	          classSchedules = _props.classSchedules;


	      var statsticsCells = [];

	      peopleIds.forEach(function (personId) {
	        var negativeCount = 0;
	        var positiveCount = 0;

	        classSchedules.forEach(function (classSchedule) {
	          var attendance = classSchedule.attendances[personId];

	          if (attendance && attendance.presence) {
	            positiveCount++;
	          } else if (attendance && !attendance.presence) {
	            negativeCount++;
	          }
	        });

	        var total = positiveCount + negativeCount;

	        if (total) {
	          var percentage = positiveCount ? Math.round(100 / total * positiveCount) : 0;
	          var className = 'cell ' + cellClass(percentage);

	          statsticsCells.push(_react2.default.createElement(
	            'div',
	            { className: className, key: personId },
	            percentage,
	            '%'
	          ));
	        } else {
	          statsticsCells.push(_react2.default.createElement(
	            'div',
	            { className: 'cell', key: personId },
	            '\xA0'
	          ));
	        }
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'scrollable-row' },
	        _react2.default.createElement('div', { className: 'scrollable-header' }),
	        statsticsCells
	      );
	    }
	  }]);

	  return StatisticsRow;
	}(_react2.default.Component);

	StatisticsRow.propTypes = {
	  peopleIds: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
	  classSchedules: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    attendances: _react.PropTypes.object.isRequired
	  })).isRequired
	};
	exports.default = StatisticsRow;

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(182);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FetchAttendanceButton = function FetchAttendanceButton(_ref) {
	  var getAttendance = _ref.getAttendance;
	  return _react2.default.createElement(
	    "button",
	    { className: "btn btn-primary", onClick: getAttendance },
	    _react2.default.createElement("span", { className: "glyphicon glyphicon-backward", "aria-hidden": "true" }),
	    _react2.default.createElement(
	      "span",
	      null,
	      "\xA0",
	      "\xA0"
	    ),
	    _react2.default.createElement("span", { className: "glyphicon glyphicon-hourglass", "aria-hidden": "true" })
	  );
	};

	FetchAttendanceButton.propTypes = {
	  getAttendance: _react.PropTypes.func.isRequired
	};

	exports.default = FetchAttendanceButton;

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line id-length


	exports.openAttendanceSubmitter = openAttendanceSubmitter;
	exports.updateClassSchedulesAndPage = updateClassSchedulesAndPage;
	exports.showLoader = showLoader;
	exports.hideLoader = hideLoader;
	exports.nextPerson = nextPerson;
	exports.previousPerson = previousPerson;
	exports.markPresence = markPresence;
	exports.markUnknown = markUnknown;
	exports.syncNextAttendance = syncNextAttendance;
	exports.workerReplyDispatcher = workerReplyDispatcher;
	exports.asyncMarkPresence = asyncMarkPresence;
	exports.asyncMarkUnknown = asyncMarkUnknown;
	exports.getAttendance = getAttendance;

	var _jquery = __webpack_require__(333);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _groupAttendanceConstants = __webpack_require__(296);

	var _groupAttendanceConstants2 = _interopRequireDefault(_groupAttendanceConstants);

	var _storedAttendances = __webpack_require__(336);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function openAttendanceSubmitter(selectedScheduleIndex) {
	  (0, _jquery2.default)('#attendanceSubmitterModal').modal('show');

	  return {
	    selectedScheduleIndex: selectedScheduleIndex,
	    type: _groupAttendanceConstants2.default.OPEN_ATTENDANCE_SUBMITTER
	  };
	}

	function updateClassSchedulesAndPage(classSchedules, page) {
	  return {
	    page: page,
	    type: _groupAttendanceConstants2.default.UPDATE_CLASS_SCHEDULES_AND_PAGE,
	    classSchedules: (0, _storedAttendances.mergeLocalAttendances)(classSchedules)
	  };
	}

	function showLoader() {
	  return {
	    type: _groupAttendanceConstants2.default.SHOW_LOADER
	  };
	}

	function hideLoader() {
	  return {
	    type: _groupAttendanceConstants2.default.HIDE_LOADER
	  };
	}

	function nextPerson() {
	  return {
	    type: _groupAttendanceConstants2.default.NEXT_PERSON
	  };
	}

	function previousPerson() {
	  return {
	    type: _groupAttendanceConstants2.default.PREVIOUS_PERSON
	  };
	}

	function markPresence(attendance) {
	  return {
	    attendance: attendance,
	    type: _groupAttendanceConstants2.default.MARK_PRESENCE
	  };
	}

	function markUnknown(attendance) {
	  return {
	    attendance: attendance,
	    type: _groupAttendanceConstants2.default.MARK_UNKNOWN
	  };
	}

	function syncNextAttendance(mesenger) {
	  return function (dispatch) {
	    var attendances = (0, _storedAttendances.readObjectFromStorage)('attendances');

	    var keys = Object.keys(attendances);

	    if (!keys.length) return;

	    var randomKey = keys[Math.floor(Math.random() * keys.length)];
	    var attendance = attendances[randomKey];
	    var type = attendance.toDelete ? 'deleteAttendance' : 'markAttendance';

	    mesenger({ type: type, attendance: attendance });
	  };
	}

	function workerReplyDispatcher(data, mesenger) {
	  return function (dispatch) {
	    var type = data.type,
	        status = data.status,
	        attendance = data.attendance;


	    if (status === 204 && type === 'deleteAttendanceReply') {
	      var scheduleId = attendance.scheduleId,
	          studentProfileId = attendance.studentProfileId;


	      dispatch(markUnknown({ scheduleId: scheduleId, studentProfileId: studentProfileId }));
	    } else if (status === 200 && (type === 'createAttendanceReply' || type === 'updateAttendanceReply')) {
	      dispatch(markPresence(data.response.attendance));
	    }

	    if (status === 200 || status === 204 || status === 404) {
	      (0, _storedAttendances.deleteAttendanceFromStorage)(attendance);
	      dispatch(syncNextAttendance(mesenger));
	    }
	  };
	}

	function asyncMarkPresence(mesenger, attendance, presence) {
	  return function (dispatch) {
	    if (attendance.presence === presence) return;

	    var newAttendance = _extends({}, attendance, { presence: presence, inSync: true });

	    (0, _storedAttendances.writeAttendanceToStorage)(newAttendance);

	    dispatch(markPresence(newAttendance));

	    mesenger({ type: 'markAttendance', attendance: newAttendance });
	  };
	}

	function asyncMarkUnknown(mesenger, attendance) {
	  return function (dispatch) {
	    if (attendance.id) {
	      if (attendance.toDelete) return;

	      var newAttendance = _extends({}, attendance, { toDelete: true, inSync: true });

	      delete newAttendance.presence;

	      (0, _storedAttendances.writeAttendanceToStorage)(newAttendance);

	      dispatch(markUnknown(newAttendance));

	      mesenger({ type: 'deleteAttendance', attendance: newAttendance });
	    } else {
	      (0, _storedAttendances.deleteAttendanceFromStorage)(attendance);
	      dispatch(markUnknown(attendance));
	    }
	  };
	}

	function getAttendance() {
	  return function (dispatch, getState) {
	    var _getState = getState(),
	        _getState$groupAttend = _getState.groupAttendanceStore,
	        page = _getState$groupAttend.page,
	        academicGroupId = _getState$groupAttend.academicGroupId;

	    var nextPage = page + 1;

	    dispatch(showLoader());

	    _jquery2.default.ajax({
	      url: '/ui/schedule_attendances?page=' + nextPage + '&academic_group_id=' + academicGroupId,
	      dataType: 'json',
	      cache: false,
	      success: function success(data) {
	        if (data.classSchedules && data.classSchedules.length) {
	          dispatch(updateClassSchedulesAndPage(data.classSchedules, nextPage));
	        }

	        dispatch(hideLoader());
	      },

	      error: function error(xhr, status, err) {
	        return dispatch(hideLoader());
	      }
	    });
	  };
	}

/***/ },

/***/ 336:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.readObjectFromStorage = readObjectFromStorage;
	exports.writeObjectToStorage = writeObjectToStorage;
	exports.writeAttendanceToStorage = writeAttendanceToStorage;
	exports.deleteAttendanceFromStorage = deleteAttendanceFromStorage;
	exports.mergeLocalAttendances = mergeLocalAttendances;
	function readObjectFromStorage(key) {
	  var fetched = localStorage.getItem(key);

	  return fetched ? JSON.parse(fetched) : {};
	}

	function writeObjectToStorage(key, object) {
	  localStorage.setItem(key, JSON.stringify(object));
	}

	function writeAttendanceToStorage(attendance) {
	  var attendances = readObjectFromStorage('attendances');
	  var scheduleId = attendance.scheduleId,
	      studentProfileId = attendance.studentProfileId;

	  var key = scheduleId + '-' + studentProfileId;

	  attendances[key] = attendance;

	  writeObjectToStorage('attendances', attendances);
	}

	function deleteAttendanceFromStorage(attendance) {
	  var attendances = readObjectFromStorage('attendances');
	  var scheduleId = attendance.scheduleId,
	      studentProfileId = attendance.studentProfileId;

	  var key = scheduleId + '-' + studentProfileId;

	  delete attendances[key];

	  writeObjectToStorage('attendances', attendances);
	}

	function mergeLocalAttendances(classSchedules) {
	  var attendances = readObjectFromStorage('attendances');
	  var classSchedulesObj = {};
	  var orderedScheduleIds = [];

	  classSchedules.forEach(function (classSchedule) {
	    var id = classSchedule.id;

	    orderedScheduleIds.push(id);

	    classSchedulesObj[id] = classSchedule;
	  });

	  Object.keys(attendances).forEach(function (key) {
	    var splittedKey = key.split('-');
	    var scheduleId = splittedKey[0];
	    var studentProfileId = splittedKey[1];

	    var classSchedule = classSchedulesObj[scheduleId];

	    if (classSchedule) {
	      var apiAttendance = classSchedule.attendances[studentProfileId];
	      var localAttendance = attendances[key];

	      if (!apiAttendance || apiAttendance.revision === localAttendance.revision) {
	        classSchedulesObj[scheduleId].attendances[studentProfileId] = localAttendance;
	      } else {
	        delete attendances[key];
	      }
	    }
	  });

	  writeObjectToStorage('attendances', attendances);

	  return orderedScheduleIds.map(function (key) {
	    return classSchedulesObj[key];
	  });
	}

	exports.default = {
	  mergeLocalAttendances: mergeLocalAttendances,
	  writeAttendanceToStorage: writeAttendanceToStorage,
	  deleteAttendanceFromStorage: deleteAttendanceFromStorage
	};

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	function webpackBootstrapFunc (modules) {
	/******/  // The module cache
	/******/  var installedModules = {};

	/******/  // The require function
	/******/  function __webpack_require__(moduleId) {

	/******/    // Check if module is in cache
	/******/    if(installedModules[moduleId])
	/******/      return installedModules[moduleId].exports;

	/******/    // Create a new module (and put it into the cache)
	/******/    var module = installedModules[moduleId] = {
	/******/      i: moduleId,
	/******/      l: false,
	/******/      exports: {}
	/******/    };

	/******/    // Execute the module function
	/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/    // Flag the module as loaded
	/******/    module.l = true;

	/******/    // Return the exports of the module
	/******/    return module.exports;
	/******/  }

	/******/  // expose the modules object (__webpack_modules__)
	/******/  __webpack_require__.m = modules;

	/******/  // expose the module cache
	/******/  __webpack_require__.c = installedModules;

	/******/  // identity function for calling harmony imports with the correct context
	/******/  __webpack_require__.i = function(value) { return value; };

	/******/  // define getter function for harmony exports
	/******/  __webpack_require__.d = function(exports, name, getter) {
	/******/    if(!__webpack_require__.o(exports, name)) {
	/******/      Object.defineProperty(exports, name, {
	/******/        configurable: false,
	/******/        enumerable: true,
	/******/        get: getter
	/******/      });
	/******/    }
	/******/  };

	/******/  // getDefaultExport function for compatibility with non-harmony modules
	/******/  __webpack_require__.n = function(module) {
	/******/    var getter = module && module.__esModule ?
	/******/      function getDefault() { return module['default']; } :
	/******/      function getModuleExports() { return module; };
	/******/    __webpack_require__.d(getter, 'a', getter);
	/******/    return getter;
	/******/  };

	/******/  // Object.prototype.hasOwnProperty.call
	/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	/******/  // __webpack_public_path__
	/******/  __webpack_require__.p = "/";

	/******/  // on error function for async loading
	/******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

	  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE)
	  return f.default || f // try to call default if defined to also support babel esmodule exports
	}

	var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+'
	var dependencyRegExp = '\\((\/\\*.*?\\*\/)?\s?.*?(' + moduleNameReqExp + ').*?\\)' // additional chars when output.pathinfo is true

	// http://stackoverflow.com/a/2593661/130442
	function quoteRegExp (str) {
	  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
	}

	function getModuleDependencies (sources, module, queueName) {
	  var retval = {}
	  retval[queueName] = []

	  var fnString = module.toString()
	  var wrapperSignature = fnString.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/)
	  if (!wrapperSignature) return retval
	  var webpackRequireName = wrapperSignature[1]

	  // main bundle deps
	  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g')
	  var match
	  while ((match = re.exec(fnString))) {
	    if (match[3] === 'dll-reference') continue
	    retval[queueName].push(match[3])
	  }

	  // dll deps
	  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g')
	  while ((match = re.exec(fnString))) {
	    if (!sources[match[2]]) {
	      retval[queueName].push(match[1])
	      sources[match[2]] = __webpack_require__(match[1]).m
	    }
	    retval[match[2]] = retval[match[2]] || []
	    retval[match[2]].push(match[4])
	  }

	  return retval
	}

	function hasValuesInQueues (queues) {
	  var keys = Object.keys(queues)
	  return keys.reduce(function (hasValues, key) {
	    return hasValues || queues[key].length > 0
	  }, false)
	}

	function getRequiredModules (sources, moduleId) {
	  var modulesQueue = {
	    main: [moduleId]
	  }
	  var requiredModules = {
	    main: []
	  }
	  var seenModules = {
	    main: {}
	  }

	  while (hasValuesInQueues(modulesQueue)) {
	    var queues = Object.keys(modulesQueue)
	    for (var i = 0; i < queues.length; i++) {
	      var queueName = queues[i]
	      var queue = modulesQueue[queueName]
	      var moduleToCheck = queue.pop()
	      seenModules[queueName] = seenModules[queueName] || {}
	      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
	      seenModules[queueName][moduleToCheck] = true
	      requiredModules[queueName] = requiredModules[queueName] || []
	      requiredModules[queueName].push(moduleToCheck)
	      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName)
	      var newModulesKeys = Object.keys(newModules)
	      for (var j = 0; j < newModulesKeys.length; j++) {
	        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || []
	        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]])
	      }
	    }
	  }

	  return requiredModules
	}

	module.exports = function (moduleId, options) {
	  options = options || {}
	  var sources = {
	    main: __webpack_require__.m
	  }

	  var requiredModules = options.all ? { main: Object.keys(sources) } : getRequiredModules(sources, moduleId)

	  var src = ''

	  Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
	    var entryModule = 0
	    while (requiredModules[module][entryModule]) {
	      entryModule++
	    }
	    requiredModules[module].push(entryModule)
	    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'
	    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n'
	  })

	  src = src + '(' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '})(self);'

	  var blob = new window.Blob([src], { type: 'text/javascript' })
	  if (options.bare) { return blob }

	  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

	  var workerUrl = URL.createObjectURL(blob)
	  var worker = new window.Worker(workerUrl)
	  worker.objectURL = workerUrl

	  return worker
	}


/***/ },

/***/ 338:
/***/ function(module, exports) {

	'use strict';

	var actions = {
	  markAttendance: function markAttendance(attendance, poster, origin) {
	    this[attendance.id ? 'updateAttendance' : 'createAttendance'](attendance, poster, origin);
	  },
	  deleteAttendance: function deleteAttendance(attendance, poster, origin) {
	    var xhr = new XMLHttpRequest();

	    xhr.open('DELETE', origin + '/ui/schedule_attendances/' + attendance.id, false);
	    xhr.setRequestHeader('Content-Type', 'application/json');

	    try {
	      xhr.send(JSON.stringify({
	        revision: attendance.revision
	      }));
	    } catch (error) {
	      return poster({ attendance: attendance, status: 'error', type: 'deleteAttendanceReply' });
	    }

	    poster({ attendance: attendance, status: xhr.status, type: 'deleteAttendanceReply' });
	  },
	  updateAttendance: function updateAttendance(attendance, poster, origin) {
	    var xhr = new XMLHttpRequest();

	    xhr.open('PATCH', origin + '/ui/schedule_attendances/' + attendance.id, false);
	    xhr.setRequestHeader('Content-Type', 'application/json');

	    try {
	      xhr.send(JSON.stringify({
	        presence: attendance.presence,
	        revision: attendance.revision
	      }));
	    } catch (error) {
	      return poster({ attendance: attendance, status: 'error', type: 'updateAttendanceReply' });
	    }

	    poster({
	      attendance: attendance,
	      type: 'updateAttendanceReply',
	      status: xhr.status,
	      response: xhr.status === 200 && JSON.parse(xhr.responseText)
	    });
	  },
	  createAttendance: function createAttendance(attendance, poster, origin) {
	    var xhr = new XMLHttpRequest();

	    xhr.open('POST', origin + '/ui/schedule_attendances', false);
	    xhr.setRequestHeader('Content-Type', 'application/json');

	    try {
	      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	      xhr.send(JSON.stringify({
	        presence: attendance.presence,
	        class_schedule_id: attendance.scheduleId,
	        student_profile_id: attendance.studentProfileId
	      }));

	      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	    } catch (error) {
	      poster({ attendance: attendance, status: 'error', type: 'createAttendanceReply' });
	    }

	    poster({
	      attendance: attendance,
	      type: 'createAttendanceReply',
	      status: xhr.status,
	      response: xhr.status === 200 && JSON.parse(xhr.responseText)
	    });
	  }
	};

	module.exports = function worker(self) {
	  var poster = function poster(data) {
	    return self.postMessage(JSON.stringify(data));
	  };

	  self.addEventListener('message', function (event) {
	    var data = JSON.parse(event.data);

	    actions[data.type](data.attendance, poster, event.currentTarget.origin);
	  });
	};

/***/ }

});