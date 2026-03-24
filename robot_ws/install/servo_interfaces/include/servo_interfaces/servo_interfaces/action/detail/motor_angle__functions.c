// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from servo_interfaces:action/MotorAngle.idl
// generated code does not contain a copyright notice
#include "servo_interfaces/action/detail/motor_angle__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"


// Include directives for member types
// Member `client_id`
#include "rosidl_runtime_c/string_functions.h"

bool
servo_interfaces__action__MotorAngle_Goal__init(servo_interfaces__action__MotorAngle_Goal * msg)
{
  if (!msg) {
    return false;
  }
  // motor_num
  // target_position
  // kp
  // ki
  // kd
  // speed
  // client_id
  if (!rosidl_runtime_c__String__init(&msg->client_id)) {
    servo_interfaces__action__MotorAngle_Goal__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_Goal__fini(servo_interfaces__action__MotorAngle_Goal * msg)
{
  if (!msg) {
    return;
  }
  // motor_num
  // target_position
  // kp
  // ki
  // kd
  // speed
  // client_id
  rosidl_runtime_c__String__fini(&msg->client_id);
}

bool
servo_interfaces__action__MotorAngle_Goal__are_equal(const servo_interfaces__action__MotorAngle_Goal * lhs, const servo_interfaces__action__MotorAngle_Goal * rhs)
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
  // kp
  if (lhs->kp != rhs->kp) {
    return false;
  }
  // ki
  if (lhs->ki != rhs->ki) {
    return false;
  }
  // kd
  if (lhs->kd != rhs->kd) {
    return false;
  }
  // speed
  if (lhs->speed != rhs->speed) {
    return false;
  }
  // client_id
  if (!rosidl_runtime_c__String__are_equal(
      &(lhs->client_id), &(rhs->client_id)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Goal__copy(
  const servo_interfaces__action__MotorAngle_Goal * input,
  servo_interfaces__action__MotorAngle_Goal * output)
{
  if (!input || !output) {
    return false;
  }
  // motor_num
  output->motor_num = input->motor_num;
  // target_position
  output->target_position = input->target_position;
  // kp
  output->kp = input->kp;
  // ki
  output->ki = input->ki;
  // kd
  output->kd = input->kd;
  // speed
  output->speed = input->speed;
  // client_id
  if (!rosidl_runtime_c__String__copy(
      &(input->client_id), &(output->client_id)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_Goal *
servo_interfaces__action__MotorAngle_Goal__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Goal * msg = (servo_interfaces__action__MotorAngle_Goal *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Goal), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_Goal));
  bool success = servo_interfaces__action__MotorAngle_Goal__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_Goal__destroy(servo_interfaces__action__MotorAngle_Goal * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_Goal__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_Goal__Sequence__init(servo_interfaces__action__MotorAngle_Goal__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Goal * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_Goal *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_Goal), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_Goal__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_Goal__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_Goal__Sequence__fini(servo_interfaces__action__MotorAngle_Goal__Sequence * array)
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
      servo_interfaces__action__MotorAngle_Goal__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_Goal__Sequence *
servo_interfaces__action__MotorAngle_Goal__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Goal__Sequence * array = (servo_interfaces__action__MotorAngle_Goal__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Goal__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_Goal__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_Goal__Sequence__destroy(servo_interfaces__action__MotorAngle_Goal__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_Goal__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_Goal__Sequence__are_equal(const servo_interfaces__action__MotorAngle_Goal__Sequence * lhs, const servo_interfaces__action__MotorAngle_Goal__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Goal__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Goal__Sequence__copy(
  const servo_interfaces__action__MotorAngle_Goal__Sequence * input,
  servo_interfaces__action__MotorAngle_Goal__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_Goal);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_Goal * data =
      (servo_interfaces__action__MotorAngle_Goal *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_Goal__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_Goal__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Goal__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


bool
servo_interfaces__action__MotorAngle_Result__init(servo_interfaces__action__MotorAngle_Result * msg)
{
  if (!msg) {
    return false;
  }
  // success
  return true;
}

void
servo_interfaces__action__MotorAngle_Result__fini(servo_interfaces__action__MotorAngle_Result * msg)
{
  if (!msg) {
    return;
  }
  // success
}

bool
servo_interfaces__action__MotorAngle_Result__are_equal(const servo_interfaces__action__MotorAngle_Result * lhs, const servo_interfaces__action__MotorAngle_Result * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // success
  if (lhs->success != rhs->success) {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Result__copy(
  const servo_interfaces__action__MotorAngle_Result * input,
  servo_interfaces__action__MotorAngle_Result * output)
{
  if (!input || !output) {
    return false;
  }
  // success
  output->success = input->success;
  return true;
}

servo_interfaces__action__MotorAngle_Result *
servo_interfaces__action__MotorAngle_Result__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Result * msg = (servo_interfaces__action__MotorAngle_Result *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Result), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_Result));
  bool success = servo_interfaces__action__MotorAngle_Result__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_Result__destroy(servo_interfaces__action__MotorAngle_Result * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_Result__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_Result__Sequence__init(servo_interfaces__action__MotorAngle_Result__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Result * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_Result *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_Result), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_Result__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_Result__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_Result__Sequence__fini(servo_interfaces__action__MotorAngle_Result__Sequence * array)
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
      servo_interfaces__action__MotorAngle_Result__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_Result__Sequence *
servo_interfaces__action__MotorAngle_Result__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Result__Sequence * array = (servo_interfaces__action__MotorAngle_Result__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Result__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_Result__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_Result__Sequence__destroy(servo_interfaces__action__MotorAngle_Result__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_Result__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_Result__Sequence__are_equal(const servo_interfaces__action__MotorAngle_Result__Sequence * lhs, const servo_interfaces__action__MotorAngle_Result__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Result__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Result__Sequence__copy(
  const servo_interfaces__action__MotorAngle_Result__Sequence * input,
  servo_interfaces__action__MotorAngle_Result__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_Result);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_Result * data =
      (servo_interfaces__action__MotorAngle_Result *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_Result__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_Result__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Result__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


bool
servo_interfaces__action__MotorAngle_Feedback__init(servo_interfaces__action__MotorAngle_Feedback * msg)
{
  if (!msg) {
    return false;
  }
  // current_position
  return true;
}

void
servo_interfaces__action__MotorAngle_Feedback__fini(servo_interfaces__action__MotorAngle_Feedback * msg)
{
  if (!msg) {
    return;
  }
  // current_position
}

bool
servo_interfaces__action__MotorAngle_Feedback__are_equal(const servo_interfaces__action__MotorAngle_Feedback * lhs, const servo_interfaces__action__MotorAngle_Feedback * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // current_position
  if (lhs->current_position != rhs->current_position) {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Feedback__copy(
  const servo_interfaces__action__MotorAngle_Feedback * input,
  servo_interfaces__action__MotorAngle_Feedback * output)
{
  if (!input || !output) {
    return false;
  }
  // current_position
  output->current_position = input->current_position;
  return true;
}

servo_interfaces__action__MotorAngle_Feedback *
servo_interfaces__action__MotorAngle_Feedback__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Feedback * msg = (servo_interfaces__action__MotorAngle_Feedback *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Feedback), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_Feedback));
  bool success = servo_interfaces__action__MotorAngle_Feedback__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_Feedback__destroy(servo_interfaces__action__MotorAngle_Feedback * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_Feedback__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_Feedback__Sequence__init(servo_interfaces__action__MotorAngle_Feedback__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Feedback * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_Feedback *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_Feedback), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_Feedback__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_Feedback__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_Feedback__Sequence__fini(servo_interfaces__action__MotorAngle_Feedback__Sequence * array)
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
      servo_interfaces__action__MotorAngle_Feedback__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_Feedback__Sequence *
servo_interfaces__action__MotorAngle_Feedback__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_Feedback__Sequence * array = (servo_interfaces__action__MotorAngle_Feedback__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_Feedback__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_Feedback__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_Feedback__Sequence__destroy(servo_interfaces__action__MotorAngle_Feedback__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_Feedback__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_Feedback__Sequence__are_equal(const servo_interfaces__action__MotorAngle_Feedback__Sequence * lhs, const servo_interfaces__action__MotorAngle_Feedback__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Feedback__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_Feedback__Sequence__copy(
  const servo_interfaces__action__MotorAngle_Feedback__Sequence * input,
  servo_interfaces__action__MotorAngle_Feedback__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_Feedback);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_Feedback * data =
      (servo_interfaces__action__MotorAngle_Feedback *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_Feedback__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_Feedback__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_Feedback__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `goal_id`
#include "unique_identifier_msgs/msg/detail/uuid__functions.h"
// Member `goal`
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"

bool
servo_interfaces__action__MotorAngle_SendGoal_Request__init(servo_interfaces__action__MotorAngle_SendGoal_Request * msg)
{
  if (!msg) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__init(&msg->goal_id)) {
    servo_interfaces__action__MotorAngle_SendGoal_Request__fini(msg);
    return false;
  }
  // goal
  if (!servo_interfaces__action__MotorAngle_Goal__init(&msg->goal)) {
    servo_interfaces__action__MotorAngle_SendGoal_Request__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Request__fini(servo_interfaces__action__MotorAngle_SendGoal_Request * msg)
{
  if (!msg) {
    return;
  }
  // goal_id
  unique_identifier_msgs__msg__UUID__fini(&msg->goal_id);
  // goal
  servo_interfaces__action__MotorAngle_Goal__fini(&msg->goal);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Request__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Request * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Request * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__are_equal(
      &(lhs->goal_id), &(rhs->goal_id)))
  {
    return false;
  }
  // goal
  if (!servo_interfaces__action__MotorAngle_Goal__are_equal(
      &(lhs->goal), &(rhs->goal)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Request__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Request * input,
  servo_interfaces__action__MotorAngle_SendGoal_Request * output)
{
  if (!input || !output) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__copy(
      &(input->goal_id), &(output->goal_id)))
  {
    return false;
  }
  // goal
  if (!servo_interfaces__action__MotorAngle_Goal__copy(
      &(input->goal), &(output->goal)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_SendGoal_Request *
servo_interfaces__action__MotorAngle_SendGoal_Request__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Request * msg = (servo_interfaces__action__MotorAngle_SendGoal_Request *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Request), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Request));
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Request__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Request__destroy(servo_interfaces__action__MotorAngle_SendGoal_Request * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_SendGoal_Request__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__init(servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Request * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_SendGoal_Request *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Request), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_SendGoal_Request__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_SendGoal_Request__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__fini(servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * array)
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
      servo_interfaces__action__MotorAngle_SendGoal_Request__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence *
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * array = (servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__destroy(servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Request__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * input,
  servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_SendGoal_Request);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_SendGoal_Request * data =
      (servo_interfaces__action__MotorAngle_SendGoal_Request *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_SendGoal_Request__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_SendGoal_Request__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Request__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `stamp`
#include "builtin_interfaces/msg/detail/time__functions.h"

bool
servo_interfaces__action__MotorAngle_SendGoal_Response__init(servo_interfaces__action__MotorAngle_SendGoal_Response * msg)
{
  if (!msg) {
    return false;
  }
  // accepted
  // stamp
  if (!builtin_interfaces__msg__Time__init(&msg->stamp)) {
    servo_interfaces__action__MotorAngle_SendGoal_Response__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Response__fini(servo_interfaces__action__MotorAngle_SendGoal_Response * msg)
{
  if (!msg) {
    return;
  }
  // accepted
  // stamp
  builtin_interfaces__msg__Time__fini(&msg->stamp);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Response__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Response * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Response * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // accepted
  if (lhs->accepted != rhs->accepted) {
    return false;
  }
  // stamp
  if (!builtin_interfaces__msg__Time__are_equal(
      &(lhs->stamp), &(rhs->stamp)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Response__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Response * input,
  servo_interfaces__action__MotorAngle_SendGoal_Response * output)
{
  if (!input || !output) {
    return false;
  }
  // accepted
  output->accepted = input->accepted;
  // stamp
  if (!builtin_interfaces__msg__Time__copy(
      &(input->stamp), &(output->stamp)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_SendGoal_Response *
servo_interfaces__action__MotorAngle_SendGoal_Response__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Response * msg = (servo_interfaces__action__MotorAngle_SendGoal_Response *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Response), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Response));
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Response__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Response__destroy(servo_interfaces__action__MotorAngle_SendGoal_Response * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_SendGoal_Response__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__init(servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Response * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_SendGoal_Response *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Response), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_SendGoal_Response__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_SendGoal_Response__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__fini(servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * array)
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
      servo_interfaces__action__MotorAngle_SendGoal_Response__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence *
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * array = (servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__destroy(servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Response__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * input,
  servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_SendGoal_Response);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_SendGoal_Response * data =
      (servo_interfaces__action__MotorAngle_SendGoal_Response *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_SendGoal_Response__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_SendGoal_Response__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Response__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `info`
#include "service_msgs/msg/detail/service_event_info__functions.h"
// Member `request`
// Member `response`
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"

bool
servo_interfaces__action__MotorAngle_SendGoal_Event__init(servo_interfaces__action__MotorAngle_SendGoal_Event * msg)
{
  if (!msg) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__init(&msg->info)) {
    servo_interfaces__action__MotorAngle_SendGoal_Event__fini(msg);
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__init(&msg->request, 0)) {
    servo_interfaces__action__MotorAngle_SendGoal_Event__fini(msg);
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__init(&msg->response, 0)) {
    servo_interfaces__action__MotorAngle_SendGoal_Event__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Event__fini(servo_interfaces__action__MotorAngle_SendGoal_Event * msg)
{
  if (!msg) {
    return;
  }
  // info
  service_msgs__msg__ServiceEventInfo__fini(&msg->info);
  // request
  servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__fini(&msg->request);
  // response
  servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__fini(&msg->response);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Event__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Event * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Event * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__are_equal(
      &(lhs->info), &(rhs->info)))
  {
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__are_equal(
      &(lhs->request), &(rhs->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__are_equal(
      &(lhs->response), &(rhs->response)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Event__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Event * input,
  servo_interfaces__action__MotorAngle_SendGoal_Event * output)
{
  if (!input || !output) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__copy(
      &(input->info), &(output->info)))
  {
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_SendGoal_Request__Sequence__copy(
      &(input->request), &(output->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_SendGoal_Response__Sequence__copy(
      &(input->response), &(output->response)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_SendGoal_Event *
servo_interfaces__action__MotorAngle_SendGoal_Event__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Event * msg = (servo_interfaces__action__MotorAngle_SendGoal_Event *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Event), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Event));
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Event__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Event__destroy(servo_interfaces__action__MotorAngle_SendGoal_Event * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_SendGoal_Event__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__init(servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Event * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_SendGoal_Event *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_SendGoal_Event), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_SendGoal_Event__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_SendGoal_Event__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__fini(servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * array)
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
      servo_interfaces__action__MotorAngle_SendGoal_Event__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence *
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * array = (servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__destroy(servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__are_equal(const servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * lhs, const servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Event__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence__copy(
  const servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * input,
  servo_interfaces__action__MotorAngle_SendGoal_Event__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_SendGoal_Event);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_SendGoal_Event * data =
      (servo_interfaces__action__MotorAngle_SendGoal_Event *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_SendGoal_Event__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_SendGoal_Event__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_SendGoal_Event__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `goal_id`
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__functions.h"

bool
servo_interfaces__action__MotorAngle_GetResult_Request__init(servo_interfaces__action__MotorAngle_GetResult_Request * msg)
{
  if (!msg) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__init(&msg->goal_id)) {
    servo_interfaces__action__MotorAngle_GetResult_Request__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_GetResult_Request__fini(servo_interfaces__action__MotorAngle_GetResult_Request * msg)
{
  if (!msg) {
    return;
  }
  // goal_id
  unique_identifier_msgs__msg__UUID__fini(&msg->goal_id);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Request__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Request * lhs, const servo_interfaces__action__MotorAngle_GetResult_Request * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__are_equal(
      &(lhs->goal_id), &(rhs->goal_id)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Request__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Request * input,
  servo_interfaces__action__MotorAngle_GetResult_Request * output)
{
  if (!input || !output) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__copy(
      &(input->goal_id), &(output->goal_id)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_GetResult_Request *
servo_interfaces__action__MotorAngle_GetResult_Request__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Request * msg = (servo_interfaces__action__MotorAngle_GetResult_Request *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Request), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_GetResult_Request));
  bool success = servo_interfaces__action__MotorAngle_GetResult_Request__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_GetResult_Request__destroy(servo_interfaces__action__MotorAngle_GetResult_Request * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_GetResult_Request__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__init(servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Request * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_GetResult_Request *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_GetResult_Request), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_GetResult_Request__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_GetResult_Request__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__fini(servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * array)
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
      servo_interfaces__action__MotorAngle_GetResult_Request__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_GetResult_Request__Sequence *
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * array = (servo_interfaces__action__MotorAngle_GetResult_Request__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Request__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__destroy(servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * lhs, const servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Request__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * input,
  servo_interfaces__action__MotorAngle_GetResult_Request__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_GetResult_Request);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_GetResult_Request * data =
      (servo_interfaces__action__MotorAngle_GetResult_Request *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_GetResult_Request__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_GetResult_Request__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Request__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `result`
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"

bool
servo_interfaces__action__MotorAngle_GetResult_Response__init(servo_interfaces__action__MotorAngle_GetResult_Response * msg)
{
  if (!msg) {
    return false;
  }
  // status
  // result
  if (!servo_interfaces__action__MotorAngle_Result__init(&msg->result)) {
    servo_interfaces__action__MotorAngle_GetResult_Response__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_GetResult_Response__fini(servo_interfaces__action__MotorAngle_GetResult_Response * msg)
{
  if (!msg) {
    return;
  }
  // status
  // result
  servo_interfaces__action__MotorAngle_Result__fini(&msg->result);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Response__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Response * lhs, const servo_interfaces__action__MotorAngle_GetResult_Response * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // status
  if (lhs->status != rhs->status) {
    return false;
  }
  // result
  if (!servo_interfaces__action__MotorAngle_Result__are_equal(
      &(lhs->result), &(rhs->result)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Response__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Response * input,
  servo_interfaces__action__MotorAngle_GetResult_Response * output)
{
  if (!input || !output) {
    return false;
  }
  // status
  output->status = input->status;
  // result
  if (!servo_interfaces__action__MotorAngle_Result__copy(
      &(input->result), &(output->result)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_GetResult_Response *
servo_interfaces__action__MotorAngle_GetResult_Response__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Response * msg = (servo_interfaces__action__MotorAngle_GetResult_Response *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Response), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_GetResult_Response));
  bool success = servo_interfaces__action__MotorAngle_GetResult_Response__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_GetResult_Response__destroy(servo_interfaces__action__MotorAngle_GetResult_Response * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_GetResult_Response__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__init(servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Response * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_GetResult_Response *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_GetResult_Response), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_GetResult_Response__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_GetResult_Response__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__fini(servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * array)
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
      servo_interfaces__action__MotorAngle_GetResult_Response__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_GetResult_Response__Sequence *
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * array = (servo_interfaces__action__MotorAngle_GetResult_Response__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Response__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__destroy(servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * lhs, const servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Response__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * input,
  servo_interfaces__action__MotorAngle_GetResult_Response__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_GetResult_Response);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_GetResult_Response * data =
      (servo_interfaces__action__MotorAngle_GetResult_Response *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_GetResult_Response__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_GetResult_Response__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Response__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `info`
// already included above
// #include "service_msgs/msg/detail/service_event_info__functions.h"
// Member `request`
// Member `response`
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"

bool
servo_interfaces__action__MotorAngle_GetResult_Event__init(servo_interfaces__action__MotorAngle_GetResult_Event * msg)
{
  if (!msg) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__init(&msg->info)) {
    servo_interfaces__action__MotorAngle_GetResult_Event__fini(msg);
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__init(&msg->request, 0)) {
    servo_interfaces__action__MotorAngle_GetResult_Event__fini(msg);
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__init(&msg->response, 0)) {
    servo_interfaces__action__MotorAngle_GetResult_Event__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_GetResult_Event__fini(servo_interfaces__action__MotorAngle_GetResult_Event * msg)
{
  if (!msg) {
    return;
  }
  // info
  service_msgs__msg__ServiceEventInfo__fini(&msg->info);
  // request
  servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__fini(&msg->request);
  // response
  servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__fini(&msg->response);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Event__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Event * lhs, const servo_interfaces__action__MotorAngle_GetResult_Event * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__are_equal(
      &(lhs->info), &(rhs->info)))
  {
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__are_equal(
      &(lhs->request), &(rhs->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__are_equal(
      &(lhs->response), &(rhs->response)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Event__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Event * input,
  servo_interfaces__action__MotorAngle_GetResult_Event * output)
{
  if (!input || !output) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__copy(
      &(input->info), &(output->info)))
  {
    return false;
  }
  // request
  if (!servo_interfaces__action__MotorAngle_GetResult_Request__Sequence__copy(
      &(input->request), &(output->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__action__MotorAngle_GetResult_Response__Sequence__copy(
      &(input->response), &(output->response)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_GetResult_Event *
servo_interfaces__action__MotorAngle_GetResult_Event__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Event * msg = (servo_interfaces__action__MotorAngle_GetResult_Event *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Event), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_GetResult_Event));
  bool success = servo_interfaces__action__MotorAngle_GetResult_Event__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_GetResult_Event__destroy(servo_interfaces__action__MotorAngle_GetResult_Event * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_GetResult_Event__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__init(servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Event * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_GetResult_Event *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_GetResult_Event), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_GetResult_Event__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_GetResult_Event__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__fini(servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * array)
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
      servo_interfaces__action__MotorAngle_GetResult_Event__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_GetResult_Event__Sequence *
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * array = (servo_interfaces__action__MotorAngle_GetResult_Event__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_GetResult_Event__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__destroy(servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__are_equal(const servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * lhs, const servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Event__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_GetResult_Event__Sequence__copy(
  const servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * input,
  servo_interfaces__action__MotorAngle_GetResult_Event__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_GetResult_Event);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_GetResult_Event * data =
      (servo_interfaces__action__MotorAngle_GetResult_Event *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_GetResult_Event__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_GetResult_Event__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_GetResult_Event__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `goal_id`
// already included above
// #include "unique_identifier_msgs/msg/detail/uuid__functions.h"
// Member `feedback`
// already included above
// #include "servo_interfaces/action/detail/motor_angle__functions.h"

bool
servo_interfaces__action__MotorAngle_FeedbackMessage__init(servo_interfaces__action__MotorAngle_FeedbackMessage * msg)
{
  if (!msg) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__init(&msg->goal_id)) {
    servo_interfaces__action__MotorAngle_FeedbackMessage__fini(msg);
    return false;
  }
  // feedback
  if (!servo_interfaces__action__MotorAngle_Feedback__init(&msg->feedback)) {
    servo_interfaces__action__MotorAngle_FeedbackMessage__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__action__MotorAngle_FeedbackMessage__fini(servo_interfaces__action__MotorAngle_FeedbackMessage * msg)
{
  if (!msg) {
    return;
  }
  // goal_id
  unique_identifier_msgs__msg__UUID__fini(&msg->goal_id);
  // feedback
  servo_interfaces__action__MotorAngle_Feedback__fini(&msg->feedback);
}

bool
servo_interfaces__action__MotorAngle_FeedbackMessage__are_equal(const servo_interfaces__action__MotorAngle_FeedbackMessage * lhs, const servo_interfaces__action__MotorAngle_FeedbackMessage * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__are_equal(
      &(lhs->goal_id), &(rhs->goal_id)))
  {
    return false;
  }
  // feedback
  if (!servo_interfaces__action__MotorAngle_Feedback__are_equal(
      &(lhs->feedback), &(rhs->feedback)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_FeedbackMessage__copy(
  const servo_interfaces__action__MotorAngle_FeedbackMessage * input,
  servo_interfaces__action__MotorAngle_FeedbackMessage * output)
{
  if (!input || !output) {
    return false;
  }
  // goal_id
  if (!unique_identifier_msgs__msg__UUID__copy(
      &(input->goal_id), &(output->goal_id)))
  {
    return false;
  }
  // feedback
  if (!servo_interfaces__action__MotorAngle_Feedback__copy(
      &(input->feedback), &(output->feedback)))
  {
    return false;
  }
  return true;
}

servo_interfaces__action__MotorAngle_FeedbackMessage *
servo_interfaces__action__MotorAngle_FeedbackMessage__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_FeedbackMessage * msg = (servo_interfaces__action__MotorAngle_FeedbackMessage *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_FeedbackMessage), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__action__MotorAngle_FeedbackMessage));
  bool success = servo_interfaces__action__MotorAngle_FeedbackMessage__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__action__MotorAngle_FeedbackMessage__destroy(servo_interfaces__action__MotorAngle_FeedbackMessage * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__action__MotorAngle_FeedbackMessage__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__init(servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_FeedbackMessage * data = NULL;

  if (size) {
    data = (servo_interfaces__action__MotorAngle_FeedbackMessage *)allocator.zero_allocate(size, sizeof(servo_interfaces__action__MotorAngle_FeedbackMessage), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__action__MotorAngle_FeedbackMessage__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__action__MotorAngle_FeedbackMessage__fini(&data[i - 1]);
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
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__fini(servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * array)
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
      servo_interfaces__action__MotorAngle_FeedbackMessage__fini(&array->data[i]);
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

servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence *
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * array = (servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence *)allocator.allocate(sizeof(servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__destroy(servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__are_equal(const servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * lhs, const servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_FeedbackMessage__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence__copy(
  const servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * input,
  servo_interfaces__action__MotorAngle_FeedbackMessage__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__action__MotorAngle_FeedbackMessage);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__action__MotorAngle_FeedbackMessage * data =
      (servo_interfaces__action__MotorAngle_FeedbackMessage *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__action__MotorAngle_FeedbackMessage__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__action__MotorAngle_FeedbackMessage__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__action__MotorAngle_FeedbackMessage__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
