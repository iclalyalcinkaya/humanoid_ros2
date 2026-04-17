// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice
#include "servo_interfaces/msg/detail/goal_position__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"


bool
servo_interfaces__msg__GoalPosition__init(servo_interfaces__msg__GoalPosition * msg)
{
  if (!msg) {
    return false;
  }
  // x
  // y
  // w
  // h
  return true;
}

void
servo_interfaces__msg__GoalPosition__fini(servo_interfaces__msg__GoalPosition * msg)
{
  if (!msg) {
    return;
  }
  // x
  // y
  // w
  // h
}

bool
servo_interfaces__msg__GoalPosition__are_equal(const servo_interfaces__msg__GoalPosition * lhs, const servo_interfaces__msg__GoalPosition * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // x
  if (lhs->x != rhs->x) {
    return false;
  }
  // y
  if (lhs->y != rhs->y) {
    return false;
  }
  // w
  if (lhs->w != rhs->w) {
    return false;
  }
  // h
  if (lhs->h != rhs->h) {
    return false;
  }
  return true;
}

bool
servo_interfaces__msg__GoalPosition__copy(
  const servo_interfaces__msg__GoalPosition * input,
  servo_interfaces__msg__GoalPosition * output)
{
  if (!input || !output) {
    return false;
  }
  // x
  output->x = input->x;
  // y
  output->y = input->y;
  // w
  output->w = input->w;
  // h
  output->h = input->h;
  return true;
}

servo_interfaces__msg__GoalPosition *
servo_interfaces__msg__GoalPosition__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__GoalPosition * msg = (servo_interfaces__msg__GoalPosition *)allocator.allocate(sizeof(servo_interfaces__msg__GoalPosition), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__msg__GoalPosition));
  bool success = servo_interfaces__msg__GoalPosition__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__msg__GoalPosition__destroy(servo_interfaces__msg__GoalPosition * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__msg__GoalPosition__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__msg__GoalPosition__Sequence__init(servo_interfaces__msg__GoalPosition__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__GoalPosition * data = NULL;

  if (size) {
    data = (servo_interfaces__msg__GoalPosition *)allocator.zero_allocate(size, sizeof(servo_interfaces__msg__GoalPosition), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__msg__GoalPosition__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__msg__GoalPosition__fini(&data[i - 1]);
      }
      allocator.deallocate(data, allocator.state);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
servo_interfaces__msg__GoalPosition__Sequence__fini(servo_interfaces__msg__GoalPosition__Sequence * array)
{
  if (!array) {
    return;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();

  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      servo_interfaces__msg__GoalPosition__fini(&array->data[i]);
    }
    allocator.deallocate(array->data, allocator.state);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

servo_interfaces__msg__GoalPosition__Sequence *
servo_interfaces__msg__GoalPosition__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__GoalPosition__Sequence * array = (servo_interfaces__msg__GoalPosition__Sequence *)allocator.allocate(sizeof(servo_interfaces__msg__GoalPosition__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__msg__GoalPosition__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__msg__GoalPosition__Sequence__destroy(servo_interfaces__msg__GoalPosition__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__msg__GoalPosition__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__msg__GoalPosition__Sequence__are_equal(const servo_interfaces__msg__GoalPosition__Sequence * lhs, const servo_interfaces__msg__GoalPosition__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__msg__GoalPosition__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__msg__GoalPosition__Sequence__copy(
  const servo_interfaces__msg__GoalPosition__Sequence * input,
  servo_interfaces__msg__GoalPosition__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__msg__GoalPosition);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__msg__GoalPosition * data =
      (servo_interfaces__msg__GoalPosition *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__msg__GoalPosition__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__msg__GoalPosition__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__msg__GoalPosition__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
