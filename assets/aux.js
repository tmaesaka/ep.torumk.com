document.addEventListener('keyup', function(ev) {
  switch (ev.key) {
    case "h":
      let prev = document.querySelector('.adjacent-posts > .prev');
      if (prev) {
        window.location.href = prev.href;
      }
      break;
    case "l":
      let next = document.querySelector('.adjacent-posts > .next');
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

class TLNavigator {
  constructor() {
    this.activated = false;
  }

  _activate() {
    if (this.activated) {
      return;
    }
    this.root = document.querySelector('.tl-node');
    if (this.root == null) {
      throw new Error("timeline missing");
    }
    // TODO: Use a dedicated css-class
    this.root.style.borderLeftColor = "#e74c3c";
    this.activated = true;
  }

  prev() {
    throw new Error("unimplemented");
  }

  next() {
    throw new Error("unimplemented");
  }
}

class SearchEngine {
  constructor() {
    this.idxPath = "/assets/fts.idx";
  }

  static isLocalStorageAvailable() {
    let s = "e";
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
