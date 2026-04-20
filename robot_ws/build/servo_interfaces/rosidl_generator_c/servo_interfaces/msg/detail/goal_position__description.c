// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/msg/detail/goal_position__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__GoalPosition__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xcc, 0x3c, 0x1c, 0xee, 0x25, 0x32, 0x02, 0xe2,
      0x65, 0x88, 0x8a, 0x45, 0xbf, 0x0f, 0x7c, 0x74,
      0xac, 0x0b, 0x57, 0x96, 0x9b, 0xed, 0x85, 0x5b,
      0x5f, 0x53, 0xce, 0x14, 0x1f, 0x4c, 0xee, 0xe6,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types

// Hashes for external referenced types
#ifndef NDEBUG
#endif

static char servo_interfaces__msg__GoalPosition__TYPE_NAME[] = "servo_interfaces/msg/GoalPosition";

// Define type names, field names, and default values
static char servo_interfaces__msg__GoalPosition__FIELD_NAME__x[] = "x";
static char servo_interfaces__msg__GoalPosition__FIELD_NAME__y[] = "y";
static char servo_interfaces__msg__GoalPosition__FIELD_NAME__w[] = "w";
static char servo_interfaces__msg__GoalPosition__FIELD_NAME__h[] = "h";

static rosidl_runtime_c__type_description__Field servo_interfaces__msg__GoalPosition__FIELDS[] = {
  {
    {servo_interfaces__msg__GoalPosition__FIELD_NAME__x, 1, 1},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__GoalPosition__FIELD_NAME__y, 1, 1},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__GoalPosition__FIELD_NAME__w, 1, 1},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__GoalPosition__FIELD_NAME__h, 1, 1},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT16,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__msg__GoalPosition__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__msg__GoalPosition__TYPE_NAME, 33, 33},
      {servo_interfaces__msg__GoalPosition__FIELDS, 4, 4},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "uint16 x\n"
  "uint16 y\n"
  "uint16 w\n"
  "uint16 h";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__GoalPosition__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__msg__GoalPosition__TYPE_NAME, 33, 33},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 35, 35},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__GoalPosition__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__msg__GoalPosition__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}
