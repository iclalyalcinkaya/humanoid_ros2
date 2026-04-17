// generated from rosidl_generator_c/resource/idl__functions.h.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/goal_position.h"


#ifndef SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__FUNCTIONS_H_
#define SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__FUNCTIONS_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stdlib.h>

#include "rosidl_runtime_c/action_type_support_struct.h"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "rosidl_runtime_c/service_type_support_struct.h"
#include "rosidl_runtime_c/type_description/type_description__struct.h"
#include "rosidl_runtime_c/type_description/type_source__struct.h"
#include "rosidl_runtime_c/type_hash.h"
#include "rosidl_runtime_c/visibility_control.h"
#include "servo_interfaces/msg/rosidl_generator_c__visibility_control.h"

#include "servo_interfaces/msg/detail/goal_position__struct.h"

/// Initialize msg/GoalPosition message.
/**
 * If the init function is called twice for the same message without
 * calling fini inbetween previously allocated memory will be leaked.
 * \param[in,out] msg The previously allocated message pointer.
 * Fields without a default value will not be initialized by this function.
 * You might want to call memset(msg, 0, sizeof(
 * servo_interfaces__msg__GoalPosition
 * )) before or use
 * servo_interfaces__msg__GoalPosition__create()
 * to allocate and initialize the message.
 * \return true if initialization was successful, otherwise false
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__init(servo_interfaces__msg__GoalPosition * msg);

/// Finalize msg/GoalPosition message.
/**
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
void
servo_interfaces__msg__GoalPosition__fini(servo_interfaces__msg__GoalPosition * msg);

/// Create msg/GoalPosition message.
/**
 * It allocates the memory for the message, sets the memory to zero, and
 * calls
 * servo_interfaces__msg__GoalPosition__init().
 * \return The pointer to the initialized message if successful,
 * otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
servo_interfaces__msg__GoalPosition *
servo_interfaces__msg__GoalPosition__create(void);

/// Destroy msg/GoalPosition message.
/**
 * It calls
 * servo_interfaces__msg__GoalPosition__fini()
 * and frees the memory of the message.
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
void
servo_interfaces__msg__GoalPosition__destroy(servo_interfaces__msg__GoalPosition * msg);

/// Check for msg/GoalPosition message equality.
/**
 * \param[in] lhs The message on the left hand size of the equality operator.
 * \param[in] rhs The message on the right hand size of the equality operator.
 * \return true if messages are equal, otherwise false.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__are_equal(const servo_interfaces__msg__GoalPosition * lhs, const servo_interfaces__msg__GoalPosition * rhs);

/// Copy a msg/GoalPosition message.
/**
 * This functions performs a deep copy, as opposed to the shallow copy that
 * plain assignment yields.
 *
 * \param[in] input The source message pointer.
 * \param[out] output The target message pointer, which must
 *   have been initialized before calling this function.
 * \return true if successful, or false if either pointer is null
 *   or memory allocation fails.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__copy(
  const servo_interfaces__msg__GoalPosition * input,
  servo_interfaces__msg__GoalPosition * output);

/// Retrieve pointer to the hash of the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_type_hash_t *
servo_interfaces__msg__GoalPosition__get_type_hash(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_runtime_c__type_description__TypeDescription *
servo_interfaces__msg__GoalPosition__get_type_description(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the single raw source text that defined this type.
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_runtime_c__type_description__TypeSource *
servo_interfaces__msg__GoalPosition__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the recursive raw sources that defined the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
const rosidl_runtime_c__type_description__TypeSource__Sequence *
servo_interfaces__msg__GoalPosition__get_type_description_sources(
  const rosidl_message_type_support_t * type_support);

/// Initialize array of msg/GoalPosition messages.
/**
 * It allocates the memory for the number of elements and calls
 * servo_interfaces__msg__GoalPosition__init()
 * for each element of the array.
 * \param[in,out] array The allocated array pointer.
 * \param[in] size The size / capacity of the array.
 * \return true if initialization was successful, otherwise false
 * If the array pointer is valid and the size is zero it is guaranteed
 # to return true.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__Sequence__init(servo_interfaces__msg__GoalPosition__Sequence * array, size_t size);

/// Finalize array of msg/GoalPosition messages.
/**
 * It calls
 * servo_interfaces__msg__GoalPosition__fini()
 * for each element of the array and frees the memory for the number of
 * elements.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
void
servo_interfaces__msg__GoalPosition__Sequence__fini(servo_interfaces__msg__GoalPosition__Sequence * array);

/// Create array of msg/GoalPosition messages.
/**
 * It allocates the memory for the array and calls
 * servo_interfaces__msg__GoalPosition__Sequence__init().
 * \param[in] size The size / capacity of the array.
 * \return The pointer to the initialized array if successful, otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
servo_interfaces__msg__GoalPosition__Sequence *
servo_interfaces__msg__GoalPosition__Sequence__create(size_t size);

/// Destroy array of msg/GoalPosition messages.
/**
 * It calls
 * servo_interfaces__msg__GoalPosition__Sequence__fini()
 * on the array,
 * and frees the memory of the array.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
void
servo_interfaces__msg__GoalPosition__Sequence__destroy(servo_interfaces__msg__GoalPosition__Sequence * array);

/// Check for msg/GoalPosition message array equality.
/**
 * \param[in] lhs The message array on the left hand size of the equality operator.
 * \param[in] rhs The message array on the right hand size of the equality operator.
 * \return true if message arrays are equal in size and content, otherwise false.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__Sequence__are_equal(const servo_interfaces__msg__GoalPosition__Sequence * lhs, const servo_interfaces__msg__GoalPosition__Sequence * rhs);

/// Copy an array of msg/GoalPosition messages.
/**
 * This functions performs a deep copy, as opposed to the shallow copy that
 * plain assignment yields.
 *
 * \param[in] input The source array pointer.
 * \param[out] output The target array pointer, which must
 *   have been initialized before calling this function.
 * \return true if successful, or false if either pointer
 *   is null or memory allocation fails.
 */
ROSIDL_GENERATOR_C_PUBLIC_servo_interfaces
bool
servo_interfaces__msg__GoalPosition__Sequence__copy(
  const servo_interfaces__msg__GoalPosition__Sequence * input,
  servo_interfaces__msg__GoalPosition__Sequence * output);

#ifdef __cplusplus
}
#endif

#endif  // SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__FUNCTIONS_H_
