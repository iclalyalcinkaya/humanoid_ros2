// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_pwm.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_PWM__TRAITS_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_PWM__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "servo_interfaces/msg/detail/set_pwm__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace servo_interfaces
{

namespace msg
{

inline void to_flow_style_yaml(
  const SetPwm & msg,
  std::ostream & out)
{
  out << "{";
  // member: motor_num
  {
    out << "motor_num: ";
    rosidl_generator_traits::value_to_yaml(msg.motor_num, out);
    out << ", ";
  }

  // member: target_position
  {
    out << "target_position: ";
    rosidl_generator_traits::value_to_yaml(msg.target_position, out);
    out << ", ";
  }

  // member: speed
  {
    out << "speed: ";
    rosidl_generator_traits::value_to_yaml(msg.speed, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const SetPwm & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: motor_num
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "motor_num: ";
    rosidl_generator_traits::value_to_yaml(msg.motor_num, out);
    out << "\n";
  }

  // member: target_position
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "target_position: ";
    rosidl_generator_traits::value_to_yaml(msg.target_position, out);
    out << "\n";
  }

  // member: speed
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "speed: ";
    rosidl_generator_traits::value_to_yaml(msg.speed, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const SetPwm & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace msg

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::msg::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::msg::SetPwm & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::msg::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::msg::SetPwm & msg)
{
  return servo_interfaces::msg::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::msg::SetPwm>()
{
  return "servo_interfaces::msg::SetPwm";
}

template<>
inline const char * name<servo_interfaces::msg::SetPwm>()
{
  return "servo_interfaces/msg/SetPwm";
}

template<>
struct has_fixed_size<servo_interfaces::msg::SetPwm>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::msg::SetPwm>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::msg::SetPwm>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_PWM__TRAITS_HPP_
