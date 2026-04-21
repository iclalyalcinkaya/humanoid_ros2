// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/msg/detail/head_move__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__HeadMove__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xac, 0x2c, 0x24, 0x88, 0xa9, 0xb6, 0x1d, 0xdf,
      0xb1, 0x3a, 0x7d, 0x10, 0xa6, 0xe7, 0xf6, 0xb1,
      0xa1, 0xb1, 0x79, 0x24, 0x69, 0xb5, 0xbf, 0x91,
      0x11, 0x78, 0x9d, 0xf2, 0xce, 0x4a, 0x1e, 0x68,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types

// Hashes for external referenced types
#ifndef NDEBUG
#endif

static char servo_interfaces__msg__HeadMove__TYPE_NAME[] = "servo_interfaces/msg/HeadMove";

// Define type names, field names, and default values
static char servo_interfaces__msg__HeadMove__FIELD_NAME__pan[] = "pan";
static char servo_interfaces__msg__HeadMove__FIELD_NAME__tilt[] = "tilt";

static rosidl_runtime_c__type_description__Field servo_interfaces__msg__HeadMove__FIELDS[] = {
  {
    {servo_interfaces__msg__HeadMove__FIELD_NAME__pan, 3, 3},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__HeadMove__FIELD_NAME__tilt, 4, 4},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__msg__HeadMove__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__msg__HeadMove__TYPE_NAME, 29, 29},
      {servo_interfaces__msg__HeadMove__FIELDS, 2, 2},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "int16 pan\n"
  "int16 tilt";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__HeadMove__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__msg__HeadMove__TYPE_NAME, 29, 29},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 20, 20},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__HeadMove__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__msg__HeadMove__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}
