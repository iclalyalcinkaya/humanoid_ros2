# generated from rosidl_generator_py/resource/_idl.py.em
# with input from servo_interfaces:srv/MotorAngle.idl
# generated code does not contain a copyright notice

# This is being done at the module level and not on the instance level to avoid looking
# for the same variable multiple times on each instance. This variable is not supposed to
# change during runtime so it makes sense to only look for it once.
from os import getenv

ros_python_check_fields = getenv('ROS_PYTHON_CHECK_FIELDS', default='')


# Import statements for member types

import builtins  # noqa: E402, I100

import math  # noqa: E402, I100

import rosidl_parser.definition  # noqa: E402, I100


class Metaclass_MotorAngle_Request(type):
    """Metaclass of message 'MotorAngle_Request'."""

    _CREATE_ROS_MESSAGE = None
    _CONVERT_FROM_PY = None
    _CONVERT_TO_PY = None
    _DESTROY_ROS_MESSAGE = None
    _TYPE_SUPPORT = None

    __constants = {
    }

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('servo_interfaces')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'servo_interfaces.srv.MotorAngle_Request')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._CREATE_ROS_MESSAGE = module.create_ros_message_msg__srv__motor_angle__request
            cls._CONVERT_FROM_PY = module.convert_from_py_msg__srv__motor_angle__request
            cls._CONVERT_TO_PY = module.convert_to_py_msg__srv__motor_angle__request
            cls._TYPE_SUPPORT = module.type_support_msg__srv__motor_angle__request
            cls._DESTROY_ROS_MESSAGE = module.destroy_ros_message_msg__srv__motor_angle__request

    @classmethod
    def __prepare__(cls, name, bases, **kwargs):
        # list constant names here so that they appear in the help text of
        # the message class under "Data and other attributes defined here:"
        # as well as populate each message instance
        return {
            'MOTOR_NUM__DEFAULT': 1,
            'TARGET_POSITION__DEFAULT': 120,
            'KP__DEFAULT': 0.008,
            'KI__DEFAULT': 0.01,
            'KD__DEFAULT': 0.003,
        }

    @property
    def MOTOR_NUM__DEFAULT(cls):
        """Return default value for message field 'motor_num'."""
        return 1

    @property
    def TARGET_POSITION__DEFAULT(cls):
        """Return default value for message field 'target_position'."""
        return 120

    @property
    def KP__DEFAULT(cls):
        """Return default value for message field 'kp'."""
        return 0.008

    @property
    def KI__DEFAULT(cls):
        """Return default value for message field 'ki'."""
        return 0.01

    @property
    def KD__DEFAULT(cls):
        """Return default value for message field 'kd'."""
        return 0.003


