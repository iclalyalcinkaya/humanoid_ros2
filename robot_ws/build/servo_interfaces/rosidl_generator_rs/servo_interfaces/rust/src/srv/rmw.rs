#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};



#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__srv__MotorAngle_Request() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__srv__MotorAngle_Request__init(msg: *mut MotorAngle_Request) -> bool;
    fn servo_interfaces__srv__MotorAngle_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Request>, size: usize) -> bool;
    fn servo_interfaces__srv__MotorAngle_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Request>);
    fn servo_interfaces__srv__MotorAngle_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<MotorAngle_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Request>) -> bool;
}

// Corresponds to servo_interfaces__srv__MotorAngle_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
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
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__srv__MotorAngle_Request__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__srv__MotorAngle_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for MotorAngle_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for MotorAngle_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for MotorAngle_Request where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/srv/MotorAngle_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__srv__MotorAngle_Request() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__srv__MotorAngle_Response() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__srv__MotorAngle_Response__init(msg: *mut MotorAngle_Response) -> bool;
    fn servo_interfaces__srv__MotorAngle_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Response>, size: usize) -> bool;
    fn servo_interfaces__srv__MotorAngle_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Response>);
    fn servo_interfaces__srv__MotorAngle_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<MotorAngle_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<MotorAngle_Response>) -> bool;
}

// Corresponds to servo_interfaces__srv__MotorAngle_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct MotorAngle_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub is_set: bool,

}



impl Default for MotorAngle_Response {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__srv__MotorAngle_Response__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__srv__MotorAngle_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for MotorAngle_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__srv__MotorAngle_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for MotorAngle_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for MotorAngle_Response where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/srv/MotorAngle_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__srv__MotorAngle_Response() }
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


