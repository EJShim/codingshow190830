(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_get=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var TinyEmitter=require("./tiny-emitter"),MESSAGE_RESULT=0,MESSAGE_EVENT=1,RESULT_ERROR=0,RESULT_SUCCESS=1,DEFAULT_HANDLER="main",isPromise=function(e){return"object"===(void 0===e?"undefined":_typeof(e))&&"function"==typeof e.then&&"function"==typeof e.catch};function RegisterPromise(e){var t=_defineProperty({},DEFAULT_HANDLER,e),r=self.postMessage.bind(self),n=new(function(e){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return _inherits(n,TinyEmitter),_createClass(n,[{key:"emit",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return r({eventName:e,args:n}),this}},{key:"emitLocally",value:function(e){for(var t,r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];(t=_get(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"emit",this)).call.apply(t,[this,e].concat(o))}},{key:"operation",value:function(e,r){return t[e]=r,this}}]),n}()),o=function(e,r,n){var o=t[n||DEFAULT_HANDLER];if(!o)throw new Error("Not found handler for this request");return o(r,a.bind(null,e))},i=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r([MESSAGE_RESULT,e,t,n],o)},a=function(e,t,n){if(!t)throw new Error("eventName is required");if("string"!=typeof t)throw new Error("eventName should be string");r([MESSAGE_EVENT,e,t,n])};return self.addEventListener("message",function(e){var t=e.data;Array.isArray(t)?function(e,t,r){var n=function(t){t&&t instanceof TransferableResponse?i(e,RESULT_SUCCESS,t.payload,t.transferable):i(e,RESULT_SUCCESS,t)},a=function(t){i(e,RESULT_ERROR,{message:t.message,stack:t.stack})};try{var s=o(e,t,r);isPromise(s)?s.then(n).catch(a):n(s)}catch(e){a(e)}}.apply(void 0,_toConsumableArray(t)):t&&t.eventName&&n.emitLocally.apply(n,[t.eventName].concat(_toConsumableArray(t.args)))}),n}var TransferableResponse=function e(t,r){_classCallCheck(this,e),this.payload=t,this.transferable=r};module.exports=RegisterPromise,module.exports.TransferableResponse=TransferableResponse;

},{"./tiny-emitter":2}],2:[function(require,module,exports){
"use strict";var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var TinyEmitter=function(){function e(){_classCallCheck(this,e),Object.defineProperty(this,"__listeners",{value:{},enumerable:!1,writable:!1})}return _createClass(e,[{key:"emit",value:function(e){if(!this.__listeners[e])return this;for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var i=!0,s=!1,a=void 0;try{for(var l,o=this.__listeners[e][Symbol.iterator]();!(i=(l=o.next()).done);i=!0){l.value.apply(void 0,r)}}catch(e){s=!0,a=e}finally{try{!i&&o.return&&o.return()}finally{if(s)throw a}}return this}},{key:"once",value:function(e,t){var r=this,n=function n(){r.off(e,n),t.apply(void 0,arguments)};return this.on(e,n)}},{key:"on",value:function(e,t){return this.__listeners[e]||(this.__listeners[e]=[]),this.__listeners[e].push(t),this}},{key:"off",value:function(e,t){return this.__listeners[e]=t?this.__listeners[e].filter(function(e){return e!==t}):[],this}}]),e}();module.exports=TinyEmitter;

},{}],3:[function(require,module,exports){
"use strict";var Float32="float",Float64="double",SpacePrecisionType="double";module.exports={Float32:Float32,Float64:Float64,SpacePrecisionType:SpacePrecisionType};

},{}],4:[function(require,module,exports){
"use strict";var Text="Text",Binary="Binary",Image="Image",Mesh="Mesh",vtkPolyData="vtkPolyData";module.exports={Text:Text,Binary:Binary,Image:Image,Mesh:Mesh,vtkPolyData:vtkPolyData};

},{}],5:[function(require,module,exports){
"use strict";var Int8="int8_t",UInt8="uint8_t",Int16="int16_t",UInt16="uint16_t",Int32="int32_t",UInt32="uint32_t",Int64="int64_t",UInt64="uint64_t",SizeValueType=UInt64,IdentifierType=SizeValueType,IndexValueType=Int64,OffsetValueType=Int64;module.exports={Int8:Int8,UInt8:UInt8,Int16:Int16,UInt16:UInt16,Int32:Int32,UInt32:UInt32,Int64:Int64,UInt64:UInt64,SizeValueType:SizeValueType,IdentifierType:IdentifierType,IndexValueType:IndexValueType,OffsetValueType:OffsetValueType};

},{}],6:[function(require,module,exports){
"use strict";var _register=_interopRequireDefault(require("webworker-promise/lib/register")),_loadEmscriptenModuleBrowser=_interopRequireDefault(require("../loadEmscriptenModuleBrowser")),_runPipelineEmscripten=_interopRequireDefault(require("../runPipelineEmscripten")),_IOTypes=_interopRequireDefault(require("../IOTypes"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var pipelinePathToModule={},runPipeline=function(e,a,t,r,u){var i=null;e in pipelinePathToModule?i=pipelinePathToModule[e]:(pipelinePathToModule[e]=(0,_loadEmscriptenModuleBrowser.default)(u.itkModulesPath,"Pipelines",e),i=pipelinePathToModule[e]);var n=(0,_runPipelineEmscripten.default)(i,a,t,r),s=[];return n.outputs&&n.outputs.forEach(function(e){switch(e.type){case _IOTypes.default.Binary:e.data.buffer?s.push(e.data.buffer):e.data.byteLength&&s.push(e.data);break;case _IOTypes.default.Image:e.data.data.buffer?s.push(e.data.data.buffer):e.data.data.byteLength&&s.push(e.data.data);break;case _IOTypes.default.Mesh:e.data.points&&(e.data.points.buffer?s.push(e.data.points.buffer):e.data.points.byteLength&&s.push(e.data.points)),e.data.pointData&&(e.data.pointData.buffer?s.push(e.data.pointData.buffer):e.data.pointData.byteLength&&s.push(e.data.pointData)),e.data.cells&&(e.data.cells.buffer?s.push(e.data.cells.buffer):e.data.cells.byteLength&&s.push(e.data.cells)),e.data.cellData&&(e.data.cellData.buffer?s.push(e.data.cellData.buffer):e.data.cellData.byteLength&&s.push(e.data.cellData));break;case _IOTypes.default.vtkPolyData:var a=e.data;["points","verts","lines","polys","strips"].forEach(function(e){a[e]&&a[e].buffer&&s.push(a[e].buffer)});["pointData","cellData","fieldData"].forEach(function(e){a[e]&&a[e].arrays.forEach(function(e){e.data.buffer&&s.push(e.data.buffer)})})}}),new _register.default.TransferableResponse(n,s)};(0,_register.default)(function(e){return"runPipeline"===e.operation?Promise.resolve(runPipeline(e.pipelinePath,e.args,e.outputs,e.inputs,e.config)):Promise.resolve(new Error("Unknown worker operation"))});

},{"../IOTypes":4,"../loadEmscriptenModuleBrowser":8,"../runPipelineEmscripten":9,"webworker-promise/lib/register":1}],7:[function(require,module,exports){
"use strict";var IntTypes=require("./IntTypes.js"),FloatTypes=require("./FloatTypes.js"),bufferToTypedArray=function(e,r){var a=null;switch(e){case IntTypes.UInt8:a=new Uint8Array(r);break;case IntTypes.Int8:a=new Int8Array(r);break;case IntTypes.UInt16:a=new Uint16Array(r);break;case IntTypes.Int16:a=new Int16Array(r);break;case IntTypes.UInt32:a=new Uint32Array(r);break;case IntTypes.Int32:a=new Int32Array(r);break;case IntTypes.UInt64:case IntTypes.Int64:throw new Error("Type is not supported as a TypedArray");case FloatTypes.Float32:a=new Float32Array(r);break;case FloatTypes.Float64:a=new Float64Array(r);break;case"null":case null:a=null;break;default:throw new Error("Type is not supported as a TypedArray")}return a};module.exports=bufferToTypedArray;

},{"./FloatTypes.js":3,"./IntTypes.js":5}],8:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var loadEmscriptenModule=function(e,t,o){var r=e;"/"===e[0]||e.startsWith("http")||(r="..");var n=r+"/"+t+"/"+o+".js";return"object"===("undefined"==typeof WebAssembly?"undefined":_typeof(WebAssembly))&&"function"==typeof WebAssembly.Memory&&(n=r+"/"+t+"/"+o+"Wasm.js"),importScripts(n),Module},_default=loadEmscriptenModule;exports.default=_default;

},{}],9:[function(require,module,exports){
(function (global){
"use strict";var IOTypes=require("./IOTypes.js"),bufferToTypedArray=require("./bufferToTypedArray.js"),typedArrayForBuffer=function(e,a){return new("undefined"!=typeof window?window[e]:global[e])(a)},runPipelineEmscripten=function(e,a,r,t){t&&t.forEach(function(a){switch(a.type){case IOTypes.Text:case IOTypes.Binary:e.writeFile(a.path,a.data);break;case IOTypes.Image:var r={};for(var t in a.data)a.data.hasOwnProperty(t)&&"data"!==t&&(r[t]=a.data[t]);r.data=a.path+".data",e.writeFile(a.path,JSON.stringify(r)),e.writeFile(r.data,new Uint8Array(a.data.data.buffer));break;case IOTypes.Mesh:var n={};for(var i in a.data)a.data.hasOwnProperty(i)&&"points"!==i&&"pointData"!==i&&"cells"!==i&&"cellData"!==i&&(n[i]=a.data[i]);n.points=a.path+".points.data",n.pointData=a.path+".pointData.data",n.cells=a.path+".cells.data",n.cellData=a.path+".cellData.data",e.writeFile(a.path,JSON.stringify(n)),n.numberOfPoints&&e.writeFile(n.points,new Uint8Array(a.data.points.buffer)),n.numberOfPointPixels&&e.writeFile(n.pointData,new Uint8Array(a.data.pointData.buffer)),n.numberOfCells&&e.writeFile(n.cells,new Uint8Array(a.data.cells.buffer)),n.numberOfCellPixels&&e.writeFile(n.cellData,new Uint8Array(a.data.cellData.buffer));break;default:throw Error("Unsupported input IOType")}}),e.resetModuleStdout(),e.resetModuleStderr(),e.callMain(a);var n=e.getModuleStdout(),i=e.getModuleStderr(),p=[];return r&&r.forEach(function(a){var r={};switch(Object.assign(r,a),a.type){case IOTypes.Text:r.data=e.readFile(a.path,{encoding:"utf8"});break;case IOTypes.Binary:r.data=e.readFile(a.path,{encoding:"binary"});break;case IOTypes.Image:var t=e.readFile(a.path,{encoding:"utf8"}),n=JSON.parse(t),i=e.readFile(n.data,{encoding:"binary"});n.data=bufferToTypedArray(n.imageType.componentType,i.buffer),r.data=n;break;case IOTypes.Mesh:var o=e.readFile(a.path,{encoding:"utf8"}),f=JSON.parse(o);if(f.numberOfPoints){var l=e.readFile(f.points,{encoding:"binary"});f.points=bufferToTypedArray(f.meshType.pointComponentType,l.buffer)}else f.points=bufferToTypedArray(f.meshType.pointComponentType,new ArrayBuffer(0));if(f.numberOfPointPixels){var d=e.readFile(f.pointData,{encoding:"binary"});f.pointData=bufferToTypedArray(f.meshType.pointPixelComponentType,d.buffer)}else f.pointData=bufferToTypedArray(f.meshType.pointPixelComponentType,new ArrayBuffer(0));if(f.numberOfCells){var s=e.readFile(f.cells,{encoding:"binary"});f.cells=bufferToTypedArray(f.meshType.cellComponentType,s.buffer)}else f.cells=bufferToTypedArray(f.meshType.cellComponentType,new ArrayBuffer(0));if(f.numberOfCellPixels){var y=e.readFile(f.cellData,{encoding:"binary"});f.cellData=bufferToTypedArray(f.meshType.cellPixelComponentType,y.buffer)}else f.cellData=bufferToTypedArray(f.meshType.cellPixelComponentType,new ArrayBuffer(0));r.data=f;break;case IOTypes.vtkPolyData:var u=e.readFile("".concat(a.path,"/index.json"),{encoding:"utf8"}),c=JSON.parse(u);["points","verts","lines","polys","strips"].forEach(function(r){if(c[r]){var t=c[r];if(t.ref){var n=e.readFile("".concat(a.path,"/").concat(t.ref.basepath,"/").concat(t.ref.id),{encoding:"binary"});c[r].buffer=n.buffer,c[r].values=typedArrayForBuffer(c[r].dataType,n.buffer),delete t.ref}}});["pointData","cellData","fieldData"].forEach(function(r){c[r]&&c[r].arrays.forEach(function(r){if(r.data.ref){var t=e.readFile("".concat(a.path,"/").concat(r.data.ref.basepath,"/").concat(r.data.ref.id),{encoding:"binary"});r.data.buffer=t.buffer,r.data.values=typedArrayForBuffer(r.data.dataType,t.buffer),delete r.data.ref}})}),r.data=c;break;default:throw Error("Unsupported output IOType")}p.push(r)}),{stdout:n,stderr:i,outputs:p}};module.exports=runPipelineEmscripten;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./IOTypes.js":4,"./bufferToTypedArray.js":7}]},{},[6]);
