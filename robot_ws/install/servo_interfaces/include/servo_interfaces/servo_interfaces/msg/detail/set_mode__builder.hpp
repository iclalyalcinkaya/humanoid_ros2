// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:msg/SetMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_mode.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_MODE__BUILDER_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_MODE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/msg/detail/set_mode__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace msg
{

namespace builder
{

class Init_SetMode_client_id
{
public:
  explicit Init_SetMode_client_id(::servo_interfaces::msg::SetMode & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::msg::SetMode client_id(::servo_interfaces::msg::SetMode::_client_id_type arg)
  {
    msg_.client_id = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::msg::SetMode msg_;
};

class Init_SetMode_mode
{
public:
  Init_SetMode_mode()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_SetMode_client_id mode(::servo_interfaces::msg::SetMode::_mode_type arg)
  {
    msg_.mode = std::move(arg);
    return Init_SetMode_client_id(msg_);
  }

private:
  ::servo_interfaces::msg::SetMode msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::msg::SetMode>()
{
  return servo_interfaces::msg::builder::Init_SetMode_mode();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_MODE__BUILDER_HPP_
