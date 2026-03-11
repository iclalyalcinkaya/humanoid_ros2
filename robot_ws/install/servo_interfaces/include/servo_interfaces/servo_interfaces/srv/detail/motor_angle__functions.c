// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice
#include "servo_interfaces/srv/detail/motor_angle__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"

bool
servo_interfaces__srv__MotorAngle_Request__init(servo_interfaces__srv__MotorAngle_Request * msg)
{
  if (!msg) {
    return false;
  }
  // motor_num
  msg->motor_num = 1;
  // target_position
  msg->target_position = 120;
  // kp
  msg->kp = 0.008l;
  // ki
  msg->ki = 0.01l;
  // kd
  msg->kd = 0.003l;
  return true;
}

void
servo_interfaces__srv__MotorAngle_Request__fini(servo_interfaces__srv__MotorAngle_Request * msg)
{
  if (!msg) {
    return;
  }
  // motor_num
  // target_position
  // kp
  // ki
  // kd
}

bool
servo_interfaces__srv__MotorAngle_Request__are_equal(const servo_interfaces__srv__MotorAngle_Request * lhs, const servo_interfaces__srv__MotorAngle_Request * rhs)
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
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Request__copy(
  const servo_interfaces__srv__MotorAngle_Request * input,
  servo_interfaces__srv__MotorAngle_Request * output)
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
  return true;
}

