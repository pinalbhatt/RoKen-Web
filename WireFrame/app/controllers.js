4/**
 * Cube - Bootstrap Admin Theme
 * Copyright 2014 Phoonio
 */

function mainCtrl($scope) {
	$('#page-wrapper').removeClass('nav-small');
}

function emailCtrl($scope) {
	if (!$('#page-wrapper').hasClass('nav-small')) {
		$('#page-wrapper').addClass('nav-small');
	}
}

function easyChartCtrl($scope) {
	$scope.percent = 65;
	$scope.options = {
		barColor: '#03a9f4',
		trackColor: '#f2f2f2',
		scaleColor: false,
		lineWidth: 8,
		size: 130,
		animate: 1500,
		onStep: function(from, to, percent) {
			$(this.el).find('.percent').text(Math.round(percent));
		},
	};

	$scope.optionsGreen = angular.copy($scope.options);
	$scope.optionsGreen.barColor = '#8bc34a';
	
	$scope.optionsRed = angular.copy($scope.options);
	$scope.optionsRed.barColor = '#e84e40';
	
	$scope.optionsYellow = angular.copy($scope.options);
	$scope.optionsYellow.barColor = '#ffc107';
	
	$scope.optionsPurple = angular.copy($scope.options);
	$scope.optionsPurple.barColor = '#9c27b0';
	
	$scope.optionsGray = angular.copy($scope.options);
	$scope.optionsGray.barColor = '#90a4ae';
};

function dashboardFlotCtrl($scope) {
	var data1 = [
	    [gd(2015, 1, 1), 838], [gd(2015, 1, 2), 749], [gd(2015, 1, 3), 634], [gd(2015, 1, 4), 1080], [gd(2015, 1, 5), 850], [gd(2015, 1, 6), 465], [gd(2015, 1, 7), 453], [gd(2015, 1, 8), 646], [gd(2015, 1, 9), 738], [gd(2015, 1, 10), 899], [gd(2015, 1, 11), 830], [gd(2015, 1, 12), 789]
	];
	
	var data2 = [
	    [gd(2015, 1, 1), 342], [gd(2015, 1, 2), 721], [gd(2015, 1, 3), 493], [gd(2015, 1, 4), 403], [gd(2015, 1, 5), 657], [gd(2015, 1, 6), 782], [gd(2015, 1, 7), 609], [gd(2015, 1, 8), 543], [gd(2015, 1, 9), 599], [gd(2015, 1, 10), 359], [gd(2015, 1, 11), 783], [gd(2015, 1, 12), 680]
	];
	
	var series = new Array();

	series.push({
		data: data1,
		bars: {
			show : true,
			barWidth: 24 * 60 * 60 * 12000,
			lineWidth: 1,
			fill: 1,
			align: 'center'
		},
		label: 'Revenues'
	});
	series.push({
		data: data2,
		color: '#e84e40',
		lines: {
			show : true,
			lineWidth: 3,
		},
		points: { 
			fillColor: "#e84e40", 
			fillColor: '#ffffff', 
			pointWidth: 1,
			show: true 
		},
		label: 'Orders'
	});



	var previousPoint = null;
	$("#graph-bar").bind("plothover", function (event, pos, item) {
		if (item) {
			if (previousPoint != item.dataIndex) {

				previousPoint = item.dataIndex;

				$("#flot-tooltip").remove();
				var x = item.datapoint[0],
				y = item.datapoint[1];

				showTooltip(item.pageX, item.pageY, item.series.label, y );
			}
		}
		else {
			$("#flot-tooltip").remove();
			previousPoint = [0,0,0];
		}
	});
}

angular
	.module('cubeWebApp')
	.controller('mainCtrl', mainCtrl)
	.controller('emailCtrl', emailCtrl)
	.controller('easyChartCtrl', easyChartCtrl)
	.controller('dashboardFlotCtrl', dashboardFlotCtrl)
	