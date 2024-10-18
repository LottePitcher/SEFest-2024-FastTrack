function subscriptionsDashboardController(subscriptionsResource) {

    var vm = this;
    
    vm.loading = false;
    vm.action = "";
    vm.list = [];
    
    vm.getAll = getAll;
    
    function getAll() {
        vm.loading = true;
        vm.action = "ALL";
        subscriptionsResource.getAll().then(function(response) {
            vm.list = response;
            vm.loading = false;
        });
    }
}

angular.module("umbraco").controller("Custom.SubscriptionsDashboardController", subscriptionsDashboardController);