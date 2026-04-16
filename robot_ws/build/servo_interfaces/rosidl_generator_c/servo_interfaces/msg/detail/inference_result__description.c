// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:msg/InferenceResult.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/msg/detail/inference_result__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__InferenceResult__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0x65, 0x2a, 0x25, 0x81, 0x03, 0x56, 0xec, 0x40,
      0x3f, 0x29, 0xe5, 0xd9, 0x0a, 0x54, 0x23, 0xd8,
      0x93, 0x20, 0xd9, 0x13, 0x1d, 0xe6, 0x10, 0xe6,
      0xde, 0xef, 0xa2, 0xb3, 0x9d, 0x63, 0x0c, 0x1b,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types

// Hashes for external referenced types
#ifndef NDEBUG
#endif

static char servo_interfaces__msg__InferenceResult__TYPE_NAME[] = "servo_interfaces/msg/InferenceResult";

// Define type names, field names, and default values
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__class_name[] = "class_name";
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__top[] = "top";
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__left[] = "left";
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__bottom[] = "bottom";
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__right[] = "right";
static char servo_interfaces__msg__InferenceResult__FIELD_NAME__id_n[] = "id_n";

static rosidl_runtime_c__type_description__Field servo_interfaces__msg__InferenceResult__FIELDS[] = {
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__class_name, 10, 10},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_STRING,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__top, 3, 3},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT64,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__left, 4, 4},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT64,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__bottom, 6, 6},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT64,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__right, 5, 5},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT64,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__msg__InferenceResult__FIELD_NAME__id_n, 4, 4},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_INT64,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__msg__InferenceResult__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__msg__InferenceResult__TYPE_NAME, 36, 36},
      {servo_interfaces__msg__InferenceResult__FIELDS, 6, 6},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "string class_name\n"
  "int64 top\n"
  "int64 left\n"
  "int64 bottom\n"
  "int64 right\n"
  "int64 id_n";

static char msg_encoding[] = "msg";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__InferenceResult__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__msg__InferenceResult__TYPE_NAME, 36, 36},
    {msg_encoding, 3, 3},
    {toplevel_type_raw_source, 74, 74},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__InferenceResult__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__msg__InferenceResult__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}
