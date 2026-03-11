(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("eventemitter3")) : typeof define === "function" && define.amd ? define(["exports", "eventemitter3"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.ROSLIB = {}, global2.EventEmitter3));
})(this, function(exports2, eventemitter3) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  class Topic extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.name - The topic name, like '/cmd_vel'.
     * @param {string} options.messageType - The message type, like 'std_msgs/String'.
     * @param {string} [options.compression=none] - The type of compression to use, like 'png', 'cbor', or 'cbor-raw'.
     * @param {number} [options.throttle_rate=0] - The rate (in ms in between messages) at which to throttle the topics.
     * @param {number} [options.queue_size=100] - The queue created at bridge side for re-publishing webtopics.
     * @param {boolean} [options.latch=false] - Latch the topic when publishing.
     * @param {number} [options.queue_length=0] - The queue length at bridge side used when subscribing.
     * @param {boolean} [options.reconnect_on_close=true] - The flag to enable resubscription and readvertisement on close event.
     */
    constructor(options) {
      super();
      /** @type {boolean | undefined} */
      __publicField(this, "waitForReconnect");
      /** @type {(() => void) | undefined} */
      __publicField(this, "reconnectFunc");
      __publicField(this, "isAdvertised", false);
      __publicField(this, "_messageCallback", (data) => {
        this.emit("message", data);
      });
      this.ros = options.ros;
      this.name = options.name;
      this.messageType = options.messageType;
      this.compression = options.compression || "none";
      this.throttle_rate = options.throttle_rate || 0;
      this.latch = options.latch || false;
      this.queue_size = options.queue_size || 100;
      this.queue_length = options.queue_length || 0;
      this.reconnect_on_close = options.reconnect_on_close !== void 0 ? options.reconnect_on_close : true;
      if (this.compression && this.compression !== "png" && this.compression !== "cbor" && this.compression !== "cbor-raw" && this.compression !== "none") {
        this.emit(
          "warning",
          this.compression + " compression is not supported. No compression will be used."
        );
        this.compression = "none";
      }
      if (this.throttle_rate < 0) {
        this.emit("warning", this.throttle_rate + " is not allowed. Set to 0");
        this.throttle_rate = 0;
      }
      if (this.reconnect_on_close) {
        this.callForSubscribeAndAdvertise = (message) => {
          this.ros.callOnConnection(message);
          this.waitForReconnect = false;
          this.reconnectFunc = () => {
            if (!this.waitForReconnect) {
              this.waitForReconnect = true;
              this.ros.callOnConnection(message);
              this.ros.once("connection", () => {
                this.waitForReconnect = false;
              });
            }
          };
          this.ros.on("close", this.reconnectFunc);
        };
      } else {
        this.callForSubscribeAndAdvertise = this.ros.callOnConnection;
      }
    }
    /**
     * @callback subscribeCallback
     * @param {T} message - The published message.
     */
    /**
     * Every time a message is published for the given topic, the callback
     * will be called with the message object.
     *
     * @param {subscribeCallback} callback - Function with the following params:
     */
    subscribe(callback) {
      if (typeof callback === "function") {
        this.on("message", callback);
      }
      if (this.subscribeId) {
        return;
      }
      this.ros.on(this.name, this._messageCallback);
      this.subscribeId = "subscribe:" + this.name + ":" + (++this.ros.idCounter).toString();
      this.callForSubscribeAndAdvertise({
        op: "subscribe",
        id: this.subscribeId,
        type: this.messageType,
        topic: this.name,
        compression: this.compression,
        throttle_rate: this.throttle_rate,
        queue_length: this.queue_length
      });
    }
    /**
     * Unregister as a subscriber for the topic. Unsubscribing will stop
     * and remove all subscribe callbacks. To remove a callback, you must
     * explicitly pass the callback function in.
     *
     * @param {import('eventemitter3').EventEmitter.ListenerFn} [callback] - The callback to unregister, if
     *     provided and other listeners are registered the topic won't
     *     unsubscribe, just stop emitting to the passed listener.
     */
    unsubscribe(callback) {
      if (callback) {
        this.off("message", callback);
        if (this.listeners("message").length) {
          return;
        }
      }
      if (!this.subscribeId) {
        return;
      }
      this.ros.off(this.name, this._messageCallback);
      if (this.reconnect_on_close) {
        this.ros.off("close", this.reconnectFunc);
      }
      this.emit("unsubscribe");
      this.ros.callOnConnection({
        op: "unsubscribe",
        id: this.subscribeId,
        topic: this.name
      });
      this.subscribeId = null;
    }
    /**
     * Register as a publisher for the topic.
     */
    advertise() {
      if (this.isAdvertised) {
        return;
      }
      this.advertiseId = "advertise:" + this.name + ":" + (++this.ros.idCounter).toString();
      this.callForSubscribeAndAdvertise({
        op: "advertise",
        id: this.advertiseId,
        type: this.messageType,
        topic: this.name,
        latch: this.latch,
        queue_size: this.queue_size
      });
      this.isAdvertised = true;
      if (!this.reconnect_on_close) {
        this.ros.on("close", () => {
          this.isAdvertised = false;
        });
      }
    }
    /**
     * Unregister as a publisher for the topic.
     */
    unadvertise() {
      if (!this.isAdvertised) {
        return;
      }
      if (this.reconnect_on_close) {
        this.ros.off("close", this.reconnectFunc);
      }
      this.emit("unadvertise");
      this.ros.callOnConnection({
        op: "unadvertise",
        id: this.advertiseId,
        topic: this.name
      });
      this.isAdvertised = false;
    }
    /**
     * Publish the message.
     *
     * @param {T} message - The message to publish.
     */
    publish(message) {
      if (!this.isAdvertised) {
        this.advertise();
      }
      this.ros.idCounter++;
      var call = {
        op: "publish",
        id: "publish:" + this.name + ":" + this.ros.idCounter,
        topic: this.name,
        msg: message,
        latch: this.latch
      };
      this.ros.callOnConnection(call);
    }
  }
  class SimpleActionServer extends eventemitter3.EventEmitter {
    // the one this'll be preempting
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.serverName - The action server name, like '/fibonacci'.
     * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
     */
    constructor(options) {
      super();
      // needed for handling preemption prompted by a new goal being received
      /** @type {{goal_id: {id: any, stamp: any}, goal: any} | null} */
      __publicField(this, "currentGoal", null);
      // currently tracked goal
      /** @type {{goal_id: {id: any, stamp: any}, goal: any} | null} */
      __publicField(this, "nextGoal", null);
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName;
      this.feedbackPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + "/feedback",
        messageType: this.actionName + "Feedback"
      });
      this.feedbackPublisher.advertise();
      var statusPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + "/status",
        messageType: "actionlib_msgs/GoalStatusArray"
      });
      statusPublisher.advertise();
      this.resultPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + "/result",
        messageType: this.actionName + "Result"
      });
      this.resultPublisher.advertise();
      var goalListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/goal",
        messageType: this.actionName + "Goal"
      });
      var cancelListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/cancel",
        messageType: "actionlib_msgs/GoalID"
      });
      this.statusMessage = {
        header: {
          stamp: { secs: 0, nsecs: 100 },
          frame_id: ""
        },
        /** @type {{goal_id: any, status: number}[]} */
        status_list: []
      };
      goalListener.subscribe((goalMessage) => {
        if (this.currentGoal) {
          this.nextGoal = goalMessage;
          this.emit("cancel");
        } else {
          this.statusMessage.status_list = [{ goal_id: goalMessage.goal_id, status: 1 }];
          this.currentGoal = goalMessage;
          this.emit("goal", goalMessage.goal);
        }
      });
      var isEarlier = function(t1, t2) {
        if (t1.secs > t2.secs) {
          return false;
        } else if (t1.secs < t2.secs) {
          return true;
        } else if (t1.nsecs < t2.nsecs) {
          return true;
        } else {
          return false;
        }
      };
      cancelListener.subscribe((cancelMessage) => {
        if (cancelMessage.stamp.secs === 0 && cancelMessage.stamp.secs === 0 && cancelMessage.id === "") {
          this.nextGoal = null;
          if (this.currentGoal) {
            this.emit("cancel");
          }
        } else {
          if (this.currentGoal && cancelMessage.id === this.currentGoal.goal_id.id) {
            this.emit("cancel");
          } else if (this.nextGoal && cancelMessage.id === this.nextGoal.goal_id.id) {
            this.nextGoal = null;
          }
          if (this.nextGoal && isEarlier(this.nextGoal.goal_id.stamp, cancelMessage.stamp)) {
            this.nextGoal = null;
          }
          if (this.currentGoal && isEarlier(this.currentGoal.goal_id.stamp, cancelMessage.stamp)) {
            this.emit("cancel");
          }
        }
      });
      setInterval(() => {
        var currentTime = /* @__PURE__ */ new Date();
        var secs = Math.floor(currentTime.getTime() / 1e3);
        var nsecs = Math.round(
          1e9 * (currentTime.getTime() / 1e3 - secs)
        );
        this.statusMessage.header.stamp.secs = secs;
        this.statusMessage.header.stamp.nsecs = nsecs;
        statusPublisher.publish(this.statusMessage);
      }, 500);
    }
    /**
     * Set action state to succeeded and return to client.
     *
     * @param {Object} result - The result to return to the client.
     */
    setSucceeded(result) {
      if (this.currentGoal !== null) {
        var resultMessage = {
          status: { goal_id: this.currentGoal.goal_id, status: 3 },
          result
        };
        this.resultPublisher.publish(resultMessage);
        this.statusMessage.status_list = [];
        if (this.nextGoal) {
          this.currentGoal = this.nextGoal;
          this.nextGoal = null;
          this.emit("goal", this.currentGoal.goal);
        } else {
          this.currentGoal = null;
        }
      }
    }
    /**
     * Set action state to aborted and return to client.
     *
     * @param {Object} result - The result to return to the client.
     */
    setAborted(result) {
      if (this.currentGoal !== null) {
        var resultMessage = {
          status: { goal_id: this.currentGoal.goal_id, status: 4 },
          result
        };
        this.resultPublisher.publish(resultMessage);
        this.statusMessage.status_list = [];
        if (this.nextGoal) {
          this.currentGoal = this.nextGoal;
          this.nextGoal = null;
          this.emit("goal", this.currentGoal.goal);
        } else {
          this.currentGoal = null;
        }
      }
    }
    /**
     * Send a feedback message.
     *
     * @param {Object} feedback - The feedback to send to the client.
     */
    sendFeedback(feedback) {
      if (this.currentGoal !== null) {
        var feedbackMessage = {
          status: { goal_id: this.currentGoal.goal_id, status: 1 },
          feedback
        };
        this.feedbackPublisher.publish(feedbackMessage);
      }
    }
    /**
     * Handle case where client requests preemption.
     */
    setPreempted() {
      if (this.currentGoal !== null) {
        this.statusMessage.status_list = [];
        var resultMessage = {
          status: { goal_id: this.currentGoal.goal_id, status: 2 }
        };
        this.resultPublisher.publish(resultMessage);
        if (this.nextGoal) {
          this.currentGoal = this.nextGoal;
          this.nextGoal = null;
          this.emit("goal", this.currentGoal.goal);
        } else {
          this.currentGoal = null;
        }
      }
    }
  }
  class Goal extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {ActionClient} options.actionClient - The ROSLIB.ActionClient to use with this goal.
     * @param {Object} options.goalMessage - The JSON object containing the goal for the action server.
     * @param {string} [options.goalID] - A string ID for the goal. Leave empty to auto-generate a goal ID.
     */
    constructor(options) {
      super();
      __publicField(this, "isFinished", false);
      __publicField(this, "status");
      __publicField(this, "result");
      __publicField(this, "feedback");
      this.actionClient = options.actionClient;
      this.goalID = options.goalID || "goal_" + Math.random() + "_" + (/* @__PURE__ */ new Date()).getTime();
      this.goalMessage = {
        goal_id: {
          stamp: {
            secs: 0,
            nsecs: 0
          },
          id: this.goalID
        },
        goal: options.goalMessage
      };
      this.on("status", (status) => {
        this.status = status;
      });
      this.on("result", (result) => {
        this.isFinished = true;
        this.result = result;
      });
      this.on("feedback", (feedback) => {
        this.feedback = feedback;
      });
      this.actionClient.goals[this.goalID] = this;
    }
    /**
     * Send the goal to the action server.
     *
     * @param {number} [timeout] - A timeout length for the goal's result.
     */
    send(timeout) {
      this.actionClient.goalTopic.publish(this.goalMessage);
      if (timeout) {
        setTimeout(() => {
          if (!this.isFinished) {
            this.emit("timeout");
          }
        }, timeout);
      }
    }
    /**
     * Cancel the current goal.
     */
    cancel() {
      var cancelMessage = {
        id: this.goalID
      };
      this.actionClient.cancelTopic.publish(cancelMessage);
    }
  }
  class Service extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.name - The service name, like '/add_two_ints'.
     * @param {string} options.serviceType - The service type, like 'rospy_tutorials/AddTwoInts'.
     */
    constructor(options) {
      super();
      /**
         * Stores a reference to the most recent service callback advertised so it can be removed from the EventEmitter during un-advertisement
         * @private
         * @type {((rosbridgeRequest) => any) | null}
         */
      __publicField(this, "_serviceCallback", null);
      __publicField(this, "isAdvertised", false);
      this.ros = options.ros;
      this.name = options.name;
      this.serviceType = options.serviceType;
    }
    /**
     * @callback callServiceCallback
     *  @param {TResponse} response - The response from the service request.
     */
    /**
     * @callback callServiceFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Call the service. Returns the service response in the
     * callback. Does nothing if this service is currently advertised.
     *
     * @param {TRequest} request - The service request to send.
     * @param {callServiceCallback} [callback] - Function with the following params:
     * @param {callServiceFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    callService(request, callback, failedCallback) {
      if (this.isAdvertised) {
        return;
      }
      var serviceCallId = "call_service:" + this.name + ":" + (++this.ros.idCounter).toString();
      if (callback || failedCallback) {
        this.ros.once(serviceCallId, function(message) {
          if (message.result !== void 0 && message.result === false) {
            if (typeof failedCallback === "function") {
              failedCallback(message.values);
            }
          } else if (typeof callback === "function") {
            callback(message.values);
          }
        });
      }
      var call = {
        op: "call_service",
        id: serviceCallId,
        service: this.name,
        type: this.serviceType,
        args: request
      };
      this.ros.callOnConnection(call);
    }
    /**
     * @callback advertiseCallback
     * @param {TRequest} request - The service request.
     * @param {Partial<TResponse>} response - An empty dictionary. Take care not to overwrite this. Instead, only modify the values within.
     * @returns {boolean} true if the service has finished successfully, i.e., without any fatal errors.
     */
    /**
     * Advertise the service. This turns the Service object from a client
     * into a server. The callback will be called with every request
     * that's made on this service.
     *
     * @param {advertiseCallback} callback - This works similarly to the callback for a C++ service and should take the following params
     */
    advertise(callback) {
      if (this.isAdvertised) {
        throw new Error("Cannot advertise the same Service twice!");
      }
      this._serviceCallback = (rosbridgeRequest) => {
        var response = {};
        var success = callback(rosbridgeRequest.args, response);
        var call = {
          op: "service_response",
          service: this.name,
          values: response,
          result: success
        };
        if (rosbridgeRequest.id) {
          call.id = rosbridgeRequest.id;
        }
        this.ros.callOnConnection(call);
      };
      this.ros.on(this.name, this._serviceCallback);
      this.ros.callOnConnection({
        op: "advertise_service",
        type: this.serviceType,
        service: this.name
      });
      this.isAdvertised = true;
    }
    unadvertise() {
      if (!this.isAdvertised) {
        throw new Error(`Tried to un-advertise service ${this.name}, but it was not advertised!`);
      }
      this.ros.callOnConnection({
        op: "unadvertise_service",
        service: this.name
      });
      if (this._serviceCallback) {
        this.ros.off(this.name, this._serviceCallback);
      }
      this.isAdvertised = false;
    }
    /**
     * An alternate form of Service advertisement that supports a modern Promise-based interface for use with async/await.
     * @param {(request: TRequest) => Promise<TResponse>} callback An asynchronous callback processing the request and returning a response.
     */
    advertiseAsync(callback) {
      if (this.isAdvertised) {
        throw new Error("Cannot advertise the same Service twice!");
      }
      this._serviceCallback = async (rosbridgeRequest) => {
        let rosbridgeResponse = {
          op: "service_response",
          service: this.name,
          result: false
        };
        try {
          rosbridgeResponse.values = await callback(rosbridgeRequest.args);
          rosbridgeResponse.result = true;
        } finally {
          if (rosbridgeRequest.id) {
            rosbridgeResponse.id = rosbridgeRequest.id;
          }
          this.ros.callOnConnection(rosbridgeResponse);
        }
      };
      this.ros.on(this.name, this._serviceCallback);
      this.ros.callOnConnection({
        op: "advertise_service",
        type: this.serviceType,
        service: this.name
      });
      this.isAdvertised = true;
    }
  }
  class Quaternion {
    /**
     * @param {Object} [options]
     * @param {number|null} [options.x=0] - The x value.
     * @param {number|null} [options.y=0] - The y value.
     * @param {number|null} [options.z=0] - The z value.
     * @param {number|null} [options.w=1] - The w value.
     */
    constructor(options) {
      options = options || {};
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.z = options.z || 0;
      this.w = typeof options.w === "number" ? options.w : 1;
    }
    /**
     * Perform a conjugation on this quaternion.
     */
    conjugate() {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
    }
    /**
     * Return the norm of this quaternion.
     */
    norm() {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    /**
     * Perform a normalization on this quaternion.
     */
    normalize() {
      var l = Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
      if (l === 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
      } else {
        l = 1 / l;
        this.x = this.x * l;
        this.y = this.y * l;
        this.z = this.z * l;
        this.w = this.w * l;
      }
    }
    /**
     * Convert this quaternion into its inverse.
     */
    invert() {
      this.conjugate();
      this.normalize();
    }
    /**
     * Set the values of this quaternion to the product of itself and the given quaternion.
     *
     * @param {Quaternion} q - The quaternion to multiply with.
     */
    multiply(q) {
      var newX = this.x * q.w + this.y * q.z - this.z * q.y + this.w * q.x;
      var newY = -this.x * q.z + this.y * q.w + this.z * q.x + this.w * q.y;
      var newZ = this.x * q.y - this.y * q.x + this.z * q.w + this.w * q.z;
      var newW = -this.x * q.x - this.y * q.y - this.z * q.z + this.w * q.w;
      this.x = newX;
      this.y = newY;
      this.z = newZ;
      this.w = newW;
    }
    /**
     * Clone a copy of this quaternion.
     *
     * @returns {Quaternion} The cloned quaternion.
     */
    clone() {
      return new Quaternion(this);
    }
  }
  class Vector3 {
    /**
     * @param {Object} [options]
     * @param {number} [options.x=0] - The x value.
     * @param {number} [options.y=0] - The y value.
     * @param {number} [options.z=0] - The z value.
     */
    constructor(options) {
      options = options || {};
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.z = options.z || 0;
    }
    /**
     * Set the values of this vector to the sum of itself and the given vector.
     *
     * @param {Vector3} v - The vector to add with.
     */
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    }
    /**
     * Set the values of this vector to the difference of itself and the given vector.
     *
     * @param {Vector3} v - The vector to subtract with.
     */
    subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    }
    /**
     * Multiply the given Quaternion with this vector.
     *
     * @param {Quaternion} q - The quaternion to multiply with.
     */
    multiplyQuaternion(q) {
      var ix = q.w * this.x + q.y * this.z - q.z * this.y;
      var iy = q.w * this.y + q.z * this.x - q.x * this.z;
      var iz = q.w * this.z + q.x * this.y - q.y * this.x;
      var iw = -q.x * this.x - q.y * this.y - q.z * this.z;
      this.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
      this.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
      this.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
    }
    /**
     * Clone a copy of this vector.
     *
     * @returns {Vector3} The cloned vector.
     */
    clone() {
      return new Vector3(this);
    }
  }
  class Transform {
    /**
     * @param {Object} options
     * @param {Vector3} options.translation - The ROSLIB.Vector3 describing the translation.
     * @param {Quaternion} options.rotation - The ROSLIB.Quaternion describing the rotation.
     */
    constructor(options) {
      this.translation = new Vector3(options.translation);
      this.rotation = new Quaternion(options.rotation);
    }
    /**
     * Clone a copy of this transform.
     *
     * @returns {Transform} The cloned transform.
     */
    clone() {
      return new Transform(this);
    }
  }
  class TFClient extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} [options.fixedFrame=base_link] - The fixed frame.
     * @param {number} [options.angularThres=2.0] - The angular threshold for the TF republisher.
     * @param {number} [options.transThres=0.01] - The translation threshold for the TF republisher.
     * @param {number} [options.rate=10.0] - The rate for the TF republisher.
     * @param {number} [options.updateDelay=50] - The time (in ms) to wait after a new subscription
     *     to update the TF republisher's list of TFs.
     * @param {number} [options.topicTimeout=2.0] - The timeout parameter for the TF republisher.
     * @param {string} [options.serverName="/tf2_web_republisher"] - The name of the tf2_web_republisher server.
     * @param {string} [options.repubServiceName="/republish_tfs"] - The name of the republish_tfs service (non groovy compatibility mode only).
     */
    constructor(options) {
      super();
      /** @type {Goal|false} */
      __publicField(this, "currentGoal", false);
      /** @type {Topic|false} */
      __publicField(this, "currentTopic", false);
      __publicField(this, "frameInfos", {});
      __publicField(this, "republisherUpdateRequested", false);
      /** @type {((tf: any) => any) | undefined} */
      __publicField(this, "_subscribeCB");
      __publicField(this, "_isDisposed", false);
      this.ros = options.ros;
      this.fixedFrame = options.fixedFrame || "base_link";
      this.angularThres = options.angularThres || 2;
      this.transThres = options.transThres || 0.01;
      this.rate = options.rate || 10;
      this.updateDelay = options.updateDelay || 50;
      var seconds = options.topicTimeout || 2;
      var secs = Math.floor(seconds);
      var nsecs = Math.floor((seconds - secs) * 1e9);
      this.topicTimeout = {
        secs,
        nsecs
      };
      this.serverName = options.serverName || "/tf2_web_republisher";
      this.repubServiceName = options.repubServiceName || "/republish_tfs";
      this.actionClient = new ActionClient({
        ros: options.ros,
        serverName: this.serverName,
        actionName: "tf2_web_republisher/TFSubscriptionAction",
        omitStatus: true,
        omitResult: true
      });
      this.serviceClient = new Service({
        ros: options.ros,
        name: this.repubServiceName,
        serviceType: "tf2_web_republisher/RepublishTFs"
      });
    }
    /**
     * Process the incoming TF message and send them out using the callback
     * functions.
     *
     * @param {Object} tf - The TF message from the server.
     */
    processTFArray(tf) {
      tf.transforms.forEach((transform) => {
        var frameID = transform.child_frame_id;
        if (frameID[0] === "/") {
          frameID = frameID.substring(1);
        }
        var info = this.frameInfos[frameID];
        if (info) {
          info.transform = new Transform({
            translation: transform.transform.translation,
            rotation: transform.transform.rotation
          });
          info.cbs.forEach((cb) => {
            cb(info.transform);
          });
        }
      }, this);
    }
    /**
     * Create and send a new goal (or service request) to the tf2_web_republisher
     * based on the current list of TFs.
     */
    updateGoal() {
      var goalMessage = {
        source_frames: Object.keys(this.frameInfos),
        target_frame: this.fixedFrame,
        angular_thres: this.angularThres,
        trans_thres: this.transThres,
        rate: this.rate
      };
      if (this.ros.groovyCompatibility) {
        if (this.currentGoal) {
          this.currentGoal.cancel();
        }
        this.currentGoal = new Goal({
          actionClient: this.actionClient,
          goalMessage
        });
        this.currentGoal.on("feedback", this.processTFArray.bind(this));
        this.currentGoal.send();
      } else {
        goalMessage.timeout = this.topicTimeout;
        this.serviceClient.callService(goalMessage, this.processResponse.bind(this));
      }
      this.republisherUpdateRequested = false;
    }
    /**
     * Process the service response and subscribe to the tf republisher
     * topic.
     *
     * @param {Object} response - The service response containing the topic name.
     */
    processResponse(response) {
      if (this._isDisposed) {
        return;
      }
      if (this.currentTopic) {
        this.currentTopic.unsubscribe(this._subscribeCB);
      }
      this.currentTopic = new Topic({
        ros: this.ros,
        name: response.topic_name,
        messageType: "tf2_web_republisher/TFArray"
      });
      this._subscribeCB = this.processTFArray.bind(this);
      this.currentTopic.subscribe(this._subscribeCB);
    }
    /**
     * @callback subscribeCallback
     * @param {Transform} callback.transform - The transform data.
     */
    /**
     * Subscribe to the given TF frame.
     *
     * @param {string} frameID - The TF frame to subscribe to.
     * @param {subscribeCallback} callback - Function with the following params:
     */
    subscribe(frameID, callback) {
      if (frameID[0] === "/") {
        frameID = frameID.substring(1);
      }
      if (!this.frameInfos[frameID]) {
        this.frameInfos[frameID] = {
          cbs: []
        };
        if (!this.republisherUpdateRequested) {
          setTimeout(this.updateGoal.bind(this), this.updateDelay);
          this.republisherUpdateRequested = true;
        }
      } else if (this.frameInfos[frameID].transform) {
        callback(this.frameInfos[frameID].transform);
      }
      this.frameInfos[frameID].cbs.push(callback);
    }
    /**
     * Unsubscribe from the given TF frame.
     *
     * @param {string} frameID - The TF frame to unsubscribe from.
     * @param {function} callback - The callback function to remove.
     */
    unsubscribe(frameID, callback) {
      if (frameID[0] === "/") {
        frameID = frameID.substring(1);
      }
      var info = this.frameInfos[frameID];
      for (var cbs = info && info.cbs || [], idx = cbs.length; idx--; ) {
        if (cbs[idx] === callback) {
          cbs.splice(idx, 1);
        }
      }
      if (!callback || cbs.length === 0) {
        delete this.frameInfos[frameID];
      }
    }
    /**
     * Unsubscribe and unadvertise all topics associated with this TFClient.
     */
    dispose() {
      this._isDisposed = true;
      this.actionClient.dispose();
      if (this.currentTopic) {
        this.currentTopic.unsubscribe(this._subscribeCB);
      }
    }
  }
  class Param {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.name - The param name, like max_vel_x.
     */
    constructor(options) {
      this.ros = options.ros;
      this.name = options.name;
    }
    /**
     * @callback getCallback
     * @param {Object} value - The value of the param from ROS.
     */
    /**
     * @callback getFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Fetch the value of the param.
     *
     * @param {getCallback} callback - The callback function.
     * @param {getFailedCallback} [failedCallback] - The callback function when the service call failed.
     */
    get(callback, failedCallback) {
      var paramClient = new Service({
        ros: this.ros,
        name: "/rosapi/get_param",
        serviceType: "rosapi/GetParam"
      });
      var request = { name: this.name };
      paramClient.callService(
        request,
        function(result) {
          var value = JSON.parse(result.value);
          callback(value);
        },
        failedCallback
      );
    }
    /**
     * @callback setParamCallback
     * @param {Object} response - The response from the service request.
     */
    /**
     * @callback setParamFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Set the value of the param in ROS.
     *
     * @param {Object} value - The value to set param to.
     * @param {setParamCallback} [callback] - The callback function.
     * @param {setParamFailedCallback} [failedCallback] - The callback function when the service call failed.
     */
    set(value, callback, failedCallback) {
      var paramClient = new Service({
        ros: this.ros,
        name: "/rosapi/set_param",
        serviceType: "rosapi/SetParam"
      });
      var request = {
        name: this.name,
        value: JSON.stringify(value)
      };
      paramClient.callService(request, callback, failedCallback);
    }
    /**
     * Delete this parameter on the ROS server.
     *
     * @param {setParamCallback} callback - The callback function.
     * @param {setParamFailedCallback} [failedCallback] - The callback function when the service call failed.
     */
    delete(callback, failedCallback) {
      var paramClient = new Service({
        ros: this.ros,
        name: "/rosapi/delete_param",
        serviceType: "rosapi/DeleteParam"
      });
      var request = {
        name: this.name
      };
      paramClient.callService(request, callback, failedCallback);
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs$1(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var cbor = { exports: {} };
  (function(module2) {
    (function(global2, undefined$12) {
      var POW_2_24 = Math.pow(2, -24), POW_2_32 = Math.pow(2, 32), POW_2_53 = Math.pow(2, 53);
      function encode(value) {
        var data = new ArrayBuffer(256);
        var dataView = new DataView(data);
        var lastLength;
        var offset = 0;
        function ensureSpace(length) {
          var newByteLength = data.byteLength;
          var requiredLength = offset + length;
          while (newByteLength < requiredLength)
            newByteLength *= 2;
          if (newByteLength !== data.byteLength) {
            var oldDataView = dataView;
            data = new ArrayBuffer(newByteLength);
            dataView = new DataView(data);
            var uint32count = offset + 3 >> 2;
            for (var i3 = 0; i3 < uint32count; ++i3)
              dataView.setUint32(i3 * 4, oldDataView.getUint32(i3 * 4));
          }
          lastLength = length;
          return dataView;
        }
        function write() {
          offset += lastLength;
        }
        function writeFloat64(value2) {
          write(ensureSpace(8).setFloat64(offset, value2));
        }
        function writeUint8(value2) {
          write(ensureSpace(1).setUint8(offset, value2));
        }
        function writeUint8Array(value2) {
          var dataView2 = ensureSpace(value2.length);
          for (var i3 = 0; i3 < value2.length; ++i3)
            dataView2.setUint8(offset + i3, value2[i3]);
          write();
        }
        function writeUint16(value2) {
          write(ensureSpace(2).setUint16(offset, value2));
        }
        function writeUint32(value2) {
          write(ensureSpace(4).setUint32(offset, value2));
        }
        function writeUint64(value2) {
          var low = value2 % POW_2_32;
          var high = (value2 - low) / POW_2_32;
          var dataView2 = ensureSpace(8);
          dataView2.setUint32(offset, high);
          dataView2.setUint32(offset + 4, low);
          write();
        }
        function writeTypeAndLength(type2, length) {
          if (length < 24) {
            writeUint8(type2 << 5 | length);
          } else if (length < 256) {
            writeUint8(type2 << 5 | 24);
            writeUint8(length);
          } else if (length < 65536) {
            writeUint8(type2 << 5 | 25);
            writeUint16(length);
          } else if (length < 4294967296) {
            writeUint8(type2 << 5 | 26);
            writeUint32(length);
          } else {
            writeUint8(type2 << 5 | 27);
            writeUint64(length);
          }
        }
        function encodeItem(value2) {
          var i3;
          if (value2 === false)
            return writeUint8(244);
          if (value2 === true)
            return writeUint8(245);
          if (value2 === null)
            return writeUint8(246);
          if (value2 === undefined$12)
            return writeUint8(247);
          switch (typeof value2) {
            case "number":
              if (Math.floor(value2) === value2) {
                if (0 <= value2 && value2 <= POW_2_53)
                  return writeTypeAndLength(0, value2);
                if (-POW_2_53 <= value2 && value2 < 0)
                  return writeTypeAndLength(1, -(value2 + 1));
              }
              writeUint8(251);
              return writeFloat64(value2);
            case "string":
              var utf8data = [];
              for (i3 = 0; i3 < value2.length; ++i3) {
                var charCode = value2.charCodeAt(i3);
                if (charCode < 128) {
                  utf8data.push(charCode);
                } else if (charCode < 2048) {
                  utf8data.push(192 | charCode >> 6);
                  utf8data.push(128 | charCode & 63);
                } else if (charCode < 55296) {
                  utf8data.push(224 | charCode >> 12);
                  utf8data.push(128 | charCode >> 6 & 63);
                  utf8data.push(128 | charCode & 63);
                } else {
                  charCode = (charCode & 1023) << 10;
                  charCode |= value2.charCodeAt(++i3) & 1023;
                  charCode += 65536;
                  utf8data.push(240 | charCode >> 18);
                  utf8data.push(128 | charCode >> 12 & 63);
                  utf8data.push(128 | charCode >> 6 & 63);
                  utf8data.push(128 | charCode & 63);
                }
              }
              writeTypeAndLength(3, utf8data.length);
              return writeUint8Array(utf8data);
            default:
              var length;
              if (Array.isArray(value2)) {
                length = value2.length;
                writeTypeAndLength(4, length);
                for (i3 = 0; i3 < length; ++i3)
                  encodeItem(value2[i3]);
              } else if (value2 instanceof Uint8Array) {
                writeTypeAndLength(2, value2.length);
                writeUint8Array(value2);
              } else {
                var keys = Object.keys(value2);
                length = keys.length;
                writeTypeAndLength(5, length);
                for (i3 = 0; i3 < length; ++i3) {
                  var key = keys[i3];
                  encodeItem(key);
                  encodeItem(value2[key]);
                }
              }
          }
        }
        encodeItem(value);
        if ("slice" in data)
          return data.slice(0, offset);
        var ret = new ArrayBuffer(offset);
        var retView = new DataView(ret);
        for (var i2 = 0; i2 < offset; ++i2)
          retView.setUint8(i2, dataView.getUint8(i2));
        return ret;
      }
      function decode(data, tagger, simpleValue) {
        var dataView = new DataView(data);
        var offset = 0;
        if (typeof tagger !== "function")
          tagger = function(value) {
            return value;
          };
        if (typeof simpleValue !== "function")
          simpleValue = function() {
            return undefined$12;
          };
        function read(value, length) {
          offset += length;
          return value;
        }
        function readArrayBuffer(length) {
          return read(new Uint8Array(data, offset, length), length);
        }
        function readFloat16() {
          var tempArrayBuffer = new ArrayBuffer(4);
          var tempDataView = new DataView(tempArrayBuffer);
          var value = readUint16();
          var sign2 = value & 32768;
          var exponent = value & 31744;
          var fraction = value & 1023;
          if (exponent === 31744)
            exponent = 255 << 10;
          else if (exponent !== 0)
            exponent += 127 - 15 << 10;
          else if (fraction !== 0)
            return fraction * POW_2_24;
          tempDataView.setUint32(0, sign2 << 16 | exponent << 13 | fraction << 13);
          return tempDataView.getFloat32(0);
        }
        function readFloat32() {
          return read(dataView.getFloat32(offset), 4);
        }
        function readFloat64() {
          return read(dataView.getFloat64(offset), 8);
        }
        function readUint8() {
          return read(dataView.getUint8(offset), 1);
        }
        function readUint16() {
          return read(dataView.getUint16(offset), 2);
        }
        function readUint32() {
          return read(dataView.getUint32(offset), 4);
        }
        function readUint64() {
          return readUint32() * POW_2_32 + readUint32();
        }
        function readBreak() {
          if (dataView.getUint8(offset) !== 255)
            return false;
          offset += 1;
          return true;
        }
        function readLength(additionalInformation) {
          if (additionalInformation < 24)
            return additionalInformation;
          if (additionalInformation === 24)
            return readUint8();
          if (additionalInformation === 25)
            return readUint16();
          if (additionalInformation === 26)
            return readUint32();
          if (additionalInformation === 27)
            return readUint64();
          if (additionalInformation === 31)
            return -1;
          throw "Invalid length encoding";
        }
        function readIndefiniteStringLength(majorType) {
          var initialByte = readUint8();
          if (initialByte === 255)
            return -1;
          var length = readLength(initialByte & 31);
          if (length < 0 || initialByte >> 5 !== majorType)
            throw "Invalid indefinite length element";
          return length;
        }
        function appendUtf16data(utf16data, length) {
          for (var i2 = 0; i2 < length; ++i2) {
            var value = readUint8();
            if (value & 128) {
              if (value < 224) {
                value = (value & 31) << 6 | readUint8() & 63;
                length -= 1;
              } else if (value < 240) {
                value = (value & 15) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
                length -= 2;
              } else {
                value = (value & 15) << 18 | (readUint8() & 63) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
                length -= 3;
              }
            }
            if (value < 65536) {
              utf16data.push(value);
            } else {
              value -= 65536;
              utf16data.push(55296 | value >> 10);
              utf16data.push(56320 | value & 1023);
            }
          }
        }
        function decodeItem() {
          var initialByte = readUint8();
          var majorType = initialByte >> 5;
          var additionalInformation = initialByte & 31;
          var i2;
          var length;
          if (majorType === 7) {
            switch (additionalInformation) {
              case 25:
                return readFloat16();
              case 26:
                return readFloat32();
              case 27:
                return readFloat64();
            }
          }
          length = readLength(additionalInformation);
          if (length < 0 && (majorType < 2 || 6 < majorType))
            throw "Invalid length";
          switch (majorType) {
            case 0:
              return length;
            case 1:
              return -1 - length;
            case 2:
              if (length < 0) {
                var elements = [];
                var fullArrayLength = 0;
                while ((length = readIndefiniteStringLength(majorType)) >= 0) {
                  fullArrayLength += length;
                  elements.push(readArrayBuffer(length));
                }
                var fullArray = new Uint8Array(fullArrayLength);
                var fullArrayOffset = 0;
                for (i2 = 0; i2 < elements.length; ++i2) {
                  fullArray.set(elements[i2], fullArrayOffset);
                  fullArrayOffset += elements[i2].length;
                }
                return fullArray;
              }
              return readArrayBuffer(length);
            case 3:
              var utf16data = [];
              if (length < 0) {
                while ((length = readIndefiniteStringLength(majorType)) >= 0)
                  appendUtf16data(utf16data, length);
              } else
                appendUtf16data(utf16data, length);
              return String.fromCharCode.apply(null, utf16data);
            case 4:
              var retArray;
              if (length < 0) {
                retArray = [];
                while (!readBreak())
                  retArray.push(decodeItem());
              } else {
                retArray = new Array(length);
                for (i2 = 0; i2 < length; ++i2)
                  retArray[i2] = decodeItem();
              }
              return retArray;
            case 5:
              var retObject = {};
              for (i2 = 0; i2 < length || length < 0 && !readBreak(); ++i2) {
                var key = decodeItem();
                retObject[key] = decodeItem();
              }
              return retObject;
            case 6:
              return tagger(decodeItem(), length);
            case 7:
              switch (length) {
                case 20:
                  return false;
                case 21:
                  return true;
                case 22:
                  return null;
                case 23:
                  return undefined$12;
                default:
                  return simpleValue(length);
              }
          }
        }
        var ret = decodeItem();
        if (offset !== data.byteLength)
          throw "Remaining bytes";
        return ret;
      }
      var obj = { encode, decode };
      if (module2.exports)
        module2.exports = obj;
      else if (!global2.CBOR)
        global2.CBOR = obj;
    })(commonjsGlobal);
  })(cbor);
  var cborExports = cbor.exports;
  const CBOR = /* @__PURE__ */ getDefaultExportFromCjs$1(cborExports);
  var UPPER32 = Math.pow(2, 32);
  var warnedPrecision = false;
  function warnPrecision() {
    if (!warnedPrecision) {
      warnedPrecision = true;
      console.warn(
        "CBOR 64-bit integer array values may lose precision. No further warnings."
      );
    }
  }
  function decodeUint64LE(bytes) {
    warnPrecision();
    var byteLen = bytes.byteLength;
    var offset = bytes.byteOffset;
    var arrLen = byteLen / 8;
    var buffer2 = bytes.buffer.slice(offset, offset + byteLen);
    var uint32View = new Uint32Array(buffer2);
    var arr = new Array(arrLen);
    for (var i2 = 0; i2 < arrLen; i2++) {
      var si = i2 * 2;
      var lo = uint32View[si];
      var hi = uint32View[si + 1];
      arr[i2] = lo + UPPER32 * hi;
    }
    return arr;
  }
  function decodeInt64LE(bytes) {
    warnPrecision();
    var byteLen = bytes.byteLength;
    var offset = bytes.byteOffset;
    var arrLen = byteLen / 8;
    var buffer2 = bytes.buffer.slice(offset, offset + byteLen);
    var uint32View = new Uint32Array(buffer2);
    var int32View = new Int32Array(buffer2);
    var arr = new Array(arrLen);
    for (var i2 = 0; i2 < arrLen; i2++) {
      var si = i2 * 2;
      var lo = uint32View[si];
      var hi = int32View[si + 1];
      arr[i2] = lo + UPPER32 * hi;
    }
    return arr;
  }
  function decodeNativeArray(bytes, ArrayType) {
    var byteLen = bytes.byteLength;
    var offset = bytes.byteOffset;
    var buffer2 = bytes.buffer.slice(offset, offset + byteLen);
    return new ArrayType(buffer2);
  }
  var nativeArrayTypes = {
    64: Uint8Array,
    69: Uint16Array,
    70: Uint32Array,
    72: Int8Array,
    77: Int16Array,
    78: Int32Array,
    85: Float32Array,
    86: Float64Array
  };
  var conversionArrayTypes = {
    71: decodeUint64LE,
    79: decodeInt64LE
  };
  function cborTypedArrayTagger(data, tag) {
    if (tag in nativeArrayTypes) {
      var arrayType = nativeArrayTypes[tag];
      return decodeNativeArray(data, arrayType);
    }
    if (tag in conversionArrayTypes) {
      return conversionArrayTypes[tag](data);
    }
    return data;
  }
  var BSON = null;
  if (typeof bson !== "undefined") {
    BSON = bson().BSON;
  }
  function SocketAdapter(client) {
    var decoder = null;
    if (client.transportOptions.decoder) {
      decoder = client.transportOptions.decoder;
    }
    function handleMessage(message) {
      if (message.op === "publish") {
        client.emit(message.topic, message.msg);
      } else if (message.op === "service_response") {
        client.emit(message.id, message);
      } else if (message.op === "call_service") {
        client.emit(message.service, message);
      } else if (message.op === "send_action_goal") {
        client.emit(message.action, message);
      } else if (message.op === "cancel_action_goal") {
        client.emit(message.id, message);
      } else if (message.op === "action_feedback") {
        client.emit(message.id, message);
      } else if (message.op === "action_result") {
        client.emit(message.id, message);
      } else if (message.op === "status") {
        if (message.id) {
          client.emit("status:" + message.id, message);
        } else {
          client.emit("status", message);
        }
      }
    }
    function handlePng(message, callback) {
      if (message.op === "png") {
        if (typeof window === "undefined") {
          Promise.resolve().then(() => decompressPng$3).then(({ default: decompressPng2 }) => decompressPng2(message.data, callback));
        } else {
          Promise.resolve().then(() => decompressPng$1).then(({ default: decompressPng2 }) => decompressPng2(message.data, callback));
        }
      } else {
        callback(message);
      }
    }
    function decodeBSON(data, callback) {
      if (!BSON) {
        throw "Cannot process BSON encoded message without BSON header.";
      }
      var reader = new FileReader();
      reader.onload = function() {
        var uint8Array = new Uint8Array(this.result);
        var msg2 = BSON.deserialize(uint8Array);
        callback(msg2);
      };
      reader.readAsArrayBuffer(data);
    }
    return {
      /**
       * Emit a 'connection' event on WebSocket connection.
       *
       * @param {function} event - The argument to emit with the event.
       * @memberof SocketAdapter
       */
      onopen: function onOpen(event) {
        client.isConnected = true;
        client.emit("connection", event);
      },
      /**
       * Emit a 'close' event on WebSocket disconnection.
       *
       * @param {function} event - The argument to emit with the event.
       * @memberof SocketAdapter
       */
      onclose: function onClose(event) {
        client.isConnected = false;
        client.emit("close", event);
      },
      /**
       * Emit an 'error' event whenever there was an error.
       *
       * @param {function} event - The argument to emit with the event.
       * @memberof SocketAdapter
       */
      onerror: function onError(event) {
        client.emit("error", event);
      },
      /**
       * Parse message responses from rosbridge and send to the appropriate
       * topic, service, or param.
       *
       * @param {Object} data - The raw JSON message from rosbridge.
       * @memberof SocketAdapter
       */
      onmessage: function onMessage(data) {
        if (decoder) {
          decoder(data.data, function(message2) {
            handleMessage(message2);
          });
        } else if (typeof Blob !== "undefined" && data.data instanceof Blob) {
          decodeBSON(data.data, function(message2) {
            handlePng(message2, handleMessage);
          });
        } else if (data.data instanceof ArrayBuffer) {
          var decoded = CBOR.decode(data.data, cborTypedArrayTagger);
          handleMessage(decoded);
        } else {
          var message = JSON.parse(typeof data === "string" ? data : data.data);
          handlePng(message, handleMessage);
        }
      }
    };
  }
  class Ros extends eventemitter3.EventEmitter {
    /**
     * @param {Object} [options]
     * @param {string} [options.url] - The WebSocket URL for rosbridge. Can be specified later with `connect`.
     * @param {boolean} [options.groovyCompatibility=true] - Don't use interfaces that changed after the last groovy release or rosbridge_suite and related tools.
     * @param {'websocket'|RTCPeerConnection} [options.transportLibrary='websocket'] - 'websocket', or an RTCPeerConnection instance controlling how the connection is created in `connect`.
     * @param {Object} [options.transportOptions={}] - The options to use when creating a connection. Currently only used if `transportLibrary` is RTCPeerConnection.
     */
    constructor(options) {
      super();
      /** @type {WebSocket | import("ws").WebSocket | null} */
      __publicField(this, "socket", null);
      __publicField(this, "idCounter", 0);
      __publicField(this, "isConnected", false);
      __publicField(this, "groovyCompatibility", true);
      options = options || {};
      this.transportLibrary = options.transportLibrary || "websocket";
      this.transportOptions = options.transportOptions || {};
      this.groovyCompatibility = options.groovyCompatibility ?? true;
      if (options.url) {
        this.connect(options.url);
      }
    }
    /**
     * Connect to the specified WebSocket.
     *
     * @param {string} url - WebSocket URL or RTCDataChannel label for rosbridge.
     */
    connect(url) {
      if (this.transportLibrary.constructor.name === "RTCPeerConnection") {
        this.socket = Object.assign(
          // @ts-expect-error -- this is kinda wild. `this.transportLibrary` can either be a string or an RTCDataChannel. This needs fixing.
          this.transportLibrary.createDataChannel(url, this.transportOptions),
          SocketAdapter(this)
        );
      } else if (this.transportLibrary === "websocket") {
        if (!this.socket || this.socket.readyState === /* WebSocket.CLOSED */
        3) {
          if (typeof window !== "undefined") {
            const sock = new WebSocket(url);
            sock.binaryType = "arraybuffer";
            this.socket = Object.assign(sock, SocketAdapter(this));
          } else {
            import("ws").then((ws) => {
              const sock = new ws.WebSocket(url);
              sock.binaryType = "arraybuffer";
              this.socket = Object.assign(sock, SocketAdapter(this));
            });
          }
        }
      } else {
        throw "Unknown transportLibrary: " + this.transportLibrary.toString();
      }
    }
    /**
     * Connects to an existing socket
     *
     * @param {WebSocket&EventEmitter} socket
     */
    attachSocket(socket) {
      if (this.transportLibrary === "websocket") {
        socket.binaryType = "arraybuffer";
        this.socket = Object.assign(socket, SocketAdapter(this));
        socket.emit("open");
      } else {
        throw "attachSocket only supported for websocket transportLibrary";
      }
    }
    /**
     * Disconnect from the WebSocket server.
     */
    close() {
      if (this.socket) {
        this.socket.close();
      }
    }
    /**
     * Send an authorization request to the server.
     *
     * @param {string} mac - MAC (hash) string given by the trusted source.
     * @param {string} client - IP of the client.
     * @param {string} dest - IP of the destination.
     * @param {string} rand - Random string given by the trusted source.
     * @param {Object} t - Time of the authorization request.
     * @param {string} level - User level as a string given by the client.
     * @param {Object} end - End time of the client's session.
     */
    authenticate(mac, client, dest, rand, t, level, end) {
      var auth = {
        op: "auth",
        mac,
        client,
        dest,
        rand,
        t,
        level,
        end
      };
      this.callOnConnection(auth);
    }
    /**
     * Send an encoded message over the WebSocket.
     *
     * @param {Object} messageEncoded - The encoded message to be sent.
     */
    sendEncodedMessage(messageEncoded) {
      if (!this.isConnected) {
        this.once("connection", () => {
          if (this.socket !== null) {
            this.socket.send(messageEncoded);
          }
        });
      } else {
        if (this.socket !== null) {
          this.socket.send(messageEncoded);
        }
      }
    }
    /**
     * Send the message over the WebSocket, but queue the message up if not yet
     * connected.
     *
     * @param {Object} message - The message to be sent.
     */
    callOnConnection(message) {
      if (this.transportOptions.encoder) {
        this.transportOptions.encoder(message, this.sendEncodedMessage);
      } else {
        this.sendEncodedMessage(JSON.stringify(message));
      }
    }
    /**
     * Send a set_level request to the server.
     *
     * @param {string} level - Status level (none, error, warning, info).
     * @param {number} [id] - Operation ID to change status level on.
     */
    setStatusLevel(level, id) {
      var levelMsg = {
        op: "set_level",
        level,
        id
      };
      this.callOnConnection(levelMsg);
    }
    /**
     * @callback getActionServersCallback
     * @param {string[]} actionservers - Array of action server names.
     */
    /**
     * @callback getActionServersFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of action servers in ROS as an array of string.
     *
     * @param {getActionServersCallback} callback - Function with the following params:
     * @param {getActionServersFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getActionServers(callback, failedCallback) {
      var getActionServers = new Service({
        ros: this,
        name: "/rosapi/action_servers",
        serviceType: "rosapi/GetActionServers"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        getActionServers.callService(
          request,
          function(result) {
            callback(result.action_servers);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        getActionServers.callService(request, function(result) {
          callback(result.action_servers);
        });
      }
    }
    /**
     * @callback getTopicsCallback
     * @param {Object} result - The result object with the following params:
     * @param {string[]} result.topics - Array of topic names.
     * @param {string[]} result.types - Array of message type names.
     */
    /**
     * @callback getTopicsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of topics in ROS as an array.
     *
     * @param {getTopicsCallback} callback - Function with the following params:
     * @param {getTopicsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getTopics(callback, failedCallback) {
      var topicsClient = new Service({
        ros: this,
        name: "/rosapi/topics",
        serviceType: "rosapi/Topics"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        topicsClient.callService(
          request,
          function(result) {
            callback(result);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        topicsClient.callService(request, function(result) {
          callback(result);
        });
      }
    }
    /**
     * @callback getTopicsForTypeCallback
     * @param {string[]} topics - Array of topic names.
     */
    /**
     * @callback getTopicsForTypeFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of topics in ROS as an array of a specific type.
     *
     * @param {string} topicType - The topic type to find.
     * @param {getTopicsForTypeCallback} callback - Function with the following params:
     * @param {getTopicsForTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getTopicsForType(topicType, callback, failedCallback) {
      var topicsForTypeClient = new Service({
        ros: this,
        name: "/rosapi/topics_for_type",
        serviceType: "rosapi/TopicsForType"
      });
      var request = {
        type: topicType
      };
      if (typeof failedCallback === "function") {
        topicsForTypeClient.callService(
          request,
          function(result) {
            callback(result.topics);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        topicsForTypeClient.callService(request, function(result) {
          callback(result.topics);
        });
      }
    }
    /**
     * @callback getServicesCallback
     * @param {string[]} services - Array of service names.
     */
    /**
     * @callback getServicesFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of active service names in ROS.
     *
     * @param {getServicesCallback} callback - Function with the following params:
     * @param {getServicesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getServices(callback, failedCallback) {
      var servicesClient = new Service({
        ros: this,
        name: "/rosapi/services",
        serviceType: "rosapi/Services"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        servicesClient.callService(
          request,
          function(result) {
            callback(result.services);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        servicesClient.callService(request, function(result) {
          callback(result.services);
        });
      }
    }
    /**
     * @callback getServicesForTypeCallback
     * @param {string[]} topics - Array of service names.
     */
    /**
     * @callback getServicesForTypeFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of services in ROS as an array as specific type.
     *
     * @param {string} serviceType - The service type to find.
     * @param {getServicesForTypeCallback} callback - Function with the following params:
     * @param {getServicesForTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getServicesForType(serviceType, callback, failedCallback) {
      var servicesForTypeClient = new Service({
        ros: this,
        name: "/rosapi/services_for_type",
        serviceType: "rosapi/ServicesForType"
      });
      var request = {
        type: serviceType
      };
      if (typeof failedCallback === "function") {
        servicesForTypeClient.callService(
          request,
          function(result) {
            callback(result.services);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        servicesForTypeClient.callService(request, function(result) {
          callback(result.services);
        });
      }
    }
    /**
     * @callback getServiceRequestDetailsCallback
     * @param {Object} result - The result object with the following params:
     * @param {string[]} result.typedefs - An array containing the details of the service request.
     */
    /**
     * @callback getServiceRequestDetailsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve the details of a ROS service request.
     *
     * @param {string} type - The type of the service.
     * @param {getServiceRequestDetailsCallback} callback - Function with the following params:
     * @param {getServiceRequestDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getServiceRequestDetails(type2, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: "/rosapi/service_request_details",
        serviceType: "rosapi/ServiceRequestDetails"
      });
      var request = {
        type: type2
      };
      if (typeof failedCallback === "function") {
        serviceTypeClient.callService(
          request,
          function(result) {
            callback(result);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        serviceTypeClient.callService(request, function(result) {
          callback(result);
        });
      }
    }
    /**
     * @callback getServiceResponseDetailsCallback
     * @param {{typedefs: string[]}} result - The result object with the following params:
     */
    /**
     * @callback getServiceResponseDetailsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve the details of a ROS service response.
     *
     * @param {string} type - The type of the service.
     * @param {getServiceResponseDetailsCallback} callback - Function with the following params:
     * @param {getServiceResponseDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getServiceResponseDetails(type2, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: "/rosapi/service_response_details",
        serviceType: "rosapi/ServiceResponseDetails"
      });
      var request = {
        type: type2
      };
      if (typeof failedCallback === "function") {
        serviceTypeClient.callService(
          request,
          function(result) {
            callback(result);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        serviceTypeClient.callService(request, function(result) {
          callback(result);
        });
      }
    }
    /**
     * @callback getNodesCallback
     * @param {string[]} nodes - Array of node names.
     */
    /**
     * @callback getNodesFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of active node names in ROS.
     *
     * @param {getNodesCallback} callback - Function with the following params:
     * @param {getNodesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getNodes(callback, failedCallback) {
      var nodesClient = new Service({
        ros: this,
        name: "/rosapi/nodes",
        serviceType: "rosapi/Nodes"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        nodesClient.callService(
          request,
          function(result) {
            callback(result.nodes);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        nodesClient.callService(request, function(result) {
          callback(result.nodes);
        });
      }
    }
    /**
     * @callback getNodeDetailsCallback
     * @param {string[]} subscriptions - Array of subscribed topic names.
     * @param {string[]} publications - Array of published topic names.
     * @param {string[]} services - Array of service names hosted.
     */
    /**
     * @callback getNodeDetailsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * @callback getNodeDetailsLegacyCallback
     * @param {Object} result - The result object with the following params:
     * @param {string[]} result.subscribing - Array of subscribed topic names.
     * @param {string[]} result.publishing - Array of published topic names.
     * @param {string[]} result.services - Array of service names hosted.
     */
    /**
     * Retrieve a list of subscribed topics, publishing topics and services of a specific node.
     * <br>
     * These are the parameters if failedCallback is <strong>defined</strong>.
     *
     * @param {string} node - Name of the node.
     * @param {getNodeDetailsCallback} callback - Function with the following params:
     * @param {getNodeDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     *
     * @also
     *
     * Retrieve a list of subscribed topics, publishing topics and services of a specific node.
     * <br>
     * These are the parameters if failedCallback is <strong>undefined</strong>.
     *
     * @param {string} node - Name of the node.
     * @param {getNodeDetailsLegacyCallback} callback - Function with the following params:
     * @param {getNodeDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getNodeDetails(node, callback, failedCallback) {
      var nodesClient = new Service({
        ros: this,
        name: "/rosapi/node_details",
        serviceType: "rosapi/NodeDetails"
      });
      var request = {
        node
      };
      if (typeof failedCallback === "function") {
        nodesClient.callService(
          request,
          function(result) {
            callback(result.subscribing, result.publishing, result.services);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        nodesClient.callService(request, function(result) {
          callback(result);
        });
      }
    }
    /**
     * @callback getParamsCallback
     * @param {string[]} params - Array of param names.
     */
    /**
     * @callback getParamsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of parameter names from the ROS Parameter Server.
     *
     * @param {getParamsCallback} callback - Function with the following params:
     * @param {getParamsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getParams(callback, failedCallback) {
      var paramsClient = new Service({
        ros: this,
        name: "/rosapi/get_param_names",
        serviceType: "rosapi/GetParamNames"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        paramsClient.callService(
          request,
          function(result) {
            callback(result.names);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        paramsClient.callService(request, function(result) {
          callback(result.names);
        });
      }
    }
    /**
     * @callback getTopicTypeCallback
     * @param {string} type - The type of the topic.
     */
    /**
     * @callback getTopicTypeFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve the type of a ROS topic.
     *
     * @param {string} topic - Name of the topic.
     * @param {getTopicTypeCallback} callback - Function with the following params:
     * @param {getTopicTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getTopicType(topic, callback, failedCallback) {
      var topicTypeClient = new Service({
        ros: this,
        name: "/rosapi/topic_type",
        serviceType: "rosapi/TopicType"
      });
      var request = {
        topic
      };
      if (typeof failedCallback === "function") {
        topicTypeClient.callService(
          request,
          function(result) {
            callback(result.type);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        topicTypeClient.callService(request, function(result) {
          callback(result.type);
        });
      }
    }
    /**
     * @callback getServiceTypeCallback
     * @param {string} type - The type of the service.
     */
    /**
     * @callback getServiceTypeFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve the type of a ROS service.
     *
     * @param {string} service - Name of the service.
     * @param {getServiceTypeCallback} callback - Function with the following params:
     * @param {getServiceTypeFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getServiceType(service, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: "/rosapi/service_type",
        serviceType: "rosapi/ServiceType"
      });
      var request = {
        service
      };
      if (typeof failedCallback === "function") {
        serviceTypeClient.callService(
          request,
          function(result) {
            callback(result.type);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        serviceTypeClient.callService(request, function(result) {
          callback(result.type);
        });
      }
    }
    /**
     * @callback getMessageDetailsCallback
     * @param {string} details - An array of the message details.
     */
    /**
     * @callback getMessageDetailsFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve the details of a ROS message.
     *
     * @param {string} message - The name of the message type.
     * @param {getMessageDetailsCallback} callback - Function with the following params:
     * @param {getMessageDetailsFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getMessageDetails(message, callback, failedCallback) {
      var messageDetailClient = new Service({
        ros: this,
        name: "/rosapi/message_details",
        serviceType: "rosapi/MessageDetails"
      });
      var request = {
        type: message
      };
      if (typeof failedCallback === "function") {
        messageDetailClient.callService(
          request,
          function(result) {
            callback(result.typedefs);
          },
          function(message2) {
            failedCallback(message2);
          }
        );
      } else {
        messageDetailClient.callService(request, function(result) {
          callback(result.typedefs);
        });
      }
    }
    /**
     * Decode a typedef array into a dictionary like `rosmsg show foo/bar`.
     *
     * @param {Object[]} defs - Array of type_def dictionary.
     */
    decodeTypeDefs(defs) {
      var decodeTypeDefsRec = (theType, hints) => {
        var typeDefDict = {};
        for (var i2 = 0; i2 < theType.fieldnames.length; i2++) {
          var arrayLen = theType.fieldarraylen[i2];
          var fieldName = theType.fieldnames[i2];
          var fieldType = theType.fieldtypes[i2];
          if (fieldType.indexOf("/") === -1) {
            if (arrayLen === -1) {
              typeDefDict[fieldName] = fieldType;
            } else {
              typeDefDict[fieldName] = [fieldType];
            }
          } else {
            var sub = false;
            for (var j = 0; j < hints.length; j++) {
              if (hints[j].type.toString() === fieldType.toString()) {
                sub = hints[j];
                break;
              }
            }
            if (sub) {
              var subResult = decodeTypeDefsRec(sub, hints);
              if (arrayLen === -1) {
                typeDefDict[fieldName] = subResult;
              } else {
                typeDefDict[fieldName] = [subResult];
              }
            } else {
              this.emit(
                "error",
                "Cannot find " + fieldType + " in decodeTypeDefs"
              );
            }
          }
        }
        return typeDefDict;
      };
      return decodeTypeDefsRec(defs[0], defs);
    }
    /**
     * @callback getTopicsAndRawTypesCallback
     * @param {Object} result - The result object with the following params:
     * @param {string[]} result.topics - Array of topic names.
     * @param {string[]} result.types - Array of message type names.
     * @param {string[]} result.typedefs_full_text - Array of full definitions of message types, similar to `gendeps --cat`.
     */
    /**
     * @callback getTopicsAndRawTypesFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Retrieve a list of topics and their associated type definitions.
     *
     * @param {getTopicsAndRawTypesCallback} callback - Function with the following params:
     * @param {getTopicsAndRawTypesFailedCallback} [failedCallback] - The callback function when the service call failed with params:
     */
    getTopicsAndRawTypes(callback, failedCallback) {
      var topicsAndRawTypesClient = new Service({
        ros: this,
        name: "/rosapi/topics_and_raw_types",
        serviceType: "rosapi/TopicsAndRawTypes"
      });
      var request = {};
      if (typeof failedCallback === "function") {
        topicsAndRawTypesClient.callService(
          request,
          function(result) {
            callback(result);
          },
          function(message) {
            failedCallback(message);
          }
        );
      } else {
        topicsAndRawTypesClient.callService(request, function(result) {
          callback(result);
        });
      }
    }
    Topic(options) {
      return new Topic({ ros: this, ...options });
    }
    Param(options) {
      return new Param({ ros: this, ...options });
    }
    Service(options) {
      return new Service({ ros: this, ...options });
    }
    TFClient(options) {
      return new TFClient({ ros: this, ...options });
    }
    ActionClient(options) {
      return new ActionClient({ ros: this, ...options });
    }
    SimpleActionServer(options) {
      return new SimpleActionServer({ ros: this, ...options });
    }
  }
  class ActionClient extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.serverName - The action server name, like '/fibonacci'.
     * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
     * @param {number} [options.timeout] - The timeout length when connecting to the action server.
     * @param {boolean} [options.omitFeedback] - The flag to indicate whether to omit the feedback channel or not.
     * @param {boolean} [options.omitStatus] - The flag to indicate whether to omit the status channel or not.
     * @param {boolean} [options.omitResult] - The flag to indicate whether to omit the result channel or not.
     */
    constructor(options) {
      super();
      __publicField(this, "goals", {});
      /** flag to check if a status has been received */
      __publicField(this, "receivedStatus", false);
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName;
      this.timeout = options.timeout;
      this.omitFeedback = options.omitFeedback;
      this.omitStatus = options.omitStatus;
      this.omitResult = options.omitResult;
      this.feedbackListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/feedback",
        messageType: this.actionName + "Feedback"
      });
      this.statusListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/status",
        messageType: "actionlib_msgs/GoalStatusArray"
      });
      this.resultListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/result",
        messageType: this.actionName + "Result"
      });
      this.goalTopic = new Topic({
        ros: this.ros,
        name: this.serverName + "/goal",
        messageType: this.actionName + "Goal"
      });
      this.cancelTopic = new Topic({
        ros: this.ros,
        name: this.serverName + "/cancel",
        messageType: "actionlib_msgs/GoalID"
      });
      this.goalTopic.advertise();
      this.cancelTopic.advertise();
      this.statusListener.subscribe((statusMessage) => {
        this.receivedStatus = true;
        if (!this.omitStatus) {
          statusMessage.status_list.forEach((status) => {
            var goal = this.goals[status.goal_id.id];
            if (goal) {
              goal.emit("status", status);
            }
          });
        }
        [5, 6].forEach((status) => {
          if (statusMessage.status_list.includes(status)) {
            if (!!this.goals[statusMessage.status.goal_id.id]) {
              delete this.goals[statusMessage.status.goal_id.id];
            }
          }
        });
      });
      if (!this.omitFeedback) {
        this.feedbackListener.subscribe((feedbackMessage) => {
          var goal = this.goals[feedbackMessage.status.goal_id.id];
          if (goal) {
            goal.emit("status", feedbackMessage.status);
            goal.emit("feedback", feedbackMessage.feedback);
          }
        });
      }
      this.resultListener.subscribe((resultMessage) => {
        var goal = this.goals[resultMessage.status.goal_id.id];
        if (!!goal) {
          if (!this.omitResult) {
            goal.emit("status", resultMessage.status);
            goal.emit("result", resultMessage.result);
          }
          delete this.goals[goal.goalID];
        }
      });
      if (this.timeout) {
        setTimeout(() => {
          if (!this.receivedStatus) {
            this.emit("timeout");
          }
        }, this.timeout);
      }
    }
    /**
     * Cancel all goals associated with this ActionClient.
     */
    cancel() {
      var cancelMessage = {};
      this.cancelTopic.publish(cancelMessage);
    }
    /**
     * Unsubscribe and unadvertise all topics associated with this ActionClient.
     */
    dispose() {
      this.goalTopic.unadvertise();
      this.cancelTopic.unadvertise();
      this.statusListener.unsubscribe();
      this.feedbackListener.unsubscribe();
      this.resultListener.unsubscribe();
    }
  }
  class ActionListener extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.serverName - The action server name, like '/fibonacci'.
     * @param {string} options.actionName - The action message name, like 'actionlib_tutorials/FibonacciAction'.
     */
    constructor(options) {
      super();
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName;
      var goalListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/goal",
        messageType: this.actionName + "Goal"
      });
      var feedbackListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/feedback",
        messageType: this.actionName + "Feedback"
      });
      var statusListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/status",
        messageType: "actionlib_msgs/GoalStatusArray"
      });
      var resultListener = new Topic({
        ros: this.ros,
        name: this.serverName + "/result",
        messageType: this.actionName + "Result"
      });
      goalListener.subscribe((goalMessage) => {
        this.emit("goal", goalMessage);
      });
      statusListener.subscribe((statusMessage) => {
        statusMessage.status_list.forEach((status) => {
          this.emit("status", status);
        });
      });
      feedbackListener.subscribe((feedbackMessage) => {
        this.emit("status", feedbackMessage.status);
        this.emit("feedback", feedbackMessage.feedback);
      });
      resultListener.subscribe((resultMessage) => {
        this.emit("status", resultMessage.status);
        this.emit("result", resultMessage.result);
      });
    }
  }
  const ActionLib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ActionClient,
    ActionListener,
    Goal,
    SimpleActionServer
  }, Symbol.toStringTag, { value: "Module" }));
  class Action extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} options.name - The action name, like '/fibonacci'.
     * @param {string} options.actionType - The action type, like 'action_tutorials_interfaces/Fibonacci'.
     */
    constructor(options) {
      super();
      __publicField(this, "isAdvertised", false);
      /**
       * @callback advertiseActionCallback
       * @param {TGoal} goal - The action goal.
       * @param {string} id - The ID of the action goal to execute.
       */
      /**
       * @private
       * @type {advertiseActionCallback | null}
       */
      __publicField(this, "_actionCallback", null);
      /**
       * @callback advertiseCancelCallback
       * @param {string} id - The ID of the action goal to cancel.
       */
      /**
       * @private
       * @type {advertiseCancelCallback | null}
       */
      __publicField(this, "_cancelCallback", null);
      this.ros = options.ros;
      this.name = options.name;
      this.actionType = options.actionType;
    }
    /**
     * @callback sendGoalResultCallback
     * @param {TResult} result - The result from the action.
     */
    /**
     * @callback sendGoalFeedbackCallback
     * @param {TFeedback} feedback - The feedback from the action.
     */
    /**
     * @callback sendGoalFailedCallback
     * @param {string} error - The error message reported by ROS.
     */
    /**
     * Sends an action goal. Returns the feedback in the feedback callback while the action is running
     * and the result in the result callback when the action is completed.
     * Does nothing if this action is currently advertised.
     *
     * @param {TGoal} goal - The action goal to send.
     * @param {sendGoalResultCallback} resultCallback - The callback function when the action is completed.
     * @param {sendGoalFeedbackCallback} [feedbackCallback] - The callback function when the action pulishes feedback.
     * @param {sendGoalFailedCallback} [failedCallback] - The callback function when the action failed.
     * @param {string} [goalID] - The ID of the action goal to send (will be generated and returned if not provided).
     */
    sendGoal(goal, resultCallback, feedbackCallback, failedCallback, goalID) {
      if (this.isAdvertised) {
        return;
      }
      var actionGoalId = goalID || "send_action_goal:" + this.name + ":" + ++this.ros.idCounter;
      if (resultCallback || failedCallback) {
        this.ros.on(actionGoalId, function(message) {
          if (message.result !== void 0 && message.result === false) {
            if (typeof failedCallback === "function") {
              failedCallback(message.values);
            }
          } else if (message.op === "action_feedback" && typeof feedbackCallback === "function") {
            feedbackCallback(message.values);
          } else if (message.op === "action_result" && typeof resultCallback === "function") {
            resultCallback(message.values);
          }
        });
      }
      var call = {
        op: "send_action_goal",
        id: actionGoalId,
        action: this.name,
        action_type: this.actionType,
        args: goal,
        feedback: true
      };
      this.ros.callOnConnection(call);
      return actionGoalId;
    }
    /**
     * Cancels an action goal.
     *
     * @param {string} id - The ID of the action goal to cancel.
     */
    cancelGoal(id) {
      var call = {
        op: "cancel_action_goal",
        id,
        action: this.name
      };
      this.ros.callOnConnection(call);
    }
    /**
     * Advertise the action. This turns the Action object from a client
     * into a server. The callback will be called with every goal sent to this action.
     *
     * @param {advertiseActionCallback} actionCallback - This works similarly to the callback for a C++ action.
     * @param {advertiseCancelCallback} cancelCallback - A callback function to execute when the action is canceled.
     */
    advertise(actionCallback, cancelCallback) {
      if (this.isAdvertised || typeof actionCallback !== "function") {
        return;
      }
      this._actionCallback = actionCallback;
      this._cancelCallback = cancelCallback;
      this.ros.on(this.name, this._executeAction.bind(this));
      this.ros.callOnConnection({
        op: "advertise_action",
        type: this.actionType,
        action: this.name
      });
      this.isAdvertised = true;
    }
    /**
     * Unadvertise a previously advertised action.
     */
    unadvertise() {
      if (!this.isAdvertised) {
        return;
      }
      this.ros.callOnConnection({
        op: "unadvertise_action",
        action: this.name
      });
      this.isAdvertised = false;
    }
    /**
     * Helper function that executes an action by calling the provided
     * action callback with the auto-generated ID as a user-accessible input.
     * Should not be called manually.
     *
     * @param {Object} rosbridgeRequest - The rosbridge request containing the action goal to send and its ID.
     * @param {string} rosbridgeRequest.id - The ID of the action goal.
     * @param {TGoal} rosbridgeRequest.args - The arguments of the action goal.
     */
    _executeAction(rosbridgeRequest) {
      var id = rosbridgeRequest.id;
      if (typeof id === "string") {
        this.ros.on(id, (message) => {
          if (message.op === "cancel_action_goal" && typeof this._cancelCallback === "function") {
            this._cancelCallback(id);
          }
        });
      }
      if (typeof this._actionCallback === "function") {
        this._actionCallback(rosbridgeRequest.args, id);
      }
    }
    /**
     * Helper function to send action feedback inside an action handler.
     *
     * @param {string} id - The action goal ID.
     * @param {TFeedback} feedback - The feedback to send.
     */
    sendFeedback(id, feedback) {
      var call = {
        op: "action_feedback",
        id,
        action: this.name,
        values: feedback
      };
      this.ros.callOnConnection(call);
    }
    /**
     * Helper function to set an action as succeeded.
     *
     * @param {string} id - The action goal ID.
     * @param {TResult} result - The result to set.
     */
    setSucceeded(id, result) {
      var call = {
        op: "action_result",
        id,
        action: this.name,
        values: result,
        result: true
      };
      this.ros.callOnConnection(call);
    }
    /**
     * Helper function to set an action as failed.
     *
     * @param {string} id - The action goal ID.
     */
    setFailed(id) {
      var call = {
        op: "action_result",
        id,
        action: this.name,
        result: false
      };
      this.ros.callOnConnection(call);
    }
  }
  const Core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Action,
    Param,
    Ros,
    Service,
    Topic
  }, Symbol.toStringTag, { value: "Module" }));
  class Pose {
    /**
     * @param {Object} [options]
     * @param {Vector3} [options.position] - The ROSLIB.Vector3 describing the position.
     * @param {Quaternion} [options.orientation] - The ROSLIB.Quaternion describing the orientation.
     */
    constructor(options) {
      options = options || {};
      options = options || {};
      this.position = new Vector3(options.position);
      this.orientation = new Quaternion(options.orientation);
    }
    /**
     * Apply a transform against this pose.
     *
     * @param {Transform} tf - The transform to be applied.
     */
    applyTransform(tf) {
      this.position.multiplyQuaternion(tf.rotation);
      this.position.add(tf.translation);
      var tmp = tf.rotation.clone();
      tmp.multiply(this.orientation);
      this.orientation = tmp;
    }
    /**
     * Clone a copy of this pose.
     *
     * @returns {Pose} The cloned pose.
     */
    clone() {
      return new Pose(this);
    }
    /**
     * Multiply this pose with another pose without altering this pose.
     *
     * @returns {Pose} The result of the multiplication.
     */
    multiply(pose) {
      var p = pose.clone();
      p.applyTransform({
        rotation: this.orientation,
        translation: this.position
      });
      return p;
    }
    /**
     * Compute the inverse of this pose.
     *
     * @returns {Pose} The inverse of the pose.
     */
    getInverse() {
      var inverse = this.clone();
      inverse.orientation.invert();
      inverse.position.multiplyQuaternion(inverse.orientation);
      inverse.position.x *= -1;
      inverse.position.y *= -1;
      inverse.position.z *= -1;
      return inverse;
    }
  }
  const Math$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Pose,
    Quaternion,
    Transform,
    Vector3
  }, Symbol.toStringTag, { value: "Module" }));
  class ROS2TFClient extends eventemitter3.EventEmitter {
    /**
     * @param {Object} options
     * @param {Ros} options.ros - The ROSLIB.Ros connection handle.
     * @param {string} [options.fixedFrame=base_link] - The fixed frame.
     * @param {number} [options.angularThres=2.0] - The angular threshold for the TF republisher.
     * @param {number} [options.transThres=0.01] - The translation threshold for the TF republisher.
     * @param {number} [options.rate=10.0] - The rate for the TF republisher.
     * @param {number} [options.updateDelay=50] - The time (in ms) to wait after a new subscription
     *     to update the TF republisher's list of TFs.
     * @param {number} [options.topicTimeout=2.0] - The timeout parameter for the TF republisher.
     * @param {string} [options.serverName="/tf2_web_republisher"] - The name of the tf2_web_republisher server.
     * @param {string} [options.repubServiceName="/republish_tfs"] - The name of the republish_tfs service (non groovy compatibility mode only).
     */
    constructor(options) {
      super();
      this.ros = options.ros;
      this.fixedFrame = options.fixedFrame || "base_link";
      this.angularThres = options.angularThres || 2;
      this.transThres = options.transThres || 0.01;
      this.rate = options.rate || 10;
      this.updateDelay = options.updateDelay || 50;
      const seconds = options.topicTimeout || 2;
      const secs = Math.floor(seconds);
      const nsecs = Math.floor((seconds - secs) * 1e9);
      this.topicTimeout = {
        secs,
        nsecs
      };
      this.serverName = options.serverName || "/tf2_web_republisher";
      this.goal_id = "";
      this.frameInfos = {};
      this.republisherUpdateRequested = false;
      this._subscribeCB = void 0;
      this._isDisposed = false;
      this.actionClient = new Action({
        ros: options.ros,
        name: this.serverName,
        actionType: "tf2_web_republisher_msgs/TFSubscription"
      });
    }
    /**
     * Process the incoming TF message and send them out using the callback
     * functions.
     *
     * @param {Object} tf - The TF message from the server.
     */
    processTFArray(tf) {
      let that = this;
      tf.transforms.forEach(function(transform) {
        let frameID = transform.child_frame_id;
        if (frameID[0] === "/") {
          frameID = frameID.substring(1);
        }
        const info = that.frameInfos[frameID];
        if (info) {
          info.transform = new Transform({
            translation: transform.transform.translation,
            rotation: transform.transform.rotation
          });
          info.cbs.forEach(function(cb) {
            cb(info.transform);
          });
        }
      }, this);
    }
    /**
     * Create and send a new goal (or service request) to the tf2_web_republisher
     * based on the current list of TFs.
     */
    updateGoal() {
      const goalMessage = {
        source_frames: Object.keys(this.frameInfos),
        target_frame: this.fixedFrame,
        angular_thres: this.angularThres,
        trans_thres: this.transThres,
        rate: this.rate
      };
      if (this.goal_id !== "") {
        this.actionClient.cancelGoal(this.goal_id);
      }
      this.currentGoal = goalMessage;
      const id = this.actionClient.sendGoal(
        goalMessage,
        (result) => {
        },
        (feedback) => {
          this.processTFArray(feedback);
        }
      );
      if (typeof id === "string") {
        this.goal_id = id;
      }
      this.republisherUpdateRequested = false;
    }
    /**
     * @callback subscribeCallback
     * @param {Transform} callback.transform - The transform data.
     */
    /**
     * Subscribe to the given TF frame.
     *
     * @param {string} frameID - The TF frame to subscribe to.
     * @param {subscribeCallback} callback - Function with the following params:
     */
    subscribe(frameID, callback) {
      if (frameID[0] === "/") {
        frameID = frameID.substring(1);
      }
      if (!this.frameInfos[frameID]) {
        this.frameInfos[frameID] = {
          cbs: []
        };
        if (!this.republisherUpdateRequested) {
          setTimeout(this.updateGoal.bind(this), this.updateDelay);
          this.republisherUpdateRequested = true;
        }
      } else if (this.frameInfos[frameID].transform) {
        callback(this.frameInfos[frameID].transform);
      }
      this.frameInfos[frameID].cbs.push(callback);
    }
    /**
     * Unsubscribe from the given TF frame.
     *
     * @param {string} frameID - The TF frame to unsubscribe from.
     * @param {function} callback - The callback function to remove.
     */
    unsubscribe(frameID, callback) {
      if (frameID[0] === "/") {
        frameID = frameID.substring(1);
      }
      const info = this.frameInfos[frameID];
      for (var cbs = info && info.cbs || [], idx = cbs.length; idx--; ) {
        if (cbs[idx] === callback) {
          cbs.splice(idx, 1);
        }
      }
      if (!callback || cbs.length === 0) {
        delete this.frameInfos[frameID];
      }
    }
    /**
     * Unsubscribe and unadvertise all topics associated with this TFClient.
     */
    dispose() {
      this._isDisposed = true;
    }
  }
  const Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ROS2TFClient,
    TFClient
  }, Symbol.toStringTag, { value: "Module" }));
  const URDF_SPHERE = 0;
  const URDF_BOX = 1;
  const URDF_CYLINDER = 2;
  const URDF_MESH = 3;
  class UrdfBox {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      /** @type {Vector3 | null} */
      __publicField(this, "dimension");
      var _a;
      this.type = URDF_BOX;
      var xyz = (_a = options.xml.getAttribute("size")) == null ? void 0 : _a.split(" ");
      if (xyz) {
        this.dimension = new Vector3({
          x: parseFloat(xyz[0]),
          y: parseFloat(xyz[1]),
          z: parseFloat(xyz[2])
        });
      } else {
        this.dimension = null;
      }
    }
  }
  class UrdfColor {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      var _a;
      var rgba = (_a = options.xml.getAttribute("rgba")) == null ? void 0 : _a.split(" ");
      if (rgba) {
        this.r = parseFloat(rgba[0]);
        this.g = parseFloat(rgba[1]);
        this.b = parseFloat(rgba[2]);
        this.a = parseFloat(rgba[3]);
      }
    }
  }
  class UrdfCylinder {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      this.type = URDF_CYLINDER;
      this.length = parseFloat(options.xml.getAttribute("length"));
      this.radius = parseFloat(options.xml.getAttribute("radius"));
    }
  }
  class UrdfMaterial {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      /** @type {string | null} */
      __publicField(this, "textureFilename", null);
      /** @type {UrdfColor | null} */
      __publicField(this, "color", null);
      this.name = options.xml.getAttribute("name");
      var textures = options.xml.getElementsByTagName("texture");
      if (textures.length > 0) {
        this.textureFilename = textures[0].getAttribute("filename");
      }
      var colors = options.xml.getElementsByTagName("color");
      if (colors.length > 0) {
        this.color = new UrdfColor({
          xml: colors[0]
        });
      }
    }
    isLink() {
      return this.color === null && this.textureFilename === null;
    }
    assign(obj) {
      return Object.assign(this, obj);
    }
  }
  class UrdfMesh {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      /** @type {Vector3 | null} */
      __publicField(this, "scale", null);
      this.type = URDF_MESH;
      this.filename = options.xml.getAttribute("filename");
      var scale = options.xml.getAttribute("scale");
      if (scale) {
        var xyz = scale.split(" ");
        this.scale = new Vector3({
          x: parseFloat(xyz[0]),
          y: parseFloat(xyz[1]),
          z: parseFloat(xyz[2])
        });
      }
    }
  }
  class UrdfSphere {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      this.type = URDF_SPHERE;
      this.radius = parseFloat(options.xml.getAttribute("radius") || "NaN");
    }
  }
  class UrdfVisual {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      /** @type {Pose | null} */
      __publicField(this, "origin", null);
      /** @type {UrdfMesh | UrdfSphere | UrdfBox | UrdfCylinder | null} */
      __publicField(this, "geometry", null);
      /** @type {UrdfMaterial | null} */
      __publicField(this, "material", null);
      var xml = options.xml;
      this.name = options.xml.getAttribute("name");
      var origins = xml.getElementsByTagName("origin");
      if (origins.length === 0) {
        this.origin = new Pose();
      } else {
        var xyzValue = origins[0].getAttribute("xyz");
        var position2 = new Vector3();
        if (xyzValue) {
          var xyz = xyzValue.split(" ");
          position2 = new Vector3({
            x: parseFloat(xyz[0]),
            y: parseFloat(xyz[1]),
            z: parseFloat(xyz[2])
          });
        }
        var rpyValue = origins[0].getAttribute("rpy");
        var orientation = new Quaternion();
        if (rpyValue) {
          var rpy = rpyValue.split(" ");
          var roll = parseFloat(rpy[0]);
          var pitch = parseFloat(rpy[1]);
          var yaw = parseFloat(rpy[2]);
          var phi = roll / 2;
          var the = pitch / 2;
          var psi = yaw / 2;
          var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the) * Math.sin(psi);
          var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the) * Math.sin(psi);
          var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the) * Math.cos(psi);
          var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the) * Math.sin(psi);
          orientation = new Quaternion({
            x,
            y,
            z,
            w
          });
          orientation.normalize();
        }
        this.origin = new Pose({
          position: position2,
          orientation
        });
      }
      var geoms = xml.getElementsByTagName("geometry");
      if (geoms.length > 0) {
        var geom = geoms[0];
        var shape = null;
        for (var i2 = 0; i2 < geom.childNodes.length; i2++) {
          var node = geom.childNodes[i2];
          if (node.nodeType === 1) {
            shape = node;
            break;
          }
        }
        if (shape) {
          var type2 = shape.nodeName;
          if (type2 === "sphere") {
            this.geometry = new UrdfSphere({
              xml: shape
            });
          } else if (type2 === "box") {
            this.geometry = new UrdfBox({
              xml: shape
            });
          } else if (type2 === "cylinder") {
            this.geometry = new UrdfCylinder({
              xml: shape
            });
          } else if (type2 === "mesh") {
            this.geometry = new UrdfMesh({
              xml: shape
            });
          } else {
            console.warn("Unknown geometry type " + type2);
          }
        }
      }
      var materials = xml.getElementsByTagName("material");
      if (materials.length > 0) {
        this.material = new UrdfMaterial({
          xml: materials[0]
        });
      }
    }
  }
  class UrdfLink {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      this.name = options.xml.getAttribute("name");
      this.visuals = [];
      var visuals = options.xml.getElementsByTagName("visual");
      for (var i2 = 0; i2 < visuals.length; i2++) {
        this.visuals.push(
          new UrdfVisual({
            xml: visuals[i2]
          })
        );
      }
    }
  }
  class UrdfJoint {
    /**
     * @param {Object} options
     * @param {Element} options.xml - The XML element to parse.
     */
    constructor(options) {
      this.name = options.xml.getAttribute("name");
      this.type = options.xml.getAttribute("type");
      var parents = options.xml.getElementsByTagName("parent");
      if (parents.length > 0) {
        this.parent = parents[0].getAttribute("link");
      }
      var children = options.xml.getElementsByTagName("child");
      if (children.length > 0) {
        this.child = children[0].getAttribute("link");
      }
      var limits = options.xml.getElementsByTagName("limit");
      if (limits.length > 0) {
        this.minval = parseFloat(limits[0].getAttribute("lower") || "NaN");
        this.maxval = parseFloat(limits[0].getAttribute("upper") || "NaN");
      }
      var origins = options.xml.getElementsByTagName("origin");
      if (origins.length === 0) {
        this.origin = new Pose();
      } else {
        var xyzValue = origins[0].getAttribute("xyz");
        var position2 = new Vector3();
        if (xyzValue) {
          var xyz = xyzValue.split(" ");
          position2 = new Vector3({
            x: parseFloat(xyz[0]),
            y: parseFloat(xyz[1]),
            z: parseFloat(xyz[2])
          });
        }
        var rpyValue = origins[0].getAttribute("rpy");
        var orientation = new Quaternion();
        if (rpyValue) {
          var rpy = rpyValue.split(" ");
          var roll = parseFloat(rpy[0]);
          var pitch = parseFloat(rpy[1]);
          var yaw = parseFloat(rpy[2]);
          var phi = roll / 2;
          var the = pitch / 2;
          var psi = yaw / 2;
          var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the) * Math.sin(psi);
          var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the) * Math.sin(psi);
          var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the) * Math.cos(psi);
          var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the) * Math.sin(psi);
          orientation = new Quaternion({
            x,
            y,
            z,
            w
          });
          orientation.normalize();
        }
        this.origin = new Pose({
          position: position2,
          orientation
        });
      }
    }
  }
  var dom$1 = {};
  var conventions$2 = {};
  function freeze(object, oc) {
    if (oc === void 0) {
      oc = Object;
    }
    return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
  }
  function assign(target, source) {
    if (target === null || typeof target !== "object") {
      throw new TypeError("target is not an object");
    }
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var MIME_TYPE = freeze({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see DOMParser.SupportedType.isHTML
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * Helper method to check a mime type if it indicates an HTML document
     *
     * @param {string} [value]
     * @returns {boolean}
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
    isHTML: function(value) {
      return value === MIME_TYPE.HTML;
    },
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/html`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  });
  var NAMESPACE$3 = freeze({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * Checks if `uri` equals `NAMESPACE.HTML`.
     *
     * @param {string} [uri]
     *
     * @see NAMESPACE.HTML
     */
    isHTML: function(uri2) {
      return uri2 === NAMESPACE$3.HTML;
    },
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  conventions$2.assign = assign;
  conventions$2.freeze = freeze;
  conventions$2.MIME_TYPE = MIME_TYPE;
  conventions$2.NAMESPACE = NAMESPACE$3;
  var conventions$1 = conventions$2;
  var NAMESPACE$2 = conventions$1.NAMESPACE;
  function notEmptyString(input) {
    return input !== "";
  }
  function splitOnASCIIWhitespace(input) {
    return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
  }
  function orderedSetReducer(current, element) {
    if (!current.hasOwnProperty(element)) {
      current[element] = true;
    }
    return current;
  }
  function toOrderedSet(input) {
    if (!input) return [];
    var list = splitOnASCIIWhitespace(input);
    return Object.keys(list.reduce(orderedSetReducer, {}));
  }
  function arrayIncludes(list) {
    return function(element) {
      return list && list.indexOf(element) !== -1;
    };
  }
  function copy(src, dest) {
    for (var p in src) {
      if (Object.prototype.hasOwnProperty.call(src, p)) {
        dest[p] = src[p];
      }
    }
  }
  function _extends(Class, Super) {
    var pt = Class.prototype;
    if (!(pt instanceof Super)) {
      let t = function() {
      };
      t.prototype = Super.prototype;
      t = new t();
      copy(pt, t);
      Class.prototype = pt = t;
    }
    if (pt.constructor != Class) {
      if (typeof Class != "function") {
        console.error("unknown Class:" + Class);
      }
      pt.constructor = Class;
    }
  }
  var NodeType = {};
  var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = NodeType.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
  var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
  var ExceptionCode = {};
  var ExceptionMessage = {};
  ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
  ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
  var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
  ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
  ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
  ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
  ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
  var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
  ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
  var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
  ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
  ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
  ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
  ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
  ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
  function DOMException(code2, message) {
    if (message instanceof Error) {
      var error = message;
    } else {
      error = this;
      Error.call(this, ExceptionMessage[code2]);
      this.message = ExceptionMessage[code2];
      if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
    }
    error.code = code2;
    if (message) this.message = this.message + ": " + message;
    return error;
  }
  DOMException.prototype = Error.prototype;
  copy(ExceptionCode, DOMException);
  function NodeList() {
  }
  NodeList.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
     * @standard level1
     */
    length: 0,
    /**
     * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
     * @standard level1
     * @param index  unsigned long
     *   Index into the collection.
     * @return Node
     * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
     */
    item: function(index) {
      return this[index] || null;
    },
    toString: function(isHTML, nodeFilter) {
      for (var buf = [], i2 = 0; i2 < this.length; i2++) {
        serializeToString(this[i2], buf, isHTML, nodeFilter);
      }
      return buf.join("");
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node | undefined}
     */
    find: function(predicate) {
      return Array.prototype.find.call(this, predicate);
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node[]}
     */
    filter: function(predicate) {
      return Array.prototype.filter.call(this, predicate);
    },
    /**
     * @private
     * @param {Node} item
     * @returns {number}
     */
    indexOf: function(item) {
      return Array.prototype.indexOf.call(this, item);
    }
  };
  function LiveNodeList(node, refresh) {
    this._node = node;
    this._refresh = refresh;
    _updateLiveList(this);
  }
  function _updateLiveList(list) {
    var inc = list._node._inc || list._node.ownerDocument._inc;
    if (list._inc != inc) {
      var ls = list._refresh(list._node);
      __set__(list, "length", ls.length);
      copy(ls, list);
      list._inc = inc;
    }
  }
  LiveNodeList.prototype.item = function(i2) {
    _updateLiveList(this);
    return this[i2];
  };
  _extends(LiveNodeList, NodeList);
  function NamedNodeMap() {
  }
  function _findNodeIndex(list, node) {
    var i2 = list.length;
    while (i2--) {
      if (list[i2] === node) {
        return i2;
      }
    }
  }
  function _addNamedNode(el, list, newAttr, oldAttr) {
    if (oldAttr) {
      list[_findNodeIndex(list, oldAttr)] = newAttr;
    } else {
      list[list.length++] = newAttr;
    }
    if (el) {
      newAttr.ownerElement = el;
      var doc = el.ownerDocument;
      if (doc) {
        oldAttr && _onRemoveAttribute(doc, el, oldAttr);
        _onAddAttribute(doc, el, newAttr);
      }
    }
  }
  function _removeNamedNode(el, list, attr) {
    var i2 = _findNodeIndex(list, attr);
    if (i2 >= 0) {
      var lastIndex = list.length - 1;
      while (i2 < lastIndex) {
        list[i2] = list[++i2];
      }
      list.length = lastIndex;
      if (el) {
        var doc = el.ownerDocument;
        if (doc) {
          _onRemoveAttribute(doc, el, attr);
          attr.ownerElement = null;
        }
      }
    } else {
      throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
    }
  }
  NamedNodeMap.prototype = {
    length: 0,
    item: NodeList.prototype.item,
    getNamedItem: function(key) {
      var i2 = this.length;
      while (i2--) {
        var attr = this[i2];
        if (attr.nodeName == key) {
          return attr;
        }
      }
    },
    setNamedItem: function(attr) {
      var el = attr.ownerElement;
      if (el && el != this._ownerElement) {
        throw new DOMException(INUSE_ATTRIBUTE_ERR);
      }
      var oldAttr = this.getNamedItem(attr.nodeName);
      _addNamedNode(this._ownerElement, this, attr, oldAttr);
      return oldAttr;
    },
    /* returns Node */
    setNamedItemNS: function(attr) {
      var el = attr.ownerElement, oldAttr;
      if (el && el != this._ownerElement) {
        throw new DOMException(INUSE_ATTRIBUTE_ERR);
      }
      oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
      _addNamedNode(this._ownerElement, this, attr, oldAttr);
      return oldAttr;
    },
    /* returns Node */
    removeNamedItem: function(key) {
      var attr = this.getNamedItem(key);
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function(namespaceURI, localName) {
      var attr = this.getNamedItemNS(namespaceURI, localName);
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    getNamedItemNS: function(namespaceURI, localName) {
      var i2 = this.length;
      while (i2--) {
        var node = this[i2];
        if (node.localName == localName && node.namespaceURI == namespaceURI) {
          return node;
        }
      }
      return null;
    }
  };
  function DOMImplementation$1() {
  }
  DOMImplementation$1.prototype = {
    /**
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
     * The different implementations fairly diverged in what kind of features were reported.
     * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
     *
     * @deprecated It is deprecated and modern browsers return true in all cases.
     *
     * @param {string} feature
     * @param {string} [version]
     * @returns {boolean} always true
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     */
    hasFeature: function(feature, version) {
      return true;
    },
    /**
     * Creates an XML Document object of the specified type with its document element.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
     * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string|null} namespaceURI
     * @param {string} qualifiedName
     * @param {DocumentType=null} doctype
     * @returns {Document}
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocument: function(namespaceURI, qualifiedName, doctype) {
      var doc = new Document();
      doc.implementation = this;
      doc.childNodes = new NodeList();
      doc.doctype = doctype || null;
      if (doctype) {
        doc.appendChild(doctype);
      }
      if (qualifiedName) {
        var root = doc.createElementNS(namespaceURI, qualifiedName);
        doc.appendChild(root);
      }
      return doc;
    },
    /**
     * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
     *
     * __This behavior is slightly different from the in the specs__:
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string} qualifiedName
     * @param {string} [publicId]
     * @param {string} [systemId]
     * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
     * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocumentType: function(qualifiedName, publicId, systemId) {
      var node = new DocumentType();
      node.name = qualifiedName;
      node.nodeName = qualifiedName;
      node.publicId = publicId || "";
      node.systemId = systemId || "";
      return node;
    }
  };
  function Node() {
  }
  Node.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    // Modified in DOM Level 2:
    insertBefore: function(newChild, refChild) {
      return _insertBefore(this, newChild, refChild);
    },
    replaceChild: function(newChild, oldChild) {
      this.insertBefore(newChild, oldChild);
      if (oldChild) {
        this.removeChild(oldChild);
      }
    },
    removeChild: function(oldChild) {
      return _removeChild(this, oldChild);
    },
    appendChild: function(newChild) {
      return this.insertBefore(newChild, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(deep) {
      return cloneNode(this.ownerDocument || this, this, deep);
    },
    // Modified in DOM Level 2:
    normalize: function() {
      var child = this.firstChild;
      while (child) {
        var next = child.nextSibling;
        if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
          this.removeChild(next);
          child.appendData(next.data);
        } else {
          child.normalize();
          child = next;
        }
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function(feature, version) {
      return this.ownerDocument.implementation.hasFeature(feature, version);
    },
    // Introduced in DOM Level 2:
    hasAttributes: function() {
      return this.attributes.length > 0;
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
     *
     * @param {string | null} namespaceURI
     * @returns {string | null}
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     */
    lookupPrefix: function(namespaceURI) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          for (var n in map) {
            if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
              return n;
            }
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function(prefix) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          if (Object.prototype.hasOwnProperty.call(map, prefix)) {
            return map[prefix];
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function(namespaceURI) {
      var prefix = this.lookupPrefix(namespaceURI);
      return prefix == null;
    }
  };
  function _xmlEncoder(c) {
    return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
  }
  copy(NodeType, Node);
  copy(NodeType, Node.prototype);
  function _visitNode(node, callback) {
    if (callback(node)) {
      return true;
    }
    if (node = node.firstChild) {
      do {
        if (_visitNode(node, callback)) {
          return true;
        }
      } while (node = node.nextSibling);
    }
  }
  function Document() {
  }
  function _onAddAttribute(doc, el, newAttr) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE$2.XMLNS) {
      el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
    }
  }
  function _onRemoveAttribute(doc, el, newAttr, remove) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE$2.XMLNS) {
      delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
    }
  }
  function _onUpdateChild(doc, el, newChild) {
    if (doc && doc._inc) {
      doc._inc++;
      var cs = el.childNodes;
      if (newChild) {
        cs[cs.length++] = newChild;
      } else {
        var child = el.firstChild;
        var i2 = 0;
        while (child) {
          cs[i2++] = child;
          child = child.nextSibling;
        }
        cs.length = i2;
        delete cs[cs.length];
      }
    }
  }
  function _removeChild(parentNode, child) {
    var previous = child.previousSibling;
    var next = child.nextSibling;
    if (previous) {
      previous.nextSibling = next;
    } else {
      parentNode.firstChild = next;
    }
    if (next) {
      next.previousSibling = previous;
    } else {
      parentNode.lastChild = previous;
    }
    child.parentNode = null;
    child.previousSibling = null;
    child.nextSibling = null;
    _onUpdateChild(parentNode.ownerDocument, parentNode);
    return child;
  }
  function hasValidParentNodeType(node) {
    return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
  }
  function hasInsertableNodeType(node) {
    return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
  }
  function isDocTypeNode(node) {
    return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
  }
  function isElementNode(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }
  function isTextNode(node) {
    return node && node.nodeType === Node.TEXT_NODE;
  }
  function isElementInsertionPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    if (parentChildNodes.find(isElementNode) || isDocTypeNode(child)) {
      return false;
    }
    var docTypeNode = parentChildNodes.find(isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function _insertBefore(parent, node, child) {
    if (!hasValidParentNodeType(parent)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
    }
    if (child && child.parentNode !== parent) {
      throw new DOMException(NOT_FOUND_ERR, "child not in parent");
    }
    if (!hasInsertableNodeType(node) || // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE) {
      throw new DOMException(
        HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
      );
    }
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (parent.nodeType === Node.DOCUMENT_NODE) {
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        let nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || nodeChildNodes.find(isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (parentChildNodes.find(isElementNode) || !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (parentChildNodes.find(isDocTypeNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        let parentElementChild = parentChildNodes.find(isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    var cp = node.parentNode;
    if (cp) {
      cp.removeChild(node);
    }
    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = node.firstChild;
      if (newFirst == null) {
        return node;
      }
      var newLast = node.lastChild;
    } else {
      newFirst = newLast = node;
    }
    var pre = child ? child.previousSibling : parent.lastChild;
    newFirst.previousSibling = pre;
    newLast.nextSibling = child;
    if (pre) {
      pre.nextSibling = newFirst;
    } else {
      parent.firstChild = newFirst;
    }
    if (child == null) {
      parent.lastChild = newLast;
    } else {
      child.previousSibling = newLast;
    }
    do {
      newFirst.parentNode = parent;
    } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
    _onUpdateChild(parent.ownerDocument || parent, parent);
    if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
      node.firstChild = node.lastChild = null;
    }
    return node;
  }
  function _appendSingleChild(parentNode, newChild) {
    if (newChild.parentNode) {
      newChild.parentNode.removeChild(newChild);
    }
    newChild.parentNode = parentNode;
    newChild.previousSibling = parentNode.lastChild;
    newChild.nextSibling = null;
    if (newChild.previousSibling) {
      newChild.previousSibling.nextSibling = newChild;
    } else {
      parentNode.firstChild = newChild;
    }
    parentNode.lastChild = newChild;
    _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
    return newChild;
  }
  Document.prototype = {
    //implementation : null,
    nodeName: "#document",
    nodeType: DOCUMENT_NODE,
    /**
     * The DocumentType node of the document.
     *
     * @readonly
     * @type DocumentType
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(newChild, refChild) {
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        var child = newChild.firstChild;
        while (child) {
          var next = child.nextSibling;
          this.insertBefore(child, refChild);
          child = next;
        }
        return newChild;
      }
      _insertBefore(this, newChild, refChild);
      newChild.ownerDocument = this;
      if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
        this.documentElement = newChild;
      }
      return newChild;
    },
    removeChild: function(oldChild) {
      if (this.documentElement == oldChild) {
        this.documentElement = null;
      }
      return _removeChild(this, oldChild);
    },
    // Introduced in DOM Level 2:
    importNode: function(importedNode, deep) {
      return importNode(this, importedNode, deep);
    },
    // Introduced in DOM Level 2:
    getElementById: function(id) {
      var rtv = null;
      _visitNode(this.documentElement, function(node) {
        if (node.nodeType == ELEMENT_NODE) {
          if (node.getAttribute("id") == id) {
            rtv = node;
            return true;
          }
        }
      });
      return rtv;
    },
    /**
     * The `getElementsByClassName` method of `Document` interface returns an array-like object
     * of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
     *
     *
     * Warning: This is a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(classNames) {
      var classNamesSet = toOrderedSet(classNames);
      return new LiveNodeList(this, function(base) {
        var ls = [];
        if (classNamesSet.length > 0) {
          _visitNode(base.documentElement, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE) {
              var nodeClassNames = node.getAttribute("class");
              if (nodeClassNames) {
                var matches = classNames === nodeClassNames;
                if (!matches) {
                  var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                  matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                }
                if (matches) {
                  ls.push(node);
                }
              }
            }
          });
        }
        return ls;
      });
    },
    //document factory method:
    createElement: function(tagName) {
      var node = new Element();
      node.ownerDocument = this;
      node.nodeName = tagName;
      node.tagName = tagName;
      node.localName = tagName;
      node.childNodes = new NodeList();
      var attrs = node.attributes = new NamedNodeMap();
      attrs._ownerElement = node;
      return node;
    },
    createDocumentFragment: function() {
      var node = new DocumentFragment();
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      return node;
    },
    createTextNode: function(data) {
      var node = new Text();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createComment: function(data) {
      var node = new Comment();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createCDATASection: function(data) {
      var node = new CDATASection();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createProcessingInstruction: function(target, data) {
      var node = new ProcessingInstruction();
      node.ownerDocument = this;
      node.tagName = node.target = target;
      node.nodeValue = node.data = data;
      return node;
    },
    createAttribute: function(name) {
      var node = new Attr();
      node.ownerDocument = this;
      node.name = name;
      node.nodeName = name;
      node.localName = name;
      node.specified = true;
      return node;
    },
    createEntityReference: function(name) {
      var node = new EntityReference();
      node.ownerDocument = this;
      node.nodeName = name;
      return node;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(namespaceURI, qualifiedName) {
      var node = new Element();
      var pl = qualifiedName.split(":");
      var attrs = node.attributes = new NamedNodeMap();
      node.childNodes = new NodeList();
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.tagName = qualifiedName;
      node.namespaceURI = namespaceURI;
      if (pl.length == 2) {
        node.prefix = pl[0];
        node.localName = pl[1];
      } else {
        node.localName = qualifiedName;
      }
      attrs._ownerElement = node;
      return node;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(namespaceURI, qualifiedName) {
      var node = new Attr();
      var pl = qualifiedName.split(":");
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.name = qualifiedName;
      node.namespaceURI = namespaceURI;
      node.specified = true;
      if (pl.length == 2) {
        node.prefix = pl[0];
        node.localName = pl[1];
      } else {
        node.localName = qualifiedName;
      }
      return node;
    }
  };
  _extends(Document, Node);
  function Element() {
    this._nsMap = {};
  }
  Element.prototype = {
    nodeType: ELEMENT_NODE,
    hasAttribute: function(name) {
      return this.getAttributeNode(name) != null;
    },
    getAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      return attr && attr.value || "";
    },
    getAttributeNode: function(name) {
      return this.attributes.getNamedItem(name);
    },
    setAttribute: function(name, value) {
      var attr = this.ownerDocument.createAttribute(name);
      attr.value = attr.nodeValue = "" + value;
      this.setAttributeNode(attr);
    },
    removeAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      attr && this.removeAttributeNode(attr);
    },
    //four real opeartion method
    appendChild: function(newChild) {
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        return this.insertBefore(newChild, null);
      } else {
        return _appendSingleChild(this, newChild);
      }
    },
    setAttributeNode: function(newAttr) {
      return this.attributes.setNamedItem(newAttr);
    },
    setAttributeNodeNS: function(newAttr) {
      return this.attributes.setNamedItemNS(newAttr);
    },
    removeAttributeNode: function(oldAttr) {
      return this.attributes.removeNamedItem(oldAttr.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(namespaceURI, localName) {
      var old = this.getAttributeNodeNS(namespaceURI, localName);
      old && this.removeAttributeNode(old);
    },
    hasAttributeNS: function(namespaceURI, localName) {
      return this.getAttributeNodeNS(namespaceURI, localName) != null;
    },
    getAttributeNS: function(namespaceURI, localName) {
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      return attr && attr.value || "";
    },
    setAttributeNS: function(namespaceURI, qualifiedName, value) {
      var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
      attr.value = attr.nodeValue = "" + value;
      this.setAttributeNode(attr);
    },
    getAttributeNodeNS: function(namespaceURI, localName) {
      return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    getElementsByTagName: function(tagName) {
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
            ls.push(node);
          }
        });
        return ls;
      });
    },
    getElementsByTagNameNS: function(namespaceURI, localName) {
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
            ls.push(node);
          }
        });
        return ls;
      });
    }
  };
  Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
  Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
  _extends(Element, Node);
  function Attr() {
  }
  Attr.prototype.nodeType = ATTRIBUTE_NODE;
  _extends(Attr, Node);
  function CharacterData() {
  }
  CharacterData.prototype = {
    data: "",
    substringData: function(offset, count) {
      return this.data.substring(offset, offset + count);
    },
    appendData: function(text) {
      text = this.data + text;
      this.nodeValue = this.data = text;
      this.length = text.length;
    },
    insertData: function(offset, text) {
      this.replaceData(offset, 0, text);
    },
    appendChild: function(newChild) {
      throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
    },
    deleteData: function(offset, count) {
      this.replaceData(offset, count, "");
    },
    replaceData: function(offset, count, text) {
      var start = this.data.substring(0, offset);
      var end = this.data.substring(offset + count);
      text = start + text + end;
      this.nodeValue = this.data = text;
      this.length = text.length;
    }
  };
  _extends(CharacterData, Node);
  function Text() {
  }
  Text.prototype = {
    nodeName: "#text",
    nodeType: TEXT_NODE,
    splitText: function(offset) {
      var text = this.data;
      var newText = text.substring(offset);
      text = text.substring(0, offset);
      this.data = this.nodeValue = text;
      this.length = text.length;
      var newNode = this.ownerDocument.createTextNode(newText);
      if (this.parentNode) {
        this.parentNode.insertBefore(newNode, this.nextSibling);
      }
      return newNode;
    }
  };
  _extends(Text, CharacterData);
  function Comment() {
  }
  Comment.prototype = {
    nodeName: "#comment",
    nodeType: COMMENT_NODE
  };
  _extends(Comment, CharacterData);
  function CDATASection() {
  }
  CDATASection.prototype = {
    nodeName: "#cdata-section",
    nodeType: CDATA_SECTION_NODE
  };
  _extends(CDATASection, CharacterData);
  function DocumentType() {
  }
  DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
  _extends(DocumentType, Node);
  function Notation() {
  }
  Notation.prototype.nodeType = NOTATION_NODE;
  _extends(Notation, Node);
  function Entity() {
  }
  Entity.prototype.nodeType = ENTITY_NODE;
  _extends(Entity, Node);
  function EntityReference() {
  }
  EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
  _extends(EntityReference, Node);
  function DocumentFragment() {
  }
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
  _extends(DocumentFragment, Node);
  function ProcessingInstruction() {
  }
  ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
  _extends(ProcessingInstruction, Node);
  function XMLSerializer() {
  }
  XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
    return nodeSerializeToString.call(node, isHtml, nodeFilter);
  };
  Node.prototype.toString = nodeSerializeToString;
  function nodeSerializeToString(isHtml, nodeFilter) {
    var buf = [];
    var refNode = this.nodeType == 9 && this.documentElement || this;
    var prefix = refNode.prefix;
    var uri2 = refNode.namespaceURI;
    if (uri2 && prefix == null) {
      var prefix = refNode.lookupPrefix(uri2);
      if (prefix == null) {
        var visibleNamespaces = [
          { namespace: uri2, prefix: null }
          //{namespace:uri,prefix:''}
        ];
      }
    }
    serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
    return buf.join("");
  }
  function needNamespaceDefine(node, isHTML, visibleNamespaces) {
    var prefix = node.prefix || "";
    var uri2 = node.namespaceURI;
    if (!uri2) {
      return false;
    }
    if (prefix === "xml" && uri2 === NAMESPACE$2.XML || uri2 === NAMESPACE$2.XMLNS) {
      return false;
    }
    var i2 = visibleNamespaces.length;
    while (i2--) {
      var ns = visibleNamespaces[i2];
      if (ns.prefix === prefix) {
        return ns.namespace !== uri2;
      }
    }
    return true;
  }
  function addSerializedAttribute(buf, qualifiedName, value) {
    buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
  }
  function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
    if (!visibleNamespaces) {
      visibleNamespaces = [];
    }
    if (nodeFilter) {
      node = nodeFilter(node);
      if (node) {
        if (typeof node == "string") {
          buf.push(node);
          return;
        }
      } else {
        return;
      }
    }
    switch (node.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var len2 = attrs.length;
        var child = node.firstChild;
        var nodeName = node.tagName;
        isHTML = NAMESPACE$2.isHTML(node.namespaceURI) || isHTML;
        var prefixedNodeName = nodeName;
        if (!isHTML && !node.prefix && node.namespaceURI) {
          var defaultNS;
          for (var ai = 0; ai < attrs.length; ai++) {
            if (attrs.item(ai).name === "xmlns") {
              defaultNS = attrs.item(ai).value;
              break;
            }
          }
          if (!defaultNS) {
            for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                defaultNS = namespace.namespace;
                break;
              }
            }
          }
          if (defaultNS !== node.namespaceURI) {
            for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.namespace === node.namespaceURI) {
                if (namespace.prefix) {
                  prefixedNodeName = namespace.prefix + ":" + nodeName;
                }
                break;
              }
            }
          }
        }
        buf.push("<", prefixedNodeName);
        for (var i2 = 0; i2 < len2; i2++) {
          var attr = attrs.item(i2);
          if (attr.prefix == "xmlns") {
            visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
          } else if (attr.nodeName == "xmlns") {
            visibleNamespaces.push({ prefix: "", namespace: attr.value });
          }
        }
        for (var i2 = 0; i2 < len2; i2++) {
          var attr = attrs.item(i2);
          if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
            var prefix = attr.prefix || "";
            var uri2 = attr.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri2);
            visibleNamespaces.push({ prefix, namespace: uri2 });
          }
          serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
        }
        if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
          var prefix = node.prefix || "";
          var uri2 = node.namespaceURI;
          addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri2);
          visibleNamespaces.push({ prefix, namespace: uri2 });
        }
        if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
          buf.push(">");
          if (isHTML && /^script$/i.test(nodeName)) {
            while (child) {
              if (child.data) {
                buf.push(child.data);
              } else {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
              }
              child = child.nextSibling;
            }
          } else {
            while (child) {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
              child = child.nextSibling;
            }
          }
          buf.push("</", prefixedNodeName, ">");
        } else {
          buf.push("/>");
        }
        return;
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        var child = node.firstChild;
        while (child) {
          serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
          child = child.nextSibling;
        }
        return;
      case ATTRIBUTE_NODE:
        return addSerializedAttribute(buf, node.name, node.value);
      case TEXT_NODE:
        return buf.push(
          node.data.replace(/[<&>]/g, _xmlEncoder)
        );
      case CDATA_SECTION_NODE:
        return buf.push("<![CDATA[", node.data, "]]>");
      case COMMENT_NODE:
        return buf.push("<!--", node.data, "-->");
      case DOCUMENT_TYPE_NODE:
        var pubid = node.publicId;
        var sysid = node.systemId;
        buf.push("<!DOCTYPE ", node.name);
        if (pubid) {
          buf.push(" PUBLIC ", pubid);
          if (sysid && sysid != ".") {
            buf.push(" ", sysid);
          }
          buf.push(">");
        } else if (sysid && sysid != ".") {
          buf.push(" SYSTEM ", sysid, ">");
        } else {
          var sub = node.internalSubset;
          if (sub) {
            buf.push(" [", sub, "]");
          }
          buf.push(">");
        }
        return;
      case PROCESSING_INSTRUCTION_NODE:
        return buf.push("<?", node.target, " ", node.data, "?>");
      case ENTITY_REFERENCE_NODE:
        return buf.push("&", node.nodeName, ";");
      default:
        buf.push("??", node.nodeName);
    }
  }
  function importNode(doc, node, deep) {
    var node2;
    switch (node.nodeType) {
      case ELEMENT_NODE:
        node2 = node.cloneNode(false);
        node2.ownerDocument = doc;
      case DOCUMENT_FRAGMENT_NODE:
        break;
      case ATTRIBUTE_NODE:
        deep = true;
        break;
    }
    if (!node2) {
      node2 = node.cloneNode(false);
    }
    node2.ownerDocument = doc;
    node2.parentNode = null;
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(importNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function cloneNode(doc, node, deep) {
    var node2 = new node.constructor();
    for (var n in node) {
      if (Object.prototype.hasOwnProperty.call(node, n)) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
    }
    if (node.childNodes) {
      node2.childNodes = new NodeList();
    }
    node2.ownerDocument = doc;
    switch (node2.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var attrs2 = node2.attributes = new NamedNodeMap();
        var len2 = attrs.length;
        attrs2._ownerElement = node2;
        for (var i2 = 0; i2 < len2; i2++) {
          node2.setAttributeNode(cloneNode(doc, attrs.item(i2), true));
        }
        break;
      case ATTRIBUTE_NODE:
        deep = true;
    }
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(cloneNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function __set__(object, key, value) {
    object[key] = value;
  }
  try {
    if (Object.defineProperty) {
      let getTextContent = function(node) {
        switch (node.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var buf = [];
            node = node.firstChild;
            while (node) {
              if (node.nodeType !== 7 && node.nodeType !== 8) {
                buf.push(getTextContent(node));
              }
              node = node.nextSibling;
            }
            return buf.join("");
          default:
            return node.nodeValue;
        }
      };
      Object.defineProperty(LiveNodeList.prototype, "length", {
        get: function() {
          _updateLiveList(this);
          return this.$$length;
        }
      });
      Object.defineProperty(Node.prototype, "textContent", {
        get: function() {
          return getTextContent(this);
        },
        set: function(data) {
          switch (this.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              while (this.firstChild) {
                this.removeChild(this.firstChild);
              }
              if (data || String(data)) {
                this.appendChild(this.ownerDocument.createTextNode(data));
              }
              break;
            default:
              this.data = data;
              this.value = data;
              this.nodeValue = data;
          }
        }
      });
      __set__ = function(object, key, value) {
        object["$$" + key] = value;
      };
    }
  } catch (e) {
  }
  dom$1.DocumentType = DocumentType;
  dom$1.DOMException = DOMException;
  dom$1.DOMImplementation = DOMImplementation$1;
  dom$1.Element = Element;
  dom$1.Node = Node;
  dom$1.NodeList = NodeList;
  dom$1.XMLSerializer = XMLSerializer;
  var domParser = {};
  var entities$1 = {};
  (function(exports$1) {
    var freeze2 = conventions$2.freeze;
    exports$1.XML_ENTITIES = freeze2({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' });
    exports$1.HTML_ENTITIES = freeze2({
      lt: "<",
      gt: ">",
      amp: "&",
      quot: '"',
      apos: "'",
      Agrave: "À",
      Aacute: "Á",
      Acirc: "Â",
      Atilde: "Ã",
      Auml: "Ä",
      Aring: "Å",
      AElig: "Æ",
      Ccedil: "Ç",
      Egrave: "È",
      Eacute: "É",
      Ecirc: "Ê",
      Euml: "Ë",
      Igrave: "Ì",
      Iacute: "Í",
      Icirc: "Î",
      Iuml: "Ï",
      ETH: "Ð",
      Ntilde: "Ñ",
      Ograve: "Ò",
      Oacute: "Ó",
      Ocirc: "Ô",
      Otilde: "Õ",
      Ouml: "Ö",
      Oslash: "Ø",
      Ugrave: "Ù",
      Uacute: "Ú",
      Ucirc: "Û",
      Uuml: "Ü",
      Yacute: "Ý",
      THORN: "Þ",
      szlig: "ß",
      agrave: "à",
      aacute: "á",
      acirc: "â",
      atilde: "ã",
      auml: "ä",
      aring: "å",
      aelig: "æ",
      ccedil: "ç",
      egrave: "è",
      eacute: "é",
      ecirc: "ê",
      euml: "ë",
      igrave: "ì",
      iacute: "í",
      icirc: "î",
      iuml: "ï",
      eth: "ð",
      ntilde: "ñ",
      ograve: "ò",
      oacute: "ó",
      ocirc: "ô",
      otilde: "õ",
      ouml: "ö",
      oslash: "ø",
      ugrave: "ù",
      uacute: "ú",
      ucirc: "û",
      uuml: "ü",
      yacute: "ý",
      thorn: "þ",
      yuml: "ÿ",
      nbsp: " ",
      iexcl: "¡",
      cent: "¢",
      pound: "£",
      curren: "¤",
      yen: "¥",
      brvbar: "¦",
      sect: "§",
      uml: "¨",
      copy: "©",
      ordf: "ª",
      laquo: "«",
      not: "¬",
      shy: "­­",
      reg: "®",
      macr: "¯",
      deg: "°",
      plusmn: "±",
      sup2: "²",
      sup3: "³",
      acute: "´",
      micro: "µ",
      para: "¶",
      middot: "·",
      cedil: "¸",
      sup1: "¹",
      ordm: "º",
      raquo: "»",
      frac14: "¼",
      frac12: "½",
      frac34: "¾",
      iquest: "¿",
      times: "×",
      divide: "÷",
      forall: "∀",
      part: "∂",
      exist: "∃",
      empty: "∅",
      nabla: "∇",
      isin: "∈",
      notin: "∉",
      ni: "∋",
      prod: "∏",
      sum: "∑",
      minus: "−",
      lowast: "∗",
      radic: "√",
      prop: "∝",
      infin: "∞",
      ang: "∠",
      and: "∧",
      or: "∨",
      cap: "∩",
      cup: "∪",
      "int": "∫",
      there4: "∴",
      sim: "∼",
      cong: "≅",
      asymp: "≈",
      ne: "≠",
      equiv: "≡",
      le: "≤",
      ge: "≥",
      sub: "⊂",
      sup: "⊃",
      nsub: "⊄",
      sube: "⊆",
      supe: "⊇",
      oplus: "⊕",
      otimes: "⊗",
      perp: "⊥",
      sdot: "⋅",
      Alpha: "Α",
      Beta: "Β",
      Gamma: "Γ",
      Delta: "Δ",
      Epsilon: "Ε",
      Zeta: "Ζ",
      Eta: "Η",
      Theta: "Θ",
      Iota: "Ι",
      Kappa: "Κ",
      Lambda: "Λ",
      Mu: "Μ",
      Nu: "Ν",
      Xi: "Ξ",
      Omicron: "Ο",
      Pi: "Π",
      Rho: "Ρ",
      Sigma: "Σ",
      Tau: "Τ",
      Upsilon: "Υ",
      Phi: "Φ",
      Chi: "Χ",
      Psi: "Ψ",
      Omega: "Ω",
      alpha: "α",
      beta: "β",
      gamma: "γ",
      delta: "δ",
      epsilon: "ε",
      zeta: "ζ",
      eta: "η",
      theta: "θ",
      iota: "ι",
      kappa: "κ",
      lambda: "λ",
      mu: "μ",
      nu: "ν",
      xi: "ξ",
      omicron: "ο",
      pi: "π",
      rho: "ρ",
      sigmaf: "ς",
      sigma: "σ",
      tau: "τ",
      upsilon: "υ",
      phi: "φ",
      chi: "χ",
      psi: "ψ",
      omega: "ω",
      thetasym: "ϑ",
      upsih: "ϒ",
      piv: "ϖ",
      OElig: "Œ",
      oelig: "œ",
      Scaron: "Š",
      scaron: "š",
      Yuml: "Ÿ",
      fnof: "ƒ",
      circ: "ˆ",
      tilde: "˜",
      ensp: " ",
      emsp: " ",
      thinsp: " ",
      zwnj: "‌",
      zwj: "‍",
      lrm: "‎",
      rlm: "‏",
      ndash: "–",
      mdash: "—",
      lsquo: "‘",
      rsquo: "’",
      sbquo: "‚",
      ldquo: "“",
      rdquo: "”",
      bdquo: "„",
      dagger: "†",
      Dagger: "‡",
      bull: "•",
      hellip: "…",
      permil: "‰",
      prime: "′",
      Prime: "″",
      lsaquo: "‹",
      rsaquo: "›",
      oline: "‾",
      euro: "€",
      trade: "™",
      larr: "←",
      uarr: "↑",
      rarr: "→",
      darr: "↓",
      harr: "↔",
      crarr: "↵",
      lceil: "⌈",
      rceil: "⌉",
      lfloor: "⌊",
      rfloor: "⌋",
      loz: "◊",
      spades: "♠",
      clubs: "♣",
      hearts: "♥",
      diams: "♦"
    });
    exports$1.entityMap = exports$1.HTML_ENTITIES;
  })(entities$1);
  var sax$1 = {};
  var NAMESPACE$1 = conventions$2.NAMESPACE;
  var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
  var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
  var S_TAG = 0;
  var S_ATTR = 1;
  var S_ATTR_SPACE = 2;
  var S_EQ = 3;
  var S_ATTR_NOQUOT_VALUE = 4;
  var S_ATTR_END = 5;
  var S_TAG_SPACE = 6;
  var S_TAG_CLOSE = 7;
  function ParseError$1(message, locator) {
    this.message = message;
    this.locator = locator;
    if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError$1);
  }
  ParseError$1.prototype = new Error();
  ParseError$1.prototype.name = ParseError$1.name;
  function XMLReader$1() {
  }
  XMLReader$1.prototype = {
    parse: function(source, defaultNSMap, entityMap) {
      var domBuilder = this.domBuilder;
      domBuilder.startDocument();
      _copy(defaultNSMap, defaultNSMap = {});
      parse(
        source,
        defaultNSMap,
        entityMap,
        domBuilder,
        this.errorHandler
      );
      domBuilder.endDocument();
    }
  };
  function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
    function fixedFromCharCode(code2) {
      if (code2 > 65535) {
        code2 -= 65536;
        var surrogate1 = 55296 + (code2 >> 10), surrogate2 = 56320 + (code2 & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      } else {
        return String.fromCharCode(code2);
      }
    }
    function entityReplacer(a2) {
      var k = a2.slice(1, -1);
      if (Object.hasOwnProperty.call(entityMap, k)) {
        return entityMap[k];
      } else if (k.charAt(0) === "#") {
        return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
      } else {
        errorHandler.error("entity not found:" + a2);
        return a2;
      }
    }
    function appendText(end2) {
      if (end2 > start) {
        var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
        locator && position2(start);
        domBuilder.characters(xt, 0, end2 - start);
        start = end2;
      }
    }
    function position2(p, m) {
      while (p >= lineEnd && (m = linePattern.exec(source))) {
        lineStart = m.index;
        lineEnd = lineStart + m[0].length;
        locator.lineNumber++;
      }
      locator.columnNumber = p - lineStart + 1;
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /.*(?:\r\n?|\n)|.*$/g;
    var locator = domBuilder.locator;
    var parseStack = [{ currentNSMap: defaultNSMapCopy }];
    var closeMap = {};
    var start = 0;
    while (true) {
      try {
        var tagStart = source.indexOf("<", start);
        if (tagStart < 0) {
          if (!source.substr(start).match(/^\s*$/)) {
            var doc = domBuilder.doc;
            var text = doc.createTextNode(source.substr(start));
            doc.appendChild(text);
            domBuilder.currentElement = text;
          }
          return;
        }
        if (tagStart > start) {
          appendText(tagStart);
        }
        switch (source.charAt(tagStart + 1)) {
          case "/":
            var end = source.indexOf(">", tagStart + 3);
            var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
            var config = parseStack.pop();
            if (end < 0) {
              tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
              errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
              end = tagStart + 1 + tagName.length;
            } else if (tagName.match(/\s</)) {
              tagName = tagName.replace(/[\s<].*/, "");
              errorHandler.error("end tag name: " + tagName + " maybe not complete");
              end = tagStart + 1 + tagName.length;
            }
            var localNSMap = config.localNSMap;
            var endMatch = config.tagName == tagName;
            var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
            if (endIgnoreCaseMach) {
              domBuilder.endElement(config.uri, config.localName, tagName);
              if (localNSMap) {
                for (var prefix in localNSMap) {
                  if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
              }
              if (!endMatch) {
                errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
              }
            } else {
              parseStack.push(config);
            }
            end++;
            break;
          case "?":
            locator && position2(tagStart);
            end = parseInstruction(source, tagStart, domBuilder);
            break;
          case "!":
            locator && position2(tagStart);
            end = parseDCC(source, tagStart, domBuilder, errorHandler);
            break;
          default:
            locator && position2(tagStart);
            var el = new ElementAttributes();
            var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
            var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
            var len2 = el.length;
            if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
              el.closed = true;
              if (!entityMap.nbsp) {
                errorHandler.warning("unclosed xml attribute");
              }
            }
            if (locator && len2) {
              var locator2 = copyLocator(locator, {});
              for (var i2 = 0; i2 < len2; i2++) {
                var a = el[i2];
                position2(a.offset);
                a.locator = copyLocator(locator, {});
              }
              domBuilder.locator = locator2;
              if (appendElement$1(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
              domBuilder.locator = locator;
            } else {
              if (appendElement$1(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
            }
            if (NAMESPACE$1.isHTML(el.uri) && !el.closed) {
              end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
            } else {
              end++;
            }
        }
      } catch (e) {
        if (e instanceof ParseError$1) {
          throw e;
        }
        errorHandler.error("element parse error: " + e);
        end = -1;
      }
      if (end > start) {
        start = end;
      } else {
        appendText(Math.max(tagStart, start) + 1);
      }
    }
  }
  function copyLocator(f, t) {
    t.lineNumber = f.lineNumber;
    t.columnNumber = f.columnNumber;
    return t;
  }
  function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
    function addAttribute(qname, value2, startIndex) {
      if (el.attributeNames.hasOwnProperty(qname)) {
        errorHandler.fatalError("Attribute " + qname + " redefined");
      }
      el.addValue(
        qname,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
        startIndex
      );
    }
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG;
    while (true) {
      var c = source.charAt(p);
      switch (c) {
        case "=":
          if (s === S_ATTR) {
            attrName = source.slice(start, p);
            s = S_EQ;
          } else if (s === S_ATTR_SPACE) {
            s = S_EQ;
          } else {
            throw new Error("attribute equal must after attrName");
          }
          break;
        case "'":
        case '"':
          if (s === S_EQ || s === S_ATTR) {
            if (s === S_ATTR) {
              errorHandler.warning('attribute value must after "="');
              attrName = source.slice(start, p);
            }
            start = p + 1;
            p = source.indexOf(c, start);
            if (p > 0) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start - 1);
              s = S_ATTR_END;
            } else {
              throw new Error("attribute value no end '" + c + "' match");
            }
          } else if (s == S_ATTR_NOQUOT_VALUE) {
            value = source.slice(start, p);
            addAttribute(attrName, value, start);
            errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
            start = p + 1;
            s = S_ATTR_END;
          } else {
            throw new Error('attribute value must after "="');
          }
          break;
        case "/":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              s = S_TAG_CLOSE;
              el.closed = true;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
            case S_ATTR_SPACE:
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          errorHandler.error("unexpected end of input");
          if (s == S_TAG) {
            el.setTagName(source.slice(start, p));
          }
          return p;
        case ">":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              break;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              value = source.slice(start, p);
              if (value.slice(-1) === "/") {
                el.closed = true;
                value = value.slice(0, -1);
              }
            case S_ATTR_SPACE:
              if (s === S_ATTR_SPACE) {
                value = attrName;
              }
              if (s == S_ATTR_NOQUOT_VALUE) {
                errorHandler.warning('attribute "' + value + '" missed quot(")!');
                addAttribute(attrName, value, start);
              } else {
                if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                  errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                }
                addAttribute(value, value, start);
              }
              break;
            case S_EQ:
              throw new Error("attribute value missed!!");
          }
          return p;
        case "":
          c = " ";
        default:
          if (c <= " ") {
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
                s = S_TAG_SPACE;
                break;
              case S_ATTR:
                attrName = source.slice(start, p);
                s = S_ATTR_SPACE;
                break;
              case S_ATTR_NOQUOT_VALUE:
                var value = source.slice(start, p);
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                addAttribute(attrName, value, start);
              case S_ATTR_END:
                s = S_TAG_SPACE;
                break;
            }
          } else {
            switch (s) {
              case S_ATTR_SPACE:
                el.tagName;
                if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                  errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                }
                addAttribute(attrName, attrName, start);
                start = p;
                s = S_ATTR;
                break;
              case S_ATTR_END:
                errorHandler.warning('attribute space is required"' + attrName + '"!!');
              case S_TAG_SPACE:
                s = S_ATTR;
                start = p;
                break;
              case S_EQ:
                s = S_ATTR_NOQUOT_VALUE;
                start = p;
                break;
              case S_TAG_CLOSE:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
          }
      }
      p++;
    }
  }
  function appendElement$1(el, domBuilder, currentNSMap) {
    var tagName = el.tagName;
    var localNSMap = null;
    var i2 = el.length;
    while (i2--) {
      var a = el[i2];
      var qName = a.qName;
      var value = a.value;
      var nsp = qName.indexOf(":");
      if (nsp > 0) {
        var prefix = a.prefix = qName.slice(0, nsp);
        var localName = qName.slice(nsp + 1);
        var nsPrefix = prefix === "xmlns" && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === "xmlns" && "";
      }
      a.localName = localName;
      if (nsPrefix !== false) {
        if (localNSMap == null) {
          localNSMap = {};
          _copy(currentNSMap, currentNSMap = {});
        }
        currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
        a.uri = NAMESPACE$1.XMLNS;
        domBuilder.startPrefixMapping(nsPrefix, value);
      }
    }
    var i2 = el.length;
    while (i2--) {
      a = el[i2];
      var prefix = a.prefix;
      if (prefix) {
        if (prefix === "xml") {
          a.uri = NAMESPACE$1.XML;
        }
        if (prefix !== "xmlns") {
          a.uri = currentNSMap[prefix || ""];
        }
      }
    }
    var nsp = tagName.indexOf(":");
    if (nsp > 0) {
      prefix = el.prefix = tagName.slice(0, nsp);
      localName = el.localName = tagName.slice(nsp + 1);
    } else {
      prefix = null;
      localName = el.localName = tagName;
    }
    var ns = el.uri = currentNSMap[prefix || ""];
    domBuilder.startElement(ns, localName, tagName, el);
    if (el.closed) {
      domBuilder.endElement(ns, localName, tagName);
      if (localNSMap) {
        for (prefix in localNSMap) {
          if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      }
    } else {
      el.currentNSMap = currentNSMap;
      el.localNSMap = localNSMap;
      return true;
    }
  }
  function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
    if (/^(?:script|textarea)$/i.test(tagName)) {
      var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
      var text = source.substring(elStartEnd + 1, elEndStart);
      if (/[&<]/.test(text)) {
        if (/^script$/i.test(tagName)) {
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
        text = text.replace(/&#?\w+;/g, entityReplacer);
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
    }
    return elStartEnd + 1;
  }
  function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
    var pos = closeMap[tagName];
    if (pos == null) {
      pos = source.lastIndexOf("</" + tagName + ">");
      if (pos < elStartEnd) {
        pos = source.lastIndexOf("</" + tagName);
      }
      closeMap[tagName] = pos;
    }
    return pos < elStartEnd;
  }
  function _copy(source, target) {
    for (var n in source) {
      if (Object.prototype.hasOwnProperty.call(source, n)) {
        target[n] = source[n];
      }
    }
  }
  function parseDCC(source, start, domBuilder, errorHandler) {
    var next = source.charAt(start + 2);
    switch (next) {
      case "-":
        if (source.charAt(start + 3) === "-") {
          var end = source.indexOf("-->", start + 4);
          if (end > start) {
            domBuilder.comment(source, start + 4, end - start - 4);
            return end + 3;
          } else {
            errorHandler.error("Unclosed comment");
            return -1;
          }
        } else {
          return -1;
        }
      default:
        if (source.substr(start + 3, 6) == "CDATA[") {
          var end = source.indexOf("]]>", start + 9);
          domBuilder.startCDATA();
          domBuilder.characters(source, start + 9, end - start - 9);
          domBuilder.endCDATA();
          return end + 3;
        }
        var matchs = split(source, start);
        var len2 = matchs.length;
        if (len2 > 1 && /!doctype/i.test(matchs[0][0])) {
          var name = matchs[1][0];
          var pubid = false;
          var sysid = false;
          if (len2 > 3) {
            if (/^public$/i.test(matchs[2][0])) {
              pubid = matchs[3][0];
              sysid = len2 > 4 && matchs[4][0];
            } else if (/^system$/i.test(matchs[2][0])) {
              sysid = matchs[3][0];
            }
          }
          var lastMatch = matchs[len2 - 1];
          domBuilder.startDTD(name, pubid, sysid);
          domBuilder.endDTD();
          return lastMatch.index + lastMatch[0].length;
        }
    }
    return -1;
  }
  function parseInstruction(source, start, domBuilder) {
    var end = source.indexOf("?>", start);
    if (end) {
      var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      if (match) {
        match[0].length;
        domBuilder.processingInstruction(match[1], match[2]);
        return end + 2;
      } else {
        return -1;
      }
    }
    return -1;
  }
  function ElementAttributes() {
    this.attributeNames = {};
  }
  ElementAttributes.prototype = {
    setTagName: function(tagName) {
      if (!tagNamePattern.test(tagName)) {
        throw new Error("invalid tagName:" + tagName);
      }
      this.tagName = tagName;
    },
    addValue: function(qName, value, offset) {
      if (!tagNamePattern.test(qName)) {
        throw new Error("invalid attribute:" + qName);
      }
      this.attributeNames[qName] = this.length;
      this[this.length++] = { qName, value, offset };
    },
    length: 0,
    getLocalName: function(i2) {
      return this[i2].localName;
    },
    getLocator: function(i2) {
      return this[i2].locator;
    },
    getQName: function(i2) {
      return this[i2].qName;
    },
    getURI: function(i2) {
      return this[i2].uri;
    },
    getValue: function(i2) {
      return this[i2].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  };
  function split(source, start) {
    var match;
    var buf = [];
    var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    reg.lastIndex = start;
    reg.exec(source);
    while (match = reg.exec(source)) {
      buf.push(match);
      if (match[1]) return buf;
    }
  }
  sax$1.XMLReader = XMLReader$1;
  sax$1.ParseError = ParseError$1;
  var conventions = conventions$2;
  var dom = dom$1;
  var entities = entities$1;
  var sax = sax$1;
  var DOMImplementation = dom.DOMImplementation;
  var NAMESPACE = conventions.NAMESPACE;
  var ParseError = sax.ParseError;
  var XMLReader = sax.XMLReader;
  function normalizeLineEndings(input) {
    return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
  }
  function DOMParser$1(options) {
    this.options = options || { locator: {} };
  }
  DOMParser$1.prototype.parseFromString = function(source, mimeType) {
    var options = this.options;
    var sax2 = new XMLReader();
    var domBuilder = options.domBuilder || new DOMHandler();
    var errorHandler = options.errorHandler;
    var locator = options.locator;
    var defaultNSMap = options.xmlns || {};
    var isHTML = /\/x?html?$/.test(mimeType);
    var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
    if (locator) {
      domBuilder.setDocumentLocator(locator);
    }
    sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
    sax2.domBuilder = options.domBuilder || domBuilder;
    if (isHTML) {
      defaultNSMap[""] = NAMESPACE.HTML;
    }
    defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
    var normalize = options.normalizeLineEndings || normalizeLineEndings;
    if (source && typeof source === "string") {
      sax2.parse(
        normalize(source),
        defaultNSMap,
        entityMap
      );
    } else {
      sax2.errorHandler.error("invalid doc source");
    }
    return domBuilder.doc;
  };
  function buildErrorHandler(errorImpl, domBuilder, locator) {
    if (!errorImpl) {
      if (domBuilder instanceof DOMHandler) {
        return domBuilder;
      }
      errorImpl = domBuilder;
    }
    var errorHandler = {};
    var isCallback = errorImpl instanceof Function;
    locator = locator || {};
    function build(key) {
      var fn = errorImpl[key];
      if (!fn && isCallback) {
        fn = errorImpl.length == 2 ? function(msg2) {
          errorImpl(key, msg2);
        } : errorImpl;
      }
      errorHandler[key] = fn && function(msg2) {
        fn("[xmldom " + key + "]	" + msg2 + _locator(locator));
      } || function() {
      };
    }
    build("warning");
    build("error");
    build("fatalError");
    return errorHandler;
  }
  function DOMHandler() {
    this.cdata = false;
  }
  function position(locator, node) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
  }
  DOMHandler.prototype = {
    startDocument: function() {
      this.doc = new DOMImplementation().createDocument(null, null, null);
      if (this.locator) {
        this.doc.documentURI = this.locator.systemId;
      }
    },
    startElement: function(namespaceURI, localName, qName, attrs) {
      var doc = this.doc;
      var el = doc.createElementNS(namespaceURI, qName || localName);
      var len2 = attrs.length;
      appendElement(this, el);
      this.currentElement = el;
      this.locator && position(this.locator, el);
      for (var i2 = 0; i2 < len2; i2++) {
        var namespaceURI = attrs.getURI(i2);
        var value = attrs.getValue(i2);
        var qName = attrs.getQName(i2);
        var attr = doc.createAttributeNS(namespaceURI, qName);
        this.locator && position(attrs.getLocator(i2), attr);
        attr.value = attr.nodeValue = value;
        el.setAttributeNode(attr);
      }
    },
    endElement: function(namespaceURI, localName, qName) {
      var current = this.currentElement;
      current.tagName;
      this.currentElement = current.parentNode;
    },
    startPrefixMapping: function(prefix, uri2) {
    },
    endPrefixMapping: function(prefix) {
    },
    processingInstruction: function(target, data) {
      var ins = this.doc.createProcessingInstruction(target, data);
      this.locator && position(this.locator, ins);
      appendElement(this, ins);
    },
    ignorableWhitespace: function(ch, start, length) {
    },
    characters: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      if (chars) {
        if (this.cdata) {
          var charNode = this.doc.createCDATASection(chars);
        } else {
          var charNode = this.doc.createTextNode(chars);
        }
        if (this.currentElement) {
          this.currentElement.appendChild(charNode);
        } else if (/^\s*$/.test(chars)) {
          this.doc.appendChild(charNode);
        }
        this.locator && position(this.locator, charNode);
      }
    },
    skippedEntity: function(name) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(locator) {
      if (this.locator = locator) {
        locator.lineNumber = 0;
      }
    },
    //LexicalHandler
    comment: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      var comm = this.doc.createComment(chars);
      this.locator && position(this.locator, comm);
      appendElement(this, comm);
    },
    startCDATA: function() {
      this.cdata = true;
    },
    endCDATA: function() {
      this.cdata = false;
    },
    startDTD: function(name, publicId, systemId) {
      var impl = this.doc.implementation;
      if (impl && impl.createDocumentType) {
        var dt = impl.createDocumentType(name, publicId, systemId);
        this.locator && position(this.locator, dt);
        appendElement(this, dt);
        this.doc.doctype = dt;
      }
    },
    /**
     * @see org.xml.sax.ErrorHandler
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(error) {
      console.warn("[xmldom warning]	" + error, _locator(this.locator));
    },
    error: function(error) {
      console.error("[xmldom error]	" + error, _locator(this.locator));
    },
    fatalError: function(error) {
      throw new ParseError(error, this.locator);
    }
  };
  function _locator(l) {
    if (l) {
      return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
    }
  }
  function _toString(chars, start, length) {
    if (typeof chars == "string") {
      return chars.substr(start, length);
    } else {
      if (chars.length >= start + length || start) {
        return new java.lang.String(chars, start, length) + "";
      }
      return chars;
    }
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
    DOMHandler.prototype[key] = function() {
      return null;
    };
  });
  function appendElement(hander, node) {
    if (!hander.currentElement) {
      hander.doc.appendChild(node);
    } else {
      hander.currentElement.appendChild(node);
    }
  }
  domParser.__DOMHandler = DOMHandler;
  domParser.normalizeLineEndings = normalizeLineEndings;
  domParser.DOMParser = DOMParser$1;
  var DOMParser = domParser.DOMParser;
  class UrdfModel {
    /**
     * @param {Object} options
     * @param {Element} [options.xml] - The XML element to parse.
     * @param {string} [options.string] - The XML element to parse as a string.
     */
    constructor(options) {
      __publicField(this, "materials", {});
      __publicField(this, "links", {});
      __publicField(this, "joints", {});
      var xmlDoc = options.xml;
      var string = options.string;
      if (string) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(string, "text/xml").documentElement;
      }
      if (!xmlDoc) {
        throw new Error("No URDF document parsed!");
      }
      var robotXml = xmlDoc;
      this.name = robotXml.getAttribute("name");
      for (var nodes = robotXml.childNodes, i2 = 0; i2 < nodes.length; i2++) {
        var node = nodes[i2];
        if (node.tagName === "material") {
          var material = new UrdfMaterial({
            xml: node
          });
          if (this.materials[material.name] !== void 0) {
            if (this.materials[material.name].isLink()) {
              this.materials[material.name].assign(material);
            } else {
              console.warn("Material " + material.name + "is not unique.");
            }
          } else {
            this.materials[material.name] = material;
          }
        } else if (node.tagName === "link") {
          var link = new UrdfLink({
            xml: node
          });
          if (this.links[link.name] !== void 0) {
            console.warn("Link " + link.name + " is not unique.");
          } else {
            for (var j = 0; j < link.visuals.length; j++) {
              var mat = link.visuals[j].material;
              if (mat !== null && mat.name) {
                if (this.materials[mat.name] !== void 0) {
                  link.visuals[j].material = this.materials[mat.name];
                } else {
                  this.materials[mat.name] = mat;
                }
              }
            }
            this.links[link.name] = link;
          }
        } else if (node.tagName === "joint") {
          var joint = new UrdfJoint({
            xml: node
          });
          this.joints[joint.name] = joint;
        }
      }
    }
  }
  const Urdf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    URDF_BOX,
    URDF_CYLINDER,
    URDF_MESH,
    URDF_SPHERE,
    UrdfBox,
    UrdfColor,
    UrdfCylinder,
    UrdfLink,
    UrdfMaterial,
    UrdfMesh,
    UrdfModel,
    UrdfSphere,
    UrdfVisual
  }, Symbol.toStringTag, { value: "Module" }));
  const REVISION = "1.4.1";
  globalThis.ROSLIB = {
    REVISION,
    ...Core,
    ...ActionLib,
    ...Math$1,
    ...Tf,
    ...Urdf
  };
  var buffer = {};
  var base64Js = {};
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  var ieee754 = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i2 = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer2[offset + i2];
    i2 += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i2], i2 += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i2 = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
    }
    buffer2[offset + i2 - d] |= s * 128;
  };
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  (function(exports$1) {
    const base64 = base64Js;
    const ieee754$1 = ieee754;
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports$1.Buffer = Buffer3;
    exports$1.SlowBuffer = SlowBuffer2;
    exports$1.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports$1.kMaxLength = K_MAX_LENGTH;
    const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new GlobalUint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new GlobalUint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (GlobalArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, GlobalUint8Array.prototype);
    Object.setPrototypeOf(Buffer3, GlobalUint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength2(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, GlobalUint8Array)) {
        const copy2 = new GlobalUint8Array(arrayView);
        return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new GlobalUint8Array(array);
      } else if (length === void 0) {
        buf = new GlobalUint8Array(array, byteOffset);
      } else {
        buf = new GlobalUint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len2 = checked(obj.length) | 0;
        const buf = createBuffer(len2);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len2);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN2(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer2(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, GlobalUint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, GlobalUint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i2 = 0, len2 = Math.min(x, y); i2 < len2; ++i2) {
        if (a[i2] !== b[i2]) {
          x = a[i2];
          y = b[i2];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer2 = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2];
        if (isInstance(buf, GlobalUint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
            buf.copy(buffer2, pos);
          } else {
            GlobalUint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength2(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len2 = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len2 === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len2;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len2 * 2;
          case "hex":
            return len2 >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength2;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i2 = b[n];
      b[n] = b[m];
      b[m] = i2;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len2 = this.length;
      if (len2 % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len2 = this.length;
      if (len2 % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len2 = this.length;
      if (len2 % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len2; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max2 = exports$1.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max2) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, GlobalUint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len2 = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len2; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN2(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof GlobalUint8Array.prototype.indexOf === "function") {
          if (dir) {
            return GlobalUint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i3) {
        if (indexSize === 1) {
          return buf[i3];
        } else {
          return buf.readUInt16BE(i3 * indexSize);
        }
      }
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i2 + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i2;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN2(parsed)) return i2;
        buf[offset + i2] = parsed;
      }
      return i2;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              fourthByte = buf[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len2 = codePoints.length;
      if (len2 <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len2) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len2 = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len2) end = len2;
      let out = "";
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice2(start, end) {
      const len2 = this.length;
      start = ~~start;
      end = end === void 0 ? len2 : ~~end;
      if (start < 0) {
        start += len2;
        if (start < 0) start = 0;
      } else if (start > len2) {
        start = len2;
      }
      if (end < 0) {
        end += len2;
        if (end < 0) end = 0;
      } else if (end > len2) {
        end = len2;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength3, this.length);
      }
      let val = this[offset + --byteLength3];
      let mul = 1;
      while (byteLength3 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength3] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength3 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength3, this.length);
      let i2 = byteLength3;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max2, min2) {
      if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max2 || value < min2) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength3 = byteLength3 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
        checkInt(this, value, offset, byteLength3, maxBytes, 0);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min2, max2) {
      checkIntBI(value, min2, max2, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min2, max2) {
      checkIntBI(value, min2, max2, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength3 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength3 - 1);
        checkInt(this, value, offset, byteLength3, limit - 1, -limit);
      }
      let i2 = byteLength3 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength3;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max2, min2) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy2(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len2 = end - start;
      if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        GlobalUint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len2;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code2 = val.charCodeAt(0);
          if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len2 = bytes.length;
        if (len2 === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len2];
        }
      }
      return this;
    };
    const errors2 = {};
    function E(sym, getMessage, Base) {
      errors2[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range2, input) {
        let msg2 = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg2 += ` It must be ${range2}. Received ${received}`;
        return msg2;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function checkBounds(buf, offset, byteLength3) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
        boundsError(offset, buf.length - (byteLength3 + 1));
      }
    }
    function checkIntBI(value, min2, max2, buf, offset, byteLength3) {
      if (value > max2 || value < min2) {
        const n = typeof min2 === "bigint" ? "n" : "";
        let range2;
        {
          if (min2 === 0 || min2 === BigInt(0)) {
            range2 = `>= 0${n} and < 2${n} ** ${(byteLength3 + 1) * 8}${n}`;
          } else {
            range2 = `>= -(2${n} ** ${(byteLength3 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n}`;
          }
        }
        throw new errors2.ERR_OUT_OF_RANGE("value", range2, value);
      }
      checkBounds(buf, offset, byteLength3);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors2.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type2) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type2);
        throw new errors2.ERR_OUT_OF_RANGE("offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors2.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors2.ERR_OUT_OF_RANGE(
        "offset",
        `>= ${0} and <= ${length}`,
        value
      );
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i2);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length) break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    function isInstance(obj, type2) {
      return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
    }
    function numberIsNaN2(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  })(buffer);
  const Buffer2 = buffer.Buffer;
  const Blob$1 = buffer.Blob;
  const BlobOptions = buffer.BlobOptions;
  const Buffer$1 = buffer.Buffer;
  const File = buffer.File;
  const FileOptions = buffer.FileOptions;
  const INSPECT_MAX_BYTES = buffer.INSPECT_MAX_BYTES;
  const SlowBuffer = buffer.SlowBuffer;
  const TranscodeEncoding = buffer.TranscodeEncoding;
  const atob = buffer.atob;
  const btoa = buffer.btoa;
  const constants$1 = buffer.constants;
  const isAscii = buffer.isAscii;
  const isUtf8 = buffer.isUtf8;
  const kMaxLength = buffer.kMaxLength;
  const kStringMaxLength = buffer.kStringMaxLength;
  const resolveObjectURL = buffer.resolveObjectURL;
  const transcode = buffer.transcode;
  const dist = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Blob: Blob$1,
    BlobOptions,
    Buffer: Buffer$1,
    File,
    FileOptions,
    INSPECT_MAX_BYTES,
    SlowBuffer,
    TranscodeEncoding,
    atob,
    btoa,
    constants: constants$1,
    default: Buffer2,
    isAscii,
    isUtf8,
    kMaxLength,
    kStringMaxLength,
    resolveObjectURL,
    transcode
  }, Symbol.toStringTag, { value: "Module" }));
  var pngparse$1 = {};
  var empty = null;
  const empty$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: empty
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(empty$1);
  var events = { exports: {} };
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  events.exports = EventEmitter;
  events.exports.once = once;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type2) {
    var args = [];
    for (var i2 = 1; i2 < arguments.length; i2++) args.push(arguments[i2]);
    var doError = type2 === "error";
    var events2 = this._events;
    if (events2 !== void 0)
      doError = doError && events2.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err2 = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err2.context = er;
      throw err2;
    }
    var handler = events2[type2];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len2 = handler.length;
      var listeners = arrayClone(handler, len2);
      for (var i2 = 0; i2 < len2; ++i2)
        ReflectApply(listeners[i2], this, args);
    }
    return true;
  };
  function _addListener(target, type2, listener, prepend) {
    var m;
    var events2;
    var existing;
    checkListener(listener);
    events2 = target._events;
    if (events2 === void 0) {
      events2 = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events2.newListener !== void 0) {
        target.emit(
          "newListener",
          type2,
          listener.listener ? listener.listener : listener
        );
        events2 = target._events;
      }
      existing = events2[type2];
    }
    if (existing === void 0) {
      existing = events2[type2] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events2[type2] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type2;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type2, listener) {
    return _addListener(this, type2, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type2, listener) {
    return _addListener(this, type2, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type2, listener) {
    var state2 = { fired: false, wrapFn: void 0, target, type: type2, listener };
    var wrapped = onceWrapper.bind(state2);
    wrapped.listener = listener;
    state2.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once2(type2, listener) {
    checkListener(listener);
    this.on(type2, _onceWrap(this, type2, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type2, listener) {
    checkListener(listener);
    this.prependListener(type2, _onceWrap(this, type2, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(type2, listener) {
    var list, events2, position2, i2, originalListener;
    checkListener(listener);
    events2 = this._events;
    if (events2 === void 0)
      return this;
    list = events2[type2];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events2[type2];
        if (events2.removeListener)
          this.emit("removeListener", type2, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position2 = -1;
      for (i2 = list.length - 1; i2 >= 0; i2--) {
        if (list[i2] === listener || list[i2].listener === listener) {
          originalListener = list[i2].listener;
          position2 = i2;
          break;
        }
      }
      if (position2 < 0)
        return this;
      if (position2 === 0)
        list.shift();
      else {
        spliceOne(list, position2);
      }
      if (list.length === 1)
        events2[type2] = list[0];
      if (events2.removeListener !== void 0)
        this.emit("removeListener", type2, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type2) {
    var listeners, events2, i2;
    events2 = this._events;
    if (events2 === void 0)
      return this;
    if (events2.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events2[type2] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events2[type2];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events2);
      var key;
      for (i2 = 0; i2 < keys.length; ++i2) {
        key = keys[i2];
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events2[type2];
    if (typeof listeners === "function") {
      this.removeListener(type2, listeners);
    } else if (listeners !== void 0) {
      for (i2 = listeners.length - 1; i2 >= 0; i2--) {
        this.removeListener(type2, listeners[i2]);
      }
    }
    return this;
  };
  function _listeners(target, type2, unwrap) {
    var events2 = target._events;
    if (events2 === void 0)
      return [];
    var evlistener = events2[type2];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type2) {
    return _listeners(this, type2, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type2) {
    return _listeners(this, type2, false);
  };
  EventEmitter.listenerCount = function(emitter, type2) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type2);
    } else {
      return listenerCount.call(emitter, type2);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type2) {
    var events2 = this._events;
    if (events2 !== void 0) {
      var evlistener = events2[type2];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy2 = new Array(n);
    for (var i2 = 0; i2 < n; ++i2)
      copy2[i2] = arr[i2];
    return copy2;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i2 = 0; i2 < ret.length; ++i2) {
      ret[i2] = arr[i2].listener || arr[i2];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve, reject) {
      function errorListener(err2) {
        emitter.removeListener(name, resolver);
        reject(err2);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") {
          emitter.removeListener("error", errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") {
      eventTargetAgnosticAddListener(emitter, "error", handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === "function") {
      emitter.addEventListener(name, function wrapListener(arg) {
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  var eventsExports = events.exports;
  var inherits_browser = { exports: {} };
  if (typeof Object.create === "function") {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  var inherits_browserExports = inherits_browser.exports;
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browser$1 = { exports: {} };
  var process = browser$1.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len2 = queue.length;
    while (len2) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len2) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len2 = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        args[i2 - 1] = arguments[i2];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  var browserExports = browser$1.exports;
  const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
  var streamBrowser;
  var hasRequiredStreamBrowser;
  function requireStreamBrowser() {
    if (hasRequiredStreamBrowser) return streamBrowser;
    hasRequiredStreamBrowser = 1;
    streamBrowser = eventsExports.EventEmitter;
    return streamBrowser;
  }
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(dist);
  var util = {};
  var types = {};
  var shams$1 = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(obj, sym)
      );
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  var hasSymbols$3 = shams$1;
  var shams = function hasToStringTagShams() {
    return hasSymbols$3() && !!Symbol.toStringTag;
  };
  var esObjectAtoms = Object;
  var esErrors = Error;
  var _eval = EvalError;
  var range = RangeError;
  var ref = ReferenceError;
  var syntax = SyntaxError;
  var type = TypeError;
  var uri = URIError;
  var abs$1 = Math.abs;
  var floor$1 = Math.floor;
  var max$1 = Math.max;
  var min$1 = Math.min;
  var pow$1 = Math.pow;
  var round$1 = Math.round;
  var _isNaN = Number.isNaN || function isNaN2(a) {
    return a !== a;
  };
  var $isNaN = _isNaN;
  var sign$1 = function sign2(number) {
    if ($isNaN(number) || number === 0) {
      return number;
    }
    return number < 0 ? -1 : 1;
  };
  var gOPD$3 = Object.getOwnPropertyDescriptor;
  var $gOPD$1 = gOPD$3;
  if ($gOPD$1) {
    try {
      $gOPD$1([], "length");
    } catch (e) {
      $gOPD$1 = null;
    }
  }
  var gopd$1 = $gOPD$1;
  var $defineProperty$3 = Object.defineProperty || false;
  if ($defineProperty$3) {
    try {
      $defineProperty$3({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty$3 = false;
    }
  }
  var esDefineProperty = $defineProperty$3;
  var hasSymbols$2;
  var hasRequiredHasSymbols;
  function requireHasSymbols() {
    if (hasRequiredHasSymbols) return hasSymbols$2;
    hasRequiredHasSymbols = 1;
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = shams$1;
    hasSymbols$2 = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
    return hasSymbols$2;
  }
  var Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  var $Object$2 = esObjectAtoms;
  var Object_getPrototypeOf = $Object$2.getPrototypeOf || null;
  var implementation$6;
  var hasRequiredImplementation$2;
  function requireImplementation$2() {
    if (hasRequiredImplementation$2) return implementation$6;
    hasRequiredImplementation$2 = 1;
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr2 = Object.prototype.toString;
    var max2 = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i2 = 0; i2 < a.length; i2 += 1) {
        arr[i2] = a[i2];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i2 = offset, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
        arr[j] = arrLike[i2];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i2 = 0; i2 < arr.length; i2 += 1) {
        str += arr[i2];
        if (i2 + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    implementation$6 = function bind2(that) {
      var target = this;
      if (typeof target !== "function" || toStr2.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max2(0, target.length - args.length);
      var boundArgs = [];
      for (var i2 = 0; i2 < boundLength; i2++) {
        boundArgs[i2] = "$" + i2;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
    return implementation$6;
  }
  var functionBind;
  var hasRequiredFunctionBind;
  function requireFunctionBind() {
    if (hasRequiredFunctionBind) return functionBind;
    hasRequiredFunctionBind = 1;
    var implementation2 = requireImplementation$2();
    functionBind = Function.prototype.bind || implementation2;
    return functionBind;
  }
  var functionCall;
  var hasRequiredFunctionCall;
  function requireFunctionCall() {
    if (hasRequiredFunctionCall) return functionCall;
    hasRequiredFunctionCall = 1;
    functionCall = Function.prototype.call;
    return functionCall;
  }
  var functionApply;
  var hasRequiredFunctionApply;
  function requireFunctionApply() {
    if (hasRequiredFunctionApply) return functionApply;
    hasRequiredFunctionApply = 1;
    functionApply = Function.prototype.apply;
    return functionApply;
  }
  var reflectApply$1 = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  var bind$3 = requireFunctionBind();
  var $apply$2 = requireFunctionApply();
  var $call$2 = requireFunctionCall();
  var $reflectApply = reflectApply$1;
  var actualApply$1 = $reflectApply || bind$3.call($call$2, $apply$2);
  var bind$2 = requireFunctionBind();
  var $TypeError$3 = type;
  var $call$1 = requireFunctionCall();
  var $actualApply = actualApply$1;
  var callBindApplyHelpers = function callBindBasic2(args) {
    if (args.length < 1 || typeof args[0] !== "function") {
      throw new $TypeError$3("a function is required");
    }
    return $actualApply(bind$2, $call$1, args);
  };
  var callBind$3 = callBindApplyHelpers;
  var gOPD$2 = gopd$1;
  var hasProtoAccessor;
  try {
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD$2 && gOPD$2(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  );
  var $Object$1 = Object;
  var $getPrototypeOf = $Object$1.getPrototypeOf;
  var get = desc && typeof desc.get === "function" ? callBind$3([desc.get]) : typeof $getPrototypeOf === "function" ? (
    /** @type {import('./get')} */
    function getDunder(value) {
      return $getPrototypeOf(value == null ? value : $Object$1(value));
    }
  ) : false;
  var reflectGetProto = Reflect_getPrototypeOf;
  var originalGetProto = Object_getPrototypeOf;
  var getDunderProto = get;
  var getProto$3 = reflectGetProto ? function getProto2(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto2(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto2(O) {
    return getDunderProto(O);
  } : null;
  var hasown;
  var hasRequiredHasown;
  function requireHasown() {
    if (hasRequiredHasown) return hasown;
    hasRequiredHasown = 1;
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind2 = requireFunctionBind();
    hasown = bind2.call(call, $hasOwn);
    return hasown;
  }
  var undefined$1;
  var $Object = esObjectAtoms;
  var $Error = esErrors;
  var $EvalError = _eval;
  var $RangeError = range;
  var $ReferenceError = ref;
  var $SyntaxError$1 = syntax;
  var $TypeError$2 = type;
  var $URIError = uri;
  var abs = abs$1;
  var floor = floor$1;
  var max = max$1;
  var min = min$1;
  var pow = pow$1;
  var round = round$1;
  var sign = sign$1;
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = gopd$1;
  var $defineProperty$2 = esDefineProperty;
  var throwTypeError = function() {
    throw new $TypeError$2();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols$1 = requireHasSymbols()();
  var getProto$2 = getProto$3;
  var $ObjectGPO = Object_getPrototypeOf;
  var $ReflectGPO = Reflect_getPrototypeOf;
  var $apply$1 = requireFunctionApply();
  var $call = requireFunctionCall();
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto$2 ? undefined$1 : getProto$2(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols$1 && getProto$2 ? getProto$2([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": $EvalError,
    "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols$1 && getProto$2 ? getProto$2(getProto$2([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$1 || !getProto$2 ? undefined$1 : getProto$2((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $Object,
    "%Object.getOwnPropertyDescriptor%": $gOPD,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$1 || !getProto$2 ? undefined$1 : getProto$2((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols$1 && getProto$2 ? getProto$2(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols$1 ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError$1,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError$2,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
    "%Function.prototype.call%": $call,
    "%Function.prototype.apply%": $apply$1,
    "%Object.defineProperty%": $defineProperty$2,
    "%Object.getPrototypeOf%": $ObjectGPO,
    "%Math.abs%": abs,
    "%Math.floor%": floor,
    "%Math.max%": max,
    "%Math.min%": min,
    "%Math.pow%": pow,
    "%Math.round%": round,
    "%Math.sign%": sign,
    "%Reflect.getPrototypeOf%": $ReflectGPO
  };
  if (getProto$2) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto$2(getProto$2(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto$2) {
        value = getProto$2(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind$1 = requireFunctionBind();
  var hasOwn = requireHasown();
  var $concat = bind$1.call($call, Array.prototype.concat);
  var $spliceApply = bind$1.call($apply$1, Array.prototype.splice);
  var $replace = bind$1.call($call, String.prototype.replace);
  var $strSlice = bind$1.call($call, String.prototype.slice);
  var $exec = bind$1.call($call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError$1("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError$1("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError$2("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError$1("intrinsic " + name + " does not exist!");
  };
  var getIntrinsic = function GetIntrinsic2(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError$2("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError$2('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError$1("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
      var part = parts[i2];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError$1("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError$2("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD && i2 + 1 >= parts.length) {
          var desc2 = $gOPD(value, part);
          isOwn = !!desc2;
          if (isOwn && "get" in desc2 && !("originalValue" in desc2.get)) {
            value = desc2.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  var callBind$2 = { exports: {} };
  var $defineProperty$1 = esDefineProperty;
  var $SyntaxError = syntax;
  var $TypeError$1 = type;
  var gopd = gopd$1;
  var defineDataProperty = function defineDataProperty2(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") {
      throw new $TypeError$1("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError$1("`property` must be a string or a symbol`");
    }
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
      throw new $TypeError$1("`nonEnumerable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
      throw new $TypeError$1("`nonWritable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
      throw new $TypeError$1("`nonConfigurable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError$1("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc2 = !!gopd && gopd(obj, property);
    if ($defineProperty$1) {
      $defineProperty$1(obj, property, {
        configurable: nonConfigurable === null && desc2 ? desc2.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc2 ? desc2.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc2 ? desc2.writable : !nonWritable
      });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
      obj[property] = value;
    } else {
      throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
    }
  };
  var $defineProperty = esDefineProperty;
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!$defineProperty) {
      return null;
    }
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  var hasPropertyDescriptors_1 = hasPropertyDescriptors;
  var GetIntrinsic$2 = getIntrinsic;
  var define2 = defineDataProperty;
  var hasDescriptors = hasPropertyDescriptors_1();
  var gOPD$1 = gopd$1;
  var $TypeError = type;
  var $floor = GetIntrinsic$2("%Math.floor%");
  var setFunctionLength = function setFunctionLength2(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
      throw new $TypeError("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD$1) {
      var desc2 = gOPD$1(fn, "length");
      if (desc2 && !desc2.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc2 && !desc2.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors) {
        define2(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length,
          true,
          true
        );
      } else {
        define2(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length
        );
      }
    }
    return fn;
  };
  var bind = requireFunctionBind();
  var $apply = requireFunctionApply();
  var actualApply = actualApply$1;
  var applyBind = function applyBind2() {
    return actualApply(bind, $apply, arguments);
  };
  (function(module2) {
    var setFunctionLength$1 = setFunctionLength;
    var $defineProperty2 = esDefineProperty;
    var callBindBasic2 = callBindApplyHelpers;
    var applyBind$1 = applyBind;
    module2.exports = function callBind2(originalFunction) {
      var func = callBindBasic2(arguments);
      var adjustedLength = originalFunction.length - (arguments.length - 1);
      return setFunctionLength$1(
        func,
        1 + (adjustedLength > 0 ? adjustedLength : 0),
        true
      );
    };
    if ($defineProperty2) {
      $defineProperty2(module2.exports, "apply", { value: applyBind$1 });
    } else {
      module2.exports.apply = applyBind$1;
    }
  })(callBind$2);
  var callBindExports = callBind$2.exports;
  var GetIntrinsic$1 = getIntrinsic;
  var callBind$1 = callBindExports;
  var $indexOf$2 = callBind$1(GetIntrinsic$1("String.prototype.indexOf"));
  var callBound$4 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic$1(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf$2(name, ".prototype.") > -1) {
      return callBind$1(intrinsic);
    }
    return intrinsic;
  };
  var hasToStringTag$3 = shams();
  var callBound$3 = callBound$4;
  var $toString$1 = callBound$3("Object.prototype.toString");
  var isStandardArguments = function isArguments2(value) {
    if (hasToStringTag$3 && value && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return $toString$1(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments2(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$1(value) !== "[object Array]" && $toString$1(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
  }();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  var toStr$3 = Object.prototype.toString;
  var fnToStr$1 = Function.prototype.toString;
  var isFnRegex = /^\s*(?:function)?\*/;
  var hasToStringTag$2 = shams();
  var getProto$1 = Object.getPrototypeOf;
  var getGeneratorFunc = function() {
    if (!hasToStringTag$2) {
      return false;
    }
    try {
      return Function("return function*() {}")();
    } catch (e) {
    }
  };
  var GeneratorFunction;
  var isGeneratorFunction = function isGeneratorFunction2(fn) {
    if (typeof fn !== "function") {
      return false;
    }
    if (isFnRegex.test(fnToStr$1.call(fn))) {
      return true;
    }
    if (!hasToStringTag$2) {
      var str = toStr$3.call(fn);
      return str === "[object GeneratorFunction]";
    }
    if (!getProto$1) {
      return false;
    }
    if (typeof GeneratorFunction === "undefined") {
      var generatorFunc = getGeneratorFunc();
      GeneratorFunction = generatorFunc ? getProto$1(generatorFunc) : false;
    }
    return getProto$1(fn) === GeneratorFunction;
  };
  var fnToStr = Function.prototype.toString;
  var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      reflectApply(function() {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr$2 = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag$1 = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr$2.call(all) === toStr$2.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
          try {
            var str = toStr$2.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
          } catch (e) {
          }
        }
        return false;
      };
    }
  }
  var isCallable$1 = reflectApply ? function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    if (hasToStringTag$1) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass = toStr$2.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
      return false;
    }
    return tryFunctionObject(value);
  };
  var isCallable = isCallable$1;
  var toStr$1 = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i2 = 0, len2 = array.length; i2 < len2; i2++) {
      if (hasOwnProperty.call(array, i2)) {
        if (receiver == null) {
          iterator(array[i2], i2, array);
        } else {
          iterator.call(receiver, array[i2], i2, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i2 = 0, len2 = string.length; i2 < len2; i2++) {
      if (receiver == null) {
        iterator(string.charAt(i2), i2, string);
      } else {
        iterator.call(receiver, string.charAt(i2), i2, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) {
      if (hasOwnProperty.call(object, k)) {
        if (receiver == null) {
          iterator(object[k], k, object);
        } else {
          iterator.call(receiver, object[k], k, object);
        }
      }
    }
  };
  function isArray(x) {
    return toStr$1.call(x) === "[object Array]";
  }
  var forEach$1 = function forEach2(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (isArray(list)) {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
  var possibleTypedArrayNames = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
  var possibleNames = possibleTypedArrayNames;
  var g$1 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var availableTypedArrays$1 = function availableTypedArrays2() {
    var out = [];
    for (var i2 = 0; i2 < possibleNames.length; i2++) {
      if (typeof g$1[possibleNames[i2]] === "function") {
        out[out.length] = possibleNames[i2];
      }
    }
    return out;
  };
  var GetIntrinsic = getIntrinsic;
  var callBindBasic = callBindApplyHelpers;
  var $indexOf$1 = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      GetIntrinsic(name, !!allowMissing)
    );
    if (typeof intrinsic === "function" && $indexOf$1(name, ".prototype.") > -1) {
      return callBindBasic(
        /** @type {const} */
        [intrinsic]
      );
    }
    return intrinsic;
  };
  var forEach = forEach$1;
  var availableTypedArrays = availableTypedArrays$1;
  var callBind = callBindExports;
  var callBound$1 = callBound$2;
  var gOPD = gopd$1;
  var getProto = getProto$3;
  var $toString = callBound$1("Object.prototype.toString");
  var hasToStringTag = shams();
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var typedArrays = availableTypedArrays();
  var $slice = callBound$1("String.prototype.slice");
  var $indexOf = callBound$1("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i2 = 0; i2 < array.length; i2 += 1) {
      if (array[i2] === value) {
        return i2;
      }
    }
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD && getProto) {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr && getProto) {
        var proto = getProto(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor && proto) {
          var superProto = getProto(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        if (descriptor && descriptor.get) {
          var bound = callBind(descriptor.get);
          cache[
            /** @type {`$${import('.').TypedArrayName}`} */
            "$" + typedArray
          ] = bound;
        }
      }
    });
  } else {
    forEach(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      var fn = arr.slice || arr.set;
      if (fn) {
        var bound = (
          /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
          // @ts-expect-error TODO FIXME
          callBind(fn)
        );
        cache[
          /** @type {`$${import('.').TypedArrayName}`} */
          "$" + typedArray
        ] = bound;
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = /** @type {import('.').TypedArrayName} */
              $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = /** @type {import('.').TypedArrayName} */
            $slice(name, 1);
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  var whichTypedArray$1 = function whichTypedArray2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD) {
      return null;
    }
    return tryTypedArrays(value);
  };
  var whichTypedArray = whichTypedArray$1;
  var isTypedArray = function isTypedArray2(value) {
    return !!whichTypedArray(value);
  };
  (function(exports$1) {
    var isArgumentsObject = isArguments$1;
    var isGeneratorFunction$1 = isGeneratorFunction;
    var whichTypedArray2 = whichTypedArray$1;
    var isTypedArray$1 = isTypedArray;
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    if (SymbolSupported) {
      var symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports$1.isArgumentsObject = isArgumentsObject;
    exports$1.isGeneratorFunction = isGeneratorFunction$1;
    exports$1.isTypedArray = isTypedArray$1;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports$1.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray$1(value) || isDataView(value);
    }
    exports$1.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray2(value) === "Uint8Array";
    }
    exports$1.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray2(value) === "Uint8ClampedArray";
    }
    exports$1.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray2(value) === "Uint16Array";
    }
    exports$1.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray2(value) === "Uint32Array";
    }
    exports$1.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray2(value) === "Int8Array";
    }
    exports$1.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray2(value) === "Int16Array";
    }
    exports$1.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray2(value) === "Int32Array";
    }
    exports$1.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray2(value) === "Float32Array";
    }
    exports$1.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray2(value) === "Float64Array";
    }
    exports$1.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray2(value) === "BigInt64Array";
    }
    exports$1.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray2(value) === "BigUint64Array";
    }
    exports$1.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports$1.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports$1.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports$1.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports$1.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports$1.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports$1.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports$1.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports$1.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports$1.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports$1.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports$1.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports$1.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports$1.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports$1.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports$1.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports$1.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports$1.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports$1.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports$1.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports$1, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  })(types);
  var isBufferBrowser = function isBuffer(arg) {
    return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
  };
  (function(exports$1) {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i2 = 0; i2 < keys.length; i2++) {
        descriptors[keys[i2]] = Object.getOwnPropertyDescriptor(obj, keys[i2]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports$1.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
          objects.push(inspect(arguments[i2]));
        }
        return objects.join(" ");
      }
      var i2 = 1;
      var args = arguments;
      var len2 = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%") return "%";
        if (i2 >= len2) return x2;
        switch (x2) {
          case "%s":
            return String(args[i2++]);
          case "%d":
            return Number(args[i2++]);
          case "%j":
            try {
              return JSON.stringify(args[i2++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i2]; i2 < len2; x = args[++i2]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports$1.deprecate = function(fn, msg2) {
      if (typeof process$1 !== "undefined" && process$1.noDeprecation === true) {
        return fn;
      }
      if (typeof process$1 === "undefined") {
        return function() {
          return exports$1.deprecate(fn, msg2).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process$1.throwDeprecation) {
            throw new Error(msg2);
          } else if (process$1.traceDeprecation) {
            console.trace(msg2);
          } else {
            console.error(msg2);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process$1.env.NODE_DEBUG) {
      var debugEnv = process$1.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    exports$1.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process$1.pid;
          debugs[set] = function() {
            var msg2 = exports$1.format.apply(exports$1, arguments);
            console.error("%s %d: %s", set, pid, msg2);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports$1._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports$1.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports$1.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray2(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i2 = 0, l = value.length; i2 < l; ++i2) {
        if (hasOwnProperty2(value, String(i2))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i2),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc2;
      desc2 = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc2.get) {
        if (desc2.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc2.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty2(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc2.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc2.value, null);
          } else {
            str = formatValue(ctx, desc2.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var length = output.reduce(function(prev, cur) {
        if (cur.indexOf("\n") >= 0) ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports$1.types = types;
    function isArray2(ar) {
      return Array.isArray(ar);
    }
    exports$1.isArray = isArray2;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports$1.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports$1.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports$1.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports$1.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports$1.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports$1.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports$1.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports$1.isRegExp = isRegExp;
    exports$1.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports$1.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports$1.isDate = isDate;
    exports$1.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports$1.isError = isError;
    exports$1.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports$1.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports$1.isPrimitive = isPrimitive;
    exports$1.isBuffer = isBufferBrowser;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports$1.log = function() {
      console.log("%s - %s", timestamp(), exports$1.format.apply(exports$1, arguments));
    };
    exports$1.inherits = inherits_browserExports;
    exports$1._extend = function(origin, add) {
      if (!add || !isObject(add)) return origin;
      var keys = Object.keys(add);
      var i2 = keys.length;
      while (i2--) {
        origin[keys[i2]] = add[keys[i2]];
      }
      return origin;
    };
    function hasOwnProperty2(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports$1.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
          args.push(arguments[i2]);
        }
        args.push(function(err2, value) {
          if (err2) {
            promiseReject(err2);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err2) {
          promiseReject(err2);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports$1.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
          args.push(arguments[i2]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process$1.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process$1.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports$1.callbackify = callbackify;
  })(util);
  var buffer_list;
  var hasRequiredBuffer_list;
  function requireBuffer_list() {
    if (hasRequiredBuffer_list) return buffer_list;
    hasRequiredBuffer_list = 1;
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = null != arguments[i2] ? arguments[i2] : {};
        i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint);
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(input);
    }
    var _require = require$$0, Buffer3 = _require.Buffer;
    var _require2 = util, inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer3.prototype.copy.call(src, target, offset);
    }
    buffer_list = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) ret += s + p.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer3.alloc(0);
          var ret = Buffer3.allocUnsafe(n >>> 0);
          var p = this.head;
          var i2 = 0;
          while (p) {
            copyBuffer(p.data, ret, i2);
            i2 += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer3.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
    return buffer_list;
  }
  var destroy_1;
  var hasRequiredDestroy;
  function requireDestroy() {
    if (hasRequiredDestroy) return destroy_1;
    hasRequiredDestroy = 1;
    function destroy(err2, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err2);
        } else if (err2) {
          if (!this._writableState) {
            process$1.nextTick(emitErrorNT, this, err2);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process$1.nextTick(emitErrorNT, this, err2);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err2 || null, function(err3) {
        if (!cb && err3) {
          if (!_this._writableState) {
            process$1.nextTick(emitErrorAndCloseNT, _this, err3);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process$1.nextTick(emitErrorAndCloseNT, _this, err3);
          } else {
            process$1.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process$1.nextTick(emitCloseNT, _this);
          cb(err3);
        } else {
          process$1.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err2) {
      emitErrorNT(self2, err2);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose) return;
      if (self2._readableState && !self2._readableState.emitClose) return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err2) {
      self2.emit("error", err2);
    }
    function errorOrDestroy(stream, err2) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err2);
      else stream.emit("error", err2);
    }
    destroy_1 = {
      destroy,
      undestroy,
      errorOrDestroy
    };
    return destroy_1;
  }
  var errorsBrowser = {};
  var hasRequiredErrorsBrowser;
  function requireErrorsBrowser() {
    if (hasRequiredErrorsBrowser) return errorsBrowser;
    hasRequiredErrorsBrowser = 1;
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code2, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code2;
      codes[code2] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len2 = expected.length;
        expected = expected.map(function(i2) {
          return String(i2);
        });
        if (len2 > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len2 - 1).join(", "), ", or ") + expected[len2 - 1];
        } else if (len2 === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(0, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg2;
      if (endsWith(name, " argument")) {
        msg2 = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type2 = includes(name, ".") ? "property" : "argument";
        msg2 = 'The "'.concat(name, '" ').concat(type2, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg2 += ". Received type ".concat(typeof actual);
      return msg2;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    errorsBrowser.codes = codes;
    return errorsBrowser;
  }
  var state;
  var hasRequiredState;
  function requireState() {
    if (hasRequiredState) return state;
    hasRequiredState = 1;
    var ERR_INVALID_OPT_VALUE = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state2, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state2.objectMode ? 16 : 16 * 1024;
    }
    state = {
      getHighWaterMark
    };
    return state;
  }
  var browser;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser;
    hasRequiredBrowser = 1;
    browser = deprecate;
    function deprecate(fn, msg2) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg2);
          } else if (config("traceDeprecation")) {
            console.trace(msg2);
          } else {
            console.warn(msg2);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config(name) {
      try {
        if (!commonjsGlobal.localStorage) return false;
      } catch (_) {
        return false;
      }
      var val = commonjsGlobal.localStorage[name];
      if (null == val) return false;
      return String(val).toLowerCase() === "true";
    }
    return browser;
  }
  var _stream_writable;
  var hasRequired_stream_writable;
  function require_stream_writable() {
    if (hasRequired_stream_writable) return _stream_writable;
    hasRequired_stream_writable = 1;
    _stream_writable = Writable;
    function CorkedRequest(state2) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state2);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: requireBrowser()
    };
    var Stream2 = requireStreamBrowser();
    var Buffer3 = require$$0.Buffer;
    var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer3.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer3.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = requireDestroy();
    var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = requireErrorsBrowser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    inherits_browserExports(Writable, Stream2);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream2.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process$1.nextTick(cb, er);
    }
    function validChunk(stream, state2, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state2.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process$1.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state2 = this._writableState;
      var ret = false;
      var isBuf = !state2.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer3.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state2.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state2.ending) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state2, chunk, cb)) {
        state2.pendingcb++;
        ret = writeOrBuffer(this, state2, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state2 = this._writableState;
      if (state2.corked) {
        state2.corked--;
        if (!state2.writing && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) clearBuffer(this, state2);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state2, chunk, encoding) {
      if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer3.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state2, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state2, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len2 = state2.objectMode ? 1 : chunk.length;
      state2.length += len2;
      var ret = state2.length < state2.highWaterMark;
      if (!ret) state2.needDrain = true;
      if (state2.writing || state2.corked) {
        var last = state2.lastBufferedRequest;
        state2.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state2.lastBufferedRequest;
        } else {
          state2.bufferedRequest = state2.lastBufferedRequest;
        }
        state2.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state2, false, len2, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state2, writev, len2, chunk, encoding, cb) {
      state2.writelen = len2;
      state2.writecb = cb;
      state2.writing = true;
      state2.sync = true;
      if (state2.destroyed) state2.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev) stream._writev(chunk, state2.onwrite);
      else stream._write(chunk, encoding, state2.onwrite);
      state2.sync = false;
    }
    function onwriteError(stream, state2, sync, er, cb) {
      --state2.pendingcb;
      if (sync) {
        process$1.nextTick(cb, er);
        process$1.nextTick(finishMaybe, stream, state2);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state2);
      }
    }
    function onwriteStateUpdate(state2) {
      state2.writing = false;
      state2.writecb = null;
      state2.length -= state2.writelen;
      state2.writelen = 0;
    }
    function onwrite(stream, er) {
      var state2 = stream._writableState;
      var sync = state2.sync;
      var cb = state2.writecb;
      if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state2);
      if (er) onwriteError(stream, state2, sync, er, cb);
      else {
        var finished = needFinish(state2) || stream.destroyed;
        if (!finished && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
          clearBuffer(stream, state2);
        }
        if (sync) {
          process$1.nextTick(afterWrite, stream, state2, finished, cb);
        } else {
          afterWrite(stream, state2, finished, cb);
        }
      }
    }
    function afterWrite(stream, state2, finished, cb) {
      if (!finished) onwriteDrain(stream, state2);
      state2.pendingcb--;
      cb();
      finishMaybe(stream, state2);
    }
    function onwriteDrain(stream, state2) {
      if (state2.length === 0 && state2.needDrain) {
        state2.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state2) {
      state2.bufferProcessing = true;
      var entry = state2.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state2.bufferedRequestCount;
        var buffer2 = new Array(l);
        var holder = state2.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer2[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer2.allBuffers = allBuffers;
        doWrite(stream, state2, true, state2.length, buffer2, "", holder.finish);
        state2.pendingcb++;
        state2.lastBufferedRequest = null;
        if (holder.next) {
          state2.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state2.corkedRequestsFree = new CorkedRequest(state2);
        }
        state2.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len2 = state2.objectMode ? 1 : chunk.length;
          doWrite(stream, state2, false, len2, chunk, encoding, cb);
          entry = entry.next;
          state2.bufferedRequestCount--;
          if (state2.writing) {
            break;
          }
        }
        if (entry === null) state2.lastBufferedRequest = null;
      }
      state2.bufferedRequest = entry;
      state2.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state2 = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state2.corked) {
        state2.corked = 1;
        this.uncork();
      }
      if (!state2.ending) endWritable(this, state2, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState.length;
      }
    });
    function needFinish(state2) {
      return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
    }
    function callFinal(stream, state2) {
      stream._final(function(err2) {
        state2.pendingcb--;
        if (err2) {
          errorOrDestroy(stream, err2);
        }
        state2.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state2);
      });
    }
    function prefinish(stream, state2) {
      if (!state2.prefinished && !state2.finalCalled) {
        if (typeof stream._final === "function" && !state2.destroyed) {
          state2.pendingcb++;
          state2.finalCalled = true;
          process$1.nextTick(callFinal, stream, state2);
        } else {
          state2.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state2) {
      var need = needFinish(state2);
      if (need) {
        prefinish(stream, state2);
        if (state2.pendingcb === 0) {
          state2.finished = true;
          stream.emit("finish");
          if (state2.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state2, cb) {
      state2.ending = true;
      finishMaybe(stream, state2);
      if (cb) {
        if (state2.finished) process$1.nextTick(cb);
        else stream.once("finish", cb);
      }
      state2.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state2, err2) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state2.pendingcb--;
        cb(err2);
        entry = entry.next;
      }
      state2.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
    return _stream_writable;
  }
  var _stream_duplex;
  var hasRequired_stream_duplex;
  function require_stream_duplex() {
    if (hasRequired_stream_duplex) return _stream_duplex;
    hasRequired_stream_duplex = 1;
    var objectKeys2 = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) keys2.push(key);
      return keys2;
    };
    _stream_duplex = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    inherits_browserExports(Duplex, Readable);
    {
      var keys = objectKeys2(Writable.prototype);
      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended) return;
      process$1.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
    return _stream_duplex;
  }
  var string_decoder = {};
  var safeBuffer = { exports: {} };
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var hasRequiredSafeBuffer;
  function requireSafeBuffer() {
    if (hasRequiredSafeBuffer) return safeBuffer.exports;
    hasRequiredSafeBuffer = 1;
    (function(module2, exports$1) {
      var buffer2 = require$$0;
      var Buffer3 = buffer2.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
        module2.exports = buffer2;
      } else {
        copyProps(buffer2, exports$1);
        exports$1.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer3(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer3.prototype);
      copyProps(Buffer3, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer3(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer3(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer3(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer2.SlowBuffer(size);
      };
    })(safeBuffer, safeBuffer.exports);
    return safeBuffer.exports;
  }
  var hasRequiredString_decoder;
  function requireString_decoder() {
    if (hasRequiredString_decoder) return string_decoder;
    hasRequiredString_decoder = 1;
    var Buffer3 = requireSafeBuffer().Buffer;
    var isEncoding = Buffer3.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer3.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    string_decoder.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer3.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i2;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i2 = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i2 = 0;
      }
      if (i2 < buf.length) return r ? r + this.text(buf, i2) : this.text(buf, i2);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i2) {
      var j = buf.length - 1;
      if (j < i2) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i2 || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i2 || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "�";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "�";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "�";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i2) {
      var total = utf8CheckIncomplete(this, buf, i2);
      if (!this.lastNeed) return buf.toString("utf8", i2);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i2, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "�";
      return r;
    }
    function utf16Text(buf, i2) {
      if ((buf.length - i2) % 2 === 0) {
        var r = buf.toString("utf16le", i2);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i2, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i2) {
      var n = (buf.length - i2) % 3;
      if (n === 0) return buf.toString("base64", i2);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i2, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
    return string_decoder;
  }
  var endOfStream;
  var hasRequiredEndOfStream;
  function requireEndOfStream() {
    if (hasRequiredEndOfStream) return endOfStream;
    hasRequiredEndOfStream = 1;
    var ERR_STREAM_PREMATURE_CLOSE = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once2(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop2() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once2(callback || noop2);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable) onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };
      var onerror = function onerror2(err2) {
        callback.call(stream, err2);
      };
      var onclose = function onclose2() {
        var err2;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err2 = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err2);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err2 = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err2);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    endOfStream = eos;
    return endOfStream;
  }
  var async_iterator;
  var hasRequiredAsync_iterator;
  function requireAsync_iterator() {
    if (hasRequiredAsync_iterator) return async_iterator;
    hasRequiredAsync_iterator = 1;
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint);
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished = requireEndOfStream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process$1.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            process$1.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err2) {
          if (err2) {
            reject(err2);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err2) {
        if (err2 && err2.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err2);
          }
          iterator[kError] = err2;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    async_iterator = createReadableStreamAsyncIterator;
    return async_iterator;
  }
  var fromBrowser;
  var hasRequiredFromBrowser;
  function requireFromBrowser() {
    if (hasRequiredFromBrowser) return fromBrowser;
    hasRequiredFromBrowser = 1;
    fromBrowser = function() {
      throw new Error("Readable.from is not available in the browser");
    };
    return fromBrowser;
  }
  var _stream_readable;
  var hasRequired_stream_readable;
  function require_stream_readable() {
    if (hasRequired_stream_readable) return _stream_readable;
    hasRequired_stream_readable = 1;
    _stream_readable = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    eventsExports.EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type2) {
      return emitter.listeners(type2).length;
    };
    var Stream2 = requireStreamBrowser();
    var Buffer3 = require$$0.Buffer;
    var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer3.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer3.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = util;
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = requireBuffer_list();
    var destroyImpl = requireDestroy();
    var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = requireErrorsBrowser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    inherits_browserExports(Readable, Stream2);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream2.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state2 = this._readableState;
      var skipChunkCheck;
      if (!state2.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state2.defaultEncoding;
          if (encoding !== state2.encoding) {
            chunk = Buffer3.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state2 = stream._readableState;
      if (chunk === null) {
        state2.reading = false;
        onEofChunk(stream, state2);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state2, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state2.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state2.objectMode && Object.getPrototypeOf(chunk) !== Buffer3.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state2.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else addChunk(stream, state2, chunk, true);
          } else if (state2.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state2.destroyed) {
            return false;
          } else {
            state2.reading = false;
            if (state2.decoder && !encoding) {
              chunk = state2.decoder.write(chunk);
              if (state2.objectMode || chunk.length !== 0) addChunk(stream, state2, chunk, false);
              else maybeReadMore(stream, state2);
            } else {
              addChunk(stream, state2, chunk, false);
            }
          }
        } else if (!addToFront) {
          state2.reading = false;
          maybeReadMore(stream, state2);
        }
      }
      return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
    }
    function addChunk(stream, state2, chunk, addToFront) {
      if (state2.flowing && state2.length === 0 && !state2.sync) {
        state2.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state2.length += state2.objectMode ? 1 : chunk.length;
        if (addToFront) state2.buffer.unshift(chunk);
        else state2.buffer.push(chunk);
        if (state2.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state2);
    }
    function chunkInvalid(state2, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state2.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "") this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state2) {
      if (n <= 0 || state2.length === 0 && state2.ended) return 0;
      if (state2.objectMode) return 1;
      if (n !== n) {
        if (state2.flowing && state2.length) return state2.buffer.head.data.length;
        else return state2.length;
      }
      if (n > state2.highWaterMark) state2.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state2.length) return n;
      if (!state2.ended) {
        state2.needReadable = true;
        return 0;
      }
      return state2.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state2 = this._readableState;
      var nOrig = n;
      if (n !== 0) state2.emittedReadable = false;
      if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
        debug("read: emitReadable", state2.length, state2.ended);
        if (state2.length === 0 && state2.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state2);
      if (n === 0 && state2.ended) {
        if (state2.length === 0) endReadable(this);
        return null;
      }
      var doRead = state2.needReadable;
      debug("need readable", doRead);
      if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state2.ended || state2.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state2.reading = true;
        state2.sync = true;
        if (state2.length === 0) state2.needReadable = true;
        this._read(state2.highWaterMark);
        state2.sync = false;
        if (!state2.reading) n = howMuchToRead(nOrig, state2);
      }
      var ret;
      if (n > 0) ret = fromList(n, state2);
      else ret = null;
      if (ret === null) {
        state2.needReadable = state2.length <= state2.highWaterMark;
        n = 0;
      } else {
        state2.length -= n;
        state2.awaitDrain = 0;
      }
      if (state2.length === 0) {
        if (!state2.ended) state2.needReadable = true;
        if (nOrig !== n && state2.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state2) {
      debug("onEofChunk");
      if (state2.ended) return;
      if (state2.decoder) {
        var chunk = state2.decoder.end();
        if (chunk && chunk.length) {
          state2.buffer.push(chunk);
          state2.length += state2.objectMode ? 1 : chunk.length;
        }
      }
      state2.ended = true;
      if (state2.sync) {
        emitReadable(stream);
      } else {
        state2.needReadable = false;
        if (!state2.emittedReadable) {
          state2.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state2 = stream._readableState;
      debug("emitReadable", state2.needReadable, state2.emittedReadable);
      state2.needReadable = false;
      if (!state2.emittedReadable) {
        debug("emitReadable", state2.flowing);
        state2.emittedReadable = true;
        process$1.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state2 = stream._readableState;
      debug("emitReadable_", state2.destroyed, state2.length, state2.ended);
      if (!state2.destroyed && (state2.length || state2.ended)) {
        stream.emit("readable");
        state2.emittedReadable = false;
      }
      state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state2) {
      if (!state2.readingMore) {
        state2.readingMore = true;
        process$1.nextTick(maybeReadMore_, stream, state2);
      }
    }
    function maybeReadMore_(stream, state2) {
      while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
        var len2 = state2.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len2 === state2.length)
          break;
      }
      state2.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state2 = this._readableState;
      switch (state2.pipesCount) {
        case 0:
          state2.pipes = dest;
          break;
        case 1:
          state2.pipes = [state2.pipes, dest];
          break;
        default:
          state2.pipes.push(dest);
          break;
      }
      state2.pipesCount += 1;
      debug("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process$1.stdout && dest !== process$1.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state2.endEmitted) process$1.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf(state2.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state2.awaitDrain);
            state2.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state2.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state2 = src._readableState;
        debug("pipeOnDrain", state2.awaitDrain);
        if (state2.awaitDrain) state2.awaitDrain--;
        if (state2.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state2.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state2 = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state2.pipesCount === 0) return this;
      if (state2.pipesCount === 1) {
        if (dest && dest !== state2.pipes) return this;
        if (!dest) dest = state2.pipes;
        state2.pipes = null;
        state2.pipesCount = 0;
        state2.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state2.pipes;
        var len2 = state2.pipesCount;
        state2.pipes = null;
        state2.pipesCount = 0;
        state2.flowing = false;
        for (var i2 = 0; i2 < len2; i2++) dests[i2].emit("unpipe", this, {
          hasUnpiped: false
        });
        return this;
      }
      var index = indexOf(state2.pipes, dest);
      if (index === -1) return this;
      state2.pipes.splice(index, 1);
      state2.pipesCount -= 1;
      if (state2.pipesCount === 1) state2.pipes = state2.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream2.prototype.on.call(this, ev, fn);
      var state2 = this._readableState;
      if (ev === "data") {
        state2.readableListening = this.listenerCount("readable") > 0;
        if (state2.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state2.endEmitted && !state2.readableListening) {
          state2.readableListening = state2.needReadable = true;
          state2.flowing = false;
          state2.emittedReadable = false;
          debug("on readable", state2.length, state2.reading);
          if (state2.length) {
            emitReadable(this);
          } else if (!state2.reading) {
            process$1.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream2.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process$1.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream2.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process$1.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state2 = self2._readableState;
      state2.readableListening = self2.listenerCount("readable") > 0;
      if (state2.resumeScheduled && !state2.paused) {
        state2.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state2 = this._readableState;
      if (!state2.flowing) {
        debug("resume");
        state2.flowing = !state2.readableListening;
        resume(this, state2);
      }
      state2.paused = false;
      return this;
    };
    function resume(stream, state2) {
      if (!state2.resumeScheduled) {
        state2.resumeScheduled = true;
        process$1.nextTick(resume_, stream, state2);
      }
    }
    function resume_(stream, state2) {
      debug("resume", state2.reading);
      if (!state2.reading) {
        stream.read(0);
      }
      state2.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state2.flowing && !state2.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state2 = stream._readableState;
      debug("flow", state2.flowing);
      while (state2.flowing && stream.read() !== null) ;
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state2 = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state2.decoder && !state2.ended) {
          var chunk = state2.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state2.decoder) chunk = state2.decoder.write(chunk);
        if (state2.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state2.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i2 in stream) {
        if (this[i2] === void 0 && typeof stream[i2] === "function") {
          this[i2] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i2);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = requireAsync_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._readableState.flowing;
      },
      set: function set(state2) {
        if (this._readableState) {
          this._readableState.flowing = state2;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get2() {
        return this._readableState.length;
      }
    });
    function fromList(n, state2) {
      if (state2.length === 0) return null;
      var ret;
      if (state2.objectMode) ret = state2.buffer.shift();
      else if (!n || n >= state2.length) {
        if (state2.decoder) ret = state2.buffer.join("");
        else if (state2.buffer.length === 1) ret = state2.buffer.first();
        else ret = state2.buffer.concat(state2.length);
        state2.buffer.clear();
      } else {
        ret = state2.buffer.consume(n, state2.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state2 = stream._readableState;
      debug("endReadable", state2.endEmitted);
      if (!state2.endEmitted) {
        state2.ended = true;
        process$1.nextTick(endReadableNT, state2, stream);
      }
    }
    function endReadableNT(state2, stream) {
      debug("endReadableNT", state2.endEmitted, state2.length);
      if (!state2.endEmitted && state2.length === 0) {
        state2.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state2.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = requireFromBrowser();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i2 = 0, l = xs.length; i2 < l; i2++) {
        if (xs[i2] === x) return i2;
      }
      return -1;
    }
    return _stream_readable;
  }
  var _stream_transform;
  var hasRequired_stream_transform;
  function require_stream_transform() {
    if (hasRequired_stream_transform) return _stream_transform;
    hasRequired_stream_transform = 1;
    _stream_transform = Transform2;
    var _require$codes = requireErrorsBrowser().codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    inherits_browserExports(Transform2, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform2(options) {
      if (!(this instanceof Transform2)) return new Transform2(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform2.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform2.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform2.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform2.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform2.prototype._destroy = function(err2, cb) {
      Duplex.prototype._destroy.call(this, err2, function(err22) {
        cb(err22);
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
    return _stream_transform;
  }
  var _stream_passthrough;
  var hasRequired_stream_passthrough;
  function require_stream_passthrough() {
    if (hasRequired_stream_passthrough) return _stream_passthrough;
    hasRequired_stream_passthrough = 1;
    _stream_passthrough = PassThrough;
    var Transform2 = require_stream_transform();
    inherits_browserExports(PassThrough, Transform2);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform2.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
    return _stream_passthrough;
  }
  var pipeline_1;
  var hasRequiredPipeline;
  function requirePipeline() {
    if (hasRequiredPipeline) return pipeline_1;
    hasRequiredPipeline = 1;
    var eos;
    function once2(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = requireErrorsBrowser().codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop2(err2) {
      if (err2) throw err2;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once2(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0) eos = requireEndOfStream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err2) {
        if (err2) return callback(err2);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err2) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err2 || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length) return noop2;
      if (typeof streams[streams.length - 1] !== "function") return noop2;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i2) {
        var reading = i2 < streams.length - 1;
        var writing = i2 > 0;
        return destroyer(stream, reading, writing, function(err2) {
          if (!error) error = err2;
          if (err2) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    pipeline_1 = pipeline;
    return pipeline_1;
  }
  var streamBrowserify = Stream;
  var EE = eventsExports.EventEmitter;
  var inherits = inherits_browserExports;
  inherits(Stream, EE);
  Stream.Readable = require_stream_readable();
  Stream.Writable = require_stream_writable();
  Stream.Duplex = require_stream_duplex();
  Stream.Transform = require_stream_transform();
  Stream.PassThrough = require_stream_passthrough();
  Stream.finished = requireEndOfStream();
  Stream.pipeline = requirePipeline();
  Stream.Stream = Stream;
  function Stream() {
    EE.call(this);
  }
  Stream.prototype.pipe = function(dest, options) {
    var source = this;
    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) {
        throw er;
      }
    }
    source.on("error", onerror);
    dest.on("error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
  var lib = {};
  var binding = {};
  var assert = { exports: {} };
  var errors = {};
  var hasRequiredErrors;
  function requireErrors() {
    if (hasRequiredErrors) return errors;
    hasRequiredErrors = 1;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createClass(Constructor, protoProps, staticProps) {
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    var codes = {};
    var assert2;
    var util$1;
    function createErrorType(code2, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inherits(NodeError2, _Base);
        var _super = _createSuper(NodeError2);
        function NodeError2(arg1, arg2, arg3) {
          var _this;
          _classCallCheck(this, NodeError2);
          _this = _super.call(this, getMessage(arg1, arg2, arg3));
          _this.code = code2;
          return _this;
        }
        return _createClass(NodeError2);
      }(Base);
      codes[code2] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len2 = expected.length;
        expected = expected.map(function(i2) {
          return String(i2);
        });
        if (len2 > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len2 - 1).join(", "), ", or ") + expected[len2 - 1];
        } else if (len2 === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(0, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      if (assert2 === void 0) assert2 = requireAssert();
      assert2(typeof name === "string", "'name' must be a string");
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg2;
      if (endsWith(name, " argument")) {
        msg2 = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type2 = includes(name, ".") ? "property" : "argument";
        msg2 = 'The "'.concat(name, '" ').concat(type2, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg2 += ". Received type ".concat(_typeof(actual));
      return msg2;
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
      var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
      if (util$1 === void 0) util$1 = util;
      var inspected = util$1.inspect(value);
      if (inspected.length > 128) {
        inspected = "".concat(inspected.slice(0, 128), "...");
      }
      return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
    }, TypeError);
    createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
      var type2;
      if (value && value.constructor && value.constructor.name) {
        type2 = "instance of ".concat(value.constructor.name);
      } else {
        type2 = "type ".concat(_typeof(value));
      }
      return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type2, ".");
    }, TypeError);
    createErrorType("ERR_MISSING_ARGS", function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (assert2 === void 0) assert2 = requireAssert();
      assert2(args.length > 0, "At least one arg needs to be specified");
      var msg2 = "The ";
      var len2 = args.length;
      args = args.map(function(a) {
        return '"'.concat(a, '"');
      });
      switch (len2) {
        case 1:
          msg2 += "".concat(args[0], " argument");
          break;
        case 2:
          msg2 += "".concat(args[0], " and ").concat(args[1], " arguments");
          break;
        default:
          msg2 += args.slice(0, len2 - 1).join(", ");
          msg2 += ", and ".concat(args[len2 - 1], " arguments");
          break;
      }
      return "".concat(msg2, " must be specified");
    }, TypeError);
    errors.codes = codes;
    return errors;
  }
  var assertion_error;
  var hasRequiredAssertion_error;
  function requireAssertion_error() {
    if (hasRequiredAssertion_error) return assertion_error;
    hasRequiredAssertion_error = 1;
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint);
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(input);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2)) return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
        return _setPrototypeOf(Wrapper, Class2);
      };
      return _wrapNativeSuper(Class);
    }
    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct.bind();
      } else {
        _construct = function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2) _setPrototypeOf(instance, Class2.prototype);
          return instance;
        };
      }
      return _construct.apply(null, arguments);
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var _require = util, inspect = _require.inspect;
    var _require2 = requireErrors(), ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function repeat(str, count) {
      count = Math.floor(count);
      if (str.length == 0 || count == 0) return "";
      var maxCount = str.length * count;
      count = Math.floor(Math.log(count) / Math.log(2));
      while (count) {
        str += str;
        count--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    }
    var blue = "";
    var green = "";
    var red = "";
    var white = "";
    var kReadableOperator = {
      deepStrictEqual: "Expected values to be strictly deep-equal:",
      strictEqual: "Expected values to be strictly equal:",
      strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
      deepEqual: "Expected values to be loosely deep-equal:",
      equal: "Expected values to be loosely equal:",
      notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
      notStrictEqual: 'Expected "actual" to be strictly unequal to:',
      notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
      notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
      notEqual: 'Expected "actual" to be loosely unequal to:',
      notIdentical: "Values identical but not reference-equal:"
    };
    var kMaxShortLength = 10;
    function copyError(source) {
      var keys = Object.keys(source);
      var target = Object.create(Object.getPrototypeOf(source));
      keys.forEach(function(key) {
        target[key] = source[key];
      });
      Object.defineProperty(target, "message", {
        value: source.message
      });
      return target;
    }
    function inspectValue(val) {
      return inspect(val, {
        compact: false,
        customInspect: false,
        depth: 1e3,
        maxArrayLength: Infinity,
        // Assert compares only enumerable properties (with a few exceptions).
        showHidden: false,
        // Having a long line as error is better than wrapping the line for
        // comparison for now.
        // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
        // have meta information about the inspected properties (i.e., know where
        // in what line the property starts and ends).
        breakLength: Infinity,
        // Assert does not detect proxies currently.
        showProxy: false,
        sorted: true,
        // Inspect getters as we also check them when comparing entries.
        getters: true
      });
    }
    function createErrDiff(actual, expected, operator) {
      var other = "";
      var res = "";
      var lastPos = 0;
      var end = "";
      var skipped = false;
      var actualInspected = inspectValue(actual);
      var actualLines = actualInspected.split("\n");
      var expectedLines = inspectValue(expected).split("\n");
      var i2 = 0;
      var indicator = "";
      if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
        operator = "strictEqualObject";
      }
      if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
        var inputLength = actualLines[0].length + expectedLines[0].length;
        if (inputLength <= kMaxShortLength) {
          if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
            return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
          }
        } else if (operator !== "strictEqualObject") {
          var maxLength = process$1.stderr && process$1.stderr.isTTY ? process$1.stderr.columns : 80;
          if (inputLength < maxLength) {
            while (actualLines[0][i2] === expectedLines[0][i2]) {
              i2++;
            }
            if (i2 > 2) {
              indicator = "\n  ".concat(repeat(" ", i2), "^");
              i2 = 0;
            }
          }
        }
      }
      var a = actualLines[actualLines.length - 1];
      var b = expectedLines[expectedLines.length - 1];
      while (a === b) {
        if (i2++ < 2) {
          end = "\n  ".concat(a).concat(end);
        } else {
          other = a;
        }
        actualLines.pop();
        expectedLines.pop();
        if (actualLines.length === 0 || expectedLines.length === 0) break;
        a = actualLines[actualLines.length - 1];
        b = expectedLines[expectedLines.length - 1];
      }
      var maxLines = Math.max(actualLines.length, expectedLines.length);
      if (maxLines === 0) {
        var _actualLines = actualInspected.split("\n");
        if (_actualLines.length > 30) {
          _actualLines[26] = "".concat(blue, "...").concat(white);
          while (_actualLines.length > 27) {
            _actualLines.pop();
          }
        }
        return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
      }
      if (i2 > 3) {
        end = "\n".concat(blue, "...").concat(white).concat(end);
        skipped = true;
      }
      if (other !== "") {
        end = "\n  ".concat(other).concat(end);
        other = "";
      }
      var printedLines = 0;
      var msg2 = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
      var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
      for (i2 = 0; i2 < maxLines; i2++) {
        var cur = i2 - lastPos;
        if (actualLines.length < i2 + 1) {
          if (cur > 1 && i2 > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(expectedLines[i2 - 2]);
              printedLines++;
            }
            res += "\n  ".concat(expectedLines[i2 - 1]);
            printedLines++;
          }
          lastPos = i2;
          other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i2]);
          printedLines++;
        } else if (expectedLines.length < i2 + 1) {
          if (cur > 1 && i2 > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(actualLines[i2 - 2]);
              printedLines++;
            }
            res += "\n  ".concat(actualLines[i2 - 1]);
            printedLines++;
          }
          lastPos = i2;
          res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i2]);
          printedLines++;
        } else {
          var expectedLine = expectedLines[i2];
          var actualLine = actualLines[i2];
          var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
          if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
            divergingLines = false;
            actualLine += ",";
          }
          if (divergingLines) {
            if (cur > 1 && i2 > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i2 - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i2 - 1]);
              printedLines++;
            }
            lastPos = i2;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
            printedLines += 2;
          } else {
            res += other;
            other = "";
            if (cur === 1 || i2 === 0) {
              res += "\n  ".concat(actualLine);
              printedLines++;
            }
          }
        }
        if (printedLines > 20 && i2 < maxLines - 2) {
          return "".concat(msg2).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
        }
      }
      return "".concat(msg2).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
    }
    var AssertionError = /* @__PURE__ */ function(_Error, _inspect$custom) {
      _inherits(AssertionError2, _Error);
      var _super = _createSuper(AssertionError2);
      function AssertionError2(options) {
        var _this;
        _classCallCheck(this, AssertionError2);
        if (_typeof(options) !== "object" || options === null) {
          throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
        var actual = options.actual, expected = options.expected;
        var limit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        if (message != null) {
          _this = _super.call(this, String(message));
        } else {
          if (process$1.stderr && process$1.stderr.isTTY) {
            if (process$1.stderr && process$1.stderr.getColorDepth && process$1.stderr.getColorDepth() !== 1) {
              blue = "\x1B[34m";
              green = "\x1B[32m";
              white = "\x1B[39m";
              red = "\x1B[31m";
            } else {
              blue = "";
              green = "";
              white = "";
              red = "";
            }
          }
          if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
            actual = copyError(actual);
            expected = copyError(expected);
          }
          if (operator === "deepStrictEqual" || operator === "strictEqual") {
            _this = _super.call(this, createErrDiff(actual, expected, operator));
          } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
            var base = kReadableOperator[operator];
            var res = inspectValue(actual).split("\n");
            if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
              base = kReadableOperator.notStrictEqualObject;
            }
            if (res.length > 30) {
              res[26] = "".concat(blue, "...").concat(white);
              while (res.length > 27) {
                res.pop();
              }
            }
            if (res.length === 1) {
              _this = _super.call(this, "".concat(base, " ").concat(res[0]));
            } else {
              _this = _super.call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n"));
            }
          } else {
            var _res = inspectValue(actual);
            var other = "";
            var knownOperators = kReadableOperator[operator];
            if (operator === "notDeepEqual" || operator === "notEqual") {
              _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
              if (_res.length > 1024) {
                _res = "".concat(_res.slice(0, 1021), "...");
              }
            } else {
              other = "".concat(inspectValue(expected));
              if (_res.length > 512) {
                _res = "".concat(_res.slice(0, 509), "...");
              }
              if (other.length > 512) {
                other = "".concat(other.slice(0, 509), "...");
              }
              if (operator === "deepEqual" || operator === "equal") {
                _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
              } else {
                other = " ".concat(operator, " ").concat(other);
              }
            }
            _this = _super.call(this, "".concat(_res).concat(other));
          }
        }
        Error.stackTraceLimit = limit;
        _this.generatedMessage = !message;
        Object.defineProperty(_assertThisInitialized(_this), "name", {
          value: "AssertionError [ERR_ASSERTION]",
          enumerable: false,
          writable: true,
          configurable: true
        });
        _this.code = "ERR_ASSERTION";
        _this.actual = actual;
        _this.expected = expected;
        _this.operator = operator;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
        }
        _this.stack;
        _this.name = "AssertionError";
        return _possibleConstructorReturn(_this);
      }
      _createClass(AssertionError2, [{
        key: "toString",
        value: function toString() {
          return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
        }
      }, {
        key: _inspect$custom,
        value: function value(recurseTimes, ctx) {
          return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
            customInspect: false,
            depth: 0
          }));
        }
      }]);
      return AssertionError2;
    }(/* @__PURE__ */ _wrapNativeSuper(Error), inspect.custom);
    assertion_error = AssertionError;
    return assertion_error;
  }
  var toStr = Object.prototype.toString;
  var isArguments = function isArguments2(value) {
    var str = toStr.call(value);
    var isArgs2 = str === "[object Arguments]";
    if (!isArgs2) {
      isArgs2 = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
    }
    return isArgs2;
  };
  var implementation$5;
  var hasRequiredImplementation$1;
  function requireImplementation$1() {
    if (hasRequiredImplementation$1) return implementation$5;
    hasRequiredImplementation$1 = 1;
    var keysShim2;
    if (!Object.keys) {
      var has = Object.prototype.hasOwnProperty;
      var toStr2 = Object.prototype.toString;
      var isArgs2 = isArguments;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      var hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      var dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      var equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      var excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      var hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      var equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim2 = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr2.call(object) === "[object Function]";
        var isArguments2 = isArgs2(object);
        var isString = isObject && toStr2.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments2) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i2 = 0; i2 < object.length; ++i2) {
            theKeys.push(String(i2));
          }
        }
        if (isArguments2 && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    implementation$5 = keysShim2;
    return implementation$5;
  }
  var slice = Array.prototype.slice;
  var isArgs = isArguments;
  var origKeys = Object.keys;
  var keysShim = origKeys ? function keys(o) {
    return origKeys(o);
  } : requireImplementation$1();
  var originalKeys = Object.keys;
  keysShim.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function() {
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      }(1, 2);
      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          if (isArgs(object)) {
            return originalKeys(slice.call(object));
          }
          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim;
    }
    return Object.keys || keysShim;
  };
  var objectKeys$1 = keysShim;
  var objectKeys = objectKeys$1;
  var hasSymbols = shams$1();
  var callBound = callBound$4;
  var toObject = Object;
  var $push = callBound("Array.prototype.push");
  var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
  var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;
  var implementation$4 = function assign2(target, source1) {
    if (target == null) {
      throw new TypeError("target must be an object");
    }
    var to = toObject(target);
    if (arguments.length === 1) {
      return to;
    }
    for (var s = 1; s < arguments.length; ++s) {
      var from = toObject(arguments[s]);
      var keys = objectKeys(from);
      var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
      if (getSymbols) {
        var syms = getSymbols(from);
        for (var j = 0; j < syms.length; ++j) {
          var key = syms[j];
          if ($propIsEnumerable(from, key)) {
            $push(keys, key);
          }
        }
      }
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var nextKey = keys[i2];
        if ($propIsEnumerable(from, nextKey)) {
          var propValue = from[nextKey];
          to[nextKey] = propValue;
        }
      }
    }
    return to;
  };
  var implementation$3 = implementation$4;
  var lacksProperEnumerationOrder = function() {
    if (!Object.assign) {
      return false;
    }
    var str = "abcdefghijklmnopqrst";
    var letters = str.split("");
    var map = {};
    for (var i2 = 0; i2 < letters.length; ++i2) {
      map[letters[i2]] = letters[i2];
    }
    var obj = Object.assign({}, map);
    var actual = "";
    for (var k in obj) {
      actual += k;
    }
    return str !== actual;
  };
  var assignHasPendingExceptions = function() {
    if (!Object.assign || !Object.preventExtensions) {
      return false;
    }
    var thrower = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(thrower, "xy");
    } catch (e) {
      return thrower[1] === "y";
    }
    return false;
  };
  var polyfill$2 = function getPolyfill() {
    if (!Object.assign) {
      return implementation$3;
    }
    if (lacksProperEnumerationOrder()) {
      return implementation$3;
    }
    if (assignHasPendingExceptions()) {
      return implementation$3;
    }
    return Object.assign;
  };
  var numberIsNaN = function(value) {
    return value !== value;
  };
  var implementation$2 = function is(a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a === b) {
      return true;
    }
    if (numberIsNaN(a) && numberIsNaN(b)) {
      return true;
    }
    return false;
  };
  var implementation$1 = implementation$2;
  var polyfill$1 = function getPolyfill() {
    return typeof Object.is === "function" ? Object.is : implementation$1;
  };
  var defineProperties_1;
  var hasRequiredDefineProperties;
  function requireDefineProperties() {
    if (hasRequiredDefineProperties) return defineProperties_1;
    hasRequiredDefineProperties = 1;
    var keys = objectKeys$1;
    var hasSymbols2 = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr2 = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var defineDataProperty$1 = defineDataProperty;
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr2.call(fn) === "[object Function]";
    };
    var supportsDescriptors = hasPropertyDescriptors_1();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty$1(object, name, value, true);
      } else {
        defineDataProperty$1(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols2) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i2 = 0; i2 < props.length; i2 += 1) {
        defineProperty(object, props[i2], map[props[i2]], predicates[props[i2]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    defineProperties_1 = defineProperties;
    return defineProperties_1;
  }
  var shim$1;
  var hasRequiredShim$1;
  function requireShim$1() {
    if (hasRequiredShim$1) return shim$1;
    hasRequiredShim$1 = 1;
    var getPolyfill = polyfill$1;
    var define3 = requireDefineProperties();
    shim$1 = function shimObjectIs() {
      var polyfill2 = getPolyfill();
      define3(Object, { is: polyfill2 }, {
        is: function testObjectIs() {
          return Object.is !== polyfill2;
        }
      });
      return polyfill2;
    };
    return shim$1;
  }
  var objectIs;
  var hasRequiredObjectIs;
  function requireObjectIs() {
    if (hasRequiredObjectIs) return objectIs;
    hasRequiredObjectIs = 1;
    var define3 = requireDefineProperties();
    var callBind2 = callBindExports;
    var implementation2 = implementation$2;
    var getPolyfill = polyfill$1;
    var shim2 = requireShim$1();
    var polyfill2 = callBind2(getPolyfill(), Object);
    define3(polyfill2, {
      getPolyfill,
      implementation: implementation2,
      shim: shim2
    });
    objectIs = polyfill2;
    return objectIs;
  }
  var implementation;
  var hasRequiredImplementation;
  function requireImplementation() {
    if (hasRequiredImplementation) return implementation;
    hasRequiredImplementation = 1;
    implementation = function isNaN2(value) {
      return value !== value;
    };
    return implementation;
  }
  var polyfill;
  var hasRequiredPolyfill;
  function requirePolyfill() {
    if (hasRequiredPolyfill) return polyfill;
    hasRequiredPolyfill = 1;
    var implementation2 = requireImplementation();
    polyfill = function getPolyfill() {
      if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
        return Number.isNaN;
      }
      return implementation2;
    };
    return polyfill;
  }
  var shim;
  var hasRequiredShim;
  function requireShim() {
    if (hasRequiredShim) return shim;
    hasRequiredShim = 1;
    var define3 = requireDefineProperties();
    var getPolyfill = requirePolyfill();
    shim = function shimNumberIsNaN() {
      var polyfill2 = getPolyfill();
      define3(Number, { isNaN: polyfill2 }, {
        isNaN: function testIsNaN() {
          return Number.isNaN !== polyfill2;
        }
      });
      return polyfill2;
    };
    return shim;
  }
  var isNan;
  var hasRequiredIsNan;
  function requireIsNan() {
    if (hasRequiredIsNan) return isNan;
    hasRequiredIsNan = 1;
    var callBind2 = callBindExports;
    var define3 = requireDefineProperties();
    var implementation2 = requireImplementation();
    var getPolyfill = requirePolyfill();
    var shim2 = requireShim();
    var polyfill2 = callBind2(getPolyfill(), Number);
    define3(polyfill2, {
      getPolyfill,
      implementation: implementation2,
      shim: shim2
    });
    isNan = polyfill2;
    return isNan;
  }
  var comparisons;
  var hasRequiredComparisons;
  function requireComparisons() {
    if (hasRequiredComparisons) return comparisons;
    hasRequiredComparisons = 1;
    function _slicedToArray(arr, i2) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len2) {
      if (len2 == null || len2 > arr.length) len2 = arr.length;
      for (var i2 = 0, arr2 = new Array(len2); i2 < len2; i2++) arr2[i2] = arr[i2];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i2, u, a = [], f = true, o = false;
        try {
          if (i2 = (t = t.call(r)).next, 0 === l) ;
          else for (; !(f = (e = i2.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var regexFlagsSupported = /a/g.flags !== void 0;
    var arrayFromSet = function arrayFromSet2(set) {
      var array = [];
      set.forEach(function(value) {
        return array.push(value);
      });
      return array;
    };
    var arrayFromMap = function arrayFromMap2(map) {
      var array = [];
      map.forEach(function(value, key) {
        return array.push([key, value]);
      });
      return array;
    };
    var objectIs2 = Object.is ? Object.is : requireObjectIs();
    var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
      return [];
    };
    var numberIsNaN2 = Number.isNaN ? Number.isNaN : requireIsNan();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var hasOwnProperty2 = uncurryThis(Object.prototype.hasOwnProperty);
    var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
    var objectToString = uncurryThis(Object.prototype.toString);
    var _require$types = util.types, isAnyArrayBuffer = _require$types.isAnyArrayBuffer, isArrayBufferView = _require$types.isArrayBufferView, isDate = _require$types.isDate, isMap = _require$types.isMap, isRegExp = _require$types.isRegExp, isSet = _require$types.isSet, isNativeError = _require$types.isNativeError, isBoxedPrimitive = _require$types.isBoxedPrimitive, isNumberObject = _require$types.isNumberObject, isStringObject = _require$types.isStringObject, isBooleanObject = _require$types.isBooleanObject, isBigIntObject = _require$types.isBigIntObject, isSymbolObject = _require$types.isSymbolObject, isFloat32Array = _require$types.isFloat32Array, isFloat64Array = _require$types.isFloat64Array;
    function isNonIndex(key) {
      if (key.length === 0 || key.length > 10) return true;
      for (var i2 = 0; i2 < key.length; i2++) {
        var code2 = key.charCodeAt(i2);
        if (code2 < 48 || code2 > 57) return true;
      }
      return key.length === 10 && key >= Math.pow(2, 32);
    }
    function getOwnNonIndexProperties(value) {
      return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
    }
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i2 = 0, len2 = Math.min(x, y); i2 < len2; ++i2) {
        if (a[i2] !== b[i2]) {
          x = a[i2];
          y = b[i2];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    var kStrict = true;
    var kLoose = false;
    var kNoIterator = 0;
    var kIsArray = 1;
    var kIsSet = 2;
    var kIsMap = 3;
    function areSimilarRegExps(a, b) {
      return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
    }
    function areSimilarFloatArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (var offset = 0; offset < a.byteLength; offset++) {
        if (a[offset] !== b[offset]) {
          return false;
        }
      }
      return true;
    }
    function areSimilarTypedArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
    }
    function areEqualArrayBuffers(buf1, buf2) {
      return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
    }
    function isEqualBoxedPrimitive(val1, val2) {
      if (isNumberObject(val1)) {
        return isNumberObject(val2) && objectIs2(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
      }
      if (isStringObject(val1)) {
        return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
      }
      if (isBooleanObject(val1)) {
        return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
      }
      if (isBigIntObject(val1)) {
        return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
      }
      return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
    }
    function innerDeepEqual(val1, val2, strict, memos) {
      if (val1 === val2) {
        if (val1 !== 0) return true;
        return strict ? objectIs2(val1, val2) : true;
      }
      if (strict) {
        if (_typeof(val1) !== "object") {
          return typeof val1 === "number" && numberIsNaN2(val1) && numberIsNaN2(val2);
        }
        if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
          return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
          return false;
        }
      } else {
        if (val1 === null || _typeof(val1) !== "object") {
          if (val2 === null || _typeof(val2) !== "object") {
            return val1 == val2;
          }
          return false;
        }
        if (val2 === null || _typeof(val2) !== "object") {
          return false;
        }
      }
      var val1Tag = objectToString(val1);
      var val2Tag = objectToString(val2);
      if (val1Tag !== val2Tag) {
        return false;
      }
      if (Array.isArray(val1)) {
        if (val1.length !== val2.length) {
          return false;
        }
        var keys1 = getOwnNonIndexProperties(val1);
        var keys2 = getOwnNonIndexProperties(val2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
      }
      if (val1Tag === "[object Object]") {
        if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
          return false;
        }
      }
      if (isDate(val1)) {
        if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
          return false;
        }
      } else if (isRegExp(val1)) {
        if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
          return false;
        }
      } else if (isNativeError(val1) || val1 instanceof Error) {
        if (val1.message !== val2.message || val1.name !== val2.name) {
          return false;
        }
      } else if (isArrayBufferView(val1)) {
        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
          if (!areSimilarFloatArrays(val1, val2)) {
            return false;
          }
        } else if (!areSimilarTypedArrays(val1, val2)) {
          return false;
        }
        var _keys = getOwnNonIndexProperties(val1);
        var _keys2 = getOwnNonIndexProperties(val2);
        if (_keys.length !== _keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
      } else if (isSet(val1)) {
        if (!isSet(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsSet);
      } else if (isMap(val1)) {
        if (!isMap(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsMap);
      } else if (isAnyArrayBuffer(val1)) {
        if (!areEqualArrayBuffers(val1, val2)) {
          return false;
        }
      } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kNoIterator);
    }
    function getEnumerables(val, keys) {
      return keys.filter(function(k) {
        return propertyIsEnumerable(val, k);
      });
    }
    function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
      if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        var bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
      }
      var i2 = 0;
      for (; i2 < aKeys.length; i2++) {
        if (!hasOwnProperty2(val2, aKeys[i2])) {
          return false;
        }
      }
      if (strict && arguments.length === 5) {
        var symbolKeysA = objectGetOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
          var count = 0;
          for (i2 = 0; i2 < symbolKeysA.length; i2++) {
            var key = symbolKeysA[i2];
            if (propertyIsEnumerable(val1, key)) {
              if (!propertyIsEnumerable(val2, key)) {
                return false;
              }
              aKeys.push(key);
              count++;
            } else if (propertyIsEnumerable(val2, key)) {
              return false;
            }
          }
          var symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
            return false;
          }
        } else {
          var _symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
            return false;
          }
        }
      }
      if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
        return true;
      }
      if (memos === void 0) {
        memos = {
          val1: /* @__PURE__ */ new Map(),
          val2: /* @__PURE__ */ new Map(),
          position: 0
        };
      } else {
        var val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== void 0) {
          var val2MemoB = memos.val2.get(val2);
          if (val2MemoB !== void 0) {
            return val2MemoA === val2MemoB;
          }
        }
        memos.position++;
      }
      memos.val1.set(val1, memos.position);
      memos.val2.set(val2, memos.position);
      var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
      memos.val1.delete(val1);
      memos.val2.delete(val2);
      return areEq;
    }
    function setHasEqualElement(set, val1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i2 = 0; i2 < setValues.length; i2++) {
        var val2 = setValues[i2];
        if (innerDeepEqual(val1, val2, strict, memo)) {
          set.delete(val2);
          return true;
        }
      }
      return false;
    }
    function findLooseMatchingPrimitives(prim) {
      switch (_typeof(prim)) {
        case "undefined":
          return null;
        case "object":
          return void 0;
        case "symbol":
          return false;
        case "string":
          prim = +prim;
        case "number":
          if (numberIsNaN2(prim)) {
            return false;
          }
      }
      return true;
    }
    function setMightHaveLoosePrim(a, b, prim) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) return altValue;
      return b.has(altValue) && !a.has(altValue);
    }
    function mapMightHaveLoosePrim(a, b, prim, item, memo) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      var curB = b.get(altValue);
      if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
      }
      return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
    }
    function setEquiv(a, b, strict, memo) {
      var set = null;
      var aValues = arrayFromSet(a);
      for (var i2 = 0; i2 < aValues.length; i2++) {
        var val = aValues[i2];
        if (_typeof(val) === "object" && val !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        } else if (!b.has(val)) {
          if (strict) return false;
          if (!setMightHaveLoosePrim(a, b, val)) {
            return false;
          }
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        }
      }
      if (set !== null) {
        var bValues = arrayFromSet(b);
        for (var _i = 0; _i < bValues.length; _i++) {
          var _val = bValues[_i];
          if (_typeof(_val) === "object" && _val !== null) {
            if (!setHasEqualElement(set, _val, strict, memo)) return false;
          } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i2 = 0; i2 < setValues.length; i2++) {
        var key2 = setValues[i2];
        if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
          set.delete(key2);
          return true;
        }
      }
      return false;
    }
    function mapEquiv(a, b, strict, memo) {
      var set = null;
      var aEntries = arrayFromMap(a);
      for (var i2 = 0; i2 < aEntries.length; i2++) {
        var _aEntries$i = _slicedToArray(aEntries[i2], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
        if (_typeof(key) === "object" && key !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(key);
        } else {
          var item2 = b.get(key);
          if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
            if (strict) return false;
            if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(key);
          }
        }
      }
      if (set !== null) {
        var bEntries = arrayFromMap(b);
        for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
          var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), _key = _bEntries$_i[0], item = _bEntries$_i[1];
          if (_typeof(_key) === "object" && _key !== null) {
            if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
          } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function objEquiv(a, b, strict, keys, memos, iterationType) {
      var i2 = 0;
      if (iterationType === kIsSet) {
        if (!setEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsMap) {
        if (!mapEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsArray) {
        for (; i2 < a.length; i2++) {
          if (hasOwnProperty2(a, i2)) {
            if (!hasOwnProperty2(b, i2) || !innerDeepEqual(a[i2], b[i2], strict, memos)) {
              return false;
            }
          } else if (hasOwnProperty2(b, i2)) {
            return false;
          } else {
            var keysA = Object.keys(a);
            for (; i2 < keysA.length; i2++) {
              var key = keysA[i2];
              if (!hasOwnProperty2(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                return false;
              }
            }
            if (keysA.length !== Object.keys(b).length) {
              return false;
            }
            return true;
          }
        }
      }
      for (i2 = 0; i2 < keys.length; i2++) {
        var _key2 = keys[i2];
        if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
          return false;
        }
      }
      return true;
    }
    function isDeepEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kLoose);
    }
    function isDeepStrictEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kStrict);
    }
    comparisons = {
      isDeepEqual,
      isDeepStrictEqual
    };
    return comparisons;
  }
  var hasRequiredAssert;
  function requireAssert() {
    if (hasRequiredAssert) return assert.exports;
    hasRequiredAssert = 1;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _createClass(Constructor, protoProps, staticProps) {
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var _require = requireErrors(), _require$codes = _require.codes, ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE, ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var AssertionError = requireAssertion_error();
    var _require2 = util, inspect = _require2.inspect;
    var _require$types = util.types, isPromise = _require$types.isPromise, isRegExp = _require$types.isRegExp;
    var objectAssign = polyfill$2();
    var objectIs2 = polyfill$1();
    var RegExpPrototypeTest = callBound$4("RegExp.prototype.test");
    var isDeepEqual;
    var isDeepStrictEqual;
    function lazyLoadComparison() {
      var comparison = requireComparisons();
      isDeepEqual = comparison.isDeepEqual;
      isDeepStrictEqual = comparison.isDeepStrictEqual;
    }
    var warned = false;
    var assert$1 = assert.exports = ok;
    var NO_EXCEPTION_SENTINEL = {};
    function innerFail(obj) {
      if (obj.message instanceof Error) throw obj.message;
      throw new AssertionError(obj);
    }
    function fail(actual, expected, message, operator, stackStartFn) {
      var argsLen = arguments.length;
      var internalMessage;
      if (argsLen === 0) {
        internalMessage = "Failed";
      } else if (argsLen === 1) {
        message = actual;
        actual = void 0;
      } else {
        if (warned === false) {
          warned = true;
          var warn = process$1.emitWarning ? process$1.emitWarning : console.warn.bind(console);
          warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
        }
        if (argsLen === 2) operator = "!=";
      }
      if (message instanceof Error) throw message;
      var errArgs = {
        actual,
        expected,
        operator: operator === void 0 ? "fail" : operator,
        stackStartFn: stackStartFn || fail
      };
      if (message !== void 0) {
        errArgs.message = message;
      }
      var err2 = new AssertionError(errArgs);
      if (internalMessage) {
        err2.message = internalMessage;
        err2.generatedMessage = true;
      }
      throw err2;
    }
    assert$1.fail = fail;
    assert$1.AssertionError = AssertionError;
    function innerOk(fn, argLen, value, message) {
      if (!value) {
        var generatedMessage = false;
        if (argLen === 0) {
          generatedMessage = true;
          message = "No value argument passed to `assert.ok()`";
        } else if (message instanceof Error) {
          throw message;
        }
        var err2 = new AssertionError({
          actual: value,
          expected: true,
          message,
          operator: "==",
          stackStartFn: fn
        });
        err2.generatedMessage = generatedMessage;
        throw err2;
      }
    }
    function ok() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      innerOk.apply(void 0, [ok, args.length].concat(args));
    }
    assert$1.ok = ok;
    assert$1.equal = function equal(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual != expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "==",
          stackStartFn: equal
        });
      }
    };
    assert$1.notEqual = function notEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual == expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "!=",
          stackStartFn: notEqual
        });
      }
    };
    assert$1.deepEqual = function deepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (!isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepEqual",
          stackStartFn: deepEqual
        });
      }
    };
    assert$1.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepEqual",
          stackStartFn: notDeepEqual
        });
      }
    };
    assert$1.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (!isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepStrictEqual",
          stackStartFn: deepStrictEqual
        });
      }
    };
    assert$1.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepStrictEqual",
          stackStartFn: notDeepStrictEqual
        });
      }
    }
    assert$1.strictEqual = function strictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (!objectIs2(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "strictEqual",
          stackStartFn: strictEqual
        });
      }
    };
    assert$1.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (objectIs2(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notStrictEqual",
          stackStartFn: notStrictEqual
        });
      }
    };
    var Comparison = /* @__PURE__ */ _createClass(function Comparison2(obj, keys, actual) {
      var _this = this;
      _classCallCheck(this, Comparison2);
      keys.forEach(function(key) {
        if (key in obj) {
          if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
            _this[key] = actual[key];
          } else {
            _this[key] = obj[key];
          }
        }
      });
    });
    function compareExceptionKey(actual, expected, key, message, keys, fn) {
      if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
        if (!message) {
          var a = new Comparison(actual, keys);
          var b = new Comparison(expected, keys, actual);
          var err2 = new AssertionError({
            actual: a,
            expected: b,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err2.actual = actual;
          err2.expected = expected;
          err2.operator = fn.name;
          throw err2;
        }
        innerFail({
          actual,
          expected,
          message,
          operator: fn.name,
          stackStartFn: fn
        });
      }
    }
    function expectedException(actual, expected, msg2, fn) {
      if (typeof expected !== "function") {
        if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
        if (arguments.length === 2) {
          throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
        }
        if (_typeof(actual) !== "object" || actual === null) {
          var err2 = new AssertionError({
            actual,
            expected,
            message: msg2,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err2.operator = fn.name;
          throw err2;
        }
        var keys = Object.keys(expected);
        if (expected instanceof Error) {
          keys.push("name", "message");
        } else if (keys.length === 0) {
          throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        keys.forEach(function(key) {
          if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
            return;
          }
          compareExceptionKey(actual, expected, key, msg2, keys, fn);
        });
        return true;
      }
      if (expected.prototype !== void 0 && actual instanceof expected) {
        return true;
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    function getActual(fn) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
      }
      try {
        fn();
      } catch (e) {
        return e;
      }
      return NO_EXCEPTION_SENTINEL;
    }
    function checkIsPromise(obj) {
      return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
    }
    function waitForActual(promiseFn) {
      return Promise.resolve().then(function() {
        var resultPromise;
        if (typeof promiseFn === "function") {
          resultPromise = promiseFn();
          if (!checkIsPromise(resultPromise)) {
            throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
          }
        } else if (checkIsPromise(promiseFn)) {
          resultPromise = promiseFn;
        } else {
          throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
        }
        return Promise.resolve().then(function() {
          return resultPromise;
        }).then(function() {
          return NO_EXCEPTION_SENTINEL;
        }).catch(function(e) {
          return e;
        });
      });
    }
    function expectsError(stackStartFn, actual, error, message) {
      if (typeof error === "string") {
        if (arguments.length === 4) {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (_typeof(actual) === "object" && actual !== null) {
          if (actual.message === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
          }
        } else if (actual === error) {
          throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
        }
        message = error;
        error = void 0;
      } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
        throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
      }
      if (actual === NO_EXCEPTION_SENTINEL) {
        var details = "";
        if (error && error.name) {
          details += " (".concat(error.name, ")");
        }
        details += message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
        innerFail({
          actual: void 0,
          expected: error,
          operator: stackStartFn.name,
          message: "Missing expected ".concat(fnType).concat(details),
          stackStartFn
        });
      }
      if (error && !expectedException(actual, error, message, stackStartFn)) {
        throw actual;
      }
    }
    function expectsNoError(stackStartFn, actual, error, message) {
      if (actual === NO_EXCEPTION_SENTINEL) return;
      if (typeof error === "string") {
        message = error;
        error = void 0;
      }
      if (!error || expectedException(actual, error)) {
        var details = message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
        innerFail({
          actual,
          expected: error,
          operator: stackStartFn.name,
          message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
          stackStartFn
        });
      }
      throw actual;
    }
    assert$1.throws = function throws(promiseFn) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
    };
    assert$1.rejects = function rejects(promiseFn) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return waitForActual(promiseFn).then(function(result) {
        return expectsError.apply(void 0, [rejects, result].concat(args));
      });
    };
    assert$1.doesNotThrow = function doesNotThrow(fn) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
    };
    assert$1.doesNotReject = function doesNotReject(fn) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return waitForActual(fn).then(function(result) {
        return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
      });
    };
    assert$1.ifError = function ifError(err2) {
      if (err2 !== null && err2 !== void 0) {
        var message = "ifError got unwanted exception: ";
        if (_typeof(err2) === "object" && typeof err2.message === "string") {
          if (err2.message.length === 0 && err2.constructor) {
            message += err2.constructor.name;
          } else {
            message += err2.message;
          }
        } else {
          message += inspect(err2);
        }
        var newErr = new AssertionError({
          actual: err2,
          expected: null,
          operator: "ifError",
          message,
          stackStartFn: ifError
        });
        var origStack = err2.stack;
        if (typeof origStack === "string") {
          var tmp2 = origStack.split("\n");
          tmp2.shift();
          var tmp1 = newErr.stack.split("\n");
          for (var i2 = 0; i2 < tmp2.length; i2++) {
            var pos = tmp1.indexOf(tmp2[i2]);
            if (pos !== -1) {
              tmp1 = tmp1.slice(0, pos);
              break;
            }
          }
          newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
        }
        throw newErr;
      }
    };
    function internalMatch(string, regexp, message, fn, fnName) {
      if (!isRegExp(regexp)) {
        throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
      }
      var match = fnName === "match";
      if (typeof string !== "string" || RegExpPrototypeTest(regexp, string) !== match) {
        if (message instanceof Error) {
          throw message;
        }
        var generatedMessage = !message;
        message = message || (typeof string !== "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
        var err2 = new AssertionError({
          actual: string,
          expected: regexp,
          message,
          operator: fnName,
          stackStartFn: fn
        });
        err2.generatedMessage = generatedMessage;
        throw err2;
      }
    }
    assert$1.match = function match(string, regexp, message) {
      internalMatch(string, regexp, message, match, "match");
    };
    assert$1.doesNotMatch = function doesNotMatch(string, regexp, message) {
      internalMatch(string, regexp, message, doesNotMatch, "doesNotMatch");
    };
    function strict() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      innerOk.apply(void 0, [strict, args.length].concat(args));
    }
    assert$1.strict = objectAssign(strict, assert$1, {
      equal: assert$1.strictEqual,
      deepEqual: assert$1.deepStrictEqual,
      notEqual: assert$1.notStrictEqual,
      notDeepEqual: assert$1.notDeepStrictEqual
    });
    assert$1.strict.strict = assert$1.strict;
    return assert.exports;
  }
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var zstream = ZStream;
  var deflate$1 = {};
  var common = {};
  (function(exports$1) {
    var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    function _has(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    exports$1.assign = function(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        var source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (var p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    };
    exports$1.shrinkBuf = function(buf, size) {
      if (buf.length === size) {
        return buf;
      }
      if (buf.subarray) {
        return buf.subarray(0, size);
      }
      buf.length = size;
      return buf;
    };
    var fnTyped = {
      arraySet: function(dest, src, src_offs, len2, dest_offs) {
        if (src.subarray && dest.subarray) {
          dest.set(src.subarray(src_offs, src_offs + len2), dest_offs);
          return;
        }
        for (var i2 = 0; i2 < len2; i2++) {
          dest[dest_offs + i2] = src[src_offs + i2];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        var i2, l, len2, pos, chunk, result;
        len2 = 0;
        for (i2 = 0, l = chunks.length; i2 < l; i2++) {
          len2 += chunks[i2].length;
        }
        result = new Uint8Array(len2);
        pos = 0;
        for (i2 = 0, l = chunks.length; i2 < l; i2++) {
          chunk = chunks[i2];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      }
    };
    var fnUntyped = {
      arraySet: function(dest, src, src_offs, len2, dest_offs) {
        for (var i2 = 0; i2 < len2; i2++) {
          dest[dest_offs + i2] = src[src_offs + i2];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        return [].concat.apply([], chunks);
      }
    };
    exports$1.setTyped = function(on) {
      if (on) {
        exports$1.Buf8 = Uint8Array;
        exports$1.Buf16 = Uint16Array;
        exports$1.Buf32 = Int32Array;
        exports$1.assign(exports$1, fnTyped);
      } else {
        exports$1.Buf8 = Array;
        exports$1.Buf16 = Array;
        exports$1.Buf32 = Array;
        exports$1.assign(exports$1, fnUntyped);
      }
    };
    exports$1.setTyped(TYPED_OK);
  })(common);
  var trees$1 = {};
  var utils$3 = common;
  var Z_FIXED$1 = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN$1 = 2;
  function zero$1(buf) {
    var len2 = buf.length;
    while (--len2 >= 0) {
      buf[len2] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var LENGTH_CODES$1 = 29;
  var LITERALS$1 = 256;
  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  var D_CODES$1 = 30;
  var BL_CODES$1 = 19;
  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  var MAX_BITS$1 = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  );
  var extra_dbits = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  );
  var extra_blbits = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  );
  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function d_code(dist2) {
    return dist2 < 256 ? _dist_code[dist2] : _dist_code[256 + (dist2 >>> 7)];
  }
  function put_short(s, w) {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  }
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  }
  function send_code(s, c, tree) {
    send_bits(
      s,
      tree[c * 2],
      tree[c * 2 + 1]
      /*.Len*/
    );
  }
  function bi_reverse(code2, len2) {
    var res = 0;
    do {
      res |= code2 & 1;
      code2 >>>= 1;
      res <<= 1;
    } while (--len2 > 0);
    return res >>> 1;
  }
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }
  function gen_bitlen(s, desc2) {
    var tree = desc2.dyn_tree;
    var max_code = desc2.max_code;
    var stree = desc2.stat_desc.static_tree;
    var has_stree = desc2.stat_desc.has_stree;
    var extra = desc2.stat_desc.extra_bits;
    var base = desc2.stat_desc.extra_base;
    var max_length = desc2.stat_desc.max_length;
    var h;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }
  function gen_codes(tree, max_code, bl_count) {
    var next_code = new Array(MAX_BITS$1 + 1);
    var code2 = 0;
    var bits;
    var n;
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code2 = code2 + bl_count[bits - 1] << 1;
    }
    for (n = 0; n <= max_code; n++) {
      var len2 = tree[n * 2 + 1];
      if (len2 === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len2]++, len2);
    }
  }
  function tr_static_init() {
    var n;
    var bits;
    var length;
    var code2;
    var dist2;
    var bl_count = new Array(MAX_BITS$1 + 1);
    length = 0;
    for (code2 = 0; code2 < LENGTH_CODES$1 - 1; code2++) {
      base_length[code2] = length;
      for (n = 0; n < 1 << extra_lbits[code2]; n++) {
        _length_code[length++] = code2;
      }
    }
    _length_code[length - 1] = code2;
    dist2 = 0;
    for (code2 = 0; code2 < 16; code2++) {
      base_dist[code2] = dist2;
      for (n = 0; n < 1 << extra_dbits[code2]; n++) {
        _dist_code[dist2++] = code2;
      }
    }
    dist2 >>= 7;
    for (; code2 < D_CODES$1; code2++) {
      base_dist[code2] = dist2 << 7;
      for (n = 0; n < 1 << extra_dbits[code2] - 7; n++) {
        _dist_code[256 + dist2++] = code2;
      }
    }
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
  }
  function init_block(s) {
    var n;
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }
  function copy_block(s, buf, len2, header) {
    bi_windup(s);
    {
      put_short(s, len2);
      put_short(s, ~len2);
    }
    utils$3.arraySet(s.pending_buf, s.window, buf, len2, s.pending);
    s.pending += len2;
  }
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  }
  function pqdownheap(s, tree, k) {
    var v = s.heap[k];
    var j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  }
  function compress_block(s, ltree, dtree) {
    var dist2;
    var lc;
    var lx = 0;
    var code2;
    var extra;
    if (s.last_lit !== 0) {
      do {
        dist2 = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist2 === 0) {
          send_code(s, lc, ltree);
        } else {
          code2 = _length_code[lc];
          send_code(s, code2 + LITERALS$1 + 1, ltree);
          extra = extra_lbits[code2];
          if (extra !== 0) {
            lc -= base_length[code2];
            send_bits(s, lc, extra);
          }
          dist2--;
          code2 = d_code(dist2);
          send_code(s, code2, dtree);
          extra = extra_dbits[code2];
          if (extra !== 0) {
            dist2 -= base_dist[code2];
            send_bits(s, dist2, extra);
          }
        }
      } while (lx < s.last_lit);
    }
    send_code(s, END_BLOCK, ltree);
  }
  function build_tree(s, desc2) {
    var tree = desc2.dyn_tree;
    var stree = desc2.stat_desc.static_tree;
    var has_stree = desc2.stat_desc.has_stree;
    var elems = desc2.stat_desc.elems;
    var n, m;
    var max_code = -1;
    var node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;
    for (n = 0; n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc2.max_code = max_code;
    for (n = s.heap_len >> 1; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[
        1
        /*SMALLEST*/
      ] = s.heap[s.heap_len--];
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
      m = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[
        1
        /*SMALLEST*/
      ] = node++;
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[
      1
      /*SMALLEST*/
    ];
    gen_bitlen(s, desc2);
    gen_codes(tree, max_code, s.bl_count);
  }
  function scan_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function send_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function build_bl_tree(s) {
    var max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }
  function send_all_trees(s, lcodes, dcodes, blcodes) {
    var rank2;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank2 = 0; rank2 < blcodes; rank2++) {
      send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  }
  function detect_data_type(s) {
    var black_mask = 4093624447;
    var n;
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  }
  var static_init_done = false;
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  }
  function _tr_stored_block(s, buf, stored_len, last) {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s, buf, stored_len);
  }
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }
  function _tr_flush_block(s, buf, stored_len, last) {
    var opt_lenb, static_lenb;
    var max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN$1) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  }
  function _tr_tally(s, dist2, lc) {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist2 >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist2 & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist2 === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist2--;
      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
      s.dyn_dtree[d_code(dist2) * 2]++;
    }
    return s.last_lit === s.lit_bufsize - 1;
  }
  trees$1._tr_init = _tr_init;
  trees$1._tr_stored_block = _tr_stored_block;
  trees$1._tr_flush_block = _tr_flush_block;
  trees$1._tr_tally = _tr_tally;
  trees$1._tr_align = _tr_align;
  function adler32$2(adler, buf, len2, pos) {
    var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len2 !== 0) {
      n = len2 > 2e3 ? 2e3 : len2;
      len2 -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  }
  var adler32_1 = adler32$2;
  function makeTable() {
    var c, table = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32$2(crc, buf, len2, pos) {
    var t = crcTable, end = pos + len2;
    crc ^= -1;
    for (var i2 = pos; i2 < end; i2++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i2]) & 255];
    }
    return crc ^ -1;
  }
  var crc32_1 = crc32$2;
  var messages = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  };
  var utils$2 = common;
  var trees = trees$1;
  var adler32$1 = adler32_1;
  var crc32$1 = crc32_1;
  var msg = messages;
  var Z_NO_FLUSH = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH$1 = 4;
  var Z_BLOCK$1 = 5;
  var Z_OK$1 = 0;
  var Z_STREAM_END$1 = 1;
  var Z_STREAM_ERROR$1 = -2;
  var Z_DATA_ERROR$1 = -3;
  var Z_BUF_ERROR$1 = -5;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED$1 = 8;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS$1 = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  function err(strm, errorCode) {
    strm.msg = msg[errorCode];
    return errorCode;
  }
  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function zero(buf) {
    var len2 = buf.length;
    while (--len2 >= 0) {
      buf[len2] = 0;
    }
  }
  function flush_pending(strm) {
    var s = strm.state;
    var len2 = s.pending;
    if (len2 > strm.avail_out) {
      len2 = strm.avail_out;
    }
    if (len2 === 0) {
      return;
    }
    utils$2.arraySet(strm.output, s.pending_buf, s.pending_out, len2, strm.next_out);
    strm.next_out += len2;
    s.pending_out += len2;
    strm.total_out += len2;
    strm.avail_out -= len2;
    s.pending -= len2;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }
  function flush_block_only(s, last) {
    trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }
  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }
  function putShortMSB(s, b) {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  }
  function read_buf(strm, buf, start, size) {
    var len2 = strm.avail_in;
    if (len2 > size) {
      len2 = size;
    }
    if (len2 === 0) {
      return 0;
    }
    strm.avail_in -= len2;
    utils$2.arraySet(buf, strm.input, strm.next_in, len2, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32$1(strm.adler, buf, len2, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32$1(strm.adler, buf, len2, start);
    }
    strm.next_in += len2;
    strm.total_in += len2;
    return len2;
  }
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    var scan = s.strstart;
    var match;
    var len2;
    var best_len = s.prev_length;
    var nice_match = s.nice_match;
    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    var _win = s.window;
    var wmask = s.w_mask;
    var prev = s.prev;
    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len2 = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len2 > best_len) {
        s.match_start = cur_match;
        best_len = len2;
        if (len2 >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }
  function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        utils$2.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        n = _w_size;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
        while (s.insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  }
  function deflate_stored(s, flush) {
    var max_block_size = 65535;
    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    for (; ; ) {
      if (s.lookahead <= 1) {
        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.strstart += s.lookahead;
      s.lookahead = 0;
      var max_start = s.block_start + max_block_size;
      if (s.strstart === 0 || s.strstart >= max_start) {
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$1) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.strstart > s.block_start) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  }
  function deflate_fast(s, flush) {
    var hash_head;
    var bflush;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
        }
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$1) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_slow(s, flush) {
    var hash_head;
    var bflush;
    var max_insert;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$1) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_rle(s, flush) {
    var bflush;
    var prev;
    var scan, strend;
    var _win = s.window;
    for (; ; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$1) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_huff(s, flush) {
    var bflush;
    for (; ; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$1) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table;
  configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),
    /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),
    /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),
    /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),
    /* 3 */
    new Config(4, 4, 16, 16, deflate_slow),
    /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),
    /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),
    /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),
    /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),
    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
  ];
  function lm_init(s) {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$1;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new utils$2.Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new utils$2.Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new utils$2.Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new utils$2.Buf16(MAX_BITS + 1);
    this.heap = new utils$2.Buf16(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new utils$2.Buf16(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function deflateResetKeep(strm) {
    var s;
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = Z_NO_FLUSH;
    trees._tr_init(s);
    return Z_OK$1;
  }
  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK$1) {
      lm_init(strm.state);
    }
    return ret;
  }
  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$1;
    }
    strm.state.gzhead = head;
    return Z_OK$1;
  }
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    var wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$1 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    var s = new DeflateState();
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new utils$2.Buf8(s.w_size * 2);
    s.head = new utils$2.Buf16(s.hash_size);
    s.prev = new utils$2.Buf16(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new utils$2.Buf8(s.pending_buf_size);
    s.d_buf = 1 * s.lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  }
  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED$1, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
  }
  function deflate(strm, flush) {
    var old_flush, s;
    var beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
    }
    s = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$1) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
    }
    s.strm = strm;
    old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(
            s,
            (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        var header = Z_DEFLATED$1 + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        beg = s.pending;
        while (s.gzindex < (s.gzhead.extra.length & 65535)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 255);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$1;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$1) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK$1;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          trees._tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK$1;
        }
      }
    }
    if (flush !== Z_FINISH$1) {
      return Z_OK$1;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$1;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK$1 : Z_STREAM_END$1;
  }
  function deflateEnd(strm) {
    var status;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$1;
  }
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    s = strm.state;
    wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR$1;
    }
    if (wrap === 1) {
      strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      tmpDict = new utils$2.Buf8(s.w_size);
      utils$2.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK$1;
  }
  deflate$1.deflateInit = deflateInit;
  deflate$1.deflateInit2 = deflateInit2;
  deflate$1.deflateReset = deflateReset;
  deflate$1.deflateResetKeep = deflateResetKeep;
  deflate$1.deflateSetHeader = deflateSetHeader;
  deflate$1.deflate = deflate;
  deflate$1.deflateEnd = deflateEnd;
  deflate$1.deflateSetDictionary = deflateSetDictionary;
  deflate$1.deflateInfo = "pako deflate (from Nodeca project)";
  var inflate$1 = {};
  var BAD$1 = 30;
  var TYPE$1 = 12;
  var inffast = function inflate_fast2(strm, start) {
    var state2;
    var _in;
    var last;
    var _out;
    var beg;
    var end;
    var dmax;
    var wsize;
    var whave;
    var wnext;
    var s_window;
    var hold;
    var bits;
    var lcode;
    var dcode;
    var lmask;
    var dmask;
    var here;
    var op;
    var len2;
    var dist2;
    var from;
    var from_source;
    var input, output;
    state2 = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state2.dmax;
    wsize = state2.wsize;
    whave = state2.whave;
    wnext = state2.wnext;
    s_window = state2.window;
    hold = state2.hold;
    bits = state2.bits;
    lcode = state2.lencode;
    dcode = state2.distcode;
    lmask = (1 << state2.lenbits) - 1;
    dmask = (1 << state2.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len2 = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len2 += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (; ; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist2 = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist2 += hold & (1 << op) - 1;
                    if (dist2 > dmax) {
                      strm.msg = "invalid distance too far back";
                      state2.mode = BAD$1;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist2 > op) {
                      op = dist2 - op;
                      if (op > whave) {
                        if (state2.sane) {
                          strm.msg = "invalid distance too far back";
                          state2.mode = BAD$1;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len2) {
                          len2 -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist2;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len2) {
                          len2 -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len2) {
                            op = wnext;
                            len2 -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist2;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len2) {
                          len2 -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist2;
                          from_source = output;
                        }
                      }
                      while (len2 > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len2 -= 3;
                      }
                      if (len2) {
                        output[_out++] = from_source[from++];
                        if (len2 > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist2;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len2 -= 3;
                      } while (len2 > 2);
                      if (len2) {
                        output[_out++] = output[from++];
                        if (len2 > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state2.mode = BAD$1;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state2.mode = TYPE$1;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state2.mode = BAD$1;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len2 = bits >> 3;
    _in -= len2;
    bits -= len2 << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state2.hold = hold;
    state2.bits = bits;
    return;
  };
  var utils$1 = common;
  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];
  var lext = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];
  var dbase = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];
  var dext = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  var inftrees = function inflate_table2(type2, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    var len2 = 0;
    var sym = 0;
    var min2 = 0, max2 = 0;
    var root = 0;
    var curr = 0;
    var drop = 0;
    var left = 0;
    var used = 0;
    var huff = 0;
    var incr;
    var fill;
    var low;
    var mask;
    var next;
    var base = null;
    var base_index = 0;
    var end;
    var count = new utils$1.Buf16(MAXBITS + 1);
    var offs = new utils$1.Buf16(MAXBITS + 1);
    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    for (len2 = 0; len2 <= MAXBITS; len2++) {
      count[len2] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max2 = MAXBITS; max2 >= 1; max2--) {
      if (count[max2] !== 0) {
        break;
      }
    }
    if (root > max2) {
      root = max2;
    }
    if (max2 === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min2 = 1; min2 < max2; min2++) {
      if (count[min2] !== 0) {
        break;
      }
    }
    if (root < min2) {
      root = min2;
    }
    left = 1;
    for (len2 = 1; len2 <= MAXBITS; len2++) {
      left <<= 1;
      left -= count[len2];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type2 === CODES$1 || max2 !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len2 = 1; len2 < MAXBITS; len2++) {
      offs[len2 + 1] = offs[len2] + count[len2];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type2 === CODES$1) {
      base = extra = work;
      end = 19;
    } else if (type2 === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len2 = min2;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type2 === LENS$1 && used > ENOUGH_LENS$1 || type2 === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    for (; ; ) {
      here_bits = len2 - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len2 - drop;
      fill = 1 << curr;
      min2 = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len2 - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len2] === 0) {
        if (len2 === max2) {
          break;
        }
        len2 = lens[lens_index + work[sym]];
      }
      if (len2 > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min2;
        curr = len2 - drop;
        left = 1 << curr;
        while (curr + drop < max2) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type2 === LENS$1 && used > ENOUGH_LENS$1 || type2 === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len2 - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
  var utils = common;
  var adler32 = adler32_1;
  var crc32 = crc32_1;
  var inflate_fast = inffast;
  var inflate_table = inftrees;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var Z_DEFLATED = 8;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  function zswap32(q) {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  }
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new utils.Buf16(320);
    this.work = new utils.Buf16(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function inflateResetKeep(strm) {
    var state2;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    strm.total_in = strm.total_out = state2.total = 0;
    strm.msg = "";
    if (state2.wrap) {
      strm.adler = state2.wrap & 1;
    }
    state2.mode = HEAD;
    state2.last = 0;
    state2.havedict = 0;
    state2.dmax = 32768;
    state2.head = null;
    state2.hold = 0;
    state2.bits = 0;
    state2.lencode = state2.lendyn = new utils.Buf32(ENOUGH_LENS);
    state2.distcode = state2.distdyn = new utils.Buf32(ENOUGH_DISTS);
    state2.sane = 1;
    state2.back = -1;
    return Z_OK;
  }
  function inflateReset(strm) {
    var state2;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    state2.wsize = 0;
    state2.whave = 0;
    state2.wnext = 0;
    return inflateResetKeep(strm);
  }
  function inflateReset2(strm, windowBits) {
    var wrap;
    var state2;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR;
    }
    if (state2.window !== null && state2.wbits !== windowBits) {
      state2.window = null;
    }
    state2.wrap = wrap;
    state2.wbits = windowBits;
    return inflateReset(strm);
  }
  function inflateInit2(strm, windowBits) {
    var ret;
    var state2;
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    state2 = new InflateState();
    strm.state = state2;
    state2.window = null;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK) {
      strm.state = null;
    }
    return ret;
  }
  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }
  var virgin = true;
  var lenfix, distfix;
  function fixedtables(state2) {
    if (virgin) {
      var sym;
      lenfix = new utils.Buf32(512);
      distfix = new utils.Buf32(32);
      sym = 0;
      while (sym < 144) {
        state2.lens[sym++] = 8;
      }
      while (sym < 256) {
        state2.lens[sym++] = 9;
      }
      while (sym < 280) {
        state2.lens[sym++] = 7;
      }
      while (sym < 288) {
        state2.lens[sym++] = 8;
      }
      inflate_table(LENS, state2.lens, 0, 288, lenfix, 0, state2.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state2.lens[sym++] = 5;
      }
      inflate_table(DISTS, state2.lens, 0, 32, distfix, 0, state2.work, { bits: 5 });
      virgin = false;
    }
    state2.lencode = lenfix;
    state2.lenbits = 9;
    state2.distcode = distfix;
    state2.distbits = 5;
  }
  function updatewindow(strm, src, end, copy2) {
    var dist2;
    var state2 = strm.state;
    if (state2.window === null) {
      state2.wsize = 1 << state2.wbits;
      state2.wnext = 0;
      state2.whave = 0;
      state2.window = new utils.Buf8(state2.wsize);
    }
    if (copy2 >= state2.wsize) {
      utils.arraySet(state2.window, src, end - state2.wsize, state2.wsize, 0);
      state2.wnext = 0;
      state2.whave = state2.wsize;
    } else {
      dist2 = state2.wsize - state2.wnext;
      if (dist2 > copy2) {
        dist2 = copy2;
      }
      utils.arraySet(state2.window, src, end - copy2, dist2, state2.wnext);
      copy2 -= dist2;
      if (copy2) {
        utils.arraySet(state2.window, src, end - copy2, copy2, 0);
        state2.wnext = copy2;
        state2.whave = state2.wsize;
      } else {
        state2.wnext += dist2;
        if (state2.wnext === state2.wsize) {
          state2.wnext = 0;
        }
        if (state2.whave < state2.wsize) {
          state2.whave += dist2;
        }
      }
    }
    return 0;
  }
  function inflate(strm, flush) {
    var state2;
    var input, output;
    var next;
    var put;
    var have, left;
    var hold;
    var bits;
    var _in, _out;
    var copy2;
    var from;
    var from_source;
    var here = 0;
    var here_bits, here_op, here_val;
    var last_bits, last_op, last_val;
    var len2;
    var ret;
    var hbuf = new utils.Buf8(4);
    var opts;
    var n;
    var order = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    if (state2.mode === TYPE) {
      state2.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state2.hold;
    bits = state2.bits;
    _in = have;
    _out = left;
    ret = Z_OK;
    inf_leave:
      for (; ; ) {
        switch (state2.mode) {
          case HEAD:
            if (state2.wrap === 0) {
              state2.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.wrap & 2 && hold === 35615) {
              state2.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32(state2.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state2.mode = FLAGS;
              break;
            }
            state2.flags = 0;
            if (state2.head) {
              state2.head.done = false;
            }
            if (!(state2.wrap & 1) || /* check if zlib header allowed */
            (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state2.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state2.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len2 = (hold & 15) + 8;
            if (state2.wbits === 0) {
              state2.wbits = len2;
            } else if (len2 > state2.wbits) {
              strm.msg = "invalid window size";
              state2.mode = BAD;
              break;
            }
            state2.dmax = 1 << len2;
            strm.adler = state2.check = 1;
            state2.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.flags = hold;
            if ((state2.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state2.mode = BAD;
              break;
            }
            if (state2.flags & 57344) {
              strm.msg = "unknown header flags set";
              state2.mode = BAD;
              break;
            }
            if (state2.head) {
              state2.head.text = hold >> 8 & 1;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32(state2.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.head) {
              state2.head.time = hold;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state2.check = crc32(state2.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state2.head) {
              state2.head.xflags = hold & 255;
              state2.head.os = hold >> 8;
            }
            if (state2.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state2.check = crc32(state2.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state2.mode = EXLEN;
          case EXLEN:
            if (state2.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.length = hold;
              if (state2.head) {
                state2.head.extra_len = hold;
              }
              if (state2.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state2.check = crc32(state2.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state2.head) {
              state2.head.extra = null;
            }
            state2.mode = EXTRA;
          case EXTRA:
            if (state2.flags & 1024) {
              copy2 = state2.length;
              if (copy2 > have) {
                copy2 = have;
              }
              if (copy2) {
                if (state2.head) {
                  len2 = state2.head.extra_len - state2.length;
                  if (!state2.head.extra) {
                    state2.head.extra = new Array(state2.head.extra_len);
                  }
                  utils.arraySet(
                    state2.head.extra,
                    input,
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    copy2,
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len2
                  );
                }
                if (state2.flags & 512) {
                  state2.check = crc32(state2.check, input, copy2, next);
                }
                have -= copy2;
                next += copy2;
                state2.length -= copy2;
              }
              if (state2.length) {
                break inf_leave;
              }
            }
            state2.length = 0;
            state2.mode = NAME;
          case NAME:
            if (state2.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy2 = 0;
              do {
                len2 = input[next + copy2++];
                if (state2.head && len2 && state2.length < 65536) {
                  state2.head.name += String.fromCharCode(len2);
                }
              } while (len2 && copy2 < have);
              if (state2.flags & 512) {
                state2.check = crc32(state2.check, input, copy2, next);
              }
              have -= copy2;
              next += copy2;
              if (len2) {
                break inf_leave;
              }
            } else if (state2.head) {
              state2.head.name = null;
            }
            state2.length = 0;
            state2.mode = COMMENT;
          case COMMENT:
            if (state2.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy2 = 0;
              do {
                len2 = input[next + copy2++];
                if (state2.head && len2 && state2.length < 65536) {
                  state2.head.comment += String.fromCharCode(len2);
                }
              } while (len2 && copy2 < have);
              if (state2.flags & 512) {
                state2.check = crc32(state2.check, input, copy2, next);
              }
              have -= copy2;
              next += copy2;
              if (len2) {
                break inf_leave;
              }
            } else if (state2.head) {
              state2.head.comment = null;
            }
            state2.mode = HCRC;
          case HCRC:
            if (state2.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state2.check & 65535)) {
                strm.msg = "header crc mismatch";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state2.head) {
              state2.head.hcrc = state2.flags >> 9 & 1;
              state2.head.done = true;
            }
            strm.adler = state2.check = 0;
            state2.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state2.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state2.mode = DICT;
          case DICT:
            if (state2.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state2.hold = hold;
              state2.bits = bits;
              return Z_NEED_DICT;
            }
            strm.adler = state2.check = 1;
            state2.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state2.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state2.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state2.mode = STORED;
                break;
              case 1:
                fixedtables(state2);
                state2.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state2.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state2.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state2.mode = BAD;
              break;
            }
            state2.length = hold & 65535;
            hold = 0;
            bits = 0;
            state2.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state2.mode = COPY;
          case COPY:
            copy2 = state2.length;
            if (copy2) {
              if (copy2 > have) {
                copy2 = have;
              }
              if (copy2 > left) {
                copy2 = left;
              }
              if (copy2 === 0) {
                break inf_leave;
              }
              utils.arraySet(output, input, next, copy2, put);
              have -= copy2;
              next += copy2;
              left -= copy2;
              put += copy2;
              state2.length -= copy2;
              break;
            }
            state2.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state2.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state2.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state2.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state2.nlen > 286 || state2.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state2.mode = BAD;
              break;
            }
            state2.have = 0;
            state2.mode = LENLENS;
          case LENLENS:
            while (state2.have < state2.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.lens[order[state2.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state2.have < 19) {
              state2.lens[order[state2.have++]] = 0;
            }
            state2.lencode = state2.lendyn;
            state2.lenbits = 7;
            opts = { bits: state2.lenbits };
            ret = inflate_table(CODES, state2.lens, 0, 19, state2.lencode, 0, state2.work, opts);
            state2.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state2.mode = BAD;
              break;
            }
            state2.have = 0;
            state2.mode = CODELENS;
          case CODELENS:
            while (state2.have < state2.nlen + state2.ndist) {
              for (; ; ) {
                here = state2.lencode[hold & (1 << state2.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state2.lens[state2.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state2.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state2.mode = BAD;
                    break;
                  }
                  len2 = state2.lens[state2.have - 1];
                  copy2 = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len2 = 0;
                  copy2 = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len2 = 0;
                  copy2 = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state2.have + copy2 > state2.nlen + state2.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state2.mode = BAD;
                  break;
                }
                while (copy2--) {
                  state2.lens[state2.have++] = len2;
                }
              }
            }
            if (state2.mode === BAD) {
              break;
            }
            if (state2.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state2.mode = BAD;
              break;
            }
            state2.lenbits = 9;
            opts = { bits: state2.lenbits };
            ret = inflate_table(LENS, state2.lens, 0, state2.nlen, state2.lencode, 0, state2.work, opts);
            state2.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state2.mode = BAD;
              break;
            }
            state2.distbits = 6;
            state2.distcode = state2.distdyn;
            opts = { bits: state2.distbits };
            ret = inflate_table(DISTS, state2.lens, state2.nlen, state2.ndist, state2.distcode, 0, state2.work, opts);
            state2.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state2.mode = BAD;
              break;
            }
            state2.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state2.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state2.hold = hold;
              state2.bits = bits;
              inflate_fast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state2.hold;
              bits = state2.bits;
              if (state2.mode === TYPE) {
                state2.back = -1;
              }
              break;
            }
            state2.back = 0;
            for (; ; ) {
              here = state2.lencode[hold & (1 << state2.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state2.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state2.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state2.back += here_bits;
            state2.length = here_val;
            if (here_op === 0) {
              state2.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state2.back = -1;
              state2.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state2.mode = BAD;
              break;
            }
            state2.extra = here_op & 15;
            state2.mode = LENEXT;
          case LENEXT:
            if (state2.extra) {
              n = state2.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.length += hold & (1 << state2.extra) - 1;
              hold >>>= state2.extra;
              bits -= state2.extra;
              state2.back += state2.extra;
            }
            state2.was = state2.length;
            state2.mode = DIST;
          case DIST:
            for (; ; ) {
              here = state2.distcode[hold & (1 << state2.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state2.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state2.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state2.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state2.mode = BAD;
              break;
            }
            state2.offset = here_val;
            state2.extra = here_op & 15;
            state2.mode = DISTEXT;
          case DISTEXT:
            if (state2.extra) {
              n = state2.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state2.offset += hold & (1 << state2.extra) - 1;
              hold >>>= state2.extra;
              bits -= state2.extra;
              state2.back += state2.extra;
            }
            if (state2.offset > state2.dmax) {
              strm.msg = "invalid distance too far back";
              state2.mode = BAD;
              break;
            }
            state2.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy2 = _out - left;
            if (state2.offset > copy2) {
              copy2 = state2.offset - copy2;
              if (copy2 > state2.whave) {
                if (state2.sane) {
                  strm.msg = "invalid distance too far back";
                  state2.mode = BAD;
                  break;
                }
              }
              if (copy2 > state2.wnext) {
                copy2 -= state2.wnext;
                from = state2.wsize - copy2;
              } else {
                from = state2.wnext - copy2;
              }
              if (copy2 > state2.length) {
                copy2 = state2.length;
              }
              from_source = state2.window;
            } else {
              from_source = output;
              from = put - state2.offset;
              copy2 = state2.length;
            }
            if (copy2 > left) {
              copy2 = left;
            }
            left -= copy2;
            state2.length -= copy2;
            do {
              output[put++] = from_source[from++];
            } while (--copy2);
            if (state2.length === 0) {
              state2.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state2.length;
            left--;
            state2.mode = LEN;
            break;
          case CHECK:
            if (state2.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state2.total += _out;
              if (_out) {
                strm.adler = state2.check = /*UPDATE(state.check, put - _out, _out);*/
                state2.flags ? crc32(state2.check, output, _out, put - _out) : adler32(state2.check, output, _out, put - _out);
              }
              _out = left;
              if ((state2.flags ? hold : zswap32(hold)) !== state2.check) {
                strm.msg = "incorrect data check";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state2.mode = LENGTH;
          case LENGTH:
            if (state2.wrap && state2.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state2.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state2.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state2.mode = DONE;
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
          default:
            return Z_STREAM_ERROR;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state2.hold = hold;
    state2.bits = bits;
    if (state2.wsize || _out !== strm.avail_out && state2.mode < BAD && (state2.mode < CHECK || flush !== Z_FINISH)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state2.total += _out;
    if (state2.wrap && _out) {
      strm.adler = state2.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      state2.flags ? crc32(state2.check, output, _out, strm.next_out - _out) : adler32(state2.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state2.bits + (state2.last ? 64 : 0) + (state2.mode === TYPE ? 128 : 0) + (state2.mode === LEN_ || state2.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  }
  function inflateEnd(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    var state2 = strm.state;
    if (state2.window) {
      state2.window = null;
    }
    strm.state = null;
    return Z_OK;
  }
  function inflateGetHeader(strm, head) {
    var state2;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    if ((state2.wrap & 2) === 0) {
      return Z_STREAM_ERROR;
    }
    state2.head = head;
    head.done = false;
    return Z_OK;
  }
  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state2;
    var dictid;
    var ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state2 = strm.state;
    if (state2.wrap !== 0 && state2.mode !== DICT) {
      return Z_STREAM_ERROR;
    }
    if (state2.mode === DICT) {
      dictid = 1;
      dictid = adler32(dictid, dictionary, dictLength, 0);
      if (dictid !== state2.check) {
        return Z_DATA_ERROR;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state2.mode = MEM;
      return Z_MEM_ERROR;
    }
    state2.havedict = 1;
    return Z_OK;
  }
  inflate$1.inflateReset = inflateReset;
  inflate$1.inflateReset2 = inflateReset2;
  inflate$1.inflateResetKeep = inflateResetKeep;
  inflate$1.inflateInit = inflateInit;
  inflate$1.inflateInit2 = inflateInit2;
  inflate$1.inflate = inflate;
  inflate$1.inflateEnd = inflateEnd;
  inflate$1.inflateGetHeader = inflateGetHeader;
  inflate$1.inflateSetDictionary = inflateSetDictionary;
  inflate$1.inflateInfo = "pako inflate (from Nodeca project)";
  var constants = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  };
  (function(exports$1) {
    var assert2 = requireAssert();
    var Zstream = zstream;
    var zlib_deflate = deflate$1;
    var zlib_inflate = inflate$1;
    var constants$12 = constants;
    for (var key in constants$12) {
      exports$1[key] = constants$12[key];
    }
    exports$1.NONE = 0;
    exports$1.DEFLATE = 1;
    exports$1.INFLATE = 2;
    exports$1.GZIP = 3;
    exports$1.GUNZIP = 4;
    exports$1.DEFLATERAW = 5;
    exports$1.INFLATERAW = 6;
    exports$1.UNZIP = 7;
    var GZIP_HEADER_ID1 = 31;
    var GZIP_HEADER_ID2 = 139;
    function Zlib(mode) {
      if (typeof mode !== "number" || mode < exports$1.DEFLATE || mode > exports$1.UNZIP) {
        throw new TypeError("Bad argument");
      }
      this.dictionary = null;
      this.err = 0;
      this.flush = 0;
      this.init_done = false;
      this.level = 0;
      this.memLevel = 0;
      this.mode = mode;
      this.strategy = 0;
      this.windowBits = 0;
      this.write_in_progress = false;
      this.pending_close = false;
      this.gzip_id_bytes_read = 0;
    }
    Zlib.prototype.close = function() {
      if (this.write_in_progress) {
        this.pending_close = true;
        return;
      }
      this.pending_close = false;
      assert2(this.init_done, "close before init");
      assert2(this.mode <= exports$1.UNZIP);
      if (this.mode === exports$1.DEFLATE || this.mode === exports$1.GZIP || this.mode === exports$1.DEFLATERAW) {
        zlib_deflate.deflateEnd(this.strm);
      } else if (this.mode === exports$1.INFLATE || this.mode === exports$1.GUNZIP || this.mode === exports$1.INFLATERAW || this.mode === exports$1.UNZIP) {
        zlib_inflate.inflateEnd(this.strm);
      }
      this.mode = exports$1.NONE;
      this.dictionary = null;
    };
    Zlib.prototype.write = function(flush, input, in_off, in_len, out, out_off, out_len) {
      return this._write(true, flush, input, in_off, in_len, out, out_off, out_len);
    };
    Zlib.prototype.writeSync = function(flush, input, in_off, in_len, out, out_off, out_len) {
      return this._write(false, flush, input, in_off, in_len, out, out_off, out_len);
    };
    Zlib.prototype._write = function(async, flush, input, in_off, in_len, out, out_off, out_len) {
      assert2.equal(arguments.length, 8);
      assert2(this.init_done, "write before init");
      assert2(this.mode !== exports$1.NONE, "already finalized");
      assert2.equal(false, this.write_in_progress, "write already in progress");
      assert2.equal(false, this.pending_close, "close is pending");
      this.write_in_progress = true;
      assert2.equal(false, flush === void 0, "must provide flush value");
      this.write_in_progress = true;
      if (flush !== exports$1.Z_NO_FLUSH && flush !== exports$1.Z_PARTIAL_FLUSH && flush !== exports$1.Z_SYNC_FLUSH && flush !== exports$1.Z_FULL_FLUSH && flush !== exports$1.Z_FINISH && flush !== exports$1.Z_BLOCK) {
        throw new Error("Invalid flush value");
      }
      if (input == null) {
        input = Buffer2.alloc(0);
        in_len = 0;
        in_off = 0;
      }
      this.strm.avail_in = in_len;
      this.strm.input = input;
      this.strm.next_in = in_off;
      this.strm.avail_out = out_len;
      this.strm.output = out;
      this.strm.next_out = out_off;
      this.flush = flush;
      if (!async) {
        this._process();
        if (this._checkError()) {
          return this._afterSync();
        }
        return;
      }
      var self2 = this;
      process$1.nextTick(function() {
        self2._process();
        self2._after();
      });
      return this;
    };
    Zlib.prototype._afterSync = function() {
      var avail_out = this.strm.avail_out;
      var avail_in = this.strm.avail_in;
      this.write_in_progress = false;
      return [avail_in, avail_out];
    };
    Zlib.prototype._process = function() {
      var next_expected_header_byte = null;
      switch (this.mode) {
        case exports$1.DEFLATE:
        case exports$1.GZIP:
        case exports$1.DEFLATERAW:
          this.err = zlib_deflate.deflate(this.strm, this.flush);
          break;
        case exports$1.UNZIP:
          if (this.strm.avail_in > 0) {
            next_expected_header_byte = this.strm.next_in;
          }
          switch (this.gzip_id_bytes_read) {
            case 0:
              if (next_expected_header_byte === null) {
                break;
              }
              if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID1) {
                this.gzip_id_bytes_read = 1;
                next_expected_header_byte++;
                if (this.strm.avail_in === 1) {
                  break;
                }
              } else {
                this.mode = exports$1.INFLATE;
                break;
              }
            case 1:
              if (next_expected_header_byte === null) {
                break;
              }
              if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID2) {
                this.gzip_id_bytes_read = 2;
                this.mode = exports$1.GUNZIP;
              } else {
                this.mode = exports$1.INFLATE;
              }
              break;
            default:
              throw new Error("invalid number of gzip magic number bytes read");
          }
        case exports$1.INFLATE:
        case exports$1.GUNZIP:
        case exports$1.INFLATERAW:
          this.err = zlib_inflate.inflate(
            this.strm,
            this.flush
            // If data was encoded with dictionary
          );
          if (this.err === exports$1.Z_NEED_DICT && this.dictionary) {
            this.err = zlib_inflate.inflateSetDictionary(this.strm, this.dictionary);
            if (this.err === exports$1.Z_OK) {
              this.err = zlib_inflate.inflate(this.strm, this.flush);
            } else if (this.err === exports$1.Z_DATA_ERROR) {
              this.err = exports$1.Z_NEED_DICT;
            }
          }
          while (this.strm.avail_in > 0 && this.mode === exports$1.GUNZIP && this.err === exports$1.Z_STREAM_END && this.strm.next_in[0] !== 0) {
            this.reset();
            this.err = zlib_inflate.inflate(this.strm, this.flush);
          }
          break;
        default:
          throw new Error("Unknown mode " + this.mode);
      }
    };
    Zlib.prototype._checkError = function() {
      switch (this.err) {
        case exports$1.Z_OK:
        case exports$1.Z_BUF_ERROR:
          if (this.strm.avail_out !== 0 && this.flush === exports$1.Z_FINISH) {
            this._error("unexpected end of file");
            return false;
          }
          break;
        case exports$1.Z_STREAM_END:
          break;
        case exports$1.Z_NEED_DICT:
          if (this.dictionary == null) {
            this._error("Missing dictionary");
          } else {
            this._error("Bad dictionary");
          }
          return false;
        default:
          this._error("Zlib error");
          return false;
      }
      return true;
    };
    Zlib.prototype._after = function() {
      if (!this._checkError()) {
        return;
      }
      var avail_out = this.strm.avail_out;
      var avail_in = this.strm.avail_in;
      this.write_in_progress = false;
      this.callback(avail_in, avail_out);
      if (this.pending_close) {
        this.close();
      }
    };
    Zlib.prototype._error = function(message) {
      if (this.strm.msg) {
        message = this.strm.msg;
      }
      this.onerror(
        message,
        this.err
        // no hope of rescue.
      );
      this.write_in_progress = false;
      if (this.pending_close) {
        this.close();
      }
    };
    Zlib.prototype.init = function(windowBits, level, memLevel, strategy, dictionary) {
      assert2(arguments.length === 4 || arguments.length === 5, "init(windowBits, level, memLevel, strategy, [dictionary])");
      assert2(windowBits >= 8 && windowBits <= 15, "invalid windowBits");
      assert2(level >= -1 && level <= 9, "invalid compression level");
      assert2(memLevel >= 1 && memLevel <= 9, "invalid memlevel");
      assert2(strategy === exports$1.Z_FILTERED || strategy === exports$1.Z_HUFFMAN_ONLY || strategy === exports$1.Z_RLE || strategy === exports$1.Z_FIXED || strategy === exports$1.Z_DEFAULT_STRATEGY, "invalid strategy");
      this._init(level, windowBits, memLevel, strategy, dictionary);
      this._setDictionary();
    };
    Zlib.prototype.params = function() {
      throw new Error("deflateParams Not supported");
    };
    Zlib.prototype.reset = function() {
      this._reset();
      this._setDictionary();
    };
    Zlib.prototype._init = function(level, windowBits, memLevel, strategy, dictionary) {
      this.level = level;
      this.windowBits = windowBits;
      this.memLevel = memLevel;
      this.strategy = strategy;
      this.flush = exports$1.Z_NO_FLUSH;
      this.err = exports$1.Z_OK;
      if (this.mode === exports$1.GZIP || this.mode === exports$1.GUNZIP) {
        this.windowBits += 16;
      }
      if (this.mode === exports$1.UNZIP) {
        this.windowBits += 32;
      }
      if (this.mode === exports$1.DEFLATERAW || this.mode === exports$1.INFLATERAW) {
        this.windowBits = -1 * this.windowBits;
      }
      this.strm = new Zstream();
      switch (this.mode) {
        case exports$1.DEFLATE:
        case exports$1.GZIP:
        case exports$1.DEFLATERAW:
          this.err = zlib_deflate.deflateInit2(this.strm, this.level, exports$1.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);
          break;
        case exports$1.INFLATE:
        case exports$1.GUNZIP:
        case exports$1.INFLATERAW:
        case exports$1.UNZIP:
          this.err = zlib_inflate.inflateInit2(this.strm, this.windowBits);
          break;
        default:
          throw new Error("Unknown mode " + this.mode);
      }
      if (this.err !== exports$1.Z_OK) {
        this._error("Init error");
      }
      this.dictionary = dictionary;
      this.write_in_progress = false;
      this.init_done = true;
    };
    Zlib.prototype._setDictionary = function() {
      if (this.dictionary == null) {
        return;
      }
      this.err = exports$1.Z_OK;
      switch (this.mode) {
        case exports$1.DEFLATE:
        case exports$1.DEFLATERAW:
          this.err = zlib_deflate.deflateSetDictionary(this.strm, this.dictionary);
          break;
      }
      if (this.err !== exports$1.Z_OK) {
        this._error("Failed to set dictionary");
      }
    };
    Zlib.prototype._reset = function() {
      this.err = exports$1.Z_OK;
      switch (this.mode) {
        case exports$1.DEFLATE:
        case exports$1.DEFLATERAW:
        case exports$1.GZIP:
          this.err = zlib_deflate.deflateReset(this.strm);
          break;
        case exports$1.INFLATE:
        case exports$1.INFLATERAW:
        case exports$1.GUNZIP:
          this.err = zlib_inflate.inflateReset(this.strm);
          break;
      }
      if (this.err !== exports$1.Z_OK) {
        this._error("Failed to reset stream");
      }
    };
    exports$1.Zlib = Zlib;
  })(binding);
  (function(exports$1) {
    var Buffer3 = require$$0.Buffer;
    var Transform2 = streamBrowserify.Transform;
    var binding$1 = binding;
    var util$1 = util;
    var assert2 = requireAssert().ok;
    var kMaxLength2 = require$$0.kMaxLength;
    var kRangeErrorMessage = "Cannot create final Buffer. It would be larger than 0x" + kMaxLength2.toString(16) + " bytes";
    binding$1.Z_MIN_WINDOWBITS = 8;
    binding$1.Z_MAX_WINDOWBITS = 15;
    binding$1.Z_DEFAULT_WINDOWBITS = 15;
    binding$1.Z_MIN_CHUNK = 64;
    binding$1.Z_MAX_CHUNK = Infinity;
    binding$1.Z_DEFAULT_CHUNK = 16 * 1024;
    binding$1.Z_MIN_MEMLEVEL = 1;
    binding$1.Z_MAX_MEMLEVEL = 9;
    binding$1.Z_DEFAULT_MEMLEVEL = 8;
    binding$1.Z_MIN_LEVEL = -1;
    binding$1.Z_MAX_LEVEL = 9;
    binding$1.Z_DEFAULT_LEVEL = binding$1.Z_DEFAULT_COMPRESSION;
    var bkeys = Object.keys(binding$1);
    for (var bk = 0; bk < bkeys.length; bk++) {
      var bkey = bkeys[bk];
      if (bkey.match(/^Z/)) {
        Object.defineProperty(exports$1, bkey, {
          enumerable: true,
          value: binding$1[bkey],
          writable: false
        });
      }
    }
    var codes = {
      Z_OK: binding$1.Z_OK,
      Z_STREAM_END: binding$1.Z_STREAM_END,
      Z_NEED_DICT: binding$1.Z_NEED_DICT,
      Z_ERRNO: binding$1.Z_ERRNO,
      Z_STREAM_ERROR: binding$1.Z_STREAM_ERROR,
      Z_DATA_ERROR: binding$1.Z_DATA_ERROR,
      Z_MEM_ERROR: binding$1.Z_MEM_ERROR,
      Z_BUF_ERROR: binding$1.Z_BUF_ERROR,
      Z_VERSION_ERROR: binding$1.Z_VERSION_ERROR
    };
    var ckeys = Object.keys(codes);
    for (var ck = 0; ck < ckeys.length; ck++) {
      var ckey = ckeys[ck];
      codes[codes[ckey]] = ckey;
    }
    Object.defineProperty(exports$1, "codes", {
      enumerable: true,
      value: Object.freeze(codes),
      writable: false
    });
    exports$1.Deflate = Deflate;
    exports$1.Inflate = Inflate;
    exports$1.Gzip = Gzip;
    exports$1.Gunzip = Gunzip;
    exports$1.DeflateRaw = DeflateRaw;
    exports$1.InflateRaw = InflateRaw;
    exports$1.Unzip = Unzip;
    exports$1.createDeflate = function(o) {
      return new Deflate(o);
    };
    exports$1.createInflate = function(o) {
      return new Inflate(o);
    };
    exports$1.createDeflateRaw = function(o) {
      return new DeflateRaw(o);
    };
    exports$1.createInflateRaw = function(o) {
      return new InflateRaw(o);
    };
    exports$1.createGzip = function(o) {
      return new Gzip(o);
    };
    exports$1.createGunzip = function(o) {
      return new Gunzip(o);
    };
    exports$1.createUnzip = function(o) {
      return new Unzip(o);
    };
    exports$1.deflate = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new Deflate(opts), buffer2, callback);
    };
    exports$1.deflateSync = function(buffer2, opts) {
      return zlibBufferSync(new Deflate(opts), buffer2);
    };
    exports$1.gzip = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new Gzip(opts), buffer2, callback);
    };
    exports$1.gzipSync = function(buffer2, opts) {
      return zlibBufferSync(new Gzip(opts), buffer2);
    };
    exports$1.deflateRaw = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new DeflateRaw(opts), buffer2, callback);
    };
    exports$1.deflateRawSync = function(buffer2, opts) {
      return zlibBufferSync(new DeflateRaw(opts), buffer2);
    };
    exports$1.unzip = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new Unzip(opts), buffer2, callback);
    };
    exports$1.unzipSync = function(buffer2, opts) {
      return zlibBufferSync(new Unzip(opts), buffer2);
    };
    exports$1.inflate = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new Inflate(opts), buffer2, callback);
    };
    exports$1.inflateSync = function(buffer2, opts) {
      return zlibBufferSync(new Inflate(opts), buffer2);
    };
    exports$1.gunzip = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new Gunzip(opts), buffer2, callback);
    };
    exports$1.gunzipSync = function(buffer2, opts) {
      return zlibBufferSync(new Gunzip(opts), buffer2);
    };
    exports$1.inflateRaw = function(buffer2, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      return zlibBuffer(new InflateRaw(opts), buffer2, callback);
    };
    exports$1.inflateRawSync = function(buffer2, opts) {
      return zlibBufferSync(new InflateRaw(opts), buffer2);
    };
    function zlibBuffer(engine, buffer2, callback) {
      var buffers = [];
      var nread = 0;
      engine.on("error", onError);
      engine.on("end", onEnd);
      engine.end(buffer2);
      flow();
      function flow() {
        var chunk;
        while (null !== (chunk = engine.read())) {
          buffers.push(chunk);
          nread += chunk.length;
        }
        engine.once("readable", flow);
      }
      function onError(err2) {
        engine.removeListener("end", onEnd);
        engine.removeListener("readable", flow);
        callback(err2);
      }
      function onEnd() {
        var buf;
        var err2 = null;
        if (nread >= kMaxLength2) {
          err2 = new RangeError(kRangeErrorMessage);
        } else {
          buf = Buffer3.concat(buffers, nread);
        }
        buffers = [];
        engine.close();
        callback(err2, buf);
      }
    }
    function zlibBufferSync(engine, buffer2) {
      if (typeof buffer2 === "string") buffer2 = Buffer3.from(buffer2);
      if (!Buffer3.isBuffer(buffer2)) throw new TypeError("Not a string or buffer");
      var flushFlag = engine._finishFlushFlag;
      return engine._processChunk(buffer2, flushFlag);
    }
    function Deflate(opts) {
      if (!(this instanceof Deflate)) return new Deflate(opts);
      Zlib.call(this, opts, binding$1.DEFLATE);
    }
    function Inflate(opts) {
      if (!(this instanceof Inflate)) return new Inflate(opts);
      Zlib.call(this, opts, binding$1.INFLATE);
    }
    function Gzip(opts) {
      if (!(this instanceof Gzip)) return new Gzip(opts);
      Zlib.call(this, opts, binding$1.GZIP);
    }
    function Gunzip(opts) {
      if (!(this instanceof Gunzip)) return new Gunzip(opts);
      Zlib.call(this, opts, binding$1.GUNZIP);
    }
    function DeflateRaw(opts) {
      if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
      Zlib.call(this, opts, binding$1.DEFLATERAW);
    }
    function InflateRaw(opts) {
      if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
      Zlib.call(this, opts, binding$1.INFLATERAW);
    }
    function Unzip(opts) {
      if (!(this instanceof Unzip)) return new Unzip(opts);
      Zlib.call(this, opts, binding$1.UNZIP);
    }
    function isValidFlushFlag(flag) {
      return flag === binding$1.Z_NO_FLUSH || flag === binding$1.Z_PARTIAL_FLUSH || flag === binding$1.Z_SYNC_FLUSH || flag === binding$1.Z_FULL_FLUSH || flag === binding$1.Z_FINISH || flag === binding$1.Z_BLOCK;
    }
    function Zlib(opts, mode) {
      var _this = this;
      this._opts = opts = opts || {};
      this._chunkSize = opts.chunkSize || exports$1.Z_DEFAULT_CHUNK;
      Transform2.call(this, opts);
      if (opts.flush && !isValidFlushFlag(opts.flush)) {
        throw new Error("Invalid flush flag: " + opts.flush);
      }
      if (opts.finishFlush && !isValidFlushFlag(opts.finishFlush)) {
        throw new Error("Invalid flush flag: " + opts.finishFlush);
      }
      this._flushFlag = opts.flush || binding$1.Z_NO_FLUSH;
      this._finishFlushFlag = typeof opts.finishFlush !== "undefined" ? opts.finishFlush : binding$1.Z_FINISH;
      if (opts.chunkSize) {
        if (opts.chunkSize < exports$1.Z_MIN_CHUNK || opts.chunkSize > exports$1.Z_MAX_CHUNK) {
          throw new Error("Invalid chunk size: " + opts.chunkSize);
        }
      }
      if (opts.windowBits) {
        if (opts.windowBits < exports$1.Z_MIN_WINDOWBITS || opts.windowBits > exports$1.Z_MAX_WINDOWBITS) {
          throw new Error("Invalid windowBits: " + opts.windowBits);
        }
      }
      if (opts.level) {
        if (opts.level < exports$1.Z_MIN_LEVEL || opts.level > exports$1.Z_MAX_LEVEL) {
          throw new Error("Invalid compression level: " + opts.level);
        }
      }
      if (opts.memLevel) {
        if (opts.memLevel < exports$1.Z_MIN_MEMLEVEL || opts.memLevel > exports$1.Z_MAX_MEMLEVEL) {
          throw new Error("Invalid memLevel: " + opts.memLevel);
        }
      }
      if (opts.strategy) {
        if (opts.strategy != exports$1.Z_FILTERED && opts.strategy != exports$1.Z_HUFFMAN_ONLY && opts.strategy != exports$1.Z_RLE && opts.strategy != exports$1.Z_FIXED && opts.strategy != exports$1.Z_DEFAULT_STRATEGY) {
          throw new Error("Invalid strategy: " + opts.strategy);
        }
      }
      if (opts.dictionary) {
        if (!Buffer3.isBuffer(opts.dictionary)) {
          throw new Error("Invalid dictionary: it should be a Buffer instance");
        }
      }
      this._handle = new binding$1.Zlib(mode);
      var self2 = this;
      this._hadError = false;
      this._handle.onerror = function(message, errno) {
        _close(self2);
        self2._hadError = true;
        var error = new Error(message);
        error.errno = errno;
        error.code = exports$1.codes[errno];
        self2.emit("error", error);
      };
      var level = exports$1.Z_DEFAULT_COMPRESSION;
      if (typeof opts.level === "number") level = opts.level;
      var strategy = exports$1.Z_DEFAULT_STRATEGY;
      if (typeof opts.strategy === "number") strategy = opts.strategy;
      this._handle.init(opts.windowBits || exports$1.Z_DEFAULT_WINDOWBITS, level, opts.memLevel || exports$1.Z_DEFAULT_MEMLEVEL, strategy, opts.dictionary);
      this._buffer = Buffer3.allocUnsafe(this._chunkSize);
      this._offset = 0;
      this._level = level;
      this._strategy = strategy;
      this.once("end", this.close);
      Object.defineProperty(this, "_closed", {
        get: function() {
          return !_this._handle;
        },
        configurable: true,
        enumerable: true
      });
    }
    util$1.inherits(Zlib, Transform2);
    Zlib.prototype.params = function(level, strategy, callback) {
      if (level < exports$1.Z_MIN_LEVEL || level > exports$1.Z_MAX_LEVEL) {
        throw new RangeError("Invalid compression level: " + level);
      }
      if (strategy != exports$1.Z_FILTERED && strategy != exports$1.Z_HUFFMAN_ONLY && strategy != exports$1.Z_RLE && strategy != exports$1.Z_FIXED && strategy != exports$1.Z_DEFAULT_STRATEGY) {
        throw new TypeError("Invalid strategy: " + strategy);
      }
      if (this._level !== level || this._strategy !== strategy) {
        var self2 = this;
        this.flush(binding$1.Z_SYNC_FLUSH, function() {
          assert2(self2._handle, "zlib binding closed");
          self2._handle.params(level, strategy);
          if (!self2._hadError) {
            self2._level = level;
            self2._strategy = strategy;
            if (callback) callback();
          }
        });
      } else {
        process$1.nextTick(callback);
      }
    };
    Zlib.prototype.reset = function() {
      assert2(this._handle, "zlib binding closed");
      return this._handle.reset();
    };
    Zlib.prototype._flush = function(callback) {
      this._transform(Buffer3.alloc(0), "", callback);
    };
    Zlib.prototype.flush = function(kind, callback) {
      var _this2 = this;
      var ws = this._writableState;
      if (typeof kind === "function" || kind === void 0 && !callback) {
        callback = kind;
        kind = binding$1.Z_FULL_FLUSH;
      }
      if (ws.ended) {
        if (callback) process$1.nextTick(callback);
      } else if (ws.ending) {
        if (callback) this.once("end", callback);
      } else if (ws.needDrain) {
        if (callback) {
          this.once("drain", function() {
            return _this2.flush(kind, callback);
          });
        }
      } else {
        this._flushFlag = kind;
        this.write(Buffer3.alloc(0), "", callback);
      }
    };
    Zlib.prototype.close = function(callback) {
      _close(this, callback);
      process$1.nextTick(emitCloseNT, this);
    };
    function _close(engine, callback) {
      if (callback) process$1.nextTick(callback);
      if (!engine._handle) return;
      engine._handle.close();
      engine._handle = null;
    }
    function emitCloseNT(self2) {
      self2.emit("close");
    }
    Zlib.prototype._transform = function(chunk, encoding, cb) {
      var flushFlag;
      var ws = this._writableState;
      var ending = ws.ending || ws.ended;
      var last = ending && (!chunk || ws.length === chunk.length);
      if (chunk !== null && !Buffer3.isBuffer(chunk)) return cb(new Error("invalid input"));
      if (!this._handle) return cb(new Error("zlib binding closed"));
      if (last) flushFlag = this._finishFlushFlag;
      else {
        flushFlag = this._flushFlag;
        if (chunk.length >= ws.length) {
          this._flushFlag = this._opts.flush || binding$1.Z_NO_FLUSH;
        }
      }
      this._processChunk(chunk, flushFlag, cb);
    };
    Zlib.prototype._processChunk = function(chunk, flushFlag, cb) {
      var availInBefore = chunk && chunk.length;
      var availOutBefore = this._chunkSize - this._offset;
      var inOff = 0;
      var self2 = this;
      var async = typeof cb === "function";
      if (!async) {
        var buffers = [];
        var nread = 0;
        var error;
        this.on("error", function(er) {
          error = er;
        });
        assert2(this._handle, "zlib binding closed");
        do {
          var res = this._handle.writeSync(
            flushFlag,
            chunk,
            // in
            inOff,
            // in_off
            availInBefore,
            // in_len
            this._buffer,
            // out
            this._offset,
            //out_off
            availOutBefore
          );
        } while (!this._hadError && callback(res[0], res[1]));
        if (this._hadError) {
          throw error;
        }
        if (nread >= kMaxLength2) {
          _close(this);
          throw new RangeError(kRangeErrorMessage);
        }
        var buf = Buffer3.concat(buffers, nread);
        _close(this);
        return buf;
      }
      assert2(this._handle, "zlib binding closed");
      var req = this._handle.write(
        flushFlag,
        chunk,
        // in
        inOff,
        // in_off
        availInBefore,
        // in_len
        this._buffer,
        // out
        this._offset,
        //out_off
        availOutBefore
      );
      req.buffer = chunk;
      req.callback = callback;
      function callback(availInAfter, availOutAfter) {
        if (this) {
          this.buffer = null;
          this.callback = null;
        }
        if (self2._hadError) return;
        var have = availOutBefore - availOutAfter;
        assert2(have >= 0, "have should not go down");
        if (have > 0) {
          var out = self2._buffer.slice(self2._offset, self2._offset + have);
          self2._offset += have;
          if (async) {
            self2.push(out);
          } else {
            buffers.push(out);
            nread += out.length;
          }
        }
        if (availOutAfter === 0 || self2._offset >= self2._chunkSize) {
          availOutBefore = self2._chunkSize;
          self2._offset = 0;
          self2._buffer = Buffer3.allocUnsafe(self2._chunkSize);
        }
        if (availOutAfter === 0) {
          inOff += availInBefore - availInAfter;
          availInBefore = availInAfter;
          if (!async) return true;
          var newReq = self2._handle.write(flushFlag, chunk, inOff, availInBefore, self2._buffer, self2._offset, self2._chunkSize);
          newReq.callback = callback;
          newReq.buffer = chunk;
          return;
        }
        if (!async) return false;
        cb();
      }
    };
    util$1.inherits(Deflate, Zlib);
    util$1.inherits(Inflate, Zlib);
    util$1.inherits(Gzip, Zlib);
    util$1.inherits(Gunzip, Zlib);
    util$1.inherits(DeflateRaw, Zlib);
    util$1.inherits(InflateRaw, Zlib);
    util$1.inherits(Unzip, Zlib);
  })(lib);
  (function(exports$1) {
    var fs = require$$0$1, stream = streamBrowserify, zlib = lib, HEADER = new Buffer2("89504e470d0a1a0a", "hex");
    function ImageData(width, height, channels, data, trailer) {
      this.width = width;
      this.height = height;
      this.channels = channels;
      this.data = data;
      this.trailer = trailer;
    }
    ImageData.prototype.getPixel = function(x, y) {
      x = x | 0;
      y = y | 0;
      if (x < 0 || y < 0 || x >= this.width || y >= this.height)
        return 0;
      var index = (y * this.width + x) * this.channels, r, g2, b, a;
      switch (this.channels) {
        case 1:
          r = g2 = b = this.data[index];
          a = 255;
          break;
        case 2:
          r = g2 = b = this.data[index];
          a = this.data[index + 1];
          break;
        case 3:
          r = this.data[index];
          g2 = this.data[index + 1];
          b = this.data[index + 2];
          a = 255;
          break;
        case 4:
          r = this.data[index];
          g2 = this.data[index + 1];
          b = this.data[index + 2];
          a = this.data[index + 3];
          break;
      }
      return (r << 24 | g2 << 16 | b << 8 | a) >>> 0;
    };
    function paeth(a, b, c) {
      var p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      if (pa <= pb && pa <= pc)
        return a;
      if (pb <= pc)
        return b;
      return c;
    }
    exports$1.parseStream = function(stream2, callback) {
      var inflate2 = zlib.createInflate(), state2 = 0, off = 0, buf = new Buffer2(13), waiting = 2, b = -1, p = 0, pngPaletteEntries = 0, pngAlphaEntries = 0, chunkLength, pngWidth, pngHeight, pngBitDepth, pngDepthMult, pngColorType, pngPixels, pngSamplesPerPixel, pngBytesPerPixel, pngBytesPerScanline, pngSamples, currentScanline, priorScanline, scanlineFilter, pngTrailer, pngPalette, pngAlpha, idChannels;
      function error(err2) {
        if (stream2.destroy)
          stream2.destroy();
        if (inflate2.destroy)
          inflate2.destroy();
        return callback(err2);
      }
      function end() {
        if (!--waiting)
          return callback(
            void 0,
            new ImageData(pngWidth, pngHeight, idChannels, pngPixels, pngTrailer)
          );
      }
      stream2.on("error", error);
      inflate2.on("error", error);
      stream2.on("end", function() {
        stream2.destroy();
        if (!pngPixels)
          return error(new Error("Corrupt PNG?"));
        if (!pngTrailer)
          return error(new Error("Corrupt PNG?"));
        return end();
      });
      inflate2.on("end", function() {
        if (inflate2.destroy)
          inflate2.destroy();
        if (p !== pngPixels.length)
          return error(new Error("Too little pixel data! (Corrupt PNG?)"));
        return end();
      });
      stream2.on("data", function(data) {
        if (!stream2.readable)
          return;
        var len2 = data.length, i2 = 0, tmp, j;
        while (i2 !== len2)
          switch (state2) {
            case 0:
              if (data[i2++] !== HEADER[off++])
                return error(new Error("Invalid PNG header."));
              if (off === HEADER.length) {
                state2 = 1;
                off = 0;
              }
              break;
            case 1:
              if (len2 - i2 < 8 - off) {
                data.copy(buf, off, i2);
                off += len2 - i2;
                i2 = len2;
              } else {
                data.copy(buf, off, i2, i2 + 8 - off);
                i2 += 8 - off;
                off = 0;
                chunkLength = buf.readUInt32BE(0);
                switch (buf.toString("ascii", 4, 8)) {
                  case "IHDR":
                    state2 = 2;
                    break;
                  case "PLTE":
                    if (pngColorType !== 3)
                      state2 = 7;
                    else {
                      if (chunkLength % 3 !== 0)
                        return error(new Error("Invalid PLTE size."));
                      pngPaletteEntries = chunkLength / 3;
                      pngPalette = new Buffer2(chunkLength);
                      state2 = 3;
                    }
                    break;
                  case "tRNS":
                    if (pngColorType !== 3)
                      return error(new Error("tRNS for non-paletted images not yet supported."));
                    idChannels++;
                    pngAlphaEntries = chunkLength;
                    pngAlpha = new Buffer2(chunkLength);
                    state2 = 4;
                    break;
                  case "IDAT":
                    if (!pngPixels)
                      pngPixels = new Buffer2(pngWidth * pngHeight * idChannels);
                    state2 = 5;
                    break;
                  case "IEND":
                    state2 = 6;
                    break;
                  default:
                    state2 = 7;
                    break;
                }
              }
              break;
            case 2:
              if (chunkLength !== 13)
                return error(new Error("Invalid IHDR chunk."));
              else if (len2 - i2 < chunkLength - off) {
                data.copy(buf, off, i2);
                off += len2 - i2;
                i2 = len2;
              } else {
                data.copy(buf, off, i2, i2 + chunkLength - off);
                if (buf.readUInt8(10) !== 0)
                  return error(new Error("Unsupported compression method."));
                if (buf.readUInt8(11) !== 0)
                  return error(new Error("Unsupported filter method."));
                if (buf.readUInt8(12) !== 0)
                  return error(new Error("Unsupported interlace method."));
                i2 += chunkLength - off;
                state2 = 8;
                off = 0;
                pngWidth = buf.readUInt32BE(0);
                pngHeight = buf.readUInt32BE(4);
                pngBitDepth = buf.readUInt8(8);
                pngDepthMult = 255 / ((1 << pngBitDepth) - 1);
                pngColorType = buf.readUInt8(9);
                switch (pngColorType) {
                  case 0:
                    pngSamplesPerPixel = 1;
                    pngBytesPerPixel = Math.ceil(pngBitDepth * 0.125);
                    idChannels = 1;
                    break;
                  case 2:
                    pngSamplesPerPixel = 3;
                    pngBytesPerPixel = Math.ceil(pngBitDepth * 0.375);
                    idChannels = 3;
                    break;
                  case 3:
                    pngSamplesPerPixel = 1;
                    pngBytesPerPixel = 1;
                    idChannels = 3;
                    break;
                  case 4:
                    pngSamplesPerPixel = 2;
                    pngBytesPerPixel = Math.ceil(pngBitDepth * 0.25);
                    idChannels = 2;
                    break;
                  case 6:
                    pngSamplesPerPixel = 4;
                    pngBytesPerPixel = Math.ceil(pngBitDepth * 0.5);
                    idChannels = 4;
                    break;
                  default:
                    return error(
                      new Error("Unsupported color type: " + pngColorType)
                    );
                }
                pngBytesPerScanline = Math.ceil(
                  pngWidth * pngBitDepth * pngSamplesPerPixel / 8
                );
                pngSamples = new Buffer2(pngSamplesPerPixel);
                currentScanline = new Buffer2(pngBytesPerScanline);
                priorScanline = new Buffer2(pngBytesPerScanline);
                currentScanline.fill(0);
              }
              break;
            case 3:
              if (len2 - i2 < chunkLength - off) {
                data.copy(pngPalette, off, i2);
                off += len2 - i2;
                i2 = len2;
              } else {
                data.copy(pngPalette, off, i2, i2 + chunkLength - off);
                i2 += chunkLength - off;
                state2 = 8;
                off = 0;
                idChannels = 1;
                for (j = pngPaletteEntries; j--; )
                  if (pngPalette[j * 3 + 0] !== pngPalette[j * 3 + 1] || pngPalette[j * 3 + 0] !== pngPalette[j * 3 + 2]) {
                    idChannels = 3;
                    break;
                  }
              }
              break;
            case 4:
              if (len2 - i2 < chunkLength - off) {
                data.copy(pngAlpha, off, i2);
                off += len2 - i2;
                i2 = len2;
              } else {
                data.copy(pngAlpha, off, i2, i2 + chunkLength - off);
                i2 += chunkLength - off;
                state2 = 8;
                off = 0;
              }
              break;
            case 5:
              if (len2 - i2 < chunkLength - off) {
                inflate2.write(data.slice(i2));
                off += len2 - i2;
                i2 = len2;
              } else {
                inflate2.write(data.slice(i2, i2 + chunkLength - off));
                i2 += chunkLength - off;
                state2 = 8;
                off = 0;
              }
              break;
            case 6:
              if (chunkLength !== 0)
                return error(new Error("Invalid IEND chunk."));
              else if (len2 - i2 < 4 - off) {
                off += len2 - i2;
                i2 = len2;
              } else {
                pngTrailer = new Buffer2(0);
                i2 += 4 - off;
                state2 = 9;
                off = 0;
                inflate2.end();
              }
              break;
            case 7:
              if (len2 - i2 < chunkLength - off) {
                off += len2 - i2;
                i2 = len2;
              } else {
                i2 += chunkLength - off;
                state2 = 8;
                off = 0;
              }
              break;
            case 8:
              if (len2 - i2 < 4 - off) {
                off += len2 - i2;
                i2 = len2;
              } else {
                i2 += 4 - off;
                state2 = 1;
                off = 0;
              }
              break;
            case 9:
              tmp = new Buffer2(off + len2 - i2);
              pngTrailer.copy(tmp);
              data.copy(tmp, off, i2, len2);
              pngTrailer = tmp;
              off += len2 - i2;
              i2 = len2;
              break;
          }
      });
      inflate2.on("data", function(data) {
        if (!inflate2.readable)
          return;
        var len2 = data.length, i2, tmp, x, j, k;
        for (i2 = 0; i2 !== len2; ++i2) {
          if (b === -1) {
            scanlineFilter = data[i2];
            tmp = currentScanline;
            currentScanline = priorScanline;
            priorScanline = tmp;
          } else
            switch (scanlineFilter) {
              case 0:
                currentScanline[b] = data[i2];
                break;
              case 1:
                currentScanline[b] = b < pngBytesPerPixel ? data[i2] : data[i2] + currentScanline[b - pngBytesPerPixel] & 255;
                break;
              case 2:
                currentScanline[b] = data[i2] + priorScanline[b] & 255;
                break;
              case 3:
                currentScanline[b] = data[i2] + ((b < pngBytesPerPixel ? priorScanline[b] : currentScanline[b - pngBytesPerPixel] + priorScanline[b]) >>> 1) & 255;
                break;
              case 4:
                currentScanline[b] = data[i2] + (b < pngBytesPerPixel ? priorScanline[b] : paeth(
                  currentScanline[b - pngBytesPerPixel],
                  priorScanline[b],
                  priorScanline[b - pngBytesPerPixel]
                )) & 255;
                break;
              default:
                return error(
                  new Error("Unsupported scanline filter: " + scanlineFilter)
                );
            }
          if (++b === pngBytesPerScanline) {
            if (p === pngPixels.length)
              return error(new Error("Too much pixel data! (Corrupt PNG?)"));
            for (j = 0, x = 0; x !== pngWidth; ++x) {
              for (k = 0; k !== pngSamplesPerPixel; ++j, ++k)
                switch (pngBitDepth) {
                  case 1:
                    pngSamples[k] = currentScanline[j >>> 3] >> 7 - (j & 7) & 1;
                    break;
                  case 2:
                    pngSamples[k] = currentScanline[j >>> 2] >> (3 - (j & 3) << 1) & 3;
                    break;
                  case 4:
                    pngSamples[k] = currentScanline[j >>> 1] >> (1 - (j & 1) << 2) & 15;
                    break;
                  case 8:
                    pngSamples[k] = currentScanline[j];
                    break;
                  default:
                    return error(new Error("Unsupported bit depth: " + pngBitDepth));
                }
              switch (pngColorType) {
                case 0:
                  pngPixels[p++] = pngSamples[0] * pngDepthMult;
                  break;
                case 2:
                  pngPixels[p++] = pngSamples[0] * pngDepthMult;
                  pngPixels[p++] = pngSamples[1] * pngDepthMult;
                  pngPixels[p++] = pngSamples[2] * pngDepthMult;
                  break;
                case 3:
                  if (pngSamples[0] >= pngPaletteEntries)
                    return error(new Error("Invalid palette index."));
                  switch (idChannels) {
                    case 1:
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3];
                      break;
                    case 2:
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3];
                      pngPixels[p++] = pngSamples[0] < pngAlphaEntries ? pngAlpha[pngSamples[0]] : 255;
                      break;
                    case 3:
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 0];
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 1];
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 2];
                      break;
                    case 4:
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 0];
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 1];
                      pngPixels[p++] = pngPalette[pngSamples[0] * 3 + 2];
                      pngPixels[p++] = pngSamples[0] < pngAlphaEntries ? pngAlpha[pngSamples[0]] : 255;
                      break;
                  }
                  break;
                case 4:
                  pngPixels[p++] = pngSamples[0] * pngDepthMult;
                  pngPixels[p++] = pngSamples[1] * pngDepthMult;
                  break;
                case 6:
                  pngPixels[p++] = pngSamples[0] * pngDepthMult;
                  pngPixels[p++] = pngSamples[1] * pngDepthMult;
                  pngPixels[p++] = pngSamples[2] * pngDepthMult;
                  pngPixels[p++] = pngSamples[3] * pngDepthMult;
                  break;
              }
            }
            b = -1;
          }
        }
      });
    };
    exports$1.parseFile = function(pathname, callback) {
      return exports$1.parseStream(fs.createReadStream(pathname), callback);
    };
    exports$1.parseBuffer = function(buf, callback) {
      var s = new stream.Stream();
      s.readable = true;
      s.destroy = function() {
        s.readable = false;
      };
      exports$1.parseStream(s, callback);
      s.emit("data", buf);
      if (s.readable)
        s.emit("end");
    };
    exports$1.parse = exports$1.parseBuffer;
  })(pngparse$1);
  const pngparse = /* @__PURE__ */ getDefaultExportFromCjs$1(pngparse$1);
  function decompressPng$2(data, callback) {
    var buffer2 = new Buffer2(data, "base64");
    pngparse.parse(buffer2, function(err2, data2) {
      if (err2) {
        console.warn("Cannot process PNG encoded message ");
      } else {
        var jsonData = data2.data.toString();
        callback(JSON.parse(jsonData));
      }
    });
  }
  const decompressPng$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: decompressPng$2
  }, Symbol.toStringTag, { value: "Module" }));
  function decompressPng(data, callback) {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Failed to create Canvas context!");
      }
      canvas.width = image.width;
      canvas.height = image.height;
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0);
      var imageData = context.getImageData(0, 0, image.width, image.height).data;
      var jsonData = "";
      for (var i2 = 0; i2 < imageData.length; i2 += 4) {
        jsonData += String.fromCharCode(
          imageData[i2],
          imageData[i2 + 1],
          imageData[i2 + 2]
        );
      }
      callback(JSON.parse(jsonData));
    };
    image.src = "data:image/png;base64," + data;
  }
  const decompressPng$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: decompressPng
  }, Symbol.toStringTag, { value: "Module" }));
  exports2.Action = Action;
  exports2.ActionClient = ActionClient;
  exports2.ActionListener = ActionListener;
  exports2.Goal = Goal;
  exports2.Param = Param;
  exports2.Pose = Pose;
  exports2.Quaternion = Quaternion;
  exports2.REVISION = REVISION;
  exports2.ROS2TFClient = ROS2TFClient;
  exports2.Ros = Ros;
  exports2.Service = Service;
  exports2.SimpleActionServer = SimpleActionServer;
  exports2.TFClient = TFClient;
  exports2.Topic = Topic;
  exports2.Transform = Transform;
  exports2.URDF_BOX = URDF_BOX;
  exports2.URDF_CYLINDER = URDF_CYLINDER;
  exports2.URDF_MESH = URDF_MESH;
  exports2.URDF_SPHERE = URDF_SPHERE;
  exports2.UrdfBox = UrdfBox;
  exports2.UrdfColor = UrdfColor;
  exports2.UrdfCylinder = UrdfCylinder;
  exports2.UrdfLink = UrdfLink;
  exports2.UrdfMaterial = UrdfMaterial;
  exports2.UrdfMesh = UrdfMesh;
  exports2.UrdfModel = UrdfModel;
  exports2.UrdfSphere = UrdfSphere;
  exports2.UrdfVisual = UrdfVisual;
  exports2.Vector3 = Vector3;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
