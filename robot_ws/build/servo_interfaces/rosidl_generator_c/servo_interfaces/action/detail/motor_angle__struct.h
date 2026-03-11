// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from servo_interfaces:action/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/action/motor_angle.h"


#ifndef SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__STRUCT_H_
#define SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

// Include directives for member types
// Member 'client_id'
#include "rosidl_runtime_c/string.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_Goal
{
  uint8_t motor_num;
  uint8_t target_position;
  float kp;
  float ki;
  float kd;
  uint8_t speed;
  rosidl_runtime_c__String client_id;
} servo_interfaces__action__MotorAngle_Goal;

// Struct for a sequence of servo_interfaces__action__MotorAngle_Goal.
typedef struct servo_interfaces__action__MotorAngle_Goal__Sequence
{
  servo_interfaces__action__MotorAngle_Goal * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_Goal__Sequence;

// Constants defined in the message

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_Result
{
  bool success;
} servo_interfaces__action__MotorAngle_Result;

// Struct for a sequence of servo_interfaces__action__MotorAngle_Result.
typedef struct servo_interfaces__action__MotorAngle_Result__Sequence
{
  servo_interfaces__action__MotorAngle_Result * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_Result__Sequence;

// Constants defined in the message

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_Feedback
{
  uint8_t current_position;
} servo_interfaces__action__MotorAngle_Feedback;

// Struct for a sequence of servo_interfaces__action__MotorAngle_Feedback.
typedef struct servo_interfaces__action__MotorAngle_Feedback__Sequence
{
  servo_interfaces__action__MotorAngle_Feedback * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_Feedback__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'goal_id'
#include "unique_identifier_msgs/msg/detail/uuid__struct.h"
// Member 'goal'
#include "servo_interfaces/action/detail/motor_angle__struct.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Request
{
  unique_identifier_msgs__msg__UUID goal_id;
  servo_interfaces__action__MotorAngle_Goal goal;
} servo_interfaces__action__MotorAngle_SendGoal_Request;

// Struct for a sequence of servo_interfaces__action__MotorAngle_SendGoal_Request.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence
{
  servo_interfaces__action__MotorAngle_SendGoal_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'stamp'
#include "builtin_interfaces/msg/detail/time__struct.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Response
{
  bool accepted;
  builtin_interfaces__msg__Time stamp;
} servo_interfaces__action__MotorAngle_SendGoal_Response;

// Struct for a sequence of servo_interfaces__action__MotorAngle_SendGoal_Response.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence
{
  servo_interfaces__action__MotorAngle_SendGoal_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  servo_interfaces__action__MotorAngle_SendGoal_Event__request__MAX_SIZE = 1
};
// response
enum
{
  servo_interfaces__action__MotorAngle_SendGoal_Event__response__MAX_SIZE = 1
};

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Event
{
  service_msgs__msg__ServiceEventInfo info;
  servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence request;
  servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence response;
} servo_interfaces__action__MotorAngle_SendGoal_Event;

// Struct for a sequence of servo_interfaces__action__MotorAngle_SendGoal_Event.
typedef struct servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence
{
  servo_interfaces__action__MotorAngle_SendGoal_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'goal_id'
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__struct.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Request
{
  unique_identifier_msgs__msg__UUID goal_id;
} servo_interfaces__action__MotorAngle_GetResult_Request;

// Struct for a sequence of servo_interfaces__action__MotorAngle_GetResult_Request.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Request__Sequence
{
  servo_interfaces__action__MotorAngle_GetResult_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_GetResult_Request__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'result'
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Response
{
  int8_t status;
  servo_interfaces__action__MotorAngle_Result result;
} servo_interfaces__action__MotorAngle_GetResult_Response;

// Struct for a sequence of servo_interfaces__action__MotorAngle_GetResult_Response.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Response__Sequence
{
  servo_interfaces__action__MotorAngle_GetResult_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_GetResult_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
// already included above
// #include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  servo_interfaces__action__MotorAngle_GetResult_Event__request__MAX_SIZE = 1
};
// response
enum
{
  servo_interfaces__action__MotorAngle_GetResult_Event__response__MAX_SIZE = 1
};

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Event
{
  service_msgs__msg__ServiceEventInfo info;
  servo_interfaces__action__MotorAngle_GetResult_Request__Sequence request;
  servo_interfaces__action__MotorAngle_GetResult_Response__Sequence response;
} servo_interfaces__action__MotorAngle_GetResult_Event;

// Struct for a sequence of servo_interfaces__action__MotorAngle_GetResult_Event.
typedef struct servo_interfaces__action__MotorAngle_GetResult_Event__Sequence
{
  servo_interfaces__action__MotorAngle_GetResult_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_GetResult_Event__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'goal_id'
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__struct.h"
// Member 'feedback'
// already included above
// #include "servo_interfaces/action/detail/motor_angle__struct.h"

/// Struct defined in action/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__action__MotorAngle_FeedbackMessage
{
  unique_identifier_msgs__msg__UUID goal_id;
  servo_interfaces__action__MotorAngle_Feedback feedback;
} servo_interfaces__action__MotorAngle_FeedbackMessage;

// Struct for a sequence of servo_interfaces__action__MotorAngle_FeedbackMessage.
typedef struct servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence
{
  servo_interfaces__action__MotorAngle_FeedbackMessage * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__STRUCT_H_
