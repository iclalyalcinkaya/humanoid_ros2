// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/goal_position.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/goal_position__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_GoalPosition_h
{
public:
  explicit Init_GoalPosition_h(::servo_interfaces::msg::GoalPosition & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::GoalPosition h(::servo_interfaces::msg::GoalPosition::_h_type arg)
  {
    msg_.h = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::GoalPosition msg_;
};

class Init_GoalPosition_w
{
public:
  explicit Init_GoalPosition_w(::servo_interfaces::msg::GoalPosition & msg)
  : msg_(msg)
  {}
  Init_GoalPosition_h w(::servo_interfaces::msg::GoalPosition::_w_type arg)
  {
    msg_.w = std::move(arg);
    return Init_GoalPosition_h(msg_);
  }

private:
  ::servo_interfaces::msg::GoalPosition msg_;
};

class Init_GoalPosition_y
{
public:
  explicit Init_GoalPosition_y(::servo_interfaces::msg::GoalPosition & msg)
  : msg_(msg)
  {}
  Init_GoalPosition_w y(::servo_interfaces::msg::GoalPosition::_y_type arg)
  {
    msg_.y = std::move(arg);
    return Init_GoalPosition_w(msg_);
  }

private:
  ::servo_interfaces::msg::GoalPosition msg_;
};

class Init_GoalPosition_x
{
public:
  Init_GoalPosition_x()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_GoalPosition_y x(::servo_interfaces::msg::GoalPosition::_x_type arg)
  {
    msg_.x = std::move(arg);
    return Init_GoalPosition_y(msg_);
  }

private:
  ::servo_interfaces::msg::GoalPosition msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::GoalPosition>()
{
  return servo_interfaces::msg::builder::Init_GoalPosition_x();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__BUILDER_HPP_