class MotorAngle_Request(metaclass=Metaclass_MotorAngle_Request):
    """Message class 'MotorAngle_Request'."""

    __slots__ = [
        '_motor_num',
        '_target_position',
        '_kp',
        '_ki',
        '_kd',
        '_check_fields',
    ]

    _fields_and_field_types = {
        'motor_num': 'uint8',
        'target_position': 'uint8',
        'kp': 'double',
        'ki': 'double',
        'kd': 'double',
    }

    # This attribute is used to store an rosidl_parser.definition variable
    # related to the data type of each of the components the message.
    SLOT_TYPES = (
        rosidl_parser.definition.BasicType('uint8'),  # noqa: E501
        rosidl_parser.definition.BasicType('uint8'),  # noqa: E501
        rosidl_parser.definition.BasicType('double'),  # noqa: E501
        rosidl_parser.definition.BasicType('double'),  # noqa: E501
        rosidl_parser.definition.BasicType('double'),  # noqa: E501
    )

    def __init__(self, **kwargs):
        if 'check_fields' in kwargs:
            self._check_fields = kwargs['check_fields']
        else:
            self._check_fields = ros_python_check_fields == '1'
        if self._check_fields:
            assert all('_' + key in self.__slots__ for key in kwargs.keys()), \
                'Invalid arguments passed to constructor: %s' % \
                ', '.join(sorted(k for k in kwargs.keys() if '_' + k not in self.__slots__))
        self.motor_num = kwargs.get(
            'motor_num', MotorAngle_Request.MOTOR_NUM__DEFAULT)
        self.target_position = kwargs.get(
            'target_position', MotorAngle_Request.TARGET_POSITION__DEFAULT)
        self.kp = kwargs.get(
            'kp', MotorAngle_Request.KP__DEFAULT)
        self.ki = kwargs.get(
            'ki', MotorAngle_Request.KI__DEFAULT)
        self.kd = kwargs.get(
            'kd', MotorAngle_Request.KD__DEFAULT)

    def __repr__(self):
        typename = self.__class__.__module__.split('.')
        typename.pop()
        typename.append(self.__class__.__name__)
        args = []
        for s, t in zip(self.get_fields_and_field_types().keys(), self.SLOT_TYPES):
            field = getattr(self, s)
            fieldstr = repr(field)
            # We use Python array type for fields that can be directly stored
            # in them, and "normal" sequences for everything else.  If it is
            # a type that we store in an array, strip off the 'array' portion.
            if (
                isinstance(t, rosidl_parser.definition.AbstractSequence) and
                isinstance(t.value_type, rosidl_parser.definition.BasicType) and
                t.value_type.typename in ['float', 'double', 'int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64']
            ):
                if len(field) == 0:
                    fieldstr = '[]'
                else:
                    if self._check_fields:
                        assert fieldstr.startswith('array(')
                    prefix = "array('X', "
                    suffix = ')'
                    fieldstr = fieldstr[len(prefix):-len(suffix)]
            args.append(s + '=' + fieldstr)
        return '%s(%s)' % ('.'.join(typename), ', '.join(args))

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        if self.motor_num != other.motor_num:
            return False
        if self.target_position != other.target_position:
            return False
        if self.kp != other.kp:
            return False
        if self.ki != other.ki:
            return False
        if self.kd != other.kd:
            return False
        return True

    @classmethod
    def get_fields_and_field_types(cls):
        from copy import copy
        return copy(cls._fields_and_field_types)

    @builtins.property
    def motor_num(self):
        """Message field 'motor_num'."""
        return self._motor_num

    @motor_num.setter
    def motor_num(self, value):
        if self._check_fields:
            assert \
                isinstance(value, int), \
                "The 'motor_num' field must be of type 'int'"
            assert value >= 0 and value < 256, \
                "The 'motor_num' field must be an unsigned integer in [0, 255]"
        self._motor_num = value

    @builtins.property
    def target_position(self):
        """Message field 'target_position'."""
        return self._target_position

    @target_position.setter
    def target_position(self, value):
        if self._check_fields:
            assert \
                isinstance(value, int), \
                "The 'target_position' field must be of type 'int'"
            assert value >= 0 and value < 256, \
                "The 'target_position' field must be an unsigned integer in [0, 255]"
        self._target_position = value

    @builtins.property
    def kp(self):
        """Message field 'kp'."""
        return self._kp

    @kp.setter
    def kp(self, value):
        if self._check_fields:
            assert \
                isinstance(value, float), \
                "The 'kp' field must be of type 'float'"
            assert not (value < -1.7976931348623157e+308 or value > 1.7976931348623157e+308) or math.isinf(value), \
                "The 'kp' field must be a double in [-1.7976931348623157e+308, 1.7976931348623157e+308]"
        self._kp = value

    @builtins.property
    def ki(self):
        """Message field 'ki'."""
        return self._ki

    @ki.setter
    def ki(self, value):
        if self._check_fields:
            assert \
                isinstance(value, float), \
                "The 'ki' field must be of type 'float'"
            assert not (value < -1.7976931348623157e+308 or value > 1.7976931348623157e+308) or math.isinf(value), \
                "The 'ki' field must be a double in [-1.7976931348623157e+308, 1.7976931348623157e+308]"
        self._ki = value

    @builtins.property
    def kd(self):
        """Message field 'kd'."""
        return self._kd

    @kd.setter
    def kd(self, value):
        if self._check_fields:
            assert \
                isinstance(value, float), \
                "The 'kd' field must be of type 'float'"
            assert not (value < -1.7976931348623157e+308 or value > 1.7976931348623157e+308) or math.isinf(value), \
                "The 'kd' field must be a double in [-1.7976931348623157e+308, 1.7976931348623157e+308]"
        self._kd = value


