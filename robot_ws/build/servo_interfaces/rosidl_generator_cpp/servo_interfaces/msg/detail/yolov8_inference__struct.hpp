// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:msg/Yolov8Inference.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/msg/yolov8_inference.hpp"


#ifndef SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__STRUCT_HPP_
#define SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__struct.hpp"
// Member 'yolov8_inference'
#include "servo_interfaces/msg/detail/inference_result__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__servo_interfaces__msg__Yolov8Inference __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__msg__Yolov8Inference __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct Yolov8Inference_
{
  using Type = Yolov8Inference_<ContainerAllocator>;

  explicit Yolov8Inference_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_init)
  {
    (void)_init;
  }

  explicit Yolov8Inference_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_alloc, _init)
  {
    (void)_init;
  }

  // field types and members
  using _header_type =
    std_msgs::msg::Header_<ContainerAllocator>;
  _header_type header;
  using _yolov8_inference_type =
    std::vector<servo_interfaces::msg::InferenceResult_<ContainerAllocator>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::msg::InferenceResult_<ContainerAllocator>>>;
  _yolov8_inference_type yolov8_inference;

  // setters for named parameter idiom
  Type & set__header(
    const std_msgs::msg::Header_<ContainerAllocator> & _arg)
  {
    this->header = _arg;
    return *this;
  }
  Type & set__yolov8_inference(
    const std::vector<servo_interfaces::msg::InferenceResult_<ContainerAllocator>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::msg::InferenceResult_<ContainerAllocator>>> & _arg)
  {
    this->yolov8_inference = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__msg__Yolov8Inference
    std::shared_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__msg__Yolov8Inference
    std::shared_ptr<servo_interfaces::msg::Yolov8Inference_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const Yolov8Inference_ & other) const
  {
    if (this->header != other.header) {
      return false;
    }
    if (this->yolov8_inference != other.yolov8_inference) {
      return false;
    }
    return true;
  }
  bool operator!=(const Yolov8Inference_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct Yolov8Inference_

// alias to use template instance with default allocator
using Yolov8Inference =
  servo_interfaces::msg::Yolov8Inference_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__MSG__DETAIL__YOLOV8_INFERENCE__STRUCT_HPP_
