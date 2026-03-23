// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/msg/detail/set_pwm__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__SetPwm__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xe1, 0xb0, 0xe5, 0x90, 0x4d, 0x6b, 0x1f, 0x4a,
      0xce, 0x31, 0xf9, 0x47, 0x8f, 0x52, 0x63, 0x56,
      0x7a, 0x76, 0x22, 0x33, 0x74, 0xba, 0xf2, 0x22,
      0x91, 0xa0, 0x92, 0x36, 0x3d, 0x47, 0x06, 0x63,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types

// Hashes for external referenced types
#ifndef NDEBUG
#endif

static char servo_interfaces__msg__SetPwm__TYPE_NAME[] = "servo_interfaces/msg/SetPwm";

// Define type names, field names, and default values
static char servo_interfaces__msg__SetPwm__FIELD_NAME__motor_num[] = "motor_num";
static char servo_interfaces__msg__SetPwm__DEFAULT_VALUE__motor_num[] = "1";
static char servo_interfaces__msg__SetPwm__FIELD_NAME__target_position[] = "target_position";
static char servo_interfaces__msg__SetPwm__DEFAULT_VALUE__target_position[] = "90";
static char servo_interfaces__msg__SetPwm__FIELD_NAME__speed[] = "speed";
static char servo_interfaces__msg__SetPwm__DEFAULT_VALUE__speed[] = "5";
static char servo_interfaces__msg__SetPwm__FIELD_NAME__client_id[] = "client_id";

static rosidl_runtime_c__type_description__Field servo_interfaces__msg__SetPwm__FIELDS[] = {
  {
    {servo_interfaces__msg__SetPwm__FIELD_NAME__motor_num, 9, 9},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__msg__SetPwm__DEFAULT_VALUE__motor_num, 1, 1},
  },
  {
    {servo_interfaces__msg__SetPwm__FIELD_NAME__target_position, 15, 15},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__msg__SetPwm__DEFAULT_VALUE__target_position, 2, 2},
  },
  {
    {servo_interfaces__msg__SetPwm__FIELD_NAME__speed, 5, 5},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__msg__SetPwm__DEFAULT_VALUE__speed, 1, 1},
  },
  {
    {servo_interfaces__msg__SetPwm__FIELD_NAME__client_id, 9, 9},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_STRING,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__msg__SetPwm__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__msg__SetPwm__TYPE_NAME, 27, 27},
      {servo_interfaces__msg__SetPwm__FIELDS, 4, 4},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "uint8 motor_num 1           # PCA9685 channel number\n"
  "uint8 target_position 90     # Taarget position of the servo motor (degrees)\n"
  "uint8 speed 5\n"
  "string client_id";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__SetPwm__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__msg__SetPwm__TYPE_NAME, 27, 27},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 160, 160},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__SetPwm__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__msg__SetPwm__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}