# Import statements for member types

# already imported above
# import builtins

# already imported above
# import rosidl_parser.definition


class Metaclass_MotorAngle_Response(type):
    """Metaclass of message 'MotorAngle_Response'."""

    _CREATE_ROS_MESSAGE = None
    _CONVERT_FROM_PY = None
    _CONVERT_TO_PY = None
    _DESTROY_ROS_MESSAGE = None
    _TYPE_SUPPORT = None

    __constants = {
    }

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('servo_interfaces')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'servo_interfaces.srv.MotorAngle_Response')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._CREATE_ROS_MESSAGE = module.create_ros_message_msg__srv__motor_angle__response
            cls._CONVERT_FROM_PY = module.convert_from_py_msg__srv__motor_angle__response
            cls._CONVERT_TO_PY = module.convert_to_py_msg__srv__motor_angle__response
            cls._TYPE_SUPPORT = module.type_support_msg__srv__motor_angle__response
            cls._DESTROY_ROS_MESSAGE = module.destroy_ros_message_msg__srv__motor_angle__response

    @classmethod
    def __prepare__(cls, name, bases, **kwargs):
        # list constant names here so that they appear in the help text of
        # the message class under "Data and other attributes defined here:"
        # as well as populate each message instance
        return {
        }


class MotorAngle_Response(metaclass=Metaclass_MotorAngle_Response):
    """Message class 'MotorAngle_Response'."""

    __slots__ = [
        '_is_set',
        '_check_fields',
    ]

    _fields_and_field_types = {
        'is_set': 'boolean',
    }

    # This attribute is used to store an rosidl_parser.definition variable
    # related to the data type of each of the components the message.
    SLOT_TYPES = (
        rosidl_parser.definition.BasicType('boolean'),  # noqa: E501
    )

    def __init__(self, **kwargs):
        if 'check_fields' in kwargs:
            self._check_fields = kwargs['check_fields']
        else:
            self._check_fields = ros_python_check_fields == '1'
        if self._check_fields:
            assert all('_' + key in self.__slots__ for key in kwargs.keys()), \
                'Invalid arguments passed to constructor: %s' % \
                ', '.join(sorted(k for k in kwargs.keys() if '_' + k not in self.__slots__))
        self.is_set = kwargs.get('is_set', bool())

    def __repr__(self):
        typename = self.__class__.__module__.split('.')
        typename.pop()
        typename.append(self.__class__.__name__)
        args = []
        for s, t in zip(self.get_fields_and_field_types().keys(), self.SLOT_TYPES):
            field = getattr(self, s)
            fieldstr = repr(field)
            # We use Python array type for fields that can be directly stored
            # in them, and "normal" sequences for everything else.  If it is
            # a type that we store in an array, strip off the 'array' portion.
            if (
                isinstance(t, rosidl_parser.definition.AbstractSequence) and
                isinstance(t.value_type, rosidl_parser.definition.BasicType) and
                t.value_type.typename in ['float', 'double', 'int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64']
            ):
                if len(field) == 0:
                    fieldstr = '[]'
                else:
                    if self._check_fields:
                        assert fieldstr.startswith('array(')
                    prefix = "array('X', "
                    suffix = ')'
                    fieldstr = fieldstr[len(prefix):-len(suffix)]
            args.append(s + '=' + fieldstr)
        return '%s(%s)' % ('.'.join(typename), ', '.join(args))

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        if self.is_set != other.is_set:
            return False
        return True

    @classmethod
    def get_fields_and_field_types(cls):
        from copy import copy
        return copy(cls._fields_and_field_types)

    @builtins.property
    def is_set(self):
        """Message field 'is_set'."""
        return self._is_set

    @is_set.setter
    def is_set(self, value):
        if self._check_fields:
            assert \
                isinstance(value, bool), \
                "The 'is_set' field must be of type 'bool'"
        self._is_set = value


