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
      0x26, 0xfa, 0x42, 0x7e, 0x9d, 0x91, 0x9f, 0x6f,
      0x41, 0x0f, 0xe4, 0x18, 0x4e, 0x5a, 0xd0, 0x89,
      0x19, 0xff, 0x9b, 0x34, 0x8c, 0x5c, 0x8c, 0x13,
      0xb9, 0x95, 0xf1, 0xc1, 0x3e, 0xb4, 0xf5, 0x88,
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
      {servo_interfaces__msg__SetPwm__FIELDS, 3, 3},
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
  "uint8 speed 5";

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
    {toplevel_type_raw_source, 143, 143},
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
