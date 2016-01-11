zoomTaskManagerApp.controller('taskDetailsController',
    function taskDetailsController($scope, $route, myCache,myCacheLikes, CacheFactory) {


    //to store tasks in localStorage permanently
    var myCache = CacheFactory.get('myCache');
    myCache.setOptions({
        //to reset cache onexpire
        onExpire : function(key,value){
        myCache.put(key,value);
      }
    });

    //to store likes in localStorage permanently
    var myCacheLikes = CacheFactory.get('myCacheLikes');
    myCacheLikes.setOptions({
        //to reset cache onexpire
        onExpire : function(key,value){
        myCacheLikes.put(key,value);
      }
    });

    $scope.task = {};
    $scope.today = new Date();
    $scope.saved = myCache.get('taskItems');
    $scope.taskItem = (myCache.get('taskItems')!==null && myCache.get('taskItems')!==undefined) ? JSON.parse($scope.saved) : [ {description: "Why not add a task?", date: $scope.today, complete: false, category: "Default"}];
    myCache.put('taskItems', JSON.stringify($scope.taskItem));

    $scope.categories = [
       {name: 'Idea'},
       {name: 'To-Do'},
       {name: 'Doing'},
       {name: 'Completed'},
   ];



   $scope.addNew = function (task) {

        if(task.newTaskCategory == undefined ){
        task.newTaskCategory = { name: "Idea"};
      }

      if(task.newTask == undefined){
        task.newTask = "Default Task";
      }
        if (task.newTaskDate == null || task.newTaskDate == '') {
            $scope.taskItem.push({
                description: task.newTask,
                date: "No deadline",
                category: task.newTaskCategory.name,
            })
        } else {
            $scope.taskItem.push({
                description: task.newTask,
                date: task.newTaskDate,
                category: task.newTaskCategory.name,
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        myCache.put('taskItems', JSON.stringify($scope.taskItem));
        $scope.idea = _.where($scope.taskItem, { category: "Idea"});
        $scope.todo = _.where($scope.taskItem, {category: "To-Do"});
        $scope.doing = _.where($scope.taskItem, {category: "Doing"});
        $scope.completed = _.where($scope.taskItem, {category: "Completed"});
    };

    $scope.completeTask = function (task) {
      function getCompletedTask(elem){
        return ( elem.description == task.description && elem.date == task.date && elem.category == task.category);
      }
        var result = _.filter($scope.taskItem, getCompletedTask);
        result[0].category = "Completed";
        $scope.idea = _.where($scope.taskItem, { category: "Idea"});
        $scope.todo = _.where($scope.taskItem, {category: "To-Do"});
        $scope.doing = _.where($scope.taskItem, {category: "Doing"});
        $scope.completed = _.where($scope.taskItem, {category: "Completed"});

    };

    $scope.doingTask = function(task) {

      function getDoingTask(elem){
        return ( elem.description == task.description && elem.date == task.date && elem.category == task.category);
      }
        var result = _.filter($scope.taskItem, getDoingTask);
        result[0].category = "Doing";
        $scope.idea = _.where($scope.taskItem, { category: "Idea"});
        $scope.todo = _.where($scope.taskItem, {category: "To-Do"});
        $scope.doing = _.where($scope.taskItem, {category: "Doing"});
        $scope.completed = _.where($scope.taskItem, {category: "Completed"});
    }

    $scope.todoTask = function(task) {

      function getTodoTask(elem){
        return ( elem.description == task.description && elem.date == task.date && elem.category == task.category);
      }
        var result = _.filter($scope.taskItem, getTodoTask);
        result[0].category = "To-Do";
        $scope.idea = _.where($scope.taskItem, { category: "Idea"});
        $scope.todo = _.where($scope.taskItem, {category: "To-Do"});
        $scope.doing = _.where($scope.taskItem, {category: "Doing"});
        $scope.completed = _.where($scope.taskItem, {category: "Completed"});
    }

    $scope.deleteTask = function(task) {
      function deleteTask(elem){
        return ( elem.description == task.description && elem.date == task.date && elem.category == task.category);
      }
        var result =   _.reject($scope.taskItem, deleteTask);

        $scope.taskItem = [];
        angular.forEach(result, function (taskItem) {
                $scope.taskItem.push(taskItem);
        });
        myCache.put('taskItems', JSON.stringify($scope.taskItem));

        $scope.idea = _.where($scope.taskItem, { category: "Idea"});
        $scope.todo = _.where($scope.taskItem, {category: "To-Do"});
        $scope.doing = _.where($scope.taskItem, {category: "Doing"});
        $scope.completed = _.where($scope.taskItem, {category: "Completed"});
    }





    //to store taskDescription and likes count as key, value pair
    $scope.addToCache = function(key){
      if(isNaN(myCache.get(key)))
       return myCache.put(key, 1);
       return myCache.put(key, myCache.get(key) + 1);
    };

    //to retrieve the cache key value
    $scope.getFromCache = function(key){
        if(isNaN(myCache.get(key)))
        return 0;
        return myCache.get(key);
    };



});
