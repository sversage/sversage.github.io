'use strict';

(function() {
  var app = angular.module('patentlyAI', ['ngAnimate', 'ui.bootstrap', 'monospaced.elastic', 'angular-loading-bar' ]);

  // app.controller('ResultConroller', function() {
  //   this.results = d.results;
  // });

  app.controller('ResultConroller', function($scope, $http) {
    var query = this;
    query.results = [];
    query.time = 0;

    this.patentsSearch = function() {
      var searchUrl = "http://54.175.249.14:5000/v1.0.0/return_patent_similarity?q=" + this.searchQuery;
      $http.get(searchUrl).then(function(response) {
        query.time = response.config.responseTimestamp - response.config.requestTimestamp;
        console.log('Time taken ' + (query.time / 1000) + ' seconds.');
        query.results = response.data.results;
        console.log(response.data.results);
      });
    };
  });

  app.factory('logTimeTaken', [function() {
    var logTimeTaken = {
      request: function(config) {
        config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function(response) {
        response.config.responseTimestamp = new Date().getTime();
        return response;
      }
    };
    return logTimeTaken;
  }]);

  app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('logTimeTaken');
  }]);

  // Custom filter to assign rating icon
  app.filter('ratingFilter', function() {
    return function (input) {

      var ratingImg = { 0 : "./images/star-0.png",
                        1 : "./images/star-1.png",
                        2 : "./images/star-23.png",
                        3 : "./images/star-23.png",
                        4 : "./images/star-4.png",
                        5 : "./images/star-5.png"
                      };

      var ratingNumber =  Math.round(input * 5);
      var output = ratingImg[ratingNumber];
      return output;
    };
  });

  // Custom filter to format date
  app.filter('formatDate', function() {
    return function(input) {
      var dateString = input.toString();
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      var output = dateString.replace(pattern, '$1-$2-$3');
      return output;
    };
  });

  var d = {
    "results": [
      {
        "abstract": "The present invention relates to methods for producing an oligonucleotide on a solid substrate surface and methods for using the same. Some aspects of the invention provide methods for selecting a single DNA molecule reproducibily with an atomic force microscope (AFM).",
        "date": 20150310,
        "doc_number": "08975215",
        "link": "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=8975215.PN.&OS=PN/8975215&RS=PN/8975215",
        "score": 0.3214176213336677,
        "title": "Methods for producing surface bound oligonucleotide on solid substrate and uses thereof"
      },
      {
        "abstract": "The invention relates to a class of CpG immunostimulatory oligonucleotides containing a 5TCG motif or a CG at or near the 5 end that are useful for stimulating an immune response.",
        "date": 20110607,
        "doc_number": "07956043",
        "link": "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=7956043.PN.&OS=PN/7956043&RS=PN/7956043",
        "score": 0.4183241198795467,
        "title": "5 CpG nucleic acids and methods of use"
      },
      {
        "abstract": "Methods are provided for amplification and monitoring of oligonucleotide amplification in which a primer has an overlap with one or more bases of a detection probe.",
        "date": 20111129,
        "doc_number": "08067177",
        "link": "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=8067177.PN.&OS=PN/8067177&RS=PN/8067177",
        "score": 0.71607910568899183,
        "title": "Amplification methods"
      },
      {
        "abstract": "The invention provides hybrid oligonucleotides having phosphorothioate or phosphorodithioate internucleotide linkages, and both deoxyribonucleosides and ribonucleosides or 2-substituted ribonucleosides. Such hybrid oligonucleotides have superior properties of duplex formation with RNA, nuclease resistance, and RNase H activation.",
        "date": 20060516,
        "doc_number": "07045609",
        "link": "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=7045609.PN.&OS=PN/7045609&RS=PN/7045609",
        "score": 0.9047215536266721,
        "title": "Hybrid oligonucleotide phosphorothioates"
      },
      {
        "abstract": "Methods of obtaining sequence information about target oligonucleotides by repetitive single molecule hybridization are disclosed. The methods include exposing a target oligonucleotide to one or more copies of a test oligonucleotide; measuring hybridization; dehybridizing the test oligonucleotide; and repeating until the information content from the hybridization trials equals or exceeds the information content of the target oligonucleotide.",
        "date": 20091020,
        "doc_number": "07604941",
        "link": "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=7604941.PN.&OS=PN/7604941&RS=PN/7604941",
        "score": 0.1023233366976578,
        "title": "Nucleotide sequencing via repetitive single molecule hybridization"
      }
    ]
  };

})();
