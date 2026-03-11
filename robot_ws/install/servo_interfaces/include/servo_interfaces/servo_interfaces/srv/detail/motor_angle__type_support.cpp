// generated from rosidl_typesupport_introspection_cpp/resource/idl__type_support.cpp.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

#include "array"
#include "cstddef"
#include "string"
#include "vector"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_interface/macros.h"
#include "servo_interfaces/srv/detail/motor_angle__functions.h"
#include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
#include "rosidl_typesupport_introspection_cpp/field_types.hpp"
#include "rosidl_typesupport_introspection_cpp/identifier.hpp"
#include "rosidl_typesupport_introspection_cpp/message_introspection.hpp"
#include "rosidl_typesupport_introspection_cpp/message_type_support_decl.hpp"
#include "rosidl_typesupport_introspection_cpp/visibility_control.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_introspection_cpp
{

void MotorAngle_Request_init_function(
  void * message_memory, rosidl_runtime_cpp::MessageInitialization _init)
{
  new (message_memory) servo_interfaces::srv::MotorAngle_Request(_init);
}

void MotorAngle_Request_fini_function(void * message_memory)
{
  auto typed_message = static_cast<servo_interfaces::srv::MotorAngle_Request *>(message_memory);
  typed_message->~MotorAngle_Request();
}

static const ::rosidl_typesupport_introspection_cpp::MessageMember MotorAngle_Request_message_member_array[5] = {
  {
    "motor_num",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_UINT8,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Request, motor_num),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  },
  {
    "target_position",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_UINT8,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Request, target_position),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  },
  {
    "kp",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_DOUBLE,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Request, kp),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  },
  {
    "ki",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_DOUBLE,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Request, ki),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  },
  {
    "kd",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_DOUBLE,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Request, kd),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  }
};

static const ::rosidl_typesupport_introspection_cpp::MessageMembers MotorAngle_Request_message_members = {
  "servo_interfaces::srv",  // message namespace
  "MotorAngle_Request",  // message name
  5,  // number of fields
  sizeof(servo_interfaces::srv::MotorAngle_Request),
  false,  // has_any_key_member_
  MotorAngle_Request_message_member_array,  // message members
  MotorAngle_Request_init_function,  // function to initialize message memory (memory has to be allocated)
  MotorAngle_Request_fini_function  // function to terminate message instance (will not free memory)
};

static const rosidl_message_type_support_t MotorAngle_Request_message_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &MotorAngle_Request_message_members,
  get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Request__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Request__get_type_description,
  &servo_interfaces__srv__MotorAngle_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_introspection_cpp

}  // namespace srv

}  // namespace servo_interfaces


namespace rosidl_typesupport_introspection_cpp
{

template<>
ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Request>()
{
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Request_message_type_support_handle;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, srv, MotorAngle_Request)() {
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Request_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "array"
// already included above
// #include "cstddef"
// already included above
// #include "string"
// already included above
// #include "vector"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_interface/macros.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/field_types.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/message_introspection.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/message_type_support_decl.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/visibility_control.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_introspection_cpp
{

void MotorAngle_Response_init_function(
  void * message_memory, rosidl_runtime_cpp::MessageInitialization _init)
{
  new (message_memory) servo_interfaces::srv::MotorAngle_Response(_init);
}

void MotorAngle_Response_fini_function(void * message_memory)
{
  auto typed_message = static_cast<servo_interfaces::srv::MotorAngle_Response *>(message_memory);
  typed_message->~MotorAngle_Response();
}

static const ::rosidl_typesupport_introspection_cpp::MessageMember MotorAngle_Response_message_member_array[1] = {
  {
    "is_set",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_BOOLEAN,  // type
    0,  // upper bound of string
    nullptr,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Response, is_set),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  }
};

static const ::rosidl_typesupport_introspection_cpp::MessageMembers MotorAngle_Response_message_members = {
  "servo_interfaces::srv",  // message namespace
  "MotorAngle_Response",  // message name
  1,  // number of fields
  sizeof(servo_interfaces::srv::MotorAngle_Response),
  false,  // has_any_key_member_
  MotorAngle_Response_message_member_array,  // message members
  MotorAngle_Response_init_function,  // function to initialize message memory (memory has to be allocated)
  MotorAngle_Response_fini_function  // function to terminate message instance (will not free memory)
};

static const rosidl_message_type_support_t MotorAngle_Response_message_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &MotorAngle_Response_message_members,
  get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Response__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Response__get_type_description,
  &servo_interfaces__srv__MotorAngle_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_introspection_cpp

}  // namespace srv

}  // namespace servo_interfaces


