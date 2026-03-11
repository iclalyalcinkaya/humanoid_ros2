// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_pwm.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_PWM__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_PWM__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/set_pwm__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_SetPwm_speed
{
public:
  explicit Init_SetPwm_speed(::servo_interfaces::msg::SetPwm & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::SetPwm speed(::servo_interfaces::msg::SetPwm::_speed_type arg)
  {
    msg_.speed = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::SetPwm msg_;
};

class Init_SetPwm_target_position
{
public:
  explicit Init_SetPwm_target_position(::servo_interfaces::msg::SetPwm & msg)
  : msg_(msg)
  {}
  Init_SetPwm_speed target_position(::servo_interfaces::msg::SetPwm::_target_position_type arg)
  {
    msg_.target_position = std::move(arg);
    return Init_SetPwm_speed(msg_);
  }

private:
  ::servo_interfaces::msg::SetPwm msg_;
};

class Init_SetPwm_motor_num
{
public:
  Init_SetPwm_motor_num()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_SetPwm_target_position motor_num(::servo_interfaces::msg::SetPwm::_motor_num_type arg)
  {
    msg_.motor_num = std::move(arg);
    return Init_SetPwm_target_position(msg_);
  }

private:
  ::servo_interfaces::msg::SetPwm msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::SetPwm>()
{
  return servo_interfaces::msg::builder::Init_SetPwm_motor_num();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_PWM__BUILDER_HPP_
