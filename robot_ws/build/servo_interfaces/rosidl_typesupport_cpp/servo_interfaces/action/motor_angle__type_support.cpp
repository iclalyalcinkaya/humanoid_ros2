// generated from rosidl_typesupport_cpp/resource/idl__type_support.cpp.em
// with input from servo_interfaces:action/MotorAngle.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "servo_interfaces/action/detail/motor_angle__functions.h"
#include "servo_interfaces/action/detail/motor_angle__struct.hpp"
#include "rosidl_typesupport_cpp/identifier.hpp"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
#include "rosidl_typesupport_cpp/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_Goal_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Goal_type_support_ids_t;

static const _MotorAngle_Goal_type_support_ids_t _MotorAngle_Goal_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Goal_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Goal_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Goal_type_support_symbol_names_t _MotorAngle_Goal_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_Goal)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_Goal)),
  }
};

typedef struct _MotorAngle_Goal_type_support_data_t
{
  void * data[2];
} _MotorAngle_Goal_type_support_data_t;

static _MotorAngle_Goal_type_support_data_t _MotorAngle_Goal_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Goal_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Goal_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Goal_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Goal_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Goal_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Goal_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_Goal__get_type_hash,
  &servo_interfaces__action__MotorAngle_Goal__get_type_description,
  &servo_interfaces__action__MotorAngle_Goal__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_Goal>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_Goal_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_Goal)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_Goal>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_Result_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Result_type_support_ids_t;

static const _MotorAngle_Result_type_support_ids_t _MotorAngle_Result_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Result_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Result_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Result_type_support_symbol_names_t _MotorAngle_Result_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_Result)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_Result)),
  }
};

typedef struct _MotorAngle_Result_type_support_data_t
{
  void * data[2];
} _MotorAngle_Result_type_support_data_t;

static _MotorAngle_Result_type_support_data_t _MotorAngle_Result_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Result_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Result_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Result_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Result_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Result_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Result_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_Result__get_type_hash,
  &servo_interfaces__action__MotorAngle_Result__get_type_description,
  &servo_interfaces__action__MotorAngle_Result__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_Result>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_Result_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_Result)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_Result>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_Feedback_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_Feedback_type_support_ids_t;

static const _MotorAngle_Feedback_type_support_ids_t _MotorAngle_Feedback_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_Feedback_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_Feedback_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_Feedback_type_support_symbol_names_t _MotorAngle_Feedback_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_Feedback)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_Feedback)),
  }
};

typedef struct _MotorAngle_Feedback_type_support_data_t
{
  void * data[2];
} _MotorAngle_Feedback_type_support_data_t;

static _MotorAngle_Feedback_type_support_data_t _MotorAngle_Feedback_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_Feedback_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_Feedback_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_Feedback_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_Feedback_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_Feedback_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_Feedback_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_Feedback__get_type_hash,
  &servo_interfaces__action__MotorAngle_Feedback__get_type_description,
  &servo_interfaces__action__MotorAngle_Feedback__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_Feedback>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_Feedback_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_Feedback)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_Feedback>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_SendGoal_Request_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_SendGoal_Request_type_support_ids_t;

static const _MotorAngle_SendGoal_Request_type_support_ids_t _MotorAngle_SendGoal_Request_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_SendGoal_Request_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_SendGoal_Request_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_SendGoal_Request_type_support_symbol_names_t _MotorAngle_SendGoal_Request_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_SendGoal_Request)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_SendGoal_Request)),
  }
};

typedef struct _MotorAngle_SendGoal_Request_type_support_data_t
{
  void * data[2];
} _MotorAngle_SendGoal_Request_type_support_data_t;

static _MotorAngle_SendGoal_Request_type_support_data_t _MotorAngle_SendGoal_Request_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_SendGoal_Request_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_SendGoal_Request_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_SendGoal_Request_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_SendGoal_Request_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_SendGoal_Request_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_SendGoal_Request_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_SendGoal_Request__get_type_hash,
  &servo_interfaces__action__MotorAngle_SendGoal_Request__get_type_description,
  &servo_interfaces__action__MotorAngle_SendGoal_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Request>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_SendGoal_Request_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_SendGoal_Request)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Request>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_SendGoal_Response_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_SendGoal_Response_type_support_ids_t;

