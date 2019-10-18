let myObject = [
  {
    nom: "sdsd qwqw",
    téléphone: 12121221,
    genre: "Femme",
    date: "2019-10-06",
    heure: "16:30",
    __v: 0
  },
  {
    nom: "xcxcxc zxzxzx",
    téléphone: 13344344,
    genre: "Homme",
    date: "2019-10-06",
    heure: "10:30",
    __v: 0
  },
  {
    nom: "farok bia",
    téléphone: 45545455,
    genre: "Homme",
    date: "2019-10-06",
    heure: "11:00",
    __v: 0
  },
  {
    nom: "maja naja faak",
    téléphone: 46565656,
    genre: "Femme",
    date: "2019-10-06",
    heure: "09:00",
    __v: 0
  },
  {
    nom: "nncvmvcn mfdf",
    téléphone: 94854584,
    genre: "Femme",
    date: "2019-10-06",
    heure: "11:30",
    __v: 0
  },
  {
    nom: "mncvcm msdnsd",
    téléphone: 59454554,
    genre: "Femme",
    date: "2019-10-06",
    heure: "10:00",
    __v: 0
  }
];

// Sort object function
function sortProperties(obj, sortedBy, isNumericSort, reverse) {
  sortedBy = sortedBy || 1; // by default first key
  isNumericSort = isNumericSort || false; // by default text sort
  reverse = reverse || false; // by default no reverse

  var reversed = reverse ? -1 : 1;

  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }
  if (isNumericSort)
    sortable.sort(function(a, b) {
      return reversed * (a[1][sortedBy] - b[1][sortedBy]);
    });
  else
    sortable.sort(function(a, b) {
      var x = a[1][sortedBy].toLowerCase(),
        y = b[1][sortedBy].toLowerCase();
      return x < y ? reversed * -1 : x > y ? reversed : 0;
    });

  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

let sorted = sortProperties(myObject, "heure", false, false);
let reSorted = [];
sorted.forEach(element => {
  delete element[0];
  element.forEach(arr => {
    reSorted.push(arr);
  });
});
console.log(reSorted);