namespace rosidl_typesupport_introspection_cpp
{

template<>
ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Response>()
{
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Response_message_type_support_handle;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, srv, MotorAngle_Response)() {
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Response_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "array"
// already included above
// #include "cstddef"
// already included above
// #include "string"
// already included above
// #include "vector"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_interface/macros.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/field_types.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/message_introspection.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/message_type_support_decl.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/visibility_control.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_introspection_cpp
{

void MotorAngle_Event_init_function(
  void * message_memory, rosidl_runtime_cpp::MessageInitialization _init)
{
  new (message_memory) servo_interfaces::srv::MotorAngle_Event(_init);
}

void MotorAngle_Event_fini_function(void * message_memory)
{
  auto typed_message = static_cast<servo_interfaces::srv::MotorAngle_Event *>(message_memory);
  typed_message->~MotorAngle_Event();
}

size_t size_function__MotorAngle_Event__request(const void * untyped_member)
{
  const auto * member = reinterpret_cast<const std::vector<servo_interfaces::srv::MotorAngle_Request> *>(untyped_member);
  return member->size();
}

const void * get_const_function__MotorAngle_Event__request(const void * untyped_member, size_t index)
{
  const auto & member =
    *reinterpret_cast<const std::vector<servo_interfaces::srv::MotorAngle_Request> *>(untyped_member);
  return &member[index];
}

void * get_function__MotorAngle_Event__request(void * untyped_member, size_t index)
{
  auto & member =
    *reinterpret_cast<std::vector<servo_interfaces::srv::MotorAngle_Request> *>(untyped_member);
  return &member[index];
}

void fetch_function__MotorAngle_Event__request(
  const void * untyped_member, size_t index, void * untyped_value)
{
  const auto & item = *reinterpret_cast<const servo_interfaces::srv::MotorAngle_Request *>(
    get_const_function__MotorAngle_Event__request(untyped_member, index));
  auto & value = *reinterpret_cast<servo_interfaces::srv::MotorAngle_Request *>(untyped_value);
  value = item;
}

void assign_function__MotorAngle_Event__request(
  void * untyped_member, size_t index, const void * untyped_value)
{
  auto & item = *reinterpret_cast<servo_interfaces::srv::MotorAngle_Request *>(
    get_function__MotorAngle_Event__request(untyped_member, index));
  const auto & value = *reinterpret_cast<const servo_interfaces::srv::MotorAngle_Request *>(untyped_value);
  item = value;
}

void resize_function__MotorAngle_Event__request(void * untyped_member, size_t size)
{
  auto * member =
    reinterpret_cast<std::vector<servo_interfaces::srv::MotorAngle_Request> *>(untyped_member);
  member->resize(size);
}

size_t size_function__MotorAngle_Event__response(const void * untyped_member)
{
  const auto * member = reinterpret_cast<const std::vector<servo_interfaces::srv::MotorAngle_Response> *>(untyped_member);
  return member->size();
}

const void * get_const_function__MotorAngle_Event__response(const void * untyped_member, size_t index)
{
  const auto & member =
    *reinterpret_cast<const std::vector<servo_interfaces::srv::MotorAngle_Response> *>(untyped_member);
  return &member[index];
}

void * get_function__MotorAngle_Event__response(void * untyped_member, size_t index)
{
  auto & member =
    *reinterpret_cast<std::vector<servo_interfaces::srv::MotorAngle_Response> *>(untyped_member);
  return &member[index];
}

void fetch_function__MotorAngle_Event__response(
  const void * untyped_member, size_t index, void * untyped_value)
{
  const auto & item = *reinterpret_cast<const servo_interfaces::srv::MotorAngle_Response *>(
    get_const_function__MotorAngle_Event__response(untyped_member, index));
  auto & value = *reinterpret_cast<servo_interfaces::srv::MotorAngle_Response *>(untyped_value);
  value = item;
}

void assign_function__MotorAngle_Event__response(
  void * untyped_member, size_t index, const void * untyped_value)
{
  auto & item = *reinterpret_cast<servo_interfaces::srv::MotorAngle_Response *>(
    get_function__MotorAngle_Event__response(untyped_member, index));
  const auto & value = *reinterpret_cast<const servo_interfaces::srv::MotorAngle_Response *>(untyped_value);
  item = value;
}

void resize_function__MotorAngle_Event__response(void * untyped_member, size_t size)
{
  auto * member =
    reinterpret_cast<std::vector<servo_interfaces::srv::MotorAngle_Response> *>(untyped_member);
  member->resize(size);
}

static const ::rosidl_typesupport_introspection_cpp::MessageMember MotorAngle_Event_message_member_array[3] = {
  {
    "info",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<service_msgs::msg::ServiceEventInfo>(),  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Event, info),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    nullptr,  // fetch(index, &value) function pointer
    nullptr,  // assign(index, value) function pointer
    nullptr  // resize(index) function pointer
  },
  {
    "request",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Request>(),  // members of sub message
    false,  // is key
    true,  // is array
    1,  // array size
    true,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Event, request),  // bytes offset in struct
    nullptr,  // default value
    size_function__MotorAngle_Event__request,  // size() function pointer
    get_const_function__MotorAngle_Event__request,  // get_const(index) function pointer
    get_function__MotorAngle_Event__request,  // get(index) function pointer
    fetch_function__MotorAngle_Event__request,  // fetch(index, &value) function pointer
    assign_function__MotorAngle_Event__request,  // assign(index, value) function pointer
    resize_function__MotorAngle_Event__request  // resize(index) function pointer
  },
  {
    "response",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Response>(),  // members of sub message
    false,  // is key
    true,  // is array
    1,  // array size
    true,  // is upper bound
    offsetof(servo_interfaces::srv::MotorAngle_Event, response),  // bytes offset in struct
    nullptr,  // default value
    size_function__MotorAngle_Event__response,  // size() function pointer
    get_const_function__MotorAngle_Event__response,  // get_const(index) function pointer
    get_function__MotorAngle_Event__response,  // get(index) function pointer
    fetch_function__MotorAngle_Event__response,  // fetch(index, &value) function pointer
    assign_function__MotorAngle_Event__response,  // assign(index, value) function pointer
    resize_function__MotorAngle_Event__response  // resize(index) function pointer
  }
};

static const ::rosidl_typesupport_introspection_cpp::MessageMembers MotorAngle_Event_message_members = {
  "servo_interfaces::srv",  // message namespace
  "MotorAngle_Event",  // message name
  3,  // number of fields
  sizeof(servo_interfaces::srv::MotorAngle_Event),
  false,  // has_any_key_member_
  MotorAngle_Event_message_member_array,  // message members
  MotorAngle_Event_init_function,  // function to initialize message memory (memory has to be allocated)
  MotorAngle_Event_fini_function  // function to terminate message instance (will not free memory)
};

static const rosidl_message_type_support_t MotorAngle_Event_message_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &MotorAngle_Event_message_members,
  get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Event__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Event__get_type_description,
  &servo_interfaces__srv__MotorAngle_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_introspection_cpp

}  // namespace srv

}  // namespace servo_interfaces


