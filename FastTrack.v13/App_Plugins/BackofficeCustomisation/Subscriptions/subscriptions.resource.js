angular.module('umbraco.resources').factory('subscriptionsResource',
    function($q, $http, umbRequestHelper) {

        const controllerBaseUrl = "backoffice/Subscriptions/ListingApi";
    
        return {
            getAll: function () {
                return umbRequestHelper.resourcePromise(
                    $http.get(controllerBaseUrl + "/GetAll"),
                    "Failed to retrieve Subscriptions data");
            }
        };
    }
);