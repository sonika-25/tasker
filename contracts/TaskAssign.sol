pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import "@openzeppelin/contracts/utils/Counters.sol";

contract TaskAssign is ERC721Holder{

  address assigner;

  constructor (address authPerson){
    assigner = authPerson;
  }
  struct Task {
    uint256 taskNumber;
    string desc;
    string topic;
    uint deadline;
    address to;
    uint256 idOfReward;
    string info; //a link to a doc explaining deets
    bool status;
  }
  Task [] public tasks;
  uint256 public taskNo;
  mapping (uint256 => Task) public taskList;
  mapping (address => Task[]) public assignedTasks;
  mapping(address => uint256) public assignedTasksNo;
  mapping (address => mapping(uint256 => bool)) public statusOfReports;

  function assignTaskToOne (string memory descT, string memory topicT, uint deadlineT, address toT, string memory infoT, uint256 NFTid) public returns(uint256){
    require(msg.sender == assigner, 'Person not assigned to create Tasks');
    Task memory taskCreated = Task (
      taskNo,
      descT,
      topicT,
      deadlineT,
      toT,
      NFTid,
      infoT,
      false
    );
    tasks.push(taskCreated);
    taskList[taskNo]= taskCreated;
    taskNo++;
    assignedTasksNo[toT] ++;
    assignedTasks[toT].push(taskCreated);
    statusOfReports[toT][taskNo]=false;
    return taskNo;
  }

  function reportStatus (uint256 taskno, address to) public {
    /*Task memory taskUsed = taskList[taskno];
    require(taskList[taskno].to == msg.sender , 'not your task');*/
    taskList[taskno].status = true;
    statusOfReports[to][taskno]=true;


  }
  function getStatus (uint256 taskno) public view returns(bool){
    return (taskList[taskno].status);
  }
  function transferRewardToOne (uint256 NftId, uint256 taskId, address rewardNFT) public {
    require(msg.sender == assigner, 'msg.sender !== assigner');
    address recep = taskList[taskId].to;
    IERC721(rewardNFT).transferFrom(address(this), recep, NftId);
  }

  function fetchTasksCreated() public view returns (Task[] memory) {
    return tasks;
  }

}
//task can only be created by 1 person
//report task completed.
