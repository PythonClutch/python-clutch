app.controller('hgCtrl', ['group', '$q', 'projectServices',
    function(group, $q, projectServices) {
        var self = this;

        self.group = group;

        console.log(group);

//                 var myPromise = $q.defer();

// myPromise.promise.then(function () {
//     // var ps = function () {
//     //     return projectServices.list();
//     // }
//     // console.log(ps());

//     (function () {
//         return projectServices.list().then(function (result) {
//             console.log(result);
            
//             self.projects = result;
            
//         });
//     })();
//     console.log(self.projects);

//     // console.log('this');
    
//     // console.log(function () {
//     //     return projectServices.listSecond();
//     // })();
//     // self.projects;
//     // console.log('We got: ');
// });

// // myPromise.done(function (result) {
// //     console.log(result);
// // });

// // myPromise.resolve('All done, yo!');
// myPromise.resolve();
    }
]);