// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

contract TasksContract {

    uint public taskCounter = 0;

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt; //timestamp is built by integers and then converted
    }

    event TaskCreated(
        Task
    ); //returns a Task type object

    event TaskToggleDone(uint id, bool done);

    event TaskUpdated(
        uint256 id,
        string title,
        string description,
        bool state,
        uint256 updatedAt
    );

    mapping (uint256 => Task) public tasks; //each id will reference a task

    function createTask(string memory _title, string memory _description) public {
        /* title and description don't need to be stored in the blockchain, 
        just in memory while executing. That's why we use "memory"*/
        //block has a property called timestamp and it has the current time when the data is stored
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        emit TaskCreated(tasks[taskCounter]);
    }

    function toggleDone(uint _id) public {
        Task memory  _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id, _task.done);
    }

    function updateTask(uint id, string memory _title, string memory _description) public {
        tasks[id] = Task(id, _title, _description, false, block.timestamp);
        emit TaskUpdated(id, _title, _description, false, block.timestamp);
    }
}