namespace rosidl_typesupport_introspection_cpp
{

template<>
ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Event>()
{
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Event_message_type_support_handle;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, srv, MotorAngle_Event)() {
  return &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_Event_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_cpp/service_type_support.hpp"
// already included above
// #include "rosidl_typesupport_interface/macros.h"
// already included above
// #include "rosidl_typesupport_introspection_cpp/visibility_control.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_introspection_cpp/message_type_support_decl.hpp"
#include "rosidl_typesupport_introspection_cpp/service_introspection.hpp"
#include "rosidl_typesupport_introspection_cpp/service_type_support_decl.hpp"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_introspection_cpp
{

// this is intentionally not const to allow initialization later to prevent an initialization race
static ::rosidl_typesupport_introspection_cpp::ServiceMembers MotorAngle_service_members = {
  "servo_interfaces::srv",  // service namespace
  "MotorAngle",  // service name
  // the following fields are initialized below on first access
  // see get_service_type_support_handle<servo_interfaces::srv::MotorAngle>()
  nullptr,  // request message
  nullptr,  // response message
  nullptr,  // event message
};

static const rosidl_service_type_support_t MotorAngle_service_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &MotorAngle_service_members,
  get_service_typesupport_handle_function,
  ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Request>(),
  ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Response>(),
  ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<servo_interfaces::srv::MotorAngle_Event>(),
  &::rosidl_typesupport_cpp::service_create_event_message<servo_interfaces::srv::MotorAngle>,
  &::rosidl_typesupport_cpp::service_destroy_event_message<servo_interfaces::srv::MotorAngle>,
  &servo_interfaces__srv__MotorAngle__get_type_hash,
  &servo_interfaces__srv__MotorAngle__get_type_description,
  &servo_interfaces__srv__MotorAngle__get_type_description_sources,
};

}  // namespace rosidl_typesupport_introspection_cpp

}  // namespace srv

}  // namespace servo_interfaces


