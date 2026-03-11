// generated from rosidl_generator_c/resource/idl__description.c.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

#include "servo_interfaces/srv/detail/motor_angle__functions.h"

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__srv__MotorAngle__get_type_hash(
  const rosidl_service_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0xcb, 0xbc, 0x62, 0x11, 0x66, 0x69, 0x61, 0x6d,
      0x67, 0x79, 0xa8, 0x38, 0xba, 0x0a, 0xb5, 0x45,
      0xc4, 0xc3, 0x4e, 0xcd, 0x1d, 0x37, 0x36, 0xd5,
      0x49, 0x89, 0xe7, 0x49, 0x45, 0xb5, 0xae, 0xd1,
    }};
  return &hash;
}

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__srv__MotorAngle_Request__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0x95, 0x41, 0xca, 0x32, 0x65, 0x93, 0xd0, 0x4d,
      0x7e, 0x28, 0x61, 0xd8, 0xf3, 0xaa, 0xac, 0x8d,
      0x61, 0x87, 0x54, 0x30, 0xad, 0x41, 0xdf, 0xe0,
      0xf5, 0x65, 0xcd, 0xf9, 0xc9, 0xbf, 0xdf, 0xb8,
    }};
  return &hash;
}

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__srv__MotorAngle_Response__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0x7e, 0x6c, 0x96, 0xaf, 0x2e, 0x52, 0x7c, 0x9f,
      0xb7, 0x6c, 0x51, 0x2f, 0x5a, 0x3a, 0xdc, 0x5e,
      0xd8, 0x87, 0x7a, 0x2f, 0xf5, 0x0e, 0xb0, 0x42,
      0x19, 0x64, 0x27, 0xb2, 0x3c, 0x49, 0x9e, 0x0e,
    }};
  return &hash;
}

ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__srv__MotorAngle_Event__get_type_hash(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_type_hash_t hash = {1, {
      0x8e, 0x66, 0xcf, 0xdf, 0x17, 0xa5, 0xb8, 0x4b,
      0x12, 0x6b, 0xb2, 0xbc, 0x39, 0xa2, 0x11, 0x93,
      0x10, 0x86, 0x92, 0xb8, 0x83, 0xd5, 0x48, 0xe7,
      0x38, 0x30, 0xfc, 0x24, 0x17, 0xaa, 0xfb, 0x8a,
    }};
  return &hash;
}

#include <assert.h>
#include <string.h>

// Include directives for referenced types
#include "service_msgs/msg/detail/service_event_info__functions.h"
#include "builtin_interfaces/msg/detail/time__functions.h"

// Hashes for external referenced types
#ifndef NDEBUG
static const rosidl_type_hash_t builtin_interfaces__msg__Time__EXPECTED_HASH = {1, {
    0xb1, 0x06, 0x23, 0x5e, 0x25, 0xa4, 0xc5, 0xed,
    0x35, 0x09, 0x8a, 0xa0, 0xa6, 0x1a, 0x3e, 0xe9,
    0xc9, 0xb1, 0x8d, 0x19, 0x7f, 0x39, 0x8b, 0x0e,
    0x42, 0x06, 0xce, 0xa9, 0xac, 0xf9, 0xc1, 0x97,
  }};
static const rosidl_type_hash_t service_msgs__msg__ServiceEventInfo__EXPECTED_HASH = {1, {
    0x41, 0xbc, 0xbb, 0xe0, 0x7a, 0x75, 0xc9, 0xb5,
    0x2b, 0xc9, 0x6b, 0xfd, 0x5c, 0x24, 0xd7, 0xf0,
    0xfc, 0x0a, 0x08, 0xc0, 0xcb, 0x79, 0x21, 0xb3,
    0x37, 0x3c, 0x57, 0x32, 0x34, 0x5a, 0x6f, 0x45,
  }};
#endif

