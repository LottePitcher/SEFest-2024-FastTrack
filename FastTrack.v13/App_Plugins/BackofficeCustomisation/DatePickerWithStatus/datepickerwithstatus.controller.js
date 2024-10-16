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
            console.log("scope.model.value: " + $scope.model.value);
            var convertedDate = convertUmbracoDateForDatePicker($scope.model.value);
            console.log("convertedDate: " + convertedDate);
            vm.dateValue = convertedDate;
            vm.dateDbValue = convertedDate; // store value in db so can be reset
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

        function convertUmbracoDateForDatePicker(dateFromUmbraco) {

            // ALL BACKOFFICE USERS ARE ENGLISH UK (NOT US) SO THIS APPROACH IS SAFE!

            if (!dateFromUmbraco) return null;

            var arrDateParts = dateFromUmbraco.split(" ")[0].split("/");
            var dateDD = arrDateParts[0];
            var dateMM = arrDateParts[1];
            var dateYYYY = arrDateParts[2];

            if (!dateDD || !dateMM || !dateYYYY) return null;

            if (dateDD.length === 1) dateDD = "0" + dateDD;
            if (dateMM.length === 1) dateMM = "0" + dateMM;
            if (dateYYYY.length === 2) dateYYYY = "20" + dateYYYY;

            return new Date(dateYYYY + "-" + dateMM + "-" + dateDD + "T00:00:00Z");
        }

        function addMonthsToDate(months) {
            var monthsToAdd = parseInt(months);
            if (!vm.dateValue) {
                vm.dateValue = new Date();
            }
            var copyDate = new Date(vm.dateValue);
            if (copyDate < new Date()) {
                // date has expired, so reset to today
                copyDate = new Date();
            }
            copyDate.setMonth(vm.dateValue.getMonth() + monthsToAdd);
            console.log("date after adding " + months + "m: " + copyDate);
            vm.dateValue = copyDate;
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