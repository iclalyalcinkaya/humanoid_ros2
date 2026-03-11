// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/srv/motor_angle.hpp"


#ifndef SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__BUILDER_HPP_
#define SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace srv
{

namespace builder
{

class Init_MotorAngle_Request_kd
{
public:
  explicit Init_MotorAngle_Request_kd(::servo_interfaces::srv::MotorAngle_Request & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::srv::MotorAngle_Request kd(::servo_interfaces::srv::MotorAngle_Request::_kd_type arg)
  {
    msg_.kd = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Request msg_;
};

class Init_MotorAngle_Request_ki
{
public:
  explicit Init_MotorAngle_Request_ki(::servo_interfaces::srv::MotorAngle_Request & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Request_kd ki(::servo_interfaces::srv::MotorAngle_Request::_ki_type arg)
  {
    msg_.ki = std::move(arg);
    return Init_MotorAngle_Request_kd(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Request msg_;
};

class Init_MotorAngle_Request_kp
{
public:
  explicit Init_MotorAngle_Request_kp(::servo_interfaces::srv::MotorAngle_Request & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Request_ki kp(::servo_interfaces::srv::MotorAngle_Request::_kp_type arg)
  {
    msg_.kp = std::move(arg);
    return Init_MotorAngle_Request_ki(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Request msg_;
};

class Init_MotorAngle_Request_target_position
{
public:
  explicit Init_MotorAngle_Request_target_position(::servo_interfaces::srv::MotorAngle_Request & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Request_kp target_position(::servo_interfaces::srv::MotorAngle_Request::_target_position_type arg)
  {
    msg_.target_position = std::move(arg);
    return Init_MotorAngle_Request_kp(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Request msg_;
};

class Init_MotorAngle_Request_motor_num
{
public:
  Init_MotorAngle_Request_motor_num()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_Request_target_position motor_num(::servo_interfaces::srv::MotorAngle_Request::_motor_num_type arg)
  {
    msg_.motor_num = std::move(arg);
    return Init_MotorAngle_Request_target_position(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Request msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::srv::MotorAngle_Request>()
{
  return servo_interfaces::srv::builder::Init_MotorAngle_Request_motor_num();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace srv
{

namespace builder
{

class Init_MotorAngle_Response_is_set
{
public:
  Init_MotorAngle_Response_is_set()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::servo_interfaces::srv::MotorAngle_Response is_set(::servo_interfaces::srv::MotorAngle_Response::_is_set_type arg)
  {
    msg_.is_set = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::srv::MotorAngle_Response>()
{
  return servo_interfaces::srv::builder::Init_MotorAngle_Response_is_set();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace srv
{

namespace builder
{

class Init_MotorAngle_Event_response
{
public:
  explicit Init_MotorAngle_Event_response(::servo_interfaces::srv::MotorAngle_Event & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::srv::MotorAngle_Event response(::servo_interfaces::srv::MotorAngle_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Event msg_;
};

class Init_MotorAngle_Event_request
{
public:
  explicit Init_MotorAngle_Event_request(::servo_interfaces::srv::MotorAngle_Event & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Event_response request(::servo_interfaces::srv::MotorAngle_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_MotorAngle_Event_response(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Event msg_;
};

class Init_MotorAngle_Event_info
{
public:
  Init_MotorAngle_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_Event_request info(::servo_interfaces::srv::MotorAngle_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_MotorAngle_Event_request(msg_);
  }

private:
  ::servo_interfaces::srv::MotorAngle_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::srv::MotorAngle_Event>()
{
  return servo_interfaces::srv::builder::Init_MotorAngle_Event_info();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__BUILDER_HPP_
