// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/InferenceResult.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/inference_result.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/inference_result__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_InferenceResult_id_n
{
public:
  explicit Init_InferenceResult_id_n(::servo_interfaces::msg::InferenceResult & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::InferenceResult id_n(::servo_interfaces::msg::InferenceResult::_id_n_type arg)
  {
    msg_.id_n = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

class Init_InferenceResult_right
{
public:
  explicit Init_InferenceResult_right(::servo_interfaces::msg::InferenceResult & msg)
  : msg_(msg)
  {}
  Init_InferenceResult_id_n right(::servo_interfaces::msg::InferenceResult::_right_type arg)
  {
    msg_.right = std::move(arg);
    return Init_InferenceResult_id_n(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

class Init_InferenceResult_bottom
{
public:
  explicit Init_InferenceResult_bottom(::servo_interfaces::msg::InferenceResult & msg)
  : msg_(msg)
  {}
  Init_InferenceResult_right bottom(::servo_interfaces::msg::InferenceResult::_bottom_type arg)
  {
    msg_.bottom = std::move(arg);
    return Init_InferenceResult_right(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

class Init_InferenceResult_left
{
public:
  explicit Init_InferenceResult_left(::servo_interfaces::msg::InferenceResult & msg)
  : msg_(msg)
  {}
  Init_InferenceResult_bottom left(::servo_interfaces::msg::InferenceResult::_left_type arg)
  {
    msg_.left = std::move(arg);
    return Init_InferenceResult_bottom(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

class Init_InferenceResult_top
{
public:
  explicit Init_InferenceResult_top(::servo_interfaces::msg::InferenceResult & msg)
  : msg_(msg)
  {}
  Init_InferenceResult_left top(::servo_interfaces::msg::InferenceResult::_top_type arg)
  {
    msg_.top = std::move(arg);
    return Init_InferenceResult_left(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

class Init_InferenceResult_class_name
{
public:
  Init_InferenceResult_class_name()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_InferenceResult_top class_name(::servo_interfaces::msg::InferenceResult::_class_name_type arg)
  {
    msg_.class_name = std::move(arg);
    return Init_InferenceResult_top(msg_);
  }

private:
  ::servo_interfaces::msg::InferenceResult msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::InferenceResult>()
{
  return servo_interfaces::msg::builder::Init_InferenceResult_class_name();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__BUILDER_HPP_
