// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from servo_interfaces:srv/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/srv/motor_angle.hpp"


#ifndef SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_HPP_
#define SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Request __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Request __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct MotorAngle_Request_
{
  using Type = MotorAngle_Request_<ContainerAllocator>;

  explicit MotorAngle_Request_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->motor_num = 1;
      this->target_position = 120;
      this->kp = 0.008;
      this->ki = 0.01;
      this->kd = 0.003;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->motor_num = 0;
      this->target_position = 0;
      this->kp = 0.0;
      this->ki = 0.0;
      this->kd = 0.0;
    }
  }

  explicit MotorAngle_Request_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::DEFAULTS_ONLY == _init)
    {
      this->motor_num = 1;
      this->target_position = 120;
      this->kp = 0.008;
      this->ki = 0.01;
      this->kd = 0.003;
    } else if (rosidl_runtime_cpp::MessageInitialization::ZERO == _init) {
      this->motor_num = 0;
      this->target_position = 0;
      this->kp = 0.0;
      this->ki = 0.0;
      this->kd = 0.0;
    }
  }

  // field types and members
  using _motor_num_type =
    uint8_t;
  _motor_num_type motor_num;
  using _target_position_type =
    uint8_t;
  _target_position_type target_position;
  using _kp_type =
    double;
  _kp_type kp;
  using _ki_type =
    double;
  _ki_type ki;
  using _kd_type =
    double;
  _kd_type kd;

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
  Type & set__kp(
    const double & _arg)
  {
    this->kp = _arg;
    return *this;
  }
  Type & set__ki(
    const double & _arg)
  {
    this->ki = _arg;
    return *this;
  }
  Type & set__kd(
    const double & _arg)
  {
    this->kd = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Request
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Request
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const MotorAngle_Request_ & other) const
  {
    if (this->motor_num != other.motor_num) {
      return false;
    }
    if (this->target_position != other.target_position) {
      return false;
    }
    if (this->kp != other.kp) {
      return false;
    }
    if (this->ki != other.ki) {
      return false;
    }
    if (this->kd != other.kd) {
      return false;
    }
    return true;
  }
  bool operator!=(const MotorAngle_Request_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct MotorAngle_Request_

// alias to use template instance with default allocator
using MotorAngle_Request =
  servo_interfaces::srv::MotorAngle_Request_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace servo_interfaces


#ifndef _WIN32
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Response __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Response __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct MotorAngle_Response_
{
  using Type = MotorAngle_Response_<ContainerAllocator>;

  explicit MotorAngle_Response_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->is_set = false;
    }
  }

  explicit MotorAngle_Response_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->is_set = false;
    }
  }

  // field types and members
  using _is_set_type =
    bool;
  _is_set_type is_set;

  // setters for named parameter idiom
  Type & set__is_set(
    const bool & _arg)
  {
    this->is_set = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Response
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Response
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const MotorAngle_Response_ & other) const
  {
    if (this->is_set != other.is_set) {
      return false;
    }
    return true;
  }
  bool operator!=(const MotorAngle_Response_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct MotorAngle_Response_

// alias to use template instance with default allocator
using MotorAngle_Response =
  servo_interfaces::srv::MotorAngle_Response_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace servo_interfaces


// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Event __attribute__((deprecated))
#else
# define DEPRECATED__servo_interfaces__srv__MotorAngle_Event __declspec(deprecated)
#endif

namespace servo_interfaces
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct MotorAngle_Event_
{
  using Type = MotorAngle_Event_<ContainerAllocator>;

  explicit MotorAngle_Event_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : info(_init)
  {
    (void)_init;
  }

  explicit MotorAngle_Event_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : info(_alloc, _init)
  {
    (void)_init;
  }

  // field types and members
  using _info_type =
    service_msgs::msg::ServiceEventInfo_<ContainerAllocator>;
  _info_type info;
  using _request_type =
    rosidl_runtime_cpp::BoundedVector<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>>;
  _request_type request;
  using _response_type =
    rosidl_runtime_cpp::BoundedVector<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>>;
  _response_type response;

  // setters for named parameter idiom
  Type & set__info(
    const service_msgs::msg::ServiceEventInfo_<ContainerAllocator> & _arg)
  {
    this->info = _arg;
    return *this;
  }
  Type & set__request(
    const rosidl_runtime_cpp::BoundedVector<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::srv::MotorAngle_Request_<ContainerAllocator>>> & _arg)
  {
    this->request = _arg;
    return *this;
  }
  Type & set__response(
    const rosidl_runtime_cpp::BoundedVector<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<servo_interfaces::srv::MotorAngle_Response_<ContainerAllocator>>> & _arg)
  {
    this->response = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> *;
  using ConstRawPtr =
    const servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Event
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__servo_interfaces__srv__MotorAngle_Event
    std::shared_ptr<servo_interfaces::srv::MotorAngle_Event_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const MotorAngle_Event_ & other) const
  {
    if (this->info != other.info) {
      return false;
    }
    if (this->request != other.request) {
      return false;
    }
    if (this->response != other.response) {
      return false;
    }
    return true;
  }
  bool operator!=(const MotorAngle_Event_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct MotorAngle_Event_

// alias to use template instance with default allocator
using MotorAngle_Event =
  servo_interfaces::srv::MotorAngle_Event_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace servo_interfaces

namespace servo_interfaces
{

namespace srv
{

struct MotorAngle
{
  using Request = servo_interfaces::srv::MotorAngle_Request;
  using Response = servo_interfaces::srv::MotorAngle_Response;
  using Event = servo_interfaces::srv::MotorAngle_Event;
};

}  // namespace srv

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__SRV__DETAIL__MOTOR_ANGLE__STRUCT_HPP_
