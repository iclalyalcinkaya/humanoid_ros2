// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from servo_interfaces:action/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/action/motor_angle.hpp"


#ifndef SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__TRAITS_HPP_
#define SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "servo_interfaces/action/detail/motor_angle__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_Goal & msg,
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
    out << ", ";
  }

  // member: speed
  {
    out << "speed: ";
    rosidl_generator_traits::value_to_yaml(msg.speed, out);
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
  const MotorAngle_Goal & msg,
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

  // member: speed
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "speed: ";
    rosidl_generator_traits::value_to_yaml(msg.speed, out);
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

inline std::string to_yaml(const MotorAngle_Goal & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_Goal & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_Goal & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_Goal>()
{
  return "servo_interfaces::action::MotorAngle_Goal";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_Goal>()
{
  return "servo_interfaces/action/MotorAngle_Goal";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_Goal>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_Goal>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_Goal>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_Result & msg,
  std::ostream & out)
{
  out << "{";
  // member: success
  {
    out << "success: ";
    rosidl_generator_traits::value_to_yaml(msg.success, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_Result & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: success
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "success: ";
    rosidl_generator_traits::value_to_yaml(msg.success, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_Result & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_Result & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_Result & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_Result>()
{
  return "servo_interfaces::action::MotorAngle_Result";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_Result>()
{
  return "servo_interfaces/action/MotorAngle_Result";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_Result>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_Result>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_Result>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_Feedback & msg,
  std::ostream & out)
{
  out << "{";
  // member: current_position
  {
    out << "current_position: ";
    rosidl_generator_traits::value_to_yaml(msg.current_position, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_Feedback & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: current_position
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "current_position: ";
    rosidl_generator_traits::value_to_yaml(msg.current_position, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_Feedback & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_Feedback & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_Feedback & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_Feedback>()
{
  return "servo_interfaces::action::MotorAngle_Feedback";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_Feedback>()
{
  return "servo_interfaces/action/MotorAngle_Feedback";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_Feedback>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_Feedback>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_Feedback>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'goal_id'
#include "unique_identifier_msgs/msg/detail/uuid__traits.hpp"
// Member 'goal'
#include "servo_interfaces/action/detail/motor_angle__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_SendGoal_Request & msg,
  std::ostream & out)
{
  out << "{";
  // member: goal_id
  {
    out << "goal_id: ";
    to_flow_style_yaml(msg.goal_id, out);
    out << ", ";
  }

  // member: goal
  {
    out << "goal: ";
    to_flow_style_yaml(msg.goal, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_SendGoal_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: goal_id
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "goal_id:\n";
    to_block_style_yaml(msg.goal_id, out, indentation + 2);
  }

  // member: goal
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "goal:\n";
    to_block_style_yaml(msg.goal, out, indentation + 2);
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_SendGoal_Request & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_SendGoal_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_SendGoal_Request & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_SendGoal_Request>()
{
  return "servo_interfaces::action::MotorAngle_SendGoal_Request";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_SendGoal_Request>()
{
  return "servo_interfaces/action/MotorAngle_SendGoal_Request";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal_Request>
  : std::integral_constant<bool, has_fixed_size<servo_interfaces::action::MotorAngle_Goal>::value && has_fixed_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Request>
  : std::integral_constant<bool, has_bounded_size<servo_interfaces::action::MotorAngle_Goal>::value && has_bounded_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_SendGoal_Request>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'stamp'
#include "builtin_interfaces/msg/detail/time__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_SendGoal_Response & msg,
  std::ostream & out)
{
  out << "{";
  // member: accepted
  {
    out << "accepted: ";
    rosidl_generator_traits::value_to_yaml(msg.accepted, out);
    out << ", ";
  }

  // member: stamp
  {
    out << "stamp: ";
    to_flow_style_yaml(msg.stamp, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_SendGoal_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: accepted
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "accepted: ";
    rosidl_generator_traits::value_to_yaml(msg.accepted, out);
    out << "\n";
  }

  // member: stamp
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "stamp:\n";
    to_block_style_yaml(msg.stamp, out, indentation + 2);
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_SendGoal_Response & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_SendGoal_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_SendGoal_Response & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_SendGoal_Response>()
{
  return "servo_interfaces::action::MotorAngle_SendGoal_Response";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_SendGoal_Response>()
{
  return "servo_interfaces/action/MotorAngle_SendGoal_Response";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal_Response>
  : std::integral_constant<bool, has_fixed_size<builtin_interfaces::msg::Time>::value> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Response>
  : std::integral_constant<bool, has_bounded_size<builtin_interfaces::msg::Time>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_SendGoal_Response>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_SendGoal_Event & msg,
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
  const MotorAngle_SendGoal_Event & msg,
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

inline std::string to_yaml(const MotorAngle_SendGoal_Event & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_SendGoal_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_SendGoal_Event & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_SendGoal_Event>()
{
  return "servo_interfaces::action::MotorAngle_SendGoal_Event";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_SendGoal_Event>()
{
  return "servo_interfaces/action/MotorAngle_SendGoal_Event";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal_Event>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Event>
  : std::integral_constant<bool, has_bounded_size<service_msgs::msg::ServiceEventInfo>::value && has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Request>::value && has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Response>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_SendGoal_Event>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_SendGoal>()
{
  return "servo_interfaces::action::MotorAngle_SendGoal";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_SendGoal>()
{
  return "servo_interfaces/action/MotorAngle_SendGoal";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal>
  : std::integral_constant<
    bool,
    has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal_Request>::value &&
    has_fixed_size<servo_interfaces::action::MotorAngle_SendGoal_Response>::value
  >
{
};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal>
  : std::integral_constant<
    bool,
    has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Request>::value &&
    has_bounded_size<servo_interfaces::action::MotorAngle_SendGoal_Response>::value
  >
{
};

template<>
struct is_service<servo_interfaces::action::MotorAngle_SendGoal>
  : std::true_type
{
};

template<>
struct is_service_request<servo_interfaces::action::MotorAngle_SendGoal_Request>
  : std::true_type
{
};

template<>
struct is_service_response<servo_interfaces::action::MotorAngle_SendGoal_Response>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'goal_id'
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_GetResult_Request & msg,
  std::ostream & out)
{
  out << "{";
  // member: goal_id
  {
    out << "goal_id: ";
    to_flow_style_yaml(msg.goal_id, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_GetResult_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: goal_id
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "goal_id:\n";
    to_block_style_yaml(msg.goal_id, out, indentation + 2);
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_GetResult_Request & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_GetResult_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_GetResult_Request & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_GetResult_Request>()
{
  return "servo_interfaces::action::MotorAngle_GetResult_Request";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_GetResult_Request>()
{
  return "servo_interfaces/action/MotorAngle_GetResult_Request";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_GetResult_Request>
  : std::integral_constant<bool, has_fixed_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Request>
  : std::integral_constant<bool, has_bounded_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_GetResult_Request>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'result'
// already included above
// #include "servo_interfaces/action/detail/motor_angle__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_GetResult_Response & msg,
  std::ostream & out)
{
  out << "{";
  // member: status
  {
    out << "status: ";
    rosidl_generator_traits::value_to_yaml(msg.status, out);
    out << ", ";
  }

  // member: result
  {
    out << "result: ";
    to_flow_style_yaml(msg.result, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_GetResult_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: status
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "status: ";
    rosidl_generator_traits::value_to_yaml(msg.status, out);
    out << "\n";
  }

  // member: result
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "result:\n";
    to_block_style_yaml(msg.result, out, indentation + 2);
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_GetResult_Response & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_GetResult_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_GetResult_Response & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_GetResult_Response>()
{
  return "servo_interfaces::action::MotorAngle_GetResult_Response";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_GetResult_Response>()
{
  return "servo_interfaces/action/MotorAngle_GetResult_Response";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_GetResult_Response>
  : std::integral_constant<bool, has_fixed_size<servo_interfaces::action::MotorAngle_Result>::value> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Response>
  : std::integral_constant<bool, has_bounded_size<servo_interfaces::action::MotorAngle_Result>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_GetResult_Response>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'info'
// already included above
// #include "service_msgs/msg/detail/service_event_info__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_GetResult_Event & msg,
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
  const MotorAngle_GetResult_Event & msg,
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

inline std::string to_yaml(const MotorAngle_GetResult_Event & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_GetResult_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_GetResult_Event & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_GetResult_Event>()
{
  return "servo_interfaces::action::MotorAngle_GetResult_Event";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_GetResult_Event>()
{
  return "servo_interfaces/action/MotorAngle_GetResult_Event";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_GetResult_Event>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Event>
  : std::integral_constant<bool, has_bounded_size<service_msgs::msg::ServiceEventInfo>::value && has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Request>::value && has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Response>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_GetResult_Event>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_GetResult>()
{
  return "servo_interfaces::action::MotorAngle_GetResult";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_GetResult>()
{
  return "servo_interfaces/action/MotorAngle_GetResult";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_GetResult>
  : std::integral_constant<
    bool,
    has_fixed_size<servo_interfaces::action::MotorAngle_GetResult_Request>::value &&
    has_fixed_size<servo_interfaces::action::MotorAngle_GetResult_Response>::value
  >
{
};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_GetResult>
  : std::integral_constant<
    bool,
    has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Request>::value &&
    has_bounded_size<servo_interfaces::action::MotorAngle_GetResult_Response>::value
  >
{
};

template<>
struct is_service<servo_interfaces::action::MotorAngle_GetResult>
  : std::true_type
{
};

template<>
struct is_service_request<servo_interfaces::action::MotorAngle_GetResult_Request>
  : std::true_type
{
};

template<>
struct is_service_response<servo_interfaces::action::MotorAngle_GetResult_Response>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'goal_id'
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__traits.hpp"
// Member 'feedback'
// already included above
// #include "servo_interfaces/action/detail/motor_angle__traits.hpp"

namespace servo_interfaces
{

namespace action
{

inline void to_flow_style_yaml(
  const MotorAngle_FeedbackMessage & msg,
  std::ostream & out)
{
  out << "{";
  // member: goal_id
  {
    out << "goal_id: ";
    to_flow_style_yaml(msg.goal_id, out);
    out << ", ";
  }

  // member: feedback
  {
    out << "feedback: ";
    to_flow_style_yaml(msg.feedback, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const MotorAngle_FeedbackMessage & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: goal_id
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "goal_id:\n";
    to_block_style_yaml(msg.goal_id, out, indentation + 2);
  }

  // member: feedback
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "feedback:\n";
    to_block_style_yaml(msg.feedback, out, indentation + 2);
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const MotorAngle_FeedbackMessage & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_generator_traits
{

[[deprecated("use servo_interfaces::action::to_block_style_yaml() instead")]]
inline void to_yaml(
  const servo_interfaces::action::MotorAngle_FeedbackMessage & msg,
  std::ostream & out, size_t indentation = 0)
{
  servo_interfaces::action::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use servo_interfaces::action::to_yaml() instead")]]
inline std::string to_yaml(const servo_interfaces::action::MotorAngle_FeedbackMessage & msg)
{
  return servo_interfaces::action::to_yaml(msg);
}

template<>
inline const char * data_type<servo_interfaces::action::MotorAngle_FeedbackMessage>()
{
  return "servo_interfaces::action::MotorAngle_FeedbackMessage";
}

template<>
inline const char * name<servo_interfaces::action::MotorAngle_FeedbackMessage>()
{
  return "servo_interfaces/action/MotorAngle_FeedbackMessage";
}

template<>
struct has_fixed_size<servo_interfaces::action::MotorAngle_FeedbackMessage>
  : std::integral_constant<bool, has_fixed_size<servo_interfaces::action::MotorAngle_Feedback>::value && has_fixed_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct has_bounded_size<servo_interfaces::action::MotorAngle_FeedbackMessage>
  : std::integral_constant<bool, has_bounded_size<servo_interfaces::action::MotorAngle_Feedback>::value && has_bounded_size<unique_identifier_msgs::msg::UUID>::value> {};

template<>
struct is_message<servo_interfaces::action::MotorAngle_FeedbackMessage>
  : std::true_type {};

}  // namespace rosidl_generator_traits


namespace rosidl_generator_traits
{

template<>
struct is_action<servo_interfaces::action::MotorAngle>
  : std::true_type
{
};

template<>
struct is_action_goal<servo_interfaces::action::MotorAngle_Goal>
  : std::true_type
{
};

template<>
struct is_action_result<servo_interfaces::action::MotorAngle_Result>
  : std::true_type
{
};

template<>
struct is_action_feedback<servo_interfaces::action::MotorAngle_Feedback>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits


#endif  // SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__TRAITS_HPP_
