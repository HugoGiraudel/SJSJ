// Generated by CoffeeScript 1.10.0
var initParticles, request;

request = new XMLHttpRequest;

initParticles = function() {
  return particlesJS('particles-js', {
    'particles': {
      'number': {
        'value': 80,
        'density': {
          'enable': true,
          'value_area': 800
        }
      },
      'color': {
        'value': '#8C867B'
      },
      'shape': {
        'type': 'circle',
        'stroke': {
          'width': 0,
          'color': '#000000'
        },
        'polygon': {
          'nb_sides': 5
        },
        'image': {
          'src': 'img/github.svg',
          'width': 100,
          'height': 100
        }
      },
      'opacity': {
        'value': 0.5,
        'random': false,
        'anim': {
          'enable': false,
          'speed': 1,
          'opacity_min': 0.1,
          'sync': false
        }
      },
      'size': {
        'value': 3,
        'random': true,
        'anim': {
          'enable': false,
          'speed': 40,
          'size_min': 0.1,
          'sync': false
        }
      },
      'line_linked': {
        'enable': true,
        'distance': 150,
        'color': '#8C867B',
        'opacity': 0.4,
        'width': 1
      },
      'move': {
        'enable': true,
        'speed': 2,
        'direction': 'none',
        'random': false,
        'straight': false,
        'out_mode': 'out',
        'bounce': false,
        'attract': {
          'enable': false,
          'rotateX': 600,
          'rotateY': 1200
        }
      }
    },
    'interactivity': {
      'detect_on': 'canvas',
      'events': {
        'onhover': {
          'enable': true,
          'mode': 'grab'
        },
        'onclick': {
          'enable': true,
          'mode': 'push'
        },
        'resize': true
      },
      'modes': {
        'grab': {
          'distance': 140,
          'line_linked': {
            'opacity': 1
          }
        },
        'bubble': {
          'distance': 400,
          'size': 40,
          'duration': 2,
          'opacity': 8,
          'speed': 3
        },
        'repulse': {
          'distance': 200,
          'duration': 0.4
        },
        'push': {
          'particles_nb': 4
        },
        'remove': {
          'particles_nb': 2
        }
      }
    },
    'retina_detect': true
  });
};

(function() {
  var $$entries, $$letters, $entriesBox, $output, $searchInput, cleanKey, createEntriesSelectableList, createSelectableAlphabet, displayEntry, getEntriesObject, initSearch, initializeList, jargon, unhighlightLetters;
  $searchInput = document.getElementById('search');
  $output = document.getElementById('results');
  $entriesBox = document.getElementById('entries');
  $$letters = Array.prototype.slice.apply(document.querySelectorAll('.alphabet ul li a'));
  $$entries = [];
  jargon = {};
  unhighlightLetters = function() {
    return $$letters.map(function(letterLi) {
      return letterLi.classList.remove('highlighted');
    });
  };
  createEntriesSelectableList = function(jargon) {
    var anchor, key, li, results, value;
    results = [];
    for (key in jargon) {
      value = jargon[key];
      anchor = document.createElement("a");
      anchor.href = "?term=" + key;
      anchor.textContent = jargon[key]["public"];
      li = document.createElement("li");
      li.setAttribute("class", key.slice(0, 1).toLowerCase());
      li.appendChild(anchor);
      $entriesBox.appendChild(li);
      $$entries = $entriesBox.querySelectorAll('li');
      results.push($$entries = Array.prototype.slice.apply($$entries));
    }
    return results;
  };
  createSelectableAlphabet = function() {
    return document.getElementById("alphabet").addEventListener("click", function(e) {
      var letter;
      e.preventDefault();
      e.stopPropagation();
      unhighlightLetters();
      e.target.classList.add('highlighted');
      letter = e.target.textContent.toLowerCase();
      $output.querySelector('.entry').innerHTML = "";
      $entriesBox.classList.remove("hide");
      $entriesBox.classList.add("fold");
      return $$entries.map(function(li) {
        if (li.classList.contains(letter)) {
          return li.classList.add('selected');
        } else {
          return li.classList.remove('selected');
        }
      });
    });
  };
  cleanKey = function(key) {
    return key.toLowerCase().replace('.', '').replace(' ', '').replace('(', '').replace(')', '').replace('-', '').replace('_', '');
  };
  displayEntry = function(key) {
    key = cleanKey(key);
    $entriesBox.classList.add("hide");
    $output.querySelector('.entry').innerHTML = jargon[key].html;
    return location.href = location.href.split("#")[0] + "#" + key;
  };
  initializeList = function() {
    return $entriesBox.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      return displayEntry(e.target.textContent);
    });
  };
  getEntriesObject = function(data) {
    return data.map(function(entry) {
      var key;
      key = entry.name;
      key = cleanKey(key);
      jargon[key] = {
        html: entry.html,
        "public": entry.name
      };
      return entry.name;
    });
  };
  initSearch = function(data) {
    var entries, h;
    entries = getEntriesObject(data);
    if (location.hash !== "") {
      displayEntry(location.hash.slice(1));
    }
    document.querySelector('.entry').addEventListener("click", function(e) {
      var term;
      if (!e.target.href) {
        return;
      }
      if (e.target.href.match(/\.md$/)) {
        e.preventDefault();
        e.stopPropagation();
        term = e.target.pathname.split('/');
        term = term.slice(-1)[0].split('.md')[0];
        return displayEntry(term);
      } else {
        return e.target.setAttribute("target", "_blank");
      }
    });
    createEntriesSelectableList(jargon);
    createSelectableAlphabet();
    initializeList();
    return h = horsey($searchInput, {
      suggestions: entries,
      limit: 8,
      set: function(value) {
        $searchInput.value = value;
        displayEntry(value);
        return unhighlightLetters();
      }
    });
  };
  request.open('GET', 'js/entries.json', true);
  request.onload = function() {
    var data;
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      return initSearch(data);
    }
  };
  request.onerror = function() {};
  request.send();
  return setTimeout(function() {
    return initParticles();
  }, 500);
})();
