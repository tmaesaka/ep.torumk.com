document.addEventListener('keyup', function(ev) {
  switch (ev.key) {
    case "h":
      var prev = document.querySelector('.adjacent-posts > .prev');
      if (prev) {
        window.location.href = prev.href;
      }
      break;
    case "l":
      var next = document.querySelector('.adjacent-posts > .next');
      if (next) {
        window.location.href = next.href;
      }
      break;
  }
});

function loadLatestCheckin() {
  fetch("https://torumk.com/checkins/latest")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error("fetch failure");
    })
    .then(function(parsed) {
      console.log(parsed);
    })
    .catch(function(err) {
      console.log(err);
    });
}

class SearchEngine {
  constructor() {
    this.idxPath = "/assets/fts.idx";
  }

  static isLocalStorageAvailable() {
    var s = "e";
    try {
      localStorage.setItem(s,s);
      localStorage.removeItem(s);
      return true;
    } catch(e) {
      return false;
    }
  }

  loadSearchIndex() {
    if (self.fetch) {
      fetch(this.idxPath)
        .then(function(res) {
          if (res.ok) {
            return res.json()
          }
          throw new Error("failed to download fts.idx");
        })
        .then(function(parsed) {
          var idxStr = JSON.stringify(parsed);
          if (SearchEngine.isLocalStorageAvailable()) {
            try {
              localStorage.setItem("fts.idx", idxStr);
            } catch(e) {
              console.error(e);
            }
          }
          return idxStr;
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      // TODO: fallback to XMLHttpRequest
      return false;
    }
  }
}
