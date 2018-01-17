(function() {
    'use strict';

    angular.module('starwars').controller('dashboardCtrl', dashboardCtrl);

    function dashboardCtrl($rootScope, $scope, $log, $http, API) {
        $scope.chart = {};
            
        $scope.chart.type = "PieChart";

        $scope.chart.data = {"cols": [
            {id: "t", label: "Filme", type: "string"},
            {id: "s", label: "Bilheteria", type: "number"}
        ], "rows": [
            {c: [
                {v: "Star Wars I"},
                {v: 10},
            ]},
            {c: [
                {v: "Star Wars II"},
                {v: 10},
            ]},
            {c: [
                {v: "Star Wars III"},
                {v: 10},
            ]},
            {c: [
                {v: "Star Wars VII"},
                {v: 40},
            ]},
            {c: [
                {v: "Star Wars Rogue One"},
                {v: 30},
            ]},
        ]};

        $scope.chart.options = {
            'height' : 300,
            'chartArea' : {width: '100%'},
            'legend' : {position: 'labeled', alignment: 'center'}
        };

        $scope.people = {};
        for (var i = 1; i <= 4; i++) {
        	$http.get(API.URL + '/people/' + i)
        	.then(function(res){
        		var person = res.data;
                person["id"] = i;
                switch (person.hair_color) {
                    case "blond":
                        person['hair_color'] = "Loiro"
                        break;
                    case "none":
                        person['hair_color'] = "n/a"
                        break;
                    default:
                        break;
                }
                person["height"] = (person.height/100).toFixed(2);
                person["id"] = person.url.slice(-2, -1);
        		$http.get(person.homeworld)
        		.then(function(resPlanet){
        			person['planet'] = resPlanet.data.name;
        			$scope.people[person.id] = person;
        		});
        	});
        }
    }
})();