servo_interfaces__srv__MotorAngle_Request *
servo_interfaces__srv__MotorAngle_Request__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Request * msg = (servo_interfaces__srv__MotorAngle_Request *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Request), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__srv__MotorAngle_Request));
  bool success = servo_interfaces__srv__MotorAngle_Request__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__srv__MotorAngle_Request__destroy(servo_interfaces__srv__MotorAngle_Request * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__srv__MotorAngle_Request__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__srv__MotorAngle_Request__Sequence__init(servo_interfaces__srv__MotorAngle_Request__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Request * data = NULL;

  if (size) {
    data = (servo_interfaces__srv__MotorAngle_Request *)allocator.zero_allocate(size, sizeof(servo_interfaces__srv__MotorAngle_Request), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__srv__MotorAngle_Request__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__srv__MotorAngle_Request__fini(&data[i - 1]);
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
servo_interfaces__srv__MotorAngle_Request__Sequence__fini(servo_interfaces__srv__MotorAngle_Request__Sequence * array)
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
      servo_interfaces__srv__MotorAngle_Request__fini(&array->data[i]);
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

servo_interfaces__srv__MotorAngle_Request__Sequence *
servo_interfaces__srv__MotorAngle_Request__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Request__Sequence * array = (servo_interfaces__srv__MotorAngle_Request__Sequence *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Request__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__srv__MotorAngle_Request__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__srv__MotorAngle_Request__Sequence__destroy(servo_interfaces__srv__MotorAngle_Request__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__srv__MotorAngle_Request__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__srv__MotorAngle_Request__Sequence__are_equal(const servo_interfaces__srv__MotorAngle_Request__Sequence * lhs, const servo_interfaces__srv__MotorAngle_Request__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Request__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Request__Sequence__copy(
  const servo_interfaces__srv__MotorAngle_Request__Sequence * input,
  servo_interfaces__srv__MotorAngle_Request__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__srv__MotorAngle_Request);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__srv__MotorAngle_Request * data =
      (servo_interfaces__srv__MotorAngle_Request *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__srv__MotorAngle_Request__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__srv__MotorAngle_Request__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Request__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


bool
servo_interfaces__srv__MotorAngle_Response__init(servo_interfaces__srv__MotorAngle_Response * msg)
{
  if (!msg) {
    return false;
  }
  // is_set
  return true;
}

void
servo_interfaces__srv__MotorAngle_Response__fini(servo_interfaces__srv__MotorAngle_Response * msg)
{
  if (!msg) {
    return;
  }
  // is_set
}

bool
servo_interfaces__srv__MotorAngle_Response__are_equal(const servo_interfaces__srv__MotorAngle_Response * lhs, const servo_interfaces__srv__MotorAngle_Response * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // is_set
  if (lhs->is_set != rhs->is_set) {
    return false;
  }
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Response__copy(
  const servo_interfaces__srv__MotorAngle_Response * input,
  servo_interfaces__srv__MotorAngle_Response * output)
{
  if (!input || !output) {
    return false;
  }
  // is_set
  output->is_set = input->is_set;
  return true;
}

servo_interfaces__srv__MotorAngle_Response *
servo_interfaces__srv__MotorAngle_Response__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Response * msg = (servo_interfaces__srv__MotorAngle_Response *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Response), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__srv__MotorAngle_Response));
  bool success = servo_interfaces__srv__MotorAngle_Response__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__srv__MotorAngle_Response__destroy(servo_interfaces__srv__MotorAngle_Response * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__srv__MotorAngle_Response__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__srv__MotorAngle_Response__Sequence__init(servo_interfaces__srv__MotorAngle_Response__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Response * data = NULL;

  if (size) {
    data = (servo_interfaces__srv__MotorAngle_Response *)allocator.zero_allocate(size, sizeof(servo_interfaces__srv__MotorAngle_Response), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__srv__MotorAngle_Response__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__srv__MotorAngle_Response__fini(&data[i - 1]);
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
servo_interfaces__srv__MotorAngle_Response__Sequence__fini(servo_interfaces__srv__MotorAngle_Response__Sequence * array)
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
      servo_interfaces__srv__MotorAngle_Response__fini(&array->data[i]);
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

servo_interfaces__srv__MotorAngle_Response__Sequence *
servo_interfaces__srv__MotorAngle_Response__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Response__Sequence * array = (servo_interfaces__srv__MotorAngle_Response__Sequence *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Response__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__srv__MotorAngle_Response__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__srv__MotorAngle_Response__Sequence__destroy(servo_interfaces__srv__MotorAngle_Response__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__srv__MotorAngle_Response__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__srv__MotorAngle_Response__Sequence__are_equal(const servo_interfaces__srv__MotorAngle_Response__Sequence * lhs, const servo_interfaces__srv__MotorAngle_Response__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Response__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Response__Sequence__copy(
  const servo_interfaces__srv__MotorAngle_Response__Sequence * input,
  servo_interfaces__srv__MotorAngle_Response__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__srv__MotorAngle_Response);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__srv__MotorAngle_Response * data =
      (servo_interfaces__srv__MotorAngle_Response *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__srv__MotorAngle_Response__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__srv__MotorAngle_Response__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Response__copy(
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
// #include "servo_interfaces/srv/detail/motor_angle__functions.h"

bool
servo_interfaces__srv__MotorAngle_Event__init(servo_interfaces__srv__MotorAngle_Event * msg)
{
  if (!msg) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__init(&msg->info)) {
    servo_interfaces__srv__MotorAngle_Event__fini(msg);
    return false;
  }
  // request
  if (!servo_interfaces__srv__MotorAngle_Request__Sequence__init(&msg->request, 0)) {
    servo_interfaces__srv__MotorAngle_Event__fini(msg);
    return false;
  }
  // response
  if (!servo_interfaces__srv__MotorAngle_Response__Sequence__init(&msg->response, 0)) {
    servo_interfaces__srv__MotorAngle_Event__fini(msg);
    return false;
  }
  return true;
}

void
servo_interfaces__srv__MotorAngle_Event__fini(servo_interfaces__srv__MotorAngle_Event * msg)
{
  if (!msg) {
    return;
  }
  // info
  service_msgs__msg__ServiceEventInfo__fini(&msg->info);
  // request
  servo_interfaces__srv__MotorAngle_Request__Sequence__fini(&msg->request);
  // response
  servo_interfaces__srv__MotorAngle_Response__Sequence__fini(&msg->response);
}

bool
servo_interfaces__srv__MotorAngle_Event__are_equal(const servo_interfaces__srv__MotorAngle_Event * lhs, const servo_interfaces__srv__MotorAngle_Event * rhs)
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
  if (!servo_interfaces__srv__MotorAngle_Request__Sequence__are_equal(
      &(lhs->request), &(rhs->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__srv__MotorAngle_Response__Sequence__are_equal(
      &(lhs->response), &(rhs->response)))
  {
    return false;
  }
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Event__copy(
  const servo_interfaces__srv__MotorAngle_Event * input,
  servo_interfaces__srv__MotorAngle_Event * output)
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
  if (!servo_interfaces__srv__MotorAngle_Request__Sequence__copy(
      &(input->request), &(output->request)))
  {
    return false;
  }
  // response
  if (!servo_interfaces__srv__MotorAngle_Response__Sequence__copy(
      &(input->response), &(output->response)))
  {
    return false;
  }
  return true;
}

servo_interfaces__srv__MotorAngle_Event *
servo_interfaces__srv__MotorAngle_Event__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Event * msg = (servo_interfaces__srv__MotorAngle_Event *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Event), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(servo_interfaces__srv__MotorAngle_Event));
  bool success = servo_interfaces__srv__MotorAngle_Event__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
servo_interfaces__srv__MotorAngle_Event__destroy(servo_interfaces__srv__MotorAngle_Event * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    servo_interfaces__srv__MotorAngle_Event__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
servo_interfaces__srv__MotorAngle_Event__Sequence__init(servo_interfaces__srv__MotorAngle_Event__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Event * data = NULL;

  if (size) {
    data = (servo_interfaces__srv__MotorAngle_Event *)allocator.zero_allocate(size, sizeof(servo_interfaces__srv__MotorAngle_Event), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = servo_interfaces__srv__MotorAngle_Event__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        servo_interfaces__srv__MotorAngle_Event__fini(&data[i - 1]);
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
servo_interfaces__srv__MotorAngle_Event__Sequence__fini(servo_interfaces__srv__MotorAngle_Event__Sequence * array)
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
      servo_interfaces__srv__MotorAngle_Event__fini(&array->data[i]);
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

servo_interfaces__srv__MotorAngle_Event__Sequence *
servo_interfaces__srv__MotorAngle_Event__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  servo_interfaces__srv__MotorAngle_Event__Sequence * array = (servo_interfaces__srv__MotorAngle_Event__Sequence *)allocator.allocate(sizeof(servo_interfaces__srv__MotorAngle_Event__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = servo_interfaces__srv__MotorAngle_Event__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
servo_interfaces__srv__MotorAngle_Event__Sequence__destroy(servo_interfaces__srv__MotorAngle_Event__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    servo_interfaces__srv__MotorAngle_Event__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
servo_interfaces__srv__MotorAngle_Event__Sequence__are_equal(const servo_interfaces__srv__MotorAngle_Event__Sequence * lhs, const servo_interfaces__srv__MotorAngle_Event__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Event__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
servo_interfaces__srv__MotorAngle_Event__Sequence__copy(
  const servo_interfaces__srv__MotorAngle_Event__Sequence * input,
  servo_interfaces__srv__MotorAngle_Event__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(servo_interfaces__srv__MotorAngle_Event);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    servo_interfaces__srv__MotorAngle_Event * data =
      (servo_interfaces__srv__MotorAngle_Event *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!servo_interfaces__srv__MotorAngle_Event__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          servo_interfaces__srv__MotorAngle_Event__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!servo_interfaces__srv__MotorAngle_Event__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