static char servo_interfaces__srv__MotorAngle__TYPE_NAME[] = "servo_interfaces/srv/MotorAngle";
static char builtin_interfaces__msg__Time__TYPE_NAME[] = "builtin_interfaces/msg/Time";
static char service_msgs__msg__ServiceEventInfo__TYPE_NAME[] = "service_msgs/msg/ServiceEventInfo";
static char servo_interfaces__srv__MotorAngle_Event__TYPE_NAME[] = "servo_interfaces/srv/MotorAngle_Event";
static char servo_interfaces__srv__MotorAngle_Request__TYPE_NAME[] = "servo_interfaces/srv/MotorAngle_Request";
static char servo_interfaces__srv__MotorAngle_Response__TYPE_NAME[] = "servo_interfaces/srv/MotorAngle_Response";

// Define type names, field names, and default values
static char servo_interfaces__srv__MotorAngle__FIELD_NAME__request_message[] = "request_message";
static char servo_interfaces__srv__MotorAngle__FIELD_NAME__response_message[] = "response_message";
static char servo_interfaces__srv__MotorAngle__FIELD_NAME__event_message[] = "event_message";

static rosidl_runtime_c__type_description__Field servo_interfaces__srv__MotorAngle__FIELDS[] = {
  {
    {servo_interfaces__srv__MotorAngle__FIELD_NAME__request_message, 15, 15},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE,
      0,
      0,
      {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle__FIELD_NAME__response_message, 16, 16},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE,
      0,
      0,
      {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle__FIELD_NAME__event_message, 13, 13},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE,
      0,
      0,
      {servo_interfaces__srv__MotorAngle_Event__TYPE_NAME, 37, 37},
    },
    {NULL, 0, 0},
  },
};

static rosidl_runtime_c__type_description__IndividualTypeDescription servo_interfaces__srv__MotorAngle__REFERENCED_TYPE_DESCRIPTIONS[] = {
  {
    {builtin_interfaces__msg__Time__TYPE_NAME, 27, 27},
    {NULL, 0, 0},
  },
  {
    {service_msgs__msg__ServiceEventInfo__TYPE_NAME, 33, 33},
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Event__TYPE_NAME, 37, 37},
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__srv__MotorAngle__get_type_description(
  const rosidl_service_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__srv__MotorAngle__TYPE_NAME, 31, 31},
      {servo_interfaces__srv__MotorAngle__FIELDS, 3, 3},
    },
    {servo_interfaces__srv__MotorAngle__REFERENCED_TYPE_DESCRIPTIONS, 5, 5},
  };
  if (!constructed) {
    assert(0 == memcmp(&builtin_interfaces__msg__Time__EXPECTED_HASH, builtin_interfaces__msg__Time__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[0].fields = builtin_interfaces__msg__Time__get_type_description(NULL)->type_description.fields;
    assert(0 == memcmp(&service_msgs__msg__ServiceEventInfo__EXPECTED_HASH, service_msgs__msg__ServiceEventInfo__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[1].fields = service_msgs__msg__ServiceEventInfo__get_type_description(NULL)->type_description.fields;
    description.referenced_type_descriptions.data[2].fields = servo_interfaces__srv__MotorAngle_Event__get_type_description(NULL)->type_description.fields;
    description.referenced_type_descriptions.data[3].fields = servo_interfaces__srv__MotorAngle_Request__get_type_description(NULL)->type_description.fields;
    description.referenced_type_descriptions.data[4].fields = servo_interfaces__srv__MotorAngle_Response__get_type_description(NULL)->type_description.fields;
    constructed = true;
  }
  return &description;
}
// Define type names, field names, and default values
static char servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__motor_num[] = "motor_num";
static char servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__motor_num[] = "1";
static char servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__target_position[] = "target_position";
static char servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__target_position[] = "120";
static char servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__kp[] = "kp";
static char servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__kp[] = "0.008";
static char servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__ki[] = "ki";
static char servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__ki[] = "0.01";
static char servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__kd[] = "kd";
static char servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__kd[] = "0.003";

static rosidl_runtime_c__type_description__Field servo_interfaces__srv__MotorAngle_Request__FIELDS[] = {
  {
    {servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__motor_num, 9, 9},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__motor_num, 1, 1},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__target_position, 15, 15},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_UINT8,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__target_position, 3, 3},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__kp, 2, 2},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_DOUBLE,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__kp, 5, 5},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__ki, 2, 2},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_DOUBLE,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__ki, 4, 4},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__FIELD_NAME__kd, 2, 2},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_DOUBLE,
      0,
      0,
      {NULL, 0, 0},
    },
    {servo_interfaces__srv__MotorAngle_Request__DEFAULT_VALUE__kd, 5, 5},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__srv__MotorAngle_Request__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
      {servo_interfaces__srv__MotorAngle_Request__FIELDS, 5, 5},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}
