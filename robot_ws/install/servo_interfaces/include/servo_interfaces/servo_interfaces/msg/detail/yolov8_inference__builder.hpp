// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/Yolov8Inference.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/yolov8_inference.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/yolov8_inference__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_Yolov8Inference_yolov8_inference
{
public:
  explicit Init_Yolov8Inference_yolov8_inference(::servo_interfaces::msg::Yolov8Inference & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::Yolov8Inference yolov8_inference(::servo_interfaces::msg::Yolov8Inference::_yolov8_inference_type arg)
  {
    msg_.yolov8_inference = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::Yolov8Inference msg_;
};

class Init_Yolov8Inference_header
{
public:
  Init_Yolov8Inference_header()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_Yolov8Inference_yolov8_inference header(::servo_interfaces::msg::Yolov8Inference::_header_type arg)
  {
    msg_.header = std::move(arg);
    return Init_Yolov8Inference_yolov8_inference(msg_);
  }

private:
  ::servo_interfaces::msg::Yolov8Inference msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::Yolov8Inference>()
{
  return servo_interfaces::msg::builder::Init_Yolov8Inference_header();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__BUILDER_HPP_
