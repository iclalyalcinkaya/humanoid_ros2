// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:msg/SetMode.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/msg/detail/set_mode__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__SetMode__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xf1, 0x76, 0x70, 0x24, 0xa2, 0x46, 0xea, 0x14,
      0x67, 0x6f, 0x6b, 0x22, 0x80, 0xdf, 0x5f, 0x81,
      0xbd, 0x88, 0x01, 0x76, 0x1b, 0xd2, 0xdf, 0x7a,
      0x59, 0x09, 0x07, 0x04, 0x91, 0x5d, 0x68, 0xb2,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types

// Hashes for external referenced types
#ifndef NDEBUG
#endif

static char servo_interfaces__msg__SetMode__TYPE_NAME[] = "servo_interfaces/msg/SetMode";

// Define type names, field names, and default values
static char servo_interfaces__msg__SetMode__FIELD_NAME__mode[] = "mode";
static char servo_interfaces__msg__SetMode__DEFAULT_VALUE__mode[] = "-1";
static char servo_interfaces__msg__SetMode__FIELD_NAME__client_id[] = "client_id";

static rosidl_runtime_c__type_description__Field servo_interfaces__msg__SetMode__FIELDS[] = {
  {
    {servo_interfaces__msg__SetMode__FIELD_NAME__mode, 4, 4},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__msg__SetMode__DEFAULT_VALUE__mode, 2, 2},
  },
  {
    {servo_interfaces__msg__SetMode__FIELD_NAME__client_id, 9, 9},
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
servo_interfaces__msg__SetMode__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__msg__SetMode__TYPE_NAME, 28, 28},
      {servo_interfaces__msg__SetMode__FIELDS, 2, 2},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "int8 mode -1\n"
  "string client_id";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__SetMode__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__msg__SetMode__TYPE_NAME, 28, 28},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 29, 29},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__SetMode__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__msg__SetMode__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}
