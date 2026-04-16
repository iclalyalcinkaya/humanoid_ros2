#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};



// Corresponds to servo_interfaces__msg__SetPwm

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetPwm {
    /// PCA9685 channel number
    pub motor_num: u8,

    /// Taarget position of the servo motor (degrees)
    pub target_position: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub speed: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub client_id: std::string::String,

}



impl Default for SetPwm {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::SetPwm::default())
  }
}

impl rosidl_runtime_rs::Message for SetPwm {
  type RmwMsg = super::msg::rmw::SetPwm;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        motor_num: msg.motor_num,
        target_position: msg.target_position,
        speed: msg.speed,
        client_id: msg.client_id.as_str().into(),
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      motor_num: msg.motor_num,
      target_position: msg.target_position,
      speed: msg.speed,
        client_id: msg.client_id.as_str().into(),
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      motor_num: msg.motor_num,
      target_position: msg.target_position,
      speed: msg.speed,
      client_id: msg.client_id.to_string(),
    }
  }
}


// Corresponds to servo_interfaces__msg__SetMode

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetMode {

    // This member is not documented.
    #[allow(missing_docs)]
    pub mode: i8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub client_id: std::string::String,

}



impl Default for SetMode {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::SetMode::default())
  }
}

impl rosidl_runtime_rs::Message for SetMode {
  type RmwMsg = super::msg::rmw::SetMode;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        mode: msg.mode,
        client_id: msg.client_id.as_str().into(),
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      mode: msg.mode,
        client_id: msg.client_id.as_str().into(),
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      mode: msg.mode,
      client_id: msg.client_id.to_string(),
    }
  }
}


// Corresponds to servo_interfaces__msg__InferenceResult

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct InferenceResult {

    // This member is not documented.
    #[allow(missing_docs)]
    pub class_name: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub top: i64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub left: i64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub bottom: i64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub right: i64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub id_n: i64,

}



impl Default for InferenceResult {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::InferenceResult::default())
  }
}

impl rosidl_runtime_rs::Message for InferenceResult {
  type RmwMsg = super::msg::rmw::InferenceResult;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        class_name: msg.class_name.as_str().into(),
        top: msg.top,
        left: msg.left,
        bottom: msg.bottom,
        right: msg.right,
        id_n: msg.id_n,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        class_name: msg.class_name.as_str().into(),
      top: msg.top,
      left: msg.left,
      bottom: msg.bottom,
      right: msg.right,
      id_n: msg.id_n,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      class_name: msg.class_name.to_string(),
      top: msg.top,
      left: msg.left,
      bottom: msg.bottom,
      right: msg.right,
      id_n: msg.id_n,
    }
  }
}


// Corresponds to servo_interfaces__msg__Yolov8Inference

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct Yolov8Inference {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub yolov8_inference: Vec<super::msg::InferenceResult>,

}



impl Default for Yolov8Inference {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::Yolov8Inference::default())
  }
}

impl rosidl_runtime_rs::Message for Yolov8Inference {
  type RmwMsg = super::msg::rmw::Yolov8Inference;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Owned(msg.header)).into_owned(),
        yolov8_inference: msg.yolov8_inference
          .into_iter()
          .map(|elem| super::msg::InferenceResult::into_rmw_message(std::borrow::Cow::Owned(elem)).into_owned())
          .collect(),
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Borrowed(&msg.header)).into_owned(),
        yolov8_inference: msg.yolov8_inference
          .iter()
          .map(|elem| super::msg::InferenceResult::into_rmw_message(std::borrow::Cow::Borrowed(elem)).into_owned())
          .collect(),
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      header: std_msgs::msg::Header::from_rmw_message(msg.header),
      yolov8_inference: msg.yolov8_inference
          .into_iter()
          .map(super::msg::InferenceResult::from_rmw_message)
          .collect(),
    }
  }
}