static const _MotorAngle_SendGoal_Response_type_support_ids_t _MotorAngle_SendGoal_Response_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_SendGoal_Response_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_SendGoal_Response_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_SendGoal_Response_type_support_symbol_names_t _MotorAngle_SendGoal_Response_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_SendGoal_Response)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_SendGoal_Response)),
  }
};

typedef struct _MotorAngle_SendGoal_Response_type_support_data_t
{
  void * data[2];
} _MotorAngle_SendGoal_Response_type_support_data_t;

static _MotorAngle_SendGoal_Response_type_support_data_t _MotorAngle_SendGoal_Response_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_SendGoal_Response_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_SendGoal_Response_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_SendGoal_Response_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_SendGoal_Response_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_SendGoal_Response_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_SendGoal_Response_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_SendGoal_Response__get_type_hash,
  &servo_interfaces__action__MotorAngle_SendGoal_Response__get_type_description,
  &servo_interfaces__action__MotorAngle_SendGoal_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Response>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_SendGoal_Response_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_SendGoal_Response)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Response>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_SendGoal_Event_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_SendGoal_Event_type_support_ids_t;

static const _MotorAngle_SendGoal_Event_type_support_ids_t _MotorAngle_SendGoal_Event_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_SendGoal_Event_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_SendGoal_Event_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_SendGoal_Event_type_support_symbol_names_t _MotorAngle_SendGoal_Event_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_SendGoal_Event)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_SendGoal_Event)),
  }
};

typedef struct _MotorAngle_SendGoal_Event_type_support_data_t
{
  void * data[2];
} _MotorAngle_SendGoal_Event_type_support_data_t;

static _MotorAngle_SendGoal_Event_type_support_data_t _MotorAngle_SendGoal_Event_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_SendGoal_Event_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_SendGoal_Event_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_SendGoal_Event_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_SendGoal_Event_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_SendGoal_Event_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_SendGoal_Event_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_SendGoal_Event__get_type_hash,
  &servo_interfaces__action__MotorAngle_SendGoal_Event__get_type_description,
  &servo_interfaces__action__MotorAngle_SendGoal_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Event>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_SendGoal_Event_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_SendGoal_Event)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Event>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
#include "rosidl_runtime_c/service_type_support_struct.h"
#include "rosidl_typesupport_cpp/service_type_support.hpp"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_cpp/service_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_SendGoal_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_SendGoal_type_support_ids_t;

static const _MotorAngle_SendGoal_type_support_ids_t _MotorAngle_SendGoal_service_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_SendGoal_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_SendGoal_type_support_symbol_names_t;
#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_SendGoal_type_support_symbol_names_t _MotorAngle_SendGoal_service_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_SendGoal)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_SendGoal)),
  }
};

typedef struct _MotorAngle_SendGoal_type_support_data_t
{
  void * data[2];
} _MotorAngle_SendGoal_type_support_data_t;

static _MotorAngle_SendGoal_type_support_data_t _MotorAngle_SendGoal_service_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_SendGoal_service_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_SendGoal_service_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_SendGoal_service_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_SendGoal_service_typesupport_data.data[0],
};

static const rosidl_service_type_support_t MotorAngle_SendGoal_service_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_SendGoal_service_typesupport_map),
  ::rosidl_typesupport_cpp::get_service_typesupport_handle_function,
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Request>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Response>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal_Event>(),
  &::rosidl_typesupport_cpp::service_create_event_message<servo_interfaces::action::MotorAngle_SendGoal>,
  &::rosidl_typesupport_cpp::service_destroy_event_message<servo_interfaces::action::MotorAngle_SendGoal>,
  &servo_interfaces__action__MotorAngle_SendGoal__get_type_hash,
  &servo_interfaces__action__MotorAngle_SendGoal__get_type_description,
  &servo_interfaces__action__MotorAngle_SendGoal__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
get_service_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_SendGoal_service_type_support_handle;
}

}  // namespace rosidl_typesupport_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_SendGoal)() {
  return ::rosidl_typesupport_cpp::get_service_type_support_handle<servo_interfaces::action::MotorAngle_SendGoal>();
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_GetResult_Request_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_GetResult_Request_type_support_ids_t;

static const _MotorAngle_GetResult_Request_type_support_ids_t _MotorAngle_GetResult_Request_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_GetResult_Request_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_GetResult_Request_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_GetResult_Request_type_support_symbol_names_t _MotorAngle_GetResult_Request_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_GetResult_Request)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_GetResult_Request)),
  }
};

