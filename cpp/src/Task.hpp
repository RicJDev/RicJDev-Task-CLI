#ifndef INCLUDE_SRC_TASK_HPP_
#define INCLUDE_SRC_TASK_HPP_

#include <ctime>
#include <string>

enum class StatusCode {
    TODO,
    IN_PROGRESS,
    DONE,
};

class Task {
  public:
    Task();
    Task(std::string description);
    
    ~Task();

    // Mis deliciosos datos... ñam ñam

    int id{0};

    StatusCode status_code{StatusCode::TODO};
    std::string description{""};

    std::string created_at;
    std::string updated_at;
};

#endif // INCLUDE_SRC_TASK_HPP_