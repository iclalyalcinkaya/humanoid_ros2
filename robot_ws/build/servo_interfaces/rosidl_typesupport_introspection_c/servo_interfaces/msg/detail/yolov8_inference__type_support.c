// generated from rosidl_typesupport_introspection_c/resource/idl__type_support.c.em
// with input from servo_interfaces:msg/Yolov8Inference.idl
// generated code does not contain a copyright notice

#include <stddef.h>
#include "servo_interfaces/msg/detail/yolov8_inference__rosidl_typesupport_introspection_c.h"
#include "servo_interfaces/msg/rosidl_typesupport_introspection_c__visibility_control.h"
#include "rosidl_typesupport_introspection_c/field_types.h"
#include "rosidl_typesupport_introspection_c/identifier.h"
#include "rosidl_typesupport_introspection_c/message_introspection.h"
#include "servo_interfaces/msg/detail/yolov8_inference__functions.h"
#include "servo_interfaces/msg/detail/yolov8_inference__struct.h"


// Include directives for member types
// Member `header`
#include "std_msgs/msg/header.h"
// Member `header`
#include "std_msgs/msg/detail/header__rosidl_typesupport_introspection_c.h"
// Member `yolov8_inference`
#include "servo_interfaces/msg/inference_result.h"
// Member `yolov8_inference`
#include "servo_interfaces/msg/detail/inference_result__rosidl_typesupport_introspection_c.h"

#ifdef __cplusplus
extern "C"
{
#endif

void servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_init_function(
  void * message_memory, enum rosidl_runtime_c__message_initialization _init)
{
  // TODO(karsten1987): initializers are not yet implemented for typesupport c
  // see https://github.com/ros2/ros2/issues/397
  (void) _init;
  servo_interfaces__msg__Yolov8Inference__init(message_memory);
}

void servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_fini_function(void * message_memory)
{
  servo_interfaces__msg__Yolov8Inference__fini(message_memory);
}

size_t servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__size_function__Yolov8Inference__yolov8_inference(
  const void * untyped_member)
{
  const servo_interfaces__msg__InferenceResult__Sequence * member =
    (const servo_interfaces__msg__InferenceResult__Sequence *)(untyped_member);
  return member->size;
}

const void * servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_const_function__Yolov8Inference__yolov8_inference(
  const void * untyped_member, size_t index)
{
  const servo_interfaces__msg__InferenceResult__Sequence * member =
    (const servo_interfaces__msg__InferenceResult__Sequence *)(untyped_member);
  return &member->data[index];
}

void * servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_function__Yolov8Inference__yolov8_inference(
  void * untyped_member, size_t index)
{
  servo_interfaces__msg__InferenceResult__Sequence * member =
    (servo_interfaces__msg__InferenceResult__Sequence *)(untyped_member);
  return &member->data[index];
}

void servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__fetch_function__Yolov8Inference__yolov8_inference(
  const void * untyped_member, size_t index, void * untyped_value)
{
  const servo_interfaces__msg__InferenceResult * item =
    ((const servo_interfaces__msg__InferenceResult *)
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_const_function__Yolov8Inference__yolov8_inference(untyped_member, index));
  servo_interfaces__msg__InferenceResult * value =
    (servo_interfaces__msg__InferenceResult *)(untyped_value);
  *value = *item;
}

void servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__assign_function__Yolov8Inference__yolov8_inference(
  void * untyped_member, size_t index, const void * untyped_value)
{
  servo_interfaces__msg__InferenceResult * item =
    ((servo_interfaces__msg__InferenceResult *)
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_function__Yolov8Inference__yolov8_inference(untyped_member, index));
  const servo_interfaces__msg__InferenceResult * value =
    (const servo_interfaces__msg__InferenceResult *)(untyped_value);
  *item = *value;
}

bool servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__resize_function__Yolov8Inference__yolov8_inference(
  void * untyped_member, size_t size)
{
  servo_interfaces__msg__InferenceResult__Sequence * member =
    (servo_interfaces__msg__InferenceResult__Sequence *)(untyped_member);
  servo_interfaces__msg__InferenceResult__Sequence__fini(member);
  return servo_interfaces__msg__InferenceResult__Sequence__init(member, size);
}

static rosidl_typesupport_introspection_c__MessageMember servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_member_array[2] = {
  {
    "header",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces__msg__Yolov8Inference, header),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "yolov8_inference",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    false,  // is key
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(servo_interfaces__msg__Yolov8Inference, yolov8_inference),  // bytes offset in struct
    NULL,  // default value
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__size_function__Yolov8Inference__yolov8_inference,  // size() function pointer
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_const_function__Yolov8Inference__yolov8_inference,  // get_const(index) function pointer
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__get_function__Yolov8Inference__yolov8_inference,  // get(index) function pointer
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__fetch_function__Yolov8Inference__yolov8_inference,  // fetch(index, &value) function pointer
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__assign_function__Yolov8Inference__yolov8_inference,  // assign(index, value) function pointer
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__resize_function__Yolov8Inference__yolov8_inference  // resize(index) function pointer
  }
};

static const rosidl_typesupport_introspection_c__MessageMembers servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_members = {
  "servo_interfaces__msg",  // message namespace
  "Yolov8Inference",  // message name
  2,  // number of fields
  sizeof(servo_interfaces__msg__Yolov8Inference),
  false,  // has_any_key_member_
  servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_member_array,  // message members
  servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_init_function,  // function to initialize message memory (memory has to be allocated)
  servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_fini_function  // function to terminate message instance (will not free memory)
};

// this is not const since it must be initialized on first access
// since C does not allow non-integral compile-time constants
static rosidl_message_type_support_t servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_type_support_handle = {
  0,
  &servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_members,
  get_message_typesupport_handle_function,
  &servo_interfaces__msg__Yolov8Inference__get_type_hash,
  &servo_interfaces__msg__Yolov8Inference__get_type_description,
  &servo_interfaces__msg__Yolov8Inference__get_type_description_sources,
};

ROSIDL_TYPESUPPORT_INTROSPECTION_C_EXPORT_servo_interfaces
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, msg, Yolov8Inference)() {
  servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_member_array[0].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, std_msgs, msg, Header)();
  servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_member_array[1].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, servo_interfaces, msg, InferenceResult)();
  if (!servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_type_support_handle.typesupport_identifier) {
    servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_type_support_handle.typesupport_identifier =
      rosidl_typesupport_introspection_c__identifier;
  }
  return &servo_interfaces__msg__Yolov8Inference__rosidl_typesupport_introspection_c__Yolov8Inference_message_type_support_handle;
}
#ifdef __cplusplus
}
#endif
