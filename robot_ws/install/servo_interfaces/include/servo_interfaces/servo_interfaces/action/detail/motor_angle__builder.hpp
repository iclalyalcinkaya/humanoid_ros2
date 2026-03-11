// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from servo_interfaces:action/MotorAngle.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "servo_interfaces/action/motor_angle.hpp"


#ifndef SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__BUILDER_HPP_
#define SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "servo_interfaces/action/detail/motor_angle__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_Goal_client_id
{
public:
  explicit Init_MotorAngle_Goal_client_id(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_Goal client_id(::servo_interfaces::action::MotorAngle_Goal::_client_id_type arg)
  {
    msg_.client_id = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_speed
{
public:
  explicit Init_MotorAngle_Goal_speed(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Goal_client_id speed(::servo_interfaces::action::MotorAngle_Goal::_speed_type arg)
  {
    msg_.speed = std::move(arg);
    return Init_MotorAngle_Goal_client_id(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_kd
{
public:
  explicit Init_MotorAngle_Goal_kd(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Goal_speed kd(::servo_interfaces::action::MotorAngle_Goal::_kd_type arg)
  {
    msg_.kd = std::move(arg);
    return Init_MotorAngle_Goal_speed(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_ki
{
public:
  explicit Init_MotorAngle_Goal_ki(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Goal_kd ki(::servo_interfaces::action::MotorAngle_Goal::_ki_type arg)
  {
    msg_.ki = std::move(arg);
    return Init_MotorAngle_Goal_kd(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_kp
{
public:
  explicit Init_MotorAngle_Goal_kp(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Goal_ki kp(::servo_interfaces::action::MotorAngle_Goal::_kp_type arg)
  {
    msg_.kp = std::move(arg);
    return Init_MotorAngle_Goal_ki(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_target_position
{
public:
  explicit Init_MotorAngle_Goal_target_position(::servo_interfaces::action::MotorAngle_Goal & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_Goal_kp target_position(::servo_interfaces::action::MotorAngle_Goal::_target_position_type arg)
  {
    msg_.target_position = std::move(arg);
    return Init_MotorAngle_Goal_kp(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

class Init_MotorAngle_Goal_motor_num
{
public:
  Init_MotorAngle_Goal_motor_num()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_Goal_target_position motor_num(::servo_interfaces::action::MotorAngle_Goal::_motor_num_type arg)
  {
    msg_.motor_num = std::move(arg);
    return Init_MotorAngle_Goal_target_position(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Goal msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_Goal>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_Goal_motor_num();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_Result_success
{
public:
  Init_MotorAngle_Result_success()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::servo_interfaces::action::MotorAngle_Result success(::servo_interfaces::action::MotorAngle_Result::_success_type arg)
  {
    msg_.success = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Result msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_Result>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_Result_success();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_Feedback_current_position
{
public:
  Init_MotorAngle_Feedback_current_position()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::servo_interfaces::action::MotorAngle_Feedback current_position(::servo_interfaces::action::MotorAngle_Feedback::_current_position_type arg)
  {
    msg_.current_position = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_Feedback msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_Feedback>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_Feedback_current_position();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_SendGoal_Request_goal
{
public:
  explicit Init_MotorAngle_SendGoal_Request_goal(::servo_interfaces::action::MotorAngle_SendGoal_Request & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_SendGoal_Request goal(::servo_interfaces::action::MotorAngle_SendGoal_Request::_goal_type arg)
  {
    msg_.goal = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Request msg_;
};

class Init_MotorAngle_SendGoal_Request_goal_id
{
public:
  Init_MotorAngle_SendGoal_Request_goal_id()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_SendGoal_Request_goal goal_id(::servo_interfaces::action::MotorAngle_SendGoal_Request::_goal_id_type arg)
  {
    msg_.goal_id = std::move(arg);
    return Init_MotorAngle_SendGoal_Request_goal(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Request msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_SendGoal_Request>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_SendGoal_Request_goal_id();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_SendGoal_Response_stamp
{
public:
  explicit Init_MotorAngle_SendGoal_Response_stamp(::servo_interfaces::action::MotorAngle_SendGoal_Response & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_SendGoal_Response stamp(::servo_interfaces::action::MotorAngle_SendGoal_Response::_stamp_type arg)
  {
    msg_.stamp = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Response msg_;
};

class Init_MotorAngle_SendGoal_Response_accepted
{
public:
  Init_MotorAngle_SendGoal_Response_accepted()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_SendGoal_Response_stamp accepted(::servo_interfaces::action::MotorAngle_SendGoal_Response::_accepted_type arg)
  {
    msg_.accepted = std::move(arg);
    return Init_MotorAngle_SendGoal_Response_stamp(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Response msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_SendGoal_Response>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_SendGoal_Response_accepted();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_SendGoal_Event_response
{
public:
  explicit Init_MotorAngle_SendGoal_Event_response(::servo_interfaces::action::MotorAngle_SendGoal_Event & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_SendGoal_Event response(::servo_interfaces::action::MotorAngle_SendGoal_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Event msg_;
};

class Init_MotorAngle_SendGoal_Event_request
{
public:
  explicit Init_MotorAngle_SendGoal_Event_request(::servo_interfaces::action::MotorAngle_SendGoal_Event & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_SendGoal_Event_response request(::servo_interfaces::action::MotorAngle_SendGoal_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_MotorAngle_SendGoal_Event_response(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Event msg_;
};

class Init_MotorAngle_SendGoal_Event_info
{
public:
  Init_MotorAngle_SendGoal_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_SendGoal_Event_request info(::servo_interfaces::action::MotorAngle_SendGoal_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_MotorAngle_SendGoal_Event_request(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_SendGoal_Event msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_SendGoal_Event>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_SendGoal_Event_info();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_GetResult_Request_goal_id
{
public:
  Init_MotorAngle_GetResult_Request_goal_id()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::servo_interfaces::action::MotorAngle_GetResult_Request goal_id(::servo_interfaces::action::MotorAngle_GetResult_Request::_goal_id_type arg)
  {
    msg_.goal_id = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Request msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_GetResult_Request>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_GetResult_Request_goal_id();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_GetResult_Response_result
{
public:
  explicit Init_MotorAngle_GetResult_Response_result(::servo_interfaces::action::MotorAngle_GetResult_Response & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_GetResult_Response result(::servo_interfaces::action::MotorAngle_GetResult_Response::_result_type arg)
  {
    msg_.result = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Response msg_;
};

class Init_MotorAngle_GetResult_Response_status
{
public:
  Init_MotorAngle_GetResult_Response_status()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_GetResult_Response_result status(::servo_interfaces::action::MotorAngle_GetResult_Response::_status_type arg)
  {
    msg_.status = std::move(arg);
    return Init_MotorAngle_GetResult_Response_result(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Response msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_GetResult_Response>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_GetResult_Response_status();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_GetResult_Event_response
{
public:
  explicit Init_MotorAngle_GetResult_Event_response(::servo_interfaces::action::MotorAngle_GetResult_Event & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_GetResult_Event response(::servo_interfaces::action::MotorAngle_GetResult_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Event msg_;
};

class Init_MotorAngle_GetResult_Event_request
{
public:
  explicit Init_MotorAngle_GetResult_Event_request(::servo_interfaces::action::MotorAngle_GetResult_Event & msg)
  : msg_(msg)
  {}
  Init_MotorAngle_GetResult_Event_response request(::servo_interfaces::action::MotorAngle_GetResult_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_MotorAngle_GetResult_Event_response(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Event msg_;
};

class Init_MotorAngle_GetResult_Event_info
{
public:
  Init_MotorAngle_GetResult_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_GetResult_Event_request info(::servo_interfaces::action::MotorAngle_GetResult_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_MotorAngle_GetResult_Event_request(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_GetResult_Event msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_GetResult_Event>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_GetResult_Event_info();
}

}  // namespace servo_interfaces


namespace servo_interfaces
{

namespace action
{

namespace builder
{

class Init_MotorAngle_FeedbackMessage_feedback
{
public:
  explicit Init_MotorAngle_FeedbackMessage_feedback(::servo_interfaces::action::MotorAngle_FeedbackMessage & msg)
  : msg_(msg)
  {}
  ::servo_interfaces::action::MotorAngle_FeedbackMessage feedback(::servo_interfaces::action::MotorAngle_FeedbackMessage::_feedback_type arg)
  {
    msg_.feedback = std::move(arg);
    return std::move(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_FeedbackMessage msg_;
};

class Init_MotorAngle_FeedbackMessage_goal_id
{
public:
  Init_MotorAngle_FeedbackMessage_goal_id()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_MotorAngle_FeedbackMessage_feedback goal_id(::servo_interfaces::action::MotorAngle_FeedbackMessage::_goal_id_type arg)
  {
    msg_.goal_id = std::move(arg);
    return Init_MotorAngle_FeedbackMessage_feedback(msg_);
  }

private:
  ::servo_interfaces::action::MotorAngle_FeedbackMessage msg_;
};

}  // namespace builder

}  // namespace action

template<typename MessageType>
auto build();

template<>
inline
auto build<::servo_interfaces::action::MotorAngle_FeedbackMessage>()
{
  return servo_interfaces::action::builder::Init_MotorAngle_FeedbackMessage_goal_id();
}

}  // namespace servo_interfaces

#endif  // SERVO_INTERFACES__ACTION__DETAIL__MOTOR_ANGLE__BUILDER_HPP_