# Import statements for member types

# already imported above
# import builtins

# already imported above
# import rosidl_parser.definition


class Metaclass_MotorAngle_Event(type):
    """Metaclass of message 'MotorAngle_Event'."""

    _CREATE_ROS_MESSAGE = None
    _CONVERT_FROM_PY = None
    _CONVERT_TO_PY = None
    _DESTROY_ROS_MESSAGE = None
    _TYPE_SUPPORT = None

    __constants = {
    }

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('servo_interfaces')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'servo_interfaces.srv.MotorAngle_Event')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._CREATE_ROS_MESSAGE = module.create_ros_message_msg__srv__motor_angle__event
            cls._CONVERT_FROM_PY = module.convert_from_py_msg__srv__motor_angle__event
            cls._CONVERT_TO_PY = module.convert_to_py_msg__srv__motor_angle__event
            cls._TYPE_SUPPORT = module.type_support_msg__srv__motor_angle__event
            cls._DESTROY_ROS_MESSAGE = module.destroy_ros_message_msg__srv__motor_angle__event

            from service_msgs.msg import ServiceEventInfo
            if ServiceEventInfo.__class__._TYPE_SUPPORT is None:
                ServiceEventInfo.__class__.__import_type_support__()

    @classmethod
    def __prepare__(cls, name, bases, **kwargs):
        # list constant names here so that they appear in the help text of
        # the message class under "Data and other attributes defined here:"
        # as well as populate each message instance
        return {
        }


