#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__SetPwm() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__SetPwm__init(msg: *mut SetPwm) -> bool;
    fn servo_interfaces__msg__SetPwm__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<SetPwm>, size: usize) -> bool;
    fn servo_interfaces__msg__SetPwm__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<SetPwm>);
    fn servo_interfaces__msg__SetPwm__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<SetPwm>, out_seq: *mut rosidl_runtime_rs::Sequence<SetPwm>) -> bool;
}

// Corresponds to servo_interfaces__msg__SetPwm
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
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
    pub client_id: rosidl_runtime_rs::String,

}



impl Default for SetPwm {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__SetPwm__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__SetPwm__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for SetPwm {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetPwm__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetPwm__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetPwm__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for SetPwm {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for SetPwm where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/SetPwm";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__SetPwm() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__SetMode() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__SetMode__init(msg: *mut SetMode) -> bool;
    fn servo_interfaces__msg__SetMode__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<SetMode>, size: usize) -> bool;
    fn servo_interfaces__msg__SetMode__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<SetMode>);
    fn servo_interfaces__msg__SetMode__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<SetMode>, out_seq: *mut rosidl_runtime_rs::Sequence<SetMode>) -> bool;
}

// Corresponds to servo_interfaces__msg__SetMode
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetMode {

    // This member is not documented.
    #[allow(missing_docs)]
    pub mode: i8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub client_id: rosidl_runtime_rs::String,

}



impl Default for SetMode {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__SetMode__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__SetMode__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for SetMode {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetMode__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetMode__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__SetMode__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for SetMode {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for SetMode where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/SetMode";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__SetMode() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__InferenceResult() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__InferenceResult__init(msg: *mut InferenceResult) -> bool;
    fn servo_interfaces__msg__InferenceResult__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<InferenceResult>, size: usize) -> bool;
    fn servo_interfaces__msg__InferenceResult__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<InferenceResult>);
    fn servo_interfaces__msg__InferenceResult__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<InferenceResult>, out_seq: *mut rosidl_runtime_rs::Sequence<InferenceResult>) -> bool;
}

// Corresponds to servo_interfaces__msg__InferenceResult
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct InferenceResult {

    // This member is not documented.
    #[allow(missing_docs)]
    pub class_name: rosidl_runtime_rs::String,


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
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__InferenceResult__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__InferenceResult__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for InferenceResult {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__InferenceResult__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__InferenceResult__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__InferenceResult__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for InferenceResult {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for InferenceResult where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/InferenceResult";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__InferenceResult() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__Yolov8Inference() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__Yolov8Inference__init(msg: *mut Yolov8Inference) -> bool;
    fn servo_interfaces__msg__Yolov8Inference__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<Yolov8Inference>, size: usize) -> bool;
    fn servo_interfaces__msg__Yolov8Inference__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<Yolov8Inference>);
    fn servo_interfaces__msg__Yolov8Inference__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<Yolov8Inference>, out_seq: *mut rosidl_runtime_rs::Sequence<Yolov8Inference>) -> bool;
}

// Corresponds to servo_interfaces__msg__Yolov8Inference
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct Yolov8Inference {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::rmw::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub yolov8_inference: rosidl_runtime_rs::Sequence<super::super::msg::rmw::InferenceResult>,

}



impl Default for Yolov8Inference {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__Yolov8Inference__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__Yolov8Inference__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for Yolov8Inference {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__Yolov8Inference__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__Yolov8Inference__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__Yolov8Inference__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for Yolov8Inference {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for Yolov8Inference where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/Yolov8Inference";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__Yolov8Inference() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__GoalPosition() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__GoalPosition__init(msg: *mut GoalPosition) -> bool;
    fn servo_interfaces__msg__GoalPosition__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<GoalPosition>, size: usize) -> bool;
    fn servo_interfaces__msg__GoalPosition__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<GoalPosition>);
    fn servo_interfaces__msg__GoalPosition__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<GoalPosition>, out_seq: *mut rosidl_runtime_rs::Sequence<GoalPosition>) -> bool;
}

// Corresponds to servo_interfaces__msg__GoalPosition
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct GoalPosition {

    // This member is not documented.
    #[allow(missing_docs)]
    pub x: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub y: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub w: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub h: u8,

}



impl Default for GoalPosition {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__GoalPosition__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__GoalPosition__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for GoalPosition {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__GoalPosition__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__GoalPosition__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__GoalPosition__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for GoalPosition {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for GoalPosition where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/GoalPosition";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__GoalPosition() }
  }
}


#[link(name = "servo_interfaces__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__HeadMove() -> *const std::ffi::c_void;
}

#[link(name = "servo_interfaces__rosidl_generator_c")]
extern "C" {
    fn servo_interfaces__msg__HeadMove__init(msg: *mut HeadMove) -> bool;
    fn servo_interfaces__msg__HeadMove__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<HeadMove>, size: usize) -> bool;
    fn servo_interfaces__msg__HeadMove__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<HeadMove>);
    fn servo_interfaces__msg__HeadMove__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<HeadMove>, out_seq: *mut rosidl_runtime_rs::Sequence<HeadMove>) -> bool;
}

// Corresponds to servo_interfaces__msg__HeadMove
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct HeadMove {

    // This member is not documented.
    #[allow(missing_docs)]
    pub pan: f32,


    // This member is not documented.
    #[allow(missing_docs)]
    pub tilt: f32,

}



impl Default for HeadMove {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !servo_interfaces__msg__HeadMove__init(&mut msg as *mut _) {
        panic!("Call to servo_interfaces__msg__HeadMove__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for HeadMove {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__HeadMove__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__HeadMove__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { servo_interfaces__msg__HeadMove__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for HeadMove {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for HeadMove where Self: Sized {
  const TYPE_NAME: &'static str = "servo_interfaces/msg/HeadMove";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__servo_interfaces__msg__HeadMove() }
  }
}


