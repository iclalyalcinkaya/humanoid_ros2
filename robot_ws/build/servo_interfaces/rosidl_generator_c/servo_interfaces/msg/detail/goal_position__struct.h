// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/goal_position.h"


#ifndef SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_H_
#define SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Constants defined in the message

/// Struct defined in msg/GoalPosition in the package servo_interfaces.
typedef struct servo_interfaces__msg__GoalPosition
{
  uint16_t x;
  uint16_t y;
  uint16_t w;
  uint16_t h;
} servo_interfaces__msg__GoalPosition;

// Struct for a sequence of servo_interfaces__msg__GoalPosition.
typedef struct servo_interfaces__msg__GoalPosition__Sequence
{
  servo_interfaces__msg__GoalPosition * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__msg__GoalPosition__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_H_