typedef struct _MotorAngle_GetResult_Request_type_support_data_t
{
  void * data[2];
} _MotorAngle_GetResult_Request_type_support_data_t;

static _MotorAngle_GetResult_Request_type_support_data_t _MotorAngle_GetResult_Request_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_GetResult_Request_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_GetResult_Request_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_GetResult_Request_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_GetResult_Request_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_GetResult_Request_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_GetResult_Request_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_GetResult_Request__get_type_hash,
  &servo_interfaces__action__MotorAngle_GetResult_Request__get_type_description,
  &servo_interfaces__action__MotorAngle_GetResult_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Request>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_GetResult_Request_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_GetResult_Request)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Request>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_GetResult_Response_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_GetResult_Response_type_support_ids_t;

static const _MotorAngle_GetResult_Response_type_support_ids_t _MotorAngle_GetResult_Response_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_GetResult_Response_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_GetResult_Response_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_GetResult_Response_type_support_symbol_names_t _MotorAngle_GetResult_Response_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_GetResult_Response)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_GetResult_Response)),
  }
};

typedef struct _MotorAngle_GetResult_Response_type_support_data_t
{
  void * data[2];
} _MotorAngle_GetResult_Response_type_support_data_t;

static _MotorAngle_GetResult_Response_type_support_data_t _MotorAngle_GetResult_Response_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_GetResult_Response_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_GetResult_Response_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_GetResult_Response_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_GetResult_Response_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_GetResult_Response_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_GetResult_Response_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_GetResult_Response__get_type_hash,
  &servo_interfaces__action__MotorAngle_GetResult_Response__get_type_description,
  &servo_interfaces__action__MotorAngle_GetResult_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Response>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_GetResult_Response_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_GetResult_Response)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Response>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_GetResult_Event_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_GetResult_Event_type_support_ids_t;

static const _MotorAngle_GetResult_Event_type_support_ids_t _MotorAngle_GetResult_Event_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_GetResult_Event_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_GetResult_Event_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_GetResult_Event_type_support_symbol_names_t _MotorAngle_GetResult_Event_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_GetResult_Event)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_GetResult_Event)),
  }
};

typedef struct _MotorAngle_GetResult_Event_type_support_data_t
{
  void * data[2];
} _MotorAngle_GetResult_Event_type_support_data_t;

static _MotorAngle_GetResult_Event_type_support_data_t _MotorAngle_GetResult_Event_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_GetResult_Event_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_GetResult_Event_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_GetResult_Event_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_GetResult_Event_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_GetResult_Event_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_GetResult_Event_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_GetResult_Event__get_type_hash,
  &servo_interfaces__action__MotorAngle_GetResult_Event__get_type_description,
  &servo_interfaces__action__MotorAngle_GetResult_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Event>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_GetResult_Event_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_GetResult_Event)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Event>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/service_type_support_struct.h"
// already included above
// #include "rosidl_typesupport_cpp/service_type_support.hpp"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/service_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_GetResult_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_GetResult_type_support_ids_t;

static const _MotorAngle_GetResult_type_support_ids_t _MotorAngle_GetResult_service_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_GetResult_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_GetResult_type_support_symbol_names_t;
#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_GetResult_type_support_symbol_names_t _MotorAngle_GetResult_service_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_GetResult)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_GetResult)),
  }
};

typedef struct _MotorAngle_GetResult_type_support_data_t
{
  void * data[2];
} _MotorAngle_GetResult_type_support_data_t;

static _MotorAngle_GetResult_type_support_data_t _MotorAngle_GetResult_service_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_GetResult_service_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_GetResult_service_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_GetResult_service_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_GetResult_service_typesupport_data.data[0],
};

static const rosidl_service_type_support_t MotorAngle_GetResult_service_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_GetResult_service_typesupport_map),
  ::rosidl_typesupport_cpp::get_service_typesupport_handle_function,
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Request>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Response>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<servo_interfaces::action::MotorAngle_GetResult_Event>(),
  &::rosidl_typesupport_cpp::service_create_event_message<servo_interfaces::action::MotorAngle_GetResult>,
  &::rosidl_typesupport_cpp::service_destroy_event_message<servo_interfaces::action::MotorAngle_GetResult>,
  &servo_interfaces__action__MotorAngle_GetResult__get_type_hash,
  &servo_interfaces__action__MotorAngle_GetResult__get_type_description,
  &servo_interfaces__action__MotorAngle_GetResult__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
