#include "Task.hpp"

Task::Task()
    : id(0), status_code(StatusCode::TODO), description(""), created_at(""),
      updated_at("") {};

Task::Task(std::string description)
    : id(0), status_code(StatusCode::TODO), description(description),
      created_at(""), updated_at("") {};