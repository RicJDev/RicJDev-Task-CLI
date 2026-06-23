#include <sqlite3.h>
#include <iostream>

int main() {
    sqlite3 *DB;
    int exit = 0;

    exit = sqlite3_open("app.db", &DB);

    if (exit) {
        std::cerr << "Error open DB " << sqlite3_errmsg(DB);
        return -1;
    }

    std::cout << "Opened database successfully\n";

    sqlite3_close(DB);
    return 0;
}