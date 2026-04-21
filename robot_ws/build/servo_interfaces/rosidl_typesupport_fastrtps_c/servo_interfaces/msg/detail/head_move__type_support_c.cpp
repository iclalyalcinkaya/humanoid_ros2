// generated from rosidl_typesupport_fastrtps_c/resource/idl__type_support_c.cpp.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice
#include "servo_interfaces/msg/detail/head_move__rosidl_typesupport_fastrtps_c.h"


#include <cassert>
#include <cstddef>
#include <limits>
#include <string>
#include "rosidl_typesupport_fastrtps_c/identifier.h"
#include "rosidl_typesupport_fastrtps_c/serialization_helpers.hpp"
#include "rosidl_typesupport_fastrtps_c/wstring_conversion.hpp"
#include "rosidl_typesupport_fastrtps_cpp/message_type_support.h"
#include "servo_interfaces/msg/rosidl_typesupport_fastrtps_c__visibility_control.h"
#include "servo_interfaces/msg/detail/head_move__struct.h"
#include "servo_interfaces/msg/detail/head_move__functions.h"
#include "fastcdr/Cdr.h"

#ifndef _WIN32
# pragma GCC diagnostic push
# pragma GCC diagnostic ignored "-Wunused-parameter"
# ifdef __clang__
#  pragma clang diagnostic ignored "-Wdeprecated-register"
#  pragma clang diagnostic ignored "-Wreturn-type-c-linkage"
# endif
#endif
#ifndef _WIN32
# pragma GCC diagnostic pop
#endif

// includes and forward declarations of message dependencies and their conversion functions

