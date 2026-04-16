#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};




// Corresponds to servo_interfaces__srv__MotorAngle_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct MotorAngle_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub motor_num: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub target_position: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub kp: f64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub ki: f64,


    // This member is not documented.
    #[allow(missing_docs)]
    pub kd: f64,

}



impl Default for MotorAngle_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::MotorAngle_Request::default())
  }
}

impl rosidl_runtime_rs::Message for MotorAngle_Request {
  type RmwMsg = super::srv::rmw::MotorAngle_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        motor_num: msg.motor_num,
        target_position: msg.target_position,
        kp: msg.kp,
        ki: msg.ki,
        kd: msg.kd,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      motor_num: msg.motor_num,
      target_position: msg.target_position,
      kp: msg.kp,
      ki: msg.ki,
      kd: msg.kd,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      motor_num: msg.motor_num,
      target_position: msg.target_position,
      kp: msg.kp,
      ki: msg.ki,
      kd: msg.kd,
    }
  }
}


// Corresponds to servo_interfaces__srv__MotorAngle_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct MotorAngle_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub is_set: bool,

}



impl Default for MotorAngle_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::MotorAngle_Response::default())
  }
}

impl rosidl_runtime_rs::Message for MotorAngle_Response {
  type RmwMsg = super::srv::rmw::MotorAngle_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        is_set: msg.is_set,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      is_set: msg.is_set,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      is_set: msg.is_set,
    }
  }
}






#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__servo_interfaces__srv__MotorAngle() -> *const std::ffi::c_void;
}

// Corresponds to servo_interfaces__srv__MotorAngle
#[allow(missing_docs, non_camel_case_types)]
pub struct MotorAngle;

impl rosidl_runtime_rs::Service for MotorAngle {
    type Request = MotorAngle_Request;
    type Response = MotorAngle_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__servo_interfaces__srv__MotorAngle() }
    }
}


