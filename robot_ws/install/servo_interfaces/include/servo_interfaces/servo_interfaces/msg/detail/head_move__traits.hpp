// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/head_move.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__TRAITS_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "servo_interfaces/msg/detail/head_move__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace servo_interfaces
{

namespace msg
{

inline void to_flow_style_yaml(
  const HeadMove & msg,
  std::ostream & out)
{
  out << "{";
  // member: pan
  {
    out << "pan: ";
    rosidl_generator_traits::value_to_yaml(msg.pan, out);
    out << ", ";
  }

  // member: tilt
  {
    out << "tilt: ";
    rosidl_generator_traits::value_to_yaml(msg.tilt, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const HeadMove & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: pan
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "pan: ";
    rosidl_generator_traits::value_to_yaml(msg.pan, out);
    out << "\n";
  }

  // member: tilt
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "tilt: ";
    rosidl_generator_traits::value_to_yaml(msg.tilt, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const HeadMove & msg, bool use_flow_style = false)
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
  const servo_interfaces::msg::HeadMove & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::msg::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::msg::HeadMove & msg)
{
  return servo_interfaces::msg::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::msg::HeadMove>()
{
  return "servo_interfaces::msg::HeadMove";
}

template<>
inline const char * name<servo_interfaces::msg::HeadMove>()
{
  return "servo_interfaces/msg/HeadMove";
}

template<>
struct has_fixed_size<servo_interfaces::msg::HeadMove>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::msg::HeadMove>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::msg::HeadMove>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__TRAITS_HPP_
