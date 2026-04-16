// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/InferenceResult.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/inference_result.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__InferenceResult __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__InferenceResult __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct InferenceResult_
{
  using Type = InferenceResult_<ContainerAllocator>;

  explicit InferenceResult_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->class_name = "";
      this->top = 0ll;
      this->left = 0ll;
      this->bottom = 0ll;
      this->right = 0ll;
      this->id_n = 0ll;
    }
  }

  explicit InferenceResult_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : class_name(_alloc)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->class_name = "";
      this->top = 0ll;
      this->left = 0ll;
      this->bottom = 0ll;
      this->right = 0ll;
      this->id_n = 0ll;
    }
  }

  // field types and members
  using _class_name_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _class_name_type class_name;
  using _top_type =
    int64_t;
  _top_type top;
  using _left_type =
    int64_t;
  _left_type left;
  using _bottom_type =
    int64_t;
  _bottom_type bottom;
  using _right_type =
    int64_t;
  _right_type right;
  using _id_n_type =
    int64_t;
  _id_n_type id_n;

  // setters for named parameter idiom
  Type & set__class_name(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->class_name = _arg;
    return *this;
  }
  Type & set__top(
    const int64_t & _arg)
  {
    this->top = _arg;
    return *this;
  }
  Type & set__left(
    const int64_t & _arg)
  {
    this->left = _arg;
    return *this;
  }
  Type & set__bottom(
    const int64_t & _arg)
  {
    this->bottom = _arg;
    return *this;
  }
  Type & set__right(
    const int64_t & _arg)
  {
    this->right = _arg;
    return *this;
  }
  Type & set__id_n(
    const int64_t & _arg)
  {
    this->id_n = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::InferenceResult_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::InferenceResult_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::InferenceResult_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::InferenceResult_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__InferenceResult
    std::shared_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__InferenceResult
    std::shared_ptr<servo_interfaces::msg::InferenceResult_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const InferenceResult_ & other) const
  {
    if (this->class_name != other.class_name) {
      return false;
    }
    if (this->top != other.top) {
      return false;
    }
    if (this->left != other.left) {
      return false;
    }
    if (this->bottom != other.bottom) {
      return false;
    }
    if (this->right != other.right) {
      return false;
    }
    if (this->id_n != other.id_n) {
      return false;
    }
    return true;
  }
  bool operator!=(const InferenceResult_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct InferenceResult_

// alias to use template instance with default allocator
using InferenceResult =
  servo_interfaces::msg::InferenceResult_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__INFERENCE_RESULT__STRUCT_HPP_