#if defined(__cplusplus)
extern "C"
{
#endif


// forward declare type support functions


using _HeadMove__ros_msg_type = servo_interfaces__msg__HeadMove;


ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
bool cdr_serialize_servo_interfaces__msg__HeadMove(
  const servo_interfaces__msg__HeadMove * ros_message,
  eprosima::fastcdr::Cdr & cdr)
{
  // Field name: pan
  {
    cdr << ros_message->pan;
  }

  // Field name: tilt
  {
    cdr << ros_message->tilt;
  }

  return true;
}

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
bool cdr_deserialize_servo_interfaces__msg__HeadMove(
  eprosima::fastcdr::Cdr & cdr,
  servo_interfaces__msg__HeadMove * ros_message)
{
  // Field name: pan
  {
    cdr >> ros_message->pan;
  }

  // Field name: tilt
  {
    cdr >> ros_message->tilt;
  }

  return true;
}  // NOLINT(readability/fn_size)


ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
size_t get_serialized_size_servo_interfaces__msg__HeadMove(
  const void * untyped_ros_message,
  size_t current_alignment)
{
  const _HeadMove__ros_msg_type * ros_message = static_cast<const _HeadMove__ros_msg_type *>(untyped_ros_message);
  (void)ros_message;
  size_t initial_alignment = current_alignment;

  const size_t padding = 4;
  const size_t wchar_size = 4;
  (void)padding;
  (void)wchar_size;

  // Field name: pan
  {
    size_t item_size = sizeof(ros_message->pan);
    current_alignment += item_size +
      eprosima::fastcdr::Cdr::alignment(current_alignment, item_size);
  }

  // Field name: tilt
  {
    size_t item_size = sizeof(ros_message->tilt);
    current_alignment += item_size +
      eprosima::fastcdr::Cdr::alignment(current_alignment, item_size);
  }

  return current_alignment - initial_alignment;
}


ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
size_t max_serialized_size_servo_interfaces__msg__HeadMove(
  bool & full_bounded,
  bool & is_plain,
  size_t current_alignment)
{
  size_t initial_alignment = current_alignment;

  const size_t padding = 4;
  const size_t wchar_size = 4;
  size_t last_member_size = 0;
  (void)last_member_size;
  (void)padding;
  (void)wchar_size;

  full_bounded = true;
  is_plain = true;

  // Field name: pan
  {
    size_t array_size = 1;
    last_member_size = array_size * sizeof(uint16_t);
    current_alignment += array_size * sizeof(uint16_t) +
      eprosima::fastcdr::Cdr::alignment(current_alignment, sizeof(uint16_t));
  }

  // Field name: tilt
  {
    size_t array_size = 1;
    last_member_size = array_size * sizeof(uint16_t);
    current_alignment += array_size * sizeof(uint16_t) +
      eprosima::fastcdr::Cdr::alignment(current_alignment, sizeof(uint16_t));
  }


  size_t ret_val = current_alignment - initial_alignment;
  if (is_plain) {
    // All members are plain, and type is not empty.
    // We still need to check that the in-memory alignment
    // is the same as the CDR mandated alignment.
    using DataType = servo_interfaces__msg__HeadMove;
    is_plain =
      (
      offsetof(DataType, tilt) +
      last_member_size
      ) == ret_val;
  }
  return ret_val;
}

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
bool cdr_serialize_key_servo_interfaces__msg__HeadMove(
  const servo_interfaces__msg__HeadMove * ros_message,
  eprosima::fastcdr::Cdr & cdr)
{
  // Field name: pan
  {
    cdr << ros_message->pan;
  }

  // Field name: tilt
  {
    cdr << ros_message->tilt;
  }

  return true;
}

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
size_t get_serialized_size_key_servo_interfaces__msg__HeadMove(
  const void * untyped_ros_message,
  size_t current_alignment)
{
  const _HeadMove__ros_msg_type * ros_message = static_cast<const _HeadMove__ros_msg_type *>(untyped_ros_message);
  (void)ros_message;

  size_t initial_alignment = current_alignment;

  const size_t padding = 4;
  const size_t wchar_size = 4;
  (void)padding;
  (void)wchar_size;

  // Field name: pan
  {
    size_t item_size = sizeof(ros_message->pan);
    current_alignment += item_size +
      eprosima::fastcdr::Cdr::alignment(current_alignment, item_size);
  }

  // Field name: tilt
  {
    size_t item_size = sizeof(ros_message->tilt);
    current_alignment += item_size +
      eprosima::fastcdr::Cdr::alignment(current_alignment, item_size);
  }

  return current_alignment - initial_alignment;
}

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_servo_interfaces
size_t max_serialized_size_key_servo_interfaces__msg__HeadMove(
  bool & full_bounded,
  bool & is_plain,
  size_t current_alignment)
{
  size_t initial_alignment = current_alignment;

  const size_t padding = 4;
  const size_t wchar_size = 4;
  size_t last_member_size = 0;
  (void)last_member_size;
  (void)padding;
  (void)wchar_size;

  full_bounded = true;
  is_plain = true;
  // Field name: pan
  {
    size_t array_size = 1;
    last_member_size = array_size * sizeof(uint16_t);
    current_alignment += array_size * sizeof(uint16_t) +
      eprosima::fastcdr::Cdr::alignment(current_alignment, sizeof(uint16_t));
  }

  // Field name: tilt
  {
    size_t array_size = 1;
    last_member_size = array_size * sizeof(uint16_t);
    current_alignment += array_size * sizeof(uint16_t) +
      eprosima::fastcdr::Cdr::alignment(current_alignment, sizeof(uint16_t));
  }

  size_t ret_val = current_alignment - initial_alignment;
  if (is_plain) {
    // All members are plain, and type is not empty.
    // We still need to check that the in-memory alignment
    // is the same as the CDR mandated alignment.
    using DataType = servo_interfaces__msg__HeadMove;
    is_plain =
      (
      offsetof(DataType, tilt) +
      last_member_size
      ) == ret_val;
  }
  return ret_val;
}


static bool _HeadMove__cdr_serialize(
  const void * untyped_ros_message,
  eprosima::fastcdr::Cdr & cdr)
{
  if (!untyped_ros_message) {
    fprintf(stderr, "ros message handle is null\n");
    return false;
  }
  const servo_interfaces__msg__HeadMove * ros_message = static_cast<const servo_interfaces__msg__HeadMove *>(untyped_ros_message);
  (void)ros_message;
  return cdr_serialize_servo_interfaces__msg__HeadMove(ros_message, cdr);
}

static bool _HeadMove__cdr_deserialize(
  eprosima::fastcdr::Cdr & cdr,
  void * untyped_ros_message)
{
  if (!untyped_ros_message) {
    fprintf(stderr, "ros message handle is null\n");
    return false;
  }
  servo_interfaces__msg__HeadMove * ros_message = static_cast<servo_interfaces__msg__HeadMove *>(untyped_ros_message);
  (void)ros_message;
  return cdr_deserialize_servo_interfaces__msg__HeadMove(cdr, ros_message);
}

static uint32_t _HeadMove__get_serialized_size(const void * untyped_ros_message)
{
  return static_cast<uint32_t>(
    get_serialized_size_servo_interfaces__msg__HeadMove(
      untyped_ros_message, 0));
}

static size_t _HeadMove__max_serialized_size(char & bounds_info)
{
  bool full_bounded;
  bool is_plain;
  size_t ret_val;

  ret_val = max_serialized_size_servo_interfaces__msg__HeadMove(
    full_bounded, is_plain, 0);

  bounds_info =
    is_plain ? ROSIDL_TYPESUPPORT_FASTRTPS_PLAIN_TYPE :
    full_bounded ? ROSIDL_TYPESUPPORT_FASTRTPS_BOUNDED_TYPE : ROSIDL_TYPESUPPORT_FASTRTPS_UNBOUNDED_TYPE;
  return ret_val;
}


static message_type_support_callbacks_t __callbacks_HeadMove = {
  "servo_interfaces::msg",
  "HeadMove",
  _HeadMove__cdr_serialize,
  _HeadMove__cdr_deserialize,
  _HeadMove__get_serialized_size,
  _HeadMove__max_serialized_size,
  nullptr
};

static rosidl_message_type_support_t _HeadMove__type_support = {
  rosidl_typesupport_fastrtps_c__identifier,
  &__callbacks_HeadMove,
  get_message_typesupport_handle_function,
  &servo_interfaces__msg__HeadMove__get_type_hash,
  &servo_interfaces__msg__HeadMove__get_type_description,
  &servo_interfaces__msg__HeadMove__get_type_description_sources,
};

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, servo_interfaces, msg, HeadMove)() {
  return &_HeadMove__type_support;
}

#if defined(__cplusplus)
}
#endif
