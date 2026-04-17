// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/head_move.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/head_move__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_HeadMove_tilt
{
public:
  explicit Init_HeadMove_tilt(::servo_interfaces::msg::HeadMove & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::HeadMove tilt(::servo_interfaces::msg::HeadMove::_tilt_type arg)
  {
    msg_.tilt = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::HeadMove msg_;
};

class Init_HeadMove_pan
{
public:
  Init_HeadMove_pan()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_HeadMove_tilt pan(::servo_interfaces::msg::HeadMove::_pan_type arg)
  {
    msg_.pan = std::move(arg);
    return Init_HeadMove_tilt(msg_);
  }

private:
  ::servo_interfaces::msg::HeadMove msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::HeadMove>()
{
  return servo_interfaces::msg::builder::Init_HeadMove_pan();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__BUILDER_HPP_