class MotorAngle_Event(metaclass=Metaclass_MotorAngle_Event):
    """Message class 'MotorAngle_Event'."""

    __slots__ = [
        '_info',
        '_request',
        '_response',
        '_check_fields',
    ]

    _fields_and_field_types = {
        'info': 'service_msgs/ServiceEventInfo',
        'request': 'sequence<servo_interfaces/MotorAngle_Request, 1>',
        'response': 'sequence<servo_interfaces/MotorAngle_Response, 1>',
    }

    # This attribute is used to store an rosidl_parser.definition variable
    # related to the data type of each of the components the message.
    SLOT_TYPES = (
        rosidl_parser.definition.NamespacedType(['service_msgs', 'msg'], 'ServiceEventInfo'),  # noqa: E501
        rosidl_parser.definition.BoundedSequence(rosidl_parser.definition.NamespacedType(['servo_interfaces', 'srv'], 'MotorAngle_Request'), 1),  # noqa: E501
        rosidl_parser.definition.BoundedSequence(rosidl_parser.definition.NamespacedType(['servo_interfaces', 'srv'], 'MotorAngle_Response'), 1),  # noqa: E501
    )

    def __init__(self, **kwargs):
        if 'check_fields' in kwargs:
            self._check_fields = kwargs['check_fields']
        else:
            self._check_fields = ros_python_check_fields == '1'
        if self._check_fields:
            assert all('_' + key in self.__slots__ for key in kwargs.keys()), \
                'Invalid arguments passed to constructor: %s' % \
                ', '.join(sorted(k for k in kwargs.keys() if '_' + k not in self.__slots__))
        from service_msgs.msg import ServiceEventInfo
        self.info = kwargs.get('info', ServiceEventInfo())
        self.request = kwargs.get('request', [])
        self.response = kwargs.get('response', [])

    def __repr__(self):
        typename = self.__class__.__module__.split('.')
        typename.pop()
        typename.append(self.__class__.__name__)
        args = []
        for s, t in zip(self.get_fields_and_field_types().keys(), self.SLOT_TYPES):
            field = getattr(self, s)
            fieldstr = repr(field)
            # We use Python array type for fields that can be directly stored
            # in them, and "normal" sequences for everything else.  If it is
            # a type that we store in an array, strip off the 'array' portion.
            if (
                isinstance(t, rosidl_parser.definition.AbstractSequence) and
                isinstance(t.value_type, rosidl_parser.definition.BasicType) and
                t.value_type.typename in ['float', 'double', 'int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64']
            ):
                if len(field) == 0:
                    fieldstr = '[]'
                else:
                    if self._check_fields:
                        assert fieldstr.startswith('array(')
                    prefix = "array('X', "
                    suffix = ')'
                    fieldstr = fieldstr[len(prefix):-len(suffix)]
            args.append(s + '=' + fieldstr)
        return '%s(%s)' % ('.'.join(typename), ', '.join(args))

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        if self.info != other.info:
            return False
        if self.request != other.request:
            return False
        if self.response != other.response:
            return False
        return True

    @classmethod
    def get_fields_and_field_types(cls):
        from copy import copy
        return copy(cls._fields_and_field_types)

    @builtins.property
    def info(self):
        """Message field 'info'."""
        return self._info

    @info.setter
    def info(self, value):
        if self._check_fields:
            from service_msgs.msg import ServiceEventInfo
            assert \
                isinstance(value, ServiceEventInfo), \
                "The 'info' field must be a sub message of type 'ServiceEventInfo'"
        self._info = value

    @builtins.property
    def request(self):
        """Message field 'request'."""
        return self._request

    @request.setter
    def request(self, value):
        if self._check_fields:
            from servo_interfaces.srv import MotorAngle_Request
            from collections.abc import Sequence
            from collections.abc import Set
            from collections import UserList
            from collections import UserString
            assert \
                ((isinstance(value, Sequence) or
                  isinstance(value, Set) or
                  isinstance(value, UserList)) and
                 not isinstance(value, str) and
                 not isinstance(value, UserString) and
                 len(value) <= 1 and
                 all(isinstance(v, MotorAngle_Request) for v in value) and
                 True), \
                "The 'request' field must be a set or sequence with length <= 1 and each value of type 'MotorAngle_Request'"
        self._request = value

    @builtins.property
    def response(self):
        """Message field 'response'."""
        return self._response

    @response.setter
    def response(self, value):
        if self._check_fields:
            from servo_interfaces.srv import MotorAngle_Response
            from collections.abc import Sequence
            from collections.abc import Set
            from collections import UserList
            from collections import UserString
            assert \
                ((isinstance(value, Sequence) or
                  isinstance(value, Set) or
                  isinstance(value, UserList)) and
                 not isinstance(value, str) and
                 not isinstance(value, UserString) and
                 len(value) <= 1 and
                 all(isinstance(v, MotorAngle_Response) for v in value) and
                 True), \
                "The 'response' field must be a set or sequence with length <= 1 and each value of type 'MotorAngle_Response'"
        self._response = value


class Metaclass_MotorAngle(type):
    """Metaclass of service 'MotorAngle'."""

    _TYPE_SUPPORT = None

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('servo_interfaces')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'servo_interfaces.srv.MotorAngle')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._TYPE_SUPPORT = module.type_support_srv__srv__motor_angle

            from servo_interfaces.srv import _motor_angle
            if _motor_angle.Metaclass_MotorAngle_Request._TYPE_SUPPORT is None:
                _motor_angle.Metaclass_MotorAngle_Request.__import_type_support__()
            if _motor_angle.Metaclass_MotorAngle_Response._TYPE_SUPPORT is None:
                _motor_angle.Metaclass_MotorAngle_Response.__import_type_support__()
            if _motor_angle.Metaclass_MotorAngle_Event._TYPE_SUPPORT is None:
                _motor_angle.Metaclass_MotorAngle_Event.__import_type_support__()


class MotorAngle(metaclass=Metaclass_MotorAngle):
    from servo_interfaces.srv._motor_angle import MotorAngle_Request as Request
    from servo_interfaces.srv._motor_angle import MotorAngle_Response as Response
    from servo_interfaces.srv._motor_angle import MotorAngle_Event as Event

    def __init__(self):
        raise NotImplementedError('Service classes can not be instantiated')
