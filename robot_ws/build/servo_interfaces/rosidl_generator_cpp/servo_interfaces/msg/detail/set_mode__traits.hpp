// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from servo_interfaces:msg/SetMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_mode.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_MODE__TRAITS_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_MODE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "servo_interfaces/msg/detail/set_mode__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace servo_interfaces
{

namespace msg
{

inline void to_flow_style_yaml(
  const SetMode & msg,
  std::ostream & out)
{
  out << "{";
  // member: mode
  {
    out << "mode: ";
    rosidl_generator_traits::value_to_yaml(msg.mode, out);
    out << ", ";
  }

  // member: client_id
  {
    out << "client_id: ";
    rosidl_generator_traits::value_to_yaml(msg.client_id, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const SetMode & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: mode
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "mode: ";
    rosidl_generator_traits::value_to_yaml(msg.mode, out);
    out << "\n";
  }

  // member: client_id
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "client_id: ";
    rosidl_generator_traits::value_to_yaml(msg.client_id, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const SetMode & msg, bool use_flow_style = false)
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
  const servo_interfaces::msg::SetMode & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::msg::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::msg::SetMode & msg)
{
  return servo_interfaces::msg::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::msg::SetMode>()
{
  return "servo_interfaces::msg::SetMode";
}

template<>
inline const char * name<servo_interfaces::msg::SetMode>()
{
  return "servo_interfaces/msg/SetMode";
}

template<>
struct has_fixed_size<servo_interfaces::msg::SetMode>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<servo_interfaces::msg::SetMode>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<servo_interfaces::msg::SetMode>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_MODE__TRAITS_HPP_
