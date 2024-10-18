function subscriptionsDashboardController($http, umbRequestHelper) {

    var vm = this;
    const controllerBaseUrl = "backoffice/Subscriptions/ListingApi";
    
    vm.loading = false;
    vm.listHeading = "";
    vm.list = null;
    
    vm.getActive = getActive;
    vm.getExpired = getExpired;
    vm.getNonsubscribed = getNonsubscribed;
    
    function getActive() {
        getSubscribers("Active Subscribers", "GetActive");
    }
    
    function getExpired() {
        getSubscribers("Expired Subscribers", "GetExpired");
    }
    
    function getNonsubscribed() {
        getSubscribers("Non Subscribers", "GetNonsubscribed");
    }

    function getSubscribers(listHeading, controllerMethod) {
        vm.loading = true;
        umbRequestHelper.resourcePromise(
            $http.get(controllerBaseUrl + "/" + controllerMethod),
            "Failed to retrieve member items.")
            .then(result => {
                vm.listHeading = listHeading;
                vm.list = result;
                vm.loading = false;
            });
    }
}

angular.module("umbraco").controller("Custom.SubscriptionsDashboardController", subscriptionsDashboardController);