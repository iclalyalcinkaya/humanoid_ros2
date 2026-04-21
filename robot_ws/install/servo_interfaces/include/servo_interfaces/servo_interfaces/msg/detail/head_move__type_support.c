// generated from rosidl_typesupport_introspection_c/resource/idl__type_support.c.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

#include <stddef.h>
#include "servo_interfaces/msg/detail/head_move__rosidl_typesupport_introspection_c.h"
#include "servo_interfaces/msg/rosidl_typesupport_introspection_c__visibility_control.h"
#include "rosidl_typesupport_introspection_c/field_types.h"
#include "rosidl_typesupport_introspection_c/identifier.h"
#include "rosidl_typesupport_introspection_c/message_introspection.h"
#include "servo_interfaces/msg/detail/head_move__functions.h"
#include "servo_interfaces/msg/detail/head_move__struct.h"


#ifdef __cplusplus
extern "C"
{
#endif

void servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_init_function(
  void * message_memory, enum rosidl_runtime_c__message_initialization _init)
{
  // TODO(karsten1987): initializers are not yet implemented for typesupport c
  // see https://github.com/ros2/ros2/issues/397
  (void) _init;
  servo_interfaces__msg__HeadMove__init(message_memory);
}

void servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_fini_function(void * message_memory)
{
  servo_interfaces__msg__HeadMove__fini(message_memory);
}

static rosidl_typesupport_introspection_c__MessageMember servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_member_array[2] = {
  {
    "pan",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_INT16,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces__msg__HeadMove, pan),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "tilt",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_INT16,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces__msg__HeadMove, tilt),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  }
};

static const rosidl_typesupport_introspection_c__MessageMembers servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_members = {
  "servo_interfaces__msg",  // message namespace
  "HeadMove",  // message name
  2,  // number of fields
  sizeof(servo_interfaces__msg__HeadMove),
  false,  // has_any_key_member_
  servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_member_array,  // message members
  servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_init_function,  // function to initialize message memory (memory has to be allocated)
  servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_fini_function  // function to terminate message instance (will not free memory)
};

// this is not const since it must be initialized on first access
// since C does not allow non-integral compile-time constants
static rosidl_message_type_support_t servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_type_support_handle = {
  0,
  &servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_members,
  get_message_typesupport_handle_function,
  &servo_interfaces__msg__HeadMove__get_type_hash,
  &servo_interfaces__msg__HeadMove__get_type_description,
  &servo_interfaces__msg__HeadMove__get_type_description_sources,
};

ROSIDL_TYPESUPPORT_INTROSPECTION_C_EXPORT_servo_interfaces
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, msg, HeadMove)() {
  if (!servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_type_support_handle.typesupport_identifier) {
    servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_type_support_handle.typesupport_identifier =
      rosidl_typesupport_introspection_c__identifier;
  }
  return &servo_interfaces__msg__HeadMove__rosidl_typesupport_introspection_c__HeadMove_message_type_support_handle;
}
#ifdef __cplusplus
}
#endif
