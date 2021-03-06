var app = angular.module("Ship", ['ngDialog']);

var socket = io();

var allToShade = document.getElementsByClassName('shadeMe');

//on page load, check if user is using a phone. If they are, this render will be the controller. Otherwise, it's the viewer



app.controller("MainController", function($scope, ngDialog, $window) {
    socket.emit('resetGame', {
        meh: 1
    });
    $scope.cht = false;
    var chtArr = [100, 111, 99, 116, 111, 114];
    var chtNum = 0;
    document.onkeypress = function(e) {
        //cheats!
        console.log(String.fromCharCode(e.which), e.which)
        if (e.which != chtArr[chtNum]) {
            chtNum = 0;
            $scope.cht = false;
            $('#soundTrack').attr('src', 'https://www.youtube.com/embed/-ReMkT6BLuc?autoplay=1');
            $scope.moveEnabled = true;
        } else if (e.which == chtArr[chtNum] && chtNum == chtArr.length - 1) {
            $scope.cht = true
            moveEnabled = false;
            $('#soundTrack').attr('src', 'https://www.youtube.com/embed/szfBOAnRR7U?autoplay=1');
        } else {
            chtNum++;
            $scope.moveEnabled = true;
        }
    }
    $('#shipCont').css('transform', 'rotateX(90deg) ');

    var xRot = 0,
        yRot = 0,
        currXPos = 50,
        currYPos = 50,
        calib = 180,
        currXStep = 0,
        currYStep = 0,
        beenCalibrated = false,
        lossCount = 3,
        timesPlayed = 0,
        score = 0,
        moveEnabled = true,
        timeSinceLastDeath = 0;
    $scope.heartArr = [];
    //if move is 0, ship won't move. Used for debugging

    socket.on('moveShip', function(moveObj) {
        // find rotation
        if (!$scope.cht) {
            xRot = 90 - (moveObj.pitch % 360);
        } else {
            xRot = 0 - (moveObj.pitch % 360);
        }
        yRot = (-moveObj.roll % 360) - calib;
        $('#shipCont').css('transform', 'rotateX(' + xRot + 'deg)  rotateY(' + (180 - yRot) + 'deg)  rotateZ(' + yRot + 'deg)');
        if (!beenCalibrated) {
            calib = -moveObj.roll;
            beenCalibrated = true;
        }
    })
    $scope.tunnelEls = [{
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }, {
        size: '50px',
        left: 50,
        top: 50
    }];
    var ringLen = $scope.tunnelEls.length;
    var currSize = 1;
    for (var i = 0; i < ringLen; i++) {
        $scope.tunnelEls[i].col = parseInt((50 * (i + 1) / ringLen));
        $scope.tunnelEls[i].zindex = (i - 8);
        $scope.tunnelEls[i].size = currSize;
        $scope.tunnelEls[i].left = 50;
        $scope.tunnelEls[i].top = 50;
        currSize *= 1.2;
    }
    var currX = 0;
    var currY = 0;
    var timeToChange = 100;
    var currTime = 100;
    var currRing = 0; //used during transition phase;
    $scope.stepHue = 240; //number of sequences passed, in hue form!
    var t = setInterval(function() {
        if (currTime > 0) {
            //in a 'straight' phase
            currTime -= 0.5;
            if (currRing < 23) {
                //changing rings!
                //still more rings to move
                for (var i = 0; i <= currRing; i++) {
                    if ($scope.tunnelEls[i] && $scope.tunnelEls[i].left < currX) {
                        //ring exists, left of targ
                        $scope.tunnelEls[i].left++;
                    } else if ($scope.tunnelEls[i] && $scope.tunnelEls[i].left > currX) {
                        //ring exists, right of targ
                        $scope.tunnelEls[i].left--;
                    }
                    if ($scope.tunnelEls[i] && $scope.tunnelEls[i].top < currY) {
                        //ring exists, right of targ
                        $scope.tunnelEls[i].top++;

                    } else if ($scope.tunnelEls[i] && $scope.tunnelEls[i].top > currY) {
                        //ring exists, right of targ
                        $scope.tunnelEls[i].left--;
                    }
                }

                currRing++;
            }
            var ringToGray = 18 - (currTime * 2 % ringLen);
            var ringToGray2 = 18 - (((currTime * 2) - 1) % ringLen);
            var ringToGray3 = 18 - (((currTime * 2) - 2) % ringLen);
            var ringToGray4 = 18 - (((currTime * 2) - 3) % ringLen);
            var ringToGray5 = 18 - (((currTime * 2) - 4) % ringLen);
            var ringToGray6 = 18 - (((currTime * 2) - 5) % ringLen);
            for (var i = 0; i < ringLen; i++) {
                //find the one grey ring
                if (i == ringToGray) {
                    $scope.tunnelEls[i].sat = 100;
                } else if (i == ringToGray2) {
                    $scope.tunnelEls[i].sat = 66;
                } else if (i == ringToGray3) {
                    $scope.tunnelEls[i].sat = 33;
                } else if (i == ringToGray4) {
                    $scope.tunnelEls[i].sat = 0;
                } else if (i == ringToGray5) {
                    $scope.tunnelEls[i].sat = 33;
                } else if (i == ringToGray6) {
                    $scope.tunnelEls[i].sat = 66;
                } else {
                    $scope.tunnelEls[i].sat = 100;
                }
            }
        } else {
            if ($scope.stepHue) {
                $scope.stepHue -= 20;
                // console.log('hue:', $scope.stepHue)
            } else {
                $scope.stepHue = 360;
            }
            //in a 'turn' phase. or rather a 'pick new turn dir' phase
            timeToChange -= .5;
            currTime = timeToChange;
            //get random vals for what direction we're movin in
            currX = 50 + ((Math.floor(Math.random() * 5) - 2) * 8);
            currY = 50 + ((Math.floor(Math.random() * 5) - 2) * 8);
            currRing = 0; //reset ring to change

        }
        $scope.moveShip();
        $scope.checkShip();
        $scope.heartArr = [];
        for (var c = 0; c < lossCount; c++) {
            $scope.heartArr.push(c);
        }
        console.log($scope.heartArr)
        $scope.$apply();
        timesPlayed++;
        (timeSinceLastDeath) ? timeSinceLastDeath-- : timeSinceLastDeath = 0;

    }, 25);

    $scope.moveShip = function() {
        //note these are kinda backwards
        var xRotAdj = (xRot - 90);
        //left and right based on Y axis
        if (Math.abs(yRot) > 0) {
            currXStep = (yRot / 90) * 2.5; //yes, X. We're rotating along Y AXIS and moving along X
        } else if (currXPos >= 100 || currXPos <= 0) {
            currXStep = 0;
        }

        if (Math.abs(xRotAdj) > 0) {
            currYStep = (xRotAdj / 90) * 2.5;
        } else if (currYPos >= 100 || currYPos <= 0) {
            currYStep = 0;
        }
        if (moveEnabled) {
            currXPos -= currXStep;
            currYPos += currYStep;
            // console.log('curr posX:',currXPos,'curr posY',currYPos)
        } else {
            currYPos = 50;
            currXPos = 50;
        }
        $('#shipCont').css({
            'left': parseInt(currXPos) + '%',
            'top': parseInt(currYPos) + '%'
        });
    }
    $scope.checkShip = function() {
        var ringX = $scope.tunnelEls[11].left;
        var ringY = $scope.tunnelEls[11].top;
        var distance = Math.sqrt(Math.pow((currXPos - ringX), 2) + Math.pow((currYPos - ringY), 2));
        // Player has 3 turns
        // if (distance > 42 && timesPlayed > 8) {
        if (distance > 42 && timeSinceLastDeath < 1) {
            lossCount--;
            // when player loses once or twice times played reset after score set

            if (lossCount >= 0) {
                timesPlayed = 0;
                socket.emit('buzz', {
                    err: 2
                });
                timeSinceLastDeath = 150;
            } else if (lossCount < 0) {
                console.log(score);
                clearInterval(t);
                sessionStorage.score = score;
                $('#soundTrack').attr('src', '');
                socket.emit('boomDead', {
                    err: 3
                });
                $window.location.href = ("/highscore");
                var lose = ngDialog.open({
                    template: 'score.html',
                    className: 'ngdialog-theme-plain'
                });
            }
        } else {
            var positionDistance = parseInt(distance);
            score += parseInt((42 - positionDistance) / positionDistance * 10);
        }

        $scope.score = score;

    };
});