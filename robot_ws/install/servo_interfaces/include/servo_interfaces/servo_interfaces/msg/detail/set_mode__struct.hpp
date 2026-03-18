// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/SetMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/set_mode.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__SET_MODE__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__SET_MODE__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__SetMode __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__SetMode __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct SetMode_
{
  using Type = SetMode_<ContainerAllocator>;

  explicit SetMode_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->mode = -1;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->mode = 0;
      this->client_id = "";
    }
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->client_id = "";
    }
  }

  explicit SetMode_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : client_id(_alloc)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->mode = -1;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->mode = 0;
      this->client_id = "";
    }
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->client_id = "";
    }
  }

  // field types and members
  using _mode_type =
    int8_t;
  _mode_type mode;
  using _client_id_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _client_id_type client_id;

  // setters for named parameter idiom
  Type & set__mode(
    const int8_t & _arg)
  {
    this->mode = _arg;
    return *this;
  }
  Type & set__client_id(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->client_id = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::SetMode_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::SetMode_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::SetMode_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::SetMode_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__SetMode
    std::shared_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__SetMode
    std::shared_ptr<servo_interfaces::msg::SetMode_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const SetMode_ & other) const
  {
    if (this->mode != other.mode) {
      return false;
    }
    if (this->client_id != other.client_id) {
      return false;
    }
    return true;
  }
  bool operator!=(const SetMode_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct SetMode_

// alias to use template instance with default allocator
using SetMode =
  servo_interfaces::msg::SetMode_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__SET_MODE__STRUCT_HPP_
