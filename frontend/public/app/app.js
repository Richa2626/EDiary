var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "./views/home.html",
        controller: "MainController"
    })
    .when("/register", {
        templateUrl : "./views/register.html",
        controller: "UserController"
    })
    .when("/login", {
        templateUrl : "./views/login.html",
        controller: "UserController"
    })
    .when("/archive", {
        templateUrl : "./views/archive.html",
        controller: "ArchiveController"
    })
    .when("/addArchive", {
        templateUrl : "./views/archive-add.html",
        controller: "ArchiveController"
    })
    .when("/editArchive/:id", {
        templateUrl : "./views/archive-edit.html",
        controller: "ArchiveController"
    })
    .when("/deleteArchive/:id", {
        templateUrl : "./views/archive-delete.html",
        controller: "ArchiveController"
    })
    .when("/visualization", {
        templateUrl : "./views/visualization.html",
        controller: "VisualisationController"
    });
});

app.factory("userToken", function() {
    var token = ""
    return {
        getToken: function() {
            return token;
        },
        setToken: function(token) {
            token = token
        }
    }
})

app.factory("userArray", function() {
    var users = []
    var userID = 1;
    return {
        getUsers: function() {
            return users;
        },
        getUser: function(id) {
            var user = {}
            for(i=0; i<users.length; i++){
                if(users[i].id == id) {
                    user = users[i];
                    break;
                }
            } 
            return user;
        },
        addUser: function(user) {
            user.id = userID;
            users.push(user)
            userID = userID + 1;
        },
        checkAuth: function(user) {
            var status = false;
            console.log(user.username,user.password)
            for(i=0; i<users.length; i++) {
                if(users[i].username == user.username && users[i].password == user.password) {
                    status = true;
                    break;
                }
            }
            return status;
        }
    }
})

app.factory("archiveArray", function(){
    var archives = [];
    var id = 1;
    return {
        getArchives: function() {
            return archives;
        },
        getArchive: function(id) {
            var archive = {}
            for(i=0; i<archives.length; i++){
                if(archives[i].id == id) {
                    archive = archives[i];
                    break;
                }
            } 
            return archive;
        },
        addArchive: function(archive) {
            archive.id = id;
            archives.push(archive)
            id = id + 1;
        },
        editArchive: function(id, archive) {
            for(i=0; i<archives.length; i++){
                if(archives[i].id == id) {
                    archives[i] = archive;
                }                
            }
        },
        deleteArchive: function(id) {
            for(i=0; i<archives.length; i++){
                if(archives[i].id == id) {
                    var index = archives.indexOf(archives[i]);
                    archives.pop(index);
                    alert("Successfully deleted event")
                }
            }
        }
    };
})

app.controller("MainController", function($scope) {
    $scope.user = "abhinav";
})
app.controller("UserController", function($scope, $location, $http, userArray) {
    $scope.user = {}
    $scope.register = function() {
        userArray.addUser($scope.user)
        alert("User registered successfully!!!")
        console.log(userArray.getUsers())
        $location.path("login")
    }
    $scope.login = function() {
        var status = userArray.checkAuth($scope.user);
        console.log(status)
        if(status) {
            $location.path("archive")
        }
        else {
            $scope.message = "Wrong Credentials! Watch Out!!!"
        }
    }
    // /////////////////////////////////////////////////////////////////////
    $scope.user = {}
    
    $scope.registerUser = function() {
        var postData = {
            "username": $scope.user.username,
            "email": $scope.user.email,
            "password1": $scope.user.password,
            "password2": $scope.user.cpassword
        }
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8000/rest-auth/registration/ ',
            data: postData,
            headers: {'Content-Type': 'application/json'}
        })
        .then(function(response){
            console.log(response.data)
            alert(response)
        },
        function(response){
            console.log(response)
            alert(response)
        });
    }

    
})
app.controller("ArchiveController", function($scope, $location, $routeParams, archiveArray) {
    $scope.archive = {}

    $scope.showArchives = function() {
        $scope.archives = archiveArray.getArchives();
    }
    $scope.addArchive = function() { 
        archiveArray.addArchive($scope.archive)  
        alert("Event successfully added!!!")
        $location.path("archive")
    }
    $scope.editArchive = function() {
        var id = $routeParams.id;
        $scope.archive = archiveArray.getArchive(id)
        $scope.update = function() {
            archiveArray.editArchive(id, $scope.archive)
            alert("updated Successfully!!!")
            $location.path("archive")            
        }
    }
    $scope.deleteArchive = function() {
        var id = $routeParams.id;
        $scope.archive = archiveArray.getArchive(id)
        $scope.confirmDelete = function() {
            archiveArray.deleteArchive(id)
            $location.path("archive")
        }
    }
})
app.controller("VisualisationController", function($scope, $location, archiveArray){
    var arr = archiveArray.getArchives();
    var emotions = {
        "happy": 0,
        "ok": 0,
        "sad": 0
    }
    var getCounts = function() {
        for(i=0; i<arr.length; i++) {
            if(arr[i].emotions == "happy") {
                emotions.happy += 1
            }
            else if(arr[i].emotions == "ok") {
                emotions.ok += 1
            }
            else if(arr[i].emotions == "sad") {
                emotions.sad += 1
            }
        }
        return [['happy',emotions.happy], ['ok', emotions.ok], ['sad', emotions.sad]]
    }
    $scope.createChartOnData = function() {
        var data = getCounts()
        generatePieChart(data)
        console.log(data)
    }    
})