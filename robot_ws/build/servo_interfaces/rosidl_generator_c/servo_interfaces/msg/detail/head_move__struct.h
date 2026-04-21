// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/head_move.h"


#ifndef SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_H_
#define SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Constants defined in the message

/// Struct defined in msg/HeadMove in the package servo_interfaces.
typedef struct servo_interfaces__msg__HeadMove
{
  int16_t pan;
  int16_t tilt;
} servo_interfaces__msg__HeadMove;

// Struct for a sequence of servo_interfaces__msg__HeadMove.
typedef struct servo_interfaces__msg__HeadMove__Sequence
{
  servo_interfaces__msg__HeadMove * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} servo_interfaces__msg__HeadMove__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_H_
