// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/GoalPosition.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/goal_position.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__GoalPosition __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__GoalPosition __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct GoalPosition_
{
  using Type = GoalPosition_<ContainerAllocator>;

  explicit GoalPosition_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->x = 0;
      this->y = 0;
      this->w = 0;
      this->h = 0;
    }
  }

  explicit GoalPosition_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->x = 0;
      this->y = 0;
      this->w = 0;
      this->h = 0;
    }
  }

  // field types and members
  using _x_type =
    uint8_t;
  _x_type x;
  using _y_type =
    uint8_t;
  _y_type y;
  using _w_type =
    uint8_t;
  _w_type w;
  using _h_type =
    uint8_t;
  _h_type h;

  // setters for named parameter idiom
  Type & set__x(
    const uint8_t & _arg)
  {
    this->x = _arg;
    return *this;
  }
  Type & set__y(
    const uint8_t & _arg)
  {
    this->y = _arg;
    return *this;
  }
  Type & set__w(
    const uint8_t & _arg)
  {
    this->w = _arg;
    return *this;
  }
  Type & set__h(
    const uint8_t & _arg)
  {
    this->h = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::GoalPosition_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::GoalPosition_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::GoalPosition_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::GoalPosition_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__GoalPosition
    std::shared_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__GoalPosition
    std::shared_ptr<servo_interfaces::msg::GoalPosition_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const GoalPosition_ & other) const
  {
    if (this->x != other.x) {
      return false;
    }
    if (this->y != other.y) {
      return false;
    }
    if (this->w != other.w) {
      return false;
    }
    if (this->h != other.h) {
      return false;
    }
    return true;
  }
  bool operator!=(const GoalPosition_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct GoalPosition_

// alias to use template instance with default allocator
using GoalPosition =
  servo_interfaces::msg::GoalPosition_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__GOAL_POSITION__STRUCT_HPP_