// Define type names, field names, and default values
static char servo_interfaces__srv__MotorAngle_Response__FIELD_NAME__is_set[] = "is_set";

static rosidl_runtime_c__type_description__Field servo_interfaces__srv__MotorAngle_Response__FIELDS[] = {
  {
    {servo_interfaces__srv__MotorAngle_Response__FIELD_NAME__is_set, 6, 6},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_BOOLEAN,
      0,
      0,
      {NULL, 0, 0},
    },
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__srv__MotorAngle_Response__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
      {servo_interfaces__srv__MotorAngle_Response__FIELDS, 1, 1},
    },
    {NULL, 0, 0},
  };
  if (!constructed) {
    constructed = true;
  }
  return &description;
}
// Define type names, field names, and default values
static char servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__info[] = "info";
static char servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__request[] = "request";
static char servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__response[] = "response";

static rosidl_runtime_c__type_description__Field servo_interfaces__srv__MotorAngle_Event__FIELDS[] = {
  {
    {servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__info, 4, 4},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE,
      0,
      0,
      {service_msgs__msg__ServiceEventInfo__TYPE_NAME, 33, 33},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__request, 7, 7},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE_BOUNDED_SEQUENCE,
      1,
      0,
      {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
    },
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Event__FIELD_NAME__response, 8, 8},
    {
      rosidl_runtime_c__type_description__FieldType__FIELD_TYPE_NESTED_TYPE_BOUNDED_SEQUENCE,
      1,
      0,
      {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
    },
    {NULL, 0, 0},
  },
};

