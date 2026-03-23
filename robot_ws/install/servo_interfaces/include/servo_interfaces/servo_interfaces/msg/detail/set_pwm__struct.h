// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_pwm.h"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_H_
#define SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_H_

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

/// Struct defined in msg/SetPwm in the package servo_interfaces.
typedef struct servo_interfaces__msg__SetPwm
{
  /// PCA9685 channel number
  uint8_t motor_num;
  /// Taarget position of the servo motor (degrees)
  uint8_t target_position;
  uint8_t speed;
  rosidl_runtime_c__String client_id;
} servo_interfaces__msg__SetPwm;

// Struct for a sequence of servo_interfaces__msg__SetPwm.
typedef struct servo_interfaces__msg__SetPwm__Sequence
{
  servo_interfaces__msg__SetPwm * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__msg__SetPwm__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_H_