namespace rosidl_typesupport_introspection_cpp
{

template<>
ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_service_type_support_t *
get_service_type_support_handle<servo_interfaces::srv::MotorAngle>()
{
  // get a handle to the value to be returned
  auto service_type_support =
    &::servo_interfaces::srv::rosidl_typesupport_introspection_cpp::MotorAngle_service_type_support_handle;
  // get a non-const and properly typed version of the data void *
  auto service_members = const_cast<::rosidl_typesupport_introspection_cpp::ServiceMembers *>(
    static_cast<const ::rosidl_typesupport_introspection_cpp::ServiceMembers *>(
      service_type_support->data));
  // make sure all of the service_members are initialized
  // if they are not, initialize them
  if (
    service_members->request_members_ == nullptr ||
    service_members->response_members_ == nullptr ||
    service_members->event_members_ == nullptr)
  {
    // initialize the request_members_ with the static function from the external library
    service_members->request_members_ = static_cast<
      const ::rosidl_typesupport_introspection_cpp::MessageMembers *
      >(
      ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<
        ::servo_interfaces::srv::MotorAngle_Request
      >()->data
      );
    // initialize the response_members_ with the static function from the external library
    service_members->response_members_ = static_cast<
      const ::rosidl_typesupport_introspection_cpp::MessageMembers *
      >(
      ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<
        ::servo_interfaces::srv::MotorAngle_Response
      >()->data
      );
    // initialize the event_members_ with the static function from the external library
    service_members->event_members_ = static_cast<
      const ::rosidl_typesupport_introspection_cpp::MessageMembers *
      >(
      ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<
        ::servo_interfaces::srv::MotorAngle_Event
      >()->data
      );
  }
  // finally return the properly initialized service_type_support handle
  return service_type_support;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, srv, MotorAngle)() {
  return ::rosidl_typesupport_introspection_cpp::get_service_type_support_handle<servo_interfaces::srv::MotorAngle>();
}

#ifdef __cplusplus
}
#endif
