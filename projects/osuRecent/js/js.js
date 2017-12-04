/*------------------------------------------------------------------
                      JavaScript for osu!Recent
                        Coded by David Mills
------------------------------------------------------------------*/

(function() {

    var app = angular.module("osuReplayViewer", []);

    var MainController = function($scope, $http) {


        //On return of /api/get_user $http request
        var onSearchComplete = function(response){

            $scope.user = response.data[0];
            if ($scope.user == undefined){
                alert("The user you entered does not exist");
                return;
            }
        }

        //On return of /api/get_user_recent $http request
        var onRecentComplete = function(response){

            //Attach the response
            $scope.recents = response.data;
            console.log($scope.recents);

            //If the user hasn't played for 24 hours, no results are displayed
            if ($scope.recents.length == 0){
                document.getElementById("recentHistory").innerHTML = "This user has no recent plays";
                return;
            }

            //Function to change returned "mods" value to actual Mods
            /*            angular.forEach($scope.recents, function(item){
                switch(item.enabled_mods){
                    case "0":
                        item.enabled_mods = "No Mod";
                        break;
                    case "1":
                        item.rank = "NF";
                        break;
                    case "2":
                        item.rank = "images/A.png";
                        break;
                    case "8":
                        item.rank = "images/B.png";
                        break;
                    case "16":
                        item.rank = "images/C.png";
                        break;
                    case "24":
                        item.rank = "images/D.png";
                        break;
                    case "64":
                        item.rank = "images/Fail.png";
                        break;
                }
            });*/

            //Function add Accuracy element
            angular.forEach($scope.recents, function(item){
                userAcc = (parseInt(item.count300) * 300 + parseInt(item.count100) * 100 + parseInt(item.count50) * 50)/((parseInt(item.count300) + parseInt(item.count100) + parseInt(item.count50) + parseInt(item.countmiss)) * 300) * 100
                console.log(userAcc);
                item.accuracy = userAcc.toString();
                console.log(item);
            });

            //Function to change returned "rank" to an image
            angular.forEach($scope.recents, function(item){
                switch(item.rank){
                    case "SH":
                        item.rank = "images/SH.png";
                        break;
                    case "S":
                        item.rank = "images/S.png";
                        break;
                    case "A":
                        item.rank = "images/A.png";
                        break;
                    case "B":
                        item.rank = "images/B.png";
                        break;
                    case "C":
                        item.rank = "images/C.png";
                        break;
                    case "D":
                        item.rank = "images/D.png";
                        break;
                    case "F":
                        item.rank = "images/Fail.png";
                        break;
                }
            });

            //Change play Date to UTC+8 (Japan Timezone)
            function timeDifference(current, previous) {



                var msPerMinute = 60 * 1000;      //60,000
                var msPerHour = msPerMinute * 60; //3,600,000
                var msPerDay = msPerHour * 24;    //86,400,000

                var elapsed = current - previous;

                if (elapsed < msPerMinute) {
                    return Math.round(elapsed/1000) + ' seconds ago';
                }

                else if (elapsed < msPerHour) {
                    return Math.round(elapsed/msPerMinute) + ' minutes ago';
                }

                else if (elapsed < msPerDay ) {
                    return Math.round(elapsed/msPerHour ) + ' hours ago';
                }
            }

            angular.forEach($scope.recents, function(item){
                var playDate = Date.parse(item.date);
                var currentDate = Date.now() + 28800000; //playDate is from UTC+9


                item.date = timeDifference(currentDate, playDate);
            });


            //Empty array to add /api/get_beatmaps data to
            $scope.replays = [];

            //On return of /api/get_user_recent $http request
            var onBeatmapFound = function(response){

                beatmapInfo = response.data[0];
                $scope.replays.push(beatmapInfo);
                console.log($scope.replays);
            };

            //$http request to API for beatmap info
            angular.forEach($scope.recents, function(item){
                $http.get("https://osu.ppy.sh/api/get_beatmaps", {params: {k: "1e9f6cc9a8ed44a69e2863435d45fcfe561114c8", b: item.beatmap_id
                                                                          }})
                    .then(onBeatmapFound, onError);
            });

        }



        var onError = function(reason) {
            console.log(reason);
        }

        $scope.search = function(username){


            //$http request to API for user information
            $http.get("https://osu.ppy.sh/api/get_user", {params: {k: "1e9f6cc9a8ed44a69e2863435d45fcfe561114c8", u: username}})
                .then(onSearchComplete, onError);

            //$http request to API for recent players information
            $http.get("https://osu.ppy.sh/api/get_user_recent", {params: {k: "1e9f6cc9a8ed44a69e2863435d45fcfe561114c8", u: username}})
                .then(onRecentComplete, onError);

            //Reset input field
            document.getElementById("username").value = "";

        }

    };

    app.controller("MainController", MainController);

}());