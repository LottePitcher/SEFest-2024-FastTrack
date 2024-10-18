(function() {

    function datePickerWithStatusController($scope) {

        var vm = this;
        
        vm.dateValue = "";
        vm.dateDbValue = null;
        vm.dateStatus = "";
        
        vm.showButtons = false;
        vm.addMonthsButtons = [];
        
        vm.addMonthsToDate = addMonthsToDate;
        vm.resetDate = resetDate;

        if ($scope.model.value) {
            var convertedDate = new Date($scope.model.value);
            vm.dateValue = convertedDate;
            vm.dateDbValue = convertedDate; // remember value on load for Reset button
        }
        
        if ($scope.model.config.addMonthsButtons) {
            vm.showButtons = true;
            vm.addMonthsButtons = $scope.model.config.addMonthsButtons.split(",");
        }

        setStatusForDate();

        $scope.$on("formSubmitting", function (ev, args) {
            $scope.model.value = vm.dateValue;
            setStatusForDate();
        });

        function setStatusForDate() {
            if (vm.dateValue) {
                var dateObj = new Date(vm.dateValue);
                if (dateObj > (new Date())) {
                    vm.dateStatus = "ACTIVE";
                    vm.dateStatusLabel = $scope.model.config.activeLabel;
                }
                else {
                    vm.dateStatus = "EXPIRED";
                    vm.dateStatusLabel = $scope.model.config.expiredLabel;
                }
            }
            else {
                vm.dateStatus = "UNSUBSCRIBED";
                vm.dateStatusLabel = $scope.model.config.emptyLabel;
            }
        }

        function addMonthsToDate(months) {
            
            // if date is empty or expired, then use today's date
            var date = (vm.dateValue) ? new Date(vm.dateValue) : new Date();
            if (date < new Date()) date = new Date();

            var d = date.getDate();
            date.setMonth(date.getMonth() + parseInt(months));
            if (date.getDate() != d) {
                date.setDate(0);
            }

            vm.dateValue = date;    
        }
        
        function resetDate() {
            vm.dateValue = vm.dateDbValue;
        }
        
        $scope.$watch('vm.dateValue', function (newval, oldval) {
            setStatusForDate();
        });
    }

    angular.module("umbraco").controller("Custom.DatePickerWithStatusController", datePickerWithStatusController);

})();