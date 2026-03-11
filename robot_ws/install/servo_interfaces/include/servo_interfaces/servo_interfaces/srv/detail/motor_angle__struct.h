// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/srv/motor_angle.h"


#ifndef SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_H_
#define SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

/// Struct defined in srv/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__srv__MotorAngle_Request
{
  uint8_t motor_num;
  uint8_t target_position;
  double kp;
  double ki;
  double kd;
} servo_interfaces__srv__MotorAngle_Request;

// Struct for a sequence of servo_interfaces__srv__MotorAngle_Request.
typedef struct servo_interfaces__srv__MotorAngle_Request__Sequence
{
  servo_interfaces__srv__MotorAngle_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__srv__MotorAngle_Request__Sequence;

// Constants defined in the message

/// Struct defined in srv/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__srv__MotorAngle_Response
{
  bool is_set;
} servo_interfaces__srv__MotorAngle_Response;

// Struct for a sequence of servo_interfaces__srv__MotorAngle_Response.
typedef struct servo_interfaces__srv__MotorAngle_Response__Sequence
{
  servo_interfaces__srv__MotorAngle_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__srv__MotorAngle_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  servo_interfaces__srv__MotorAngle_Event__request__MAX_SIZE = 1
};
// response
enum
{
  servo_interfaces__srv__MotorAngle_Event__response__MAX_SIZE = 1
};

/// Struct defined in srv/MotorAngle in the package servo_interfaces.
typedef struct servo_interfaces__srv__MotorAngle_Event
{
  service_msgs__msg__ServiceEventInfo info;
  servo_interfaces__srv__MotorAngle_Request__Sequence request;
  servo_interfaces__srv__MotorAngle_Response__Sequence response;
} servo_interfaces__srv__MotorAngle_Event;

// Struct for a sequence of servo_interfaces__srv__MotorAngle_Event.
typedef struct servo_interfaces__srv__MotorAngle_Event__Sequence
{
  servo_interfaces__srv__MotorAngle_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__srv__MotorAngle_Event__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_H_
