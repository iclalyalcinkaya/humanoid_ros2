// generated from rosidl_typesupport_c/resource/idl__type_support.cpp.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "servo_interfaces/srv/detail/motor_angle__struct.h"
#include "servo_interfaces/srv/detail/motor_angle__type_support.h"
#include "servo_interfaces/srv/detail/motor_angle__functions.h"
#include "rosidl_typesupport_c/identifier.h"
#include "rosidl_typesupport_c/message_type_support_dispatch.h"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_c/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _MotorAngle_Request_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Request_type_support_ids_t;

static const _MotorAngle_Request_type_support_ids_t _MotorAngle_Request_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Request_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Request_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Request_type_support_symbol_names_t _MotorAngle_Request_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, servo_interfaces, srv, MotorAngle_Request)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, srv, MotorAngle_Request)),
  }
};

typedef struct _MotorAngle_Request_type_support_data_t
{
  void * data[2];
} _MotorAngle_Request_type_support_data_t;

static _MotorAngle_Request_type_support_data_t _MotorAngle_Request_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Request_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Request_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Request_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Request_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Request_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Request_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Request__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Request__get_type_description,
  &servo_interfaces__srv__MotorAngle_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace servo_interfaces

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, servo_interfaces, srv, MotorAngle_Request)() {
  return &::servo_interfaces::srv::rosidl_typesupport_c::MotorAngle_Request_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__struct.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__type_support.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
// already included above
// #include "rosidl_typesupport_c/message_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_c/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _MotorAngle_Response_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Response_type_support_ids_t;

static const _MotorAngle_Response_type_support_ids_t _MotorAngle_Response_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Response_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Response_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Response_type_support_symbol_names_t _MotorAngle_Response_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, servo_interfaces, srv, MotorAngle_Response)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, srv, MotorAngle_Response)),
  }
};

typedef struct _MotorAngle_Response_type_support_data_t
{
  void * data[2];
} _MotorAngle_Response_type_support_data_t;

static _MotorAngle_Response_type_support_data_t _MotorAngle_Response_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Response_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Response_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Response_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Response_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Response_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Response_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Response__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Response__get_type_description,
  &servo_interfaces__srv__MotorAngle_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace servo_interfaces

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, servo_interfaces, srv, MotorAngle_Response)() {
  return &::servo_interfaces::srv::rosidl_typesupport_c::MotorAngle_Response_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__struct.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__type_support.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
// already included above
// #include "rosidl_typesupport_c/message_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_c/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _MotorAngle_Event_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Event_type_support_ids_t;

static const _MotorAngle_Event_type_support_ids_t _MotorAngle_Event_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Event_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Event_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Event_type_support_symbol_names_t _MotorAngle_Event_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, servo_interfaces, srv, MotorAngle_Event)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, srv, MotorAngle_Event)),
  }
};

typedef struct _MotorAngle_Event_type_support_data_t
{
  void * data[2];
} _MotorAngle_Event_type_support_data_t;

static _MotorAngle_Event_type_support_data_t _MotorAngle_Event_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Event_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Event_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Event_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Event_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Event_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Event_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &servo_interfaces__srv__MotorAngle_Event__get_type_hash,
  &servo_interfaces__srv__MotorAngle_Event__get_type_description,
  &servo_interfaces__srv__MotorAngle_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace servo_interfaces

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, servo_interfaces, srv, MotorAngle_Event)() {
  return &::servo_interfaces::srv::rosidl_typesupport_c::MotorAngle_Event_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
#include "rosidl_runtime_c/service_type_support_struct.h"
// already included above
// #include "servo_interfaces/srv/detail/motor_angle__type_support.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
#include "rosidl_typesupport_c/service_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"
#include "service_msgs/msg/service_event_info.h"
#include "builtin_interfaces/msg/time.h"

namespace servo_interfaces
{

namespace srv
{

namespace rosidl_typesupport_c
{
typedef struct _MotorAngle_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_type_support_ids_t;

static const _MotorAngle_type_support_ids_t _MotorAngle_service_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _MotorAngle_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_type_support_symbol_names_t _MotorAngle_service_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, servo_interfaces, srv, MotorAngle)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, srv, MotorAngle)),
  }
};

typedef struct _MotorAngle_type_support_data_t
{
  void * data[2];
} _MotorAngle_type_support_data_t;

static _MotorAngle_type_support_data_t _MotorAngle_service_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_service_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_service_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_service_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_service_typesupport_data.data[0],
};

static const rosidl_service_type_support_t MotorAngle_service_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_service_typesupport_map),
  rosidl_typesupport_c__get_service_typesupport_handle_function,
  &MotorAngle_Request_message_type_support_handle,
  &MotorAngle_Response_message_type_support_handle,
  &MotorAngle_Event_message_type_support_handle,
  ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_CREATE_EVENT_MESSAGE_SYMBOL_NAME(
    rosidl_typesupport_c,
    servo_interfaces,
    srv,
    MotorAngle
  ),
  ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_DESTROY_EVENT_MESSAGE_SYMBOL_NAME(
    rosidl_typesupport_c,
    servo_interfaces,
    srv,
    MotorAngle
  ),
  &servo_interfaces__srv__MotorAngle__get_type_hash,
  &servo_interfaces__srv__MotorAngle__get_type_description,
  &servo_interfaces__srv__MotorAngle__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace servo_interfaces

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_c, servo_interfaces, srv, MotorAngle)() {
  return &::servo_interfaces::srv::rosidl_typesupport_c::MotorAngle_service_type_support_handle;
}

#ifdef __cplusplus
}
#endif
