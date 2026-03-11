// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/srv/motor_angle.hpp"


#ifndef SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__TRAITS_HPP_
#define SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace servo_interfaces
{

namespace srv
{

inline void to_flow_style_yaml(
  const MotorAngle_Request & msg,
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

  // member: kp
  {
    out << "kp: ";
    rosidl_generator_traits::value_to_yaml(msg.kp, out);
    out << ", ";
  }

  // member: ki
  {
    out << "ki: ";
    rosidl_generator_traits::value_to_yaml(msg.ki, out);
    out << ", ";
  }

  // member: kd
  {
    out << "kd: ";
    rosidl_generator_traits::value_to_yaml(msg.kd, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_Request & msg,
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

  // member: kp
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "kp: ";
    rosidl_generator_traits::value_to_yaml(msg.kp, out);
    out << "\n";
  }

  // member: ki
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "ki: ";
    rosidl_generator_traits::value_to_yaml(msg.ki, out);
    out << "\n";
  }

  // member: kd
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "kd: ";
    rosidl_generator_traits::value_to_yaml(msg.kd, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_Request & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::srv::MotorAngle_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::srv::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::srv::MotorAngle_Request & msg)
{
  return servo_interfaces::srv::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::srv::MotorAngle_Request>()
{
  return "servo_interfaces::srv::MotorAngle_Request";
}

template<>
inline const char * name<servo_interfaces::srv::MotorAngle_Request>()
{
  return "servo_interfaces/srv/MotorAngle_Request";
}

template<>
struct has_fixed_size<servo_interfaces::srv::MotorAngle_Request>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::srv::MotorAngle_Request>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::srv::MotorAngle_Request>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace servo_interfaces
{

namespace srv
{

inline void to_flow_style_yaml(
  const MotorAngle_Response & msg,
  std::ostream & out)
{
  out << "{";
  // member: is_set
  {
    out << "is_set: ";
    rosidl_generator_traits::value_to_yaml(msg.is_set, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: is_set
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "is_set: ";
    rosidl_generator_traits::value_to_yaml(msg.is_set, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_Response & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::srv::MotorAngle_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::srv::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::srv::MotorAngle_Response & msg)
{
  return servo_interfaces::srv::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::srv::MotorAngle_Response>()
{
  return "servo_interfaces::srv::MotorAngle_Response";
}

template<>
inline const char * name<servo_interfaces::srv::MotorAngle_Response>()
{
  return "servo_interfaces/srv/MotorAngle_Response";
}

template<>
struct has_fixed_size<servo_interfaces::srv::MotorAngle_Response>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::srv::MotorAngle_Response>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::srv::MotorAngle_Response>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__traits.hpp"

namespace servo_interfaces
{

namespace srv
{

inline void to_flow_style_yaml(
  const MotorAngle_Event & msg,
  std::ostream & out)
{
  out << "{";
  // member: info
  {
    out << "info: ";
    to_flow_style_yaml(msg.info, out);
    out << ", ";
  }

  // member: request
  {
    if (msg.request.size() == 0) {
      out << "request: []";
    } else {
      out << "request: [";
      size_t pending_items = msg.request.size();
      for (auto item : msg.request) {
        to_flow_style_yaml(item, out);
        if (--pending_items > 0) {
          out << ", ";
        }
      }
      out << "]";
    }
    out << ", ";
  }

  // member: response
  {
    if (msg.response.size() == 0) {
      out << "response: []";
    } else {
      out << "response: [";
      size_t pending_items = msg.response.size();
      for (auto item : msg.response) {
        to_flow_style_yaml(item, out);
        if (--pending_items > 0) {
          out << ", ";
        }
      }
      out << "]";
    }
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: info
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "info:\n";
    to_block_style_yaml(msg.info, out, indentation + 2);
  }

  // member: request
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    if (msg.request.size() == 0) {
      out << "request: []\n";
    } else {
      out << "request:\n";
      for (auto item : msg.request) {
        if (indentation > 0) {
          out << std::string(indentation, ' ');
        }
        out << "-\n";
        to_block_style_yaml(item, out, indentation + 2);
      }
    }
  }

  // member: response
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    if (msg.response.size() == 0) {
      out << "response: []\n";
    } else {
      out << "response:\n";
      for (auto item : msg.response) {
        if (indentation > 0) {
          out << std::string(indentation, ' ');
        }
        out << "-\n";
        to_block_style_yaml(item, out, indentation + 2);
      }
    }
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_Event & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::srv::MotorAngle_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::srv::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::srv::MotorAngle_Event & msg)
{
  return servo_interfaces::srv::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::srv::MotorAngle_Event>()
{
  return "servo_interfaces::srv::MotorAngle_Event";
}

template<>
inline const char * name<servo_interfaces::srv::MotorAngle_Event>()
{
  return "servo_interfaces/srv/MotorAngle_Event";
}

template<>
struct has_fixed_size<servo_interfaces::srv::MotorAngle_Event>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<servo_interfaces::srv::MotorAngle_Event>
  : std::integral_constant<bool, has_bounded_size<service_msgs::msg::ServiceEventInfo>::value && has_bounded_size<servo_interfaces::srv::MotorAngle_Request>::value && has_bounded_size<servo_interfaces::srv::MotorAngle_Response>::value> {};

template<>
struct is_message<servo_interfaces::srv::MotorAngle_Event>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<servo_interfaces::srv::MotorAngle>()
{
  return "servo_interfaces::srv::MotorAngle";
}

template<>
inline const char * name<servo_interfaces::srv::MotorAngle>()
{
  return "servo_interfaces/srv/MotorAngle";
}

template<>
struct has_fixed_size<servo_interfaces::srv::MotorAngle>
  : std::integral_constant<
    bool,
    has_fixed_size<servo_interfaces::srv::MotorAngle_Request>::value &&
    has_fixed_size<servo_interfaces::srv::MotorAngle_Response>::value
  >
{
};

template<>
struct has_bounded_size<servo_interfaces::srv::MotorAngle>
  : std::integral_constant<
    bool,
    has_bounded_size<servo_interfaces::srv::MotorAngle_Request>::value &&
    has_bounded_size<servo_interfaces::srv::MotorAngle_Response>::value
  >
{
};

template<>
struct is_service<servo_interfaces::srv::MotorAngle>
  : std::true_type
{
};

template<>
struct is_service_request<servo_interfaces::srv::MotorAngle_Request>
  : std::true_type
{
};

template<>
struct is_service_response<servo_interfaces::srv::MotorAngle_Response>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits

#endif  // SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__TRAITS_HPP_
