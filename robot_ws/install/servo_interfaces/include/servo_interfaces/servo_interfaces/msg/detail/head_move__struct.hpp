// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/HeadMove.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/head_move.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__HeadMove __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__HeadMove __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct HeadMove_
{
  using Type = HeadMove_<ContainerAllocator>;

  explicit HeadMove_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->pan = 0;
      this->tilt = 0;
    }
  }

  explicit HeadMove_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->pan = 0;
      this->tilt = 0;
    }
  }

  // field types and members
  using _pan_type =
    int16_t;
  _pan_type pan;
  using _tilt_type =
    int16_t;
  _tilt_type tilt;

  // setters for named parameter idiom
  Type & set__pan(
    const int16_t & _arg)
  {
    this->pan = _arg;
    return *this;
  }
  Type & set__tilt(
    const int16_t & _arg)
  {
    this->tilt = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::HeadMove_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::HeadMove_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::HeadMove_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::HeadMove_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__HeadMove
    std::shared_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__HeadMove
    std::shared_ptr<servo_interfaces::msg::HeadMove_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const HeadMove_ & other) const
  {
    if (this->pan != other.pan) {
      return false;
    }
    if (this->tilt != other.tilt) {
      return false;
    }
    return true;
  }
  bool operator!=(const HeadMove_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct HeadMove_

// alias to use template instance with default allocator
using HeadMove =
  servo_interfaces::msg::HeadMove_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__HEAD_MOVE__STRUCT_HPP_