get_service_type_support_handle<servo_interfaces::action::MotorAngle_GetResult>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_GetResult_service_type_support_handle;
}

}  // namespace rosidl_typesupport_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_GetResult)() {
  return ::rosidl_typesupport_cpp::get_service_type_support_handle<servo_interfaces::action::MotorAngle_GetResult>();
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

typedef struct _MotorAngle_FeedbackMessage_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _MotorAngle_FeedbackMessage_type_support_ids_t;

static const _MotorAngle_FeedbackMessage_type_support_ids_t _MotorAngle_FeedbackMessage_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _MotorAngle_FeedbackMessage_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _MotorAngle_FeedbackMessage_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _MotorAngle_FeedbackMessage_type_support_symbol_names_t _MotorAngle_FeedbackMessage_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, servo_interfaces, action, MotorAngle_FeedbackMessage)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, servo_interfaces, action, MotorAngle_FeedbackMessage)),
  }
};

typedef struct _MotorAngle_FeedbackMessage_type_support_data_t
{
  void * data[2];
} _MotorAngle_FeedbackMessage_type_support_data_t;

static _MotorAngle_FeedbackMessage_type_support_data_t _MotorAngle_FeedbackMessage_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _MotorAngle_FeedbackMessage_message_typesupport_map = {
  2,
  "servo_interfaces",
  &_MotorAngle_FeedbackMessage_message_typesupport_ids.typesupport_identifier[0],
  &_MotorAngle_FeedbackMessage_message_typesupport_symbol_names.symbol_name[0],
  &_MotorAngle_FeedbackMessage_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t MotorAngle_FeedbackMessage_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_MotorAngle_FeedbackMessage_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &servo_interfaces__action__MotorAngle_FeedbackMessage__get_type_hash,
  &servo_interfaces__action__MotorAngle_FeedbackMessage__get_type_description,
  &servo_interfaces__action__MotorAngle_FeedbackMessage__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<servo_interfaces::action::MotorAngle_FeedbackMessage>()
{
  return &::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_FeedbackMessage_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle_FeedbackMessage)() {
  return get_message_type_support_handle<servo_interfaces::action::MotorAngle_FeedbackMessage>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

#include "action_msgs/msg/goal_status_array.hpp"
#include "action_msgs/srv/cancel_goal.hpp"
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
#include "rosidl_runtime_c/action_type_support_struct.h"
#include "rosidl_typesupport_cpp/action_type_support.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_cpp/service_type_support.hpp"

namespace servo_interfaces
{

namespace action
{

namespace rosidl_typesupport_cpp
{

static rosidl_action_type_support_t MotorAngle_action_type_support_handle = {
  NULL, NULL, NULL, NULL, NULL,
  &servo_interfaces__action__MotorAngle__get_type_hash,
  &servo_interfaces__action__MotorAngle__get_type_description,
  &servo_interfaces__action__MotorAngle__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace action

}  // namespace servo_interfaces

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_action_type_support_t *
get_action_type_support_handle<servo_interfaces::action::MotorAngle>()
{
  using ::servo_interfaces::action::rosidl_typesupport_cpp::MotorAngle_action_type_support_handle;
  // Thread-safe by always writing the same values to the static struct
  MotorAngle_action_type_support_handle.goal_service_type_support = get_service_type_support_handle<::servo_interfaces::action::MotorAngle::Impl::SendGoalService>();
  MotorAngle_action_type_support_handle.result_service_type_support = get_service_type_support_handle<::servo_interfaces::action::MotorAngle::Impl::GetResultService>();
  MotorAngle_action_type_support_handle.cancel_service_type_support = get_service_type_support_handle<::servo_interfaces::action::MotorAngle::Impl::CancelGoalService>();
  MotorAngle_action_type_support_handle.feedback_message_type_support = get_message_type_support_handle<::servo_interfaces::action::MotorAngle::Impl::FeedbackMessage>();
  MotorAngle_action_type_support_handle.status_message_type_support = get_message_type_support_handle<::servo_interfaces::action::MotorAngle::Impl::GoalStatusMessage>();
  return &MotorAngle_action_type_support_handle;
}

}  // namespace rosidl_typesupport_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_action_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__ACTION_SYMBOL_NAME(rosidl_typesupport_cpp, servo_interfaces, action, MotorAngle)() {
  return ::rosidl_typesupport_cpp::get_action_type_support_handle<servo_interfaces::action::MotorAngle>();
}

#ifdef __cplusplus
}
#endif
