// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/SetPwm.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_pwm.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__SetPwm __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__SetPwm __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct SetPwm_
{
  using Type = SetPwm_<ContainerAllocator>;

  explicit SetPwm_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->motor_num = 1;
      this->target_position = 90;
      this->speed = 5;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->motor_num = 0;
      this->target_position = 0;
      this->speed = 0;
    }
  }

  explicit SetPwm_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->motor_num = 1;
      this->target_position = 90;
      this->speed = 5;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->motor_num = 0;
      this->target_position = 0;
      this->speed = 0;
    }
  }

  // field types and members
  using _motor_num_type =
    uint8_t;
  _motor_num_type motor_num;
  using _target_position_type =
    uint8_t;
  _target_position_type target_position;
  using _speed_type =
    uint8_t;
  _speed_type speed;

  // setters for named parameter idiom
  Type & set__motor_num(
    const uint8_t & _arg)
  {
    this->motor_num = _arg;
    return *this;
  }
  Type & set__target_position(
    const uint8_t & _arg)
  {
    this->target_position = _arg;
    return *this;
  }
  Type & set__speed(
    const uint8_t & _arg)
  {
    this->speed = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::SetPwm_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::SetPwm_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::SetPwm_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::SetPwm_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__SetPwm
    std::shared_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__SetPwm
    std::shared_ptr<servo_interfaces::msg::SetPwm_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const SetPwm_ & other) const
  {
    if (this->motor_num != other.motor_num) {
      return false;
    }
    if (this->target_position != other.target_position) {
      return false;
    }
    if (this->speed != other.speed) {
      return false;
    }
    return true;
  }
  bool operator!=(const SetPwm_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct SetPwm_

// alias to use template instance with default allocator
using SetPwm =
  servo_interfaces::msg::SetPwm_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_PWM__STRUCT_HPP_
