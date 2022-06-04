const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () =>{
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  })    
  
  it("Successful deployment", async () => {
    const address = this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  })

  it("Get tasks list", async () =>{
     const tasksCounter = await this.tasksContract.taskId();
     const task = await this.tasksContract.tasks(tasksCounter);

     assert.equal(task.id.toNumber(), tasksCounter);
     assert.equal(task.title, "Sample task");
     assert.equal(task.description, "Gotta do something");
     assert.equal(task.done, false);
     assert.equal(tasksCounter, "1");
  })

  it("Successful task creation", async () =>{
    const result = await this.tasksContract.createTask("Second task", "Second description");
    const taskEvent = result.logs[0].args;
    const taskCounter = await this.tasksContract.taskId();

    assert.equal(taskCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "Second task");
    assert.equal(taskEvent.description, "Second description");
    assert.equal(taskEvent.done, false);
  })

  it("Successful state toggle", async () =>{
    const result = await this.tasksContract.toggleDone(1);
    const task = await this.tasksContract.tasks(1);
    const taskEvent = result.logs[0].args;
    
    assert.equal(task.done, true);
    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id.toNumber(), 1);
  })
})