static rosidl_runtime_c__type_description__IndividualTypeDescription servo_interfaces__srv__MotorAngle_Event__REFERENCED_TYPE_DESCRIPTIONS[] = {
  {
    {builtin_interfaces__msg__Time__TYPE_NAME, 27, 27},
    {NULL, 0, 0},
  },
  {
    {service_msgs__msg__ServiceEventInfo__TYPE_NAME, 33, 33},
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
    {NULL, 0, 0},
  },
  {
    {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
    {NULL, 0, 0},
  },
};

const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__srv__MotorAngle_Event__get_type_description(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static bool constructed = false;
  static const rosidl_runtime_c__type_description__TypeDescription description = {
    {
      {servo_interfaces__srv__MotorAngle_Event__TYPE_NAME, 37, 37},
      {servo_interfaces__srv__MotorAngle_Event__FIELDS, 3, 3},
    },
    {servo_interfaces__srv__MotorAngle_Event__REFERENCED_TYPE_DESCRIPTIONS, 4, 4},
  };
  if (!constructed) {
    assert(0 == memcmp(&builtin_interfaces__msg__Time__EXPECTED_HASH, builtin_interfaces__msg__Time__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[0].fields = builtin_interfaces__msg__Time__get_type_description(NULL)->type_description.fields;
    assert(0 == memcmp(&service_msgs__msg__ServiceEventInfo__EXPECTED_HASH, service_msgs__msg__ServiceEventInfo__get_type_hash(NULL), sizeof(rosidl_type_hash_t)));
    description.referenced_type_descriptions.data[1].fields = service_msgs__msg__ServiceEventInfo__get_type_description(NULL)->type_description.fields;
    description.referenced_type_descriptions.data[2].fields = servo_interfaces__srv__MotorAngle_Request__get_type_description(NULL)->type_description.fields;
    description.referenced_type_descriptions.data[3].fields = servo_interfaces__srv__MotorAngle_Response__get_type_description(NULL)->type_description.fields;
    constructed = true;
  }
  return &description;
}

static char toplevel_type_raw_source[] =
  "uint8 motor_num 1     \n"
  "uint8 target_position 120\n"
  "float64 kp 0.008\n"
  "float64 ki 0.010\n"
  "float64 kd 0.003\n"
  "---\n"
  "bool is_set";

static char srv_encoding[] = "srv";
static char implicit_encoding[] = "implicit";

// Define all individual source functions

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__srv__MotorAngle__get_individual_type_description_source(
  const rosidl_service_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__srv__MotorAngle__TYPE_NAME, 31, 31},
    {srv_encoding, 3, 3},
    {toplevel_type_raw_source, 115, 115},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__srv__MotorAngle_Request__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__srv__MotorAngle_Request__TYPE_NAME, 39, 39},
    {implicit_encoding, 8, 8},
    {NULL, 0, 0},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__srv__MotorAngle_Response__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__srv__MotorAngle_Response__TYPE_NAME, 40, 40},
    {implicit_encoding, 8, 8},
    {NULL, 0, 0},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__srv__MotorAngle_Event__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static const rosidl_runtime_c__type_description__TypeSource source = {
    {servo_interfaces__srv__MotorAngle_Event__TYPE_NAME, 37, 37},
    {implicit_encoding, 8, 8},
    {NULL, 0, 0},
  };
  return &source;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__srv__MotorAngle__get_type_description_sources(
  const rosidl_service_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[6];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 6, 6};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__srv__MotorAngle__get_individual_type_description_source(NULL),
    sources[1] = *builtin_interfaces__msg__Time__get_individual_type_description_source(NULL);
    sources[2] = *service_msgs__msg__ServiceEventInfo__get_individual_type_description_source(NULL);
    sources[3] = *servo_interfaces__srv__MotorAngle_Event__get_individual_type_description_source(NULL);
    sources[4] = *servo_interfaces__srv__MotorAngle_Request__get_individual_type_description_source(NULL);
    sources[5] = *servo_interfaces__srv__MotorAngle_Response__get_individual_type_description_source(NULL);
    constructed = true;
  }
  return &source_sequence;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__srv__MotorAngle_Request__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__srv__MotorAngle_Request__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__srv__MotorAngle_Response__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[1];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 1, 1};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__srv__MotorAngle_Response__get_individual_type_description_source(NULL),
    constructed = true;
  }
  return &source_sequence;
}

const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__srv__MotorAngle_Event__get_type_description_sources(
  const rosidl_message_type_support_t * type_support)
{
  (void)type_support;
  static rosidl_runtime_c__type_description__TypeSource sources[5];
  static const rosidl_runtime_c__type_description__TypeSource__Sequence source_sequence = {sources, 5, 5};
  static bool constructed = false;
  if (!constructed) {
    sources[0] = *servo_interfaces__srv__MotorAngle_Event__get_individual_type_description_source(NULL),
    sources[1] = *builtin_interfaces__msg__Time__get_individual_type_description_source(NULL);
    sources[2] = *service_msgs__msg__ServiceEventInfo__get_individual_type_description_source(NULL);
    sources[3] = *servo_interfaces__srv__MotorAngle_Request__get_individual_type_description_source(NULL);
    sources[4] = *servo_interfaces__srv__MotorAngle_Response__get_individual_type_description_source(NULL);
    constructed = true;
  }
  return &source_sequence;
}
