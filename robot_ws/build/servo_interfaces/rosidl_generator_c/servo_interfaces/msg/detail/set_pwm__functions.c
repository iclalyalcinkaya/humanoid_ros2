// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice
#include "servo_interfaces/msg/detail/set_pwm__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"


bool
servo_interfaces__msg__SetPwm__init(servo_interfaces__msg__SetPwm * msg)
{
  if (!msg) {
    return false;
  }
  // motor_num
  msg->motor_num = 1;
  // target_position
  msg->target_position = 90;
  // speed
  msg->speed = 5;
  return true;
}

void
servo_interfaces__msg__SetPwm__fini(servo_interfaces__msg__SetPwm * msg)
{
  if (!msg) {
    return;
  }
  // motor_num
  // target_position
  // speed
}

bool
servo_interfaces__msg__SetPwm__are_equal(const servo_interfaces__msg__SetPwm * lhs, const servo_interfaces__msg__SetPwm * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // motor_num
  if (lhs->motor_num != rhs->motor_num) {
    return false;
  }
  // target_position
  if (lhs->target_position != rhs->target_position) {
    return false;
  }
  // speed
  if (lhs->speed != rhs->speed) {
    return false;
  }
  return true;
}

bool
servo_interfaces__msg__SetPwm__copy(
  const servo_interfaces__msg__SetPwm * input,
  servo_interfaces__msg__SetPwm * output)
{
  if (!input || !output) {
    return false;
  }
  // motor_num
  output->motor_num = input->motor_num;
  // target_position
  output->target_position = input->target_position;
  // speed
  output->speed = input->speed;
  return true;
}

servo_interfaces__msg__SetPwm *
servo_interfaces__msg__SetPwm__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__SetPwm * msg = (servo_interfaces__msg__SetPwm *)allocator.allocate(sizeof(servo_interfaces__msg__SetPwm), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__msg__SetPwm));
  bool success = servo_interfaces__msg__SetPwm__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__msg__SetPwm__destroy(servo_interfaces__msg__SetPwm * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__msg__SetPwm__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__msg__SetPwm__Sequence__init(servo_interfaces__msg__SetPwm__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__SetPwm * data = NULL;

  if (size) {
    data = (servo_interfaces__msg__SetPwm *)allocator.zero_allocate(size, sizeof(servo_interfaces__msg__SetPwm), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__msg__SetPwm__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__msg__SetPwm__fini(&data[i - 1]);
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
servo_interfaces__msg__SetPwm__Sequence__fini(servo_interfaces__msg__SetPwm__Sequence * array)
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
      servo_interfaces__msg__SetPwm__fini(&array->data[i]);
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

servo_interfaces__msg__SetPwm__Sequence *
servo_interfaces__msg__SetPwm__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__msg__SetPwm__Sequence * array = (servo_interfaces__msg__SetPwm__Sequence *)allocator.allocate(sizeof(servo_interfaces__msg__SetPwm__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__msg__SetPwm__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__msg__SetPwm__Sequence__destroy(servo_interfaces__msg__SetPwm__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__msg__SetPwm__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__msg__SetPwm__Sequence__are_equal(const servo_interfaces__msg__SetPwm__Sequence * lhs, const servo_interfaces__msg__SetPwm__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__msg__SetPwm__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__msg__SetPwm__Sequence__copy(
  const servo_interfaces__msg__SetPwm__Sequence * input,
  servo_interfaces__msg__SetPwm__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__msg__SetPwm);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__msg__SetPwm * data =
      (servo_interfaces__msg__SetPwm *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__msg__SetPwm__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__msg__SetPwm__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__msg__SetPwm__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
