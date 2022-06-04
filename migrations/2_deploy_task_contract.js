//allows to deploy the application to the real network
const TasksContract = artifacts.require("TasksContract");

module.exports = function (deployer) {
  deployer.deploy(TasksContract);
};
